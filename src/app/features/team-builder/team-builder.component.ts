import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { TeamBuilderService } from '@features/team-builder/team-builder.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pbs-team-builder',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: TeamBuilderService,
      deps: [HttpClient],
    },
  ],
  templateUrl: './team-builder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamBuilderComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #teamBuilderService = inject(TeamBuilderService);

  pokemonFilterForm = this.#formBuilder.group({
    name: this.#formBuilder.control(''),
    type: this.#formBuilder.array<number[]>([]),
    abilities: this.#formBuilder.array<number[]>([]),
  });

  nameChanges$ = this.pokemonFilterForm.controls.name.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
  );

  otherFilters$ = this.pokemonFilterForm.valueChanges.pipe(map(({ name, ...rest }) => rest));

  searchPokemon$ = combineLatest([this.nameChanges$, this.otherFilters$]).pipe(
    switchMap(([name, otherFilters]) =>
      this.#teamBuilderService.fetchAllPokemon({ name, ...this.#formatSearchForm(otherFilters) }),
    ),
  );

  /**
   * Takes formarray data of search form and returns they as number[] to make it compatable with params
   * @param formData
   * @returns
   * @example
   */
  #formatSearchForm(formData: {
    type?: (number | null)[] | undefined;
    abilities?: (number | null)[] | undefined;
  }): { type?: number[]; abilities?: number[] } {
    const modifiedFormData: { type?: number[]; abilities?: number[] } = {};

    if (formData.type && formData.type.length > 0)
      modifiedFormData.type = formData.type.filter((value): value is number => Boolean(value));

    if (formData.abilities && formData.abilities.length > 0)
      modifiedFormData.abilities = formData.abilities.filter((value): value is number =>
        Boolean(value),
      );
    return modifiedFormData;
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from 'rxjs';

import { TeamBuilderService } from '@features/team-builder/team-builder.service';

import { PokemonSearchFormStore } from '@features/team-builder/store/filter-form-pokedex.store';

@Component({
  selector: 'pbs-pokemon-filter-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonFilterFormComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #teamBuilderService = inject(TeamBuilderService);
  readonly #filterPokedexStore = inject(PokemonSearchFormStore);

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
      of({
        ...this.#formatSearchForm(otherFilters),
        name: name ?? '',
      }),
    ),
  );

  constructor() {
    this.searchPokemon$.pipe(takeUntilDestroyed()).subscribe({
      next: (value) => this.#filterPokedexStore.updateData(value),
      error: (error) => {},
    });
  }

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

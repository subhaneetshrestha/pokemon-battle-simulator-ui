import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PokemonSearchFormStore } from '@features/team-builder/store/filter-form-pokedex.store';

@Component({
  selector: 'pbs-pokedex',
  imports: [],
  templateUrl: './pokedex.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexComponent {
  readonly #filterPokedexStore = inject(PokemonSearchFormStore);
}

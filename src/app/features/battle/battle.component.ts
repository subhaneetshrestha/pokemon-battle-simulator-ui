import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';

import { PokeBarComponent } from '@features/battle/components/poke-bar/poke-bar.component';
import { CommonUtilsService } from '@shared/services/common-utils.service';
import { BattleService } from '@features/battle/battle.service';
import { MoveSelectorComponent } from '@features/battle/components/move-selector/move-selector.component';

@Component({
  selector: 'pbs-battle',
  imports: [PokeBarComponent, MoveSelectorComponent],
  providers: [
    CommonUtilsService,
    {
      provide: BattleService,
      deps: [HttpClient],
    },
  ],
  templateUrl: './battle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent {
  readonly #commonUtilService = inject(CommonUtilsService);
  readonly #battleService = inject(BattleService);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #ngZone = inject(NgZone);

  userTeam$ = this.#battleService.fetchTeam();
  currentPokemon = signal<undefined | number>(undefined);

  moveClick(moveId: number) {}

  updateDamage(pokemonId: number, damage: number) {
    this.#ngZone.runOutsideAngular(() => {});
  }

  changePokemon(pokemonId: number) {
    this.currentPokemon.set(pokemonId);
  }

  applyResidualDamage() {}
}

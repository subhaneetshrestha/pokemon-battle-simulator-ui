import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HpBarColorPipe } from '@core/pipes/hp-bar-color.pipe';

import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'pbs-poke-bar',
  imports: [ProgressBar, HpBarColorPipe],
  templateUrl: './poke-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeBarComponent {
  maxHP = input.required<number>();
  currentHP = input.required<number>();
  level = input.required<number>();
  pokemonName = input.required<string>();
  pokemonGender = input.required<number>();
  statusCondition = input();

  percentHP = computed(() => (this.currentHP() / this.maxHP()) * 100);
}

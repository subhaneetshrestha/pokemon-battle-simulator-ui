import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
@Component({
  selector: 'pbs-poke-bar',
  imports: [NgClass],
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

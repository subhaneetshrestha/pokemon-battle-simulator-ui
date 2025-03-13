import { Injectable } from '@angular/core';

@Injectable()
export class CommonUtilsService {
  // Random value between 0.85 and 1.0
  #generateRandom() {
    return Math.random() * (1.0 - 0.85) + 0.85;
  }

  calculatePokemonDamage(
    level: number,
    power: number,
    attack: number,
    defense: number,
    stab: boolean,
    effectiveness: number,
  ): number {
    const baseDamage = Math.floor((((2 * level) / 5 + 2) * power * (attack / defense)) / 50 + 2);
    const stabBonus = stab ? 1.5 : 1.0;
    const randomFactor = this.#generateRandom();
    const totalDamage = Math.floor(baseDamage * stabBonus * effectiveness * randomFactor);
    return Math.max(totalDamage, 1);
  }
}

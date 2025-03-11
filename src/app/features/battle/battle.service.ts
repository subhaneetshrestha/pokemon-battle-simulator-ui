import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class BattleService {
  readonly #http = inject(HttpClient);

  fetchTeam() {
    return of([
      {
        id: 151,
        name: 'Mew',
        moves: [
          {
            id: 132,
            type: [
              {
                id: 4,
                name: 'Psychic',
                damageType: 2,
              },
            ],
            name: 'Psyshock',
            power: 80,
            effects: [],
            damageType: {
              type: 4,
            },
          },
        ],
        level: 100,
        shiny: false,
        gender: undefined,
        item: 12,
        type: [
          {
            id: 4,
            name: 'Psychic',
          },
        ],
      },
    ]);
    // return this.#http.get(``);
  }
}

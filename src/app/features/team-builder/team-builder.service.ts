import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

type SearchBody = {
  name: string | null;
  type?: number[];
  abilities?: number[];
};

@Injectable()
export class TeamBuilderService {
  #http = inject(HttpClient);

  fetchAllPokemon(searchBody: SearchBody) {
    return this.#http.get(``, { params: searchBody });
  }
}

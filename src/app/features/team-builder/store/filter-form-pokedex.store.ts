import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { FilterForm } from '@features/team-builder/types/filter-form.types';

export const PokemonSearchFormStore = signalStore(
  withState<FilterForm>({ name: '' }),
  withMethods((store) => ({
    updateData(data: FilterForm) {
      patchState(store, data);
    },
  })),
);

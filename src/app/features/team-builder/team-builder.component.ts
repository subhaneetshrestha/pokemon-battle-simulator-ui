import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PokedexComponent } from '@features/team-builder/components/pokedex/pokedex.component';
import { YourTeamComponent } from '@features/team-builder/components/your-team/your-team.component';

import { TeamBuilderService } from '@features/team-builder/team-builder.service';
import { PokemonSearchFormStore } from '@features/team-builder/store/filter-form-pokedex.store';

@Component({
  selector: 'pbs-team-builder',
  imports: [PokedexComponent, YourTeamComponent],
  providers: [
    {
      provide: TeamBuilderService,
      deps: [HttpClient],
    },
    PokemonSearchFormStore,
  ],
  templateUrl: './team-builder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamBuilderComponent {
  readonly #teamBuilderService = inject(TeamBuilderService);
}

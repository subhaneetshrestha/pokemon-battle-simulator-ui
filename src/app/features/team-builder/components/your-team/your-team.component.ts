import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'pbs-your-team',
  imports: [],
  templateUrl: './your-team.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YourTeamComponent {
  pokemon = input.required();
}

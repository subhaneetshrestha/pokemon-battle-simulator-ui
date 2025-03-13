import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'pbs-move-selector',
  imports: [],
  templateUrl: './move-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveSelectorComponent {
  moveClicked = output<number>();

  moveClick(id: number) {
    this.moveClicked.emit(id);
  }
}

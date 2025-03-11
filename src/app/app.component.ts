import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pbs-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}

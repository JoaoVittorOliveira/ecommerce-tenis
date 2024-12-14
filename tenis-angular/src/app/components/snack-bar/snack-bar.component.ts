import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  imports:[MatIcon],
  standalone: true,
  template: `
    <div class="snackbar-content" [@snackbarAnimation]>
      <mat-icon class="snackbar-icon">{{ data.icon }}</mat-icon>
      <span>{{ data.message }}</span>
    </div>
  `,
  styles: [`
    .snackbar-content {
      display: flex;
      align-items: center;
    }

    ::ng-deep .snackbar-info {
  background-color: #2196f3; /* Azul */
  color: white; /* Cor do texto */
}

    .snackbar-icon {
      margin-right: 8px;
      color: #fff;
    }

    span {
      color: #fff;
    }

    ::ng-deep .mat-snack-bar-container {
  transition: opacity 300ms ease;
}
  `],
  animations: [
    trigger('snackbarAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms 0s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms 0s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

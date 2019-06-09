import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './notif.component.html'
})
export class NotifComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
}

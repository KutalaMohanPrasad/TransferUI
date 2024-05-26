import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{

  constructor(
    public snackBarRef: MatSnackBarRef<MessagesComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: {messageType: string, message: string}
  ){}

  ngOnInit(): void {
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-create-employee-details',
  standalone: true,
  imports: [HeaderComponent,
    FormsModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatCardModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-employee-details.component.html',
  styleUrl: './create-employee-details.component.css'
})
export class CreateEmployeeDetailsComponent{
  
}

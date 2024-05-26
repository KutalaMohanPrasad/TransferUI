import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';
import { ViewEmployeeDetailsComponent } from './view-employee-details/view-employee-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,ViewEmployeeDetailsComponent,UpdateModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}

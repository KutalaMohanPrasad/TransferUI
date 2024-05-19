import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter, MAT_DATE_LOCALE ,MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import moment from 'moment';
import { EmployeeService } from '../service/employee-service';
import { BaseResponse } from '../response/baseResponse';
import { Router } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-create-employee-details',
  standalone: true,
  imports: [HeaderComponent,
    FormsModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatCardModule],
  providers: [provideNativeDateAdapter(),
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
  templateUrl: './create-employee-details.component.html',
  styleUrl: './create-employee-details.component.css'
})
export class CreateEmployeeDetailsComponent{

  createUserForm: FormGroup;
  userCreatedMessage: string = "User Created Successfully.";

  constructor(private employeeService: EmployeeService,
    private router: Router) {
    this.createUserForm = new FormGroup({
      name: new FormControl({value:'', disabled:false}, Validators.required),
      job_name: new FormControl({value:'', disabled:false}, Validators.required),
      hire_date: new FormControl({value:'', disabled:false}, Validators.required),
      manager_id: new FormControl({value:'', disabled:false},[Validators.required, Validators.pattern("^[0-9]*$")]),
      salary: new FormControl({value:'', disabled:false}, [Validators.required, Validators.pattern("^[0-9]*$")]),
      commission: new FormControl({value:'', disabled:false}, [Validators.required, Validators.pattern("^[0-9]*$")]),
      dep_id: new FormControl({value:'', disabled:false},[Validators.required, Validators.pattern("^[0-9]*$")]),
      department_name: new FormControl({value:'', disabled:false}, Validators.required),
      location: new FormControl({value:'', disabled:false}, Validators.required)
    });
  }

  createEmployeeWithDetails() {
      //create employee details request
      let request: CreateEmployee = {
        name: this.createUserForm.value.name,
        job_name: this.createUserForm.value.job_name,
        hire_date: moment(this.createUserForm.value.hire_date).format('YYYY-MM-DD'),
        manager_id:  Number(this.createUserForm.value.manager_id),
        salary:  Number(this.createUserForm.value.salary),
        commission:  Number(this.createUserForm.value.commission),
        dep_id:  Number(this.createUserForm.value.dep_id),
        department_name: this.createUserForm.value.department_name,
        location: this.createUserForm.value.location
      };

      //check request is valid and send to backend to process
      console.log("request:",request);
      this.employeeService.createEmployee(request).subscribe({
        next: (gridData: BaseResponse<any[]>) => {
          //console.log("update response",gridData);
          if(gridData.response === 'SUCCESS') {
                //this.sendMessage(this.userUpdatedMessage, Status.Success);
                console.log(this.userCreatedMessage);
                this.employeeService.refreshData.next(true);
          } 
      },
      error: (error: any) => {
        //this.sendMessage(this.errorMessage, Status.Error);
        console.log("Error",error);
    }
  });
        setTimeout(() => {
          this.router.navigate(['home']);
      }, 4000); 
  }

  onReset() {
    this.createUserForm.reset();
}
  
}

export interface CreateEmployee {
        name: string;
        job_name: string;
        manager_id: number;
        hire_date: string,
        salary: number;
        commission: number;
        dep_id: number;
        location: string;
        department_name: string;
}

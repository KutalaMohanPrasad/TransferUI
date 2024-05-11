import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import {ColDef, GridOptions} from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { BaseResponse } from '../response/baseResponse';
import { Status } from '../response/status';
import { EmployeeDetails, EmployeeService} from '../service/employee-service';
import { Message, MessageService } from '../service/message-service';
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';
@Component({
  selector: 'app-view-employee-details',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './view-employee-details.component.html',
  styleUrl: './view-employee-details.component.css'
})
export class ViewEmployeeDetailsComponent {

    isLoading: boolean = false;
    rowData: EmployeeDetails[] = [];
    colDefs: any[] = EmployeeDetailsColDefs;
    subscription: Subscription[] = [];
    errorMessage: string = 'There was an error whiel loading this page. please try again after sometime.';
    constructor(
      private employeeService: EmployeeService,
      private messageService: MessageService
    ) {
      this.onInitFunc();
    }

    onInitFunc() {
      this.getEmployeeDetails();
      const refreshDetailsData = this.employeeService.refreshData.subscribe(val =>{
          if(val) {
            this.getEmployeeDetails();
          }
      });
        this.subscription.push(refreshDetailsData);
    }

    getEmployeeDetails() {
      const employees = this.employeeService.getAllEmployeeDetails().subscribe({
          next: (gridData: BaseResponse<any[]>) => {
              this.rowData = gridData.response;
              this.isLoading = false;
          },
          error: (error: any) => {
            this.sendMessage(this.errorMessage, Status.Error);
            this.isLoading=true;
          }
      });
      this.subscription.push(employees);
    }

    sendMessage(text: string, type: Status) {
      const message: Message ={
        type: type,
        body: text
      };

      this.messageService.sendMessage(message);
    }

}

export const EmployeeDetailsColDefs: ColDef[] = [
  {
    headerName: '',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    width:45,
  },
  {
    field: 'emp_id',
    headerName: 'Employee Id',
    width: 155,
    minWidth: 140,
    sortable: true
  },
  {
    field: 'name',
    headerName: 'Employee Name',
    width: 155,
    minWidth: 140,
    sortable: true
  },
  {
    field: 'job_name',
    headerName: 'Job Name',
    width: 155,
    minWidth: 140,
    sortable: true
  },
  {
    field: 'manager_id',
    headerName: 'Manager Id',
    width: 155,
    minWidth: 140,
    sortable: true
  },
  {
    field: 'hire_date',
    headerName: 'Employee Start Date',
    width: 155,
    minWidth: 140,
    sortable: true
  },
  {
    field: 'department_name',
    headerName: 'Department Name',
    width: 155,
    minWidth: 140,
    sortable: true
  },
  {
    field: 'dep_id',
    headerName: 'Department Id',
    width: 155,
    minWidth: 140,
    sortable: true,
    hide:true
  },
  {
    field: 'location',
    headerName: 'location',
    width: 155,
    minWidth: 140,
    sortable: true
  },
  {
    field: 'salary',
    headerName: 'Salary',
    width: 155,
    minWidth: 140,
    sortable: true
  },
  {
    field: 'commission',
    headerName: 'Commission',
    width: 155,
    minWidth: 140,
    sortable: true
  }

]

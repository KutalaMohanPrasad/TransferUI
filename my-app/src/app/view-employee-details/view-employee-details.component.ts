import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import {ColDef, GridApi, GridOptions, SelectionChangedEvent} from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { BaseResponse } from '../response/baseResponse';
import { Status } from '../response/status';
import { EmployeeDetails, EmployeeService, UpdateEmployee} from '../service/employee-service';
import { Message, MessageService } from '../service/message-service';
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
@Component({
  selector: 'app-view-employee-details',
  standalone: true,
  imports: [ AgGridModule,
             FormsModule,
             CommonModule,
             UpdateModalComponent],
  templateUrl: './view-employee-details.component.html',
  styleUrl: './view-employee-details.component.css'
})
export class ViewEmployeeDetailsComponent{
    //modalRef: MdbModalRef<UpdateModalComponent> | null = null;
    isLoading: boolean = false;
    rowData: EmployeeDetails[] = [];
    colDefs: any[] = EmployeeDetailsColDefs;
    subscription: Subscription[] = [];
    errorMessage: string = 'Error while deleting the user. please try again after sometime.';
    userDeletedMessage: string = 'Selected User(s) are deleted successfully.';
    selectedRows: EmployeeDetails[] = [];
    public defaultColDef: ColDef = {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
    public rowSelection: "single" | "multiple" = "multiple";
    public paginationPageSize = 10;
    public paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
    public themeClass: string ="ag-theme-quartz";
    private gridApi!: GridApi;
    disable: boolean = true;
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

    getDeleteUsers(){
      this.selectedRows = this.gridApi.getSelectedRows();
      //console.log("getDeleteUsers:",this.selectedRows);
      if(this.selectedRows.length>0){
        
        let deleteEmployeesIds: number[]=[];
        this.selectedRows.forEach(emp => {
          deleteEmployeesIds.push(emp.emp_id);
        });
       this.employeeService.deleteEmployees(deleteEmployeesIds).subscribe({
            next: (gridData: BaseResponse<any[]>) => {
              
              if(gridData.response === 'SUCCESS') {
                    this.sendMessage(this.userDeletedMessage, Status.Success);
              } else if(gridData.response === 'PARTIAL_SUCCESS') {
                this.sendMessage(this.userDeletedMessage, Status.Partial);
              }
              this.getEmployeeDetails();
              this.isLoading = false;
          },
          error: (error: any) => {
            this.sendMessage(this.errorMessage, Status.Error);
            this.isLoading=true;
          }
        }); 
        this.disable = true;
      } else {
        this.disable = true;
      }
    }
  
    onSelectionChanged(event: SelectionChangedEvent) {
      this.selectedRows  = this.gridApi.getSelectedRows();
      //console.log("onSelectionChanged:",this.selectedRows);
      let length = this.selectedRows.length;
      if(length >0 ) {
        //this.disableUpdateButton =  length < 2 ? false : true;
        this.disable = false;
      } else {
        this.disable = true;
      }
    }
    onGridReady(params: any) {
      this.gridApi = params.api;
    }

}

export const EmployeeDetailsColDefs: ColDef[] = [
  {
    headerName: '',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    width:45,
    floatingFilter: false,
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

import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CreateEmployee } from "../create-employee-details/create-employee-details.component";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    constructor(private httpClient: HttpClient){

    }
    private baseUrl: string = "http://localhost:8080/api/v1/"
    private getEmployeeDetails='getAllEmployeeDetails';
    private createEmployeeEndpoint='createEmployee';
    private udpateEmployeeEndpoint='updateEmployee';
    private deleteEmployeesEndpoint='deleteEmployees';

    refreshData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    getAllEmployeeDetails() {
        return this.httpClient.get(this.baseUrl+this.getEmployeeDetails);
    }
    
    deleteEmployees(employeeIds: any){
        return this.httpClient.post(this.baseUrl+this.deleteEmployeesEndpoint, employeeIds);
    }

    udpateEmployeeDetails(updateEmployeeRequest:UpdateEmployee) {
        return this.httpClient.post(this.baseUrl+this.udpateEmployeeEndpoint, updateEmployeeRequest);
    }

    createEmployee(createEmployee: CreateEmployee){
        return this.httpClient.post(this.baseUrl+this.createEmployeeEndpoint, createEmployee);
    }

}
export interface UpdateEmployee{
        emp_id: number;
        name: string;
        job_name: string;
        manager_id:number;
        salary: number;
        commission: number;
        dep_id: number;

}
export interface EmployeeDetails{
        emp_id: number;
        name: string;
        job_name: string;
        manager_id:string;
        hire_date: string,
        salary: number;
        commission: number;
        dep_id: number;
        location: string;
        department_name: string;
}

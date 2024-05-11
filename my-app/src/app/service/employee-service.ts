import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    constructor(private httpClient: HttpClient){

    }
    private getEmployeeDetails='http://localhost:8080/api/v1/getAllEmployeeDetails';
    private createEmployee='/api/v1/createEmployee';
    private udpateEmployee='/api/v1/updateEmployee';
    private deleteEmployees='/api/v1/deleteEmployees';

    refreshData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    getAllEmployeeDetails() {
        return this.httpClient.get(this.getEmployeeDetails);
    }

}
export interface UpdateEmployee{
        emp_id: number;
        name: string;
        job_name: string;
        manager_id:string;
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

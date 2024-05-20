import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseResponse } from '../response/baseResponse';
import { Status } from '../response/status';
import { EmployeeDetails, EmployeeService, UpdateEmployee } from '../service/employee-service';
import { Message, MessageService } from '../service/message-service';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css'
})
export class UpdateModalComponent {
  closeResult: string = '';
  @Input() rowSelection : EmployeeDetails[] = [];
  updateUserForm: FormGroup;
  userUpdatedMessage: string = 'User Updated Successfully.';
  errorMessage: string = 'Error while deleting the user. please try again after sometime.';
  constructor(private modalService: NgbModal,
    private employeeService: EmployeeService,
    private messageService: MessageService) {
    this.updateUserForm = new FormGroup({
      emp_id : new FormControl({value:'', disabled:false},[Validators.required, Validators.pattern("^[0-9]*$")]),
      name: new FormControl({value:'', disabled:false}, Validators.required),
      jobname: new FormControl({value:'', disabled:false}, Validators.required),
      manager_id: new FormControl({value:'', disabled:false},[Validators.required, Validators.pattern("^[0-9]*$")]),
      salary: new FormControl({value:'', disabled:false}, [Validators.required, Validators.pattern("^[0-9]*$")]),
      commission: new FormControl({value:'', disabled:false}, [Validators.required, Validators.pattern("^[0-9]*$")]),
      depId: new FormControl({value:'', disabled:false},[Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }
  ngOnIt() {
  
  }
  updateUserFormValues(){
    this.updateUserForm.patchValue({
      emp_id: this.rowSelection[0].emp_id,
      name: this.rowSelection[0].name,
      jobname: this.rowSelection[0].job_name,
      manager_id: this.rowSelection[0].manager_id,
      salary: this.rowSelection[0].salary,
      commission: this.rowSelection[0].commission,
      depId: this.rowSelection[0].dep_id
    });
    //this.updateUserForm.get("emp_id")?.disable();
  }

  open(content: any) {
    this.updateUserFormValues();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateEmployeeDetails(){
   const selectedData = this.rowSelection;
   //console.log("this.updateUserForm",this.updateUserForm);
    if(selectedData.length >0 && selectedData.length <2){
      //create udpate employee request
      let request: UpdateEmployee = {
        emp_id: Number(this.updateUserForm.value.emp_id),
        name: this.updateUserForm.value.name,
        job_name: this.updateUserForm.value.jobname,
        manager_id:  Number(this.updateUserForm.value.emp_id),
        salary:  Number(this.updateUserForm.value.salary),
        commission:  Number(this.updateUserForm.value.commission),
        dep_id:  Number(this.updateUserForm.value.depId)
      };
      //console.log("request",request)
      this.employeeService.udpateEmployeeDetails(request).subscribe({
        next: (gridData: BaseResponse<any[]>) => {
          //console.log("update response",gridData);
          if(gridData.response === 'SUCCESS') {
                this.sendMessage(this.userUpdatedMessage, Status.Success);
                console.log(this.userUpdatedMessage);
                this.employeeService.refreshData.next(true);
          } 
      },
      error: (error: any) => {
        this.sendMessage(this.errorMessage, Status.Error);
        console.log("Error",error);
      }
    });
      this.rowSelection = [];
      this.modalService.dismissAll();
    } else {
      this.rowSelection = [];
    }
  }

  sendMessage(text: string, type: Status) {
    const message: Message ={
      type: type,
      body: text
    };
    
    this.messageService.sendMessage(message);
  }

}

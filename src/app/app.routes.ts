import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateEmployeeDetailsComponent } from './create-employee-details/create-employee-details.component';
import { ViewEmployeeDetailsComponent } from './view-employee-details/view-employee-details.component';

export const routes: Routes = [
    {path:'', component:ViewEmployeeDetailsComponent},
    {path:'home', component:ViewEmployeeDetailsComponent},
    {path:'Transfer-create', component:CreateEmployeeDetailsComponent}
];
@NgModule({
    declarations: [],
    bootstrap: [],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
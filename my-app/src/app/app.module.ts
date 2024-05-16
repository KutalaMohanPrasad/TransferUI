import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [HttpClientModule,BrowserAnimationsModule,BrowserModule, FormsModule, NgbModal]
})
export class AppModule {}
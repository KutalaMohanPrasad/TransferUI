import { Injectable } from "@angular/core";
import {MatSnackBar } from "@angular/material/snack-bar";
import { MessagesComponent } from "../messages/messages.component";

export interface Message {
    body: string;
    type?: string;
}
@Injectable({
    providedIn: 'root'
})

export class MessageService{

    isDuration: boolean = false;
    constructor(
        private snackBar: MatSnackBar
    ){ }

    sendMessage(message: Message): { messageType: string, messageBody: string, duration: number} {
        const type = message.type && message.type.length ? message.type.toUpperCase() : message.type;
        let duration = 2000;
        let messageType;
        let className = "snackbar-info";

        switch (type) {
            case "SUCCESS":
                if (this.isDuration) {
                    duration = 11000;
                }
                messageType = "ws-snackbar-success";
                className = "snackbar-success";
                break;
            case "ERROR":
                duration = 7000;
                messageType = "ws-snackbar-error";
                className = "snackbar-error";
                break;
            case "WARNING":
                    duration = 7000;
                    messageType = "ws-snackbar-warning";
                    className = "snackbar-warning";
                    break;
            default:
                messageType = "ws-snackbar-info";
        }
        if(!message.body || message.body === "") {
            console.warn("The message is empty. Please add some message to display.");
        }
        this.openSnackBar(messageType,message.body,duration,className);
        return {
            messageType,messageBody:message.body,duration
        }
    }
    openSnackBar(messageType: string, message: string, duration: number, className:string):void {
        this.snackBar.openFromComponent(MessagesComponent, {
            data: {
                messageType,
                message
            },
            duration,
            panelClass: ['snackbar', className],
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
        });
    }

}
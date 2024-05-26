export class ResponseHeader{
    timestamp?: string;
    status?: string;
    errorCode?: string;
    errorMessage?: string;

    static buildObject(timestamp?: string,
        status?: string,
        errorCode?: string,
        errorMessage?: string,): ResponseHeader{
            let temp = new ResponseHeader();
            temp.status = <string> status;
            temp.errorCode = <string> errorCode;
            temp.errorMessage = <string> errorMessage;
            temp.timestamp = <string> timestamp;
            return temp;
        }
}
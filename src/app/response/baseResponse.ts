import { EmployeeDetails } from "../service/employee-service";
import { ResponseHeader } from "./responseHeader";

export class BaseResponse<T>{
    header?: ResponseHeader;
    response?: any;

    static buildObject<T>(header: ResponseHeader, response: T): BaseResponse<T>{
        let temp = new BaseResponse<T>();
        temp.header = header;
        temp.response = response;
        return temp;
    }
}
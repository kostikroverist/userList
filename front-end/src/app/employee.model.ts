import { IEmp } from './employee.interface';

export class Employee  implements IEmp{
    constructor(
        public firstName: string,
        public lastName: string,
        public emailId: string
    ) {}
}
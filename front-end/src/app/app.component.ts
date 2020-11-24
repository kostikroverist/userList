import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmp } from './employee.interface';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employees: Array<IEmp> = [];
  isEditing = false;
  editingId: number;
  form: FormGroup;
  constructor(
    private employeeService: EmployeeService
  ) {
    
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email])
    })
   this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeService.getEmployee().subscribe(data => this.employees = data);
  }

  submitEmployee(): void {
    const employee = new Employee(
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.email
    );

    this.employeeService.postEmployee(employee).subscribe(() => {
      this.getEmployees();
      this.form.reset();
    })

  }
  public deleteEmployee(id:number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => this.getEmployees());
  }

  public editEmployee(emp: IEmp): void {
    this.form.setValue({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.emailId
    });

    this.isEditing = true;
    this.editingId = emp.id;
  }

  public saveEditedEmployee(): void {
    const employee = new Employee(
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.email
    );

    this.employeeService.updateEmployee({...employee, id: this.editingId } as IEmp)
      .subscribe(() => {
        this.getEmployees();
        this.form.reset();
        this.isEditing = false;
      })
  }
}

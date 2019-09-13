import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataSaved = false;
  employeeForm: any;
  allEmployees: Observable<Employee[]>;
  employeeIdUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({
      EmpName: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      PinCode: ['', [Validators.required]],
    });
    this.loadAllEmployees();
  }
  loadAllEmployees() {
    this.allEmployees = this.employeeService.getAllEmployee();
  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }
  loadEmployeeToEdit(employeeId: string) {
    this.employeeService.getEmployeeById(employeeId).subscribe(employee => {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.EmpId;
      this.employeeForm.controls['EmpName'].setValue(employee.EmpName);
      this.employeeForm.controls['DateOfBirth'].setValue(employee.DateOfBirth);
      this.employeeForm.controls['EmailId'].setValue(employee.EmailId);
      this.employeeForm.controls['Gender'].setValue(employee.Gender);
      this.employeeForm.controls['Address'].setValue(employee.Address);
      this.employeeForm.controls['PinCode'].setValue(employee.PinCode);
    });

  }
  
  CreateEmployee(employee: Employee) {
    if (this.employeeIdUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'บันทึกข้อมูลเรียบร้อย';
          this.loadAllEmployees();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        }
      );
    }
    else {
      employee.EmpId = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'อัพเดทข้อมูลเรียบร้อย';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }
  deleteEmployee(employeeId: string) {
    if (confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่ ?")) {  
      this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'ลบข้อมูลเรียบร้อย';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }
  resetForm() {
    this.employeeForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
}

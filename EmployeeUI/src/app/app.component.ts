import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from './models/employee-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EmployeeUI';

  constructor(private dataStorageService: DataStorageService) { }

  data: Employee[];
  EmpForm: FormGroup;
  submitted = false;
  EventValue = 'Save';

  ngOnInit(): void {
    this.getdata();

    this.EmpForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      role: new FormControl(null),
      department: new FormControl(null),
      skillSets: new FormControl(null),
      dateOfBirth: new FormControl(null),
      dateOfJoining: new FormControl(null, [Validators.required]),
      isActive: new FormControl(false, [Validators.required])
    });
  }

  getdata(): void {
    this.dataStorageService.getData().subscribe((data: Employee[]) => {
      this.data = data;
    },
    error => {
      console.log(error);
    }
    );
  }

  deleteData(id: number): void {
    this.dataStorageService.deleteData(id).subscribe(response => {
      this.getdata(); // Should cache and use memory version instead of service call.
    }
      , error => {
          console.log(error);
      });
  }

  OnSubmit(): void {
    if (this.EventValue === 'Save'){
      this.Save();
    }
    else
    {
      this.Update();
    }
  }

  Save(): void {
    this.submitted = true;

    if (this.EmpForm.invalid) {
      return;
    }
    this.dataStorageService.postData(this.EmpForm.value).subscribe(response => {
      this.getdata(); // Should cache and use memory version instead of service call.
      this.resetFrom();
    }
    , error => {
        console.log(error);
    });
  }

  Update(): void {
    this.submitted = true;

    if (this.EmpForm.invalid) {
     return;
    }
    this.dataStorageService.putData(this.EmpForm.value.id, this.EmpForm.value).subscribe(response => {
      this.getdata(); // Should cache and use memory version instead of service call.
      this.resetFrom();
    }
    , error => {
        console.log(error);
    });
  }

  EditData(Data: Employee): void {
    this.EmpForm.controls.id.setValue(Data.id);
    this.EmpForm.controls.name.setValue(Data.name);
    this.EmpForm.controls.address.setValue(Data.address);
    this.EmpForm.controls.role.setValue(Data.role);
    this.EmpForm.controls.department.setValue(Data.department);
    this.EmpForm.controls.skillSets.setValue(Data.skillSets);
    this.EmpForm.controls.dateOfBirth.setValue(Data.dateOfBirth === null ? null : Data.dateOfBirth.toString().substring(0, 10));
    this.EmpForm.controls.dateOfJoining.setValue(Data.dateOfJoining.toString().substring(0, 10));
    this.EmpForm.controls.isActive.setValue(Data.isActive);

    this.EventValue = 'Update';
  }

  resetFrom(): void
  {
    this.EmpForm.reset();
    this.EventValue = 'Save';
    this.submitted = false;
  }
}

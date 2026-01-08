import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DummyserviceService } from "src/app/dummyservice.service";

@Component({
  selector: "app-dummy1",
  templateUrl: "./dummy1.component.html",
  styles: [],
})
export class Dummy1Component implements OnInit {
  userForm!: FormGroup;
  users: any[] = [];
  id = 1;
  // landList: any = [];
  userList: any = [];
  functionIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private dummyservice: DummyserviceService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      gender: ["", Validators.required],
      dob: ["", Validators.required],
      course: [""],
      Usersview: [""],
      agree: [false],
    });
    // this.getCourseDetails();
    this.getUserFrom();
  }

  submitForm() {
    debugger;

    this.users.push({
      id: this.id++,
      ...this.userForm.value,
    });

    this.userForm.reset();
  }
  // getCourseDetails() {
  //   this.dummyservice.getCompanyslbreport().subscribe((res) => {
  //     let json: any = [];
  //     json = res;
  //   });
  // }

  getUserFrom() {
    const name = "kiran";

    this.dummyservice.getUserForms1(name).subscribe((res) => {
      console.log("FULL RESPONSE:", res);

      this.functionIds = [];

      if (res && res.moduleDTOList) {
        res.moduleDTOList.forEach((module) => {
          if (module.lstSubModuleDTO) {
            module.lstSubModuleDTO.forEach((sub) => {
              if (sub.functionsDTOList) {
                sub.functionsDTOList.forEach((func) => {
                  this.functionIds.push(func.pFunctionID);
                });
              }
            });
          }
        });
      }

      console.log("Extracted Function IDs:", this.functionIds);
    });
  }
}

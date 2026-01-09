import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DummyserviceService } from "src/app/dummyservice.service";

interface UserRights {
  moduleDTOList: Array<{
    lstSubModuleDTO: Array<{
      functionsDTOList: Array<{
        pFunctionID: number;
      }>;
    }>;
  }>;
}

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
    this.loadUsers();
  }
  loadUsers() {
    this.dummyservice.getUsers().subscribe((res) => {
      debugger;
      this.userList = res;
      console.log("res:", userList);
    });
  }

  onUserChange(userName: string) {
    if (!userName) {
      this.functionIds = [];
      return;
    }

    this.dummyservice
      .getUserRightsByUserName(userName)
      .subscribe((res: UserRights) => {
        debugger;
        this.functionIds = [];
        console.log("functionids:", this.functionIds);
        debugger;

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
      });
  }
  submitForm() {
    debugger;

    this.users.push({
      id: this.id++,
      ...this.userForm.value,
    });

    this.userForm.reset();
  }
}

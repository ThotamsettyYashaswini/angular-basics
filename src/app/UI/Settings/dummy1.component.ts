import { Component, OnInit, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap";
import { DummyserviceService } from "src/app/dummyservice.service";
@Component({
  selector: "app-dummy1",
  templateUrl: "./dummy1.component.html",
  styles: [],
})
export class Dummy1Component implements OnInit {
  userForm!: FormGroup;

  users: any[] = [];
  gridData = [];

  id = 1;
  public ProjectLaunchdateConfig: Partial<BsDatepickerConfig> =
    new BsDatepickerConfig();

  companyList: any[] = [];
  villageList: any[] = [];
  documentList: any[] = [];
  PlotsLayoutsValidationErrors: any = {};

  constructor(
    private fb: FormBuilder,
    private dummyservice: DummyserviceService
  ) {
    this.ProjectLaunchdateConfig.containerClass = "theme-dark-blue";
    this.ProjectLaunchdateConfig.showWeekNumbers = false;
    //this.ProjectLaunchdateConfig.maxDate = this.today;
    this.ProjectLaunchdateConfig.dateInputFormat = "DD/MM/YYYY";
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      gender: ["", Validators.required],
      course: [""],
      company: ["", Validators.required],
      village: ["", Validators.required],
      agree: [false, Validators.requiredTrue],
      fillingDate: ["", Validators.required],
    });

    this.getCompanies();
  }

  getCompanies(): void {
    debugger;
    this.dummyservice.GetCompanyslbreport().subscribe((res: any) => {
      this.companyList = res;
    });
  }

  onCompanyChange(event: any): void {
    debugger;
    const company = event.target.value;

    this.villageList = [];
    this.documentList = [];

    this.userForm.patchValue({
      village: "",
    });

    if (company) {
      this.getVillages(company);
    }
  }

  getVillages(company: string): void {
    debugger;
    this.dummyservice.GetVillageslbreport(company).subscribe((res: any) => {
      this.villageList = res;
    });
  }

  onVillageChange(event: any): void {
    debugger;
    const village = event.cityvillage;
    const company = this.userForm.value.company;

    this.documentList = [];

    if (company && village) {
      this.getDocuments(company, village);
    }
  }

  getDocuments(company: string, village: string): void {
    debugger;
    this.dummyservice
      .Getdocumentslbreport(company, village)
      .subscribe((res: any) => {
        debugger;

        if (res) {
          this.documentList = res;
        } else if (res) {
          this.documentList = res;
        } else {
          this.documentList = [];
        }

        console.log("Documents:", this.documentList);
      });
  }
  DateChange(date: Date) {
    if (!date) {
      this.PlotsLayoutsValidationErrors.fillingDate = "Date is required";
    } else {
      this.PlotsLayoutsValidationErrors.fillingDate = "";
    }
  }

  // ---------------- SUBMIT ----------------
  submitForm() {
    if (this.userForm.valid) {
      this.gridData.push({
        id: this.gridData.length + 1,
        name: this.userForm.value.name,
        gender: this.userForm.value.gender,
        fillingDate: this.userForm.value.fillingDate,
        course: this.userForm.value.course,
        company: this.userForm.value.company,
        village: this.userForm.value.village,
        documents: this.documentList,
        agree: this.userForm.value.agree,
      });

      this.userForm.reset();
    }
  }
}

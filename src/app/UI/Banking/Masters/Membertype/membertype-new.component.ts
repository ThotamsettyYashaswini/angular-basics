import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoansmasterService } from "../../../../Services/Loans/Masters/loansmaster.service";
import { CommonService } from '../../../../Services/common.service';

import { MemberService } from '../../../../Services/Banking/member.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-membertype-new',
  templateUrl: './membertype-new.component.html',
  styles: []
})
export class MembertypeNewComponent implements OnInit {

  MemberTypeForm: FormGroup

  constructor(private fb: FormBuilder, private _loanmasterservice: LoansmasterService,
    private _CommonService: CommonService, private _MemberService: MemberService,
    private _router: Router, private _toastr: ToastrService) { }

  MemberTypeErrorMessages: any
  ButtonText: string = "Save"
  isLoading = false;

  CompanyDetails: any
  Ccode: string
  Bcode: string
  MemberCode: string

  MemberNameandCode: string

  ngOnInit() {
    debugger

    // var dateString = "12/26/2019";
    // var date1 = new Date(dateString);
    // var daysPrior = 28;
    // date1.setDate(date1.getDate() - daysPrior);
    // console.log("New Date",date1);
    // console.log("New Date",date1.toISOString());


    this.MemberTypeErrorMessages = {}
    this.MemberTypeForm = this.fb.group({
      pmembertypeid: ['0'],
      pmembertype: ['', Validators.required],
      pmembertypecode: ['', Validators.required],
      pcompanycode: [''],
      pbranchcode: [''],
      pseries: ['00001'],
      pserieslength: ['5'],
      pmembercode: [''],
      pissharesissueapplicable: ['false'],
      pCreatedby: [this._CommonService.pCreatedby]
    })
    this.MemberTypeForm.controls.pissharesissueapplicable.setValue(false)
    this.BlurEventAllControll(this.MemberTypeForm);
    this._loanmasterservice.GetCompanyBranchDetails().subscribe(json => {
      this.CompanyDetails = json
      this.Ccode = this.CompanyDetails[0].pEnterprisecode
      this.Bcode = this.CompanyDetails[0].pBranchcode
      this.MemberTypeForm.controls.pcompanycode.setValue(this.Ccode)
      this.MemberTypeForm.controls.pbranchcode.setValue(this.Bcode)
    })

    let ButtonType = this._MemberService.GetButtonType()
    if (ButtonType != "New") {
      this.ButtonText = "Update"
      this.LoadDataForEdit()
    }


  }

  LoadDataForEdit() {
    debugger
    let data = this._MemberService.GetMemberDetailsForEdit()

    if (data != undefined) {

      this.MemberTypeForm.controls.pmembertypeid.setValue(data.pmembertypeid)
      this.MemberTypeForm.controls.pmembertype.setValue(data.pmembertype)
      this.MemberTypeForm.controls.pmembertypecode.setValue(data.pmembertypecode)
      this.MemberTypeForm.controls.pcompanycode.setValue(data.pcompanycode)
      this.Ccode = data.pcompanycode
      this.MemberTypeForm.controls.pbranchcode.setValue(data.pbranchcode)
      this.Bcode = data.pbranchcode
      this.MemberTypeForm.controls.pseries.setValue(data.pseries)
      this.MemberTypeForm.controls.pserieslength.setValue(data.pserieslength)
      this.MemberTypeForm.controls.pmembercode.setValue(data.pmembercode)
      this.MemberNameandCode = data.pmembercode
      this.MemberTypeForm.controls.pissharesissueapplicable.setValue(data.pissharesissueapplicable)
      this.MemberTypeForm.controls.pCreatedby.setValue(data.pCreatedby)


    }

  }



  public GenerateMemberCode(event) {
    debugger
    this.MemberCode = ""
    let membertype = event.currentTarget.value;
    if (membertype != "") {

      this._MemberService.CheckMemberTypeDuplicate(membertype).subscribe(result => {
             debugger
        if (Number(result) == 0) {
          let tempdata = membertype.split(' ')
          for (var i = 0; i < tempdata.length; i++) {
            this.MemberCode += tempdata[i].charAt(0)
          }
          this.MemberTypeForm.controls.pmembertypecode.setValue(this.MemberCode);
          this.MemberNameandCode = this.MemberCode + this.Ccode + this.Bcode + this.MemberTypeForm.controls.pseries.value;
          this.MemberTypeForm.controls.pmembercode.setValue(this.MemberNameandCode);
        }
        else {
          this.MemberTypeForm.controls.pmembertype.setValue("");
          this._toastr.warning("Duplicate membertypes are not allowed ")
        }

      })

    }
    else {
      this.MemberTypeForm.controls.pmembertypecode.setValue("");
      this.MemberTypeForm.controls.pseries.setValue('00001');
      this.MemberNameandCode = "";
    }
  }

  public ChangeMemberCode(event) {
    debugger
    let code = event.currentTarget.value;
    if (code != "") {
      this.MemberNameandCode = this.MemberTypeForm.controls.pmembertypecode.value + this.Ccode + this.Bcode + this.MemberTypeForm.controls.pseries.value;
      this.MemberTypeForm.controls.pmembercode.setValue(this.MemberNameandCode);
    }
    else {
      this.MemberNameandCode = "";
    }
  }

  GenerateSeries(event) {
    debugger
    let str = event.currentTarget.value
    if (str != "") {
      if (this.MemberTypeForm.controls.pmembertype.value != "" && this.MemberTypeForm.controls.pmembertypecode.value != "") {
        this.MemberNameandCode = this.MemberTypeForm.controls.pmembertypecode.value + this.Ccode + this.Bcode + str

        this.MemberTypeForm.controls.pserieslength.setValue(str.length)
        this.MemberTypeForm.controls.pmembercode.setValue(this.MemberNameandCode)
      }
    }
  }

  SharesIssuedOrNot(event) {
    debugger
    let checked = event.currentTarget.checked
    if (checked == true) {
      this.MemberTypeForm.controls.pissharesissueapplicable.setValue(true)
     
    } else {
      this.MemberTypeForm.controls.pissharesissueapplicable.setValue(false)
     
    }
  }

  // Validation Checking Methods Start
  checkValidations(group: FormGroup, isValid: boolean): boolean {
    try {
      Object.keys(group.controls).forEach((key: string) => {
        isValid = this.GetValidationByControl(group, key, isValid);
      })
    }
    catch (e) {

      this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }
  GetValidationByControl(formGroup: FormGroup, key: string, isValid: boolean): boolean {
    try {
      let formcontrol;
      formcontrol = formGroup.get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.MemberTypeErrorMessages[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._CommonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.MemberTypeErrorMessages[key] += errormessage + ' ';
                isValid = false;
              }
            }
          }
        }
      }
    }
    catch (e) {
      // this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }
  showErrorMessage(errormsg: string) {
    this._CommonService.showErrorMessage(errormsg);
  }
  BlurEventAllControll(fromgroup: FormGroup) {
    try {
      Object.keys(fromgroup.controls).forEach((key: string) => {
        this.setBlurEvent(fromgroup, key);
      })
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
  }
  setBlurEvent(fromgroup: FormGroup, key: string) {
    try {
      let formcontrol;
      formcontrol = fromgroup.get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          this.BlurEventAllControll(formcontrol)
        }
        else {
          if (formcontrol.validator)
            fromgroup.get(key).valueChanges.subscribe((data) => { this.GetValidationByControl(fromgroup, key, true) })
        }
      }
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
  }
  // Validation Checking Methods End

  SaveAndUpdateMemberType() {
    debugger
    let isValid = true;
    if (this.checkValidations(this.MemberTypeForm, isValid)) {
      if (this.MemberTypeForm.valid) {

        

        this._MemberService.CheckMemberTypeDuplicate(this.MemberTypeForm.controls.pmembertype.value).subscribe(result => {

          if (Number(result) == 0) {
            this.isLoading = true
            let data = JSON.stringify(this.MemberTypeForm.value)
            if (this.MemberTypeForm.controls.pmembertypeid.value == 0) {
              this._MemberService.SaveMemberTypeDetails(data).subscribe(result => {
                let a = result
                this.MemberTypeForm.reset()
                this.MemberTypeForm.controls.pseries.setValue('00001');
                this.MemberNameandCode = "";
                this._toastr.success("Membertype saved successfully")
                this.isLoading = false
                this._router.navigate(['/MembertypeView'])
              }, err => {
                this.isLoading = false
                this._toastr.warning("Duplicate membertypes are not allowed ")
              })
            }
            else {
              this._MemberService.UpdateMemberTypeDetails(data).subscribe(result => {
                let a = result
                this.MemberTypeForm.reset()
                this.MemberTypeForm.controls.pseries.setValue('00001');
                this.MemberNameandCode = "";
                this._toastr.success("Membertype update successfully")
                this._MemberService.SetMemberDetailsForEdit(undefined)
                this.isLoading = false
                this._router.navigate(['/MembertypeView'])
              }, err => {
                this.isLoading = false
                this._toastr.warning("Duplicate membertypes are not allowed ")
              })
            }

          } else {
            this.MemberTypeForm.controls.pmembertype.setValue("");
            this._toastr.warning("Duplicate membertypes are not allowed ")
          }


        })

      }
    } else {
      // this._toastr.error("Error occured while saveing,check details again")
    }



  }




}

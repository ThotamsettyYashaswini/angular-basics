import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { PhotouploadService } from 'src/app/Services/Loans/Masters/photoupload.service';
import { DefaultProfileImageService } from 'src/app/Services/Loans/Masters/default-profile-image.service';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl, FormArray, MaxLengthValidator } from '@angular/forms';
import { ContacmasterService } from 'src/app/Services/Loans/Masters/contacmaster.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LayoutcreationService } from 'src/app/Services/Plots/layoutcreation.service';

@Component({
  selector: 'app-layout-creation',
  templateUrl: './layout-creation.component.html',
  styles: []
})
export class LayoutCreationComponent implements OnInit {

  public LayoutCreationForm: FormGroup;
  public isLoading = true;
  public savebutton = "Save";
  public disablesavebutton = false;
  public LayoutCreationValidationErrors: any;
  public permitnosArray:any=[];
  constructor(private _commonservice: CommonService, private formbuilder: FormBuilder, private _routes: Router, private datePipe: DatePipe, private toastr: ToastrService, private _LayoutcreationService:LayoutcreationService ) {

  }
  ngOnInit() {
    this.LayoutCreationValidationErrors = [];
    this.LayoutCreationForm = this.formbuilder.group({
      ppermitno: ['', Validators.required],
      pTotalplots: ['', [Validators.required]],
      pRateperSqyard: ['', Validators.required],
      pRegsitrationfee: ['', Validators.required],
      pBookingAmount: ['', Validators.required]
    });
    

    /** form validation */
    this.BlurEventAllControll(this.LayoutCreationForm);

    /**get permitnos */
    this.getPermitNOs();
  }

   /**get permitnos */
  public getPermitNOs(){
    this._LayoutcreationService.GetPermitnumber().subscribe(json => {
      if(json!=null){
        this.permitnosArray = json;
      }
    });

  }

  
  public  SaveLayoutEntry() {
    debugger
    let isValid: boolean = true;

    if (this.checkValidations(this.LayoutCreationForm, isValid)) {
      this.disablesavebutton = true;
      this.savebutton = "Processing";
    }

  }

  showInfoMessage(errormsg: string) {
    this._commonservice.showInfoMessage(errormsg);
  }

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

          //if (key != 'InsuranceMemberNomineeDetailsList')
          //  this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.LayoutCreationValidationErrors[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {

                let lablename;

                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.LayoutCreationValidationErrors[key] += errormessage + ' ';
                isValid = false;
              }
            }

          }
        }
      }

    }
    catch (e) {
      this._commonservice.showErrorMessage(key);
      return false;
    }
    return isValid;
  }
  showErrorMessage(errormsg: string) {
    this._commonservice.showErrorMessage(errormsg);
  }
  BlurEventAllControll(fromgroup: FormGroup) {

    try {

      Object.keys(fromgroup.controls).forEach((key: string) => {
        this.setBlurEvent(fromgroup, key);
      })

    }
    catch (e) {
      this._commonservice.showErrorMessage(e);
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
      this._commonservice.showErrorMessage(e);
      return false;
    }



  }

}

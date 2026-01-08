import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';

@Component({
  selector: 'app-hearing-details',
  templateUrl: './hearing-details.component.html',
  styles: []
})
export class HearingDetailsComponent implements OnInit {
  hearingDetailsForm:FormGroup;
  public ProjectLaunchdateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public nextHearingDateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  hearingList: any = [];
  casenumList: any = [];
  savebutton:any = 'Save';
  PlotsLayoutsValidationErrors: any;
  getHearingList: any = [];
  disabletransactiondate = false;
  disableNextHearingDate = false;
  categoryList:any = [
    {'id': 1, 'categoryType' : 'Ongoing'},
    {'id': 2, 'categoryType' : 'Disposed'}
  ]
  nextHearing: any;
  constructor(private fb : FormBuilder,private _plotcreationservices:PlotcreationService, private common:CommonService , private router:Router, private datepipe:DatePipe, private ActRoute: ActivatedRoute) { 
    this.ProjectLaunchdateConfig.containerClass = 'theme-dark-blue';
    this.ProjectLaunchdateConfig.showWeekNumbers = false;
    //this.ProjectLaunchdateConfig.maxDate = this.today;
    this.ProjectLaunchdateConfig.dateInputFormat = 'DD/MM/YYYY';

    this.nextHearingDateConfig.containerClass = 'theme-dark-blue';
    this.nextHearingDateConfig.showWeekNumbers = false;
    //this.nextHearingDateConfig.maxDate = this.today;
    this.nextHearingDateConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit() {

    this.hearingDetailsForm = this.fb.group({
      hearingId: [''],
      caseNO: ['',Validators.required],
      psurveyno: [''],
      pdocumentno: [''],
      hearingDate: ['',Validators.required],
      hearingType: [''],
      remarks: ['',Validators.required],
      nextHearing: [''],
      hearingAttendedBy: ['',Validators.required],
      phearingdetails: [''],
      category: [''],
    });

    this.GetCourtcaseHearingtype();
    this.Getcasenumber();
    this.PlotsLayoutsValidationErrors = {};
        this.BlurEventAllControll(this.hearingDetailsForm);

        if (this.ActRoute.snapshot.params['id']) {
          let hearingNo = atob(this.ActRoute.snapshot.params['id']);
          this.getHearingDetailsById(hearingNo);
        }
  }

  DateChange($event){
    debugger;
    this.hearingDetailsForm.controls.nextHearing.setValue('');
    this.PlotsLayoutsValidationErrors.nextHearing = '';
    let hearingDate = new Date(this.hearingDetailsForm.controls.hearingDate.value);
    hearingDate.setDate(hearingDate.getDate() + 1);    
    this.nextHearingDateConfig.minDate = hearingDate;
  }

  categoryChange(event){
    debugger;
    if(this.hearingDetailsForm.controls.category.value == 'Disposed'){
      this.disableNextHearingDate = true;
    }    
  }

  DateChange1($event){
    // debugger;
    // let nextHearing=this.datepipe.transform(this.hearingDetailsForm.controls.nextHearing.value,'dd/MM/yyyy')
    // let finalnextHearing=this.common.formatDateFromDDMMYYYY(nextHearing);

    // let hearingDate=this.datepipe.transform(this.hearingDetailsForm.controls.hearingDate.value,'dd/MM/yyyy')
    // let finalhearingDate=this.common.formatDateFromDDMMYYYY(hearingDate);

    //  if(finalnextHearing<finalhearingDate){
    //      this.common.showWarningMessage('Next Hearing Date must be greater than or equal to Hearing Date');
    //      this.hearingDetailsForm.controls.nextHearing.setValue('');
    //      return
    //  }
  }

  caseNoChange(event){
    debugger;
   this.hearingDetailsForm.controls.pdocumentno.setValue(event.prepresentedbydocumentinland);
   this.hearingDetailsForm.controls.psurveyno.setValue(event.psurveyno);

   this._plotcreationservices.Checklbcasecount(event.plbcaseid).subscribe(res => {
    let count = res;
    if(count > 0){
      this._plotcreationservices.Gethearigdate(event.plbcaseid).subscribe(json => {
        let valuee = json.phearingdate;
        valuee = new Date(valuee)
        this.ProjectLaunchdateConfig.minDate = valuee;
        this.hearingDetailsForm.controls.hearingDate.setValue(valuee);
        this.disabletransactiondate = true;

      })
      
    }
    else{
    // let today = new Date();
    // today.setFullYear(today.getFullYear() - 5); 
    //today.setMonth(today.getMonth() - 2);
    //today.setDate(today.getDate() - 45);
    this.ProjectLaunchdateConfig.minDate = null; 
    this.hearingDetailsForm.controls.hearingDate.setValue('');
    this.PlotsLayoutsValidationErrors.hearingDate = '';
    this.disabletransactiondate = false;


    }
   })
   
  }

 

  GetCourtcaseHearingtype(){
    debugger;
    this._plotcreationservices.GetCourtcaseHearingtype().subscribe(result => {
      this.hearingList = result;
    })
  }

  Getcasenumber(){
    debugger;
    this._plotcreationservices.Getcasenumber().subscribe(json => {
      this.casenumList = json;
    })
  }

  saveHearingDetails(){
    debugger;
    let isvalid = true;
      if (this.checkValidations(this.hearingDetailsForm, isvalid)) {
if(this.savebutton == 'Update'){
  this.updateHearingDetails();
}

if(this.savebutton != 'Update'){
  let hearingDate = this.datepipe.transform(new Date(this.hearingDetailsForm.controls.hearingDate.value), "yyyy-MM-dd");
  if(this.hearingDetailsForm.controls.nextHearing.value != ''){
  this.nextHearing = this.datepipe.transform(new Date(this.hearingDetailsForm.controls.nextHearing.value), "yyyy-MM-dd");
  }else{
    this.nextHearing = null;
  }
    let data = {
      "plbCaseID": this.hearingDetailsForm.controls.caseNO.value,
      "plbCaseHearingDate": hearingDate,
      "pCaseHearingType":  this.hearingDetailsForm.controls.hearingType.value,
      "pOutcome":  this.hearingDetailsForm.controls.remarks.value,
      "pnexthearingdate":  this.nextHearing,
      "phearingattendedby":  this.hearingDetailsForm.controls.hearingAttendedBy.value,
      "phearingdetails":  this.hearingDetailsForm.controls.phearingdetails.value,
      "pdocumentno":  this.hearingDetailsForm.controls.pdocumentno.value,
      "psurveyno":  this.hearingDetailsForm.controls.psurveyno.value,
      "phearingcasestatus":  this.hearingDetailsForm.controls.category.value,
    } 

  let json = JSON.stringify(data);

  this._plotcreationservices.SaveCaseHearings(json).subscribe(res => {
    this.common.showInfoMessage('Saved Successfully');
    this.hearingDetailsForm.reset();
    this.clearForm();
    this.router.navigate(["/ViewHearingDetails"])
  })
}
  }
}

updateHearingDetails(){
  debugger;
  let data = {
    "plbHearingID": this.hearingDetailsForm.controls.hearingId.value,
    "plbCaseID": this.hearingDetailsForm.controls.caseNO.value,
    "plbCaseHearingDate":  this.datepipe.transform(this.hearingDetailsForm.controls.hearingDate.value,'yyyy-MM-dd'),
    "pCaseHearingType":  this.hearingDetailsForm.controls.hearingType.value,
    "pOutcome":  this.hearingDetailsForm.controls.remarks.value,
    "pnexthearingdate":  this.datepipe.transform(new Date(this.hearingDetailsForm.controls.nextHearing.value),'yyyy-MM-dd'),
    "phearingattendedby":  this.hearingDetailsForm.controls.hearingAttendedBy.value,
    "phearingdetails":  this.hearingDetailsForm.controls.phearingdetails.value,
  }

  let json = JSON.stringify(data);


  this._plotcreationservices.updateHearingDetails(json).subscribe(json => {
    this.common.showInfoMessage('Updated Successfully');
    this.hearingDetailsForm.reset();
    this.clearForm();
    this.router.navigate(["/ViewHearingDetails"]);
  })
}


clearForm() {
  debugger;
  this.PlotsLayoutsValidationErrors.caseNO = '';
  this.PlotsLayoutsValidationErrors.hearingDate = '';
  this.PlotsLayoutsValidationErrors.hearingType = '';
  this.PlotsLayoutsValidationErrors.remarks = '';
  this.PlotsLayoutsValidationErrors.nextHearing = '';
}

getHearingDetailsById(id){
  debugger;

  this._plotcreationservices.getHearingDetailsById(id).subscribe(result => {
    this.getHearingList = result;

    this.savebutton = 'Update';

    this.hearingDetailsForm.controls.hearingId.setValue(result[0].plbHearingID);
    this.hearingDetailsForm.controls.caseNO.setValue(result[0].plbCaseID);
    this.hearingDetailsForm.controls.caseNO.setValue(result[0].plbCaseID);
 this.hearingDetailsForm.controls.hearingDate.setValue(this.common.formatDateFromDDMMYYYY(result[0].plbCaseHearingDate));
 this.hearingDetailsForm.controls.hearingType.setValue(result[0].pCaseHearingType);
 this.hearingDetailsForm.controls.remarks.setValue(result[0].pOutcome);
 this.hearingDetailsForm.controls.nextHearing.setValue(this.common.formatDateFromDDMMYYYY(result[0].pnexthearingdate));
 this.hearingDetailsForm.controls.hearingAttendedBy.setValue(result[0].phearingattendedby);
  })

 

}


  BlurEventAllControll(fromgroup: FormGroup) {
    try {
      Object.keys(fromgroup.controls).forEach((key: string) => {
        this.setBlurEvent(fromgroup, key);
      })
    }
    catch (e) {
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
      return false;
    }
  }

  checkValidations(group: FormGroup, isValid: boolean): boolean {
    try {
      Object.keys(group.controls).forEach((key: string) => {
        isValid = this.GetValidationByControl(group, key, isValid);
      })
    }
    catch (e) {
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
          this.PlotsLayoutsValidationErrors[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                let lablename;
                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this.common.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.PlotsLayoutsValidationErrors[key] += errormessage + ' ';
                isValid = false;
              }
            }
          }
        }
      }
    }
    catch (e) {
      return false;
    }
    return isValid;
  }
}

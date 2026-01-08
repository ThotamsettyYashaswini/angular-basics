import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
declare let $: any;
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
@Component({
  selector: 'app-court-case-details',
  templateUrl: './court-case-details.component.html',
  styles: []
})


export class CourtCaseDetailsComponent implements OnInit {
  savebutton: any = 'Save & Continue';
  savebuttonL: any = 'Save';
  public disablesavebutton = false;
  disableclearbutton: boolean = false;

  caseDetailsdata: any = [];
  courtDetailsdata: any = [];
  advocateDetailsdata: any = [];
  relateLandDetailsdata: any = [];

  caseDetailsForm: FormGroup;
  courtDetailsForm: FormGroup;
  advocateDetailsForm: FormGroup;
  relateLandDetailsForm: FormGroup;

  Landdata: any = [];
  templanddata: any = [];
  caseDetailstabDisable:boolean = false;
  courtDetailstabEnabled:boolean = true;
  advocateDetailstabsEnabled:boolean = true;
  relatelandtabsEnabled:boolean = true;

  constructor(private fb: FormBuilder, private _plotcreationservices:PlotcreationService, private commonservice:CommonService) {}

  ngOnInit(): void {
    debugger;  

    this.caseDetailsForm = this.fb.group({
      caseNO: [''],
      natureOfCase: [''],
      proceedingNo: [''],
    });

    this.courtDetailsForm = this.fb.group({
      courtName: [''],
      location: ['']
    });

    
    this.advocateDetailsForm = this.fb.group({
      nameOfAdvocate: [''],
      contactNo: ['']
      });

      this.relateLandDetailsForm = this.fb.group({
        nameOfPerson: [''],
        pcontactNo: ['']
        });

      
        this.getLanddata();
    
  }

  getLanddata() {
    debugger;
    // console.log("landid after save", this.chklandbankid)
    this._plotcreationservices.getLanddata().subscribe(data => {
      debugger;
      this.templanddata = data;
        this.Landdata = this.templanddata.filter(function (data) {
          return data.availableareaINACRESvalue > 0;
        });
    
    })
  }

  checkSeized(event,dataItem,rowIndex){
    debugger;
    dataItem.proceedingno;
    this.caseDetailsForm.controls.proceedingNo.setValue(dataItem.proceedingno);

  }

  addToGridCaseDetails() {
    debugger;    
    let adata = this.caseDetailsForm.value;
    this.caseDetailsdata.push(this.caseDetailsForm.value); 
 
  };

  addToGridCourtDetails() {
    debugger;   
    let adata = this.courtDetailsForm.value;
    this.courtDetailsdata.push(this.courtDetailsForm.value);
  };

  addToGridAdvocateDetails() {
    debugger;
    let adata = this.advocateDetailsForm.value;
    this.advocateDetailsdata.push(this.advocateDetailsForm.value);
  };

  addToGridrelateLandDetails() {
    debugger;
    let adata = this.relateLandDetailsForm.value;
    this.relateLandDetailsdata.push(this.relateLandDetailsForm.value);
  };


  SavecaseDetails() {
    debugger;
    this.caseDetailstabDisable = true;
    this.courtDetailstabEnabled = false;
    $('.nav-item a[href="#court-details"]').tab('show');
  }

  saveCourtDetails() {
    debugger;
    this.courtDetailstabEnabled = true;
    this.advocateDetailstabsEnabled = false;
    $('.nav-item a[href="#advocate-details"]').tab('show');
  }

  saveAdvocateDetails() {
    debugger;
    this.advocateDetailstabsEnabled = true;
    $('.nav-item a[href="#Related-Land-Purchased"]').tab('show');

  }

  saveRelatedDetails() {
    debugger;
    this.courtDetailstabEnabled = true;
    $('.nav-item a[href="#case-details"]').tab('show');


  }

  clearForm() { }
}

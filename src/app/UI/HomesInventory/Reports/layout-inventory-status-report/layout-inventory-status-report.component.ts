import { Component, OnInit } from '@angular/core';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/Services/common.service';
import {LayoutReportServiceService } from 'src/app/Services/HomesInventory/layout-report-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-layout-inventory-status-report',
  templateUrl: './layout-inventory-status-report.component.html',
  styles: []
})
export class LayoutInventoryStatusReportComponent implements OnInit {
  LayoutInventortreportForm: FormGroup
  griddata: any = []
  LayoutDetails:any;
  layoutname: any="";
  permitno: any="";

  constructor(private formbuilder: FormBuilder, private _commonService: CommonService,private _plotcreationservices:PlotcreationService,private _LayoutReportService:LayoutReportServiceService) {
  }
  public formValidationMessages: any = {};
  Detailsgrid:any=[]
  public projectName:any;
  public GetProjecttypesData:any=[];
  public LstLayoutBranchs:any=[];
  public GetProjectNamesData:any=[];
  public Permitnos:any=[];
  public plotsShow:boolean=false;
  public buildingShow:boolean=false;
  public itemtypeid:any;
  public projectid:any;
   public groups: GroupDescriptor[];
  and:any;
  ngOnInit() {
    this.LayoutDetails=[];
    this.and=''
    this.itemtypeid='';
    this.projectid='';
    this.projectName='';
    this.groups = [{ field: 'projectname' }, { field: 'bookingstatus' }];
    this.getlayoutbranches();
     this.GetItemTypes();  
    this.GetLayoutInventoryGroup();
    this.BlurEventAllControll(this.LayoutInventortreportForm);
    
  }
  GetItemTypes() {
    this._LayoutReportService.GetItemTypes().subscribe(data => {
      debugger
      this.GetProjecttypesData = data;
    })
  }
  getlayoutbranches(){
    debugger;
    this._LayoutReportService.getlayoutbranches().subscribe(data=>{
      debugger;
      this.LstLayoutBranchs=data;
    })
  }

  typeofselect(selectiontype) {
    debugger;


    if (selectiontype == 'ALL') {
      this.griddata =this.LayoutDetails;
    }
    else {
      this.griddata = this.LayoutDetails.filter(function (data) {
        return data.bookingstatus == selectiontype;
      });
    }
    this.griddata.reduce((acc, item, index) => {
      this.griddata[index].plotunitcost = parseFloat(item.plotunitcost).toFixed(0);
      this.griddata[index].clearedmount = parseFloat(item.clearedmount).toFixed(0);
      this.griddata[index].discountamount = parseFloat(item.discountamount).toFixed(0);
      this.griddata[index].charges = parseFloat(item.charges).toFixed(0);
     
    }, 0);
  }
  GetLayoutInventoryGroup() {
    this.LayoutInventortreportForm = this.formbuilder.group({
      pProjecttypeId:['',Validators.required],
      branchconnectionstring:['',Validators.required],
        pProjecttype:[''],
        selectiontype:['ALL'],
        pPermitid:[''],
        pPermit:[''],
        pProjectid:[''],
        pProjectname:['']
    });

  }
  BranchName_Change(event){
   debugger;
   this.LayoutInventortreportForm.controls.pProjecttypeId.setValue('');
   this.LayoutInventortreportForm.controls.pProjecttype.setValue('');
   this.formValidationMessages.pProjecttypeId=null;
  }
  public changeProjecttype(event) {
    debugger
   this.griddata=[];
   this.LayoutDetails=[];
        let ProjectTypeid = event.target.value;
        let ProjectType = event.target.options[event.target.selectedIndex].text;
        this.formValidationMessages.pProjectid=null;
        this.formValidationMessages.pPermitid=null;
        this.LayoutInventortreportForm['controls']['pProjecttypeId'].setValue(ProjectTypeid);
        this.itemtypeid=ProjectTypeid;
        this.projectid='';
        let connectionstring=this.LayoutInventortreportForm.controls.branchconnectionstring.value;
        this.LayoutInventortreportForm['controls']['pProjecttype'].setValue(ProjectType);
        this.LayoutInventortreportForm['controls']["pProjectid"].clearValidators();
        this.LayoutInventortreportForm['controls']["pPermitid"].clearValidators();
        this.LayoutInventortreportForm['controls']["pPermitid"].updateValueAndValidity();
        this.LayoutInventortreportForm['controls']["pProjectid"].updateValueAndValidity();
        this.LayoutInventortreportForm['controls']["pPermitid"].setValue('');
        this.LayoutInventortreportForm['controls']["pProjectid"].setValue('');
        this.LayoutInventortreportForm['controls']["pProjectname"].setValue('');
        this.plotsShow=false;
        this.buildingShow=false;
        if (ProjectType == 'Plots') {
           this.groups = [{ field: 'projectname' }, { field: 'bookingstatus' }];
          this.plotsShow=true;
        this.buildingShow=false;
        this.LayoutInventortreportForm['controls']["pPermitid"].setValidators([Validators.required]);
        this.LayoutInventortreportForm['controls']["pPermitid"].updateValueAndValidity();
        this.LayoutInventortreportForm['controls']["pProjectid"].clearValidators();
        this._LayoutReportService.GetProjectdetailsbyid(this.itemtypeid,connectionstring).subscribe(Details=> {
              debugger;
              if (Details!= null) {
               this.Permitnos=Details;  
                           
                }
               })
        }
        if (ProjectType == 'Commercial Building' || ProjectType == 'Residential Apartments') {
           this.groups = [{ field: 'projectname' }, { field: 'towername' }, { field: 'floorname' }, { field: 'bookingstatus' }];
          this.plotsShow=false;
          this.buildingShow=true;
           this.LayoutInventortreportForm['controls']["pProjectid"].setValidators([Validators.required]);
           this.LayoutInventortreportForm['controls']["pProjectid"].updateValueAndValidity();
           this.LayoutInventortreportForm['controls']["pPermitid"].clearValidators();
            this._LayoutReportService.GetProjectdetailsbyid(this.itemtypeid,connectionstring).subscribe(json => {
          debugger;
          if (json) {
          this.GetProjectNamesData = json;
            }
         });
        }
      }
      getBookedplotNo(event) {
        debugger
        this.formValidationMessages.pPermitid=null;
        this.griddata = [];
        this.LayoutDetails=[];
        let layoutID = event.pProjectNameId;
        let pPermitno = event.pProjectname;
        this.projectName=pPermitno;
        this.projectid=layoutID;
        this.LayoutInventortreportForm['controls']['pPermitid'].setValue(layoutID);
        this.LayoutInventortreportForm['controls']['pPermit'].setValue(pPermitno);
    
      }
      public ChangeProjectName(event) {
        debugger;
        this.griddata = [];
        this.LayoutDetails=[];
        let pProjectid = event.target.value;
        let pProjectName = event.target.options[event.target.selectedIndex].text;
        this.projectid=pProjectid;
        this.projectName=pProjectName;
        this.LayoutInventortreportForm['controls']['pProjectName'].setValue(pProjectName);
        this.LayoutInventortreportForm['controls']['pProjectid'].setValue(pProjectid);
    
      }

  Generatereport() {
    debugger
    let isvalid = true;
    if (this.checkValidations(this.LayoutInventortreportForm, isvalid)) {
    let connectionstring=this.LayoutInventortreportForm.controls.branchconnectionstring.value;
     this._LayoutReportService.PlotsLayoutsInventoryReport(parseInt(this.itemtypeid),this.projectid,connectionstring).subscribe(json => {
     debugger;
       this.LayoutDetails=json;
        let selectiontype=this.LayoutInventortreportForm.controls["selectiontype"].value;
          this.typeofselect(selectiontype);
     })
  }
  }

  
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('printid').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>
            <title>Plots/Layouts Inventory Status Report </title>
           
          <link rel="stylesheet" type="text/css" href="assets/css/custom.css" />
          <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css"/>
          <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@swimlane/ngx-datatable@17.0.0/index.css"/>
          
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
<style>
     
    @media print {
        html,
        body {
            width: 210mm;
            height: 297mm;
            background: #fff !important;
            margin-left: 25px !important;
            margin-top: 10px !important;
        }
        
    }
    </style>
        </html>`
    );
    popupWin.document.close();
  }
  checkValidations(group: FormGroup, isValid: boolean): boolean {

    try {

      Object.keys(group.controls).forEach((key: string) => {

        isValid = this.GetValidationByControl(group, key, isValid);
      })

    }
    catch (e) {
      //this.showErrorMessage(e);
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
          this.formValidationMessages[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;

            //if (key == 'pTitleName')
            //  lablename = 'Title';
            //else
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.formValidationMessages[key] += errormessage + ' ';
                isValid = false;
              }
            }

          }
        }
      }
    }
    catch (e) {
      //this.showErrorMessage(key);
      return false;
    }
    return isValid;
  }
  BlurEventAllControll(fromgroup: FormGroup) {

    try {

      Object.keys(fromgroup.controls).forEach((key: string) => {
        this.setBlurEvent(fromgroup, key);
      })

    }
    catch (e) {
      this._commonService.showErrorMessage(e);
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
      this._commonService.showErrorMessage(e);
      return false;
    }



  }

}

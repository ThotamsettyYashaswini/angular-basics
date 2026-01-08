import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DiscountsmasterService } from '../../../../Services/HomesInventory/discountsmaster.service';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { toInt } from 'ngx-bootstrap/chronos/utils/type-checks';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styles: []
})
export class DiscountsComponent implements OnInit {
   @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
       public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public selected = [];
  public temp: any;
  public SelectionType = SelectionType;
  savebutton = "Save";
  gridolddatastatus = false;
  showtype = true;
  alldeletedrows=[];
  projecttypeid:any;
  disablesavebutton = false;
  lstprojecttypes: any;
  lstlayoutprogectnames:any;
  discountsgroup: FormGroup;
  //DiscountsErrorMessage = {};
  lstDiscountsdetails = [];
  public DiscountsErrorMessage: any;

  constructor(private formbuilder: FormBuilder, private _Discountsservice: DiscountsmasterService, private toastr: ToastrService, private _commonservice: CommonService, private _routes: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.savebutton = "Save";
    this.gridolddatastatus = false;
    this.showtype = true;
    this.projecttypeid="1";
    this.lstlayoutprogectnames=[];
    this.disablesavebutton = false;
    this.DiscountsErrorMessage = {};
    this.discountsgroup = this.formbuilder.group({
      itemtype: [''],
      itemtypeid: ['', Validators.required],
      pCreatedby: [this._commonservice.pCreatedby],
      pStatusid: ['N'],
      pDiscounttype: ['Fixed'],
      projectname:['',Validators.required],
      projectid:[''],
      pDiscountTodays: ['', Validators.required],
      pDiscountfromdays: ['', Validators.required],
      pDiscountvalue: ['', Validators.required],
      status: ['TRUE'],
      ptypeofoperation: ['CREATE']
    })
    this.Bindprojecttypes();
    this.BlurEventAllControll(this.discountsgroup);
  }
  Bindprojecttypes() {
    debugger;
    this.lstprojecttypes=[];
    this._Discountsservice.getprojecttypes().subscribe(data => {
      debugger;
      this.lstprojecttypes = data;
    })
  }
  itemtypeid_Change(event) {
    debugger;
    this.lstlayoutprogectnames=[];
    this.lstDiscountsdetails =[];
    this.alldeletedrows=[];
    this.discountsgroup.controls.projectname.setValue('');
    this.DiscountsErrorMessage.projectname=null;
    this.discountsgroup.controls.itemtype.setValue(event.target.options[event.target.selectedIndex].text);
    let itemtypeid=parseInt(this.discountsgroup.controls.itemtypeid.value);
    this.projecttypeid=itemtypeid;
    this._Discountsservice.GetProjectdetails(itemtypeid).subscribe(data=>{
      debugger;
      this.lstlayoutprogectnames=data;
    },error=>{})
  }
  projectname_Change(event){
    debugger;
    if(event){
    let itemtypeid=parseInt(this.discountsgroup.controls.itemtypeid.value);
    let projectname=event.projectname;
    this.discountsgroup.controls.projectid.setValue(event.projectid);
     this._Discountsservice.getDiscountdetails(itemtypeid,projectname).subscribe(data => {
      if (data != null) {
        this.lstDiscountsdetails = data;
        console.log(data)
      }
    })
    }
    else{
      this.lstDiscountsdetails=[];
      this.table.offset=0;
    }
  }
  fixedtype() {
    this.showtype = true;
    this.discountsgroup.controls.pDiscountvalue.setValue('')
    this.DiscountsErrorMessage.pDiscountvalue = null
  }
  percentagetype() {
    this.showtype = false;
    this.discountsgroup.controls.pDiscountvalue.setValue('')
    this.DiscountsErrorMessage.pDiscountvalue = null
  }
  adddiscountsDetailstogrid() {
    debugger
    this.gridolddatastatus=false;
    let isValid: boolean = true;
    if (this.checkValidations(this.discountsgroup, isValid)) {
      let pDiscountvalue = this.discountsgroup['controls']['pDiscountvalue'].value;
               if (pDiscountvalue != null && pDiscountvalue!='' && pDiscountvalue!=0) { 
               pDiscountvalue = parseFloat(pDiscountvalue.toString().replace(/,/g, ""));
                 }
            else {
            pDiscountvalue = 0;
             this._commonservice.showWarningMessage('Discount Value Must be Greater than Zero.');
              this.discountsgroup['controls']['pDiscountvalue'].setValue('');
             return;
              }
      this.discountsgroup['controls']['pDiscountvalue'].setValue(pDiscountvalue);
      let itemtypeid = parseInt(this.discountsgroup.controls.itemtypeid.value)
      this.discountsgroup.controls.itemtypeid.setValue(itemtypeid);
      let fromdays = parseInt(this.discountsgroup.controls.pDiscountfromdays.value);
      let todays =parseInt(this.discountsgroup.controls.pDiscountTodays.value);
      if (fromdays < todays) {
        if (this.lstDiscountsdetails.length != 0 && this.lstDiscountsdetails != null) {
          for (let i = 0;i<this.lstDiscountsdetails.length; i++) {
             let gridtodays=parseInt(this.lstDiscountsdetails[i].pDiscountTodays);
             let gridfromdays=parseInt(this.lstDiscountsdetails[i].pDiscountfromdays);
             if((fromdays<=gridtodays && fromdays>=gridfromdays)||(todays<=gridtodays && todays>=gridfromdays)||(fromdays<=gridfromdays && todays>=gridtodays)||((fromdays>=gridfromdays && todays<=gridtodays))){
               this.gridolddatastatus=true;
               //this.toastr.info('Already Exists','info');
               this._commonservice.showWarningMessage('Already Exists.')
             }
          }
        }
      }
      else {
           this._commonservice.showWarningMessage('To Days Should be Greater than From Days');
        this.gridolddatastatus=true;
      }
      if (this.gridolddatastatus == false) {
        this.lstDiscountsdetails = [...this.lstDiscountsdetails, ...this.discountsgroup.value];
        this.discountsgroup.patchValue({ pDiscounttype: 'Fixed', pDiscountvalue: '', pDiscountTodays: '', pDiscountfromdays: '' })
        this.showtype = true;
        this.DiscountsErrorMessage = {};
        this.gridolddatastatus=false;
      }


    }
  }
  OnDelete(row, rowIndex) {
    debugger;
        if(row.ptypeofoperation=='OLD'){
     let deleterow:[]=row;
     this.alldeletedrows=[...this.alldeletedrows,...deleterow]
     this.alldeletedrows=this.alldeletedrows.filter(data=>data.ptypeofoperation='DELETE')
    
    }
   // this.lstDiscountsdetails.splice(row, 1);
    this.lstDiscountsdetails=this.lstDiscountsdetails.filter(data=>data.pDiscountfromdays!=row.pDiscountfromdays && data.pDiscountTodays!=row.pDiscountTodays)
  }
  savediscounts() {
    debugger;
    let isValid: boolean = true;
    if (this.lstDiscountsdetails.length > 0 && this.lstDiscountsdetails != null) {

      let alldata=[...this.lstDiscountsdetails,...this.alldeletedrows]
      let lstDiscountmasterDetails = { lstDiscountmasterDetails: alldata }
      let details = Object.assign(lstDiscountmasterDetails)
      let data = JSON.stringify(details);
      this.savebutton = "Processing";
      this.disablesavebutton = true;
      console.log("saving data", data)
      this._Discountsservice.savediscountsdetails(data).subscribe(dat => {
        if (dat) {
          debugger;
          this._commonservice.showInfoMessage('Saved Succesfully.');
          this.savebutton = "Save";
          this.disablesavebutton = false;
          this.discountsgroup.reset();
          this.ngOnInit();
          this.DiscountsErrorMessage = {};
          this.lstDiscountsdetails = []
          this.alldeletedrows=[];
        }
      }, error => {
       this._commonservice.showErrorMessage(error);
        this.savebutton = "Save";
         this.disablesavebutton = false;
      })
     
    }
    else {
      this._commonservice.showWarningMessage('Add one Item to Grid');
      this.savebutton = "Save";
    }
  }
  clearDiscounts() {
this.ngOnInit();
this.lstDiscountsdetails=[];
this.DiscountsErrorMessage=[];
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

        }
        else if (formcontrol.validator) {
          this.DiscountsErrorMessage[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {

                let lablename;

                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.DiscountsErrorMessage[key] += errormessage + ' ';
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
    debugger
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

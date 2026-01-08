import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChargemasterService } from 'src/app/Services/HomesInventory/chargemaster.service';
import { InstallmentConfigurationService } from 'src/app/Services/installment-configuration.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
declare var $: any;


@Component({
  selector: 'app-installment-configuration',
  templateUrl: './installment-configuration.component.html',
  styles: []
})
export class InstallmentConfigurationComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  InstallmentConfigurationForm: FormGroup;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfigeffectfrom: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfigeffectto: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  lstprojecttypes: any;
  InstallmentValidations: any;
  ProjectDetails: any;
  GridData: any;
  configdetails:any;
  minfromdte:any;
  itemtypeiids:any;
  alldeletedrows:any;
  today = new Date();
  ProjectNamePlots:any;
  savebutton = "Save";
  public gridolddatastatus:boolean= false;
  disablesavebutton: boolean = false;
  cardstatus:boolean=false;

  constructor(private formbuilder: FormBuilder, private _commonservice: CommonService, public datepipe: DatePipe, private _chargeMasterService: ChargemasterService, private _instalmentconfigurationservice: InstallmentConfigurationService, private _plotcreationservices: PlotcreationService,private zone:NgZone) {
    this.dpConfig.containerClass = this._commonservice.DatePickerDateFormat('containerClass');
    this.dpConfig.dateInputFormat = this._commonservice.DatePickerDateFormat('dateInputFormat');
    this.dpConfig.showWeekNumbers = this._commonservice.DatePickerDateFormat('showWeekNumbers');
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    this.dpConfig.maxDate=this.today;

    this.dpConfigeffectfrom.containerClass = this._commonservice.DatePickerDateFormat('containerClass');
    this.dpConfigeffectfrom.dateInputFormat = this._commonservice.DatePickerDateFormat('dateInputFormat');
    this.dpConfigeffectfrom.showWeekNumbers = this._commonservice.DatePickerDateFormat('showWeekNumbers');
    this.dpConfigeffectfrom.containerClass = 'theme-dark-blue';
    this.dpConfigeffectfrom.dateInputFormat = 'DD/MM/YYYY';

    this.dpConfigeffectto.containerClass = this._commonservice.DatePickerDateFormat('containerClass');
    this.dpConfigeffectto.dateInputFormat = this._commonservice.DatePickerDateFormat('dateInputFormat');
    this.dpConfigeffectto.showWeekNumbers = this._commonservice.DatePickerDateFormat('showWeekNumbers');
    this.dpConfigeffectto.containerClass = 'theme-dark-blue';
    this.dpConfigeffectto.dateInputFormat = 'DD/MM/YYYY';

    //  window['CallingFunctionOutsideData'] = {
    //   zone: this.zone,
    //   componentFn: (value) => this.Projectname_Change(value),
    //   component: this,
    // };
    // window['CallingFunctionToHideCard'] = {
    //   zone: this.zone,
    //   componentFn: () => this.HideCard(),
    //   component: this,
    // };
  }

  ngOnInit() {
    debugger
    this.itemtypeiids='';
    this.ProjectNamePlots='';
    this.cardstatus=false;
     this.minfromdte="";
    this.InstallmentValidations = {};
    this.alldeletedrows=[];
    this.InstallmentConfigurationForm = this.formbuilder.group({
      installmentsid: [0],
      itemtypeid: ['', Validators.required],
      installmentsdate: [new Date(), Validators.required],
      Projectid: [''],
      permitno:[''],
      projectname: ['', Validators.required],
      standardrate: ['', Validators.required],
      noofmonths: ['', Validators.required],
      installmentrate: ['', Validators.required],
      totalinstallmentamount: [0],
      effectfromdate: ['', Validators.required],
      effecttodate: [''],
      ptypeofoperation: ['CREATE'],
      status: ['TRUE']
    });

    this.Bindprojecttypes();
    this.BlurEventAllControll(this.InstallmentConfigurationForm);
  }
// HideCard(){
//   debugger;
//    if(!this.cardstatus){
//     if(  this.InstallmentConfigurationForm.controls.projectname.value){
//        this.InstallmentConfigurationForm.controls.projectname.setValue('');
//     }
//   }

// }

  Bindprojecttypes() {
    debugger;
    this._chargeMasterService.getprojecttypes().subscribe(data => {
      debugger;
      this.lstprojecttypes = data;
    })
  }

  projecttype_Change(event) {
    debugger;
    this.GridData=[];
    this.configdetails=[];
    if (event.target.value != '') {
      let itemtypeid = event.target.value;
      this.itemtypeiids=itemtypeid;
       this.InstallmentConfigurationForm.controls.standardrate.setValue('');
      this.InstallmentConfigurationForm.controls.installmentsdate.setValue(new Date());
      this.ClearByItemid();
      this.InstallmentValidations = {} 
      this._instalmentconfigurationservice.GetProjectdetails(itemtypeid).subscribe(data => {
        debugger;
        this.ProjectDetails = [];
        this.ProjectDetails = data;

      })
    }
  }
  customSearchFn(term: string, item: any) {
    debugger;
    console.log(item)
    term = term.toLowerCase();
   
      return item.permitno.toLowerCase().indexOf(term) > -1 || item.projectname.toLowerCase().indexOf(term) > -1 ;
    
    
    
  }
  Projectname_Change(event) {
    debugger
    if(event!=""){

    }
    this.InstallmentConfigurationForm.controls.standardrate.setValue('0');
    this.cardstatus=true;
    this.ProjectNamePlots='';
    this.ProjectNamePlots=event;
    let ProjectData = [];
    this.alldeletedrows=[];
    let Projectname=event.projectname;
    let projectid = event.projectid;
    let permitno=event.permitno;
    let launchdate=this._commonservice.formatDateFromDDMMYYYY(event.launchdate);
    this.dpConfigeffectfrom.minDate =launchdate;   
    this.dpConfig.minDate=launchdate;
    this.InstallmentConfigurationForm.controls.Projectid.setValue(projectid);
    this.InstallmentConfigurationForm.controls.projectname.setValue(Projectname);
     this.InstallmentConfigurationForm.controls.permitno.setValue(permitno);
    let itemtypeid = this.InstallmentConfigurationForm.controls.itemtypeid.value;
    let date = this.InstallmentConfigurationForm.controls.installmentsdate.value;
    this.InstallmentValidations = {};
    if(itemtypeid==1){
      Projectname=permitno;
    }
    if (date != '') {
      this.getitemtypewiseStandardrates(itemtypeid, date.toISOString(),Projectname);
    }
    this._instalmentconfigurationservice.GetInstallmentGridData(itemtypeid, projectid).subscribe(data => {
      debugger;
      this.cardstatus=false;
      this.GridData = [];
      this.configdetails=[];
      this.GridData = data;
        this.GridData.filter(row=>{row.installmentsdate=this._commonservice.formatDateFromDDMMYYYY(row.installmentsdate)});
        this.GridData.filter(row=>{ row.effectfromdate=this._commonservice.formatDateFromDDMMYYYY(row.effectfromdate)});
         for(let i=0;i<this.GridData.length;i++){
                       if(this.GridData[i].effecttodate!=null){
                           this.GridData[i].effecttodate=this._commonservice.formatDateFromDDMMYYYY(this.GridData[i].effecttodate)
                       }
                   } 
                //  this.GridData.filter(row=>{row.effecttodate=this._commonservice.formatDateFromDDMMYYYY(row.effecttodate)});
    })
  }
getitemtypewiseStandardrates(itemtypeid,date,Projectname){
debugger;
      this._plotcreationservices.getitemtypewiseStandardrates(itemtypeid,date,Projectname).subscribe(Details => {
        debugger;
        this.cardstatus=false;
        let Standardrate = this._commonservice.currencyformat(Details);
        this.InstallmentConfigurationForm.controls.standardrate.setValue(Standardrate);
        this.CalculationInstallment();
      });
}
  DateChange(event) {
    debugger
    let date =this.InstallmentConfigurationForm.controls.installmentsdate.value;
    let itemtypeid =this.InstallmentConfigurationForm.controls.itemtypeid.value;
    let Projectname=this.InstallmentConfigurationForm.controls.projectname.value;
    let permitno=this.InstallmentConfigurationForm.controls.permitno.value;
    if(itemtypeid!=''){
      if(itemtypeid==1){
        Projectname=permitno;
      }
      else{
       Projectname=Projectname; 
      }
      this.getitemtypewiseStandardrates(itemtypeid,date.toISOString(),Projectname)
    }
  }
  EffectFromDateChange() {
    debugger
    let effectfromdate = new Date(this.InstallmentConfigurationForm.controls.effectfromdate.value);
    this.dpConfigeffectto.minDate = effectfromdate;
  }

  CalculationInstallment() {
    debugger
    let Standardrate = this._commonservice.removeCommasForEntredNumber(this.InstallmentConfigurationForm.controls.standardrate.value);
    if(this.InstallmentConfigurationForm.controls.installmentrate.value!=''){
    let Installmentrate =  this._commonservice.removeCommasForEntredNumber(this.InstallmentConfigurationForm.controls.installmentrate.value);
    let Totalinstallmentamount = +Standardrate + +Installmentrate;
    this.InstallmentConfigurationForm.controls.totalinstallmentamount.setValue(Totalinstallmentamount);
    }
   
  }

  ClearByItemid() {
    debugger
   // this.InstallmentConfigurationForm.controls.standardrate.setValue('');
    this.InstallmentConfigurationForm.controls.noofmonths.setValue('');
    this.InstallmentConfigurationForm.controls.installmentrate.setValue('');
    this.InstallmentConfigurationForm.controls.totalinstallmentamount.setValue('');
    this.InstallmentConfigurationForm.controls.effectfromdate.setValue('');
    this.InstallmentConfigurationForm.controls.effecttodate.setValue('');
    this.InstallmentConfigurationForm.controls.ptypeofoperation.setValue('CREATE');
  
  }

  AddInstallments() {
    debugger
    let isvalid = true;
     this.gridolddatastatus = false;
    if (this.checkValidations(this.InstallmentConfigurationForm, isvalid)) {
      let instmonths=this.InstallmentConfigurationForm.controls. noofmonths.value;
      if(parseInt(instmonths)<=0){
        this.InstallmentConfigurationForm.controls. noofmonths.setValue('');
        this._commonservice.showWarningMessage('No. of Months Must Greater Than Zero');
        return;
      }
       let standardrates = this.InstallmentConfigurationForm['controls']['standardrate'].value;
      standardrates = parseFloat(standardrates.toString().replace(/,/g, ""));
      this.InstallmentConfigurationForm['controls']['standardrate'].setValue(standardrates);
       let installmentrate = this.InstallmentConfigurationForm['controls']['installmentrate'].value;         
             if (installmentrate != null && installmentrate!='' && installmentrate!=0) { 
               installmentrate = parseFloat(installmentrate.toString().replace(/,/g, ""));
                 }
            else {
            installmentrate = 0;
             this._commonservice.showWarningMessage('Installment Rate Must be Greater than Zero.');
              this.InstallmentConfigurationForm['controls']['installmentrate'].setValue('');
             return;
              }
      this.InstallmentConfigurationForm['controls']['installmentrate'].setValue(installmentrate);
      let installmentdate = this.datepipe.transform(this.InstallmentConfigurationForm.controls.installmentsdate.value, 'dd-MM-yyyy');
      let effectfromdate = this.datepipe.transform(this.InstallmentConfigurationForm.controls.effectfromdate.value, 'dd-MM-yyyy');
      this.configdetails=[...this.GridData];
      this.configdetails=this.configdetails.filter(row=>row.noofmonths== this.InstallmentConfigurationForm.controls.noofmonths.value );
       let neweffectfromdate = this._commonservice.formatDateFromDDMMYYYY(effectfromdate);
      //let effecttodate = this.datepipe.transform(this.InstallmentConfigurationForm.controls.effecttodate.value, 'dd-MM-yyyy');
         let changedate=this.configdetails.filter(row=>row.effectfromdate>neweffectfromdate)
            var dates =changedate.map(function(x) { return (x.effectfromdate); });
            if(dates.length>0){
                this.minfromdte = new Date(Math.min.apply(null,dates)) ;
            }
            else{
               this.minfromdte=null;
            }
         
            changedate=this.configdetails.filter(row=>row.effectfromdate=this.datepipe.transform(row.effectfromdate,"dd/MM/yyyy"))
            this.configdetails.filter(row=>row.effectfromdate=this._commonservice.formatDateFromDDMMYYYY(row.effectfromdate))
      let standardrate = this._commonservice.removeCommasForEntredNumber(this.InstallmentConfigurationForm.controls.standardrate.value);
      let noofmonths = this.InstallmentConfigurationForm.controls.noofmonths.value;

     // let this.GridData = [];
      this.GridData = this.GridData;
      if (this.GridData.length>0) {
        for (var i = 0; i < this.GridData.length; i++) {
          let gridpEffectfromdate =this.GridData[i].effectfromdate;
          let neweffectfromdate = this._commonservice.formatDateFromDDMMYYYY(effectfromdate);       
          let gridpEffecttodate =this.GridData[i].effecttodate;
           let gridnoofmonths=this.GridData[i].noofmonths;
         // let neweffecttodate = this._commonservice.formatDateFromDDMMYYYY(effecttodate);
          if (((neweffectfromdate >= gridpEffectfromdate && neweffectfromdate <= gridpEffecttodate)||( gridpEffectfromdate.toISOString()== neweffectfromdate.toISOString()))&&(gridnoofmonths==noofmonths)) {
            this._commonservice.showWarningMessage('Already Exisits...');
             this.gridolddatastatus = true;
        let standardrates = this.InstallmentConfigurationForm['controls']['standardrate'].value;
         standardrates= this._commonservice.currencyformat(standardrates);
        this.InstallmentConfigurationForm['controls']['standardrate'].setValue(standardrates);
        let installmentrate = this.InstallmentConfigurationForm['controls']['installmentrate'].value;
         installmentrate =this._commonservice.currencyformat(installmentrate);
         this.InstallmentConfigurationForm['controls']['installmentrate'].setValue(installmentrate);
            return;
          }
          else{
                    if((gridpEffectfromdate <= neweffectfromdate) &&(gridnoofmonths==noofmonths)){
                        if((this.GridData[i].effecttodate==null || this.GridData[i].effecttodate=="" || this.GridData[i].effecttodate=={}) && (gridnoofmonths==noofmonths)){
                            let todate= new Date(neweffectfromdate.getFullYear(), neweffectfromdate.getMonth(), neweffectfromdate.getDate()-1)
                          this.GridData[i].effecttodate=todate;
                           this.InstallmentConfigurationForm.controls.effecttodate.setValue(null);
                              }
                        }
                        else{
                          if((gridnoofmonths==noofmonths)){
                            let mintodate= new Date(this.minfromdte.getFullYear(),this.minfromdte.getMonth(),this.minfromdte.getDate()-1);
                            this.InstallmentConfigurationForm.controls.effecttodate.setValue(mintodate);
                          }
                        }
          }
        }
      }
        if (this.gridolddatastatus==false) {
      this.InstallmentConfigurationForm.controls.standardrate.setValue(standardrate);
      this.GridData = [...this.GridData, ...this.InstallmentConfigurationForm.value];
      this.InstallmentConfigurationForm.controls.installmentsdate.setValue(new Date());
      this.ClearByItemid();
      this.InstallmentValidations = {};
  }
  
    }
  }

  OnDelete(row, rowIndex) {
     if(row.ptypeofoperation=='OLD'){
     let deleterow:[]=row;
     this.alldeletedrows=[...this.alldeletedrows,...deleterow]
     this.alldeletedrows=this.alldeletedrows.filter(data=>data.ptypeofoperation='DELETE')
    }
    //this.GridData.splice(row, 1);
    this.GridData.splice(rowIndex, 1);
    this.GridData = [...this.GridData];
  }

  ClearForm() {
    this.InstallmentConfigurationForm.controls.installmentsid.setValue(0);
    this.InstallmentConfigurationForm.controls.itemtypeid.setValue('');
    this.InstallmentConfigurationForm.controls.permitno.setValue('');
    this.InstallmentConfigurationForm.controls.Projectid.setValue('');
    this.InstallmentConfigurationForm.controls.standardrate.setValue('');
    this.InstallmentConfigurationForm.controls.projectname.setValue('');
    this.InstallmentConfigurationForm.controls.installmentsdate.setValue(new Date());
    this.ClearByItemid();
    this.GridData = [];
    this.itemtypeiids='';
    this.ProjectNamePlots=[];
    this.ProjectDetails=[];
    this.GridData = [...this.GridData];
    this.InstallmentValidations = {};
   // this.clearmulitidropdown();
  }


  enableSaveButton() {
    this.disablesavebutton = false;
    this.savebutton = "Save";
  }

  SaveInstallment() {
    debugger
     if (this.GridData.length != 0) {
      if(this.alldeletedrows.length>0){
        if (this.GridData.length != 0) {
        this.GridData=[...this.GridData,...this.alldeletedrows];
        }
        else{
           this.GridData=[...this.alldeletedrows];
        }
      }
    this.disablesavebutton = true;
    this.savebutton = "Processing";
    let InstallmentDTO = { InstallmentDTO: this.GridData }
    // let formdata = Object.assign(InstallmentDTO)
    let data = JSON.stringify(InstallmentDTO);
    this._instalmentconfigurationservice.saveInstallmentConfigurationDetails(data).subscribe(details => {
      if (details) {
        this.enableSaveButton();
        this._commonservice.showInfoMessage('Saved Successfully')
        this.ClearForm();
//this.clearmulitidropdown();
      }
    }, error => {
      this.showErrorMessage(error)
      this.enableSaveButton();
    })
    }
    else{
        this._commonservice.showWarningMessage('Add Atleast One Item to Grid.')
    }
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
  showErrorMessage(errormsg: string) {
    this._commonservice.showErrorMessage(errormsg);
  }
  GetValidationByControl(formGroup: FormGroup, key: string, isValid: boolean): boolean {
    try {
      let formcontrol;
      formcontrol = formGroup.get(key);
      //if (!formcontrol)
      //formcontrol = <FormGroup>this.LayoutCreationForm['controls']['lstLayoutdetails'].get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          // if (key != 'lstLayoutdetails')
          //   this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.InstallmentValidations[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                let lablename;
                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.InstallmentValidations[key] += errormessage + ' ';
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

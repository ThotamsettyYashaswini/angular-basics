import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ChargemasterService } from '../../../../Services/HomesInventory/chargemaster.service';
declare let $: any;
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-extra-types-configuration',
  templateUrl: './extra-types-configuration.component.html',
  styles: []
})
export class ExtraTypesConfigurationComponent implements OnInit {
   @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public selected = [];
  public temp: any;
  public SelectionType = SelectionType;
  submitted = false;
  griddata = [];
  //disablelayoutname:boolean=false;
  showtype = true;
  disablesavebutton=false;
  gridolddatastatus = false;
  lstprojecttypes: any;
  lstextratype: any;
   addbutton:any;
   projecttypeid:any;
  lstpermintnumber:any;
  alldeletedrows=[];
   minfromdte:any;
  saveextratypebutton = "Save";
  ExtraTypeConfigurationdetails = [];
  public extratypeErrorMessage: any;
  extratypeentry: FormGroup
  extratypeentrygroup: FormGroup
  savebutton = "Save";
  ratedetails:any;
  rowindex:any;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfigfrom: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  // By Surendra

  showuomfield = false;
  lstUOMvalue: any;

  constructor(private formbuilder: FormBuilder, private _extratypeservice: ChargemasterService, private toastr: ToastrService, private _commonservice: CommonService, private _routes: Router, private datePipe: DatePipe) {
    this.dpConfigfrom.containerClass = this._commonservice.DatePickerDateFormat('containerClass');
    this.dpConfigfrom.dateInputFormat = this._commonservice.DatePickerDateFormat('dateInputFormat');
    this.dpConfigfrom.showWeekNumbers = this._commonservice.DatePickerDateFormat('showWeekNumbers');
   }

  ngOnInit() {
    // this.ExtraTypeConfigurationdetails = [];
    this.savebutton = "Save";
    this.gridolddatastatus = false;
    this.showtype = true;
    this.addbutton="Add";
    this.rowindex='';
    this.projecttypeid=0;
     this.minfromdte="";
     this.ratedetails=[];
    this.lstpermintnumber=[];
    //this.disablelayoutname=false;
    this.disablesavebutton=false;
    this.dpConfigfrom.containerClass = 'theme-dark-blue';
    this.dpConfigfrom.dateInputFormat = 'DD/MM/YYYY';
    //this.dpConfig.maxDate = new Date();
    this.extratypeErrorMessage = {};
    this.extratypeentry = this.formbuilder.group({
      extratypename: [''], 
      extratypeid: [''],
      pEffecttodate:[''],
      extraconfigid:['0'],
      priority:[''],
      pEffectfromdate:['',Validators.required],
      extratypesid: ['', Validators.required],
      itemtype: [''],
      projectid:[''],
      projectidfirst:['',Validators.required],
      itemtypeid: ['', Validators.required],
      pCreatedby: [this._commonservice.pCreatedby],
      pStatusid: ['N'],
      adddeductiontype: ['Addition', Validators.required],
      extracaltype: ['Fixed'],
      extravalue: ['', Validators.required],
      status: ['TRUE'],
      ptypeofoperation: ['CREATE'],

      // By Surendra

      extratypedependancetype: ['Value'],

      chargedependancetype: ['Value'],
      primarylandareauom: ['0'],
            primarylandareauomname: [''],
            punitofmeasureid: ['0'],
            piscadreapplicableonuom: [false],

    })
    this.showuomfield = false;
    this.extratypeentrygroup = this.formbuilder.group({
      extratypename: ['', Validators.required],
      adddeductiontype: [''],
     // adddeductiontypes: ['', Validators.required],
      pCreatedby: [this._commonservice.pCreatedby],
      status: ['TRUE'],
      ptypeofoperation: ['CREATE']
    })
    //  $( "#effectfromdate" ).prop( "disabled", false );
    //   $( "#projectname" ).prop( "disabled", false );
    //   $( "#AddDeductionType" ).prop( "disabled", false );
    //   $( "#extratype" ).prop( "disabled", false );
    //  this.extratypeentry.controls['projectidfirst'].enable();
    this.BlurEventAllControll(this.extratypeentry);
  //  this.BlurEventAllControll(this.extratypeentrygroup);
   // this.getextratypes();
    this.Bindprojecttypes();
   ///  this.table.offset = 0;
   
   this.extratypeentry.controls.primarylandareauom.setValidators(null);
        this.extratypeentry.controls.primarylandareauom.updateValueAndValidity();



         this.BindUOMNames();
  }
  fixedtype() {
    this.extratypeentry.controls.extravalue.setValue('')
    this.showtype = true;
    this.extratypeErrorMessage.extravalue = null;

  }
  Bindprojecttypes() {
    debugger;
    this._extratypeservice.getprojecttypes().subscribe(data => {
      debugger;
      this.lstprojecttypes = data;
    })
  }
  ClearControls(){
    debugger;
        
      this.extratypeentry.patchValue({
      extratypename:'', 
      extratypeid: '',
      extraconfigid:'0',
      pEffecttodate:'',
      pEffectfromdate:'',
      extratypesid: '',
      priority:'',
      itemtype:'',
      projectid:'',
      projectidfirst:'',
      primarylandareauom: '0',
      extratypedependancetype: 'Value',
      primarylandareauomname:'',
      itemtypeid: '',
      pStatusid: 'N',
      adddeductiontype: 'Addition',
      extracaltype: 'Fixed',
      extravalue: '',
      ptypeofoperation: 'CREATE',
      status:'TRUE',
      pCreatedby: this._commonservice.pCreatedby,
      chargedependancetype: 'Value',
      piscadreapplicableonuom:false,

})
  }
  permitno_Change(event){
    debugger;
    if(event){
    this.ExtraTypeConfigurationdetails=[];
    this.lstextratype=[];
    this.extratypeentry.controls.extratypesid.setValue('');
    this.extratypeErrorMessage.extratypesid=null;
      let projectid=event.projectid;
      this.extratypeentry.controls.projectid.setValue(event.projectid);
       let launchdate=this._commonservice.formatDateFromDDMMYYYY(event.launchdate);
      this.dpConfigfrom.minDate =launchdate;
      let deductiontype=this.extratypeentry.controls.adddeductiontype.value;
      let itemtypeid = parseInt(this.extratypeentry.controls.itemtypeid.value);
      this._extratypeservice.getExtraNamesconfig(itemtypeid,projectid,deductiontype).subscribe(data => {
        debugger
      if (data) {
        this.lstextratype = data;
      }
    })
      this._extratypeservice.GetExtratypesDetailsOnItem(itemtypeid,projectid,deductiontype).subscribe(data => {
      debugger
      console.log("griddata",data)
        if (data != null && data != '') {
          this.ExtraTypeConfigurationdetails=data;
          for (let i = 0; i < this.ExtraTypeConfigurationdetails.length; i++) {
              if(this.ExtraTypeConfigurationdetails[i].pEffecttodate!=null){
                           this.ExtraTypeConfigurationdetails[i].pEffecttodate=this._commonservice.formatDateFromDDMMYYYY(this.ExtraTypeConfigurationdetails[i].pEffecttodate)
                       }
         
           
          }
        }
      }, error => { this.toastr.error(error, 'error') })
    }
  }



  // DOne By Surendra

  


  UOMvalue_change(event) {
    debugger;
    if (event.target.value != '') {
      debugger
  
        this.extratypeentry.controls.primarylandareauomname.setValue(event.target.options[event.target.selectedIndex].text);
        this.extratypeentry.controls.punitofmeasureid.setValue(event.target.options[event.target.selectedIndex].value);
        
  
    }
     this.GetValidationByControl(this.extratypeentry, 'primarylandareauom', true)
  }
  
  pchargetyprvaluechange() {
  debugger;
          this.showuomfield = false;
          this.extratypeentry.controls.primarylandareauom.setValue('');
          this.extratypeentry.controls.primarylandareauomname.setValue('');
           this.extratypeentry.controls.punitofmeasureid.setValue('0');
          this.extratypeentry.controls.piscadreapplicableonuom.setValue(false);
          this.extratypeentry.controls.primarylandareauom.setValidators(null);
          this.extratypeentry.controls.primarylandareauom.updateValueAndValidity();
      }

      chargeUOMchange() {
        debugger;
        this.showuomfield = true;
        this.extratypeentry.controls.primarylandareauom.setValue('');
        this.extratypeentry.controls.primarylandareauomname.setValue('');
         this.extratypeentry.controls.punitofmeasureid.setValue('0');
        this.extratypeErrorMessage.primarylandareauom = null;
        this.extratypeentry.controls.piscadreapplicableonuom.setValue(true);
        this.extratypeentry.controls.primarylandareauom.setValidators([Validators.required]);
        this.extratypeentry.controls.primarylandareauom.updateValueAndValidity()
  }

  
BindUOMNames(){
  debugger;
   let requestfrom='plots';
    this._extratypeservice.GetUnitofMeasureDetails(requestfrom).subscribe(data => {
      this.lstUOMvalue = data;
  }, error => {
      this.toastr.error(error, 'error')
  })
}

// 



  // SaveNewExtraTypes() {
  //   debugger;
  //   let isValid: boolean = true;
  //   if (this.checkValidations(this.extratypeentrygroup, isValid)) {
     
      
  //     let extratype = this.extratypeentrygroup.controls.extratypename.value;
  //     // let adddeduction = this.extratypeentrygroup.controls.adddeductiontypes.value
  //     // this.extratypeentrygroup.controls.adddeductiontype.setValue(this.extratypeentrygroup.controls.adddeductiontypes.value);
  //     this._extratypeservice.CheckDuplicateExtraTypes(extratype).subscribe(data => {
  //       if (data != 0) {
  //         this._commonservice.showWarningMessage('Already Exists.')
  //         this.saveextratypebutton = "Save";
  //         return;
  //       }
  //         debugger;
  //          this.saveextratypebutton = "Processing"
  //         let newdetails = JSON.stringify(this.extratypeentrygroup.value);
  //         this._extratypeservice.SaveNewExtraTypes(newdetails).subscribe(data => {
  //           if (data) {
  //             this._commonservice.showInfoMessage('Saved Successfully.');
  //             this.saveextratypebutton = "Save"
  //            this.Clearextratypename();
  //            this.extratypeErrorMessage={};           
  //           //  this.getextratypes();
  //           }
  //         }, error => {
  //       this._commonservice.showErrorMessage(error);
  //       this.saveextratypebutton = "Save";
  //     })
  //     }, error => {
  //       this.toastr.error(error, 'error')
  //       this.saveextratypebutton = "Save";

  //     })
  //   }
  // }
  AddDeduction_Change(event) {
    debugger;
    this.ExtraTypeConfigurationdetails = [];
    this.lstpermintnumber=[];
     this.lstextratype=[];
    this.extratypeentry.patchValue({ itemtypeid: '', extratypename: '', extratypesid: '', itemtype: '',projectid:'',priority:'',projectidfirst:'' })
    this.ExtraTypeConfigurationdetails=[];
    this.extratypeErrorMessage ={}
     this.table.offset = 0;

  }
  addExtratypeConfigDetailstogrid() {
    debugger
    let isvalid: boolean = true;
     if(this.checkValidations(this.extratypeentry,isvalid)){
    debugger;
     let newextratype = this.extratypeentry.controls.extratypename.value;
     
     let extravalue = this.extratypeentry['controls']['extravalue'].value;

      extravalue = parseFloat(extravalue.toString().replace(/,/g, ""));
      // if(extravalue<=0){
      //      this.extratypeentry['controls']['extravalue'].setValue('');
      //      this._commonservice.showWarningMessage('Extra Type Value Must be Greater Than Zero.');
      //      return;
      // }
      this.extratypeentry['controls']['extravalue'].setValue(extravalue);
      if(this.extratypeentry.controls.ptypeofoperation.value=='OLD'){
        this.extratypeentry.controls.ptypeofoperation.setValue('UPDATE');
      }
  
//editdata/update
    //  if(this.addbutton=="Update"){
      //  this.UpdateRow();
      //  return;
     // }

  //for previous dates 
  let EffectedDate=this.datePipe.transform(this.extratypeentry.controls.pEffectfromdate.value,'dd/MM/yyyy')
   let effectivefromdate=this._commonservice.formatDateFromDDMMYYYY(EffectedDate);
  this.ratedetails=this.ExtraTypeConfigurationdetails;
  this.ratedetails.filter(row=>row.pEffectfromdate=this._commonservice.formatDateFromDDMMYYYY(row.pEffectfromdate))
    let changedate=this.ratedetails.filter(row=>row.pEffectfromdate>effectivefromdate)
            var dates =changedate.map(function(x) { return (x.pEffectfromdate); });
            this.minfromdte = new Date(Math.min.apply(null,dates));
            changedate=this.ratedetails.filter(row=>row.pEffectfromdate=this.datePipe.transform(row.pEffectfromdate,"dd/MM/yyyy"))
//
  
   if(this.ExtraTypeConfigurationdetails.length>0){
     for (var i = 0; i < this.ExtraTypeConfigurationdetails.length; i++) {
                   let gridpEffectfromdate = this._commonservice.formatDateFromDDMMYYYY(this.ExtraTypeConfigurationdetails[i].pEffectfromdate);
                   let grideffecttodate=this.ExtraTypeConfigurationdetails[i].pEffecttodate;
                   if((this.ExtraTypeConfigurationdetails[i].extratypename ==newextratype)&&(gridpEffectfromdate.toISOString()==effectivefromdate.toISOString())){
                      this._commonservice.showWarningMessage('Already Exisits...');
                         return;
                   }
                    if ((this.ExtraTypeConfigurationdetails[i].extratypename ==newextratype)&&(gridpEffectfromdate<=effectivefromdate && effectivefromdate<= grideffecttodate)) {     
                       this._commonservice.showWarningMessage('Already Exisits...');
                         return;
                    }
                    else{
                         if((gridpEffectfromdate <= effectivefromdate)&&(this.ExtraTypeConfigurationdetails[i].extratypename ==newextratype)){
                              if((this.ExtraTypeConfigurationdetails[i].pEffecttodate== null || this.   ExtraTypeConfigurationdetails[i].pEffecttodate=="")&&(this.ExtraTypeConfigurationdetails[i].extratypename ==newextratype)){
                              let sampledate=this._commonservice.formatDateFromDDMMYYYY(EffectedDate);
                              let effectivetodate= new Date(sampledate.getFullYear(), sampledate.getMonth(), sampledate.getDate()-1)
                               this.ExtraTypeConfigurationdetails[i].pEffecttodate=effectivetodate;
                             }   
                           }
                         else{
                           if((this.ExtraTypeConfigurationdetails[i].extratypename ==newextratype)){                        
                             let mintodate= new Date(this.minfromdte.getFullYear(),this.minfromdte.getMonth(),this.minfromdte.getDate()-1);
                            this.extratypeentry.controls.pEffecttodate.setValue(mintodate);
                              }
                          }
                     }
          }
   
   }
    this.extratypeentry.controls.pEffectfromdate.setValue(EffectedDate);
    this.ExtraTypeConfigurationdetails=[...this.ExtraTypeConfigurationdetails,...this.extratypeentry.value]
    let projecttypeold = this.extratypeentry.controls.itemtypeid.value;
    let projectidfirst=this.extratypeentry.controls.projectid.value;
    let Additiondeductiontype=this.extratypeentry.controls.adddeductiontype.value;
    this.ClearControls();

    debugger
    // let unitmeasureid = this.extratypeentry.controls.punitofmeasureid.value;
    // let primaryuom = this.extratypeentry.controls.primarylandareauom.value;
    
        
        this.extratypeentry.patchValue(
      {
        pEffectfromdate:'',ptypeofoperation: 'CREATE',standardrateid:'0',pEffecttodate:'',priority:'',status:'TRUE', pCreatedby: this._commonservice.pCreatedby,extravalue:'',extratypesid:'',extracaltype:'Fixed',primarylandareauom :'0',primarylandareauomname:''}
    )
     this.gridolddatastatus = false;
    this.showtype = true;
    this.addbutton="Add";
    this.showuomfield = false;
   // this.disablelayoutname=false;
    this.disablesavebutton=false;
        this.extratypeErrorMessage = {}
        this.extratypeentry.controls.itemtypeid.setValue(projecttypeold);
        this.extratypeentry.controls.adddeductiontype.setValue(Additiondeductiontype);
        this.extratypeentry.controls.projectidfirst.setValue(projectidfirst);
        this.extratypeentry.controls.projectid.setValue(projectidfirst);
        debugger
        
      // $( "#effectfromdate" ).prop( "disabled", false );
      // $( "#projectname" ).prop( "disabled", false );
      // $( "#AddDeductionType" ).prop( "disabled", false );
      //  $( "#extratype" ).prop( "disabled", false );
      // this.extratypeentry.controls['projectidfirst'].enable();
     // this.disablelayoutname=false;
       
    }

  }
// UpdateRow(){
//    debugger;
//      if(this.ExtraTypeConfigurationdetails.length>0){
//          this.ExtraTypeConfigurationdetails[this.rowindex]=this.extratypeentry.value;
//          }
//          else{
//             this.extratypeentry.controls.ptypeofoperation.setValue('CREATE');
//            this.ExtraTypeConfigurationdetails[0]=this.extratypeentry.value;
//          }
//         this.ExtraTypeConfigurationdetails=[...this.ExtraTypeConfigurationdetails];  
//       this.extratypeentry.patchValue({extratypename:'', 
//       extratypeid: '',
//       pEffecttodate:'',
//       pEffectfromdate:'',
//       extratypesid: '',
//       extracaltype: 'Fixed',
//       extravalue: '',
//       priority:'',
//       status:'TRUE',
//        pCreatedby: this._commonservice.pCreatedby,
//       ptypeofoperation: 'CREATE'})
//       this.extratypeErrorMessage={};
//         this.addbutton="Add";
//         this.rowindex='';
    // $( "#effectfromdate" ).prop( "disabled", false );
    //  $( "#projectname" ).prop( "disabled", false );
    //   $( "#AddDeductionType" ).prop( "disabled", false );
    //  $( "#extratype" ).prop( "disabled", false );
    //   this.extratypeentry.controls['projectidfirst'].enable();
    //  this.disablelayoutname=false;
 // }
  // OnEdit(row,rowindex){
  //   debugger;
  //   this.addbutton="Update";
  //   this.extratypeentry.patchValue({
  //     adddeductiontype:row.adddeductiontype ? row.adddeductiontype :'Addition',
  //     extraconfigid :row.extraconfigid ? row.extraconfigid: '0',
  //     extratypename: row.extratypename ? row.extratypename:'', 
  //     extratypeid:row.extratypeid ? row.extratypeid :'',
  //     projectid: row.projectid ? row.projectid :'',
  //     pEffecttodate: row.pEffecttodate ? row.pEffecttodate :'',
  //     pEffectfromdate: row.pEffectfromdate ? row. pEffectfromdate :'',
  //     extratypesid: row.extratypesid ? row. extratypesid : '',
  //     projectidfirst: row. projectid ? row. projectid : '',
  //     priority:row.priority ? row.priority :'',
  //     extracaltype: row. extracaltype ? row. extracaltype :'Fixed',
  //     extravalue: row.extravalue ? row. extravalue: '0',
  //     ptypeofoperation: row. ptypeofoperation ? row. ptypeofoperation: 'CREATE'});
  //      if(this.extratypeentry.controls.extracaltype.value=='Fixed'){
         
  //         this.extratypeentry.controls.extravalue.setValue(this._commonservice.currencyformat(this.extratypeentry.controls.extravalue.value))
  //           }
  //    this.extratypeErrorMessage={};
  //   //  $( "#effectfromdate" ).prop( "disabled", true );
  //   //  $( "#projectname" ).prop( "disabled", true );
  //   //   $( "#AddDeductionType" ).prop( "disabled", true );
  //   //    $( "#extratype" ).prop( "disabled", true );
  //   //   this.extratypeentry.controls['projectidfirst'].disable();
  //     this.disablelayoutname=true;

  //    // $( "#standardrate" ).prop( "disabled", true );
  //    this.rowindex=rowindex;
  // }
  projecttype_Change(event: any) {
    debugger;
     this.extratypeentry.patchValue({extratypename:'', 
      extratypeid: '',
      pEffecttodate:'',
      pEffectfromdate:'',
      extratypesid: '',
      projectid:'',
      projectidfirst:'',
      priority:'',
      extracaltype: 'Fixed',
      extravalue: '',
      status:'TRUE',
       pCreatedby: this._commonservice.pCreatedby,
      ptypeofoperation: 'CREATE'})
      this.addbutton="Add";
      this.lstpermintnumber=[];
      this.lstextratype=[];
      
      this.extratypeErrorMessage={};
    this.ExtraTypeConfigurationdetails = [];
     this.table.offset = 0;
    this.alldeletedrows=[];
    let itemtypeid=this.extratypeentry.controls.itemtypeid.value;
     this.projecttypeid=itemtypeid;
    if (event.target.value != '') {
              this._extratypeservice.GetProjectdetailsbyid(itemtypeid).subscribe(data => {
              debugger;
              if (data != null) {
               this.lstpermintnumber=data; 
                }
               })
            }  
  }
  getextratypes() {
    debugger;
    this.lstextratype = null;
    this._extratypeservice.GetExtraTypes().subscribe(data => {
      console.log(data)
      if (data != null && data != '') {

        this.lstextratype = data;
      }
    }, error => { this.toastr.error(error, 'error') })
  }
  percentagetype() {
    this.extratypeentry.controls.extravalue.setValue('')
    this.showtype = false;
    this.extratypeErrorMessage.extravalue = null;
  }
  extratype_Change($event) {

    this.extratypeentry.controls.extratypename.setValue($event.target.options[$event.target.selectedIndex].text);
  }
  // clickToAddExtratype() {
  //   this.extratypeentrygroup.patchValue({ extratypename: '', adddeductiontypes: '', extratype: '', adddeductiontype: '' })
  //   this.extratypeErrorMessage.adddeductiontypes = null;
  //   this.extratypeErrorMessage.extratypename = null;
  // }
  // Clearextratypename() {
  //   this.extratypeentrygroup.patchValue({ extratypename: '', adddeductiontypes: '', extratype: '', adddeductiontype: '' })
  //   this.extratypeErrorMessage.adddeductiontypes = null;
  //   this.extratypeErrorMessage.extratypename = null;
  // }
  SaveExtratypesConfiguration() {
    debugger;
    if (this.ExtraTypeConfigurationdetails.length > 0 && this.ExtraTypeConfigurationdetails != null && this.ExtraTypeConfigurationdetails != []) {
    this.ExtraTypeConfigurationdetails=[...this.ExtraTypeConfigurationdetails,...this.alldeletedrows];
    this.ExtraTypeConfigurationdetails.filter(row=>row.pEffectfromdate=this._commonservice.formatDateFromDDMMYYYY(row.pEffectfromdate))
      this.savebutton = "Processing";
      this.disablesavebutton=true;
      let extratypesdetailsDto = { extratypesdetailsDto: this.ExtraTypeConfigurationdetails }
      let formdata = Object.assign(extratypesdetailsDto)
      let details = JSON.stringify(formdata)
      console.log("saving details",details)
      this._extratypeservice.SaveExtratypeConfiguration(details).subscribe(data => {
        debugger
        console.log("saveDetails",JSON.stringify(data));
        
        if (data) {
debugger;
            this._commonservice.showInfoMessage('Saved Successfully.');
          this.savebutton = "Save";
          this.disablesavebutton=false;
          this.extratypeentry.reset();
          this.ClearExtratypesConfiguration();
        }
      }, error => {
        this.toastr.error(error, 'error')
        this.savebutton = "Save"
        this.disablesavebutton=false
         this.table.offset = 0;
      })

    }
    else {
      //this.toastr.info('Add one Item to grid.', 'info');
      this._commonservice.showWarningMessage('Add one Item to grid.');
      
    }

  }
  OnDelete(row, rowindex) {
    debugger;
        if(row.ptypeofoperation=='OLD'){
     let deleterow:[]=row;
     this.alldeletedrows=[...this.alldeletedrows,...deleterow]
     this.alldeletedrows=this.alldeletedrows.filter(data=>data.ptypeofoperation='DELETE')
    
    }
    this.ExtraTypeConfigurationdetails.splice(rowindex, 1);
    this.ExtraTypeConfigurationdetails=[...this.ExtraTypeConfigurationdetails];

  }
  ClearExtratypesConfiguration() {
    debugger;
   //this.extratypeentry.reset();
   this.ClearControls();
     this.projecttypeid=0;
    this.ExtraTypeConfigurationdetails = [];
    // this.ngOnInit();
     this.savebutton = "Save";
    this.gridolddatastatus = false;
    this.showtype = true;
    this.addbutton="Add";
    this.rowindex='';
     this.minfromdte="";
     this.ratedetails=[];
    this.lstpermintnumber=[];
   // this.disablelayoutname=false;
    this.disablesavebutton=false;
    this.extratypeentry.controls.primarylandareauom.setValidators(null);
        this.extratypeentry.controls.primarylandareauom.updateValueAndValidity();
    //  $( "#effectfromdate" ).prop( "disabled", false );
    //   $( "#projectname" ).prop( "disabled", false );
    //   $( "#AddDeductionType" ).prop( "disabled", false );
    //   $( "#extratype" ).prop( "disabled", false );
    //  this.extratypeentry.controls['projectidfirst'].enable();
    this.Bindprojecttypes();
     this.table.offset = 0;
    this.extratypeErrorMessage = {};
    this.showuomfield = false;
    
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
          this.extratypeErrorMessage[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {

                let lablename;

                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.extratypeErrorMessage[key] += errormessage + ' ';
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

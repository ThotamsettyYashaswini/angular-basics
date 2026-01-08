import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl, FormArray } from '@angular/forms';
import { CommonService } from '../../../../Services/common.service'
import { ChargemasterService } from '../../../../Services/HomesInventory/chargemaster.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { toLocalDate } from '@progress/kendo-date-math';
import { anyChanged } from '@progress/kendo-angular-common';

declare let $: any;
@Component({
    selector: 'app-chargeconfiguration-master',
    templateUrl: './chargeconfiguration-master.component.html',
    styles: []
})
export class ChargeconfigurationMasterComponent implements OnInit {
      @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
    lstprojecttypes: any;
    lstcharges: any;
    lstUOMvalue: any;
    lstpAccounttypes:any;
    Newrowstatus = true;
    alldeletedrows=[];
    addbutton:any;
    projecttypeid:any;
    lstpermintnumber:any;
    gstpercentagelist: any;
    chargesTypesForm: FormGroup;
    // chargeentrygroup: FormGroup;
    editinfo: any;
    minfromdte:any;
     public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public selected = [];
  public temp: any;
  rowindex:any;
  public SelectionType = SelectionType;
    dateforsaving: any;
    chargedetails:any;
    gridolddatastatus = false;
    ChargeConfigurationdetails = [];
    gsttypevalue: any;
    showInclude = true;
    showExclude = false;
    addchargesbutton = "Save";
    chargesConfigErrorMessage: any;
    showchargetype = true;
    showuomfield = false;
    buttonsave = "save";
    disablesavebutton = false;


    public pChargeEffectFromConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
    constructor(private zone: NgZone, private _commonService: CommonService, private formbuilder: FormBuilder, private toastr: ToastrService, private _routes: Router, private datepipe: DatePipe, private _ChargemasterService: ChargemasterService) {

        this.pChargeEffectFromConfig.containerClass = 'theme-dark-blue';
        this.pChargeEffectFromConfig.showWeekNumbers = false;
        //this.pChargeEffectFromConfig.minDate = new Date();
        this.pChargeEffectFromConfig.dateInputFormat = 'DD/MM/YYYY';
    }

    ngOnInit() {
        this.columns=[];
        this.rowindex='';
        this.projecttypeid=0;
        this.chargesConfigErrorMessage = {};
        this.showuomfield = false;
        this.showInclude = true;
        this.showExclude = false;
        this.addbutton="Add";
        this.showchargetype = true;
        this.buttonsave = "Save";
        this.lstpAccounttypes=[];
        this.minfromdte="";
        this.lstpermintnumber=[];
//this.alldeletedrows=[];
        this.chargedetails=[];
        this.chargesTypesForm = this.formbuilder.group({
            itemtype: [''],
            itemtypeid: ['', Validators.required],
            projectname:[''],
            projectid:[''],
            projectidfirst:['',Validators.required],
            permitno:[''],
            ischargeapplicableonuom: [false],
            unitofmeasureid: ['0'],
            chargetypeid: ['', Validators.required],
            chargesconfigid:['0'],
            chargename: [''],
            primarylandareauom: ['0'],
            primarylandareauomname: [''],
            chargedependancetype: ['Value'],
            chargevalue: ['', Validators.required],
            //UOMvalue: [''],
            priority:[''],
            gstvalue: [''],
            gsttype: ['Include'],
            chargevaluefixedpercentage: ['Fixed'],
            pEffectfromdate: ['', Validators.required],
            pEffecttodate:[''],
            pStatusname: [this._commonService.pStatusname],
            pCreatedby: [this._commonService.pCreatedby],
            ptypeofoperation: ['CREATE'],
            status: ['TRUE']
        });
        // this.chargeentrygroup = this.formbuilder.group({
        //     chargenames: ['', Validators.required],
        //     chargename: [''],
        //     pAccounttype:['', Validators.required],
        //     status: ['TRUE'],
        //     ptypeofoperation: ['CREATE']
        // })
        //  $( "#projectname" ).prop( "disabled", false );
        // $( "#effectfromdate" ).prop( "disabled", false );
        // $( "#charge" ).prop( "disabled", false );
        //  $( "#charge" ).prop( "disabled", false );
        // this.chargesTypesForm.controls['projectidfirst'].enable();
           this.chargesTypesForm.controls.primarylandareauom.setValidators(null);
        this.chargesTypesForm.controls.primarylandareauom.updateValueAndValidity();
        this.chargesTypesForm.controls.gstvalue.setValidators([Validators.required]);
        this.BlurEventAllControll(this.chargesTypesForm);
//this.BlurEventAllControll(this.chargeentrygroup);
        this.Bindprojecttypes();
        this.BindUOMNames();
        //this.BindChargeTypes();
        this.getGSTpercentage();
    }
    Bindprojecttypes() {
        debugger;
        this._ChargemasterService.getprojecttypes().subscribe(data => {
            debugger;
            this.lstprojecttypes = data;
        })
    }
    BindUOMNames(){
        debugger;
         let requestfrom='plots';
          this._ChargemasterService.GetUnitofMeasureDetails(requestfrom).subscribe(data => {
            this.lstUOMvalue = data;
        }, error => {
            this.toastr.error(error, 'error')
        })
    }
    BindChargeTypes() {
        debugger;
        this._ChargemasterService.getChargeTypes().subscribe(data => {
            this.lstcharges = data;
        })
    }
    // clickToAddCharges() {
    //     this.chargeentrygroup.controls.chargenames.setValue('');
    //     this.chargesConfigErrorMessage.chargenames = null;
    //     this.chargeentrygroup.controls.pAccounttype.setValue('');
    //     this.chargesConfigErrorMessage.pAccounttype=null;
    //     this.chargeentrygroup.controls.chargenames.clearValidators();
    //     this.chargeentrygroup.controls.chargenames.setValidators([Validators.required]);
    //     this.BlurEventAllControll(this.chargesTypesForm);
    // }
    // ClearChargeName() {

    //     this.chargeentrygroup.controls.chargenames.setValue('');
    //     this.chargesConfigErrorMessage.chargenames = null;
    //     this.chargeentrygroup.controls.chargenames.setValidators([Validators.required]);
    //     this.chargeentrygroup.controls.pAccounttype.setValue('');
    //     this.chargesConfigErrorMessage.pAccounttype=null;
    // }
    // SaveChargesName() {
    //     let isValid: boolean = true;
    //     debugger;
    //     if (this.checkValidations(this.chargeentrygroup, isValid)) {
    //         this.chargeentrygroup.controls.chargename.setValue(this.chargeentrygroup.controls.chargenames.value);
    //         this._ChargemasterService.CheckDuplicateChargeName( this.chargeentrygroup.controls.chargename.value).subscribe(result=>{
    //             debugger;
    //             if(result!=0){
    //                 this._commonService.showWarningMessage('Already Exists.')
    //                 return;
    //             }
    //             this.addchargesbutton = "Processing";
    //         this._ChargemasterService.SaveNewChargeName(JSON.stringify(this.chargeentrygroup.value)).subscribe(data => {
    //             if (data) {
    //                 this.toastr.success('Saved Successfully', 'success');
    //                 this.addchargesbutton = "Save";
    //                 this.chargeentrygroup.controls.chargenames.setValue('');
    //                 this.chargeentrygroup.controls.pAccounttype.setValue('');
    //                 this.chargesConfigErrorMessage = {};
    //                // this.BindChargeTypes();
    //             }
    //         }, error => {
    //             this.toastr.error(error, 'error')
    //             this.addchargesbutton = "Save";
    //         })
    //         })

    //     }

    // }
    getGSTpercentage() {

          this._ChargemasterService.getGstPercentages().subscribe(data=>{
                debugger;
             this.gstpercentagelist=data;
           }, error => {
             this.toastr.error(error, 'error')
                  })

    }
    SaveChargeConfiguration() {
        debugger;
        if (this.ChargeConfigurationdetails != null && this.ChargeConfigurationdetails != [] && this.ChargeConfigurationdetails.length>0) {
        // this.alldeletedrows=this.alldeletedrows.filter(data=>data.pEffectfromdate=this.datepipe.transform(data.pEffectfromdate,'dd/MM/yyyy'))
        if(this.alldeletedrows.length>0){
            if(this.ChargeConfigurationdetails.length>0){
           this.ChargeConfigurationdetails=[...this.ChargeConfigurationdetails,...this.alldeletedrows];
            }else{
                this.ChargeConfigurationdetails= this.alldeletedrows;
            }

        }
             let newdata=this.ChargeConfigurationdetails;
            newdata = newdata.filter(x => x.pEffectfromdate = this._commonService.formatDateFromDDMMYYYY( x.pEffectfromdate))
            let chargestypesdetailsDto = { chargestypesdetailsDto:newdata }
            let formdata= Object.assign(chargestypesdetailsDto)
            this.buttonsave = "Processing";
             this.disablesavebutton=true;
            this._ChargemasterService.SaveChargeConfiguration(JSON.stringify(formdata)).subscribe(data => {
                if (data) {
                     this._commonService.showInfoMessage('Saved Successfully.');
                    // this.buttonsave = "Save";
                    //  this.disablesavebutton=false;
                    // this.ChargeConfigurationdetails = [];
                    // this.alldeletedrows=[];
                    // this.Bindprojecttypes();
                    // this.table.offset = 0;
                    // //this.BindChargeTypes();
                    // this.ClearFields();
                    // this.ngOnInit();
                    this.ClearchargeConfiguration();
                }
            }, error => {
                this.toastr.error(error, 'error');
                this.buttonsave = "Save";
                 this.table.offset = 0;
                this.disablesavebutton=false;
                this.ChargeConfigurationdetails=this.ChargeConfigurationdetails.filter(x=>x.pEffectfromdate=this.datepipe.transform(x.pEffectfromdate,'dd/MM/yyyy'))
                // this.ChargeConfigurationdetails=this.ChargeConfigurationdetails.filter(x=>x.pEffecttodate=this.datepipe.transform(x.pEffecttodate,'dd/MM/yyyy'))
            })
        }
        else {
            this._commonService.showWarningMessage('Add One Item to Grid');
        }
    }
    ClearchargeConfiguration() {
        debugger;
        this.ChargeConfigurationdetails = [];
        this.alldeletedrows=[];
        this.ClearFields();
        this.chargesTypesForm.patchValue({
            itemtype: '',
            itemtypeid: '',
            projectname:'',
            projectid:'',
            projectidfirst:'',
            permitno:''
        })
        this.columns=[];
        this.rowindex='';
        this.projecttypeid=0;
        this.showuomfield = false;
        this.showInclude = true;
        this.showExclude = false;
        this.addbutton="Add";
        this.showchargetype = true;
        this.buttonsave = "Save";
        this.disablesavebutton=false;
        this.ChargeConfigurationdetails = [];
        this.alldeletedrows=[];
        this.lstpAccounttypes=[];
        this.minfromdte="";
        this.lstpermintnumber=[];
        this.chargedetails=[];
         this.table.offset = 0;
          this.chargesConfigErrorMessage = {};
        //     $( "#projectname" ).prop( "disabled", false );
        // $( "#effectfromdate" ).prop( "disabled", false );
        // $( "#charge" ).prop( "disabled", false );
        //  $( "#charge" ).prop( "disabled", false );
        // this.chargesTypesForm.controls['projectidfirst'].enable();
           this.chargesTypesForm.controls.primarylandareauom.setValidators(null);
        this.chargesTypesForm.controls.primarylandareauom.updateValueAndValidity();
        this.chargesTypesForm.controls.gstvalue.setValidators([Validators.required]);
        this.Bindprojecttypes();
        this.BindUOMNames();
        this.getGSTpercentage();
        this.chargesConfigErrorMessage = {};
    }
    pprojecttype_Change($event: any) {
        debugger;
        this.addbutton="Add";
        this.chargesTypesForm.patchValue(
      {     
            projectid:'',
            projectidfirst:'',
            projectname:'',
            })
            this.ClearFields();
        this.ChargeConfigurationdetails=[];
        this.alldeletedrows=[];
        this.lstcharges=[];
        if ($event.target.value != '') {
            //this.Newrowstatus=true;
            this.chargesTypesForm.controls.itemtype.setValue($event.target.options[$event.target.selectedIndex].text);
            let itemtypeid = parseInt(this.chargesTypesForm.controls.itemtypeid.value);
            this.projecttypeid=itemtypeid;
                   this.lstpermintnumber=[];  
              this._ChargemasterService.GetProjectdetailsbyid(itemtypeid).subscribe(data => {
              debugger;
              if (data != null) {
               this.lstpermintnumber=data;
                   
                }
               })
        }

    }
//     OnEdit(row,rowIndex){
// debugger;
// this.addbutton="Update";
//  this.chargesTypesForm.patchValue(
//       {
           
//             itemtypeid:row.itemtypeid ? row.itemtypeid:'0',
//             projectid:row.projectid ? row.projectid:'',
//             projectidfirst : row.projectid ? row.projectid :'',
//             ischargeapplicableonuom:row.ischargeapplicableonuom ? row.ischargeapplicableonuom: false,
//             unitofmeasureid:row.unitofmeasureid ?row.unitofmeasureid :'0',
//             chargetypeid:row.chargetypeid ? row.chargetypeid:'',
//             chargesconfigid:row.chargesconfigid ? row.chargesconfigid :'0',
//             chargename:row.chargename ? row.chargename:'',
//             primarylandareauom:row.unitofmeasureid ? row.unitofmeasureid :'0',
//             primarylandareauomname:row.primarylandareauomname ? row.primarylandareauomname :'',
//             chargevalue:row.chargevalue ? row.chargevalue:'0',
//             //UOMvalue: [''],
//             gstvalue: (row.gstvalue).toString() ? row.gstvalue:'',
//             gsttype:row.gsttype ? row.gsttype:'Include',
//             chargevaluefixedpercentage:row.chargevaluefixedpercentage ? row.chargevaluefixedpercentage :'Fixed',
//             pEffectfromdate:row.pEffectfromdate ? row.pEffectfromdate :'',
//             pEffecttodate: row.pEffecttodate ? row .pEffecttodate:'',
//             pStatusname: this._commonService.pStatusname,
//             pCreatedby: this._commonService.pCreatedby,
//             ptypeofoperation: row.ptypeofoperation,
//             status: 'TRUE',
//             priority:row.priority,
//       }
//     )
//       if(this.chargesTypesForm.controls.chargevaluefixedpercentage.value=='Fixed'){
//           this.chargesTypesForm.controls.chargevalue.setValue(this._commonService.currencyformat(this.chargesTypesForm.controls.chargevalue.value));
//                   this.showchargetype = true;
//       }
//       else{
//                   this.showchargetype = false;
//       }
//       if(this.chargesTypesForm.controls.ischargeapplicableonuom.value==false){
//           this.chargesTypesForm.controls.chargedependancetype.setValue('Value');
//            this.showuomfield=false;
//       }
//       else{
//           this.chargesTypesForm.controls.chargedependancetype.setValue('UOM'); 
//           this.showuomfield=true;
//       }
//      this.GetGSTTypes();
//      this.chargesConfigErrorMessage={};
//       $( "#effectfromdate" ).prop( "disabled", true );
//       $( "#projectname" ).prop( "disabled", true );
//       $( "#standardrate" ).prop( "disabled", true );
//        $( "#charge" ).prop( "disabled", true );
//       this.chargesTypesForm.controls['projectidfirst'].disable();
//      this.rowindex=rowIndex;
//    let ChargeConfigurationdetailsFilter=this.ChargeConfigurationdetails;
//  ChargeConfigurationdetailsFilter=ChargeConfigurationdetailsFilter.filter(details=>
//  details.pEffectfromdate=this._commonService.formatDateFromDDMMYYYY(details.pEffectfromdate))
//  this.ChargeConfigurationdetails= this.ChargeConfigurationdetails.filter(dt=>dt.pEffectfromdate=this.datepipe.transform(dt.pEffectfromdate,'dd/MM/yyyy'))
 
// }
GetGSTTypes(){
      let gstvalue = this.chargesTypesForm.controls.gsttype.value;
        if (gstvalue == "Exclude") {
            this.showExclude = true;
            this.showInclude = false;
            this.chargesTypesForm.controls.gstvalue.setValidators([Validators.required]); 
            this.chargesTypesForm.controls.gstvalue.updateValueAndValidity();
        }
        else if (gstvalue == "Include") {
            this.showExclude = false;
            this.showInclude = true;
            this.chargesTypesForm.controls.gstvalue.setValidators([Validators.required]);
              this.chargesTypesForm.controls.gstvalue.updateValueAndValidity();
            this.chargesConfigErrorMessage.gstvalue = null;
        }
        else {
            this.showExclude = false;
            this.showInclude = false;
            this.chargesTypesForm.controls.gstvalue.setValue('0');
            this.chargesTypesForm.controls.gstvalue.setValidators(null);
            this.chargesTypesForm.controls.gstvalue.updateValueAndValidity();

        }
}
permitno_Change(event){
debugger
if(event!=null && event !=null){
    this.addbutton="Add";
    this.lstcharges=[];
      this.ClearFields();
      this.ChargeConfigurationdetails=[];
     this.alldeletedrows=[];
    let itemtypeid=parseInt(event.itemtypeid);
    let projectid=parseInt(event.projectid);
    this.chargesTypesForm.controls.projectid.setValue(event.projectid);
    let launchdate=this._commonService.formatDateFromDDMMYYYY(event.launchdate);
    this.pChargeEffectFromConfig.minDate =launchdate;
       this._ChargemasterService.getitemtypewisechargeConfig(itemtypeid,projectid).subscribe(Details => {
           debugger;
            this.lstcharges = Details;
        })
              this._ChargemasterService.viewitemtypechargeconfiguration(itemtypeid,projectid).subscribe(Details => {
                debugger;
                if (Details != null && Details != '') {
                    this.ChargeConfigurationdetails = Details;
                   for(let i=0;i<this.ChargeConfigurationdetails.length;i++){
                       if(this.ChargeConfigurationdetails[i].pEffecttodate!=null){
                           this.ChargeConfigurationdetails[i].pEffecttodate=this._commonService.formatDateFromDDMMYYYY(this.ChargeConfigurationdetails[i].pEffecttodate)
                       }
                   } 
                } 
            }, error => {
                this.toastr.error(error, 'error')

            })
}
    }
    UOMvalue_change(event) {
        debugger;
        if (event.target.value != '') {

            this.chargesTypesForm.controls.primarylandareauomname.setValue(event.target.options[event.target.selectedIndex].text);
            this.chargesTypesForm.controls.unitofmeasureid.setValue(event.target.options[event.target.selectedIndex].value);
            //this.chargesTypesForm.controls.UOMvalue.setValue(event.target.options[event.target.selectedIndex].text);

        }
        this.GetValidationByControl(this.chargesTypesForm, 'primarylandareauom', true)
    }
    pcharge_Change(event: any): void {
        debugger;
        if (event.target.value != '') {
            this.chargesTypesForm.controls.chargename.setValue(event.target.options[event.target.selectedIndex].text);
        }
    }
    fixedchargetype() {
        debugger;
        this.showchargetype = true;
        this.chargesTypesForm.controls.chargevalue.setValue('');
        this.chargesConfigErrorMessage.chargevalue = null;
    }

    percentagechargetype() {
        debugger;
        this.showchargetype = false;
        this.chargesTypesForm.controls.chargevalue.setValue('');
        this.chargesConfigErrorMessage.chargevalue = null;
    }
    chargevaluechange() {
debugger;
        this.showuomfield = false;
        this.chargesTypesForm.controls.primarylandareauom.setValue('');
        this.chargesTypesForm.controls.primarylandareauomname.setValue('');
         this.chargesTypesForm.controls.unitofmeasureid.setValue('0');
        this.chargesTypesForm.controls.ischargeapplicableonuom.setValue(false);
        this.chargesTypesForm.controls.primarylandareauom.setValidators(null);
        this.chargesTypesForm.controls.primarylandareauom.updateValueAndValidity();
    }
    chargeUOMchange() {
        debugger;
        this.showuomfield = true;
        this.chargesTypesForm.controls.primarylandareauom.setValue('');
        this.chargesTypesForm.controls.primarylandareauomname.setValue('');
         this.chargesTypesForm.controls.unitofmeasureid.setValue('0');
        this.chargesConfigErrorMessage.primarylandareauom = null;
        this.chargesTypesForm.controls.ischargeapplicableonuom.setValue(true);
        this.chargesTypesForm.controls.primarylandareauom.setValidators([Validators.required]);
        this.chargesTypesForm.controls.primarylandareauom.updateValueAndValidity()
  }
    GSTTypeChange() {
        debugger;
        this.gsttypevalue = this.chargesTypesForm.controls.gsttype.value;
        if (this.gsttypevalue == "Exclude") {
            this.showExclude = true;
            this.showInclude = false;
            this.chargesTypesForm.controls.gstvalue.setValue('');
            this.chargesTypesForm.controls.gstvalue.setValidators([Validators.required]);          
            this.chargesConfigErrorMessage.gstvalue = null;
        }
        else if (this.gsttypevalue == "Include") {
            this.showExclude = false;
            this.showInclude = true;
            this.chargesTypesForm.controls.gstvalue.setValue('');
            this.chargesTypesForm.controls.gstvalue.setValidators([Validators.required]);
            this.chargesConfigErrorMessage.gstvalue = null;
        }
        else {
            this.showExclude = false;
            this.showInclude = false;
            this.chargesTypesForm.controls.gstvalue.setValue('0');
            this.chargesTypesForm.controls.gstvalue.setValidators(null);

        }
    }

   addchargeConfigDetailstogrid() {
        debugger;
        let isValid: boolean = true;
        this.gridolddatastatus = false;
        
        if (this.checkValidations(this.chargesTypesForm, isValid)) {
            debugger;
             let chargevalue = this.chargesTypesForm['controls']['chargevalue'].value;
      chargevalue = parseFloat(chargevalue.toString().replace(/,/g, ""));
      if(chargevalue<=0){
           this.chargesTypesForm['controls']['chargevalue'].setValue('');
           this._commonService.showWarningMessage('Charge Value Must be Greater Than Zero.');
           return;
      }
      this.chargesTypesForm['controls']['chargevalue'].setValue(chargevalue);
      if(this.chargesTypesForm.controls.ptypeofoperation.value=='OLD'){
        this.chargesTypesForm.controls.ptypeofoperation.setValue('UPDATE');
      }
           //   if(this.addbutton=="Update"){
             //   this.UpdateRow();
             //   return;
             // }
              let converteddate = this.datepipe.transform(this.chargesTypesForm.controls.pEffectfromdate.value, "dd/MM/yyyy")
              this.chargesTypesForm.controls.pEffectfromdate.setValue(converteddate);
              let formpEffectfromdates =this._commonService.formatDateFromDDMMYYYY( this.chargesTypesForm.controls.pEffectfromdate.value);
            this.chargedetails=this.ChargeConfigurationdetails.filter(row=>row.chargename== this.chargesTypesForm.controls.chargename.value );
            this.chargedetails=this.chargedetails.filter(row=>row.pEffectfromdate=this._commonService.formatDateFromDDMMYYYY(row.pEffectfromdate))
              let changedate=this.chargedetails.filter(row=>row.pEffectfromdate>formpEffectfromdates)
            var dates =changedate.map(function(x) { return (x.pEffectfromdate); });
            this.minfromdte = new Date(Math.min.apply(null,dates));
            changedate=this.chargedetails.filter(row=>row.pEffectfromdate=this.datepipe.transform(row.pEffectfromdate,"dd/MM/yyyy"))
          
            if (this.ChargeConfigurationdetails.length != 0) {
                for (var i = 0; i < this.ChargeConfigurationdetails.length; i++) {
                    let gridpEffectfromdate = this._commonService.formatDateFromDDMMYYYY(this.ChargeConfigurationdetails[i].pEffectfromdate);
                    let grideffecttodate=this.ChargeConfigurationdetails[i].pEffecttodate;
                    if((this.ChargeConfigurationdetails[i].chargename == this.chargesTypesForm.controls.chargename.value) &&( gridpEffectfromdate.toISOString()== formpEffectfromdates.toISOString())){
                         this._commonService.showWarningMessage('Already Exists. '); 
                         this.chargesTypesForm.controls.pEffectfromdate.reset();
                         return;
                    }

                    if (this.ChargeConfigurationdetails[i].chargename == this.chargesTypesForm.controls.chargename.value &&( gridpEffectfromdate <= formpEffectfromdates && formpEffectfromdates<=grideffecttodate )) {                 
                       // this.toastr.info('Already Exists. ', 'info');
                        this._commonService.showWarningMessage('Already Exists. ');
                        this.chargesTypesForm.controls.pEffectfromdate.reset();
                        this.gridolddatastatus = true;
                    }
                    else{
                        if((gridpEffectfromdate <= formpEffectfromdates)&& (this.ChargeConfigurationdetails[i].chargename == this.chargesTypesForm.controls.chargename.value)){
                        if((this.ChargeConfigurationdetails[i].pEffecttodate==null || this.ChargeConfigurationdetails[i].pEffecttodate=="" || this.ChargeConfigurationdetails[i].pEffecttodate=={}) && this.ChargeConfigurationdetails[i].chargename== this.chargesTypesForm.controls.chargename.value){
                            let todate= new Date(formpEffectfromdates.getFullYear(), formpEffectfromdates.getMonth(), formpEffectfromdates.getDate()-1)
                          this.ChargeConfigurationdetails[i].pEffecttodate=todate;
                              }
                        }
                        else{
                            if(this.ChargeConfigurationdetails[i].chargename == this.chargesTypesForm.controls.chargename.value){                          
                             let mintodate= new Date(this.minfromdte.getFullYear(),this.minfromdte.getMonth(),this.minfromdte.getDate()-1);
                            this.chargesTypesForm.controls.pEffecttodate.setValue(mintodate);
                            }
                        }
                    }
                }
             
            }
           

            if (this.gridolddatastatus != true) {
                debugger;
                this.ChargeConfigurationdetails = [...this.ChargeConfigurationdetails, ...this.chargesTypesForm.value];
                let olditemid=this.chargesTypesForm.controls.itemtypeid.value;
                 this.chargesTypesForm.controls.primarylandareauom.setValidators(null);
                 this.chargesTypesForm.controls.primarylandareauom.updateValueAndValidity();
                 this.ClearFields();
                  this.columns=[];
        this.rowindex='';
        this.projecttypeid=0;
        this.showuomfield = false;
        this.showInclude = true;
        this.showExclude = false;
        this.addbutton="Add";
        this.showchargetype = true;
        this.buttonsave = "Save";
        this.chargesTypesForm.controls.itemtypeid.setValue(olditemid);
               }



        }
    }
//     UpdateRow(){
//   debugger;
  
//         if(this.ChargeConfigurationdetails.length>0){
//          this.ChargeConfigurationdetails[this.rowindex]=this.chargesTypesForm.value;
//          }
//          else{
//             this.chargesTypesForm.controls.ptypeofoperation.setValue('CREATE');
//            this.ChargeConfigurationdetails[0]=this.chargesTypesForm.value;
//          }
//         this.ChargeConfigurationdetails=[...this.ChargeConfigurationdetails];  
//         this.ClearFields(); 
//         this.addbutton="Add";
//         this.rowindex='';
//         return;
//   }
  ClearFields(){
      
              this.chargesTypesForm.patchValue(
      {
            ischargeapplicableonuom: false,
            unitofmeasureid:'0',
            chargetypeid:'',
            chargesconfigid:'0',
            chargename: '',
            primarylandareauom: '0',
            primarylandareauomname: '',
            chargedependancetype: 'Value',
            chargevalue:'' ,
            gstvalue:'',
            gsttype: 'Include',
            chargevaluefixedpercentage: 'Fixed',
            pEffectfromdate:'',
            pEffecttodate:'',
            priority:'',
            ptypeofoperation:'CREATE',
            status:'TRUE',
             pCreatedby: this._commonService.pCreatedby,
           }
    )

        //   $( "#effectfromdate" ).prop( "disabled", false );
        //     $( "#projectname" ).prop( "disabled", false );
        //       $( "#charge" ).prop( "disabled", false );
        //     $( "#charge" ).prop( "disabled", false );
        //   this.chargesTypesForm.controls['projectidfirst'].enable();
          this.chargesConfigErrorMessage={};
           this.showuomfield=false;
            this.table.offset = 0;
  }
    OnDelete(row,rowIndex) {
        debugger;
    if(row.ptypeofoperation=='OLD'){
     let deleterow:[]=row;
     this.alldeletedrows=[...this.alldeletedrows,...deleterow]
     this.alldeletedrows=this.alldeletedrows.filter(data=>data.ptypeofoperation='DELETE')
    
    }
        this.ChargeConfigurationdetails.splice(rowIndex, 1);
        this.ChargeConfigurationdetails=[...this.ChargeConfigurationdetails];
    //     let chargeconfigdetailsfilter=this.ChargeConfigurationdetails;
    //     chargeconfigdetailsfilter=chargeconfigdetailsfilter.filter(details=>
    // details.pEffectfromdate=this._commonService.formatDateFromDDMMYYYY(details.pEffectfromdate))
    // this.ChargeConfigurationdetails=chargeconfigdetailsfilter.filter(dat=>
    // dat.pEffectfromdate!=row.pEffectfromdate)
    // this.ChargeConfigurationdetails=this.ChargeConfigurationdetails.filter(data=>data.pEffectfromdate=this.datepipe.transform(data.pEffectfromdate,'dd/MM/yyyy')
    // )

    }
    showErrorMessage(errormsg: string) {
        this._commonService.showErrorMessage(errormsg);
    }

    showInfoMessage(errormsg: string) {
        this._commonService.showInfoMessage(errormsg);
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

    trackByFn(index, item) {
        return index; // or item.id
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
                    this.chargesConfigErrorMessage[key] = '';
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
                                this.chargesConfigErrorMessage[key] += errormessage + ' ';
                                isValid = false;
                            }
                        }

                    }
                }
            }
        }
        catch (e) {
            this.showErrorMessage(key);

            return false;
        }
        return isValid;
    }

}

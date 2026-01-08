import { Component, OnInit,NgZone,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ChargemasterService } from '../../../../Services/HomesInventory/chargemaster.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { CommercialBuildingService } from 'src/app/Services/commercial-building.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare let $: any

@Component({
  selector: 'app-layout-standard-rate-details',
  templateUrl: './layout-standard-rate-details.component.html',
  styles: []
})
export class LayoutStandardRateDetailsComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
   public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public selected = [];
  public temp: any;
  cardstatus:boolean=false;
  public SelectionType = SelectionType;
  LayoutStandardRateValidations:any;
  ratedetails:any;
  projecttypeid:any;
  lstprojecttypes:any;
  lstpermintnumber:any;
  lstUOMvalue:any;
  alldeletedrows=[];
  rowindex:any;
  addbutton:any;
  NotEditMode:boolean=false;
  disablesavebutton:boolean=false;
  StandardRateDetails:any=[];
  todatenullcolumns:any=[];
  todatecolumns:any=[];
  permitnos:any=[]
  permitno:string;
  minfromdte:any;
  adddetailsstatus=true;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfigfrom: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  layoutstandardrateform:FormGroup;
  clearbuttonshow=true;
  savebutton="Save";
  constructor(private formb:FormBuilder,private _commonservice:CommonService,public datepipe:DatePipe, private _chargeMasterService: ChargemasterService,private _PlotcreationService:PlotcreationService,private _CommercialBuildingService:CommercialBuildingService,private zone:NgZone) {
     this.dpConfig.containerClass = this._commonservice.DatePickerDateFormat('containerClass');
    this.dpConfig.dateInputFormat = this._commonservice.DatePickerDateFormat('dateInputFormat');
    this.dpConfig.showWeekNumbers = this._commonservice.DatePickerDateFormat('showWeekNumbers');

     this.dpConfigfrom.containerClass = this._commonservice.DatePickerDateFormat('containerClass');
    this.dpConfigfrom.dateInputFormat = this._commonservice.DatePickerDateFormat('dateInputFormat');
    this.dpConfigfrom.showWeekNumbers = this._commonservice.DatePickerDateFormat('showWeekNumbers');

    //  window['CallingFunctionOutsideData'] = {
    //   zone: this.zone,
    //   componentFn: (value) => this.permitno_Change(value),
    //   component: this,
    // };
    // window['CallingFunctionToHideCard'] = {
    //   zone: this.zone,
    //   componentFn: () => this.HideCard(),
    //   component: this,
    // };
   }
  
  ngOnInit() 
  {
    this.addbutton="Add";
    this.rowindex='';
    this.cardstatus=false;
    this.minfromdte="";
    this.ratedetails=[];
    this.columns=[];
    this.projecttypeid=0;
    this.LayoutStandardRateValidations={};
    this.clearbuttonshow=true;
    this.NotEditMode=false;
    this.lstpermintnumber=[];
    this.disablesavebutton=false;
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    this.dpConfigfrom.containerClass = 'theme-dark-blue';
    this.dpConfigfrom.dateInputFormat = 'DD/MM/YYYY';
    //this.dpConfig.maxDate = new Date();----commented as per GR estate client requirement.
    this.Bindprojecttypes();
    this.getuomvalues();
    
    this.layoutstandardrateform=this.formb.group({
      propertytype:[''],
      standardrateid:['0'],
      itemtypeid:['',Validators.required],
      itemtype:[''],
      primarylandareauom:['',Validators.required],
      primarylandareauomname:[''],
      boardmeetingno:['', [Validators.required, Validators.maxLength(20)]],
      priority:[''],
      boardmeetingdate:['',Validators.required],
      standardvalue:['',Validators.required],
      pEffectfromdate:['',Validators.required],
      pEffecttodate:[''],
      projectname:[''],
      projectnames:['',Validators.required],
      permitno:[''],
      pStatusname: [this._commonservice.pStatusname],
      pCreatedby: [this._commonservice.pCreatedby],
      ptypeofoperation: ['CREATE'],
      status: ['TRUE']

    })
     $( "#effectfromdate" ).prop( "disabled", false );
      $( "#standardrate" ).prop( "disabled", false );
      $( "#typeofproject" ).prop( "disabled", false );
      this.layoutstandardrateform.controls['projectnames'].enable();
    this.BlurEventAllControll(this.layoutstandardrateform);
  }
  
  SaveLayoutStandardRate()
  {
    debugger;
    if(this.StandardRateDetails.length>0){
    debugger;
    
    if(this.alldeletedrows.length>0){
      this.StandardRateDetails=[...this.StandardRateDetails,...this.alldeletedrows];
    }   
    this.alldeletedrows=[];
     this.StandardRateDetails.filter(x => x.pEffectfromdate = this._commonservice.formatDateFromDDMMYYYY( x.pEffectfromdate))
     this.StandardRateDetails.filter(x => x.boardmeetingdate = this._commonservice.formatDateFromDDMMYYYY( x.boardmeetingdate))
     
     let newdata=this.StandardRateDetails;
     let standardRateDetailsDTO={standardRateDetailsDTO:newdata}
     let formdata = Object.assign(standardRateDetailsDTO)
     let data = JSON.stringify(formdata);
     console.log("save data===",data)
     this.savebutton="Processing";
     this.disablesavebutton=true;
     this._chargeMasterService.SaveStandardRateConfiguration(data).subscribe(details=>{
       debugger;
       if(details){
           this.savebutton="Save";
           this.disablesavebutton=false;
           this._commonservice.showInfoMessage('Saved Successfully')
           this.Clear();
               }
     }, error => {
     
            this.showErrorMessage(error)
            this.savebutton="save";
            this.disablesavebutton=false;
             this.StandardRateDetails.filter(x => x.pEffectfromdate = this.datepipe.transform( x.pEffectfromdate,'dd/MM/yyyy'))
            this.StandardRateDetails.filter(x => x.boardmeetingdate = this.datepipe.transform( x.boardmeetingdate,'dd/MM/yyyy'))
    })
    }
    else{
            this._commonservice.showWarningMessage('Add one Item to Grid');
    }  
  }
  permitno_Change(event){
    debugger;
    this.layoutstandardrateform.patchValue(
         {
        boardmeetingno:'0',
        boardmeetingdate:'',
        standardvalue:'',
        pEffectfromdate:'', 
        ptypeofoperation:'CREATE',
        status:'TRUE',
        pCreatedby:this._commonservice.pCreatedby,
        standardrateid:'0',
        pEffecttodate:'',
        priority:'',
         }
       )
       this.addbutton="Add";
       this.LayoutStandardRateValidations.boardmeetingno=null;
        this.LayoutStandardRateValidations.boardmeetingdate=null;
         this.LayoutStandardRateValidations.standardvalue=null;
          this.LayoutStandardRateValidations.pEffectfromdate=null;
           this.LayoutStandardRateValidations.standardrateid=null;
           // this.LayoutStandardRateValidations.pEffecttodate=null;
            //this.LayoutStandardRateValidations.primarylandareauom=null;

    let permitorproject="";
     this.cardstatus=true;
    if(event!=''){
      this.layoutstandardrateform.controls.permitno.setValue(event.permitno);
      this.StandardRateDetails=[];
      this.alldeletedrows=[];
       let launchdate=this._commonservice.formatDateFromDDMMYYYY(event.launchdate);
      //this.dpConfigfrom.minDate =launchdate;
         let itemtypeid=parseInt(this.layoutstandardrateform.controls.itemtypeid.value);
         let permitno=event.permitno;
         if(itemtypeid==1){
           permitorproject=permitno;
          this.layoutstandardrateform.controls.projectname.setValue(event.permitno);
         }
         else{
           permitorproject=event.projectname;
           this.layoutstandardrateform.controls.projectname.setValue(event.projectname);
         }
       this._chargeMasterService.viewitemtypeStandardrateconfiguration(itemtypeid,permitorproject).subscribe(details => {
            debugger;
            this.cardstatus=false;
            if(details.length>0){
            this.StandardRateDetails= details;
            if(this.StandardRateDetails.length>0){
              this.StandardRateDetails.filter(function(row){
                if(row.boardmeetingdate==null || row.boardmeetingdate==""){
                  row.boardmeetingdate=row.pEffectfromdate
                 }     
               })
            }
                for(let i=0;i<this.StandardRateDetails.length;i++){
                       if(this.StandardRateDetails[i].pEffecttodate!=null){
                           this.StandardRateDetails[i].pEffecttodate=this._commonservice.formatDateFromDDMMYYYY(this.StandardRateDetails[i].pEffecttodate)
                       }
                   } 
                   debugger;
                   let projectnamethis=this.layoutstandardrateform.controls.projectnames.value;
                 this.StandardRateDetails=this.StandardRateDetails.filter(row=>
                 row.projectnames=projectnamethis)
               let firstcreateddate=this.StandardRateDetails.filter(function(row){
                  return row.priority=='PRIMARY'
                 })
                 if(firstcreateddate.length>0){
                  // this.dpConfig.minDate =this._commonservice.formatDateFromDDMMYYYY(firstcreateddate[0].pEffectfromdate);
                }
                else{
                   this.dpConfig.minDate=null;
                  // this.layoutstandardrateform.controls.pEffectfromdate.reset();
                }
            }
        }, error => {
            this.showErrorMessage(error)
        })  
    }
  }
  customSearchFn(term: string, item: any) {
    debugger;
    console.log(item)
    term = term.toLowerCase();
   
      return item.permitno.toLowerCase().indexOf(term) > -1 || item.projectname.toLowerCase().indexOf(term) > -1 ;
    
    
    
  }
  projecttype_Change($event){
    debugger;
     if ($event.target.value != '') {  
       this.layoutstandardrateform.patchValue(
         {
        boardmeetingno:'0',
        boardmeetingdate:'',
        standardvalue:'',
        pEffectfromdate:'', 
        ptypeofoperation:'CREATE',
        status:'TRUE',
        pCreatedby:this._commonservice.pCreatedby,
        standardrateid:'',
        pEffecttodate:'',
        projectname:'',
        projectnames:'',
        primarylandareauom:'',
        priority:'',
         }
       )
        this.addbutton="Add";
        this.LayoutStandardRateValidations.boardmeetingno=null;
        this.LayoutStandardRateValidations.boardmeetingdate=null;
        this.LayoutStandardRateValidations.standardvalue=null;
        this.LayoutStandardRateValidations.pEffectfromdate=null;
        this.LayoutStandardRateValidations.standardrateid=null;
        this.LayoutStandardRateValidations.projectnames=null;
        this.LayoutStandardRateValidations.primarylandareauom=null;
        
       let itemtypeid=parseInt(this.layoutstandardrateform.controls.itemtypeid.value);
       this.projecttypeid=itemtypeid;
       this.lstpermintnumber=[];   
       this.StandardRateDetails=[];
       this.layoutstandardrateform.controls.projectname.setValue('');
       this.layoutstandardrateform.controls.projectnames.setValue('');
       this.LayoutStandardRateValidations.projectnames=null;
       this.LayoutStandardRateValidations.projectnames=null;
            this.layoutstandardrateform.controls.itemtype.setValue($event.target.options[$event.target.selectedIndex].text); 
            if(this.layoutstandardrateform.controls.itemtype.value=='Plots'){
              this.layoutstandardrateform.controls.primarylandareauom.setValue('5')
               this.layoutstandardrateform.controls.primarylandareauomname.setValue('Square Yards')
            }
            else{
              this.layoutstandardrateform.controls.primarylandareauom.setValue('4')
               this.layoutstandardrateform.controls.primarylandareauomname.setValue('Square Feet')
            }
         
            this._chargeMasterService.GetProjectdetailsbyid(itemtypeid).subscribe(data => {
              debugger;
              if (data != null) {
               this.lstpermintnumber=data;
                   
                }
               })
            }       
  }

OnDelete(row,rowIndex){
  debugger;
     if(row.ptypeofoperation=='OLD'){
     let deleterow:[]=row;
     this.alldeletedrows=[...this.alldeletedrows,...deleterow]
     this.alldeletedrows=this.alldeletedrows.filter(data=>data.ptypeofoperation='DELETE')
    }
  this.StandardRateDetails.splice(rowIndex,1);
  this.StandardRateDetails=[...this.StandardRateDetails];
}
OnEdit(row,rowIndex){
debugger;
this.addbutton="Update";
 this.layoutstandardrateform.patchValue(
      {
        boardmeetingno:row.boardmeetingno,
        boardmeetingdate:this._commonservice.formatDateFromDDMMYYYY(row.boardmeetingdate),
        standardvalue:this._commonservice.currencyformat(row.standardvalue),
        pEffectfromdate:this._commonservice.formatDateFromDDMMYYYY(row.pEffectfromdate), 
        ptypeofoperation:row.ptypeofoperation,
        standardrateid:row.standardrateid,
        pEffecttodate:row.pEffecttodate,
        priority:row.priority,
        status:'TRUE',
        pCreatedby:this._commonservice.pCreatedby,
      }
    )

     //$( "#effectfromdate" ).prop( "disabled", true );
      //$( "#standardrate" ).prop( "disabled", true );
      $( "#typeofproject" ).prop( "disabled", true );
      this.layoutstandardrateform.controls['projectnames'].disable();
     this.NotEditMode=true;
     this.rowindex=rowIndex;
   let StandardRateDetailsfilter=this.StandardRateDetails;
 StandardRateDetailsfilter=StandardRateDetailsfilter.filter(details=>
 details.pEffectfromdate=this._commonservice.formatDateFromDDMMYYYY(details.pEffectfromdate))
// this.StandardRateDetails=StandardRateDetailsfilter.filter(data=>data.pEffectfromdate!=row.pEffectfromdate)
 this.StandardRateDetails= this.StandardRateDetails.filter(dt=>dt.pEffectfromdate=this.datepipe.transform(dt.pEffectfromdate,'dd/MM/yyyy'))
}
getuomvalues(){
  let requestfrom='plots';
 this._chargeMasterService.GetUnitofMeasureDetails(requestfrom).subscribe(data => {
            this.lstUOMvalue = data;
        }, error => {
            this.showErrorMessage(error)
        })
}


UpdateRow(){
  debugger;
  
        if(this.StandardRateDetails.length>0){
        this.layoutstandardrateform.controls.pEffectfromdate.setValue(this.datepipe.transform(this.layoutstandardrateform.controls.pEffectfromdate.value,"dd/MM/yyyy"));
         this.layoutstandardrateform.controls.boardmeetingdate.setValue(this.datepipe.transform(this.layoutstandardrateform.controls.boardmeetingdate.value,"dd/MM/yyyy"));
         //let boardmeetingno=parseInt(this.layoutstandardrateform['controls']['boardmeetingno'].value)
        // this.layoutstandardrateform.controls.boardmeetingno.setValue(boardmeetingno);
         this.StandardRateDetails[this.rowindex]=this.layoutstandardrateform.value;
         }
         else{
            this.layoutstandardrateform.controls.ptypeofoperation.setValue('CREATE');
           this.StandardRateDetails[0]=this.layoutstandardrateform.value;
         }
        this.StandardRateDetails=[...this.StandardRateDetails];   
        this.addbutton="Add";
        this.rowindex='';
        this.layoutstandardrateform.patchValue(
      {
        boardmeetingno:'',boardmeetingdate:'',standardvalue:'',pEffectfromdate:'',ptypeofoperation: 'CREATE',standardrateid:'0',pEffecttodate:'',priority:'',status:'TRUE',
        pCreatedby:this._commonservice.pCreatedby}
    )
          $( "#effectfromdate" ).prop( "disabled", false );
          $( "#standardrate" ).prop( "disabled", false );
          $( "#typeofproject" ).prop( "disabled", false );
          this.layoutstandardrateform.controls['projectnames'].enable();
          this.LayoutStandardRateValidations=[];
        return;
  }


 AddStandardRateDetails(){
    let isvalid = true;
if(this.checkValidations(this.layoutstandardrateform,isvalid)){
  debugger;
 // let boardmeetingno=parseInt(this.layoutstandardrateform['controls']['boardmeetingno'].value)
  //this.layoutstandardrateform.controls.boardmeetingno.setValue(boardmeetingno);
   let standardvalue = this.layoutstandardrateform['controls']['standardvalue'].value;
      	
             if (standardvalue != null && standardvalue!='' && standardvalue!=0) { 	
               standardvalue = parseFloat(standardvalue.toString().replace(/,/g, ""));	
                 }	
            else {	
            standardvalue = 0;	
             this._commonservice.showWarningMessage('Standard Rate Must be Greater than Zero.');	
              this.layoutstandardrateform['controls']['standardvalue'].setValue('');	
             return;	
              }
      this.layoutstandardrateform['controls']['standardvalue'].setValue(standardvalue);
      if(this.layoutstandardrateform.controls.ptypeofoperation.value=='OLD'){
        this.layoutstandardrateform.controls.ptypeofoperation.setValue('UPDATE');
      }
      
//bord meating date check
    let EffectedDate=this.datepipe.transform(this.layoutstandardrateform.controls.pEffectfromdate.value,'dd/MM/yyyy')
    let effectivefromdate=this._commonservice.formatDateFromDDMMYYYY(EffectedDate);
    let boardmeetingdate=this.datepipe.transform(this.layoutstandardrateform.controls.boardmeetingdate.value,'dd/MM/yyyy')
    let finalboardmeetingdate=this._commonservice.formatDateFromDDMMYYYY(boardmeetingdate);
     if(effectivefromdate<finalboardmeetingdate){
         this._commonservice.showWarningMessage('Effected Date must be greater than or equal to Board Meeting Date')
        return;
   }

//editdata/update
      if(this.addbutton=="Update"){
        this.UpdateRow();
        return;
      }

  //for previous dates 
  this.ratedetails=this.StandardRateDetails;
  this.ratedetails.filter(row=>row.pEffectfromdate=this._commonservice.formatDateFromDDMMYYYY(row.pEffectfromdate))
    let changedate=this.ratedetails.filter(row=>row.pEffectfromdate>effectivefromdate)
            var dates =changedate.map(function(x) { return (x.pEffectfromdate); });
            this.minfromdte = new Date(Math.min.apply(null,dates));
            changedate=this.ratedetails.filter(row=>row.pEffectfromdate=this.datepipe.transform(row.pEffectfromdate,"dd/MM/yyyy"))
//
  
   if(this.StandardRateDetails.length>0){
     for (var i = 0; i < this.StandardRateDetails.length; i++) {
                   let gridpEffectfromdate = this._commonservice.formatDateFromDDMMYYYY(this.StandardRateDetails[i].pEffectfromdate);
                   let grideffecttodate=this.StandardRateDetails[i].pEffecttodate;
                   if(gridpEffectfromdate.toISOString()==effectivefromdate.toISOString()){
                      this._commonservice.showWarningMessage('Already Exisits...');
                         return;
                   }
                    if ((gridpEffectfromdate<=effectivefromdate && effectivefromdate<= grideffecttodate)) {     
                       this._commonservice.showWarningMessage('Already Exisits...');
                         return;
                    }
                    else{
                         if(gridpEffectfromdate <= effectivefromdate){
                              if(this.StandardRateDetails[i].pEffecttodate== null || this.   StandardRateDetails[i].pEffecttodate==""){
                              let sampledate=this._commonservice.formatDateFromDDMMYYYY(EffectedDate);
                              let effectivetodate= new Date(sampledate.getFullYear(), sampledate.getMonth(), sampledate.getDate()-1)
                               this.StandardRateDetails[i].pEffecttodate=effectivetodate;
                             }   
                           }
                         else{
                             let mintodate= new Date(this.minfromdte.getFullYear(),this.minfromdte.getMonth(),this.minfromdte.getDate()-1);
                            this.layoutstandardrateform.controls.pEffecttodate.setValue(mintodate);
                          }
                     }
          }
   
   }
    this.layoutstandardrateform.controls.pEffectfromdate.setValue(EffectedDate);
    this.layoutstandardrateform.controls.boardmeetingdate.setValue(boardmeetingdate);
    this.StandardRateDetails=[...this.StandardRateDetails,...this.layoutstandardrateform.value]
    this.layoutstandardrateform.patchValue(
      {
        boardmeetingno:'',boardmeetingdate:'',standardvalue:'',pEffectfromdate:'',ptypeofoperation: 'CREATE',standardrateid:'0',pEffecttodate:'',priority:'',status:'TRUE',
        pCreatedby:this._commonservice.pCreatedby}
    )
         $( "#effectfromdate" ).prop( "disabled", false );
         $( "#standardrate" ).prop( "disabled", false );
         $( "#typeofproject" ).prop( "disabled", false );
         this.layoutstandardrateform.controls['projectnames'].enable();

       this.LayoutStandardRateValidations=[];
       
 }
 }
 UOMvalue_change($event){
   if ($event.target.value != '') {          
            this.layoutstandardrateform.controls.primarylandareauomname.setValue($event.target.options[$event.target.selectedIndex].text); 
     }  
 }
  Clear(){
    //this.layoutstandardrateform.reset();
   //this.ngOnInit();
       this.addbutton="Add";
    this.rowindex='';
    this.cardstatus=false;
    this.minfromdte="";
    this.ratedetails=[];
    this.columns=[];
    this.projecttypeid=0;
    this.clearbuttonshow=true;
    this.NotEditMode=false;
    this.lstpermintnumber=[];
     this.StandardRateDetails=[];
    this.alldeletedrows=[];
    this.disablesavebutton=false;
    this.dpConfig.maxDate = new Date();
    this.Bindprojecttypes();
    this.getuomvalues();
    this.layoutstandardrateform.patchValue(
      {
         propertytype:'',
      itemtypeid:'',
      itemtype:'',
      primarylandareauom:'',
      primarylandareauomname:'',
        boardmeetingno:'',
        boardmeetingdate:'',
        standardvalue:'',
        pEffectfromdate:'',
        ptypeofoperation: 'CREATE',
        status:'TRUE',
        pCreatedby:this._commonservice.pCreatedby,
        standardrateid:'0',
        pEffecttodate:'',
        priority:'',
        projectname:'',
      projectnames:'',
      permitno:'',
        })
     $( "#effectfromdate" ).prop( "disabled", false );
      $( "#standardrate" ).prop( "disabled", false );
      $( "#typeofproject" ).prop( "disabled", false );
      this.layoutstandardrateform.controls['projectnames'].enable();
      this.LayoutStandardRateValidations={};
      this.table.offset = 0; 
   
  }
   Bindprojecttypes() {
    debugger;
    this._chargeMasterService.getprojecttypes().subscribe(data => {
      debugger;
      this.lstprojecttypes = data;
    })
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
          this.LayoutStandardRateValidations[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {

                let lablename;

                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.LayoutStandardRateValidations[key] += errormessage + ' ';
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
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../Services/common.service';
import { AddressComponent } from 'src/app/UI/Common/address/address.component';
import { CompanyconfigDocumentsComponent } from 'src/app/UI/Settings/company-config/companyconfig-documents/companyconfig-documents.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { ChargemasterService } from '../../../../Services/HomesInventory/chargemaster.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BranchconfigService } from 'src/app/Services/Settings/branchconfig.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { isNullOrEmptyString, anyChanged } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { timingSafeEqual } from 'crypto';

declare let $: any

@Component({
  selector: 'app-plots-layouts-creation',
  templateUrl: './plots-layouts-creation.component.html',
  styles: []
})

export class PlotsLayoutsCreationComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  Landdata: any;
  disablesavebuttonnew=false;
  templanddata: any;
  duplicatecheck = false;
  Projecttype: any;
  primaryUomdata: any;
  secondaryUomdata: any;
  PlotsLayoutsValidationErrors: any;
  PlotsLayoutsform: FormGroup;
  ChargesandFeesform: FormGroup;
   chargeentrygroup: FormGroup;
  savebutton = "Save & Continue";
  RequestUom = "LAYOUT";
  layoutid: any;
  standardrate: any;
  disablesavebutton = false;
  branchdisable = false;
  disableclearbutton = false;
  ProjectArea: boolean = true;
  ChargesandFees: boolean = true;
  AreaStatement: false;
  ItemTypes: any;
  buttonnameedit: any
  lstbranchnames: any;
  today=new Date();
  selectedRows = false;
  landbankid: any;
  addchargesbutton:any;
  saveextratypebutton:any;
  chklandbankid: any;
  itemtypeID = "1";
  pBranchId = "";
  extratypeentrygroup: FormGroup;
  selected = [];
  primarylandareauom: number;
  primarylandareaname: string;
  secondarylandareauom: number;
  secondarylandareaname: string;
  LandDetailsData: any = [];
  Address:any;
  LandPurchaseDetailsData: any = [];
  rows = [];
  rowIndex: any;
  primaryavailablearea: any;
  availableareaINACRES: Number;
  lstcharges: any = [];
  Landdatasss: any;
  ChargesSettings:any={};
  AdditionDeductionSettings:any={};
  ChargesandFeesData: any = [];
  Chargesdeletedrows:any=[];
  selectedChargesandFees: any = [];
  ChargesandFeesButton: boolean = false;
  AdditionButton: boolean = false;
  DeductionButton: boolean = false;
  landradiodisabled = false;
  DeductionsDeletedRows:any=[];
  AdditionsDeletedRows:any=[];
  AdditionExtratypesNamesArray: any = [];
  DeductionExtratypesNamesArray: any = [];
  AdditionExtratypesNames: any = [];
  DeductionExtratypesNames: any = [];
  transactionid: any;
  launchdate = false;
  ConvetData: any = [];
  public singlValurArray:any=[];
  public ChargeData:any=[];
  public AdditionData:any=[];
  public DeductionData:any=[];
  selectedCharges: any=[];
  selectedChargeslist:any=[];
  selectedAdditionslist:any=[];
  selectedDeductionslist:any=[];
  selectedAdditions:any=[];
  selectedDeductions:any=[];
  public fixed: boolean = false;
  public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public ProjectLaunchdateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private _commonservice: CommonService, private fb: FormBuilder, private _LandBankservice: LandBankService, private _branchconfigService: BranchconfigService, private _plotcreationservices: PlotcreationService, private Datepipe: DatePipe, private _routes: Router, private ActRoute: ActivatedRoute,private _ChargemasterService:ChargemasterService) {
    this.ProjectLaunchdateConfig.containerClass = 'theme-dark-blue';
    this.ProjectLaunchdateConfig.showWeekNumbers = false;
    //this.ProjectLaunchdateConfig.maxDate = this.today;
    this.ProjectLaunchdateConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit() {
    debugger
    this.ChargesSettings={};
    this.AdditionDeductionSettings={};
    this.ChargeData=[];
    this.disablesavebuttonnew=false;
    this.addchargesbutton="Save";
    this.saveextratypebutton="Save";
    this.AdditionData=[];
    this.DeductionData=[];
    this.selectedCharges =[];
    this.selectedChargeslist=[];
     this.selectedAdditionslist=[];
    this.selectedDeductionslist=[];
    this.selectedAdditions=[];
    this.selectedDeductions=[];
    this.ChargesandFeesButton = false;
    this.disableclearbutton = false;
    this.duplicatecheck = false
    this.landradiodisabled = false;
    this.branchdisable = false;
    this.templanddata=[];
    this.Landdata = [];
    this.standardrate = '';
    this.layoutid = "";
    this.pBranchId = "";
    this.chklandbankid = "";
    this.extratypeentrygroup = this.fb.group({
      extratypename: ['', Validators.required],
      adddeductiontype: [''],
     // adddeductiontypes: ['', Validators.required],
      pCreatedby: [this._commonservice.pCreatedby],
      status: ['TRUE'],
      ptypeofoperation: ['CREATE']
    })
    this.getUOMConversionData();
    this.getLanddata('Create');
    this.getDefaultCharges();
    this.GetItemTypes();
    this.getUOMdata();
    $( "#permitnumber" ).prop( "disabled", false );
    $( "#raranumber" ).prop( "disabled", false );
    $( "#launchdatepipe" ).prop( "disabled", false );
    $( "#projectname" ).prop( "disabled", false );
        $( "#secondaryuomid" ).prop( "disabled", false );
        $( "#primaryarea" ).prop( "disabled", false );
        $( "#secondaryarea" ).prop( "disabled", false );
         $( "#standardratedis" ).prop( "disabled", false );
    $( "#totalnoofplotscount" ).prop( "disabled", false );
    //this.getbranchnames();
    //this.getitemtypewiseExtratypesNamesconfiguration();
      this.chargeentrygroup = this.fb.group({
            chargenames: ['', Validators.required],
            chargename: [''],
            pAccounttype:['', Validators.required],
            status: ['TRUE'],
            ptypeofoperation: ['CREATE']
        })
         this.BlurEventAllControll(this.chargeentrygroup);
          this.BlurEventAllControll(this.extratypeentrygroup);
   
    this.PlotsLayoutsValidationErrors = {};
    this.projectDetailsForm();
    this.GetExtraTypes();
    this.BlurEventAllControll(this.PlotsLayoutsform);
    this.ChargesandFeesFormFn();
    $('.nav-item a[href="#Project-Details"]').tab('show');
    this.BlurEventAllControll(this.PlotsLayoutsform);
    this.buttonnameedit = this._plotcreationservices.GetButtonType()
    if (this.buttonnameedit == "Edit") {

      if (this.ActRoute.snapshot.params['id']) {
        debugger
        let layoutid = atob(this.ActRoute.snapshot.params['id']);
        this.PlotsLayoutsform.controls.layoutid.setValue(parseInt(layoutid));
        this.getlayoutplotsdetails(parseInt(layoutid));
        this.PlotsLayoutsValidationErrors = {};
      }
    }
        this.ChargesSettings = {
      singleSelection: false,
      idField: 'chargetypeid',
      textField: 'chargename',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Un Select All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 5,
      searchPlaceholderText: 'Search Text',
      noDataAvailablePlaceholderText: 'No Data Found',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
            this.AdditionDeductionSettings = {
      singleSelection: false,
      idField: 'extratypesid',
      textField: 'extratypename',
      enableCheckAll: false,
      selectAllText: 'Select All',
      unSelectAllText: 'Un Select All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 5,
      searchPlaceholderText: 'Search Text',
      noDataAvailablePlaceholderText: 'No Data Found',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
         
    
  }
  onItemSelect(event){
    debugger;
    if(this.selectedCharges.length>0){
      if(this.ActRoute.snapshot.params['id']){
        if(this.Chargesdeletedrows.length>0){
          let deletedselect=this.Chargesdeletedrows.find(({ chargetypeid }) => chargetypeid == event.chargetypeid);
          if(deletedselect){
              // this.Chargesdeletedrows.filter(function(row){
              //   if(row.chargetypeid==deletedselect.chargetypeid){
              //     row.ptypeofoperation='OLD';
              //   }
              // });
              deletedselect.ptypeofoperation='OLD';
               this.ChargesandFeesData = [...this.ChargesandFeesData,...deletedselect]; 
               this.Chargesdeletedrows.filter(row=>row.chargesconfigid!=deletedselect.chargetypeid);
             return;
            }
          }

        let duplicatename = this.lstcharges.find(({ chargetypeid }) => chargetypeid == event.chargetypeid);
        let duplicateselect=this.selectedCharges.find(({ chargetypeid }) => chargetypeid == duplicatename.chargetypeid);
        if(duplicateselect){
           return;
        }
      }
      else{
        let duplicateselect=this.selectedCharges.find(({ chargetypeid }) => chargetypeid == event.chargetypeid);
        if(duplicateselect){
           return;
        }
      }
    }
    const ChargesAndFeesControls = <FormGroup>this.ChargesandFeesform['controls']['ChargesAndFeesControls'];
     this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargename'].setValue(event.chargename);
     this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargetypeid'].setValue(event.chargetypeid);
      this.ChargesandFeesData = [...this.ChargesandFeesData, ...this.ChargesandFeesform.value.ChargesAndFeesControls]; 
      this.resetChargeControls() ;
  }
  onSelectAll(event){
    debugger;
    let allselectedrows=event;
     this.ChargesandFeesData=[];
     this.Chargesdeletedrows=[];
    const ChargesAndFeesControls = <FormGroup>this.ChargesandFeesform['controls']['ChargesAndFeesControls'];
    for(let i=0;i<this.lstcharges.length;i++){
       let duplicateselect=this.selectedCharges.find(({ chargetypeid }) => chargetypeid == this.lstcharges[i].chargetypeid);
        if(duplicateselect){
           this.ChargesandFeesData = [...this.ChargesandFeesData, ...duplicateselect]; 
        }
        else{
     this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargename'].setValue(allselectedrows[i].chargename);
     this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargetypeid'].setValue(allselectedrows[i].chargetypeid);
     this.ChargesandFeesData = [...this.ChargesandFeesData, ...this.ChargesandFeesform.value.ChargesAndFeesControls]; 
     this.resetChargeControls();
        }
    }
    this.Chargesdeletedrows=[];
  }
  onDeSelect(event){
    debugger;
    let duplicateselect=this.selectedCharges.find(({ chargetypeid }) => chargetypeid ==event.chargetypeid);
        if(duplicateselect){
     let deleterow:[]=duplicateselect;
     this.Chargesdeletedrows=[...this.Chargesdeletedrows,...deleterow]
     this.Chargesdeletedrows=this.Chargesdeletedrows.filter(data=>data.ptypeofoperation='DELETE')
        }
  this.ChargesandFeesData=this.ChargesandFeesData.filter(row=>row.chargetypeid!=event.chargetypeid);
  
  }
  onDeSelectAll(event){
    debugger;
    // let duplicateselect=this.selectedCharges.find(({ extratypesid }) => extratypesid ==event.extratypesid);
   // if(duplicateselect){
     let deleterow:[]=this.selectedCharges;
     this.Chargesdeletedrows=[...this.Chargesdeletedrows,...deleterow]
     this.Chargesdeletedrows=this.Chargesdeletedrows.filter(data=>data.ptypeofoperation='DELETE')
      //  }
    this.ChargesandFeesData = [];
   
  }
  onItemSelect_addition(event){
     debugger;
        if(this.DeductionExtratypesNamesArray.length>0){
          let fingextratype=this.DeductionExtratypesNamesArray.find(({ extratypesid }) => extratypesid == event.extratypesid);
          if(fingextratype){
            this.selectedAdditionslist=this.selectedAdditionslist.filter(row=>row.extratypesid!=event.extratypesid)
           this._commonservice.showWarningMessage('Extra Type Already Exists.')
           //event=null;
           return;
          }
        }
     if(this.selectedDeductions.length>0){
      if(this.ActRoute.snapshot.params['id']){
         if(this.AdditionsDeletedRows.length>0){
          let deletedselect=this.AdditionsDeletedRows.find(({ extratypesid }) => extratypesid == event.extratypesid);
          if(deletedselect){
              // this.AdditionsDeletedRows.filter(function(row){
              //   if(row.extratypesid==deletedselect.extratypesid){
              //     row.ptypeofoperation='OLD';
              //   }
              // })
              deletedselect.ptypeofoperation='OLD';
              this.AdditionExtratypesNamesArray = [...this.AdditionExtratypesNamesArray, ...deletedselect];
              this.AdditionsDeletedRows.filter(row=>row.extratypesid!=deletedselect.extratypesid);
             return;
            }
          }
        let duplicatename = this.AdditionExtratypesNames.find(({ extratypesid }) => extratypesid == event.extratypesid);
        let duplicateselect=this.selectedAdditions.find(({ extratypesid }) => extratypesid == duplicatename.extratypesid);
        if(duplicateselect){
           return;
        }
      }
      else{
        let duplicateselect=this.selectedAdditions.find(({ extratypesid }) => extratypesid == event.extratypesid);
        if(duplicateselect){
           return;
        }
      }
    }
    const AdditionFormControls = <FormGroup>this.ChargesandFeesform['controls']['AdditionFormControls'];
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extratypename'].setValue(event.extratypename);
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extratypesid'].setValue(event.extratypesid);
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['adddeductiontype'].setValue('Addition')
      this.AdditionExtratypesNamesArray = [...this.AdditionExtratypesNamesArray, ...this.ChargesandFeesform.value.AdditionFormControls];
      this.resetAdditionContrls();
  }
  onSelectAll_addition(event){
    debugger;
    this.AdditionExtratypesNamesArray=[];
    this.AdditionsDeletedRows=[];
    let selectedadditons=event;
     const AdditionFormControls = <FormGroup>this.ChargesandFeesform['controls']['AdditionFormControls'];
     if(this.DeductionExtratypesNamesArray.length>0){
       this.onDeSelectAll_Deduction('');
      this.PlotsLayoutsform.get('selectDeductions').disable()
        // this._commonservice.showWarningMessage('Already Exists in Extra Types-Deductions');
       return;
       }
     for(let i=0;i<this.AdditionExtratypesNames.length;i++){
        let newselect=this.selectedAdditions.find(({ extratypesid }) => extratypesid == this.AdditionExtratypesNames[i].extratypesid);
        if(newselect){
          this.AdditionExtratypesNamesArray = [...this.AdditionExtratypesNamesArray, ...newselect];
        }
        else{
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extratypename'].setValue(selectedadditons[i].extratypename);
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extratypesid'].setValue(selectedadditons[i].extratypesid);
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['adddeductiontype'].setValue('Addition')
      this.AdditionExtratypesNamesArray = [...this.AdditionExtratypesNamesArray, ...this.ChargesandFeesform.value.AdditionFormControls];
      this.resetAdditionContrls();
        }
     }
     this.AdditionsDeletedRows=[];
  }
  onDeSelect_addition(event){
    debugger;
        let duplicateselect=this.selectedAdditions.find(({ extratypesid }) => extratypesid ==event.extratypesid);
    if(duplicateselect){
     let deleterow:[]=duplicateselect;
     this.AdditionsDeletedRows=[...this.AdditionsDeletedRows,...deleterow]
     this.AdditionsDeletedRows=this.AdditionsDeletedRows.filter(data=>data.ptypeofoperation='DELETE')
        }
    this.AdditionExtratypesNamesArray=this.AdditionExtratypesNamesArray.filter(row=>row.extratypesid!=event.extratypesid);
    

  }
  onDeSelectAll_addition(event){
    debugger;
    // let duplicateselect=this.selectedAdditions.find(({ extratypesid }) => extratypesid ==event.extratypesid);
    // if(duplicateselect){
      this.AdditionsDeletedRows=[];
     let deleterow:[]=this.selectedAdditions;
     this.AdditionsDeletedRows=[...this.AdditionsDeletedRows,...deleterow]
     this.AdditionsDeletedRows=this.AdditionsDeletedRows.filter(data=>data.ptypeofoperation='DELETE')
       // }
        this.AdditionExtratypesNamesArray= [];
  }
  onItemSelect_Deduction(event){
    debugger;
     if(this.AdditionExtratypesNamesArray.length>0){
          let fingextratype=this.AdditionExtratypesNamesArray.find(({ extratypesid }) => extratypesid == event.extratypesid);
          if(fingextratype){
            this.selectedDeductionslist=this.selectedDeductionslist.filter(row=>row.extratypesid!=event.extratypesid);
           this._commonservice.showWarningMessage('Extra Type Already Exists.')
           return;
          }
        }
         if(this.selectedDeductions.length>0){
          if(this.ActRoute.snapshot.params['id']){
          if(this.DeductionsDeletedRows.length>0){
          let deletedselect=this.DeductionsDeletedRows.find(({ extratypesid }) => extratypesid == event.extratypesid);
          if(deletedselect){
              // this.DeductionsDeletedRows.filter(function(row){
              //   if(row.extratypesid==deletedselect.extratypesid){
              //     row.ptypeofoperation='OLD';
              //   }
              // })
              deletedselect.ptypeofoperation='OLD';
              this.DeductionExtratypesNamesArray = [...this.DeductionExtratypesNamesArray, ...deletedselect];
              this.DeductionsDeletedRows.filter(row=>row.extratypesid!=deletedselect.extratypesid)
             return;
            }
          }
        let duplicatename = this.DeductionExtratypesNames.find(({ extratypesid }) => extratypesid == event.extratypesid);
        let duplicateselect=this.selectedDeductions.find(({ extratypesid }) => extratypesid == duplicatename.extratypesid);
        if(duplicateselect){
           return;
        }
      }
      else{
        let duplicateselect=this.selectedDeductions.find(({ extratypesid }) => extratypesid == event.extratypesid);
        if(duplicateselect){
           return;
        }
      }
    }
      const DeductionFormControls = <FormGroup>this.ChargesandFeesform['controls']['DeductionFormControls'];
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extratypename'].setValue(event.extratypename);
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extratypesid'].setValue(event.extratypesid);
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['adddeductiontype'].setValue('Deduction');
      this.DeductionExtratypesNamesArray = [...this.DeductionExtratypesNamesArray, ...this.ChargesandFeesform.value.DeductionFormControls];
      this.resetDeductionContrls();
  }
  onSelectAll_Deduction(event){
    debugger;
     let selecteddeductions=event;
     this.DeductionsDeletedRows=[];
     this.DeductionExtratypesNamesArray=[];
     const DeductionFormControls = <FormGroup>this.ChargesandFeesform['controls']['DeductionFormControls'];
    if(this.AdditionExtratypesNamesArray.length>0){
        event=[];
       this.selectedDeductionslist=null;
       this._commonservice.showWarningMessage('Already Exists in Extra types-Additions.');
       return;
     }
     for(let i=0;i<this.DeductionExtratypesNames.length;i++){
        let duplicateselect=this.selectedDeductions.find(({ extratypesid }) => extratypesid == this.DeductionExtratypesNames[i].extratypesid);
        if(duplicateselect){
          this.DeductionExtratypesNamesArray = [...this.DeductionExtratypesNamesArray, ...duplicateselect];
        }
        else{
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extratypename'].setValue(selecteddeductions[i].extratypename);
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extratypesid'].setValue(selecteddeductions[i].extratypesid);
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['adddeductiontype'].setValue('Deduction');
      this.DeductionExtratypesNamesArray = [...this.DeductionExtratypesNamesArray, ...this.ChargesandFeesform.value.DeductionFormControls];
      this.resetDeductionContrls();
        }
     }
     this.DeductionsDeletedRows=[];
  }
  onDeSelect_Deduction(event){
    debugger;
    let duplicateselect=this.selectedDeductions.find(({ extratypesid }) => extratypesid ==event.extratypesid);
    if(duplicateselect){
     let deleterow:[]=duplicateselect;
     this.DeductionsDeletedRows=[...this.DeductionsDeletedRows,...deleterow]
     this.DeductionsDeletedRows=this.DeductionsDeletedRows.filter(data=>data.ptypeofoperation='DELETE')
        }
       this.DeductionExtratypesNamesArray=this.DeductionExtratypesNamesArray.filter(row=>row.extratypesid!=event.extratypesid);
   
  }
  onDeSelectAll_Deduction(event){
    debugger;
    //  let duplicateselect=this.selectedDeductions.find(({ extratypesid }) => extratypesid ==event.extratypesid);
    // if(duplicateselect){
     let deleterow:[]=this.selectedDeductions;
     this.DeductionsDeletedRows=[...this.DeductionsDeletedRows,...deleterow]
     this.DeductionsDeletedRows=this.DeductionsDeletedRows.filter(data=>data.ptypeofoperation='DELETE')
        //}
     this.DeductionExtratypesNamesArray= [];

  }
  resetChargeControls(){
    debugger;
     this.ChargesandFeesform['controls']['ChargesAndFeesControls'].patchValue({itemtypeid :'1',chargename:'',chargetypeid:'',ptypeofoperation :'CREATE'})
  }
  resetAdditionContrls(){
    debugger;
           this.ChargesandFeesform['controls']['AdditionFormControls'].patchValue({ extratypename: '',ptypeofoperation :'CREATE',priority:'PRIMARY',itemtypeid:'1' ,adddeductiontype:'',extratypesid:'',extraconfigid:'0'})

  }
   resetDeductionContrls(){
    debugger;
           this.ChargesandFeesform['controls']['DeductionFormControls'].patchValue({ extratypename: '',ptypeofoperation :'CREATE',priority:'PRIMARY',itemtypeid:'1' ,adddeductiontype:'',extratypesid:'',extraconfigid:'0'})

  }
      
  getlayoutplotsdetails(layoutid) {
    debugger;
        this.launchdate = true;
        $( "#permitnumber" ).prop( "disabled", true );
        $( "#launchdatepipe" ).prop( "disabled", true );
        $( "#projectname" ).prop( "disabled", true );
        $( "#secondaryuomid" ).prop( "disabled", true );
        $( "#raranumber" ).prop( "disabled", true );
        $( "#primaryarea" ).prop( "disabled", true );
        $( "#secondaryarea" ).prop( "disabled", true );
         $( "#standardratedis" ).prop( "disabled", true );     
        $( "#totalnoofplotscount" ).prop( "disabled", true );
        this.getLanddata('Edit');
    this._plotcreationservices.getplotslayoutdetailsbyid(layoutid).subscribe(data => {
      if (data != null) {
        debugger;
        this.pBranchId = data.pBranchId ? data.pBranchId : 0,
          console.log("get data:::", data)
        this.PlotsLayoutsform.patchValue({
          itemtypeID: data.itemtypeID ? data.itemtypeID : '',
          landbankid: data.landbankid ? data.landbankid : '',
          // layoutid: data.layoutid ? data.layoutid : 0,
          layoutname: data.layoutname ? data.layoutname : '',
          primaryprojectarea: data.primaryprojectarea ? data.primaryprojectarea : 0,
          primaryprojectareauomid: data.primaryprojectareauomid ? data.primaryprojectareauomid : '',
          primaryprojectareauomname: data.primaryprojectareauomname ? data.primaryprojectareauomname : '',
          secondaryprojectarea: data.secondaryprojectarea ? data.secondaryprojectarea : 0,
          secondaryprojectareauomid: data.secondaryprojectareauomid ? data.secondaryprojectareauomid : '',
          standardunitarea: data.standardunitarea ? data.standardunitarea : 0,
          standardunitareauomid: data.standardunitareauomid ? data.standardunitareauomid : 0,
          secondaryprojectareauomname: data.secondaryprojectareauomname ? data.secondaryprojectareauomname : '',
          standardrateuomid: data.standardrateuomid ? data.standardrateuomid : '5',
          totalnoofplotunits: data.totalnoofplotunits ? data.totalnoofplotunits : '',
          pBranchId: data.pBranchId ? data.pBranchId : 0,
          pbranchname: data.pbranchname ? data.pbranchname : '',
          layoutareainAcres: data.layoutareainAcres ? data.layoutareainAcres : '',
          layoutareainsquareYards: data.layoutareainsquareYards ? data.layoutareainsquareYards : '',
          launchdate: data.launchdate ? data.launchdate : '',
          permitno: data.permitno ? data.permitno : '',
          rerAno: data.rerAno ? data.rerAno : '',
          ptypeofoperation: 'UPDATE'
        })
        debugger
        let d = this._commonservice.formatDateFromDDMMYYYY(this.PlotsLayoutsform.controls.launchdate.value)
        this.getchargeNames(d.toISOString(),parseInt(this.PlotsLayoutsform.controls.layoutid.value),1);
        this.getitemtypewiseExtratypesNamesconfiguration(1,this.PlotsLayoutsform.controls.layoutid.value,d.toISOString())
      this.PlotsLayoutsform.controls.standardrate.setValue(this._commonservice.currencyformat(data.standardrate))
       this.PlotsLayoutsform.controls.minbookingamount.setValue(this._commonservice.currencyformat(data.minbookingamount))

       // this.standardrate = this._commonservice.currencyformat(data.standardrate);
        // if (data.extratypesdetailsDto.length > 0) {
        //   for (let i = 0; i < data.extratypesdetailsDto.length; i++) {
        //     if (data.extratypesdetailsDto[i].adddeductiontype == "Addition") {
        //       this.AdditionExtratypesNamesArray = [...this.AdditionExtratypesNamesArray, ...data.extratypesdetailsDto[i]]
        //     }
        //     else {
        //       this.DeductionExtratypesNamesArray = [...this.DeductionExtratypesNamesArray, ...data.extratypesdetailsDto[i]]
        //     }
        //   }
        // }
        // if (data.chargestypesdetailsDto.length > 0) {

        //   this.ChargesandFeesData = data.chargestypesdetailsDto;
        // }
        debugger;
        let transactionidedit = this.PlotsLayoutsform.controls.layoutid.value
        this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['transactionid'].setValue(transactionidedit);
        this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['transactionid'].setValue(transactionidedit);
        this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['transactionid'].setValue(transactionidedit);
        this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['projectid'].setValue(transactionidedit);
        // this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['pEffectfromdate'].setValue(this.PlotsLayoutsform.controls.launchdate.value);
        this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['projectid'].setValue(transactionidedit);
        this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['projectid'].setValue(transactionidedit);

        if (data.landbankid != null) {
          this.chklandbankid = data.landbankid;
          this.launchdate = true;
         $( "#launchdatepipe" ).prop( "disabled", true );
                 $( "#raranumber" ).prop( "disabled", true );
        $( "#permitnumber" ).prop( "disabled", true );
        $( "#projectname" ).prop( "disabled", true );
        $( "#secondaryuomid" ).prop( "disabled", true );
        $( "#primaryarea" ).prop( "disabled", true );
        $( "#secondaryarea" ).prop( "disabled", true );
         $( "#standardratedis" ).prop( "disabled", true );
         $( "#totalnoofplotscount" ).prop( "disabled", true );
          this.GetLandPurchaseddetailsDetailed(parseInt(data.landbankid));
        }
        debugger;
       
        let ProjectArea=parseFloat(data.layoutareainAcres).toFixed(3);
        this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['landbankid'].setValue(data.landbankid);
         if(this.Landdata.length>0){
          let selectedlanddata = this.Landdata.filter(item => item.landbankid == data.landbankid);
          let stringToSplit=selectedlanddata[0].availableareaINACRES;
          let stringaftersplit=(parseFloat(stringToSplit.split(" ")[0])).toFixed(3);
          this.availableareaINACRES =Number(stringaftersplit)+Number(ProjectArea);
         } 
         else{
          this.availableareaINACRES=0;
         }
        let launchdate = this._commonservice.formatDateFromDDMMYYYY(this.PlotsLayoutsform.controls.launchdate.value);
        this.PlotsLayoutsform.controls.launchdate.setValue(launchdate);
        this.savebutton = "Update";
        this.disableclearbutton = true;
        this.landradiodisabled = true;
        this.branchdisable = true;
        this.PlotsLayoutsValidationErrors = {};
        this.BlurEventAllControll(this.PlotsLayoutsform);
        console.log("Update related data", this.PlotsLayoutsform.value);
       
      }
    })
  }
  projectDetailsForm() {
    this.PlotsLayoutsform = this.fb.group({
      layoutid: [0],
      selectAdditions:[''],
      selectDeductions:[''],
      itemtypeID: [this.itemtypeID],
      landbankid: [''],
      pBranchId: ['', Validators.required],
      pbranchname: [''],
      launchdate: ['', Validators.required],
      layoutname: ['', [Validators.required]],
      permitno: ['', [Validators.required]],
      rerAno: [''],
      primaryprojectarea: [''],
      primaryprojectareauomid: ['1'],
      secondaryprojectarea: [''],
      secondaryprojectareauomid: [''],
      standardunitarea: [0],
      standardunitareauomid: [0],
      propertytype: ['PLOTS-LAYOUT'],
      standardrate: [0, [Validators.required]],
      standardrateuomid: [5, [Validators.required]],
      totalnoofplotunits: ['', [Validators.required]],
      minbookingamount: ['', Validators.required],
      status: [true],
      ptypeofoperation: ['CREATE']
    })
  }


  ChargesandFeesFormFn() {
    this.ChargesandFeesform = this.fb.group({
      chargetypeid: [''],
      ChargesAndFeesControls: this.ChargesAndFeesFormData(),
      ExtraAddition: [''],
      AdditionFormControls: this.AdditionFormData(),
      ExtraDeductions: [''],
      DeductionFormControls: this.DeductionFormData(),
    })
  }
  ChargesAndFeesFormData() {
    return this.fb.group({
      transactionid: [''],
      projectid:[''],
      landbankid: [''],
      chargetypeid: [''],
      propertytype: ['PLOTS-LAYOUT'],
      chargesconfigid: ['0'],
      chargename: [''],
       itemtypeid: ['1'],
       pStatusid:['1'],
       ischargeapplicableonuom: [false],
       unitofmeasureid: ['0'],
       primarylandareauom: ['0'],
            primarylandareauomname: [''],
            chargedependancetype: [''],
            chargevalue: ['0'],
            gstvalue: ['0'],
            gsttype: [''],
            chargevaluefixedpercentage: [''],
            pEffectfromdate: [''],
            pEffecttodate:[''],
            priority:['PRIMARY'],
            pStatusname: [this._commonservice.pStatusname],
            pCreatedby: [this._commonservice.pCreatedby],
            ptypeofoperation: ['CREATE'],
            status: ['TRUE'] 
    })
  }

  AdditionFormData() {
    return this.fb.group({
      extratypename: [''], 
      extratypesid: [''],
      itemtypeid: ['1'],
      transactionid:[''],
      extraconfigid:['0'],
      pStatusname: [this._commonservice.pStatusname],
      projectid:[''],
      pCreatedby: [this._commonservice.pCreatedby],
      pStatusid: ['1'],
      propertytype: ['PLOTS-LAYOUT'],
      adddeductiontype: [''],
      extracaltype: [''],
      extravalue: ['0'],
      status: ['TRUE'],
      priority:['PRIMARY'],
      ptypeofoperation: ['CREATE']

    })
  }

  DeductionFormData() {
    return this.fb.group({
      extratypename: [''], 
      extratypesid: [''],
      itemtypeid: ['1'],
      transactionid: [''],
       projectid:[''],
       extraconfigid:['0'],
       pStatusname: [this._commonservice.pStatusname],
      pCreatedby: [this._commonservice.pCreatedby],
      pStatusid: ['1'],
      adddeductiontype: [''],
      extracaltype: [''],
      extravalue: ['0'],
      status: ['TRUE'],
      propertytype: ['PLOTS-LAYOUT'],
      priority:['PRIMARY'],
      ptypeofoperation: ['CREATE']
    })
  }
  getUOMConversionData() {
    this._commonservice.getUOMConversionData().subscribe(data => {
      debugger
      this.ConvetData = data;

    })
  }
  GetExtraTypes(){
     this._plotcreationservices.GetExtraTypes().subscribe(data => {
      debugger
      if(data){
      this.AdditionExtratypesNames = data;
      this.DeductionExtratypesNames=data;
      this.DeductionData=this.DeductionExtratypesNames;
      this.AdditionData=this.AdditionExtratypesNames;
      }
    })
  }
  getLanddata(type) {
    debugger;
    console.log("landid after save", this.chklandbankid)
    this._plotcreationservices.getLanddata().subscribe(data => {
      debugger;
      this.templanddata = data;
      // landdataarray=data;
      if(type!='Edit'){
      this.Landdata = this.templanddata.filter(function (data) {
        return data.availableareaINACRESvalue > 0;
      });
    }
    else{
      this.Landdata=this.templanddata;
    }
    })
  }
  sqryrdsdata: any = [];
  getUOMdata() {
    this._commonservice.GetUomData('LAYOUT').subscribe(data => {
      this.sqryrdsdata = data;
    })

    this._commonservice.GetUomData(this.RequestUom).subscribe(data => {
      this.primaryUomdata = data;
      // this.secondaryUomdata = data;
      this.secondaryUomdata = this.primaryUomdata.filter(function (data) {
        return data.secondarylandareauomname != "Acre";
      });
      //;
    })
  }

  GetItemTypes() {
    this._plotcreationservices.GetItemTypes().subscribe(data => {
      this.ItemTypes = data;
      
    })
  }
  DateChange(event) {
    debugger
    //this.PlotsLayoutsform.controls.standardrate.setValue(0);
    let itemtypeid = parseInt(this.PlotsLayoutsform.controls.itemtypeID.value)
    // let d = this.PlotsLayoutsform.controls.launchdate.value;
    //     this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['pEffectfromdate'].setValue(d);
  
  //  this.getchargeNames(d.toISOString(), 1);
  }
 getDefaultCharges(){
    this._plotcreationservices.getChargeTypes().subscribe(data => {
      if(data){
      this.lstcharges = data;
      this.ChargeData=data;
      }
    })
 }
  getchargeNames(ProjectLaunchDate,projectid,id) {
    debugger
    this._plotcreationservices.getitemtypewisechargeNames(ProjectLaunchDate,projectid,id).subscribe(data => {
      debugger;
      if(data){
      this.selectedCharges = data;
      this.selectedChargeslist = data;
      this.ChargesandFeesData=data;
      }
    })
  }


  getitemtypewiseExtratypesNamesconfiguration(itemtypeid,projectid,ProjectLaunchDate) {
    this._plotcreationservices.getitemtypewiseExtratypesNamesconfiguration(parseInt(itemtypeid),parseInt(projectid),ProjectLaunchDate).subscribe(data => {
      debugger;
      if(data){
      this.selectedAdditions = data.filter(function (data) {
        return data.adddeductiontype == 'Addition';
      });
      this.selectedDeductions = data.filter(function (data) {
        return data.adddeductiontype == 'Deduction';
      });
      this.selectedAdditionslist=this.selectedAdditions;
      this.selectedDeductionslist=this.selectedDeductions;
      this.AdditionExtratypesNamesArray=this.selectedAdditions;
      this.DeductionExtratypesNamesArray=this.selectedDeductions;
      }
    })
  }


  ChargesandFees_Change(event) {
    debugger;
    this.selectedChargesandFees = [];
    if (event.target.value != '') {
      this.ChargesandFeesButton = true;
      let chargeId = event.target.value;
      this.selectedChargesandFees = this.lstcharges.filter(function (data) {
        return data.chargetypeid == chargeId;
      });
      let itemtypeid = this.itemtypeID;
      let chargesconfigid = this.selectedChargesandFees[0].chargesconfigid;
      let chargetypeid = this.selectedChargesandFees[0].chargetypeid;
      let chargename = this.selectedChargesandFees[0].chargename;
      let chargevalue = this.selectedChargesandFees[0].chargevalue;
      let chargevaluefixedpercentage = this.selectedChargesandFees[0].chargevaluefixedpercentage;
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['itemtypeid'].setValue(itemtypeid);
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargesconfigid'].setValue(chargesconfigid);
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargetypeid'].setValue(chargetypeid);
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargename'].setValue(chargename);
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargevalue'].setValue(chargevalue);
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargevaluefixedpercentage'].setValue(chargevaluefixedpercentage);
    } else {
      this.ChargesandFeesButton = false;
    }
  }
  addChargesAndFeesToGrid() {
    debugger
    let isvalid = true;
    const ChargesAndFeesControls = <FormGroup>this.ChargesandFeesform['controls']['ChargesAndFeesControls'];
    if (this.checkValidations(ChargesAndFeesControls, isvalid)) {
      let chargename = this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargename'].value;
      if (this.ChargesandFeesData.some((item) => item.chargename == chargename)) {
        this._commonservice.showWarningMessage('Charge Name Already Exists');
        return;
      }
      debugger
      this.ChargesandFeesData = [...this.ChargesandFeesData, ...this.ChargesandFeesform.value.ChargesAndFeesControls];
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['itemtypeid'].setValue('');
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargesconfigid'].setValue('0');
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargetypeid'].setValue('');
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargename'].setValue('');
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargevalue'].setValue('');
      this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['chargevaluefixedpercentage'].setValue('');
      this.ChargesandFeesform['controls']['chargetypeid'].setValue('');
      this.ChargesandFeesButton = false;
    }
  }

  removeHandler($event, row, rowIndex, group) {
    debugger;
    console.log(row);;
    //let rowdwtails=row;
            if(row.ptypeofoperation=='OLD'|| row.ptypeofoperation=='UPDATE'){
     let deleterow:[]=row;
     this.Chargesdeletedrows=[...this.Chargesdeletedrows,...deleterow]
     this.Chargesdeletedrows=this.Chargesdeletedrows.filter(data=>data.ptypeofoperation='DELETE')
    
    }

    //this.ChargesandFeesData.splice(rowIndex, 1);
    this.ChargesandFeesData=this.ChargesandFeesData.filter(data=>row.chargename!=data.chargename)
  }

  Addition_Change(event) {
    debugger;
    if (event.target.value != '') {
      this.AdditionButton = true;
      let extratypesid = event.target.value;
      let AdditionArray = this.AdditionExtratypesNames.filter(function (data) {
        return data.extratypesid == extratypesid;
      });
      let extratypesids = AdditionArray[0].extratypesid;
      let adddeductiontype = AdditionArray[0].adddeductiontype;
      let extratypename = AdditionArray[0].extratypename;
      let extracaltype = AdditionArray[0].extracaltype;
      let extravalue = AdditionArray[0].extravalue;
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extratypesid'].setValue(extratypesids);
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['adddeductiontype'].setValue(adddeductiontype);
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['itemtypeid'].setValue(this.itemtypeID);
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extratypename'].setValue(extratypename);
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extracaltype'].setValue(extracaltype);
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extravalue'].setValue(extravalue);
    } else {
      this.AdditionButton = false;
    }
  }
  clickToAddAddition() {
    debugger
    let isvalid = true;
    const AdditionFormControls = <FormGroup>this.ChargesandFeesform['controls']['AdditionFormControls'];
    if (this.checkValidations(AdditionFormControls, isvalid)) {
      let extratypename = this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extratypename'].value;
      if (this.AdditionExtratypesNamesArray.some((item) => item.extratypename == extratypename)) {
        this._commonservice.showWarningMessage('Extratype Already Exists');
        return;
      }
      this.AdditionExtratypesNamesArray = [...this.AdditionExtratypesNamesArray, ...this.ChargesandFeesform.value.AdditionFormControls];
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extratypesid'].setValue('');
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['adddeductiontype'].setValue('');
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['itemtypeid'].setValue('');
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extratypename'].setValue('');
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extracaltype'].setValue('');
      this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['extravalue'].setValue('');
      this.ChargesandFeesform['controls']['ExtraAddition'].setValue('');
      this.AdditionButton = false;
    }
  }
  removeAddition($event, row, rowIndex, group) {
       if(row.ptypeofoperation=='OLD'|| row.ptypeofoperation=='UPDATE'){
     let deleterow:[]=row;
     this.AdditionsDeletedRows=[...this.AdditionsDeletedRows,...deleterow]
     this.AdditionsDeletedRows=this.AdditionsDeletedRows.filter(data=>data.ptypeofoperation='DELETE')
    
    }
   // this.AdditionExtratypesNamesArray.splice(rowIndex, 1);
    this.AdditionExtratypesNamesArray=this.AdditionExtratypesNamesArray.filter(data=>data.extratypename!=row.extratypename)
  }


  Deduction_Change(event) {
    debugger;
    if (event.target.value != '') {
      this.DeductionButton = true;
      let extratypesid = event.target.value;
      let DeductionArray = this.DeductionExtratypesNames.filter(function (data) {
        return data.extratypesid == extratypesid;
      });
      let extratypesids = DeductionArray[0].extratypesid;
      let adddeductiontype = DeductionArray[0].adddeductiontype;
      let extratypename = DeductionArray[0].extratypename;
      let extracaltype = DeductionArray[0].extracaltype;
      let extravalue = DeductionArray[0].extravalue;

      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extratypesid'].setValue(extratypesids);
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['adddeductiontype'].setValue(adddeductiontype);
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['itemtypeid'].setValue(this.itemtypeID);
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extratypename'].setValue(extratypename);
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extracaltype'].setValue(extracaltype);
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extravalue'].setValue(extravalue);

    } else {
      this.DeductionButton = false;
    }
  }
  addDeductionsToGrid() {
    debugger
    let isvalid = true;
    const DeductionFormControls = <FormGroup>this.ChargesandFeesform['controls']['DeductionFormControls'];
    if (this.checkValidations(DeductionFormControls, isvalid)) {
      let extratypename = this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extratypename'].value;
      if (this.DeductionExtratypesNamesArray.some((item) => item.extratypename == extratypename)) {
        this._commonservice.showWarningMessage('Extratype Already Exists');
        return;
      }
      this.DeductionExtratypesNamesArray = [...this.DeductionExtratypesNamesArray, ...this.ChargesandFeesform.value.DeductionFormControls];
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extratypename'].setValue('');
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extracaltype'].setValue('');
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extravalue'].setValue('');
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['extratypesid'].setValue('');
      this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['adddeductiontype'].setValue('');
      this.ChargesandFeesform['controls']['ExtraDeductions'].setValue('');
      this.DeductionButton = false;
    }
  }
  removeDeducion($event, row, rowIndex, group) {

           if(row.ptypeofoperation=='OLD'|| row.ptypeofoperation=='UPDATE'){
     let deleterow:[]=row;
     this.DeductionsDeletedRows=[...this.DeductionsDeletedRows,...deleterow]
     this.DeductionsDeletedRows=this.DeductionsDeletedRows.filter(data=>data.ptypeofoperation='DELETE')
    
    }
    //this.DeductionExtratypesNamesArray.splice(rowIndex, 1);
    this.DeductionExtratypesNamesArray=this.DeductionExtratypesNamesArray.filter(data=>data.extratypename!=row.extratypename)
  }


  saveChargesAndFeesData() {
    debugger
    if (this.AdditionExtratypesNamesArray.length == 0 && this.DeductionExtratypesNamesArray.length == 0 &&
      this.ChargesandFeesData.length == 0) {
      this._commonservice.showWarningMessage('Add Charges and Fees or Additions and Deductions Data... ');
      return
    }
    let isvalid = true;
    try {
      if(this.Chargesdeletedrows.length>0){
        if(this.ChargesandFeesData.length>0){
          this.ChargesandFeesData=[...this.ChargesandFeesData,...this.Chargesdeletedrows];
        }
        else{
           this.ChargesandFeesData=[...this.Chargesdeletedrows];
        }
      }
      if(this.AdditionsDeletedRows.length>0){
         if(this.AdditionExtratypesNamesArray.length>0){
          this.AdditionExtratypesNamesArray=[...this.AdditionExtratypesNamesArray,...this.AdditionsDeletedRows];
        }
        else{
           this.AdditionExtratypesNamesArray=[...this.AdditionsDeletedRows];
        }
      }
        if(this.DeductionsDeletedRows.length>0){
         if(this.DeductionExtratypesNamesArray.length>0){
          this.DeductionExtratypesNamesArray=[...this.DeductionExtratypesNamesArray,...this.DeductionsDeletedRows];
        }
        else{
           this.DeductionExtratypesNamesArray=[...this.DeductionsDeletedRows];
        }
      }
      this.disablesavebutton = true;
      this.savebutton = "Processing";
      this.DeductionsDeletedRows=[];
      this.AdditionsDeletedRows=[];
      this.Chargesdeletedrows=[];
      let transactionid = this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['transactionid'].value;
      let projectlaunchdate =(this._commonservice.formatDateFromDDMMYYYY( this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['pEffectfromdate'].value)).toISOString();
      let itemtypeid = this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['itemtypeid'].value;
      let extratesArray = [...this.AdditionExtratypesNamesArray, ...this.DeductionExtratypesNamesArray];
      let chargestypesdetailsDto = {itemtypeid:parseInt(itemtypeid),projectlaunchdate:projectlaunchdate, transactionid: transactionid, propertytype: this.PlotsLayoutsform.controls.propertytype.value, chargestypesdetailsDto: this.ChargesandFeesData, extratypesdetailsDto: extratesArray }
      // let AddressDetailsStoreDTO = { AddressDetailsStoreDTO: this.Addressdetails }
      let formdata = Object.assign(chargestypesdetailsDto)
      let data = JSON.stringify(formdata);
      this._plotcreationservices.SaveTransactiontypechargesDetails(data).subscribe(Response => {

        if (this.PlotsLayoutsform.controls.ptypeofoperation.value == "UPDATE") {
          this._commonservice.showInfoMessage('Charges and fees Updated');
        }
        else {
          this._commonservice.showInfoMessage('Charges and fees Created');
        }
        debugger;
        this._routes.navigate(['/AreaStatement']);
        this._branchconfigService.SetButtonType("New");
        this.AdditionExtratypesNamesArray = [];
        this.DeductionExtratypesNamesArray = [];
        this.DeductionsDeletedRows=[];
        this.AdditionsDeletedRows=[];
        this.LandPurchaseDetailsData = [];
        this.LandDetailsData = [];
        this.chklandbankid = ""
        this.ChargesandFeesData = [];
        this.Chargesdeletedrows=[];
        this.disablesavebutton = false;
        this.disableclearbutton = false;
        this.savebutton = "Save & Continue";
        this.ngOnInit();
        this.PlotsLayoutsValidationErrors = {};
        this.PlotsLayoutsform['controls']['landbankid'].setValue('');
        $('.nav-item a[href="#Project-Details"]').tab('show');

      }, error => {
        this.disablesavebutton = false;
        if (this.PlotsLayoutsform.controls.ptypeofoperation.value == "UPDATE") {
          this.savebutton = "Update";
        }
        else {
          this.savebutton = "Save & Continue";
        }
        this._commonservice.showErrorMessage(error);
      })
    }
    catch (error) {
      this.disablesavebutton = false;
      if (this.PlotsLayoutsform.controls.ptypeofoperation.value == "UPDATE") {
        this.savebutton = "Update";
      }
      else {
        this.savebutton = "Save & Continue";
      }
      this._commonservice.showErrorMessage('Plots/Layout');
    }
  }





  checkFixedDepositGridRow(rowIndex, row, event) {
    debugger
    this.launchdate = true;
    this.LandDetailsData = [];
    this.LandPurchaseDetailsData = [];
    let landbankids = row.landbankid;
    this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['landbankid'].setValue(row.landbankid);
    let stringToSplit = row.availableareaINACRES;
    let x = stringToSplit.split(" ");
    this.availableareaINACRES = Number(x[0]) ? Number(x[0]):0;
    // this.PlotsLayoutsform.controls.primaryprojectarea.setValidators([Validators.required, Validators.max(row.primaryavailablearea)]);
    // this.PlotsLayoutsform.controls.secondaryprojectarea.setValidators([Validators.required, Validators.max(row.secondaryavailablearea)]);
    this.primarylandareauom = row.primarylandareauom;
    this.primarylandareaname = row.primarylandareauomname;
    this.secondarylandareauom = row.secondarylandareauom;
    this.secondarylandareaname = row.secondarylandareauomname;
    this.PlotsLayoutsform['controls']['landbankid'].setValue(landbankids);
    this.GetLandPurchaseddetailsDetailed(landbankids);

  }
  GetLandPurchaseddetailsDetailed(landbankids) {
    this._LandBankservice.GetLandPurchaseddetailsDetailed(landbankids).subscribe(json => {
      debugger;
      if (this.PlotsLayoutsform.controls.ptypeofoperation.value != 'UPDATE') {
        this.lstbranchnames = [];
        this.pBranchId = "";
        this.PlotsLayoutsform.controls.pbranchname.setValue('');
        this.PlotsLayoutsform.controls.pBranchId.setValue('');
        this.PlotsLayoutsValidationErrors.pBranchId = null;
      }
      debugger;
      this.LandDetailsData.push(json);
      this.lstbranchnames = json.lstBranchViewDTO;
      let LandCreateDate = this._commonservice.formatDateFromDDMMYYYY(this.LandDetailsData[0].purchasedate);
      this.ProjectLaunchdateConfig.minDate = LandCreateDate;
      this.LandPurchaseDetailsData = json.purchasedetailsDTO;
      if(json.addressDetailsStoreDTO.length!=0){
        // this.Address=json.addressDetailsStoreDTO[0].paddress1+' , '+json.addressDetailsStoreDTO[0].paddress2+' , '+json.addressDetailsStoreDTO[0].pcity+' , '+ json.addressDetailsStoreDTO[0].pDistrict+' , '+json.addressDetailsStoreDTO[0].pState+' , '+json.addressDetailsStoreDTO[0].pCountry+'-'+json.addressDetailsStoreDTO[0].pincode+'.';
        this.Address=json.addressDetailsStoreDTO[0];
        }
      else{
        this.Address=[];
      }
      
    })
  }
  plotslayoutduplicatecheck() {
    let layoutid = parseInt(this.PlotsLayoutsform.controls.layoutid.value);
    let newplotlayoutname = this.PlotsLayoutsform.controls.layoutname.value;
    this._plotcreationservices.checkplotslayoutsduplicates(layoutid, newplotlayoutname).subscribe(Details => {
      debugger;
      if (Details != 0) {
        this._commonservice.showWarningMessage('Plots/Layout Name Already Exists...');
        return
      }
      else {
        this.checkpermitnumber();
      }
    })
  }
  checkpermitnumber() {
    let layoutid = parseInt(this.PlotsLayoutsform.controls.layoutid.value);
    let permitnumber = this.PlotsLayoutsform.controls.permitno.value;
    if (permitnumber != "") {
      this._plotcreationservices.checklayoutspermitnoduplicates(layoutid, permitnumber).subscribe(Details => {
        debugger;
        if (Details != 0) {
          this._commonservice.showWarningMessage('Permit Number Already Exists...');
          return
        }
        else {
          this.checklayoutsreranoduplicates()
        }
      });
    }
  }
  checklayoutsreranoduplicates() {
    let layoutid = parseInt(this.PlotsLayoutsform.controls.layoutid.value);
    let rerano = this.PlotsLayoutsform.controls.rerAno.value;
    if (rerano != "") {
      this._plotcreationservices.checklayoutsreranoduplicates(layoutid, rerano).subscribe(Details => {
        debugger;
        if (Details != 0) {
          this._commonservice.showWarningMessage('RERA Number Already Exists...');
          return
        }
        else {
          this.savecodeafterduplicatecheck();
        }
      });
    }
    else{
        this.savecodeafterduplicatecheck();
    }
  }
  savecodeafterduplicatecheck() {

    this.disablesavebutton = true;
    this.savebutton = "Processing";
    let saveData = this.PlotsLayoutsform.value;
    let data = JSON.stringify(saveData);
    console.log("save data", data)
    this._plotcreationservices.SavePurchasedland_plot_layout(data).subscribe(res => {
      debugger
      this.transactionid = res[0];
      if (this.PlotsLayoutsform.controls.ptypeofoperation.value != "UPDATE") {
        this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['projectid'].setValue(this.transactionid);
        this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['projectid'].setValue(this.transactionid);
        this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['projectid'].setValue(this.transactionid);
        this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['transactionid'].setValue(this.transactionid);
        this.ChargesandFeesform['controls']['AdditionFormControls']['controls']['transactionid'].setValue(this.transactionid);
        this.ChargesandFeesform['controls']['DeductionFormControls']['controls']['transactionid'].setValue(this.transactionid);

      }
      let datel=this.Datepipe.transform(this.PlotsLayoutsform.controls.launchdate.value,'dd/MM/yyyy')
        this.ChargesandFeesform['controls']['ChargesAndFeesControls']['controls']['pEffectfromdate'].setValue(datel);
      this.disablesavebutton = false;

      this.availableareaINACRES = 0;
      //this.pBranchId="";
      this._plotcreationservices.SetButtonType("New");
      if (this.PlotsLayoutsform.controls.ptypeofoperation.value == "UPDATE") {
        this._commonservice.showInfoMessage('Project Area Updated');
        this.savebutton = "Update";
        this.disableclearbutton = true;
      }
      else {
        this._commonservice.showInfoMessage('Project Area Created');
        this.savebutton = "Save & Continue";
        this.disableclearbutton = false;
      }
      this.getLanddata('Create');
      $( "#permitnumber" ).prop( "disabled", false );
      $( "#launchdatepipe" ).prop( "disabled", false );
              $( "#raranumber" ).prop( "disabled", false );
      $( "#projectname" ).prop( "disabled", false );
        $( "#secondaryuomid" ).prop( "disabled", false );
        $( "#primaryarea" ).prop( "disabled", false );
        $( "#secondaryarea" ).prop( "disabled", false );
         $( "#standardratedis" ).prop( "disabled", false );
      $( "#totalnoofplotscount" ).prop( "disabled", false );
      $('.nav-item a[href="#Charges-and-Fees"]').tab('show');
      this.landradiodisabled=true;
      this.branchdisable = true;
      this.ChargesandFees = true;
      this.PlotsLayoutsValidationErrors = {};
    }, error => {
      this._commonservice.showErrorMessage(error)
      this.disablesavebutton = false;
       this.landradiodisabled=false;
      if (this.PlotsLayoutsform.controls.ptypeofoperation.value == "UPDATE") {
        this.savebutton = "Update";
      } else {
        this.savebutton = "Save & Continue";
      }
    })
  }

  SaveLandDetails() {
    debugger
    if (this.PlotsLayoutsform['controls']['landbankid'].value == '') {
      this._commonservice.showWarningMessage('Please Select Land');
      return;
    }

    let primaryprojectarea = this.PlotsLayoutsform.controls.primaryprojectarea.value;
    let primaryprojectareauomid = this.PlotsLayoutsform.controls.primaryprojectareauomid.value;
    let secondaryprojectarea = this.PlotsLayoutsform.controls.secondaryprojectarea.value;
    let secondaryprojectareauomid = this.PlotsLayoutsform.controls.secondaryprojectareauomid.value;
        if (((primaryprojectarea != '' && primaryprojectareauomid != '') || (secondaryprojectarea != '' && secondaryprojectareauomid != '')||(primaryprojectarea != '' && primaryprojectareauomid != ' ' && secondaryprojectarea != '' && secondaryprojectareauomid != '')) &&(primaryprojectarea!=0 || secondaryprojectarea!=0) )  {

      if (primaryprojectarea == "") {
        this.PlotsLayoutsform.controls.primaryprojectarea.setValue(0);
      }
      if (secondaryprojectarea == "") {
        this.PlotsLayoutsform.controls.secondaryprojectarea.setValue(0);
        this.PlotsLayoutsform.controls.secondaryprojectareauomid.setValue('');
        this.PlotsLayoutsValidationErrors.secondaryprojectareauomid = null
      }
      // if (secondaryprojectareauomid == 2) {
      //   if(secondaryprojectarea>100){
      //     secondaryprojectarea.setValidators([Validators.required, Validators.max(100)]);
      //     this.PlotsLayoutsValidationErrors.secondarylandareavalue = "Secondary Land Area value In corcet";
      //     return
      //   }
      // }

      // if (secondaryprojectareauomid == 5) {
      //   if(secondaryprojectarea>4840){
      //     secondaryprojectarea.setValidators([Validators.required, Validators.max(4840)]);
      //     this.PlotsLayoutsValidationErrors.secondarylandareavalue = "Secondary Land Area value In corcet";
      //     return
      //   }
      // }

      // if (secondaryprojectareauomid == 7) {
      //   if(secondaryprojectarea>40){
      //     secondaryprojectarea.setValidators([Validators.required, Validators.max(40)]);
      //     this.PlotsLayoutsValidationErrors.secondarylandareavalue = "Secondary Land Area Value In corcet";
      //     return
      //   }
      // }

      let totAcer = 0;
      let convertionValue = 0;
      if (secondaryprojectarea != '' && secondaryprojectareauomid != '') {
        let secondaryInAcres = this.ConvetData.filter(item => item.fromunitofmeasureid == secondaryprojectareauomid && item.tounitname == 'Acre');
        let secondaryInAcresValue = secondaryInAcres[0]['unitofmeasureconversionvalue'];
        convertionValue = secondaryInAcresValue * secondaryprojectarea;
      }
      totAcer = convertionValue + Number(primaryprojectarea);

      // if (totAcer > this.availableareaINACRES) {
      //   this._commonservice.showWarningMessage('Entered Land Area (' + totAcer + ' )must be Less Than or Equal to Available Area (' + this.availableareaINACRES + ') ...');
      //   return
      // }
      debugger;
      let psecondaryuomid = this.PlotsLayoutsform.controls.secondaryprojectareauomid.value;
      let secondarylandareavalue = this.PlotsLayoutsform.controls.secondaryprojectarea.value;

      if (secondarylandareavalue != "") {
        this.PlotsLayoutsform.controls.secondaryprojectarea.setValidators([Validators.required])
        this.PlotsLayoutsform.controls.secondaryprojectareauomid.setValidators([Validators.required])
        this.PlotsLayoutsform.controls.secondaryprojectareauomid.updateValueAndValidity();
        this.PlotsLayoutsform.controls.secondaryprojectarea.updateValueAndValidity();
        this.GetValidationByControl(this.PlotsLayoutsform, 'secondaryprojectareauomid', true)
        this.setBlurEvent(this.PlotsLayoutsform, 'secondaryprojectarea');
        this.setBlurEvent(this.PlotsLayoutsform, 'secondaryprojectareauomid');
      } else {
        this.PlotsLayoutsform.controls.secondaryprojectarea.setValidators(null)
        this.PlotsLayoutsform.controls.secondaryprojectareauomid.setValidators(null)
        this.PlotsLayoutsform.controls.secondaryprojectarea.updateValueAndValidity();
        this.PlotsLayoutsform.controls.secondaryprojectareauomid.updateValueAndValidity();
      }
      let isvalid = true;
      if (this.checkValidations(this.PlotsLayoutsform, isvalid)) {
        try {
          debugger;
          if (parseInt(this.PlotsLayoutsform.controls.standardrate.value) <= 0) {
            this._commonservice.showWarningMessage('Standard Rate must be greater than Zero');
            return
          }
           let minbookingamount=this._commonservice.removeCommasForEntredNumber(this.PlotsLayoutsform.controls.minbookingamount.value);
           if(minbookingamount<=0){
           this._commonservice.showWarningMessage('Minimum Booking Amount must be greater than Zero ');
            return;
           }
          let standardrate = this._commonservice.removeCommasForEntredNumber(this.PlotsLayoutsform.controls.standardrate.value);
          this.PlotsLayoutsform.controls.standardrate.setValue(standardrate);
          this.plotslayoutduplicatecheck()///saveing           
        }
        catch (error) {
          debugger;
          this.disablesavebutton = false;
          if (this.PlotsLayoutsform.controls.ptypeofoperation.value == "UPDATE") {
            this.savebutton = "Update";
          } else {
            this.savebutton = "Save & Continue";
          }
          this._commonservice.showErrorMessage(error);
        }
      }
    } else {
           if((primaryprojectarea == '' && secondaryprojectarea == '')||(primaryprojectarea == '0' && secondaryprojectarea == '0') ||(primaryprojectarea == '' && secondaryprojectarea == '0')||(primaryprojectarea == '0' && secondaryprojectarea == '')){
         this._commonservice.showWarningMessage('Enter Land Area');
      return;
      }
      else{
      this._commonservice.showWarningMessage('Select Any of Land UOM');
      return;
      }
     
    }
  }
  SaveOnlyLandDetails() {

  }
 clickToAddCharges() {
        this.chargeentrygroup.controls.chargenames.setValue('');
        this.PlotsLayoutsValidationErrors.chargenames = null;
        this.chargeentrygroup.controls.pAccounttype.setValue('');
        this.PlotsLayoutsValidationErrors.pAccounttype=null;
        this.chargeentrygroup.controls.chargenames.clearValidators();
        this.chargeentrygroup.controls.chargenames.setValidators([Validators.required]);
       // this.BlurEventAllControll(this.chargesTypesForm);
    }
    ClearChargeName() {

        this.chargeentrygroup.controls.chargenames.setValue('');
        this.PlotsLayoutsValidationErrors.chargenames = null;
        this.chargeentrygroup.controls.chargenames.setValidators([Validators.required]);
        this.chargeentrygroup.controls.pAccounttype.setValue('');
        this.PlotsLayoutsValidationErrors.pAccounttype=null;
    }
    SaveChargesName() {
        let isValid: boolean = true;
        debugger;
        if (this.checkValidations(this.chargeentrygroup, isValid)) {
            this.chargeentrygroup.controls.chargename.setValue(this.chargeentrygroup.controls.chargenames.value);
            this._ChargemasterService.CheckDuplicateChargeName( this.chargeentrygroup.controls.chargename.value).subscribe(result=>{
                debugger;
                if(result!=0){
                    this._commonservice.showWarningMessage('Already Exists.')
                    return;
                }
                this.disablesavebuttonnew=true;
                this.addchargesbutton = "Processing";
            this._ChargemasterService.SaveNewChargeName(JSON.stringify(this.chargeentrygroup.value)).subscribe(data => {
                if (data) {
                    this._commonservice.showInfoMessage('Saved Successfully');
                    this.addchargesbutton = "Save";
                    this.disablesavebuttonnew=false;
                    this.chargeentrygroup.controls.chargenames.setValue('');
                    this.chargeentrygroup.controls.pAccounttype.setValue('');
                    this.PlotsLayoutsValidationErrors = {};
                    this.getDefaultCharges();
                }
            }, error => {
                this._commonservice.showErrorMessage(error);
                this.addchargesbutton = "Save";
                this.disablesavebuttonnew=false;
            })
            })

        }

    }
    clickToAddExtratype() {
    this.extratypeentrygroup.patchValue({ extratypename: '', adddeductiontypes: '', extratype: '', adddeductiontype: '' })
    this.PlotsLayoutsValidationErrors.adddeductiontypes = null;
    this.PlotsLayoutsValidationErrors.extratypename = null;
  }
  Clearextratypename() {
    this.extratypeentrygroup.patchValue({ extratypename: '', adddeductiontypes: '', extratype: '', adddeductiontype: '' })
    this.PlotsLayoutsValidationErrors.adddeductiontypes = null;
    this.PlotsLayoutsValidationErrors.extratypename = null;
  }
    SaveNewExtraTypes() {
    debugger;
    let isValid: boolean = true;
    if (this.checkValidations(this.extratypeentrygroup, isValid)) {
     
      
      let extratype = this.extratypeentrygroup.controls.extratypename.value;
      // let adddeduction = this.extratypeentrygroup.controls.adddeductiontypes.value
      // this.extratypeentrygroup.controls.adddeductiontype.setValue(this.extratypeentrygroup.controls.adddeductiontypes.value);
      this._ChargemasterService.CheckDuplicateExtraTypes(extratype).subscribe(data => {
        if (data != 0) {
          this._commonservice.showWarningMessage('Already Exists.')
          this.saveextratypebutton = "Save";
          return;
        }
          debugger;
          this.disablesavebuttonnew=true;
           this.saveextratypebutton = "Processing"
          let newdetails = JSON.stringify(this.extratypeentrygroup.value);
          this._ChargemasterService.SaveNewExtraTypes(newdetails).subscribe(data => {
            if (data) {
              this._commonservice.showInfoMessage('Saved Successfully.');
              this.saveextratypebutton = "Save";
              this.disablesavebuttonnew=false;
             this.Clearextratypename();
             this.PlotsLayoutsValidationErrors={};           
                this.GetExtraTypes();
            }
          }, error => {
        this._commonservice.showErrorMessage(error);
        this.saveextratypebutton = "Save";
         this.disablesavebuttonnew=false;
      })
      }, error => {
       this._commonservice.showErrorMessage(error);
        this.saveextratypebutton = "Save";
         this.disablesavebuttonnew=false;

      })
    }
  }
  OnEnter(row,event){
    debugger;
let noofplots=parseInt(event.target.value);
if(noofplots<=0){
  this._commonservice.showWarningMessage('Total Number of Plots must be greater than Zero');
  this.PlotsLayoutsform.controls.totalnoofplotunits.setValue('');
}

  }
  ClearLandDetails() {
    this.AdditionExtratypesNamesArray = [];
    this.DeductionExtratypesNamesArray = [];
    this.DeductionsDeletedRows=[];
    this.AdditionsDeletedRows=[];
    this.ChargesandFeesData = [];
    this.Chargesdeletedrows=[];
    this.disablesavebutton = false;
    this.disableclearbutton = false;
    this.savebutton = "Save & Continue";
    this.ngOnInit();
    this.PlotsLayoutsValidationErrors = {};
    this.PlotsLayoutsform['controls']['landbankid'].setValue('');
    $('.nav-item a[href="#Project-Details"]').tab('show');
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
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
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
  //#endregion
  branchid_Change(event) {
    debugger;
    this.PlotsLayoutsform.controls.pbranchname.setValue(event.target.options[event.target.selectedIndex].text)
    let branchid = parseInt(event.target.options[event.target.selectedIndex].value);
    this.PlotsLayoutsform.controls.pBranchId.setValue(branchid);

  }
  getbranchnames() {
    debugger
    this._branchconfigService.getBranchCreationView().subscribe(data => {
      debugger;
      if (data != null) {
        this.lstbranchnames = data;
      }
    })
  }



}

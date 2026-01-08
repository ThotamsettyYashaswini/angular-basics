import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { CommercialBuildingService } from 'src/app/Services/commercial-building.service';
// import { DatatableComponent } from '@swimlane/ngx-datatable/release/components/datatable.component';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { dateFieldName } from '@progress/kendo-angular-intl';
import { CompanyconfigDocumentsComponent } from '../Settings/company-config/companyconfig-documents/companyconfig-documents.component';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { Router,ActivatedRoute } from '@angular/router';
import { BranchconfigService } from 'src/app/Services/Settings/branchconfig.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ALPN_ENABLED } from 'constants';
declare let $: any

@Component({
  selector: 'app-commercial-building',
  templateUrl: './commercial-building.component.html',
  styles: []
})
export class CommercialBuildingComponent implements OnInit {
  commercialbuildingform: any;
  addtowersForm: any;
  ItemTypes: any;
  hidebranch:boolean=false;
  LandpurchaseValidationErrors: any;
  primaryUomdata: any;
  secondaryUomdata: any;
  towerdata: any[];
  savebutton = "Save & Continue";
  RequestUom="BUILDING";
  public disablesavebutton = false;
  buttonname = 'Save';

  CompanyData = [
    { blockname: 'My Test', nooflevelssuperstructure: '25', nooflevelssubstructure: '2' },
    { blockname: 'Best test', nooflevelssuperstructure: '2', nooflevelssubstructure: '5' },
    { blockname: 'LTest', nooflevelssuperstructure: '9', nooflevelssubstructure: '28' }
  ];
  isEditable = {};
  @ViewChild('table', { static: false }) table: DatatableComponent;
  @ViewChild(CompanyconfigDocumentsComponent, { static: false }) documentformdetails: CompanyconfigDocumentsComponent;
  temparray: any[];
  Temptowerdata: any[];
  getstandardrate:any;
  disableclearbutton:boolean=false;
  ShowEditdata: boolean = false;
  ShowGeneratedata: boolean = true;
  today = new Date();
  ProjectName:any;
  TowersListdetails:any=[];
  TowersFloorsListdetails:any=[];
  areastatementform: any;
  updatebutton:boolean=false;
  lstbranchnames: any;
  ConvetData:any;
  availableareaINACRES:any;
  checkprojectnameduplicates:boolean =false;
  purchasedate:any;
  shareapplicableforallfloors:any;
  LandDetailsData: any = [];
  LandPurchaseDetailsData:any;
  Address:any;
  title:any;
  SaveTowersFloorsListc:boolean=false;
  View:any;
  updatbutton:any;
  Continuebutton:any;
  Generatebutton:any;
  EditDataa:any;
  branchdisable:boolean=false;
  updateformdata:boolean=false;
  landpurchasetype:any;
  //@ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  public LaunchdateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private _LandBankservice: LandBankService, private _routes: Router, private formbuilder: FormBuilder, private _commonService: CommonService, private _plotcreationservices: PlotcreationService, private _commercialbuildingService: CommercialBuildingService, private _branchconfigService: BranchconfigService,private router: Router, private ActRoute:ActivatedRoute) {
  //this.LaunchdateConfig.containerClass = this._commonService.DatePickerDateFormat('containerClass');
 // this.LaunchdateConfig.showWeekNumbers = this._commonService.DatePickerDateFormat('showWeekNumbers');
  //this.LaunchdateConfig.dateInputFormat = this._commonService.DatePickerDateFormat('dateInputFormat');
  this.LaunchdateConfig.containerClass = 'theme-dark-blue';
  this.LaunchdateConfig.showWeekNumbers = false;
  this.LaunchdateConfig.dateInputFormat = 'DD/MM/YYYY';
  }



  getformdata() {
    this.commercialbuildingform = this.formbuilder.group({
      buildingid: [0],
      itemtypeid: [0],
      landbankid: [0],
      launchdate: [new Date()],
      projectname: ['', Validators.required],
      pBranchId:['',Validators.required],
      pbranchname: [''],
      //projectarea: [0],
      //projectareauomid: [0],
      noofblocks: [0],
      lstCBblocksstructures: [''],
      lsttempdata: this.gettower(),
      createdby: [this._commonService.pCreatedby],
      modifiedby: [0],
      pCreatedby: [0],
      pModifiedby: [0],
      pStatusid: [0],
      pStatusname: [''],
      pEffectfromdate: [''],
      pEffecttodate: [''],
      ptypeofoperation: [this._commonService.ptypeofoperation],
      status: [true],
      primaryprojectarea: [''],
      primaryprojectareauomid: ['1'],
      primarylandareauomname: [''],
      secondaryprojectarea: [''],
      secondaryprojectareauomid: [''],
      secondarylandareauomname: [''],
      standardrate:[0,Validators.required],
      standardrateuomid:['4'],
      minbookingamount:['',Validators.required]
    })


    this.addtowersForm = this.formbuilder.group({
      buildingblocksstructureid: [0],
      buildingid: [0],
      blocknumber: [0],
      blockname: [''],
      nooflevelssuperstructure: [''],
      nooflevelssubstructure: [''],
      createdby: [0],
      modifiedby: [0],
      pCreatedby: [this._commonService.pCreatedby],
      pModifiedby: [0],
      pStatusid: [''],
      pStatusname: [''],
      pEffectfromdate: [''],
      pEffecttodate: [''],
      ptypeofoperation: ['CREATE'],
      status: ['']
    });
  }

  gettower(): FormGroup {
    return this.formbuilder.group({
      buildingblocksstructureid: [0],
      buildingid: [0],
      blocknumber: [0],
      blockname: [''],
      nooflevelssuperstructure: [''],
      nooflevelssubstructure: [''],
      substructureall:[''],
      createdby: [0],
      modifiedby: [0],
      pCreatedby: [this._commonService.pCreatedby],
      pModifiedby: [0],
      pStatusid: [''],
      pStatusname: [''],
      pEffectfromdate: [''],
      pEffecttodate: [''],
      ptypeofoperation: [this._commonService.ptypeofoperation],
      status: ['']
    });
    
  }
  getstatement(){
    this.areastatementform =this.formbuilder.group({
      areauomid: ['', Validators.required],
      slabarea: ['', Validators.required],
      landownerarea: ['', Validators.required],
      developerarea: [''],
      remarks: [''],
      all: [''],
      buildingblocksstructureid: [''],
      floornumber: ['', Validators.required],
      floorname: [''],
    });
  }




  ngOnInit() {
    debugger
    //alert(this.router.url);
    this.landpurchasetype='';
    this.updateformdata=false;
    this.branchdisable=false;
    this.EditDataa='';
    this.getstandardrate='';
    this.shareapplicableforallfloors='';
    this.purchasedate='';
    this.LandpurchaseValidationErrors = {};
    this.getformdata();
    this.GetItemTypes();
    this.BlurEventAllControll(this.commercialbuildingform);
    this.getUOMdata();
    this.gettower();
    this.getstatement();
    //this.getbranchnames();
    this.getUOMConversionData();
    //this.ProjectName='bss';
    //this.Tower(1);
    this.availableareaINACRES='';
    this.hidebranch=false;
    this.disableclearbutton=false;
    this.checkprojectnameduplicates=false;
    let routerurl=this.router.url.split(';')[0];
    if(routerurl=='/ResidentialApartments'){
      this.commercialbuildingform['controls']['itemtypeid'].setValue(3);
      this.title='Residential Apartments';
      this.View='/ResidentialApartmentsView';
    }else{
      this.commercialbuildingform['controls']['itemtypeid'].setValue(2);
      this.title='Commercial Building';
      this.View='/CommercialBuildingView';
    }
    if (this.ActRoute.snapshot.params['id']) {
      
      let buildingid = atob(this.ActRoute.snapshot.params['id']);
      this.CommercialBuildingeditdata(buildingid);
    }
    else{
      this._commercialbuildingService._GetBankData('');
    }
    this.DateChange('');
     this.Continuebutton='Continue';
     this.Generatebutton='Generate';
   }

  GetItemTypes() {
    this._plotcreationservices.GetItemTypes().subscribe(data => {
      this.ItemTypes = data;
      console.log(data);
    })
  }
  getUOMdata() {
    
    this._commonService.GetUomData(this.RequestUom).subscribe(data => {
      
      this.primaryUomdata = data;
      this.secondaryUomdata = this.primaryUomdata.filter(function (data) {
        return data.secondarylandareauomname != "Acre";
      });
      //this.secondaryUomdata = this.secondaryUomdata.filter(uomData => uomData.secondarylandareauomname != 'Acer');
      // this.secondaryUomdata = data;
      this.commercialbuildingform['controls']['primaryprojectareauomid'].setValue('1');
      this.commercialbuildingform['controls']['primarylandareauomname'].setValue('Acre');
    })
  }

  primaryUom_Change($event: any): void {
    ;
    const pPrimaryuomid = $event.target.value;
    if (pPrimaryuomid && pPrimaryuomid != '') {
      const primaryuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.commercialbuildingform['controls']['primarylandareauomname'].setValue(primaryuomtext);
    }
    else {
      this.commercialbuildingform['controls']['primarylandareauomname'].setValue(' ');
    }

  }
  secondaryUom_Change($event: any): void {

    debugger;
    const psecondaryuomid = $event.target.value;
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.commercialbuildingform['controls']['secondarylandareauomname'].setValue(secondaryyuomtext);
      this.LandpurchaseValidationErrors.secondaryprojectareauomid=null;


    }
    else {
      this.commercialbuildingform['controls']['secondarylandareauomname'].setValue('');
         this.LandpurchaseValidationErrors.secondaryprojectareauomid=null;
    }
  }

  setbankid(bankid) {
    
    this.commercialbuildingform['controls']['landbankid'].setValue(bankid);
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
          // this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.LandpurchaseValidationErrors[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.LandpurchaseValidationErrors[key] += errormessage + ' ';
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

  generatedata() {
    ;
    
    let bankid = this._commercialbuildingService._SetBankData();
    if (bankid == undefined) {
      bankid = 0;
    } else {
      this.setbankid(bankid);
    }
  //  this.commercialbuildingform.controls.landbankid.setValue(bankid);
    this.temparray = [];
    let blockcount = this.commercialbuildingform['controls']['noofblocks'].value;
    if(blockcount==0 || blockcount==''){
    this._commonService.showWarningMessage('Please Enter No Of Blocks Or Towers');
    return;
  }
  this.Generatebutton='Processing';
    this.disablesavebutton = true;
    for (var i = 0; i < blockcount; i++) {
      let j = +i + 1
      this.addtowersForm.controls.buildingid.setValue(bankid);
      this.addtowersForm.controls.blockname.setValue('');
      this.addtowersForm.controls.blocknumber.setValue(j);
      this.temparray.push(this.addtowersForm.value);
    }
    this.Temptowerdata = this.temparray;
    //this.commercialbuildingform.controls.lsttempdata.setValue(JSON.stringify(this.temparray));
    //this.commercialbuildingform.controls.noofblocks.setValue(0)
    this.Generatebutton='Generate';
    this.disablesavebutton = false;
  }

  editcommercialbuilding($event, row, rowIndex) {
    ;
    this.commercialbuildingform.controls.lsttempdata.controls.blocknumber.setValue(row.blocknumber);
    this.commercialbuildingform.controls.lsttempdata.controls.blockname.setValue(row.blockname);
    this.commercialbuildingform.controls.lsttempdata.controls.nooflevelssuperstructure.setValue(row.nooflevelssuperstructure);
    this.commercialbuildingform.controls.lsttempdata.controls.nooflevelssubstructure.setValue(row.nooflevelssubstructure);
    this.ShowEditdata = true;
   // this.ShowGeneratedata = false;
    $('#add-detail').modal('show');
  }

  adddata() {
     
    this.commercialbuildingform['controls']['lsttempdata']['controls']['blockname'].setValidators([Validators.required]);
this.commercialbuildingform['controls']['lsttempdata']['controls']['nooflevelssuperstructure'].setValidators([Validators.required]);
this.commercialbuildingform['controls']['lsttempdata']['controls']['nooflevelssubstructure'].setValidators([Validators.required]);
let isvalid = true;
let a=this.commercialbuildingform['controls']['lsttempdata'];
if (this.checkValidations(a, isvalid)) {

    let blocknumber = this.commercialbuildingform.controls.lsttempdata.controls.blocknumber.value;
    let blockname = this.commercialbuildingform.controls.lsttempdata.controls.blockname.value;
    let nooflevelssuperstructure = this.commercialbuildingform.controls.lsttempdata.controls.nooflevelssuperstructure.value;
    let nooflevelssubstructure = this.commercialbuildingform.controls.lsttempdata.controls.nooflevelssubstructure.value;
    let substructureall = this.commercialbuildingform.controls.lsttempdata.controls.substructureall.value;
    for (var i = 0; i < this.Temptowerdata.length; i++) {
      if(this.Temptowerdata[i].blockname == blockname){
        this._commonService.showWarningMessage('Tower Name Already Exist');
       return;
      }
      if (this.Temptowerdata[i].blocknumber == blocknumber) {
        this.Temptowerdata[i].blockname = blockname;
        this.Temptowerdata[i].nooflevelssuperstructure = nooflevelssuperstructure;
        this.Temptowerdata[i].nooflevelssubstructure = nooflevelssubstructure;
        this.ShowGeneratedata = false;
      }
      if(substructureall==true){
        this.Temptowerdata[i].nooflevelssubstructure = nooflevelssubstructure;
      }
    }
    this.Temptowerdata=[...this.Temptowerdata];
    this.commercialbuildingform.controls.lsttempdata.controls.blocknumber.setValue('');
    this.commercialbuildingform.controls.lsttempdata.controls.blockname.setValue('');
    this.commercialbuildingform.controls.lsttempdata.controls.nooflevelssuperstructure.setValue('');
    this.commercialbuildingform.controls.lsttempdata.controls.nooflevelssubstructure.setValue('');
    this.commercialbuildingform.controls.lsttempdata.controls.substructureall.setValue(false);

    this.ShowEditdata = false;
    $('#add-detail').modal('hide');


}


  }



  // Open/close panel  
  toggleExpandRow(row, expanded) {
    
    this.table.rowDetail.toggleExpandRow(row);
    if (!expanded) {
      this.table.rowDetail.collapseAllRows();
      this.table.rowDetail.toggleExpandRow(row);
    }
    else if (expanded) {
      this.table.rowDetail.collapseAllRows();
    }
  }

  // Save row
  save(row, rowIndex) {
    
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row saved: " + rowIndex);
  }

  // Delete row
  delete(row, rowIndex) {
    
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row deleted: " + rowIndex);
  }

  clearForm() {
    // this._commercialbuildingService._GetBankData('');
    // this._commercialbuildingService._SetBankData();
    this.ngOnInit();
    this.getformdata();
    this.gettower();
    
    this.Temptowerdata = [];
  }
  branchid_Change(event) {
debugger
let pbranchname=event.target.options[event.target.selectedIndex].text;
this.commercialbuildingform.controls.pbranchname.setValue(pbranchname);
let branchid = parseInt(event.target.options[event.target.selectedIndex].value);
this.commercialbuildingform.controls.pBranchId.setValue(branchid)
  }
  getUOMConversionData() {
    this._commonService.getUOMConversionData().subscribe(data => {
      
      this.ConvetData = data;
      console.log(this.ConvetData);

    })
  }
  SaveForm() {
    debugger
    this.commercialbuildingform['controls']['primaryprojectarea'].setValidators(null);
    this.commercialbuildingform['controls']['primaryprojectarea'].updateValueAndValidity();
  
    this.commercialbuildingform['controls']['primarylandareauomname'].setValue(null);
    this.commercialbuildingform['controls']['secondaryprojectareauomid'].setValidators(null)
    this.commercialbuildingform['controls']['secondaryprojectarea'].setValidators(null)
    this.commercialbuildingform['controls']['secondaryprojectarea'].updateValueAndValidity();
    this.commercialbuildingform['controls']['secondaryprojectareauomid'].updateValueAndValidity();
     let bankid = this._commercialbuildingService._SetBankData();
   if (bankid == 0) {
      this._commonService.showWarningMessage('Please Select Land');
      this.enableSaveButton();
      return;
    }
     this.commercialbuildingform.controls.landbankid.setValue(bankid);
    let isvalid = true;
    
    if (this.checkValidations(this.commercialbuildingform, isvalid)) {
      let primaryprojectarea=this.commercialbuildingform.value.primaryprojectarea;
      let secondaryprojectarea=this.commercialbuildingform.value.secondaryprojectarea;
     
   
  if(primaryprojectarea=='' && secondaryprojectarea==''){
    this._commonService.showWarningMessage('Enter primary area or secondary area');
    this.enableSaveButton();
    return;
  }
  else{
    if (secondaryprojectarea != "") {
       this.LandpurchaseValidationErrors.secondaryprojectarea=null;
      this.commercialbuildingform['controls']["secondaryprojectarea"].setValidators([Validators.required])
      this.commercialbuildingform['controls']['secondaryprojectareauomid'].setValidators([Validators.required])
      this.commercialbuildingform['controls']['secondaryprojectareauomid'].updateValueAndValidity();
      this.GetValidationByControl(this.commercialbuildingform, 'secondaryprojectareauomid', true)
      this.setBlurEvent(this.commercialbuildingform, 'secondaryprojectarea');
    }
    else{
      this.commercialbuildingform['controls']['secondaryprojectarea'].setValue(0);
      this.commercialbuildingform['controls']['secondaryprojectareauomid'].setValue(0);
      this.LandpurchaseValidationErrors.secondaryprojectarea=null;
       this.LandpurchaseValidationErrors.secondaryprojectareauomid=null;

    }
      if (primaryprojectarea != "") {
      this.commercialbuildingform['controls']['primaryprojectarea'].setValidators([Validators.required]);
      this.commercialbuildingform['controls']['primaryprojectarea'].updateValueAndValidity();
      this.commercialbuildingform['controls']['primarylandareauomname'].setValue('Acre');
      this.setBlurEvent(this.commercialbuildingform, 'primaryprojectarea');
    }
    else{
      this.commercialbuildingform['controls']['primaryprojectarea'].setValue(0);

    }
   
    
  }
  ;
if(parseInt(this.commercialbuildingform.controls.standardrate.value)<=0){
  
  this._commonService.showWarningMessage('Standard Rate must be greater than Zero');
  return
}
if(this.Temptowerdata!=undefined){
if(this.checkprojectnameduplicates==true){
         this._commonService.showWarningMessage('Project Name Already Exist');
         this.enableSaveButton();
return;
}
let TowerNameandSuperStructures=0;
this.Temptowerdata.filter(function(tdata){
  if(tdata.blockname=='' || tdata.nooflevelssuperstructure==''){
    TowerNameandSuperStructures=1;
  }
});
if(TowerNameandSuperStructures==1){
  this._commonService.showWarningMessage('Please Enter  Tower Name and No Of Levels In Super-Structure');
  this.enableSaveButton();
    return;
}
  this.commercialbuildingform.controls.lstCBblocksstructures.setValue(this.Temptowerdata);
  let noofblocks=this.commercialbuildingform['controls']['noofblocks'].value;
  
  this.commercialbuildingform.controls.noofblocks.setValue(this.Temptowerdata.length);
 

     let data = JSON.stringify(this.commercialbuildingform.value);
 let availablearea=this._commercialbuildingService._GetAvailablearea();
//this.lstbranchnames=
 let x = availablearea.split(" ");
 let availableareaINACRES=Number(x[0]);
 let primaryprojectarea=this.commercialbuildingform.value.primaryprojectarea;
 let secondaryprojectarea=this.commercialbuildingform.value.secondaryprojectarea;
 let secondaryprojectareauomid=this.commercialbuildingform.value.secondaryprojectareauomid;
 let totAcer = 0; 
     let convertionValue = 0;
     if (secondaryprojectarea != '' && secondaryprojectareauomid != '') {
       let secondaryInAcres = this.ConvetData.filter(item => item.fromunitofmeasureid == secondaryprojectareauomid && item.tounitname == 'Acre');
       let secondaryInAcresValue = secondaryInAcres[0]['unitofmeasureconversionvalue'];
       convertionValue = secondaryInAcresValue * secondaryprojectarea;
     }
     totAcer = convertionValue + Number(primaryprojectarea);

     if (totAcer > availableareaINACRES && this.updateformdata!=true) {
       this._commonService.showWarningMessage('Entered Land Area ' + totAcer + ' less than Available Area ' + availableareaINACRES + ' ...');
       this.enableSaveButton();
       return
     }

      else{
        this.savebutton = "Processing";
    this.disablesavebutton = true;
        
 this._commercialbuildingService.savecommercialbuilding(data).subscribe(res => {
      console.log(res);
      let buildingid = res[0];
     
      this.ProjectName=this.commercialbuildingform.value.projectname;
    this.Tower(buildingid);
    this.disablesavebutton = false;
    this.disableclearbutton=false;
    $('#pbranchnameid').prop('disabled',true);
    $('#launchdateid').prop('disabled',true);
      $('.nav-item a[href="#area-statement"]').tab('show');
      var areastatement = document.getElementById("areastatementid");
      areastatement.classList.remove("disableTabs");
    var documents = document.getElementById("documentsid");
    documents.classList.remove("disableTabs");
     this._commercialbuildingService._GetBankData(buildingid);
      this.commercialbuildingform.controls.buildingid.setValue(buildingid);
      let data = {
        "propertytype":  this.title,
        "status": true,
        "typeid": buildingid,
        "transactionno": buildingid
      }
      this._LandBankservice._SetLandpurchasedatatonextTab(data);
    }, (error) => {
      this._commonService.showErrorMessage(error)
      this.disablesavebutton = false;
      if (this.commercialbuildingform.controls.ptypeofoperation.value == 'UPDATE') {
        this.buttonname = 'Update'
        this.disableclearbutton=true;
      }
      else {
        this.buttonname = 'Save'
        this.disableclearbutton=false;
      }

    }
   );
      }
    //}
 
 }
else{
  this._commonService.showWarningMessage('No Of Blocks Or Towers');
}
    }
    else{
      this.enableSaveButton();
    }
  
   
  }

  SaveDocumentForm() {
    debugger;
    if (this.documentformdetails.gridData.length > 0) {
      this.disablesavebutton = true;
      this.savebutton = "Processing";
      let isvalid = true;


      // this.Landdocumentdetails.push(this.documentformdetails.gridData );
      let DocumentStoreDTO = { DocumentStoreDTO: this.documentformdetails.gridData }
      let formdata = Object.assign(DocumentStoreDTO)
      let data = JSON.stringify(formdata);
      this._LandBankservice.SavedocumentDetails(data).subscribe(json => {

        try {
          if (json) {

            // this._commonservice.showInfoMessage('Documents Saved Sucessfully');
            this.disablesavebutton = false;
            this.enableSaveButton();
           // $('.nav-item a[href="#area-statement"]').tab('show');
            //this.LodLandpurchasedsharedetails();
            //this.getLanddata();
            this._commonService.showInfoMessage('Commercial Bank Created');
            this._routes.navigate([this.View]);

          }
          else {
            this.enableSaveButton();
          }
        }
        catch (error) {
          this._commonService.showErrorMessage('Land Bank');
        }
      },
        (error) => {
          this.enableSaveButton();
          this._commonService.showErrorMessage(error);
        });

    }
    else {
     // $('.nav-item a[href="#area-statement"]').tab('show');
     //this._commonService.showErrorMessage('Add KYC Documents');
     this._routes.navigate([this.View]);
   }
  }

  enableSaveButton() {
    this.disablesavebutton = false;
    if(this.updateformdata==true){
      this.savebutton = "Update & Continue";
      this.disableclearbutton=true;
    }
    else{
    this.savebutton = "Save & Continue";
    this.disableclearbutton=false;
     }
  }
  Tower(buildingid){
;
this.TowersListdetails=[];
this.TowersFloorsListdetails=[];

this._LandBankservice.getTowersListdetails(buildingid).subscribe(data => {
  this.TowersListdetails=data;
});

  }
  TowersList_Change($event: any){
;
this.disablesavebutton = false;
if(this.updateformdata==true){
  this.savebutton='Update Tower';
}else{
  this.savebutton='Save Tower';
}
let id = $event.target.value;
if(id!=''){
this.areastatementform['controls']['buildingblocksstructureid'].setValue(id);

this._LandBankservice.getBindTowersFloorsListdetails(id).subscribe(data => {
  this.TowersFloorsListdetails=data;
  this.shareapplicableforallfloors=this.TowersFloorsListdetails.reduce((sum, item) => sum + item.slabarea, 0);

});
}
else{
  this.TowersFloorsListdetails=[];
}
  }
  floornumber_Change(data){
    ;
    this.updatbutton='Update';
    this.disablesavebutton = false;
    $('#floor-add-detail').modal('show');
    let floornumber = data.floornumber;
    this.areastatementform['controls']['floornumber'].setValue(floornumber);
    let floordata=this.TowersFloorsListdetails.filter(function(floor){
      if(floor.floornumber==floornumber){
        return floor;
          }
    });
    let floorname=floordata[0].floorname;
    let slabarea=floordata[0].slabarea;
    let areauomid=floordata[0].areauomid;
    let landownerarea=floordata[0].landownerarea;
    let remarks=floordata[0].remarks;
    this.areastatementform['controls']['floorname'].setValue(floorname);
    this.areastatementform['controls']['areauomid'].setValue(4);
    this.areastatementform['controls']['slabarea'].setValue(slabarea);
    this.areastatementform['controls']['landownerarea'].setValue(landownerarea);
    this.areastatementform['controls']['remarks'].setValue(remarks);
  }
  get f() { return this.areastatementform.controls; }
  updateareastatement(){
    debugger;
    if(this.areastatementform.invalid){
      return;
    }
    else{
      let developerarea=Number(this.areastatementform.value.slabarea)-Number(this.areastatementform.value.landownerarea);
      this.areastatementform['controls']['developerarea'].setValue(developerarea);
      let floornumber=this.areastatementform.value.floornumber;
      let floorname=this.areastatementform.value.floorname;
      let slabarea=Number(this.areastatementform.value.slabarea);
      let areauomid=this.areastatementform.value.areauomid;
      let landownerarea=Number(this.areastatementform.value.landownerarea);
      let remarks=this.areastatementform.value.remarks;
      let allappiy=this.areastatementform.value.all;
      if(this.landpurchasetype!=''){
        landownerarea=slabarea;
        developerarea=slabarea;
      }
    if(slabarea>=landownerarea)
    {
       this.updatbutton = "Processing";
       this.disablesavebutton = true;
       this.updatebutton=true;
        this.TowersFloorsListdetails.filter(function(floor){
      
          if(floor.floornumber==floornumber){
            floor.floorname=floorname;
            floor.slabarea=slabarea;
            floor.areauomid=areauomid;
            floor.landownerarea=landownerarea;
            floor.developerarea=developerarea;
            floor.remarks=remarks;
          }
          if(allappiy==true){
          floor.slabarea=slabarea;
          floor.areauomid=areauomid;
          floor.landownerarea=landownerarea;
          floor.developerarea=developerarea;
        }

      });
      this.TowersFloorsListdetails=[...this.TowersFloorsListdetails];
      this.areastatementform['controls']['floornumber'].setValue('');
      this.areastatementform['controls']['floorname'].setValue('');
      this.areastatementform['controls']['slabarea'].setValue('');
      this.areastatementform['controls']['areauomid'].setValue('');
      this.areastatementform['controls']['landownerarea'].setValue('');
      this.areastatementform['controls']['developerarea'].setValue('');
      this.areastatementform['controls']['remarks'].setValue('');
      this.areastatementform['controls']['all'].setValue(false);
      this.updatebutton=false;
      this.disablesavebutton = false;
      $('#floor-add-detail').modal('hide');
    }
    else
    {
      this._commonService.showWarningMessage('Land Owners Share More Than Slab Area');
    }
 }
  }
  SaveTowersFloorsList(){
    ;
    this.shareapplicableforallfloors=this.TowersFloorsListdetails.reduce((sum, item) => sum + item.slabarea, 0);
if(this.shareapplicableforallfloors==0){
  this._commonService.showWarningMessage('No Data in Slab Area');
  return;
}
this.disablesavebutton = true;
    this.savebutton = "Processing";
   let id=this.areastatementform.value.buildingblocksstructureid;
    this.TowersFloorsListdetails.filter(function (df) { df.buildingblocksstructureid = id; });
    let lstCBblocksfloorinventory = { lstCBblocksfloorinventory: this.TowersFloorsListdetails }
    let formdata = Object.assign(lstCBblocksfloorinventory)
    let data = JSON.stringify(formdata);
    this._LandBankservice.SaveCommercialBuildingFloorDetails(data).subscribe(json => {
      let data=json;
      if(data==true){
        this.SaveTowersFloorsListc=true;
        this._commonService.showInfoMessage('Saved Successfully');
        this.TowersFloorsListdetails=[];
        this.areastatementform.reset();

        this.disablesavebutton = false;

      }
      },error=>{
         this._commonService.showErrorMessage(error);
         this.disablesavebutton = false;
          this.savebutton = "Save";
      });
  }

   getbranchnames() {
    this.commercialbuildingform.controls.pBranchId.setValue('');
    this._branchconfigService.getBranchCreationView().subscribe(data => {
      ;
      if (data != null) {
        this.lstbranchnames = data;
      }
    })
  }
 DateChange($event) {
    debugger
   // this.commercialbuildingform.controls.standardrate.setValue(0);
   let itemtypeid=parseInt(this.commercialbuildingform.controls.itemtypeid.value)
   let d=this.commercialbuildingform.controls.launchdate.value;
    //  this._plotcreationservices.getitemtypewiseStandardrates(itemtypeid,d.toISOString()).subscribe(Details=>{
    //    debugger;
    //    console.log("standard rate",Details);
    //   let standardrate=this._commonService.currencyformat(Details);
    //   this.commercialbuildingform.controls.standardrate.setValue(standardrate);
    //   if(this.getstandardrate!=''){
    //      this.commercialbuildingform.controls.standardrate.setValue(this.getstandardrate);
    //      this.getstandardrate='';
    //   }
    //  })
  }
  onselectavailablearea(rowdata){
    debugger;
    this.availableareaINACRES=rowdata.availableareaINACRES;
    var date = rowdata.purchasedate;
var datearray = date.split("/");
var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
    this.purchasedate=new Date(newdate);
    this.LaunchdateConfig.minDate =this.purchasedate;

    let landbankid=rowdata.landbankid;
    this.LandDetailsData=[];
  
   this.GetLandPurchaseddetailsDetailed(landbankid);
  }
  AreaStatementformcontinue(){
    this.disablesavebutton = true;
    this.Continuebutton = "Processing";
    $('.nav-item a[href="#documents"]').tab('show');
     this.enableSaveButton();

  }
  checkprojectname(){
    ;
    let projectname=this.commercialbuildingform.value.projectname;
    let buildingid=0;
     this._LandBankservice.checkcommercialbuildingduplicates(buildingid,projectname).subscribe(json => {
      let data=json;
    if(data!=0){
       this._commonService.showWarningMessage('Project Name Already Exist');
    this.checkprojectnameduplicates=true;
    return;
    }
    else{
      this.checkprojectnameduplicates=false;
    }
    
      });
  }

//   projectarea(pareatype){
//     
//     let primaryprojectarea=this.commercialbuildingform.value.primaryprojectarea;
//     let secondaryprojectarea=this.commercialbuildingform.value.secondaryprojectarea;
// if(pareatype=='primaryprojectarea' && primaryprojectarea!=''){
//   this.commercialbuildingform['controls']['primaryprojectareauomid'].setValue('1');
//   this.commercialbuildingform['controls']['primarylandareauomname'].setValue('Acre');  
// }
// if(pareatype=='primaryprojectarea' && primaryprojectarea==''){
//   this.commercialbuildingform['controls']['primaryprojectareauomid'].setValue();
//   this.commercialbuildingform['controls']['primarylandareauomname'].setValue();  
// }
// if(pareatype=='secondaryprojectarea' && secondaryprojectarea=='')
// {
//   this.commercialbuildingform['controls']["secondaryprojectareauomid"].setValue();
//   this.commercialbuildingform['controls']["secondarylandareauomname"].setValue();

// }
//   }
 
GetLandPurchaseddetailsDetailed(landbankids){
  this.Address='';
this.hidebranch=true;
  this._LandBankservice.GetLandPurchaseddetailsDetailed(landbankids).subscribe(json => {
debugger;
  this.LandDetailsData.push(json);
   if(this.commercialbuildingform.controls.ptypeofoperation.value!='UPDATE'){
  this.lstbranchnames=[];
 //this.commercialbuildingform.controls.pbranchname.setValue('');
 this.commercialbuildingform.controls.pBranchId.setValue('');
 this.LandpurchaseValidationErrors.pBranchId=null;

  }
  if(this.LandDetailsData[0].landpurchasetype=='Purchased Land'){
    this.landpurchasetype=this.LandDetailsData[0].landpurchasetype;
  }
  else{
    this.landpurchasetype='';
  }
  this.lstbranchnames=json.lstBranchViewDTO;

  this.LandPurchaseDetailsData = json.purchasedetailsDTO;
  if(json.addressDetailsStoreDTO.length!=0){
    this.Address=json.addressDetailsStoreDTO[0].paddress1+'  '+json.addressDetailsStoreDTO[0].paddress2+'  '+json.addressDetailsStoreDTO[0].pcity+' , '+ json.addressDetailsStoreDTO[0].pDistrict+' , '+json.addressDetailsStoreDTO[0].pState+' , '+json.addressDetailsStoreDTO[0].pCountry+'-'+json.addressDetailsStoreDTO[0].pincode+'.';
    }
  else{
    this.Address='';
  }
  
})
}
CloseModel(){
  $('#add-detail').modal('hide');
  $('#floor-add-detail').modal('hide');
}
CommercialBuildingeditdata(buildingid){
  this._commercialbuildingService.GetcommercialbuildingdetailsDetailed(buildingid).subscribe(json => {
    debugger;
     this.EditDataa=json;
     this.commercialbuildingform['controls']['ptypeofoperation'].setValue('UPDATE');
     this.commercialbuildingform['controls']['buildingid'].setValue(this.EditDataa.buildingid);
     //this.commercialbuildingform['controls']['launchdate'].setValue(this.EditDataa.launchdate);
     this.commercialbuildingform['controls']['projectname'].setValue(this.EditDataa.projectname);
     this.commercialbuildingform['controls']['pbranchname'].setValue(this.EditDataa.pbranchname);
     this.commercialbuildingform['controls']['pBranchId'].setValue(this.EditDataa.pBranchId);

     this.commercialbuildingform['controls']['primaryprojectarea'].setValue(this.EditDataa.primaryprojectarea);
     this.commercialbuildingform['controls']['primaryprojectareauomid'].setValue(this.EditDataa.primaryprojectareauomid);
     this.commercialbuildingform['controls']['primarylandareauomname'].setValue(this.EditDataa.primarylandareauomname);

     
     this.commercialbuildingform['controls']['secondaryprojectarea'].setValue(this.EditDataa.secondaryprojectarea);
     this.commercialbuildingform['controls']['secondaryprojectareauomid'].setValue(this.EditDataa.secondaryprojectareauomid);
     this.commercialbuildingform['controls']['secondarylandareauomname'].setValue(this.EditDataa.secondarylandareauomname);
     this.commercialbuildingform['controls']['noofblocks'].setValue(this.EditDataa.noofblocks);
     this.Temptowerdata=this.EditDataa.lstCBblocksstructures;
     this.GetLandPurchaseddetailsDetailed(this.EditDataa.landbankid);
     this.documentformdetails.gridData=this.EditDataa.documentStoreDTO;
     let launchdate= this._commonService.formatDateFromDDMMYYYY(this.EditDataa.launchdate)
     this.commercialbuildingform['controls']['launchdate'].setValue(launchdate);
     this.ShowGeneratedata = false;
     this.checkprojectnameduplicates=false;
     this._commercialbuildingService._GetBankData(this.EditDataa.landbankid);
     let alldatag=this._commercialbuildingService._GetAllAvailabledata();
     let availablearea=alldatag.filter(row=>row.landbankid==this.EditDataa.landbankid);
     this._commercialbuildingService._SetAvailablearea(availablearea[0].availableareaINACRES);
     this.availableareaINACRES=availablearea[0].availableareaINACRES;
     var date = availablearea[0].purchasedate;
    var datearray = date.split("/");
     var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
    this.purchasedate=new Date(newdate);
     this.LaunchdateConfig.minDate =this.purchasedate;
    this.branchdisable=true;
    this.ProjectName=this.EditDataa.projectname;
    this.Tower(this.EditDataa.buildingid);
    $( "#launchdateid" ).prop( "disabled", true );
    $( "#pbranchnameid" ).prop( "disabled", true );
    $( "#projectnameid" ).prop( "disabled", true );
    $( "#primaryprojectareaid" ).prop( "disabled", true );
    $( "#secondaryprojectareaid" ).prop( "disabled", true );
    $( "#idsecondaryprojectareauom" ).prop( "disabled", true );
    $( "#standardrateid" ).prop( "disabled", true );
   
    
  //   var towersdetailsid = document.getElementById("towersdetailsid");
  //   towersdetailsid.classList.remove("disableTabs");
  //   var areastatement = document.getElementById("areastatementid");
  //   areastatement.classList.remove("disableTabs");
  // var documents = document.getElementById("documentsid");
  // documents.classList.remove("disableTabs");

    this.updateformdata=true;
    this.savebutton = "Update & Continue";
    this.disableclearbutton=true;
    debugger;
    this.disableclearbutton=true;
    //this.getstandardrate='';
    //  this.getstandardrate=this._commonService.currencyformat(this.EditDataa.standardrate);
      let minbookingamt=this._commonService.currencyformat(this.EditDataa.minbookingamount);
    this.commercialbuildingform['controls']['minbookingamount'].setValue(minbookingamt);
     //debugger;
    this.commercialbuildingform.controls.standardrate.setValue(this._commonService.currencyformat(this.EditDataa.standardrate));
  });
  
}
tab(tabtitle){
  this.enableSaveButton();
}
}

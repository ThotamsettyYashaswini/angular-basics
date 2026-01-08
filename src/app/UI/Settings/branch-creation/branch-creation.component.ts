import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CommonService } from '../../../Services/common.service';
import { BranchconfigService } from '../../../Services/Settings/branchconfig.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AddressComponent } from '../../Common/address/address.component';
import { ContacmasterService } from '../../../Services/Loans/Masters/contacmaster.service';
import { CompanyconfigDocumentsComponent } from '../company-config/companyconfig-documents/companyconfig-documents.component';
import { debug, log } from 'util';
import { HttpClient } from '@angular/common/http';
declare let $: any;

@Component({
  selector: 'app-branch-creation',
  templateUrl: './branch-creation.component.html',
  styles: []
})
export class BranchCreationComponent implements OnInit {
   @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild(AddressComponent, { static: false }) addresscomponent: AddressComponent;
  @ViewChild(CompanyconfigDocumentsComponent, { static: false }) documentformdetails: CompanyconfigDocumentsComponent;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public clearbuttonshow: boolean = false;
  cmpdisabled = false;
    public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public buttontype='Add';
  public selected = [];
  public SelectionType = SelectionType;
  branchdisable = false;
  branchcodedisable = false;
  addressTypeErrorMessage: any = {};
  disablesavebutton=false;
  disableclearbutton=false;
  minDate: Date
  maxDate: Date = new Date();
  companydate:any;
  BranchConfigvalidators: any;
  griddata: any = []
  buttonname: any
  buttonnameedit: any;
  lstcompanynames: any;
  locationDetailsForm: FormGroup;
  branchConfigform: FormGroup;
  addresstypeForm: FormGroup;
  contacttype = "Business Entity"
  addressTypes: any;
  rowindex:any;
  addressFormdata: any;
  latitude: any;
  longitude: any;
  lstdeletedaddressdetails = [];
  bsValue = new Date();
  currencyFormat: any;
  constructor(private fb: FormBuilder, private _commonservice: CommonService, private http: HttpClient, private _branchconfigService: BranchconfigService, private toastr: ToastrService, private _router: Router, private _contacmasterservice: ContacmasterService, private ActRoute: ActivatedRoute) {
    this.dpConfig.containerClass = this._commonservice.DatePickerDateFormat('containerClass');
    this.dpConfig.dateInputFormat = this._commonservice.DatePickerDateFormat('dateInputFormat');
    this.dpConfig.showWeekNumbers = this._commonservice.DatePickerDateFormat('showWeekNumbers');
    this.currencyFormat = '₹';
  }

  ngOnInit() {
    this.columns=[];
    this.companydate="";
    this.rowindex='';
    this.buttontype='Add';
    this.lstdeletedaddressdetails=[];
    this.branchdisable = false;
    this.cmpdisabled = false;
    this.branchdisable = false;
    this.branchcodedisable = false;
    this.disablesavebutton=false;
    this.disableclearbutton=false;
     this.latitude = "";
    this.longitude = "";
    this.griddata = [];
    this.getAddressTypes();
    this.BranchConfigvalidators = {};
    this.branchConfigform = this.fb.group({
      pCompanyname: [''],
      pcompanyid: [''],
      pCompanyId: ['', Validators.required],
      pbranchid: [0],
      pbranchname: ['', Validators.required],
      pbranchcode: ['', Validators.required],
      Addresstype: [''],
      pgstinnumber: ['',Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$')],
      pcontactnumber: ['', [Validators.required, Validators.minLength(10)]],
      pemailid: ['', Validators.pattern],
      pCreatedby: [this._commonservice.pCreatedby],
      ptypeofoperation: [this._commonservice.ptypeofoperation],
      priority:[],
      plocationname: [''],
      plongitude: [0],
      platitude: [0],
      plocationcd: [''],
      pestablishmentdate: [''],
      lstBranchcreationAddressDTO: [],
      lstBranchcreationDocStoreDTO: [],
      lstBranchLocationDTO: []

    })
    this.buttonname = "Save";
    this.loadAddressInitData();
    this.addAddressControls();
    this.getcompanynames();
    this.BlurEventAllControll(this.branchConfigform);
    this.buttonnameedit = this._branchconfigService.GetButtonType()
    if (this.buttonnameedit == "Edit") {
      if (this.ActRoute.snapshot.params['id']) {
        debugger
        let editbranchid = atob(this.ActRoute.snapshot.params['id']);
        this.getBranchconfigeditDetails(editbranchid);
      }
    }
  }
 editHandler(event, row, rowIndex){
   debugger;
   this.rowindex =rowIndex
    this.buttontype = 'Update';
    if(row.ptypeofoperation=='UPDATE' || row.ptypeofoperation=='OLD'){
       row.ptypeofoperation = 'UPDATE';
    }
   
    this.addresscomponent.editdata(row, 'Branch Creation');
    this.branchConfigform.controls.Addresstype.setValue(row.Addresstype);
    this.branchConfigform.controls.priority.setValue(row.priority);
  }



  getcompanynames() {
    debugger;
    this._branchconfigService.GetcompanyView().subscribe(data => {
      if (data != null) {
        debugger;
        this.lstcompanynames = data;
        console.log(this.lstcompanynames)
      }
    })
  }
  getBranchconfigeditDetails(branchid) {
    debugger
    this._branchconfigService.getBranchconfigeditDetails(branchid).subscribe(data => {
      if (data != null) {
        debugger;
        console.log("company id", data.pcompanyid)
        this.branchConfigform.patchValue({
          pCompanyId: data.pcompanyid ? data.pcompanyid : '',
          pbranchid: data.pbranchid ? data.pbranchid : 0,
          pbranchname: data.pbranchname ? data.pbranchname : '',
          pbranchcode: data.pbranchcode ? data.pbranchcode : '',
          pgstinnumber: data.pgstinnumber ? data.pgstinnumber : '',
          pcontactnumber: data.pcontactnumber ? data.pcontactnumber : '',
          pemailid: data.pemailid ? data.pemailid : '',
          ptypeofoperation: 'UPDATE'
        })
        if (data.pestablishmentdate != null) {
         this.branchConfigform.controls.pestablishmentdate.setValue(this._commonservice.formatDateFromDDMMYYYY(data.pestablishmentdate))
         console.log("get date",this.branchConfigform.controls.pestablishmentdate.value)
        }
        debugger;
        this.CompanyNameinEditChanged();
        let branchid=this.branchConfigform.controls.pbranchid.value;
        this.cmpdisabled = true;
        this.branchdisable = true;
        this.branchcodedisable = true;
        this.griddata=[]
        this.griddata = data['lstBranchcreationAddressDTO']
        this.griddata.filter(function(row){
          row.Addresstype=row.addresstype;
          row.Pincode=row.pincode;
          row.ptypeofoperation="UPDATE";
          row.pbranchid=branchid;
        })
        this.documentformdetails.gridData = data['lstBranchcreationDocStoreDTO'];
        this.documentformdetails.gridData.filter(function(row){
            row.ptypeofoperation="UPDATE";
            row.pbranchid=branchid;
          })
        this.getLatitudeLongitude();
        this.BranchConfigvalidators = {};
        this.BlurEventAllControll(this.branchConfigform);
        if (this.branchConfigform.controls.ptypeofoperation.value == 'UPDATE') {
          this.buttonname = 'Update';
          this.disableclearbutton=true;
        }
        else {
          this.buttonname = "Save";
        }
        this.clearbuttonshow != this.clearbuttonshow;

      }

    })
  }

  addAddressControls() {
    return this.fb.group({
      pRecordId: [''],
      Addresstype: ['', Validators.required],
      pAddress1: [''],
      pAddress2: [''],
      pbranchid:[0],
      pState: ['', Validators.required],
      pStateId: [''],
      pDistrict: ['', Validators.required],
      pDistrictId: [''],
      pCity: ['', Validators.required],
      pCountry: ['', Validators.required],
      pCountryId: ['',],
      pPinCode: ['', [Validators.required, Validators.minLength(6)]],
      pPriority: [''],
      priority:[],
      ptypeofoperation: [ [this._commonservice.ptypeofoperation]],
      pAddressDetails: [''],
      pStatusname: [''],
    })
  }


  loadAddressInitData() {
    this.addresstypeForm = this.fb.group({
      pContactType: [''],
      pAddressTypeMst:[''],
      pAddressType: ['', Validators.required],
      pStatusname: ['ACTIVE', Validators.required],
      pCreatedby: ['', Validators.required]
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
          this.BranchConfigvalidators[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.BranchConfigvalidators[key] += errormessage + ' ';
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

  saveaddresstype() {
    debugger
    let isValid = true;


    if (this.GetAddressTypeValidationByControl('pAddressType', isValid)) {
      this.addresstypeForm['controls']['pContactType'].setValue(this.contacttype);
      this.addresstypeForm['controls']['pCreatedby'].setValue(this._commonservice.pCreatedby);
      this.addresstypeForm['controls']['pStatusname'].setValue(this._commonservice.pStatusname);

      let data = JSON.stringify(this.addresstypeForm.value);


      this._contacmasterservice.checkAddressType(this.addresstypeForm.controls.pAddressType.value, this.addresstypeForm.controls.pContactType.value).subscribe(res => {

        if (res == 0) {
          this._contacmasterservice.saveAddressType(data).subscribe(res => {
            if (res == true) {

              this.toastr.success("Saved Successfully", 'Success')
              $('#addresstype').modal('hide');
              this.loadAddressInitData();
              this.getAddressTypes();
              this.clearAddressType();
            }
            else {
            }

          })
        }
        else {
          let lablename = (document.getElementById('pAddressTypeMst') as HTMLInputElement).title;
          this.toastr.info(lablename + " Already Exist", 'Message')
        }
      });
    }
  }
CompanyNameChanged(event){
  debugger;
   let cmpdate
  let companyid=this.branchConfigform.controls.pCompanyId.value;
   this.branchConfigform.controls.pCompanyname.setValue(event.target.options[event.target.selectedIndex].text);
   this.lstcompanynames.filter(data=>{
     debugger;
    
     if(companyid==data.pCompanyId){
       cmpdate= data.pEstablishmentdate
     }
   })
   debugger;
   console.log("company date",cmpdate)
   if(cmpdate!=""){
 let companycreateddate = this._commonservice.formatDateFromDDMMYYYY(cmpdate);
      this.dpConfig.minDate = companycreateddate;

   }
        

}
CompanyNameinEditChanged(){
  debugger;
   let cmpdate
  let companyid=this.branchConfigform.controls.pCompanyId.value;
   this.lstcompanynames.filter(data=>{
     debugger;
     if(companyid==data.pCompanyId){
       cmpdate= data.pEstablishmentdate
     }
   })
   debugger;
   console.log("company date",cmpdate)
   if(cmpdate!=""){
 let companycreateddate = this._commonservice.formatDateFromDDMMYYYY(cmpdate);
      this.dpConfig.minDate = companycreateddate;

   }
        

}
  getAddressTypes() {
    this._branchconfigService.getAddressTypes().subscribe(data => {
      this.addressTypes = data;
    })
  }

  /** address type validation dont check in saving */
  addresstype(type) {
    let isValid = true;
    debugger
    let Addresstype = <FormGroup>this.branchConfigform['controls']['Addresstype'];
    if (type == 'GET') {
      Addresstype.setValidators(Validators.required);
    }
    else {
      Addresstype.clearValidators();
    }
    Addresstype.updateValueAndValidity();
    this.BranchConfigvalidators = {}
    this.BlurEventAllControll(this.branchConfigform);
    this.BlurEventAllControll(this.addresstypeForm);
  }

updaterow(){
    debugger;
    let addressFormdetails = this.addresscomponent.addressForm.value;
          addressFormdetails['Addresstype'] = this.branchConfigform.controls.Addresstype.value;
          if(this.griddata.length>0){
             this.griddata[this.rowindex]=addressFormdetails;
            this.griddata[this.rowindex].priority = this.branchConfigform.controls.priority.value;
          }
          else{
              this.griddata[0]=addressFormdetails;
            this.griddata[0].priority = this.branchConfigform.controls.priority.value;
          }
            this.griddata=[...this.griddata];
            this.getLatitudeLongitude();
             this.branchConfigform.controls.Addresstype.setValue('')
             this.branchConfigform.controls.priority.setValue('')
            this.addresscomponent.clear();
            this.buttontype='Add';
            this.addresstype('SET')
            this.rowindex = '';
}
  /** Adding address details to grid */
  addAddressDetails() {
    debugger
    let isValid = true;
    this.addressFormdata = this.addresscomponent.addressForm.value;
    this.addresstype('GET');
      if(this.addresstypecheckValidations(this.branchConfigform, isValid)){
    if (this.addresscomponent.checkValidations(this.addresscomponent.addressForm, isValid)) {
      console.log(this.branchConfigform.controls.Addresstype.value)
      if(this.buttontype=='Update'){
          this.updaterow(); 
          return;
      }
     
      this.addressFormdata['Addresstype'] = this.branchConfigform.controls.Addresstype.value;
      debugger
      if (this.griddata.length == 0) {
        //this.addressFormdata['pPriority'] = 'true'
        this.addressFormdata['priority'] = 'true';
        this.addressFormdata['ptypeofoperation'] = "CREATE";
        //this.griddata.push(this.addressFormdata);
        this.griddata=[...this.griddata,...this.addressFormdata]
        this.addresscomponent.ngOnInit();
        this.addresstype('SET')
      }
      else {
        let count = 0;
        for (let i = 0; i < this.griddata.length; i++) {
          if (this.addressFormdata.Addresstype == this.griddata[i]['Addresstype']) {
            this._commonservice.showWarningMessage("Already Exists");
            break;
          }
          else {
            count++;
          }
        }
        if (count == this.griddata.length) {
debugger;
          //this.addressFormdata['pPriority'] = 'false';
          this.addressFormdata['priority'] = 'false';
          this.addressFormdata['ptypeofoperation'] = "CREATE";
           this.griddata=[...this.griddata,...this.addressFormdata]
          this.addresscomponent.ngOnInit();
          this.addresstype('SET')
        }
        this.BlurEventAllControll(this.branchConfigform);
      }
      this.branchConfigform.controls['Addresstype'].setValue('')
      this.addresscomponent.clear();
      this.getLatitudeLongitude();
    }
console.log("add data to grid",this.griddata)
  }
  }
  removeHandler(event,row) {
   // this.griddata.splice(event.rowIndex, 1);
   debugger;
      if(row.ptypeofoperation=='UPDATE'){
        let deleterow:[]=row;
      this.lstdeletedaddressdetails=[...this.lstdeletedaddressdetails,...deleterow];
      this.lstdeletedaddressdetails=this.lstdeletedaddressdetails.filter(data=>data.ptypeofoperation='DELETE')
      }
    this.griddata=this.griddata.filter(data=>data.Addresstype!=row.Addresstype);
    if (this.griddata.length == 0) {
      this.latitude = "";
      this.longitude = "";
    }
    if(this.griddata.length ==1){
      //this.griddata[0].pPriority = 'true';
      this.griddata[0].priority = 'true';
      this.getLatitudeLongitude();
    }
  }
changeAddressPriority(row,rowIndex){
debugger
    this.griddata.filter(data => { data.priority = "" })
    console.log(this.griddata)
    row.priority = 'true'
    this.griddata[rowIndex] = row
this.getLatitudeLongitude();
}

  addresstypecheckValidations(group: FormGroup, isValid: boolean): boolean {
    debugger
    try {
      Object.keys(group.controls).forEach((key: string) => {
        if (key == 'Addresstype')

          isValid = this.GetValidationByControl(group, key, isValid);
      })
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }


  /** save branch configuration **/
  saveBranchConfigform() {
    debugger

    let pgstinnumber = <FormGroup>this.branchConfigform['controls']['pgstinnumber'];
    let pestablishmentdate = <FormGroup>this.branchConfigform['controls']['pestablishmentdate'];
    pgstinnumber.clearValidators();
    pestablishmentdate.clearValidators();
    pgstinnumber.updateValueAndValidity();
    pestablishmentdate.updateValueAndValidity();

    if (this.branchConfigform.controls.ptypeofoperation.value == 'UPDATE') {
      this.buttonname = 'Update';
    }
    else {
      this.buttonname = "Save";
    }

    let isvalid = true;

    this.addresstype('SET');
    if (this.checkValidations(this.branchConfigform, isvalid)) {


      if (this.griddata.length == 0) {
        this.toastr.warning('Enter Address Details', 'Warning')
      }
      else {
            debugger;
    if(this.griddata.length==1){
this.griddata[0].latitude=this.latitude;
this.griddata[0].longitude=this.longitude
    }
else{
this.griddata.filter(data=>{
  debugger
      if(data.priority=='true'){
        data.longitude=this.longitude;
        data.latitude=this.latitude;
      }
    })
}
        let branchname = this.branchConfigform.controls.pbranchname.value;
        let branccode = this.branchConfigform.controls.pbranchcode.value;
        let branchid = parseInt(this.branchConfigform.controls.pbranchid.value);
        this.branchConfigform.controls.pcompanyid.setValue(this.branchConfigform.controls.pCompanyId.value);
        this._branchconfigService.checkbranchnameCreationDuplicates(branchname, branccode, branchid).subscribe(data => {
          debugger
          if (data[0] != [""]) {
            this.toastr.info(data[0], 'Info');
          }
          else {
            this.disablesavebutton=true;
            this.buttonname = "Processing";
            if(this.lstdeletedaddressdetails.length>0){
              this.griddata=[...this.griddata,...this.lstdeletedaddressdetails];
            }
            if(this.documentformdetails.deletedrows.length>0){
             if(this.documentformdetails.gridData.length>0){
                 this.documentformdetails.gridData=[...this.documentformdetails.gridData,...this.documentformdetails.deletedrows]
             }
             else{
               this.documentformdetails.gridData=[...this.documentformdetails.deletedrows]
             }
             
            }
            this.branchConfigform.controls.lstBranchcreationAddressDTO.setValue(this.griddata)
            this.branchConfigform.controls.lstBranchcreationDocStoreDTO.setValue(this.documentformdetails.gridData);
            let formdata = JSON.stringify(this.branchConfigform.value);
            debugger; 
            console.log(formdata)
            this._branchconfigService.saveBranchCreationconfigformdata(formdata).subscribe(value => {
              debugger
              if (this.branchConfigform.controls.ptypeofoperation.value == 'UPDATE') {
                this.toastr.success("Updated Successfully", 'Success');
                this.buttonname = "Save";
                this.disablesavebutton=false
              }
              else {
                this.toastr.success("Saved Successfully", 'Success');
                this.buttonname = "Save";
                this.disablesavebutton=false;
              }
              this._branchconfigService.SetButtonType("New");
               this._router.navigate(['/BranchCreationView']);
               this.disableclearbutton=false;
               this.lstdeletedaddressdetails=[];
              this.clear();
              this.latitude = "";
              this.longitude = "";
              this.griddata = [];
              this.addresscomponent.ngOnInit();
              this.branchConfigform.clearValidators();
              this.addresscomponent.clear();
              this.documentformdetails.clear();

            }, error => {
              this.toastr.error(error, 'Error')
               this.buttonname = "Save";
                this.disablesavebutton=false;

            })

          }
        }, error => {
          this.toastr.error(error, 'Error')
           this.buttonname = "Save";
                this.disablesavebutton=false;

        })

      }

    }

  }

  clear() {
    debugger
    this.branchConfigform.reset();
    this.ngOnInit();
    this.addresstypeForm.reset();
    this.documentformdetails.clear();
    this.addresscomponent.clear();
  }

  showErrorMessage(errormsg: string) {
    this._commonservice.showErrorMessage(errormsg);
  }

  GetAddressTypeValidationByControl(key: string, isValid: boolean): boolean {

    try {
      let formcontrol;
      formcontrol = this.addresstypeForm.get(key);
      if (formcontrol) {
        if (formcontrol.validator) {
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            key = key + 'Mst';
            let lablename;
            this.BranchConfigvalidators[key] = '';

            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                if (errorkey == 'required')
                  errormessage = lablename + ' ' + errorkey;
                if (errorkey == 'email')
                  errormessage = 'Invalid ' + lablename;
                this.addressTypeErrorMessage[key] = errormessage + ' ';
                isValid = false;
              }
            }

          }
        }
      }
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }

  Modalclose(): void {

    $('#addresstype').modal('hide');
  }
  clearAddressType() {
    debugger;
    //this.addressTypeErrorMessage.Addresstype = null;
    this.addresstypeForm.reset();
    this.addressTypeErrorMessage = {};
    this.BlurEventAllControll(this.addresstypeForm);
  }
  // Addrestype_change() {
  //  // this.BlurEventAllControll(this.addresstypeForm);
  // }
  AddAddressType() {
    debugger
    
    //this.clearAddressType();
    //this.addresstypeForm.reset();
    this.addressTypeErrorMessage.pAddressType = null;
    this.addressTypeErrorMessage = {};
    //this.BlurEventAllControll(this.addresstypeForm);

  }

  clearAddress() {
    debugger;
    this.addressTypeErrorMessage.pAddressTypeMst = null
    this.addresstypeForm.controls.pAddressTypeMst.setValue('')
    this.addresstypeForm.controls.pAddressType.setValue('')
    this.addressTypeErrorMessage.pAddressType = null;


  }


  getLatitudeLongitude() {
    debugger
    let arr = [];

    for (let i = 0; i < this.griddata.length; i++) {
      if (this.griddata[i].priority == 'true') {
        arr.push(this.griddata[i])
      }
    }
    if (arr.length != 0) {
      let geoCodeApiUrl = "http://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address="
        + arr[0].paddress1 + "," + arr[0].paddress2
        + "," + arr[0].pcity + "," + arr[0].pState
        + "," + arr[0].pCountry + "," + arr[0].Pincode
        + "&key=AIzaSyAdjvx40arfFIKZTq6bIenG586DP5kjJFw";
      this.http.get(geoCodeApiUrl).subscribe(res => {
        debugger
        let data = res['results'];
         this.addresscomponent.addressForm.controls.latitude.setValue(data[0].geometry.location.lat);
         this.addresscomponent.addressForm.controls.longitude.setValue(data[0].geometry.location.lng); 
        this.latitude = data[0].geometry.location.lat;
        this.longitude = data[0].geometry.location.lng
       
      })
    }
    else {
      this.longitude = "";
      this.latitude = "";
    }
  }

  // selectPrimaryAddress(event) {
  //   debugger;
  //   for (let i = 0; i < this.griddata.length; i++) {
  //     if (event.target.value == this.griddata[i].Addresstype) {
  //       this.griddata[i].pPriority = "true";
  //     }
  //     else {
  //       this.griddata[i].pPriority = "false";
  //     }
  //   }
  //   this.getLatitudeLongitude();
  // }

  enterBranch($event) {
  }

  Branch_Code($event) {
  }
}
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { CompanyconfigService } from 'src/app/Services/Settings/companyconfig.service';
import { AddressComponent } from '../../Common/address/address.component';
import { ContacmasterService } from 'src/app/Services/Loans/Masters/contacmaster.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DefaultProfileImageService } from 'src/app/Services/Loans/Masters/default-profile-image.service';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { CompanyconfigPromotorsComponent } from '../company-config/companyconfig-promotors/companyconfig-promotors.component';
import { CompanyconfigDocumentsComponent } from '../company-config/companyconfig-documents/companyconfig-documents.component';
import { ToastrService } from 'ngx-toastr';
import { debug, log } from 'util';
import { HttpClient } from '@angular/common/http';
declare let $: any;

@Component({
  selector: 'app-companies-creation',
  templateUrl: './companies-creation.component.html',
  styles: []
})
export class CompaniesCreationComponent implements OnInit {
   @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild(CompanyconfigPromotorsComponent, { static: false }) promotorformdetails;
  @ViewChild(CompanyconfigDocumentsComponent, { static: false }) documentformdetails;
  @ViewChild(AddressComponent, { static: false }) addressdetails;
  @ViewChild('fileInput', { static: false })fileInput:ElementRef;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfig1: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  companyconfigform: FormGroup;
  CompanyContactpromotorsForm: any;
  CompanyContactdocumentsForm: any;
  addresstypeForm: FormGroup
  croppedImage: any
  public filename="";
  deletedaddressdetails:any;
  public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public selected = [];
  public SelectionType = SelectionType;
  AddressForm: any;
  rowindex: any;
  latitude: any;
  longitude: any;
  buttontype = 'Add'
  enterprisename: any = []
  showEnterprise = false;
  public disablesavebutton = false;
  disablesaveadressbutton = false;
  saveadressbutton = 'Save'
  showBusinessNature = false;
  selectedtype: any;
  griddata: any = []
  companyconfigvalidations: any = {};
  typeofEnterpriseDetails: any;
  path: any;
  addressTypeDetails: any;
  contacttype = "Business Entity"
  buttonname: any;
  promoterdeletedrows:any;
  Title: any;
  countryDetails: any;
  stateDetails: any;
  districtDetails: any;


  croppedImageImageurl: any;
  generatedImage: any;
  imageResponse: any;
  file:any;
  FileName: any;
  FilePath: any;


  constructor(private formbuilder: FormBuilder, private titlecasepipe: TitleCasePipe, private ActRoute: ActivatedRoute, private router: Router, private _defaultimage: DefaultProfileImageService, private _commonService: CommonService, private _contacmasterservice: ContacmasterService, private _companyconfigservice: CompanyconfigService, private toastr: ToastrService, private http: HttpClient) {
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.showWeekNumbers = false;
    this.dpConfig.maxDate = new Date();
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    this.dpConfig1.containerClass = 'theme-dark-blue';
    this.dpConfig1.showWeekNumbers = false;
    this.dpConfig1.minDate = new Date();
    this.dpConfig1.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit() {
    debugger
    this.columns=[]
    this.deletedaddressdetails=[];
     this.latitude = "";
    this.longitude = "";
    this.selectedtype = "Basic Information";
    this._companyconfigservice.getTitleOnClick(this.selectedtype);
    this.buttonname = "Next"
    this.getformdata();
    this.getAddressTypeDetails()
    this.BlurEventAllControll(this.companyconfigform);
    this.getTypeofEnterprise()
    this.getCountryDetails();
   // this.resetFileUploader();
    this._companyconfigservice._GetButtonName().subscribe(data => {
      this.buttonStatus("Basic Information");
    })
    if (this.ActRoute.snapshot.params['id']) {
      debugger
      let EditCompanyID = atob(this.ActRoute.snapshot.params['id']);
      this.loadeditdata(EditCompanyID);
    }
    this.addresstypeForm = this.formbuilder.group({
      pContactType: [''],
      newaddresstype:['',Validators.required],
      pAddressType: [''],
      pStatusname: [this._commonService.pStatusname],
      pCreatedby: [this._commonService.pCreatedby],
    })
    this.croppedImage = this._defaultimage.GetdefaultImage();

    this.BlurEventAllControll(this.addresstypeForm)

  }

  getformdata() {
    this.companyconfigform = this.formbuilder.group({
      pcreatedby: [this._commonService.pCreatedby],
      ptypeofoperation: [this._commonService.ptypeofoperation],
      pnameofenterprise: ['', Validators.required],
      penterprisecode: ['', Validators.required],
      pAddressTypeChk: [''],
      pPhoto: [''],
      addressid:['0'],
      pCompanyimagepath: [''],
      //uploadfilename:[''],
      ppancard: ['', Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
      ptypeofenterprise: [''],
      pestablishmentdate: [''],
      pcommencementdate: [''],
      pcinnumber: ['', Validators.pattern('^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$')],
      pgstinnumber: ['', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$')],
      addresstype: [''],
      potherenterprise: [''],
      ptypeofenterpriseid: [0],
      pPriority: [''],
      priority:[''],
      pdatepickerenablestatus: ['true'],
      pCompanyId: ['0'],
      pRecordId: ['0'],
      pcontactnumber: ['',[Validators.required, Validators.minLength(10)]],
      pemailid: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      pemailid2: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ppriority: [''],
      pAlternativeNo: ['',[Validators.minLength(10)]],
      lstCompanyContactDTO: this.formbuilder.array([]),
      lstCompanyAddressDTO: this.formbuilder.array([]),
      lstCompanyDocumentsDTO: this.formbuilder.array([]),
      lstCompanyPromotersDTO: this.formbuilder.array([])
    })

  }

 resetFileUploader() { 
   debugger;
    this.fileInput.nativeElement.value = null;
  }

  ChangeLoanType(event) {
    debugger
    let str = event.target.value;
    let LoanCode = '';
    if (str != "") {
      let a = str.split(' ')
      for (var i = 0; i < a.length; i++) {
        LoanCode += a[i].charAt(0);
      }
      this.companyconfigform.controls.penterprisecode.setValue(LoanCode.toUpperCase());

      let companyname = this.companyconfigform.controls.pnameofenterprise.value;
      this._companyconfigservice.checkcompany(companyname).subscribe(res => {
        if (res > 0) {
          this._commonService.showWarningMessage('Company Name Already Exists');
          this.companyconfigform.controls.penterprisecode.setValue('');
           this.companyconfigform.controls.pnameofenterprise.setValue('');
          return;
        }
      });
    }
    else {
      this.companyconfigform.controls.penterprisecode.setValue('');
    }
  }
  establishmentChange(value: Date) {
    debugger
    this.dpConfig1.minDate = new Date(value);
    this.companyconfigform.controls.pcommencementdate.setValue('');
  }


  addcontactControls(): FormGroup {
    return this.formbuilder.group({
      pCompanyId: ['0'],
      pRecordId: ['0'],
      pcontactnumber: [''],
      pemailid: [''],
      ppriority: [''],
      ptypeofoperation: [this._commonService.ptypeofoperation]
    })
  }

  addAddressControls(): FormGroup {
    return this.formbuilder.group({
      pCompanyId:[0],
      Addressid: [0],
      addressid:[0],
      addresstype: ['',],
      paddress1: [''],
      paddress2: [''],
      pState: ['',],
      pStateId: [''],
      pDistrict: ['',],
      pDistrictId: [''],
      pcity: [''],
      pCountry: ['',],
      pCountryId: ['',],
      pincode: [''],
      pPinCode:[''],
      priority: [''],
      pPriority:[''],
      pCreatedby: [''],
      ptypeofoperation: [this._commonService.ptypeofoperation],
      longitude: [''],
      latitude: ['']
    })
  }
  getAddressTypeDetails(): void {

    this._contacmasterservice.getAddressTypeDetails(this.contacttype).subscribe(
      (json) => {
debugger;
        if (json != null) {
          this.addressTypeDetails = json;

          //this.addressTypeDetails = json as string
          //this.addressTypeDetails = eval("(" + this.addressTypeDetails + ')');
          //this.addressTypeDetails = this.addressTypeDetails.FT;
        }
      })


  }
  public loadeditdata(companyid) {
    debugger
    this._companyconfigservice.Getcompanycreationdetails(companyid).subscribe(data => {
      debugger
      console.log("get data:", data)
      if (data['pnameofenterprise'] != undefined || data['pnameofenterprise'] != null) {
        this.companyconfigform.controls.ptypeofoperation.setValue('UPDATE')
        this.companyconfigform.controls.pCompanyId.setValue(data['pCompanyId'])
        this.companyconfigform.controls.pRecordId.setValue(data['pRecordId'])
        this.companyconfigform.controls.pnameofenterprise.setValue(data['pnameofenterprise'])
        this.companyconfigform.controls.penterprisecode.setValue(data['penterprisecode'])
        this.companyconfigform.controls.ppancard.setValue(data['ppancard']);
        if (data['pPhoto']!="null"){
          this.croppedImage = "data:image/png;base64," + data['pPhoto'];
          this.companyconfigform.controls.pPhoto.setValue(data['pPhoto']);
          this.companyconfigform.controls.pCompanyimagepath.setValue(data['pCompanyimagepath']);
           //this.fileInput.nativeElement.files[0].name="mouni.jpg";
        }
        else{
          this.croppedImage = this._defaultimage.GetdefaultImage();
          this.companyconfigform.controls.pPhoto.setValue('');
            this.companyconfigform.controls.pCompanyimagepath.setValue('');
        }
          
        this.companyconfigform.controls.pcreatedby.setValue(this._commonService.pCreatedby)
        if (data['pestablishmentdate'] != null && data['pestablishmentdate'] != '') {
          this.companyconfigform.controls.pestablishmentdate.setValue(this._commonService.formatDateFromDDMMYYYY(data['pestablishmentdate']))
        }
        else {
          this.companyconfigform.controls.pestablishmentdate.setValue('')
        }
        if (data['pcommencementdate'] != null && data['pcommencementdate'] != '') {
          this.companyconfigform.controls.pcommencementdate.setValue(this._commonService.formatDateFromDDMMYYYY(data['pcommencementdate']))
        }
        else {
          this.companyconfigform.controls.pcommencementdate.setValue('')
        }

        this.companyconfigform.controls.pcinnumber.setValue(data['pcinnumber'])
        this.companyconfigform.controls.pgstinnumber.setValue(data['pgstinnumber'])
        let enterprise = this.typeofEnterpriseDetails.filter(ent => { return ent.pEnterpriseType == data['ptypeofenterprise'] })
        if (enterprise.length == 0) {
          let aa = data['ptypeofenterprise']
          this.companyconfigform.controls.potherenterprise.setValue(aa);
          this.companyconfigform.controls.ptypeofenterprise.setValue('Other')
          this.showEnterprise = true
        }
        else {
          this.companyconfigform.controls.ptypeofenterprise.setValue(data['ptypeofenterprise'])
        }
        debugger;
        let companyid= this.companyconfigform.controls.pCompanyId.value;
        this.griddata = data['lstCompanyAddressDTO'];
         this.griddata.filter(function(row){
          row.pPinCode=row.pincode;
          row.ptypeofoperation='UPDATE';
          row.pCompanyId=companyid;
        })
        // this.griddata=this.griddata.filter(row=>row.ptypeofoperation='UPDATE')
        // this.griddata=this.griddata.filter(row=>row.pCompanyId=companyid)
        this.getLatitudeLongitude();
        
        this.documentformdetails.gridData = data['lstCompanyDocumentsDTO']
        this.documentformdetails.gridData =this.documentformdetails.gridData.filter(row=>row.ptypeofoperation="UPDATE");
        this.promotorformdetails.addData(data['lstCompanyPromotersDTO']);
          this.promotorformdetails.gridData=this.promotorformdetails.gridData.filter(row=>row.ptypeofoperation="UPDATE")

        if (data['lstCompanyContactDTO'].length > 0) {
          for (let i = 0; i < data['lstCompanyContactDTO'].length; i++) {
            if (data['lstCompanyContactDTO'][i].ppriority == 'PRIMARY') {
              this.companyconfigform.controls.pemailid.setValue(data['lstCompanyContactDTO'][i].pemailid)
              this.companyconfigform.controls.pcontactnumber.setValue(data['lstCompanyContactDTO'][i].pcontactnumber)
              this.companyconfigform.controls.ppriority.setValue(data['lstCompanyContactDTO'][i].ppriority)
              // this.companyconfigform.controls.pPriority.setValue(data['lstCompanyContactDTO'][i].ppriority)
              this.companyconfigform.controls.pRecordId.setValue(data['lstCompanyContactDTO'][i].pRecordId)

            }
            else {
              this.companyconfigform.controls.pemailid2.setValue(data['lstCompanyContactDTO'][i].pemailid)
              if(data['lstCompanyContactDTO'][i].pcontactnumber==0){
                   this.companyconfigform.controls.pAlternativeNo.setValue('');
                // this.companyconfigform.controls.pAlternativeNo.clearValidators();
                // this.companyconfigform.controls.pAlternativeNo.updateValueAndValidity();
              }
              else{
                 this.companyconfigform.controls.pAlternativeNo.setValue(data['lstCompanyContactDTO'][i].pcontactnumber)
              }
              this.companyconfigform.controls.ppriority.setValue(data['lstCompanyContactDTO'][i].ppriority)
              // this.companyconfigform.controls.pPriority.setValue(data['lstCompanyContactDTO'][i].ppriority)
               this.companyconfigvalidations.pAlternativeNo=null;
              this.companyconfigform.controls.pRecordId.setValue(data['lstCompanyContactDTO'][i].pRecordId)

            }
          }
        }
        console.log(this.documentformdetails.gridData)
        console.log(this.promotorformdetails.lstCompanyContactDTO)
      }
    })
  }
  getTypeofEnterprise(): void {

    this._contacmasterservice.getTypeofEnterprise().subscribe(json => {

      //console.log(json)
      if (json != null) {
        this.typeofEnterpriseDetails = json
        
      }
    })


  }

  addresstype(type) {
    let isValid = true;
    debugger
    let addresstype = <FormGroup>this.companyconfigform['controls']['addresstype'];
    if (type == 'GET') {
      addresstype.setValidators(Validators.required);


    }
    else {
      addresstype.clearValidators();
    }
    addresstype.updateValueAndValidity();
    this.companyconfigvalidations = {}
    this.BlurEventAllControll(this.companyconfigform);

  }

  adddata() {
    debugger;
    let isValid = true;
    this.AddressForm = this.addressdetails.addressForm.value;
    this.addresstype('GET');
    if(this.addresscheckValidations(this.companyconfigform, isValid)){
    if (this.addressdetails.checkValidations(this.addressdetails.addressForm, isValid)) {

      debugger
      let Chargescontroladress = <FormArray>this.companyconfigform.controls['lstCompanyAddressDTO'];
      Chargescontroladress.push(this.addAddressControls());
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["pCompanyId"] =  this.companyconfigform.controls['pCompanyId'].value
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["paddress1"] = this.AddressForm['paddress1']
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["paddress2"] = this.AddressForm['paddress2']
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["pcity"] = this.AddressForm['pcity']
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["pState"] = this.AddressForm['pState']
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["pDistrict"] = this.AddressForm['pDistrict']
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["pCountry"] = this.AddressForm['pCountry']
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["pincode"] = this.AddressForm['Pincode']
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["pPinCode"] = this.AddressForm['Pincode']
      this.companyconfigform.value['lstCompanyAddressDTO'][0]['pDistrictId'] = this.AddressForm['pDistrictId']
      this.companyconfigform.value['lstCompanyAddressDTO'][0]['pStateId'] = this.AddressForm['pStateId']
      this.companyconfigform.value['lstCompanyAddressDTO'][0]['pCountryId'] = this.AddressForm['pCountryId']
      this.companyconfigform.value['lstCompanyAddressDTO'][0]['addressid'] = this.companyconfigform.controls['addressid'].value;
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["pCreatedby"] = this.companyconfigform.controls['pcreatedby'].value;
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["ptypeofoperation"] =this.AddressForm['ptypeofoperation'];
      this.companyconfigform.value["lstCompanyAddressDTO"][0]["addresstype"] = this.companyconfigform.controls['addresstype'].value;
      

      if (this.griddata.length == 0) {
         debugger;
        this.companyconfigform.controls['pAddressTypeChk'].setValue(true)
        this.companyconfigform.value["lstCompanyAddressDTO"][0]["priority"] = 'PRIMARY';
        this.griddata=[...this.griddata,...this.companyconfigform.value["lstCompanyAddressDTO"][0]]
        this.companyconfigform.controls['addresstype'].setValue('')
        this.addresstype('SET')
         this.getLatitudeLongitude();
        this.addressdetails.clear();
        
      }
      else {
       debugger
        let addressdata = [];
        addressdata = this.griddata.filter(data => {
          return data.addresstype == this.companyconfigform.controls['addresstype'].value;
        })

        if (addressdata.length == 0) {
          if (this.buttontype == 'Add') {
            debugger;
            
            this.griddata=[...this.griddata,...this.companyconfigform.value["lstCompanyAddressDTO"][0]];
            this.companyconfigform.controls['addresstype'].setValue('')
            this.addressdetails.clear();
            this.addresstype('SET')
          }
          else if (this.buttontype == "Update") {
            debugger;
            this.griddata[this.rowindex]= this.companyconfigform.value["lstCompanyAddressDTO"][0]
           
            this.griddata[this.rowindex].priority = this.companyconfigform.controls.priority.value;
            this.companyconfigform.controls['addresstype'].setValue('')
            this.addressdetails.clear();
            this.addresstype('SET')
            this.rowindex = ''
          }

        }
        else {
          debugger;
          if (this.buttontype == 'Add') {
            this._commonService.showWarningMessage('Address already exists')
          }
          else if (this.buttontype == "Update") {
                this.griddata.splice(this.rowindex, 1);
                this.companyconfigform.value["lstCompanyAddressDTO"][0]["priority"]=this.companyconfigform.controls['priority'].value
            this.griddata=[...this.griddata,... this.companyconfigform.value["lstCompanyAddressDTO"][0]]
            console.log("updatedata",this.griddata)
            console.log("list data",this.companyconfigform.value["lstCompanyAddressDTO"][0])
            let updateddata=this.griddata;
            
            this.companyconfigform.controls['addresstype'].setValue('')
            this.addressdetails.clear();
            this.addresstype('SET')
            this.rowindex = ''
          }

        }

      }
   
    debugger;
    this.getLatitudeLongitude();
    this.buttontype = 'Add'
    this.companyconfigvalidations={}
    //console.log(this.companyconfigform.value)
    let Chargescontroladress1 = <FormArray>this.companyconfigform.controls['lstCompanyAddressDTO'];
    for (let i = Chargescontroladress1.length - 1; i >= 0; i--) {
      Chargescontroladress1.removeAt(i)
    }
      this.addressdetails.addressForm.pcity='';
     this.addressdetails.addressForm.pCountryId='';
     this.addressdetails.addressForm.pStateId='';
     this.addressdetails.addressForm.pDistrictId='';
     this.addressdetails.addressForm.pCountry='';;
     this.addressdetails.addressForm.pState='';
     this.addressdetails.addressForm.pDistrict='';
     this.addressdetails.addressForm.Pincode='';
     this.addresstype('SET')
     //this.addressdetails.addressformErrorMessage={};
        this.companyconfigvalidations={}
 }

    }
     
  }
  testlinks(data, type) {
    debugger
    let str = data
    this.path = data
    this.selectedtype = type;
    this._companyconfigservice.getTitleOnClick(this.selectedtype)
    $('.nav-item a[href="#' + str + '"]').tab('show');
  }
  ShowTitle(title) {
    debugger
    this.selectedtype = title;
    this._companyconfigservice.getTitleOnClick(this.selectedtype)
    this.buttonStatus(title);
  }
  Nextclick() {
    this.Title = this._companyconfigservice.sendTitle()
    if (this.Title == "Basic Information") {
      let str = "documents";
      $('.nav-item a[href="#' + str + '"]').tab('show');
      this.selectedtype = "Documents";
      this._companyconfigservice.getTitleOnClick(this.selectedtype)
      this.buttonStatus(this.selectedtype);

    }
    if (this.Title == "Documents") {
      let str = "promotors";
      $('.nav-item a[href="#' + str + '"]').tab('show');
      this.selectedtype = "Promotors";
      this._companyconfigservice.getTitleOnClick(this.selectedtype)
      this.buttonStatus(this.selectedtype);


    }

  }
 getLatitudeLongitude() {
     debugger
     let arr = [];

     for (let i = 0; i < this.griddata.length; i++) {
       if (this.griddata[i].priority == 'PRIMARY') {
         arr.push(this.griddata[i])
      
   }
    }
     if (arr.length != 0) {
     let geoCodeApiUrl = "http://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address="
         + arr[0].paddress1 + "," + arr[0].paddress2
         + "," + arr[0].pcity + "," + arr[0].pState
         + "," + arr[0].pCountry + "," + arr[0].pincode
         + "&key=AIzaSyAdjvx40arfFIKZTq6bIenG586DP5kjJFw";
       this.http.get(geoCodeApiUrl).subscribe(res => {
         debugger
         let data = res['results'];
        this.addressdetails.addressForm.controls.latitude.setValue(data[0].geometry.location.lat);
         this.addressdetails.addressForm.controls.longitude.setValue(data[0].geometry.location.lng); 
         this.latitude = data[0].geometry.location.lat;
         this.longitude = data[0].geometry.location.lng;
               
       })
     }
     else {
       this.longitude = "";
       this.latitude = "";
     }
   }
  savecompanyconfigform() {
    debugger
    let isValid = true;
    this.addresstype('SET');
    this.companyconfigform.controls.pdatepickerenablestatus.setValue(true)
    if (this.companyconfigform.controls.ptypeofenterprise.value == 'Other' && this.buttonname == 'Update') {
      this.companyconfigform['controls']['ptypeofenterprise'].setValue(this.companyconfigform.controls.potherenterprise.value);
    }
    let enterprise = this.companyconfigform.controls.ptypeofenterprise.value
    let enterpriseid
    this.typeofEnterpriseDetails.filter(function (df) {
      if (df.pEnterpriseType == enterprise) {
        enterpriseid = df.pEnterpriseTypeid;
      }
    });
    debugger;
    if(this.griddata.length==1){
this.griddata[0].latitude=this.latitude;
this.griddata[0].longitude=this.longitude
    }
else{
this.griddata.filter(data=>{
  debugger
      if(data.priority=='PRIMARY'){
        data.longitude=this.longitude;
        data.latitude=this.latitude;
      }
    })
}
    this.companyconfigform.controls.ptypeofenterpriseid.setValue(enterpriseid);
    if (this.checkValidations(this.companyconfigform, isValid)) {
      debugger;

      this.Nextclick()

      const control = <FormArray>this.companyconfigform.controls['lstCompanyContactDTO'];
      control.push(this.addcontactControls());
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][0]['controls']['pemailid'].setValue(this.companyconfigform.controls.pemailid.value);
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][0]['controls']['pcontactnumber'].setValue(this.companyconfigform.controls.pcontactnumber.value);
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][0]['controls']['ppriority'].setValue('PRIMARY');
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][0]['controls']['pRecordId'].setValue(this.companyconfigform.controls.pRecordId.value);
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][0]['controls']['ptypeofoperation'].setValue(this.companyconfigform.controls.ptypeofoperation.value);
       this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][0]['controls']['pCompanyId'].setValue(this.companyconfigform.controls.pCompanyId.value);
      const control1 = <FormArray>this.companyconfigform.controls['lstCompanyContactDTO'];
      control1.push(this.addcontactControls());

      if (this.companyconfigform.controls.pAlternativeNo.value == null || this.companyconfigform.controls.pAlternativeNo.value == '')
        this.companyconfigform.controls.pAlternativeNo.setValue(0);
        this.companyconfigvalidations.pAlternativeNo=null;
        this.companyconfigform.controls.pAlternativeNo.clearValidators();
        this.companyconfigform.controls.pAlternativeNo.updateValueAndValidity();
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][1]['controls']['pemailid'].setValue(this.companyconfigform.controls.pemailid2.value);
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][1]['controls']['pcontactnumber'].setValue(this.companyconfigform.controls.pAlternativeNo.value);
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][1]['controls']['ppriority'].setValue(' ');
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][1]['controls']['pRecordId'].setValue(this.companyconfigform.controls.pRecordId.value);
      this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][1]['controls']['ptypeofoperation'].setValue(this.companyconfigform.controls.ptypeofoperation.value);
        this.companyconfigform['controls']['lstCompanyContactDTO']['controls'][0]['controls']['pCompanyId'].setValue(this.companyconfigform.controls.pCompanyId.value);
      debugger;
      if(this.documentformdetails.deletedrows.length>0){
        if(this.documentformdetails.gridData.length>0){
           this.documentformdetails.gridData=[...this.documentformdetails.gridData,...this.documentformdetails.deletedrows]
        }
        else{
          this.documentformdetails.gridData=[...this.documentformdetails.deletedrows]
        }
       
      }
      this.CompanyContactdocumentsForm = this.documentformdetails.gridData
      this.companyconfigform.value['lstCompanyDocumentsDTO'] = this.CompanyContactdocumentsForm
      if(this.promotorformdetails.deletedrows.length>0){
        if(this.promotorformdetails.lstCompanyContactDTO.length>0){
           this.promotorformdetails.lstCompanyContactDTO=[... this.promotorformdetails.lstCompanyContactDTO,...this.promotorformdetails.deletedrows];
        }
        else{
          this.promotorformdetails.lstCompanyContactDTO=this.promotorformdetails.deletedrows;
        }
      }
      this.CompanyContactpromotorsForm = this.promotorformdetails.lstCompanyContactDTO;
      this.companyconfigform.value['lstCompanyPromotersDTO'] = this.CompanyContactpromotorsForm
      if(this.deletedaddressdetails.length>0){
        this.griddata=[...this.griddata,...this.deletedaddressdetails];
      }
      this.companyconfigform.value['lstCompanyAddressDTO'] = this.griddata
      // console.log(this.companyconfigform.value)
debugger;
      let data = JSON.stringify(this.companyconfigform.value)
      console.log(this.companyconfigform.value)
      if (this.Title == "Promotors") {
        this.disablesavebutton = true;
        this.buttonname = 'Processing'
        this._companyconfigservice.savecompanycreationconfig(data).subscribe(res => {
          console.log(res)
          if (res) {
            debugger
            if (this.companyconfigform.controls.ptypeofoperation.value == "UPDATE") {
              this.showInfoMessage('Updated Successfully')
              this.disablesavebutton = false;
              this.croppedImage = this._defaultimage.GetdefaultImage();
            }
            else {
              this.showInfoMessage('Saved Successfully')
              this.disablesavebutton = false;
              this.croppedImage = this._defaultimage.GetdefaultImage();
            }
            let str = "basicinfo";
            $('.nav-item a[href="#' + str + '"]').tab('show');
            this.selectedtype = "Basic Information";
            this.buttonname = "Next"
            this._companyconfigservice.getTitleOnClick(this.selectedtype)
            this.companyconfigform.reset()
            this.griddata = []
            this.latitude="";
            this.longitude="";
            this.deletedaddressdetails=[];
            this.router.navigate(['/CompanyView']);
            this.companyconfigvalidations = {}
            this.documentformdetails.clear()
            this.promotorformdetails.clear()
          }

        }, (error) => {
          this._commonService.showErrorMessage(error)
          this.disablesavebutton = false;
          if (this.companyconfigform.controls.ptypeofoperation.value == 'UPDATE') {
            this.buttonname = 'Update'
          }
          else {
            this.buttonname = 'Save'
          }

        })
      }


      const contactControl = <FormArray>this.companyconfigform.controls['lstCompanyContactDTO'];
      for (let i = contactControl.length - 1; i >= 0; i--) {
        contactControl.removeAt(i)
      }
      const addressControl = <FormArray>this.companyconfigform.controls['lstCompanyContactDTO'];
      for (let i = addressControl.length - 1; i >= 0; i--) {
        addressControl.removeAt(i)
      }

    }
    else {
      let str = "basicinfo";
      $('.nav-item a[href="#' + str + '"]').tab('show');
      this.selectedtype = "Basic Information";
      this._companyconfigservice.getTitleOnClick(this.selectedtype)
    }
  }
  enterpriseChange() {
    try {

      const control = <FormGroup>this.companyconfigform['controls']['ptypeofenterprise'];
      if (this.companyconfigform.controls.ptypeofenterprise.value == 'Other') {


        this.showEnterprise = true;

      }
      else {
        control.clearValidators();
        this.showEnterprise = false;
      }




    } catch (e) {
      this.showErrorMessage(e);
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
  addresscheckValidations(group: FormGroup, isValid: boolean): boolean {
debugger;
    try {
      Object.keys(group.controls).forEach((key: string) => {
        if (key == 'addresstype')
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
          this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.companyconfigvalidations[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.companyconfigvalidations[key] += errormessage + ' ';
                isValid = false;
              }
            }
          }
        }
      }
    }
    catch (e) {
      //this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }
  getCountryDetails(): void {
    this._contacmasterservice.getCountryDetails().subscribe(json => {
      if (json != null) {
        this.countryDetails = json;
      }
    },
      (error) => {

        this.showErrorMessage(error);
      });
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
  changeAddressPriority(row, rowIndex) {
    debugger;

    this.griddata.filter(data => { data.priority = "" })
    console.log(this.griddata)
    row.priority = 'PRIMARY';
    this.griddata[rowIndex] = row;
    // this.griddata.filter(function(row){
    //             if(row.ptypeofoperation=='old'){
    //               row.ptypeofoperation='UPDATE'
    //              }     
    //            })
    this.getLatitudeLongitude();

  }
  loadImages(EventData: string) {
    this.croppedImage = "data:image/png;base64," + EventData;
    this.companyconfigform['controls']['pPhoto'].setValue(EventData);

  }
  removeHandler(event,row) {
    debugger;
    if(row.ptypeofoperation=='UPDATE'){
      let deleterow:[]=row;
       this.deletedaddressdetails=[...this.deletedaddressdetails,...deleterow];
      this.deletedaddressdetails=this.deletedaddressdetails.filter(row=>row.ptypeofoperation='DELETE');
    }
    this.griddata.splice(event.rowIndex, 1);
    this.griddata=[...this.griddata]
    if (this.griddata.length == 0) {
      this.latitude = "";
      this.longitude = "";
    }
    if(this.griddata.length ==1){
      this.griddata[0].priority = 'PRIMARY';
      this.getLatitudeLongitude();
    }
  }
  showErrorMessage(errormsg: string) {
    this._commonService.showErrorMessage(errormsg);
  }

  showInfoMessage(errormsg: string) {
    this._commonService.showInfoMessage(errormsg);
  }
  showWarningMessage(errormsg: string) {
    this._commonService.showWarningMessage(errormsg)
  }
  ClearAddresstype(){
    debugger;
//this.addresstypeForm.controls.addresstype.setValue('')
    this.addresstypeForm['controls']['newaddresstype'].setValue('');
    this.companyconfigvalidations.newaddresstype=null;

  }
  AddAddressType(){
  debugger;
//this.addresstypeForm.controls.addresstype.setValue('')
    this.addresstypeForm['controls']['newaddresstype'].setValue('');
    this.companyconfigvalidations.newaddresstype=null;
    this.BlurEventAllControll(this.addresstypeForm)
}

  saveaddresstype() {
    debugger
    let isValid: boolean = true;
    this.addresstypeForm['controls']['pAddressType'].setValue(this.addresstypeForm['controls']['newaddresstype'].value)
    this.addresstypeForm['controls']['pContactType'].setValue(this.contacttype);
    this.addresstypeForm['controls']['pCreatedby'].setValue(this._commonService.pCreatedby);
    this.addresstypeForm['controls']['pStatusname'].setValue(this._commonService.pStatusname);
    if(this.checkValidations(this.addresstypeForm,isValid)){
    let data = JSON.stringify(this.addresstypeForm.value)
    this._contacmasterservice.checkAddressType(this.addresstypeForm.controls.pAddressType.value, this.contacttype).subscribe(res => {
      debugger;
      if (res == 0) {
         this.disablesaveadressbutton = true;
      this.saveadressbutton = 'Processing';
        this._contacmasterservice.saveAddressType(data).subscribe(res => {
          debugger;
          $('#addresstypes').modal('hide');
          this.showInfoMessage("Saved Sucessfully");
          this.addresstypeForm['controls']['pAddressType'].setValue('');
          this.getAddressTypeDetails();
          this.disablesaveadressbutton = false
          this.saveadressbutton = 'Save';
        },error=>{
      this.disablesaveadressbutton=false;
      this.saveadressbutton="Save";
      this.showErrorMessage(error);
        })
      }
      else{
        this._commonService.showWarningMessage('Already Exists.');
      }
    },error=>{
      this.disablesaveadressbutton=false;
      this.saveadressbutton="Save";
      this.showErrorMessage(error);
    })
   }
  }
  editHandler(event,row, rowIndex) {
    debugger
    this.rowindex =rowIndex
    this.buttontype = 'Update';
    if(row.ptypeofoperation=='UPDATE' || row.ptypeofoperation=='OLD'){
       row.ptypeofoperation = 'UPDATE';
    }
   
    this.addressdetails.editdata(row, 'Company Creation');
    this.companyconfigform.controls.addresstype.setValue(row.addresstype);
    this.companyconfigform.controls.addressid.setValue(row.addressid);
    this.companyconfigform.controls.priority.setValue(row.priority);
  }
  buttonStatus(title) {
    debugger

    if (title == "Basic Information") {
      this.buttonname = "Next"
    }
    if (title == "Documents") {
      this.buttonname = "Next"
    }
    if (title == "Promotors") {
      if (this.companyconfigform.controls.ptypeofoperation.value == 'UPDATE') {
        this.buttonname = 'Update'
      }
      else {
        this.buttonname = "Save"
      }

    }
  }
  clear() {
    debugger
    this.Title = this._companyconfigservice.sendTitle()
    if (this.Title == "Basic Information") {
       this.companyconfigform.reset();
      //this.addressdetails.clear();
      this.addresstype('SET');  
       this.addressdetails.addressForm.pcity='';
     this.addressdetails.addressForm.pCountryId='';;
     this.addressdetails.addressForm.pStateId='';
     this.addressdetails.addressForm.pDistrictId='';
     this.addressdetails.addressForm.pCountry='';
     this.addressdetails.addressForm.pState='';
     this.addressdetails.addressForm.pDistrict='';
     this.addressdetails.addressForm.Pincode='';
      this.addressdetails.addressformErrorMessage={};
      this.resetFileUploader();
      this.croppedImage = this._defaultimage.GetdefaultImage();
      this.griddata = []
      this.latitude="";
      this.longitude="";
      this.companyconfigvalidations = {}
    }
    if (this.Title == "Documents") {
      this.documentformdetails.clear()
    }
    if (this.Title == "Promotors") {
      this.promotorformdetails.clear()
    }
  }

  // upload and display image
  uploadAndProgress(event: any, files) {
    debugger;
    if (!this.validateFile(event.target.value
    )) {
      this._commonService.showWarningMessage("Upload jpg or png files");
    }
    else {
      let file = event.target.files[0];

      if (event && file) {
       // this.companyconfigform['controls']['uploadfilename'].setValue(file.name);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.imageResponse = {
            name: file.name,
            fileType: "imageResponse",
            contentType: file.type,
            size: file.size,

          };
        };
      }
      let fname = "";
      if (files.length === 0) {
        return;
      }
      var size = 0;
      const formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        size += files[i].size;
        fname = files[i].name
        formData.append(files[i].name, files[i]);
        formData.append('NewFileName', files[i]["name"].split('.').pop());
      }
      size = size / 1024;

      this._commonService.imageUpload(formData).subscribe(data => {
        debugger;
        this.FileName = data;
        if (this.imageResponse)
          this.croppedImage = "data:image/png;base64," + data[0];
        console.log(data[0]);
        console.log(data[1]);
        this.companyconfigform['controls']['pPhoto'].setValue(data[0]);
        this.companyconfigform['controls']['pCompanyimagepath'].setValue(data[1]);
      })
    }
  }

  // File Upload file types validation
  validateFile(fileName) {
    debugger
    if (fileName == undefined || fileName == "") {
      return true
    }
    else {
      var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {

        return true
      }
    }
    return false
  }


}
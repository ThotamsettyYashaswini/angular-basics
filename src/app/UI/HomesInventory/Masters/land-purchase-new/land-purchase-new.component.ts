import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../Services/common.service';
import { AddressComponent } from 'src/app/UI/Common/address/address.component';
import { CompanyconfigDocumentsComponent } from 'src/app/UI/Settings/company-config/companyconfig-documents/companyconfig-documents.component';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BranchconfigService } from 'src/app/Services/Settings/branchconfig.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyconfigService } from 'src/app/Services/Settings/companyconfig.service';
import { format } from 'util';
import { ContacmasterService } from 'src/app/Services/Loans/Masters/contacmaster.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


declare let $: any
@Component({
  selector: 'app-land-purchase-new',
  templateUrl: './land-purchase-new.component.html',
  styles: []
})
export class LandPurchaseNewComponent implements OnInit {
  @ViewChild(AddressComponent, { static: false }) addresscomponent: AddressComponent;
  @ViewChild(CompanyconfigDocumentsComponent, { static: false }) documentformdetails: CompanyconfigDocumentsComponent;
  @ViewChild('auto', { static: false }) auto;
  LandBankform: FormGroup;
  shareon: any;
  Landpurchasedetails = [];
  Landpurchasedsharedetails = []
  Addressdetails = [];
  lstrepresentedby: any;
  LandpurchaseValidationErrors: any
  savebutton = 'Save & Continue';
  RequestUom = 'LAND BANK';
  disablesavebutton = false;
  primaryUomdata: any;
  secondaryUomdata: any;
  landbankidfornavigation: number;
  addressTypes: any;
  Landpurchaseaddressdetails = [];
  Landdocumentdetails = [];
  EditData: any;
  primaryuom: any;
  totallandvalue: number;
  landbankids: any;
  //totaldocumentvaluetotaldocumentvalue: number;
  totalareainysquareyards: string;
  typeofopr: any;
  isShow = true;
  ConvetData: any = [];
  totAreaInSqryds: any;
  disable = false;
  addressDetailsStore: any;
  today = new Date();
  Landdata: any = [];
  latitude: any;
  longitude: any;
  currenttabname: any;
  public map: any = [];
  public totalContions: any;
  companyData: any;
  LandCostperAcre: any = 0;
  searchText: any;
  Sharingdiv = false;
  purchasedshow=false;
  dataSharingdiv = false;
  LandOwnerSharingdata: any = [];
  DeveloperSharingdata: any = [];
  Sharingtempdata: any = [];
  shartype: any;
  hideconversion: boolean = false;
  LanddetailstabDisable: boolean = false;
  addresstabEnabled: boolean = true;
  documentstabsEnabled: boolean = true;
  controlEnabled: boolean = false;
  showClearButton: boolean = true;
  na: boolean = true;
  building: boolean = false;
  inland: boolean = false;
  public landbankdateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  stateDetails: any = [];
  districtDetails: any = [];
  totalAreaDisplay: any = 0;
  totalsubAreaDisplay: any = 0;
  centValue: any;
  landOptions$: any;
  private landDetails: any = [];
  landDataBind: any = [];
  showSuggestionFlag: boolean = true;
  constructor(private _commonservice: CommonService, private fb: FormBuilder, private _LandBankservice: LandBankService, private _branchconfigService: BranchconfigService, private _routes: Router, private _plotcreationservices: PlotcreationService, private http: HttpClient, private _route: ActivatedRoute, private CompanyconfigService: CompanyconfigService, private datepipe: DatePipe, private _contacmasterservice: ContacmasterService) {
    this.landbankdateConfig.containerClass = 'theme-dark-blue';
    this.landbankdateConfig.showWeekNumbers = false;
    //this.landbankdateConfig.maxDate = this.today;
    this.landbankdateConfig.dateInputFormat = 'DD/MM/YYYY';



  }

  ngOnInit() {
    this.LanddetailstabDisable = false;
    this.purchasedshow=true;
    this.addresstabEnabled = true;
    this.documentstabsEnabled = true;
    this.currenttabname = "LandDetails";
    this.showClearButton = true;
    this.hideconversion = false;
    this.totallandvalue = 0;
    this.latitude = '';
    this.longitude = '';
    this.shartype = 'NA';
    this.LandOwnerSharingdata = [];
    this.DeveloperSharingdata = [];
    this.totalContions = '';
    this.Landpurchasedetails = [];
    this.totAreaInSqryds = 0;
    this.LandpurchaseValidationErrors = {};


    this.LandBankform = this.fb.group({
      landpurchasetype: ['Purchased Land', Validators.required],
      nameofland: ['', [Validators.required, Validators.maxLength(75)]],
      //registereddocumentno: ['', [Validators.required, Validators.maxLength(30)]],
      //proceedingno: ['', [Validators.required, Validators.maxLength(30)]],
      totallandvalue: [''],
      totaldocumentvalue: ['', [Validators.required, Validators.maxLength(15)]],
      totalareainysquareyards: [''],
      totalarea: [''],
      ptypeofoperation: ['CREATE'],
      landbankid: ['0'],
      status: [true],
      totallandareainacres: [''],
      registereddocumentno: [''],
      registereddocumentfee: [''],
      addresstype: ['Office'],
      address1: [''],
      address2: [''],
      cityvillage: [''],
      state: [''],
      stateid: [''],
      district: [''],
      districtid: [''],
      pincode: [''],
      companyname: [''],
      otherexpensesfee: [0],
      sro: [''],
      sroloaction: [''],
      northboundary: [''],
      eastboundary: [''],
      westboundary: [''],
      southboundary: [''],
      representedby: [''],
      vendorname: [''],
      //change here
      developBy:[''],

      //end
      representedbyId: [''],
      Purchasedate: [''],
      landvalue: [''],
      pLandDetailsControls: this.addLandDetailsControls(),
      developmentlandshareControls: this.addDevelopmentLandshareControls(),
      pAddressformcontrols: this.addAddressControls(),
      pdocumentformcontrols: this.addDocumentsControls(),
    })
    this.BlurEventAllControll(this.LandBankform);
    this.getUOMdata();
    this.getAddressTypes();
    this.getUOMConversionData();
    this.getLanddata();
    this.getCompanyDetails();
    this.getrepresentedbydetails();
    if (this._route.snapshot.params['id']) {
      let EditLandBankID = atob(this._route.snapshot.params['id']);
      this.LandPurchaseupdateData(EditLandBankID);
      this.showClearButton = false;
    }

    this._contacmasterservice.getSateDetails(1).subscribe(json => {
      this.stateDetails = json;
    })
    debugger;
    this._plotcreationservices.getLanddata().subscribe(data => {
      this.landDetails = data;
    })

    // this.landOptions$ = this.LandBankform.get('nameofland').valueChanges.pipe(
    //   startWith(''),
    //   switchMap(value => this.getLandSuggestions(value))
    // );

    if (this.LandBankform.controls.nameofland.value == '') {

      this.landOptions$ = this.LandBankform.get('nameofland').valueChanges.pipe(
        debounceTime(10),
        distinctUntilChanged(),
        switchMap(value => this.getLandSuggestions(value))

      );
      console.log(this.landOptions$);
    }


  }

  // getLandSuggestions(query: string): Observable<any[]> {
  //   debugger
  //   if (!query) {
  //     return of([]);
  //   }
  //   return of(this.landDetails.filter(land =>
  //     land.nameofland.toLowerCase().includes(query.toLowerCase())
  //   ));
  // }

  getLandSuggestions(query: string): Observable<any[]> {
    debugger;
    // this.landDataBind = [];
    // this.LandBankform.controls.address1.setValue('');
    // this.LandBankform.controls.address2.setValue('');
    // this.LandBankform.controls.cityvillage.setValue('');
    // this.LandBankform.controls.state.setValue('');
    // this.LandBankform.controls.stateid.setValue('');
    // this.LandBankform.controls.district.setValue('');
    // this.LandBankform.controls.districtid.setValue('');
    // this.LandBankform.controls.pincode.setValue('');
    // this.LandBankform.controls.pincode.setValue('');
    let filteredLandDetails = []
    filteredLandDetails = this.landDetails.filter(land =>
      land.nameofland.toLowerCase().includes(query.toLowerCase())
    );
    let aaa = filteredLandDetails;
    console.log(aaa);

    if (aaa.length == 0) {
      this.LandBankform.controls.address1.setValue('');
      this.LandBankform.controls.address2.setValue('');
      this.LandBankform.controls.cityvillage.setValue('');
      this.LandBankform.controls.state.setValue('');
      this.LandBankform.controls.stateid.setValue('');
      this.LandBankform.controls.district.setValue('');
      this.LandBankform.controls.districtid.setValue('');
      this.LandBankform.controls.pincode.setValue('');
      // this.LandBankform.controls.pincode.setValue('');
      this.LandBankform.controls.westboundary.setValue('');
      this.LandBankform.controls.northboundary.setValue('');
      this.LandBankform.controls.southboundary.setValue('');
      this.LandBankform.controls.eastboundary.setValue('');
    }

    return of(filteredLandDetails); // simulate delay for fetching data


  }

  onLandSelected(selectedLand: any): void {
    debugger;
    this.landDataBind = [];
    // this.LandBankform.reset();
    this._plotcreationservices.getLandDetails(selectedLand.nameofland).subscribe(json => {
      this.landDataBind = json;
      this.LandBankform.patchValue({
        address1: this.landDataBind[0].address1,
        address2: this.landDataBind[0].address2,
        cityvillage: this.landDataBind[0].cityvillage,
        state: this.landDataBind[0].state,
        stateid: this.landDataBind[0].stateid,
        district: this.landDataBind[0].district,
        districtid: this.landDataBind[0].districtid,
        pincode: this.landDataBind[0].pincode,
        nameofland: this.landDataBind[0].nameofland,
        northboundary: this.landDataBind[0].northboundary,
        eastboundary: this.landDataBind[0].eastboundary,
        westboundary: this.landDataBind[0].westboundary,
        southboundary: this.landDataBind[0].southboundary,
        //landbankid: this.landDataBind[0].landbankid

      })
      this.getDistrictDetails(this.landDataBind[0].stateid)

    })
  }


  //   onLandSelected(selectedLand: any): void {
  // debugger

  //     this._plotcreationservices.getLandDetails(selectedLand.nameofland).subscribe(json => {
  //       let landData =  json;

  //       this.LandBankform.patchValue({
  //         address1: landData[0].address1,
  //         address2: landData[0].address2,
  //         cityvillage: landData[0].cityvillage,
  //         state: landData[0].state,
  //         stateid: landData[0].stateid,
  //         district: landData[0].district,
  //         districtid: landData[0].districtid,
  //         pincode: landData[0].pincode
  //       })

  //     })


  //   }

  pState_Change(event) {
    debugger;
    const stateid = event.pStateId;
    this.LandBankform.controls.state.setValue(event.pState);
    this.getDistrictDetails(stateid);
  }

  getDistrictDetails(stateid) {
    this._contacmasterservice.getDistrictDetails(stateid).subscribe(json => {
      this.districtDetails = json;
      // this.addressForm.controls.pDistrict.setValidators([Validators.required]);
      // this.addressForm.controls.pDistrict.updateValueAndValidity();
      //  this.addressformErrorMessage.pDistrict=null;





    },
      (error) => {

        this.showErrorMessage(error);
      });
  }
  pDistrict_Change(event: any): void {
    debugger
    this.LandBankform.controls.district.setValue(event.pDistrict);

    // this.addressformErrorMessage.pDistrict=null;
    // if (districtid && districtid != '') {
    //   const districtname = $event.target.options[$event.target.selectedIndex].text;

    //   this.addressForm['controls']['pDistrict'].setValue(districtname);
    // }
    // else {
    //   this.addressForm['controls']['pDistrict'].setValue('');
    // }

  }
  getCompanyDetails() {
    debugger
    // this.CompanyconfigService.GetcompanyView().subscribe(Json => {
    //   this.companyData = Json;

    // })
    this.CompanyconfigService.GetcompanyView1().subscribe(Json => {
      this.companyData = Json;

    })
  }
  LandPurchaseupdateData(landbankid) {
    debugger;
    this._LandBankservice.GetLandPurchaseddetailsDetailed(landbankid).subscribe(Edit => {
      try {
        debugger;
        this.EditData = Edit;
        /**Edit Data Bind To Form */
        //  this.savebutton="Update";
        /**Land Details */
        //let purchasedate = this._commonservice.formatDateFromDDMMYYYY(this.EditData.purchasedate);
        //this.LandBankform.controls.Purchasedate.setValue(this.EditData.purchasedate);
        this.LandBankform.controls.nameofland.setValue(this.EditData.nameofland);
        //this.LandBankform.controls.registereddocumentno.setValue(this.EditData.registereddocumentno);
        // this.LandBankform.controls.proceedingno.setValue(this.EditData.proceedingno);
        this.LandBankform.controls.totallandvalue.setValue(this.EditData.totallandvalue);
        let totdocumentvalue = this._commonservice.currencyformat(this.EditData.totaldocumentvalue);
        this.LandBankform.controls.totaldocumentvalue.setValue(totdocumentvalue);
        this.LandBankform.controls.totalareainysquareyards.setValue(this.EditData.totalareainysquareyards);
        this.LandBankform.controls.totalarea.setValue(this.EditData.totalarea);
        this.LandBankform.controls.status.setValue(this.EditData.status);
        this.LandBankform.controls.ptypeofoperation.setValue(this.EditData.ptypeofoperation);
        this.LandBankform.controls.landbankid.setValue(this.EditData.landbankid);
        this.LandBankform.controls.totallandareainacres.setValue(this.EditData.totallandareainacres);
        this.typeofopr = this.EditData.ptypeofoperation;
        this.Landpurchasedetails = this.EditData['purchasedetailsDTO'];
        this.LandBankform.controls.landpurchasetype.setValue(this.EditData.landpurchasetype);
        this.landbankidfornavigation = this.EditData.landbankid;
        debugger;
        if (this.EditData.landpurchasetype == 'Development Land') {
          this.typeofland(this.EditData.landpurchasetype);
          if (this.EditData.developmentlandshareDTO[0].shareon == 'In Land') {
            this.inland = true;
            this.building = false;
            this.na = false;
          }
          if (this.EditData.developmentlandshareDTO[0].shareon == 'Building') {
            this.inland = false;
            this.building = true;
            this.na = false;
          }
          if (this.EditData.developmentlandshareDTO[0].shareon == 'NA') {
            this.inland = false;
            this.building = false;
            this.na = true;
          }
          this.sharingtype(this.EditData.developmentlandshareDTO[0].shareon);
          this.LandOwnerSharingdata = this.EditData.developmentlandshareDTO.filter(h => h.shareownertype == 'LandOwner');
          this.DeveloperSharingdata = this.EditData.developmentlandshareDTO.filter(h => h.shareownertype == 'Developer');
        }

        this.computelandbankdetails();
        this.LandBankform.controls.landpurchasetype.disable();
        this.controlEnabled = true;
        if (this.EditData['addressDetailsStoreDTO'].length != '0') {


          /**Address*/
          debugger;
          this.addressDetailsStore = this.EditData['addressDetailsStoreDTO'];
          this.addressDetailsStore.filter(row => row.ptypeofoperation = 'UPDATE');
          this.addresscomponent.bindingcompanydataEdit(this.addressDetailsStore);
          this.LandBankform['controls']['pAddressformcontrols']['controls']['propertytype'].setValue(this.addressDetailsStore[0].propertytype)
          this.LandBankform['controls']['pAddressformcontrols']['controls']['propertydetailstransid'].setValue(this.addressDetailsStore[0].propertydetailstransid)
          this.LandBankform['controls']['pAddressformcontrols']['controls']['Addresstype'].setValue(this.addressDetailsStore[0].addresstype)
          this.LandBankform['controls']['pAddressformcontrols']['controls']['ptypeofoperation'].setValue('UPDATE');
          this.LandBankform['controls']['pAddressformcontrols']['controls']['addressid'].setValue(this.addressDetailsStore[0].addressid)

        }


        if (this.EditData['documentStoreDTO'].length != '0') {
          let documentStoreDTO = this.EditData['documentStoreDTO'];
          // this.documentformdetails.
          this.LandBankform['controls']['pdocumentformcontrols']['controls']['documentstoreid'].setValue(documentStoreDTO[0].documentstoreid);
          this.LandBankform['controls']['pdocumentformcontrols']['controls']['typeid'].setValue(documentStoreDTO[0].transactionno);
          this.LandBankform['controls']['pdocumentformcontrols']['controls']['transactionno'].setValue(documentStoreDTO[0].transactionno);
          this.LandBankform['controls']['pdocumentformcontrols']['controls']['status'].setValue(documentStoreDTO[0].status);
          this.LandBankform['controls']['pdocumentformcontrols']['controls']['ptypeofoperation'].setValue(documentStoreDTO[0].ptypeofoperation);
          // this.LandBankform['controls']['pdocumentformcontrols']['controls']['typeid'].setValue(documentStoreDTO[0].typeid);
          for (let index = 0; index < this.EditData['documentStoreDTO'].length; index++) {
            this.EditData['documentStoreDTO'][index]['typeid'] = this.EditData['documentStoreDTO'][index]['transactionno'];
            this.EditData['documentStoreDTO'][index]['propertytype'] = 'Land';
          }
          this.documentformdetails.gridData = documentStoreDTO;
        }


      }
      catch (error) {
        this._commonservice.showErrorMessage(error);
      }
    },
      (error) => {
        this.enableSaveButton();
        this._commonservice.showErrorMessage(error);
      })
  }
  addDevelopmentLandshareControls(): FormGroup {
    return this.fb.group({
      sharedetailsid: [''],
      landbankid: [''],
      shareon: ['NA'],
      shareownertype: [''],
      shareownername: [''],
      sharepercentage: [''],
      createdby: [this._commonservice.pCreatedby],
      pStatusname: [true],
      ptypeofoperation: ['CREATE'],
      status: [true]
    })

  }
  addLandDetailsControls(): FormGroup {
    return this.fb.group({
      //  addressid:[0],
      Purchasedate: [''],
      companyname: [''],
      companyid: [0],
      pEmployeeId: [''],
      pEmployeeName: [''],
      surveyno: ['', [Validators.required, Validators.maxLength(30)]],
      vendorname: [''],
      registereddocumentno: [''],
      //proceedingno: ['', Validators.maxLength(30)],
      registrationfee: [''],
      proceedingno: [''],
      primaryLandareaValue: [''],
      primarylandareauom: ['1'],
      primarylandareauomname: [''],
      secondarylandareavalue: [''],
      secondarylandareauom: [''],
      secondarylandareauomname: [''],
      landvalue: [''],
      northboundary: [''],
      eastboundary: [''],
      westboundary: [''],
      southboundary: [''],
      status: [true],
      ptypeofoperation: ['CREATE'],

    })
  }

  addAddressControls(): FormGroup {
    return this.fb.group({
      propertytype: ['Land'],
      propertydetailstransid: [''],
      Addresstype: ['', Validators.required],
      //  paddresscontrols: this.addresscomponent.addressForm,
      pPriority: [''],
      status: [true],
      addressid: [0],
      ptypeofoperation: ['CREATE']
    })
  }

  addDocumentsControls(): FormGroup {
    return this.fb.group({
      documentstoreid: [''],
      typeid: [0],
      transactionno: [''],
      status: [true],
      ptypeofoperation: ['CREATE']
    })
  }
  getrepresentedbydetails() {
    this._LandBankservice.getrepresentedbydetails().subscribe(data => {
      debugger;
      if (data != null) {
        this.lstrepresentedby = data;
      }
    })
  }
  removeHandler($event, row, rowIndex, group) {
    debugger;
    let count = 0;
    let surveyno = row.surveyno;
    let data = {
      count: count,
      gridData: this.Landpurchasedetails
    }
    //   let deletedetails=this.Landpurchasedetails;
    //   deletedetails=deletedetails.filter(data=>
    //   data.Purchasedate=this.datepipe.transform(data.Purchasedate,'dd/MM/yyyy'))
    //  //
    //  this.Landpurchasedetails=deletedetails.filter(data=>
    //  data.surveyno!=row.surveyno && data.vendorname!=row.vendorname &&(this._commonservice.formatDateFromDDMMYYYY(data.Purchasedate)!=this._commonservice.formatDateFromDDMMYYYY(row.Purchasedate)))
    //  this.Landpurchasedetails=this.Landpurchasedetails.filter(data=>
    //  data.Purchasedate=this._commonservice.formatDateFromDDMMYYYY(row.Purchasedate))
    this.Landpurchasedetails.splice(rowIndex, 1);
    this.Landpurchasedetails = [...this.Landpurchasedetails];
    this.LandOwnerSharingdata = this.LandOwnerSharingdata.filter(h => h.surveyno !== surveyno);
    this.DeveloperSharingdata = this.DeveloperSharingdata.filter(h => h.surveyno !== surveyno);
    if (this.Landpurchasedetails.length > 0) {

      this.computelandbankdetails();

     let totalAreaDisplay = this.Landpurchasedetails.reduce((sum, c) => sum + parseFloat((c.primaryLandareaValue)), 0);

     let totalsubAreaDisplay = this.Landpurchasedetails.reduce((sum, c) => sum + parseFloat((c.secondarylandareavalue)), 0);


      const result = this.convertAcresAndGuntas(totalAreaDisplay, totalsubAreaDisplay);
      console.log(`Converted Area: ${result.acres} acres and ${result.guntas} guntas`);

      this.totalAreaDisplay = result.acres;
      this.totalsubAreaDisplay = result.guntas;

    }
    else {
      this.totalContions = '';
      this.LandBankform.controls.totallandareainacres.setValue(0);
      this.totAreaInSqryds = 0;
      this.LandBankform.controls.totalareainysquareyards.setValue(0);
      this.LandBankform.controls.totalarea.setValue(0);
      this.LandBankform.controls.totaldocumentvalue.setValue(0)
      this.totallandvalue = 0;
      this.hideconversion = false;
      this.totalAreaDisplay = 0;
      this.totalsubAreaDisplay = 0;
    }
  }


  getLanddata() {
    this._plotcreationservices.getLanddata().subscribe(data => {
      debugger;
      this.Landdata = data;
    })
  }

  selectEvent(item) {
    debugger
    this.LandBankform.controls.nameofland.setValue(item.nameofland);
    // return item ? item.nameofland : item;

    this.LandBankform.patchValue({
      sro: item.sro,
      companyname: item.companyname,
      // address1: this.landDataBind[0].address1,
      // address2: this.landDataBind[0].address2,
      // cityvillage: this.landDataBind[0].cityvillage,
      // state: this.landDataBind[0].state,
      // stateid: this.landDataBind[0].stateid,
      // district: this.landDataBind[0].district,
      // districtid: this.landDataBind[0].districtid,
      // pincode: this.landDataBind[0].pincode,
      // nameofland: this.landDataBind[0].nameofland,
      // northboundary: this.landDataBind[0].northboundary,
      // eastboundary: this.landDataBind[0].eastboundary,
      // westboundary: this.landDataBind[0].westboundary,
      // southboundary: this.landDataBind[0].southboundary,
      //landbankid: this.landDataBind[0].landbankid

    })

    // do something with selected item
  }
  getUOMConversionData() {
    this._commonservice.getUOMConversionData().subscribe(data => {
      debugger;
      this.ConvetData = data;
    })
  }
  getUOMdata() {
    this._commonservice.GetUomData(this.RequestUom).subscribe(data => {
      this.primaryUomdata = data;
      this.secondaryUomdata = this.primaryUomdata.filter(function (data) {
        return data.secondarylandareauomname != "Acre";
      });
      //this.secondaryUomdata = this.secondaryUomdata.filter(uomData => uomData.secondarylandareauomname != 'Acer');
      // this.secondaryUomdata = data;
      this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauom'].setValue('1');
      this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauomname'].setValue('Acre');
    })

    // let primarylandareauomid
    // primarylandareauomid = this.secondaryUomdata.filter(item => { item.primarylandareauomname == 'Acer' return item.primarylandareauomid });
    // this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauom'].setValue(primarylandareauomid);
  }

  getAddressTypes() {
    this._branchconfigService.getAddressTypeDetails("").subscribe(data => {
      this.addressTypes = data;
    })
  }
  primaryLandareaValue_change(event) {
    debugger;
    this.LandCostperAcre = 0;
  }
  primaryUom_Change($event: any): void {
    debugger;
    this.primaryuom = $event.target.value;
    const pPrimaryuomid = $event.target.value;
    if (pPrimaryuomid && pPrimaryuomid != '') {
      const primaryuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauomname'].setValue(primaryuomtext);
    }
    else {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauomname'].setValue(' ');
    }

  }
  secondaryUom_Change($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauomname'].setValue(secondaryyuomtext);
    }
    else {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauomname'].setValue('');
    }
    this.Secoundaryvaluechange();
    this.computelandCostperAcre();
  }
  Companyname_Change($event: any): void {
    debugger;
    const companytext = $event.target.value;
    if (companytext && companytext != '') {
      let tempCompanyData = this.companyData.filter(items => items.pCompanyname == companytext);
      const pcompanyid = tempCompanyData[0].pCompanyId;
      const pEstablishmentdate = new Date(tempCompanyData[0].pEstablishmentdate);
      this.LandBankform['controls']['pLandDetailsControls']['controls']['companyname'].setValue(companytext);
      this.LandBankform['controls']['pLandDetailsControls']['controls']['companyid'].setValue(pcompanyid);
    }
    else {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['companyname'].setValue('');
      //this.LandBankform['controls']['pLandDetailsControls']['controls']['companyid'].setValue(0);
    }

  }
  Representedby_Change(event) {
    let employename = event.target.options[event.target.selectedIndex].text;
    this.LandBankform['controls']['pLandDetailsControls']['controls']['pEmployeeName'].setValue(employename);

    this.LandBankform.controls.representedby.setValue(employename);
  }

  computelandCostperAcre() {
    debugger;
    this.LandCostperAcre = 0;
    let landvalue = 0;
    let primaryLandareaValue = 0;
    let secondarylandareavalue = 0;
    let areaConvertionResult = 0;
    primaryLandareaValue = this.LandBankform['controls']['pLandDetailsControls']['controls']['primaryLandareaValue'].value;
    let primarylandareauom = this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauom'].value;
    secondarylandareavalue = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].value;
    let secondarylandareauom = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].value;
    landvalue = this.LandBankform['controls']['pLandDetailsControls']['controls']['landvalue'].value;
    landvalue = parseFloat(landvalue.toString().replace(/,/g, ""));
    if (secondarylandareauom != "") {
      // let secondaryInAcres = this.ConvetData.filter(item => item.fromunitname == secondaryuomname && item.tounitname == 'Acre');
      let areaInConvertions = this.ConvetData.filter(item => item.fromunitofmeasureid == secondarylandareauom && item.tounitofmeasureid == primarylandareauom);
      let areaConvertionValue = Number(areaInConvertions[0]['unitofmeasureconversionvalue']);
      if (secondarylandareavalue != 0) {
        areaConvertionResult = Number(areaConvertionValue) * Number(secondarylandareavalue);
      }
      // else {
      //   areaConvertionResult = Number(areaConvertionValue)
      // }



    }
    areaConvertionResult = Number(areaConvertionResult) + Number(primaryLandareaValue);
    if (areaConvertionResult != 0) {
      this.LandCostperAcre = Number(landvalue / areaConvertionResult).toFixed(2);
    }
    else {
      // this.LandCostperAcre = Number(landvalue * secondarylandareavalue / 100).toFixed(2);
      this.LandCostperAcre = 0;
    }
    if (isNaN(this.LandCostperAcre)) {
      this.LandCostperAcre = 0;
    }
  }



  computelandbankdetails() {
    debugger;
    let total = 0;
    let primaryuomtotal = 0;
    let primaryuomname = "";
    let secondaryuomtotal = 0;
    let secondaryuomname = "";
    let areainsqryards = "";
    let conversionvaluefortotal = 0;
    let unitofmeasureconversionvalue = 0;
    let secunitofmeasureconversionvalue = 0;
    let secondaryInAcresValue = 0;
    if (this.Landpurchasedetails.length > 0) {
      this.isShow = !this.isShow;
      this.Landpurchasedetails.forEach(function (data) {
        let enteredNumber = data.landvalue
        let landvalue = parseFloat(enteredNumber.toString().replace(/,/g, ""));
        total = +total + +landvalue;
        primaryuomtotal = +primaryuomtotal + +data.primaryLandareaValue;

        secondaryuomtotal = +secondaryuomtotal + +data.secondarylandareavalue;
        if (primaryuomname == "") {
          primaryuomname += data.primarylandareauomname;
        }
        if (secondaryuomname == "") {
          secondaryuomname += data.secondarylandareauomname;
        }
      });
      if (primaryuomtotal == 0) {
        areainsqryards = secondaryuomtotal + ' ' + secondaryuomname;
      }
      if (secondaryuomtotal == 0) {
        areainsqryards = primaryuomtotal + ' ' + primaryuomname;
      }
      if (secondaryuomtotal != 0 && primaryuomtotal != 0) {
        areainsqryards = primaryuomtotal + ' ' + primaryuomname + ' ' + secondaryuomtotal + ' ' + secondaryuomname;
      }


      let totalConvertionFilter = this.ConvetData.filter(item => item.fromunitname == primaryuomname && item.tounitname == secondaryuomname);
      if (totalConvertionFilter.length > 0) {
        conversionvaluefortotal = totalConvertionFilter[0]['unitofmeasureconversionvalue'];
        this.totalContions = "1 " + primaryuomname + " = " + conversionvaluefortotal + ' ' + secondaryuomname;
        this.hideconversion = false;
      }
      else {
        this.totalContions = '';
        this.hideconversion = true;
      }



      let areaInSqrYds = this.ConvetData.filter(item => item.fromunitname == primaryuomname && item.tounitname == 'Square Yards');
      if (areaInSqrYds.length > 0)
        unitofmeasureconversionvalue = areaInSqrYds[0]['unitofmeasureconversionvalue'];
      let totprimaryuomtotal = unitofmeasureconversionvalue * primaryuomtotal;
      let totsecondaryuomtotal = 0;
      if (secondaryuomname != 'Square Yards') {
        let secondaryInSqrYds = this.ConvetData.filter(item => item.fromunitname == secondaryuomname && item.tounitname == 'Square Yards');
        if (secondaryInSqrYds.length > 0)
          secunitofmeasureconversionvalue = secondaryInSqrYds[0]['unitofmeasureconversionvalue'];
        totsecondaryuomtotal = secunitofmeasureconversionvalue * secondaryuomtotal;
      } else {
        totsecondaryuomtotal = secondaryuomtotal;
      }
      debugger;
      let secondaryInAcres = this.ConvetData.filter(item => item.fromunitname == secondaryuomname && item.tounitname == 'Acre');
      if (secondaryInAcres.length > 0)
        secondaryInAcresValue = secondaryInAcres[0]['unitofmeasureconversionvalue'];
      let Acerfromcent = secondaryInAcresValue * secondaryuomtotal;
      let totAcer = Acerfromcent + primaryuomtotal;
      this.LandBankform.controls.totallandareainacres.setValue(totAcer);
      let tota = totprimaryuomtotal + totsecondaryuomtotal;
      //this.totAreaInSqryds = tota.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.totAreaInSqryds = this._commonservice.currencyformat(tota);
      this.LandBankform.controls.totalareainysquareyards.setValue(this.totAreaInSqryds);
      this.LandBankform.controls.totalarea.setValue(areainsqryards);
      //let totareaInSqrYds = ;
      //let totsecondaryInSqrYds = ;
      //this.totaldocumentvalue = total;
      this.totallandvalue = total;
      //this.totalarea = areainsqryards;
      total = 0;
      primaryuomtotal = 0;
      primaryuomname = "";
      secondaryuomtotal = 0;
      secondaryuomname = "";
      areainsqryards = "";
    }

  }
  TotalLandCost_change(event) {
    debugger;
    this.LandCostperAcre = 0;
  }
  Secoundaryvaluechange() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].value
    this.centValue = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].value;
    let psecondaryuomid = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].value;
    if (psecondaryuomid == 2) {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(99)]);
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.LandpurchaseValidationErrors.secondarylandareavalue = "Cent Maximum value 99 only";
        return
      }
      else {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].clearValidators();
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(4839)]);
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.LandpurchaseValidationErrors.secondarylandareavalue = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].clearValidators();
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(39)]);
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.LandpurchaseValidationErrors.secondarylandareavalue = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].clearValidators();
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }
    this.LandpurchaseValidationErrors = {};
    this.computelandCostperAcre();

  }

  addLandDetailstogrid() {
    let isLandDetailstogridValid = true;
    debugger
    let psecondaryuomid = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].value;
    let primaryLandareaValue = this.LandBankform['controls']['pLandDetailsControls']['controls']['primaryLandareaValue'].value;
    let secondarylandareavalue = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].value;
    // if (primaryLandareaValue == 0) {
    //   this._commonservice.showWarningMessage('Primary area Should not be zero value...');
    //   return;
    // }
    // if (primaryLandareaValue == "") {
    //   if (primaryLandareaValue == 0) {
    //     this._commonservice.showWarningMessage('Secondary area Should not be zero value...');
    //     return;
    //   }
    // }

    // this.LandBankform.controls.westboundary.setValue('');
    // this.LandBankform.controls.northboundary.setValue('');
    // this.LandBankform.controls.southboundary.setValue('');
    // this.LandBankform.controls.eastboundary.setValue('');

    if (this.LandBankform.controls.westboundary.value == '' || this.LandBankform.controls.northboundary.value == '' || this.LandBankform.controls.southboundary.value == '' || this.LandBankform.controls.eastboundary.value == '') {
      this._commonservice.showWarningMessage('Enter Boundaries');
      return;
    }




    if (primaryLandareaValue == "" && secondarylandareavalue == "") {
      this._commonservice.showWarningMessage('Enter Land Area');
      return;
    }
    else {
      if (secondarylandareavalue != "") {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required])
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].setValidators([Validators.required])
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].updateValueAndValidity();
        this.GetValidationByControl(this.LandBankform, 'secondarylandareauom', true)
        //this.BlurEventAllControll(this.LandBankform)   
        this.setBlurEvent(this.LandBankform, 'secondarylandareavalue');
      } else {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].setValidators(null)
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators(null)
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].updateValueAndValidity();
      }

      if (primaryLandareaValue != "") {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['primaryLandareaValue'].setValidators([Validators.required]);
        this.LandBankform['controls']['pLandDetailsControls']['controls']['primaryLandareaValue'].updateValueAndValidity();
        // this.GetValidationByControl(this.LandBankform,'primaryLandareaValue',true)
        //this.BlurEventAllControll(this.LandBankform) 
        this.setBlurEvent(this.LandBankform, 'primaryLandareaValue');

      }
      else {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['primaryLandareaValue'].setValidators(null);
        this.LandBankform['controls']['pLandDetailsControls']['controls']['primaryLandareaValue'].updateValueAndValidity();

      }
    }
    if (psecondaryuomid == 2) {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(99)]);
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.LandpurchaseValidationErrors.secondarylandareavalue = "Cent Maximum value 99 only";
        return
      }
      else {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].clearValidators();
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(4839)]);
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.LandpurchaseValidationErrors.secondarylandareavalue = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].clearValidators();
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(39)]);
      this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.LandpurchaseValidationErrors.secondarylandareavalue = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].clearValidators();
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }

    const LandDetailstogridcontrols = <FormGroup>this.LandBankform.controls['pLandDetailsControls'];
    isLandDetailstogridValid = this.checkValidations(LandDetailstogridcontrols, isLandDetailstogridValid);

    if (isLandDetailstogridValid == true) {

      if (primaryLandareaValue == 0 && secondarylandareavalue == 0) {
        this._commonservice.showWarningMessage('Land area Should not be zero...');
        return;
      }
      if (this.LandBankform.controls.landvalue.value == '') {
        this._commonservice.showWarningMessage('Total land cost should not be empty...');
        return;
      }
      if (this.LandBankform.controls.landvalue.value == 0) {
        this._commonservice.showWarningMessage('Total land cost should not be zero ...');
        return;
      }
      this.LandBankform.value.pLandDetailsControls.status = true;
      const cname = LandDetailstogridcontrols.controls.companyname.value;
      let vendorname = LandDetailstogridcontrols.controls.vendorname.value;
      let surveyno = LandDetailstogridcontrols.controls.surveyno.value;
      let landbankid = this.LandBankform.controls.landbankid.value;
      let registereddocno = LandDetailstogridcontrols.controls.registereddocumentno.value;
      let proceedingnos = LandDetailstogridcontrols.controls.proceedingno.value;
      let primarylandareauom = LandDetailstogridcontrols.controls.primarylandareauom.value;
      let secondarylandareauom = LandDetailstogridcontrols.controls.secondarylandareauom.value;
      let Purchasedate = LandDetailstogridcontrols.controls.Purchasedate.value;
      LandDetailstogridcontrols.controls.registrationfee.setValue(this.LandBankform.controls.registereddocumentfee.value);
      LandDetailstogridcontrols.controls.pEmployeeId.setValue(this.LandBankform.controls.representedbyId.value);
      LandDetailstogridcontrols.controls.vendorname.setValue(this.LandBankform.controls.vendorname.value);
      // // change here
      // LandDetailstogridcontrols.controls.developBy.setValue(this.LandBankform.controls.developBy.value);
      // //////
      LandDetailstogridcontrols.controls.registereddocumentno.setValue(this.LandBankform.controls.registereddocumentno.value);
      LandDetailstogridcontrols.controls.northboundary.setValue(this.LandBankform.controls.northboundary.value);
      LandDetailstogridcontrols.controls.eastboundary.setValue(this.LandBankform.controls.eastboundary.value);
      LandDetailstogridcontrols.controls.westboundary.setValue(this.LandBankform.controls.westboundary.value);
      LandDetailstogridcontrols.controls.southboundary.setValue(this.LandBankform.controls.southboundary.value);
      LandDetailstogridcontrols.controls.Purchasedate.setValue(this.LandBankform.controls.Purchasedate.value);
      Purchasedate = String(Purchasedate)


      if (primarylandareauom == secondarylandareauom) {
        this._commonservice.showWarningMessage('Select Different Secondary Land');
        return;
      }
      if (secondarylandareauom != '') {
        // this.Landpurchasedetails.filter(function (data) {
        //   if (data.secondarylandareauom != secondarylandareauom || data.secondarylandareauom != 0) {
        //     this._commonservice.showWarningMessage('Select Same Secondary UOM');
        //     return;
        //   }
        // });
        if (this.Landpurchasedetails.some((item) => item.secondarylandareauom != secondarylandareauom && item.secondarylandareauom != 0)) {
          this._commonservice.showWarningMessage('Select Same Secondary UOM');
          return;
        }
      }

      // if (this.Landpurchasedetails.some((item) => item.surveyno == surveyno && item.vendorname == vendorname && item.Purchasedate == Purchasedate)) {
      //   this._commonservice.showWarningMessage('Company Name and Vendor Name Already Exists in Your Selected Date');
      //   return;
      // }

      // if (this.Landpurchasedetails.some((item) => item.surveyno == surveyno && item.vendorname == vendorname && item.Purchasedate == Purchasedate)) {
      //   if (confirm("Do you want to add boundaries to the existing survey no.?")) {

      //     LandDetailstogridcontrols.controls.northboundary.setValue('');
      //     LandDetailstogridcontrols.controls.eastboundary.setValue('');
      // LandDetailstogridcontrols.controls.westboundary.setValue('');
      // LandDetailstogridcontrols.controls.southboundary.setValue('');
      //     // this.LandBankform.controls.nameofland.value;

      //   }
      // }

      // this._LandBankservice.checkLandbankdata("SURVEY NO", surveyno, landbankid).subscribe(res => {
      //   if (res > 0) {
      //     this._commonservice.showWarningMessage('Survey Number Already Exists');
      //     return;
      //   }
      // });
      // if (this.Landpurchasedetails.some((item) => item.surveyno == surveyno)) {
      //   this._commonservice.showWarningMessage('Survey Number Already Exists');
      //   return;
      // }


      // if (this.Landpurchasedetails.some((item) => item.surveyno == surveyno)) {
      //   this._commonservice.showWarningMessage('Survey Number Already Exists');
      //   return;
      // }
      let primaryLandareaValues = this.LandBankform['controls']['pLandDetailsControls']['controls']['primaryLandareaValue'].value;
      if (primaryLandareaValues == '') {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['primaryLandareaValue'].setValue(0);
      }
      let primarylandareauoms = this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauom'].value;
      if (primarylandareauoms == '') {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauom'].setValue(0);
        this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauomname'].setValue('');
      }
      let secondarylandareavalues = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].value;
      if (secondarylandareavalues == '') {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].setValue(0);
      }
      let secondarylandareauoms = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].value;
      if (secondarylandareauoms == '') {
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].setValue(0);
        this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauomname'].setValue('');
      }


      // let Purchasedate = this.LandBankform.controls.Purchasedate.value;
      //  this.LandBankform['controls']['pLandDetailsControls']['controls']['Purchasedate'].setValue(Purchasedate);
      let landvalue = this.LandBankform['controls']['pLandDetailsControls']['controls']['landvalue'].value;
      landvalue = parseFloat(landvalue.toString().replace(/,/g, ""));
      let landvalue1 = this.LandBankform.controls.landvalue.value;
      landvalue1 = parseFloat(landvalue1.toString().replace(/,/g, ""));
      this.LandBankform['controls']['pLandDetailsControls']['controls']['landvalue'].setValue(landvalue1);
      // this.LandBankform.controls.registereddocumentno.setValue(registereddocno);
      // this.LandBankform.controls.proceedingno.setValue(proceedingnos);
      LandDetailstogridcontrols.controls.registrationfee.setValue(this.LandBankform.controls.registereddocumentfee.value);
      this.Landpurchasedetails = [...this.Landpurchasedetails, ...this.LandBankform.value.pLandDetailsControls];

      this.totalAreaDisplay = this.Landpurchasedetails.reduce((sum, item) => sum + Number(item.primaryLandareaValue), 0);

      this.totalsubAreaDisplay = this.Landpurchasedetails.reduce((sum, item) => sum + Number(item.secondarylandareavalue), 0);

      let ownername = this.LandBankform.value.pLandDetailsControls.vendorname;
      let developername = this.LandBankform.value.pLandDetailsControls.companyname;
      let createdby = this._commonservice.pCreatedby;
      let surveynor = this.LandBankform.value.pLandDetailsControls.surveyno;
      // let registereddocno=this.LandBankform.value.pLandDetailsControls.registereddocumentno;
      //let proceedingnos=this.LandBankform.value.pLandDetailsControls.proceedingno;




      let isownersharename = false;
      let isdevelopersharename = false;
      if (this.showClearButton == false) {

        this.Sharingtempdata = ({ shareon: 'NA', shareownertype: 'LandOwner', shareownername: ownername, sharepercentage: 0, createdby: createdby, pStatusname: true, ptypeofoperation: 'UPDATE', status: true, surveyno: surveynor, proceedingno: proceedingnos });

      } else {

        this.Sharingtempdata = ({ shareon: 'NA', shareownertype: 'LandOwner', shareownername: ownername, sharepercentage: 0, createdby: createdby, pStatusname: true, ptypeofoperation: 'CREATE', status: true, surveyno: surveynor, registereddocumentno: registereddocno, proceedingno: proceedingnos });

      }
      for (let i = 0; i < this.LandOwnerSharingdata.length; i++) {
        let gridownername = (this.LandOwnerSharingdata[i].shareownername);
        if (gridownername === ownername) {
          isownersharename = true;
        }
      }

      if (isownersharename == false) {
        this.LandOwnerSharingdata = [...this.LandOwnerSharingdata, ...this.Sharingtempdata];
      }


      if (this.showClearButton == false) {
        this.Sharingtempdata = ({ shareon: 'NA', shareownertype: 'Developer', shareownername: developername, sharepercentage: 0, createdby: createdby, pStatusname: true, ptypeofoperation: 'UPDATE', status: true, surveyno: surveynor, registereddocumentno: registereddocno, proceedingno: proceedingnos });
      } else {
        this.Sharingtempdata = ({ shareon: 'NA', shareownertype: 'Developer', shareownername: developername, sharepercentage: 0, createdby: createdby, pStatusname: true, ptypeofoperation: 'CREATE', status: true, surveyno: surveynor, registereddocumentno: registereddocno, proceedingno: proceedingnos });
      }

      for (let i = 0; i < this.DeveloperSharingdata.length; i++) {
        let griddevelopername = (this.DeveloperSharingdata[i].shareownername);
        if (griddevelopername === developername) {
          isdevelopersharename = true;
        }
      }

      if (isdevelopersharename == false) {

        this.DeveloperSharingdata = [...this.DeveloperSharingdata, ...this.Sharingtempdata];
      }
      debugger;
      this.LandCostperAcre = 0;
      //LandDetailstogridcontrols.controls.companyname.setValue('');
      LandDetailstogridcontrols.controls.surveyno.setValue('');
      //LandDetailstogridcontrols.controls.registereddocumentno.setValue('');
      //LandDetailstogridcontrols.controls.proceedingno.setValue('');
      //LandDetailstogridcontrols.controls.vendorname.setValue('');
      //LandDetailstogridcontrols.controls.pEmployeeId.setValue('');
      LandDetailstogridcontrols.controls.primaryLandareaValue.setValue('');
      LandDetailstogridcontrols.controls.primarylandareauomname.setValue('Acre');
      LandDetailstogridcontrols.controls.secondarylandareavalue.setValue('');
      LandDetailstogridcontrols.controls.secondarylandareauom.setValue('');
      LandDetailstogridcontrols.controls.secondarylandareauomname.setValue('');
      //LandDetailstogridcontrols.controls.Purchasedate.setValue('');
      //LandDetailstogridcontrols.controls.landvalue.setValue('');
      //LandDetailstogridcontrols.controls.registrationfee.setValue('');
      // LandDetailstogridcontrols.controls.northboundary.setValue('');
      // LandDetailstogridcontrols.controls.eastboundary.setValue('');
      // LandDetailstogridcontrols.controls.westboundary.setValue('');
      // LandDetailstogridcontrols.controls.southboundary.setValue('');
      this.LandpurchaseValidationErrors = {}
      this.addLandDetailsControls();
      this.computelandbankdetails();

      //isLandDetailstogridValid = false;
    }

    if (this.totalsubAreaDisplay > 39) {
      debugger;
      // let guntaToAcreConvertion = 40;

      // let divGuntas = this.totalsubAreaDisplay - guntaToAcreConvertion;

      // if(divGuntas < 39){
      //   let addToAcres = this.totalsubAreaDisplay - guntaToAcreConvertion;
      //   let abcGunra = this.totalsubAreaDisplay - addToAcres
      //   let calacres = abcGunra * 0.0247;
      //   console.log(calacres);
      // this.totalAreaDisplay = Math.ceil(this.totalAreaDisplay + calacres);
      // this.totalsubAreaDisplay = this.totalsubAreaDisplay - guntaToAcreConvertion;
      // }


      const result = this.convertAcresAndGuntas(this.totalAreaDisplay, this.totalsubAreaDisplay);
      console.log(`Converted Area: ${result.acres} acres and ${result.guntas} guntas`);

      this.totalAreaDisplay = result.acres;
      this.totalsubAreaDisplay = result.guntas;



    }


  }

  checkSurveyNo() {
    debugger;
    const LandDetailstogridcontrols = <FormGroup>this.LandBankform.controls['pLandDetailsControls'];
    if (this.Landpurchasedetails.some((item) => item.surveyno == LandDetailstogridcontrols.controls.surveyno.value)) {
      if (confirm("Do you want to add boundaries to the existing survey no.?")) {

        LandDetailstogridcontrols.controls.northboundary.setValue('');
        LandDetailstogridcontrols.controls.eastboundary.setValue('');
        LandDetailstogridcontrols.controls.westboundary.setValue('');
        LandDetailstogridcontrols.controls.southboundary.setValue('');
        this.LandBankform.controls.westboundary.setValue('');
        this.LandBankform.controls.northboundary.setValue('');
        this.LandBankform.controls.southboundary.setValue('');
        this.LandBankform.controls.eastboundary.setValue('');
        // this.LandBankform.controls.nameofland.value;

      }
    }
  }


  convertAcresAndGuntas(acres: number, guntas: number): { acres: number, guntas: number } {
    debugger;

    if (this.centValue == '7') {

      const guntasPerAcre = 40;

      // Convert the guntas to acres if it exceeds or equals 40
      if (guntas >= guntasPerAcre) {
        const additionalAcres = Math.floor(guntas / guntasPerAcre); // Number of additional acres
        const remainingGuntas = guntas % guntasPerAcre; // Remaining guntas after conversion

        acres += additionalAcres; // Add additional acres
        guntas = remainingGuntas; // Update the guntas with the remainder
      }

      return { acres, guntas };
    }
    else if(this.centValue == '2') {

      const centsPerAcre = 100;

      // Convert the guntas to acres if it exceeds or equals 40
      if (guntas >= centsPerAcre) {
        const additionalAcres = Math.floor(guntas / centsPerAcre); // Number of additional acres
        const remainingGuntas = guntas % centsPerAcre; // Remaining guntas after conversion

        acres += additionalAcres; // Add additional acres
        guntas = remainingGuntas; // Update the guntas with the remainder
      }

      return { acres, guntas };

    }

    else {

      const centsPerAcre = 4840;

      // Convert the guntas to acres if it exceeds or equals 40
      if (guntas >= centsPerAcre) {
        const additionalAcres = Math.floor(guntas / centsPerAcre); // Number of additional acres
        const remainingGuntas = guntas % centsPerAcre; // Remaining guntas after conversion

        acres += additionalAcres; // Add additional acres
        guntas = remainingGuntas; // Update the guntas with the remainder
      }

      return { acres, guntas };

    }
  }


  clearLandDetailsForm() {
    const LandDetailstogridcontrols = <FormGroup>this.LandBankform.controls['pLandDetailsControls'];
    LandDetailstogridcontrols.controls.companyname.setValue('');
    LandDetailstogridcontrols.controls.surveyno.setValue('');
    LandDetailstogridcontrols.controls.registereddocumentno.setValue('');
    LandDetailstogridcontrols.controls.pLandDetailsControls.setValue('');
    LandDetailstogridcontrols.controls.vendorname.setValue('');
    //change here
    LandDetailstogridcontrols.controls.developBy.setValue('');
    /////
    LandDetailstogridcontrols.controls.primaryLandareaValue.setValue('');
    LandDetailstogridcontrols.controls.primarylandareauom.setValue('1');
    LandDetailstogridcontrols.controls.primarylandareauomname.setValue('Acre');
    LandDetailstogridcontrols.controls.secondarylandareavalue.setValue('');
    LandDetailstogridcontrols.controls.secondarylandareauom.setValue('');
    LandDetailstogridcontrols.controls.secondarylandareauomname.setValue('');
    LandDetailstogridcontrols.controls.landvalue.setValue('');
    LandDetailstogridcontrols.controls.northboundary.setValue('');
    LandDetailstogridcontrols.controls.eastboundary.setValue('');
    LandDetailstogridcontrols.controls.westboundary.setValue('');
    LandDetailstogridcontrols.controls.southboundary.setValue('');
    LandDetailstogridcontrols.controls.Purchasedate.setValue('');
    this.Landpurchasedetails = [];
    this.hideconversion = false;
  }

  validateSaveLandBankFormConfig(tabname) {
    debugger;
    try {
      // let isLandnameCheck = true;
      // let isLandDetailsValid = true;
      // let isLandAddressValid = true;
      // let isLandDocumentsValid = true;
      if (this.currenttabname == 'LandDetails') {
        let landname = this.LandBankform.controls.nameofland.value;
        let landbankid = this.LandBankform.controls.landbankid.value;
        this.showSuggestionFlag = false;

        this._LandBankservice.checkLandbankdata("LAND NAME", landname, landbankid).subscribe(res => {
          if (res > 0) {

            if (confirm("Do you want to add the land with the existing Name ?")) {
              this.LandBankform.controls.nameofland.value;
            }

            else {
              this._commonservice.showWarningMessage('Land Name Already Exists');
              // isLandnameCheck = false;
              this.LandBankform.controls.nameofland.setValue('');
              return;
            }



          }
          // else
          //   isLandnameCheck = true;
        });



        // if (isLandnameCheck == true) {
        //   if (this.Landpurchasedetails.length == 0) {
        //     isLandDetailsValid = false;
        //     this._commonservice.showErrorMessage('Atleast one Land Details are required');
        //     return;
        //   }
        //   if (isLandDetailsValid)
        //     return true;
        //   else
        //     return false;
        // }
      }


    }
    catch (error) {
      this._commonservice.showErrorMessage('Land Bank');
      return false;
    }
  }


  SaveLandDetails() {
    debugger;
    let isvalid = true;
    this.searchText = '';
    // if (this.checkValidations(this.LandBankform, isvalid)) {
    if (this.Landpurchasedetails.length == 0) {
      this._commonservice.showWarningMessage('Atleast one Land Details are required');
      return;
    }
    // let documentvalue = this.LandBankform['controls']['totaldocumentvalue'].value;
    // if (documentvalue != '' && documentvalue != 0 && documentvalue != null) {
    //   documentvalue = documentvalue.toString().replace(/,/g, "");
    // }
    // else {
    //   documentvalue = 0;
    //   this.LandBankform['controls']['totaldocumentvalue'].setValue('');
    //   this._commonservice.showWarningMessage('Total Document Value Must be Greater Than Zero.');
    //   return;
    // }
    // this.LandBankform['controls']['totaldocumentvalue'].setValue(documentvalue);
    // if (this.validateSaveLandBankFormConfig('LandDetails')) {
    if (this.Sharingdiv == true) {
      if (this.shartype == '') {
        this._commonservice.showWarningMessage('Select Sharing Type');
        return;
      } else {
        let LandOwnerShare = 0;
        let DeveloperShare = 0;
        let shartype = this.shartype;
        if (shartype != 'NA') {
          this.LandOwnerSharingdata.filter(function (df) { df.shareon = shartype; });
          this.DeveloperSharingdata.filter(function (df) { df.shareon = shartype; });

          LandOwnerShare = this.LandOwnerSharingdata.reduce((sum, item) => sum + Number(item.sharepercentage), 0);
          DeveloperShare = this.DeveloperSharingdata.reduce((sum, item) => sum + Number(item.sharepercentage), 0);

          let total = Number(DeveloperShare) + Number(LandOwnerShare);
          if (total != 100) {
            this._commonservice.showWarningMessage('Developer share and LandOwner share should be equals 100%');
            return;
          }
        }
      }
    }
    this.disablesavebutton = true;
    this.savebutton = "Processing";
    this.LandBankform['controls']['totallandvalue'].setValue(this.totallandvalue);
    //this.LandBankform['controls']['totaldocumentvalue'].setValue(this.totaldocumentvalue);
    this.LandBankform['controls']['totalareainysquareyards'].setValue(this.totalareainysquareyards);
    this.computelandbankdetails();
    let PurchasedetailsDTO = { PurchasedetailsDTO: this.Landpurchasedetails }
    let AddressDetailsStoreDTO = { AddressDetailsStoreDTO: this.Addressdetails }
    let formdata = [];
    if (this.Sharingdiv == true) {
      let primaryLandValue = this.LandBankform['controls']['pLandDetailsControls']['controls']['primaryLandareaValue'].value;
      let secondarylandvalue = this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareavalue'].value;
      // if(primaryLandValue==""){
      // this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauom'].setValue('');
      // this.LandBankform['controls']['pLandDetailsControls']['controls']['primarylandareauomname'].setValue('');

      // }
      // if(secondarylandvalue==""){
      // this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauom'].setValue('');
      // this.LandBankform['controls']['pLandDetailsControls']['controls']['secondarylandareauomname'].setValue('');
      // }

      let landvalue = this.LandBankform.controls.landvalue.value;
      landvalue = parseFloat(landvalue.toString().replace(/,/g, ""));

      this.LandBankform.controls.landvalue.setValue(landvalue);
      this.LandBankform.controls.totallandvalue.setValue(landvalue);
      this.LandBankform.controls.totaldocumentvalue.setValue(landvalue);

      let rSharingdata = [];
      rSharingdata = [...this.LandOwnerSharingdata, ...this.DeveloperSharingdata];
      let developmentlandshareDTO = { developmentlandshareDTO: rSharingdata };
      let LandDetailstogridcontrols = <FormGroup>this.LandBankform.controls['pLandDetailsControls'];

      // this.LandBankform.controls.registereddocumentno.setValue(LandDetailstogridcontrols.controls.registereddocumentno.value);

      //  this.LandBankform.controls.registereddocumentfee.setValue(LandDetailstogridcontrols.controls.registrationfee.value);

      formdata = Object.assign(this.LandBankform.value, PurchasedetailsDTO, AddressDetailsStoreDTO, developmentlandshareDTO);

    }
    else {
      let LandDetailstogridcontrols = <FormGroup>this.LandBankform.controls['pLandDetailsControls'];
      let landvalue = this.LandBankform.controls.landvalue.value;
      landvalue = parseFloat(landvalue.toString().replace(/,/g, ""));
      //this.LandBankform.controls.registereddocumentno.setValue(LandDetailstogridcontrols.controls.registereddocumentno.value);
      this.LandBankform.controls.landvalue.setValue(landvalue);
      this.LandBankform.controls.totallandvalue.setValue(landvalue);
      this.LandBankform.controls.totaldocumentvalue.setValue(landvalue);
      // this.LandBankform.controls.registereddocumentfee.setValue(LandDetailstogridcontrols.controls.registrationfee.value);
      formdata = Object.assign(this.LandBankform.value, PurchasedetailsDTO, AddressDetailsStoreDTO);

    }
    //let formdata = Object.assign(this.LandBankform.value, PurchasedetailsDTO, AddressDetailsStoreDTO)
    debugger;
    let data = JSON.stringify(formdata);
    console.log(data);


    this._LandBankservice.saveLandbankdetails(data).subscribe(landbankid => {
      try {
        if (landbankid > 0) {
          this.landbankidfornavigation = landbankid[0];
          let data = {
            "propertytype": "Land",
            "status": true,
            "typeid": this.landbankidfornavigation,
            "transactionno": this.landbankidfornavigation
          }
          this._LandBankservice._SetLandpurchasedatatonextTab(data);
          //this._commonservice.showInfoMessage('Land Details Saved Sucessfully');
          this.disablesavebutton = false;
          this.enableSaveButton();
          this.LodLandpurchasedsharedetails();
          this.getLanddata();
          this.LandBankform.controls.landpurchasetype.disable();
          this.controlEnabled = true;
          this.LanddetailstabDisable = true;
          this.addresstabEnabled = false;
          this.documentstabsEnabled = true;
          $('.nav-item a[href="#land-documents"]').tab('show');
          this.currenttabname = "DocumentDetails";
          // this.currenttabname = "AddressDetails";
          window.scrollTo(0, 0);
        }
        else {
          this.enableSaveButton();
        }
      }
      catch (error) {
        this._commonservice.showErrorMessage('Land Bank');
      }
    },
      (error) => {
        this.enableSaveButton();
        this._commonservice.showErrorMessage(error);
      });

    // }
    // else {
    //   this.enableSaveButton();
    // }
    // }
    // else {
    //   this.enableSaveButton();
    // }

  }
  SaveLandAddressDetails() {
    debugger;
    this.searchText = '';
    this.disablesavebutton = true;

    let isvalid = true;
    this.Landpurchaseaddressdetails = [];
    const LandAddressDetails = <FormGroup>this.LandBankform.controls['pAddressformcontrols'];
    this.addresscheckValidations(LandAddressDetails, isvalid)
    if (this.addresscomponent.checkValidations(this.addresscomponent.addressForm, isvalid)) {



      this.LandBankform['controls']['pAddressformcontrols']['controls']['propertydetailstransid'].setValue(this.landbankidfornavigation)
      let temparray = this.LandBankform.controls['pAddressformcontrols'].value;

      let objpAddressType = {
        propertytype: this.LandBankform.controls['pAddressformcontrols']['controls']['propertytype'].value,
        Addresstype: this.LandBankform.controls['pAddressformcontrols']['controls']['Addresstype'].value,
        propertydetailstransid: this.LandBankform.controls['pAddressformcontrols']['controls']['propertydetailstransid'].value,
        status: this.LandBankform.controls['pAddressformcontrols']['controls']['status'].value
      }


      let temparray2 = this.addresscomponent.addressForm.value;


      this.Landpurchaseaddressdetails.push({ ...objpAddressType, ...temparray2 });

      this.Landpurchaseaddressdetails.filter(row => row.addressid = this.LandBankform['controls']['pAddressformcontrols']['controls']['addressid'].value)

      debugger;
      this.savebutton = "Processing";
      let AddressDetailsStoreDTO = { AddressDetailsStoreDTO: this.Landpurchaseaddressdetails }
      let formdata = [];
      formdata = Object.assign(AddressDetailsStoreDTO)
      let data = JSON.stringify(formdata);
      this._LandBankservice.saveLandbankAddressdetails(data).subscribe(json => {
        try {
          if (json) {

            //this._commonservice.showInfoMessage('Land Address Details Saved Sucessfully');
            this.disablesavebutton = false;
            this.enableSaveButton();
            this.LodLandpurchasedsharedetails();
            this.getLanddata();
            // this.Landpurchasedetails=[];
            // this.Landpurchaseaddressdetails=[];
            // this.LandBankform['controls']['totallandvalue'].setValue('');
            // this.LandBankform['controls']['totaldocumentvalue'].setValue('');
            // this.LandBankform['controls']['totalareainysquareyards'].setValue('');
            // this.LandBankform['controls']['ptypeofoperation'].setValue('');
            // this.LandBankform['controls']['landbankid'].setValue('0');
            // this.LandBankform['controls']['status'].setValue(true);
            this.controlEnabled = true;
            this.LanddetailstabDisable = true;
            this.addresstabEnabled = true;
            this.documentstabsEnabled = false;
            $('.nav-item a[href="#land-documents"]').tab('show');
            this.currenttabname = "DocumentDetails";
            window.scrollTo(0, 0);
          }
          else {
            this.enableSaveButton();
          }
        }
        catch (error) {
          this.enableSaveButton();
          this._commonservice.showErrorMessage('Land Bank');
        }
      },
        (error) => {
          this.enableSaveButton();
          this._commonservice.showErrorMessage(error);
        });


    }
    else {
      this.enableSaveButton();
    }

  }


  LodLandpurchasedsharedetails() {
    this._LandBankservice.getLandpurchasedsharedetails(this.landbankidfornavigation).subscribe(data => {
      this.Landpurchasedsharedetails = data;
    })
  }


  SaveLanddocumentDetails() {
    debugger;
    this.searchText = '';
    if (this.documentformdetails.gridData.length > 0) {
      this.disablesavebutton = true;
      this.savebutton = "Processing";
      let isvalid = true;

      if (this.documentformdetails.deletedrows.length > 0) {
        if (this.documentformdetails.gridData.length > 0) {
          this.documentformdetails.gridData = [...this.documentformdetails.gridData, ...this.documentformdetails.deletedrows]
        }
        else {
          this.documentformdetails.gridData = this.documentformdetails.deletedrows;
        }
      }
    }
    else {
      this._commonservice.showWarningMessage('Please Add Atleast One Document To Grid');
      return;
    }
    debugger;
    // this.Landdocumentdetails.push(this.documentformdetails.gridData );
    let DocumentStoreDTO = { DocumentStoreDTO: this.documentformdetails.gridData, typeid: this.LandBankform['controls']['pdocumentformcontrols']['controls']['typeid'].value }
    let formdata = Object.assign(DocumentStoreDTO)
    let data = JSON.stringify(formdata);
    this._LandBankservice.SavedocumentDetails(data).subscribe(json => {

      try {
        if (json) {

          // this._commonservice.showInfoMessage('Documents Saved Sucessfully');
          this.disablesavebutton = false;
          this.enableSaveButton();
          this.LodLandpurchasedsharedetails();
          this.getLanddata();
          if (this._route.snapshot.params['id']) {
            this._routes.navigate(['/LandPurchaseView']);
            this._commonservice.showInfoMessage('Land Details updated Sucessfully');
          } else {
            this._commonservice.showInfoMessage('Land Created');
            this._routes.navigate(['/LandPurchaseView']);

            //$('.nav-item a[href="#land-details"]').tab('show');
            //this.ngOnInit();
          }



        }
        else {
          this.enableSaveButton();
        }
      }
      catch (error) {
        this._commonservice.showErrorMessage('Land Bank');
      }
    },
      (error) => {
        this.enableSaveButton();
        this._commonservice.showErrorMessage(error);
      });

    // else {
    //   this._commonservice.showInfoMessage('Land Created');
    //   this._routes.navigate(['/LandPurchaseView']);
    // }
  }

  getLatitudeLongitude() {
    this.map = [];
    let addressarray = this.addresscomponent.addressForm.value;


    let geoCodeApiUrl = "http://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address="
      + addressarray.paddress1 + "," + addressarray.paddress2
      + "," + addressarray.pcity + "," + addressarray.pState
      + "," + addressarray.pCountry + "," + addressarray.Pincode
      + "&key=AIzaSyAdjvx40arfFIKZTq6bIenG586DP5kjJFw";
    this.http.get(geoCodeApiUrl).subscribe(res => {
      let data = res['results'];
      this.addresscomponent.addressForm.controls.latitude.setValue(data[0].geometry.location.lat);
      this.addresscomponent.addressForm.controls.longitude.setValue(data[0].geometry.location.lng);
      this.latitude = data[0].geometry.location.lat;
      this.longitude = data[0].geometry.location.lng;
      this.map = { lat: this.latitude, lng: this.longitude };
      this.longitude = '';
      this.latitude = '';
    })
  }

  public editLand(dataItem) {
    this._LandBankservice.SetButtonType("Update");
    var myparams = btoa(dataItem);
    this._routes.navigate(['/LandPurchase', { id: myparams }]);
  }

  CreateNewLandDeatils() {
    this._routes.navigate(['/LandPurchase']);
    $('.nav-item a[href="#land-details"]').tab('show');
    this.ngOnInit();
  }

  clearForm() {
    this.LandBankform.reset();
    this.LandBankform.controls.landpurchasetype.setValue('Purchased Land');
    this.Sharingdiv = false;
    this.currenttabname = "LandDetails";
    this.clearLandDetailsForm();
    this.LandOwnerSharingdata = [];
    this.DeveloperSharingdata = [];
    this.totalContions = '';
    this.totallandvalue = 0;
    this.LandpurchaseValidationErrors = {};
  }

  enableSaveButton() {
    this.disablesavebutton = false;
    this.savebutton = "Save & Continue";
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
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
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



  addresscheckValidations(group: FormGroup, isValid: boolean): boolean {
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
  showErrorMessage(errormsg: string) {
    this._commonservice.showErrorMessage(errormsg);
  }
  LandDetailsView(landid) {
    let a = landid;
    this._LandBankservice._SetLandDetailsViewbyid({ value: landid });
    // this._routes.navigate(['/Landdetailsview']);
  }

  typeofland(landtype) {
    if (landtype == 'Development Land') {
      this.Sharingdiv = true;
       this.purchasedshow=false;
    }
    //change here
    else if(landtype=='Purchased Land'){
      this.Sharingdiv = false;
      this.purchasedshow=true;
    }

  }
  onShare(data, $event: any) {
    let rowdara = data;
    let v = $event.target.value;
    rowdara.sharepercentage = v;
  }
  sharingtype(type) {
    this.shartype = type;
    if (type == 'NA') {
      this.dataSharingdiv = false;
    }
    else {
      this.dataSharingdiv = true;
    }
  }

}

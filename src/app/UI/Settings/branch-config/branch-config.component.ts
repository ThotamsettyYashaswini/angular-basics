import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CommonService } from '../../../Services/common.service';
import { BranchconfigService } from '../../../Services/Settings/branchconfig.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AddressComponent } from '../../Common/address/address.component';
import { ContacmasterService } from '../../../Services/Loans/Masters/contacmaster.service';
import { CompanyconfigDocumentsComponent } from '../company-config/companyconfig-documents/companyconfig-documents.component';
import { debug, log } from 'util';
declare let $: any;

@Component({
  selector: 'app-branch-config',
  templateUrl: './branch-config.component.html',
  styles: []
})
export class BranchConfigComponent implements OnInit {
  @ViewChild(AddressComponent, { static: false }) addresscomponent: AddressComponent;
  @ViewChild(CompanyconfigDocumentsComponent, { static: false }) documentformdetails: CompanyconfigDocumentsComponent;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  minDate: Date
  maxDate: Date = new Date();
  BranchConfigvalidators: any;
  griddata: any = []


  branchConfigform: FormGroup;
  addresstypeForm: FormGroup;
  contacttype = "Business Entity"
  buttonname = "Save";

  addressTypes: any;
  addressFormdata: any;
  lstaddressdetails = [];
  bsValue = new Date();
  constructor(private fb: FormBuilder, private _commonservice: CommonService, private _branchconfigService: BranchconfigService, private toastr: ToastrService, private _router: Router, private _contacmasterservice: ContacmasterService) {
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    // this.dpConfig.minDate = new Date();
    this.dpConfig.showWeekNumbers = false;

  }



  ngOnInit() {


    this.getAddressTypes();
    this.BranchConfigvalidators = {};

    this.branchConfigform = this.fb.group({
      pbranchid: [0],
      pbranchname: ['', Validators.required],
      pbranchcode: ['', Validators.required],

      pgstinnumber: [''],
      pcontactnumber: ['', Validators.required],
      pemailid: [''],
      pCreatedby: [this._commonservice.pCreatedby],
      ptypeofoperation: [this._commonservice.ptypeofoperation],
      pAddressType: ['', Validators.required],
      pPriority: [''],
      lstBranchAddressDTO: this.fb.array([]),
      lstBranchDocStoreDTO: this.fb.array([])
    })
    this.loadAddressInitData();
    this.BlurEventAllControll(this.branchConfigform);
    this.getLoadBranchDetails();
  }
  getLoadBranchDetails() {
    debugger
    this._branchconfigService.getBranchDetails().subscribe(data => {

      console.log(data);
      debugger;
      this.branchConfigform.patchValue({
        pbranchname: data.pbranchname ? data.pbranchname : '',
        pbranchcode: data.pbranchcode ? data.pbranchcode : '',
        pestablishmentdate: data.pestablishmentdate,
        pgstinnumber: data.pgstinnumber ? data.pgstinnumber : '',
        pcontactnumber: data.pcontactnumber ? data.pcontactnumber : '',
        pemailid: data.pemailid ? data.pemailid : '',
        ptypeofoperation: 'UPDATE'
       
      })
      this.griddata = data['lstBranchAddressDTO']
      this.documentformdetails.gridData = data['lstBranchDocStoreDTO']
      this.BranchConfigvalidators = {};
      this.BlurEventAllControll(this.branchConfigform);
    })
  }

  loadAddressInitData() {
    this.addresstypeForm = this.fb.group({
      pContactType: [''],
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
    this.addresstypeForm.controls.pContactType.setValue(this.contacttype);
    this.addresstypeForm.controls.pCreatedby.setValue(this._commonservice.pCreatedby);
    console.log("this.addresstypeForm.value : ", this.addresstypeForm.value);

    let data = JSON.stringify(this.addresstypeForm.value);

    this._contacmasterservice.checkAddressType(this.addresstypeForm.controls.pContactType.value, this.addresstypeForm.controls.pAddressType.value).subscribe(res => {

      if (res == 0) {
        this._contacmasterservice.saveAddressType(data).subscribe(response => {
          if (response == true) {

            $('#addresstype').modal('hide');
            this.loadAddressInitData();
            this.getAddressTypes();
          }
          else {
            // this._commonservice.showErrorMessage("Something went wrong from serverside, Please try after sometime!  ");
          }

        })
      }
      else {
        this._commonservice.showWarningMessage("Already Exists");
      }
    });
  }

  getAddressTypes() {
    this._branchconfigService.getAddressTypes().subscribe(data => {
      this.addressTypes = data;
    })
  }

  addAddressDetails() {
    debugger
    let isValid = true;
    this.addressFormdata = this.addresscomponent.addressForm.value;
    this.addresscheckValidations(this.branchConfigform, isValid)
    if (this.addresscomponent.checkValidations(this.addresscomponent.addressForm, isValid)) {

      let objpAddressType = {
        pAddressType: this.branchConfigform.value.pAddressType
      }
      this.branchConfigform.value.lstBranchAddressDTO = [];
      this.branchConfigform.value.lstBranchAddressDTO.push({ ...this.addresscomponent.addressForm.value, ...objpAddressType });

      if (this.griddata.length == 0) {
        this.branchConfigform.value["lstBranchAddressDTO"][0]["pPriority"] = true
        this.griddata = this.branchConfigform.value.lstBranchAddressDTO
        this.addresscomponent.ngOnInit();
      }
      else {
        let count = 0;

        for (let i = 0; i < this.griddata.length; i++) {
          if (objpAddressType.pAddressType == this.griddata[i]['pAddressType']) {
            this._commonservice.showWarningMessage("Already Exists");
            break;
          }
          else {
            count++;
          }
        }
        if (count == this.griddata.length) {
          this.branchConfigform.value["lstBranchAddressDTO"][0]["pPriority"] = false
          this.griddata = [...this.griddata, ...this.branchConfigform.value.lstBranchAddressDTO];
          this.addresscomponent.ngOnInit();
        }

      }
      this.branchConfigform.controls.lstBranchAddressDTO = this.griddata;
    }
  }



  addresscheckValidations(group: FormGroup, isValid: boolean): boolean {
    try {
      Object.keys(group.controls).forEach((key: string) => {
        if (key == 'pAddressType')
          isValid = this.GetValidationByControl(group, key, isValid);
      })
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }

  checkbranchduplicates() {
    let branchid = 0;
    if (this.buttonname == "Save") {

    }

  }

  saveBranchConfigform() {
    debugger
    let isvalid = true;
    console.log("--->", this.branchConfigform.valid)
    if (this.checkValidations(this.branchConfigform, isvalid)) {

      debugger
      this._branchconfigService.checkbranchnameDuplicates(this.branchConfigform.value['pbranchname'], '', 0).subscribe(res => {
        debugger
        if (res == "") {

          this.buttonname = "Processing";
          let formdata = JSON.stringify(this.branchConfigform.value);
          debugger
          this._branchconfigService.saveBranchconfigformdata(formdata).subscribe(value => {

            this.toastr.success("Saved Successfully", 'Success')
            this.buttonname = "Save";

          }, error => {
            this.toastr.error(error, 'Error')
            this.buttonname = "Save";

          })
        }
        else {
          this._commonservice.showWarningMessage(res);
          this.buttonname = "Save";
        }
      }, error => {
        this._commonservice.showErrorMessage("Already Exists");
        this.buttonname = "Save";

      })
    }
  }

  clear() {
    this.branchConfigform.reset();
    this.branchConfigform.controls.pCreatedby.setValue(this._commonservice.pCreatedby)
    this.buttonname = 'Save';
  }

  showErrorMessage(errormsg: string) {
    this._commonservice.showErrorMessage(errormsg);
  }
}

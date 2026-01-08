import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { FIIndividualService } from 'src/app/Services/Loans/Transactions/fiindividual.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-land-purchase-update',
  templateUrl: './land-purchase-update.component.html',
  styles: []
})
export class LandPurchaseUpdateComponent implements OnInit {
  public landbankdateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  updateLandBankForm: FormGroup;
  layoutList: any = [];
  typeOfPropertyList: any = [{ id: 1, type: 'Agriculture' }, { id: 2, type: 'Plots' }];
  isLoading: boolean = false;
  lstrepresentedby: any = [];
  LandpurchaseValidationErrors: any;
  getLandDetails: any;
  landDetailsList: any = [];
  purchaseDate: string;
  editingRowIndex: number | null = null;
  validationErrorIndex: number | null = null;
  surveyNoUpdate: any;
  northBoundaryUpdate: any;
  southBoundaryUpdate: string;
  newSurveyNo: any;
  newNorthBound: string;
  newSouthBound: string;
  newSouthBound1: string;
  southBoundaryUpdate1: any;
  forSaveVillage: any;


  constructor(private fb: FormBuilder, private fIIndividualService: FIIndividualService, private _LandBankservice: LandBankService, private _commonservice: CommonService, private datepipe: DatePipe) {
    this.landbankdateConfig.containerClass = 'theme-dark-blue';
    this.landbankdateConfig.showWeekNumbers = false;
    this.landbankdateConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit() {
    this.updateLandBankForm = this.fb.group({
      typeOfProperty: [''],
      cityvillage: [''],
      layoutName: [''],
      layoutId: [''],
      representedBy: [''],
      representedById: [''],
      vendorName: [''],
      registrationDocumentFee: [0],
      purchasedDate: [''],
      sro: [''],
      sroLocation: [''],
      custodyAt: [''],
      houseNo: [''],
      propertyTaxNo: [''],
      electricityNo: [''],
      googleLocation: [''],
      totalDocumentValue: [''],
      totalLandValue: [0],
      north: [''],
      east: [''],
      south: [''],
      west: [''],
      surveyNo: [''],
      registeredDocumentNo: [''],
      brokerage: [0],
      others: [0],
      revenueVillage: [''],
      othersNarration: [''],
    })
    this.getLandBankDetails();
    this.getrepresentedbydetails();
    this.LandpurchaseValidationErrors = {};

  }

  getLandBankDetails() {
    debugger
    this.fIIndividualService.Getlandbankdertails().subscribe(json => {
      if (json != null) {
        this.layoutList = json;

        this.layoutList = this.layoutList.map(item => ({ ...item, plandbanname: this.toTitleCase(item.plandbanname) })).sort((a, b) => a.plandbanname.localeCompare(b.plandbanname));
      }

    })
  }
  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  layoutName_Change(event) {
    debugger;
    this.updateLandBankForm.controls.layoutId.setValue(event.plandbankid);
    this._LandBankservice.getLandPurchasedDetailsByID(event.plandbankid).subscribe(details => {
      this.getLandDetails = details;
      this.forSaveVillage = details[0].villagename;
      this.updateLandBankForm.controls.cityvillage.setValue(details[0].villagename);
      this.updateLandBankForm.controls.revenueVillage.setValue(details[0].revenuevillage);
      this.updateLandBankForm.controls.layoutName.setValue(details[0].nameofland);
      this.updateLandBankForm.controls.layoutId.setValue(details[0].landbankid);
      this.updateLandBankForm.controls.representedBy.setValue(details[0].representedby);
      this.updateLandBankForm.controls.representedById.setValue(details[0].representedbyid);
      this.updateLandBankForm.controls.vendorName.setValue(details[0].vendorname);
      this.updateLandBankForm.controls.registrationDocumentFee.setValue(this._commonservice.currencyformat(details[0].registrationfee));
      this.updateLandBankForm.controls.purchasedDate.setValue(details[0].purchasedate);
      this.updateLandBankForm.controls.sro.setValue(details[0].sro);
      this.updateLandBankForm.controls.sroLocation.setValue(details[0].sroloaction);
      this.updateLandBankForm.controls.custodyAt.setValue(details[0].custodyat);
      this.updateLandBankForm.controls.houseNo.setValue(details[0].houseno);
      this.updateLandBankForm.controls.propertyTaxNo.setValue(details[0].propertytaxno);
      this.updateLandBankForm.controls.electricityNo.setValue(details[0].electricityno);
      // this.updateLandBankForm.controls.totalDocumentValue.setValue(details[0].totaldocumentvalue);
      this.updateLandBankForm.controls.totalLandValue.setValue(this._commonservice.currencyformat(details[0].landvalue));
      this.updateLandBankForm.controls.north.setValue(details[0].northboundary);
      this.updateLandBankForm.controls.east.setValue(details[0].eastboundary);
      this.updateLandBankForm.controls.south.setValue(details[0].southboundary);
      this.updateLandBankForm.controls.west.setValue(details[0].westboundary);
      this.updateLandBankForm.controls.surveyNo.setValue(details[0].landdetailslist[0].surveyno);
      this.updateLandBankForm.controls.typeOfProperty.setValue(details[0].typeofproperty);
      this.updateLandBankForm.controls.googleLocation.setValue(details[0].googlelocation);
      this.updateLandBankForm.controls.registeredDocumentNo.setValue(details[0].registereddocumentno);
      this.updateLandBankForm.controls.others.setValue(this._commonservice.currencyformat(details[0].others));
      this.updateLandBankForm.controls.othersNarration.setValue(details[0].othersnarration);
      this.updateLandBankForm.controls.brokerage.setValue(this._commonservice.currencyformat(details[0].brokarage));

      let landValue = this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.totalLandValue.value);
      let registrationFee = this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.registrationDocumentFee.value);
      let brokarage = this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.brokerage.value);
      let others = this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.others.value);

      let totalDocValue = this._commonservice.currencyformat(landValue + registrationFee + brokarage + others);

      this.updateLandBankForm.controls.totalDocumentValue.setValue(totalDocValue);


      if (details && details.length > 0 && details[0].landdetailslist) {
        // this.landDetailsList = details[0].landdetailslist;
        this.landDetailsList = details[0].landdetailslist || [];
      } else {
        this.landDetailsList = [];
      }
      let newArray = this.landDetailsList.map(obj => {
        return {
          ...obj,
          northboundaryDup: obj.northboundary,
          southboundaryDup: obj.southboundary,
          surveynoDup: obj.surveyno,
          cityvillage: "",
        };
      });


      this.landDetailsList = newArray;

    })
  }

  calOfDocTotValue() {
    debugger;
    let landValue = this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.totalLandValue.value);
    let registrationFee = this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.registrationDocumentFee.value);
    let brokarage = this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.brokerage.value);
    let others = this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.others.value);

    let totalDocValue = this._commonservice.currencyformat(landValue + registrationFee + brokarage + others);

    this.updateLandBankForm.controls.totalDocumentValue.setValue(totalDocValue);
  }

  getrepresentedbydetails() {
    this._LandBankservice.getrepresentedbydetails().subscribe(data => {
      debugger;
      if (data != null) {
        this.lstrepresentedby = data;
      }
    })
  }

  representedBy_Change(event) {
    this.updateLandBankForm.controls.representedById.setValue(event.representedById);
  }

  ChangeInput(event, dataItem, rowIndex) {
    debugger;
    this.updateLandBankForm.controls.surveyNo.value;
    let i = rowIndex;


    this.landDetailsList[i].surveyno = this.updateLandBankForm.controls.surveyNo.value;
    console.log(this.landDetailsList);

  }

  // onSurveyNoChange(event: any, rowIndex: number) {
  //   debugger;
  //   const newValue = event.target.value;
  //   this.landDetailsList[rowIndex].surveyno = newValue;
  //   this.landDetailsList = [this.landDetailsList[rowIndex]];
  //   // If you want, you can update your form or do validation here
  // }

  onSurveyNoChange(event: Event, rowIndex: number): void {
    debugger
    this.newSurveyNo = (event.target as HTMLInputElement).value.trim();
    this.surveyNoUpdate = this.landDetailsList[rowIndex].surveynoDup;

    if (this.editingRowIndex !== null && this.editingRowIndex !== rowIndex) {
      // Another row is already being edited
      this.validationErrorIndex = rowIndex;
      return;
    }

    // First time edit or same row edit
    this.editingRowIndex = rowIndex;
    this.validationErrorIndex = null;
    if (this.southBoundaryUpdate == this.newSouthBound && this.northBoundaryUpdate == this.newNorthBound && this.surveyNoUpdate == this.newSurveyNo) {
      this.editingRowIndex = null;
      this.validationErrorIndex = null;
    }
    this.landDetailsList[rowIndex].surveyno = this.newSurveyNo;
    this.landDetailsList[rowIndex].status = true;
  }

  onNorthBoundChange(event: Event, rowIndex: number): void {
    debugger
    this.newNorthBound = (event.target as HTMLInputElement).value.trim();
    this.surveyNoUpdate = this.landDetailsList[rowIndex].surveynoDup;
    this.northBoundaryUpdate = this.landDetailsList[rowIndex].northboundaryDup;

    if (this.editingRowIndex !== null && this.editingRowIndex !== rowIndex) {
      // Another row is already being edited
      this.validationErrorIndex = rowIndex;
      return;
    }

    // First time edit or same row edit
    this.editingRowIndex = rowIndex;
    this.validationErrorIndex = null;
    if (this.southBoundaryUpdate == this.newSouthBound && this.northBoundaryUpdate == this.newNorthBound && this.surveyNoUpdate == this.newSurveyNo) {
      this.editingRowIndex = null;
      this.validationErrorIndex = null;
    }
    this.landDetailsList[rowIndex].northboundary = this.newNorthBound;
    this.landDetailsList[rowIndex].status = true;
  }

  onEastBoundChange(event: Event, rowIndex: number): void {
    debugger
    const newEastBound = (event.target as HTMLInputElement).value.trim();
    this.surveyNoUpdate = this.landDetailsList[rowIndex].surveynoDup;
    if (this.editingRowIndex !== null && this.editingRowIndex !== rowIndex) {
      // Another row is already being edited
      this.validationErrorIndex = rowIndex;
      return;
    }

    // First time edit or same row edit
    this.editingRowIndex = rowIndex;
    this.validationErrorIndex = null;
    this.landDetailsList[rowIndex].eastboundary = newEastBound;
    this.landDetailsList[rowIndex].status = true;
  }

  onSouthBoundChange(event: Event, rowIndex: number): void {
    debugger
    this.newSouthBound = (event.target as HTMLInputElement).value.trim();
    this.surveyNoUpdate = this.landDetailsList[rowIndex].surveynoDup;
    this.southBoundaryUpdate = this.landDetailsList[rowIndex].southboundaryDup;

    if (this.editingRowIndex !== null && this.editingRowIndex !== rowIndex) {
      // Another row is already being edited
      this.validationErrorIndex = rowIndex;
      return;
    }

    // First time edit or same row edit
    this.editingRowIndex = rowIndex;
    this.validationErrorIndex = null;
    if (this.southBoundaryUpdate == this.newSouthBound && this.northBoundaryUpdate == this.newNorthBound && this.surveyNoUpdate == this.newSurveyNo) {
      this.editingRowIndex = null;
      this.validationErrorIndex = null;
    }
    this.landDetailsList[rowIndex].southboundary = this.newSouthBound;
    this.landDetailsList[rowIndex].status = true;
  }

  onWestBoundChange(event: Event, rowIndex: number): void {
    debugger
    const newWestBound = (event.target as HTMLInputElement).value.trim();
    this.surveyNoUpdate = this.landDetailsList[rowIndex].surveynoDup;
    if (this.editingRowIndex !== null && this.editingRowIndex !== rowIndex) {
      // Another row is already being edited
      this.validationErrorIndex = rowIndex;
      return;
    }

    // First time edit or same row edit
    this.editingRowIndex = rowIndex;
    this.validationErrorIndex = null;
    this.landDetailsList[rowIndex].westboundary = newWestBound;
    this.landDetailsList[rowIndex].status = true;
  }

  onVillageChange(event: Event, rowIndex: number): void {
    debugger
    this.newSouthBound1 = (event.target as HTMLInputElement).value.trim();
    this.surveyNoUpdate = this.landDetailsList[rowIndex].surveynoDup;
    this.southBoundaryUpdate1 = this.landDetailsList[rowIndex].cityvillage;

    if (this.editingRowIndex !== null && this.editingRowIndex !== rowIndex) {
      // Another row is already being edited
      this.validationErrorIndex = rowIndex;
      return;
    }

    // First time edit or same row edit
    this.editingRowIndex = rowIndex;
    this.validationErrorIndex = null;
    if (this.southBoundaryUpdate == this.newSouthBound && this.northBoundaryUpdate == this.newNorthBound && this.surveyNoUpdate == this.newSurveyNo && this.southBoundaryUpdate1 == this.newSouthBound1) {
      this.editingRowIndex = null;
      this.validationErrorIndex = null;
    }
    this.landDetailsList[rowIndex].cityvillage = this.newSouthBound1;
    this.landDetailsList[rowIndex].status = true;
  }




  updateLandDetails() {
    debugger;
    let landBankkId = this.updateLandBankForm.controls.layoutId.value;
    let surveyNo = this.surveyNoUpdate;
    let documentNo = this.updateLandBankForm.controls.registeredDocumentNo.value;
    let cityvillage = this.updateLandBankForm.controls.cityvillage.value;

    let landDetailsList = this.landDetailsList.filter(obj => obj.status == true);

    if (landDetailsList.length == 0) {
      this._commonservice.showWarningMessage('Please add Village');
      return;
    }

    if (this.updateLandBankForm.controls.cityvillage.value != landDetailsList[0].cityvillage) {
      this._commonservice.showWarningMessage('Village name should be same as document');
      return;
    }

    let newArray = landDetailsList.map(obj => {
      delete obj.documentfilename;
      delete obj.representedby;
      delete obj.areainsqyards;
      delete obj.companyname;
      delete obj.secondarylandareauomid;
      delete obj.totalarea;
      delete obj.nameofland;
      obj.ptypeofoperation = 'UPDATE';

      return obj;

    });



    // const rawDate = this.updateLandBankForm.controls.purchasedDate.value;

    // if (rawDate) {
    //   // Regex to match dd-MM-yyyy (day: 01-31, month: 01-12, year: 4 digits)
    //   const ddMMyyyyRegex = /^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;

    //   if (ddMMyyyyRegex.test(rawDate)) {
    //     // It's in dd-MM-yyyy format, parse manually
    //     const parts = rawDate.split('-');
    //     const jsDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    //     if (!isNaN(jsDate.getTime())) {
    //       this.purchaseDate = this.datepipe.transform(jsDate, 'yyyy/MM/dd');
    //       this.updateLandBankForm.controls.purchasedDate.setValue(this.purchaseDate)
    //       // Use purchaseDate as needed
    //     } else {
    //       console.error('Invalid date value after parsing');
    //     }
    //   } else {
    //     // Not dd-MM-yyyy, try direct Date parsing or other formats
    //     const jsDate = new Date(rawDate);
    //     if (!isNaN(jsDate.getTime())) {
    //       this.purchaseDate = this.datepipe.transform(jsDate, 'yyyy/MM/dd');
    //       this.updateLandBankForm.controls.purchasedDate.setValue(this.purchaseDate)
    //       // Use purchaseDate as needed
    //     } else {
    //       console.error('Invalid date format or value');
    //     }
    //   }
    // } else {
    //   console.error('Date is empty or null');
    // }

    const rawDateInput = this.updateLandBankForm.controls.purchasedDate.value;

    if (rawDateInput) {
      let parsedDate: Date | null = null;

      // ✅ If user picks from <input type="date">, it's already a Date object
      if (rawDateInput instanceof Date) {
        parsedDate = rawDateInput;
      } else if (typeof rawDateInput === 'string') {
        const rawDate = rawDateInput.replace(/\//g, '-'); // Normalize separator
        const formats = [
          {
            regex: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, // dd-MM-yyyy
            parser: (parts: string[]) => new Date(+parts[2], +parts[1] - 1, +parts[0]),
            getDay: (parts: string[]) => +parts[0],
            getMonth: (parts: string[]) => +parts[1] - 1
          },
          {
            regex: /^\d{4}-(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])$/, // yyyy-dd-MM
            parser: (parts: string[]) => new Date(+parts[0], +parts[2] - 1, +parts[1]),
            getDay: (parts: string[]) => +parts[1],
            getMonth: (parts: string[]) => +parts[2] - 1
          },
          {
            regex: /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/, // MM-dd-yyyy
            parser: (parts: string[]) => new Date(+parts[2], +parts[0] - 1, +parts[1]),
            getDay: (parts: string[]) => +parts[1],
            getMonth: (parts: string[]) => +parts[0] - 1
          }
        ];

        for (const format of formats) {
          if (format.regex.test(rawDate)) {
            const parts = rawDate.split('-');
            const date = format.parser(parts);

            if (
              !isNaN(date.getTime()) &&
              date.getDate() === format.getDay(parts) &&
              date.getMonth() === format.getMonth(parts)
            ) {
              parsedDate = date;
              break;
            }
          }
        }
      }

      // ✅ Finally, format and set the parsed date
      if (parsedDate) {
        this.purchaseDate = this.datepipe.transform(parsedDate, 'yyyy/MM/dd');
        this.updateLandBankForm.controls.purchasedDate.setValue(this.purchaseDate);
      } else {
        console.error('Invalid date format or value. Accepted: dd-MM-yyyy, yyyy-dd-MM, MM-dd-yyyy, or native Date object');
      }

    } else {
      console.error('Date is empty or null');
    }


    // const inputDate = this.updateLandBankForm.controls.purchasedDate.value;
    // const parts = inputDate.split('/'); // ["30", "06", "2010"]
    // const jsDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);

    // const formattedDate = this.datepipe.transform(jsDate, 'yyyy-MM-dd');


    let data = {
      "landpurchasedetailsid": 0,
      "landbankid": this.updateLandBankForm.controls.layoutId.value,
      "purchasedate": this.purchaseDate,
      // "landpurchasetype": this.updateLandBankForm.controls.layoutId.value,
      "representedbyid": this.updateLandBankForm.controls.representedById.value,
      "representedby": this.updateLandBankForm.controls.representedBy.value,
      "nameofland": this.updateLandBankForm.controls.layoutName.value,
      // "companyname": this.updateLandBankForm.controls.vendorName.value,
      "sroloaction": this.updateLandBankForm.controls.sroLocation.value,
      "custodyat": this.updateLandBankForm.controls.custodyAt.value,
      "houseno": this.updateLandBankForm.controls.houseNo.value,
      "propertytaxno": this.updateLandBankForm.controls.propertyTaxNo.value,
      "electricityno": this.updateLandBankForm.controls.electricityNo.value,
      "googlelocation": this.updateLandBankForm.controls.googleLocation.value,
      "typeofproperty": this.updateLandBankForm.controls.typeOfProperty.value,
      "sro": this.updateLandBankForm.controls.sro.value,
      // "companyid": 0,
      // "surveyno": this.updateLandBankForm.controls.layoutId.value,
      "vendorname": this.updateLandBankForm.controls.vendorName.value,
      "villagename": this.updateLandBankForm.controls.cityvillage.value,

      "registereddocumentno": this.updateLandBankForm.controls.registeredDocumentNo.value,
      "registrationfee": this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.registrationDocumentFee.value),
      // "proceedingno": this.updateLandBankForm.controls.layoutId.value,
      "landvalue": this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.totalLandValue.value),
      // "totallandareainacres": 0,
      // "totalareainysquareyards": 0,
      "totaldocumentvalue": this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.totalDocumentValue.value),
      "northboundary": this.updateLandBankForm.controls.north.value,
      "eastboundary": this.updateLandBankForm.controls.east.value,
      "westboundary": this.updateLandBankForm.controls.west.value,
      "southboundary": this.updateLandBankForm.controls.south.value,
      "brokarage": this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.brokerage.value),
      "others": this._commonservice.removeCommasForEntredNumber(this.updateLandBankForm.controls.others.value),
      "othersnarration": this.updateLandBankForm.controls.othersNarration.value,
      "revenuevillage": this.updateLandBankForm.controls.revenueVillage.value,
      // "address1": this.updateLandBankForm.controls.layoutId.value,
      // "address2": this.updateLandBankForm.controls.layoutId.value,
      // "totallandareatodisplay": this.updateLandBankForm.controls.layoutId.value,
      // "availableareatodisplay": this.updateLandBankForm.controls.layoutId.value,
      // "consumedareatodisplay": this.updateLandBankForm.controls.layoutId.value,
      // "primaryavailablearea": 0,
      // "secondaryavailablearea": 0,
      // "availablearea": 0,
      // "landsharepercentage": 0,
      // "totallandareainacrestodisplay": this.updateLandBankForm.controls.layoutId.value,
      // "consumedareaINACRES": this.updateLandBankForm.controls.layoutId.value,
      // "availableareaINACRES": this.updateLandBankForm.controls.layoutId.value,
      // "availableareaINACRESvalue": 0,
      "landdetailslist": newArray,

      "createdby": this._commonservice.pCreatedby,
      "modifiedby": this._commonservice.pCreatedby,
      "pCreatedby": this._commonservice.pCreatedby,
      "pModifiedby": this._commonservice.pCreatedby,
      "ptypeofoperation": "UPDATE"
    }
    this._LandBankservice.updateLandBank(landBankkId, surveyNo, documentNo, this.forSaveVillage, data).subscribe(resp => {
      this._commonservice.showInfoMessage('Updated Successfully');
      this.clearForm();

    })
  }
  clearForm() {
    this.landDetailsList = [];
    this.updateLandBankForm.reset();
    this.editingRowIndex = null;

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


}

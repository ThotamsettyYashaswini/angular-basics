import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
declare let $: any;
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
@Component({
  selector: 'app-allocating-conversion-details',
  templateUrl: './allocating-conversion-details.component.html',
  styles: []
})
export class AllocatingConversionDetailsComponent implements OnInit {
  savebutton: any = 'Save';
  mutationDetailsForm: FormGroup;
  mutationAddToGridForm: FormGroup;
  mutationAllocatingForm: FormGroup;
  public ProjectLaunchdateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  PlotsLayoutsValidationErrors: any;
  public headerCells: any = {
    textAlign: 'center'
  };
  public pageSize = 10;
  public columns: Array<object>;

  public gridState: State = {
    sort: [],
    take: 10
  };
  addGridData: any = [];
  buttonName: any = 'Add';
  RequestUom = 'LAND BANK';
  primaryUomdata: any = [];
  secondaryUomdata: any = [];
  primaryuom: any;
  LandCostperAcre: number;
  centValue: any;
  landDetailedList: any = [];
  primaryUomdataDharani: any = [];
  secondaryUomdataDharani: any = [];
  total: string;
  totalDharani: string;
  centValueDharani: any;

  // grandTotalArea = 0;
  // grandTotalDharaniArea = 0;
  // grandTotalDharani = 0;

  grandTotalPrimaryArea = 0;
  grandTotalSecondaryArea = 0;
  grandTotalPTotal = 0;
  grandTotalDharaniArea = 0;
  grandTotalDharaniSubArea = 0;
  grandTotalDharaniTotal = 0;
  extentsData: any = [];
  totalExtent: any;
  totalArea: any;
  totalAreaDharani: any;
  landVillage: any;
  landSurveyNo: any;
  totalExtentInAcres: any = 0;
  totalExtentInSquareYards: any = 0;
  extentInSquareYards: any = 0;
  extentInAcres: any = 0;
  totalAreaInSquareYards: any;
  totalAreaDharaniInSquareYards: any;

  proceedingNoData: any = [];
  surveyData: any = [];
  mutationDetailsList: any = [];
  proceedingNos: any;
  mutationDocumentsList: any = [];
  finalSaveAllocatingMutal: any = [];
  differenceLandInSqYards: number;
  differenceinarea: any;
  totalDiffInAcre: any;
  squareYards:any = 'Sq.yds'


  constructor(private fb: FormBuilder, private router: Router, private _commonservice: CommonService, private _plotcreationservices: PlotcreationService) {
    this.ProjectLaunchdateConfig.containerClass = 'theme-dark-blue';
    this.ProjectLaunchdateConfig.showWeekNumbers = false;
    this.ProjectLaunchdateConfig.maxDate = new Date();
    this.ProjectLaunchdateConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit(): void {
    debugger;

    this.mutationAllocatingForm = this.fb.group({
      proceedingNo: ['', Validators.required]
    })

    this.mutationAddToGridForm = this.fb.group({
      primaryLandareaValue: [''],
      primarylandareauomname: [''],
      primarylandareauom: [''],
      secondarylandareauomname: [''],
      secondarylandareavalue: [''],
      secondarylandareauom: ['']

    })

    this.getUOMdata();


    this.PlotsLayoutsValidationErrors = {};
    this.BlurEventAllControll(this.mutationAllocatingForm);
    this.BlurEventAllControll(this.mutationAddToGridForm);

    this.getProceedingNo();

  }

  getProceedingNo() {
    debugger;
    this._plotcreationservices.Getmutationproceedingnos().subscribe(json => {
      this.proceedingNoData = json;
    })
  }

  proceedingNoChange(event) {
    debugger;
    // this.mutationAllocatingForm.controls.surveyNo.setValue('');
    // this.PlotsLayoutsValidationErrors.surveyNo = '';
    this.mutationDetailsList = [];
    this.mutationDocumentsList = [];
    this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauomname.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauom.setValue('');

    // this._plotcreationservices.getSurveyNo(event.pproceedingno).subscribe(result => {
    //   this.surveyData = result;
    // })

    this.proceedingNos = event.pproceedingno
    this._plotcreationservices.bindConvertion(event.pproceedingno, event.pconvertionid).subscribe(res => {
      this.mutationDetailsList = res;
      // this.mutationDetailsList = this.mutationDetailsList.map(obj => {

      // if(obj.psubsurveyno !=''){
      //   obj.surveyNoWithCon = obj.psurveyno + '/' + obj.psubsurveyno ;
      // }
      // else{
      //   obj.surveyNoWithCon = obj.psurveyno;
      // }


      //   return obj;
      // });
    })
  }

  selectSurvey(dataList) {
    debugger;
    this.mutationDocumentsList = [];
    this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauomname.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauom.setValue('');
    this._plotcreationservices.GetConvertiondocuments(dataList.pproceedingno, dataList.psurveyno, dataList.pconvertionid).subscribe(result => {
      this.mutationDocumentsList = result;

      this.mutationDocumentsList = this.mutationDocumentsList.map(obj => {
        obj.pprimaryconvertionlandarea = 0;
        obj.pprimaryconvertionlandareaValueUOM = '';
        obj.psecondaryconvertionlandarea = 0;
        obj.psecondaryconvertionlandareauomname = '';

        obj.ptotalconvertionlandareainacres = '0 Acre';
        obj.ptotalconvertionlandareainsqyds = 0;
        obj.ptypeofoperation = 'CREATE';
        obj.pcreatedby = this._commonservice.pCreatedby;

        return obj;
      });
    })

  }


  getUOMdata() {
    this._commonservice.GetUomData(this.RequestUom).subscribe(data => {
      this.primaryUomdata = data;
      this.secondaryUomdata = this.primaryUomdata.filter(function (data) {
        return data.secondarylandareauomname != "Acre";
      });

      this.mutationAddToGridForm['controls']['primarylandareauom'].setValue('1');
      this.mutationAddToGridForm['controls']['primarylandareauomname'].setValue('Acre');
    })


  }

  primaryUom_Change($event: any): void {
    debugger;
    this.primaryuom = $event.target.value;
    const pPrimaryuomid = $event.target.value;
    if (pPrimaryuomid && pPrimaryuomid != '') {
      const primaryuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.mutationAddToGridForm['controls']['primarylandareauomname'].setValue(primaryuomtext);
    }
    else {
      this.mutationAddToGridForm['controls']['primarylandareauomname'].setValue(' ');
    }

  }

  secondaryUom_Change($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.mutationAddToGridForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.mutationAddToGridForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.mutationAddToGridForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.mutationAddToGridForm['controls']['secondarylandareauomname'].setValue(secondaryyuomtext);
    }
    else {
      this.mutationAddToGridForm['controls']['secondarylandareauomname'].setValue('');
    }
    this.Secoundaryvaluechange();
    //this.computelandCostperAcre();
    this.totalLandCalc()
  }

  Secoundaryvaluechange() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.mutationAddToGridForm['controls']['secondarylandareavalue'].value
    this.centValue = this.mutationAddToGridForm['controls']['secondarylandareauom'].value;
    let psecondaryuomid = this.mutationAddToGridForm['controls']['secondarylandareauom'].value;
    if (psecondaryuomid == 2) {
      this.mutationAddToGridForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(99)]);
      this.mutationAddToGridForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalue = "Cent Maximum value 99 only";
        return
      }
      else {
        this.mutationAddToGridForm['controls']['secondarylandareavalue'].clearValidators();
        this.mutationAddToGridForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.mutationAddToGridForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(4839)]);
      this.mutationAddToGridForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalue = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.mutationAddToGridForm['controls']['secondarylandareavalue'].clearValidators();
        this.mutationAddToGridForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.mutationAddToGridForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(39)]);
      this.mutationAddToGridForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalue = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.mutationAddToGridForm['controls']['secondarylandareavalue'].clearValidators();
        this.mutationAddToGridForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }

  // 



  ChangeInput(event, dataItem, rowIndex) {
    debugger;
    let i = rowIndex;

    this.totalLandCalc();

    this.mutationDocumentsList[i].pprimaryconvertionlandarea = this.mutationAddToGridForm.controls.primaryLandareaValue.value;

    this.mutationDocumentsList[i].pprimaryconvertionlandareaValueUOM = this.mutationAddToGridForm.controls.primarylandareauomname.value;

    this.mutationDocumentsList[i].psecondaryconvertionlandarea = this.mutationAddToGridForm.controls.secondarylandareavalue.value;
    this.mutationDocumentsList[i].psecondaryconvertionlandareauomname = this.mutationAddToGridForm.controls.secondarylandareauomname.value;

    this.mutationDocumentsList[i].ptotalconvertionlandareainacres = this.totalArea;

    this.mutationDocumentsList[i].ptotalconvertionlandareainsqyds = this.totalAreaInSquareYards;

    this.mutationDocumentsList[i].ptotalmutationlandareainsqyds = this.totalAreaInSquareYards;

    let totalLandAreaInSqYards = this.mutationDocumentsList[i].ptotallandareainsqyards;

    let totalLandAreaInSqYardsAfter = totalLandAreaInSqYards - this.totalAreaInSquareYards;

    console.log(totalLandAreaInSqYardsAfter);

    this.differenceLandInSqYards = totalLandAreaInSqYards - this.totalAreaInSquareYards;

    this.differenceinarea = this.convertAll(this.differenceLandInSqYards);

    this.totalDiffInAcre = this.differenceinarea['acres'] + ' ' + 'Acres' + ' ' + this.differenceinarea['guntas'] + ' ' + 'Guntas';

    this.mutationDocumentsList[i].pdifferenceLandInSqYards = this.differenceLandInSqYards;
    this.mutationDocumentsList[i].pdifferenceLandInAcres = this.totalDiffInAcre;

    console.log(this.mutationDocumentsList);


  }

  convertAll(squareYards: number) {
    debugger
    let secondarylandareauomname = this.mutationAddToGridForm.controls.secondarylandareauomname.value;


    if (secondarylandareauomname == 'Cent') {
      const acres = squareYards / 4840;
      const wholeAcres = Math.floor(acres);
      const cents = Math.round((acres - wholeAcres) * 100);

      return {
        acres: wholeAcres,
        cents: cents
      };
    }

    if (secondarylandareauomname == 'Guntas') {
      const acres = squareYards / 4840;
      const wholeAcres = Math.floor(acres);
      const remainingAcres = acres - wholeAcres;
      const guntas = Math.round(remainingAcres * 40);

      return {
        acres: wholeAcres,
        guntas: guntas
      };
    }

    if (secondarylandareauomname == 'Square Yards') {
      const acres = squareYards / 4840;
      const wholeAcres = Math.floor(acres);
      const remainingSquareYards = squareYards % 4840;

      return {
        acres: wholeAcres,
        squareYards: remainingSquareYards
      };
    }
    else {
      return squareYards / 4840;
    }

  }

  totalLandCalc() {
    debugger;
    let primaryLandareaValue = +this.mutationAddToGridForm.controls.primaryLandareaValue.value;
    let psecondarylandarea = +this.mutationAddToGridForm.controls.secondarylandareavalue.value;
    let primarylandareauomname = this.mutationAddToGridForm.controls.primarylandareauomname.value;
    let secondarylandareauomname = this.mutationAddToGridForm.controls.secondarylandareauomname.value;
    this.totalArea = primaryLandareaValue + ' ' + primarylandareauomname + ' ' + psecondarylandarea + ' ' + secondarylandareauomname;

    if (secondarylandareauomname == 'Guntas') {
      let areaToSquareYards = primaryLandareaValue * 4840;
      let guntasToSquareYards = psecondarylandarea * 121;
      this.totalAreaInSquareYards = areaToSquareYards + guntasToSquareYards;

    }
    else if (secondarylandareauomname == 'Cent') {
      let areaToSquareYardss = primaryLandareaValue * 4840;
      let centToSquareYards = psecondarylandarea * 48.4;
      this.totalAreaInSquareYards = areaToSquareYardss + centToSquareYards;

    }
    else {
      let areaToSquareYardss = primaryLandareaValue * 4840;
      this.totalAreaInSquareYards = areaToSquareYardss + psecondarylandarea;


    }

  }





  saveConvertionDocument() {
    debugger;

    if (this.mutationDetailsList.length == 0) {
      this._commonservice.showWarningMessage('No Data To Save');
      return;
    }
    if (this.mutationDocumentsList.length == 0) {
      this._commonservice.showWarningMessage('No Data To Save');
      return;
    }

    const hasInvalidDoc = this.mutationDocumentsList.some(doc => {
      return (
        (doc.pprimaryconvertionlandarea == 0 || doc.pprimaryconvertionlandarea === "0") &&
        (doc.psecondaryconvertionlandarea == 0 || doc.psecondaryconvertionlandarea === "0") &&
        doc.pprimaryconvertionlandareaValueUOM === '' &&
        doc.psecondaryconvertionlandareauomname === ''
      );
    });

    if (hasInvalidDoc) {
      this._commonservice.showWarningMessage('Invalid conversion document found. Please check land area and units.');
      return;
    }

    let isvalid = true;
    let data = {
      "convertionDocumentDetailslist": this.mutationDocumentsList
    }
    console.log(JSON.stringify(data));
    let formData = JSON.stringify(data);

    if (this.checkValidations(this.mutationAllocatingForm, isvalid)) {
      this._plotcreationservices.saveConvertionDocument(formData).subscribe(res => {
        if (res) {
          this._commonservice.showInfoMessage('Saved Successfully');
          this.clearForm();

        }
      })
    }
  }

  clearForm() {
    this.mutationDocumentsList = [];
    this.mutationDetailsList = [];
    this.mutationAllocatingForm.controls.proceedingNo.setValue('');
    this.PlotsLayoutsValidationErrors.proceedingNo = '';
  }

  // VALIDATIONS
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
}

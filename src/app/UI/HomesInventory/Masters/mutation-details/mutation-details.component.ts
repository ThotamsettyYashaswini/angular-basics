import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
declare let $: any;
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-mutation-details',
  templateUrl: './mutation-details.component.html',
  styles: []
})
export class MutationDetailsComponent implements OnInit {
  savebutton: any = 'Save';
  mutationDetailsForm: FormGroup;
  mutationAddToGridForm: FormGroup;
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
  villageData: any = [];
  surveyData: any = []
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
  differenceLandInSqYards:  any = 0;
  differenceinarea: any;
  totalDiffInAcre: any;
  documentDetailss: any = [];
  kycFileName: any;
  kycFilePath: any;
  pDocFileType: any;
  imageResponse: any;
  datetimeimgpath: any;
  datetimeimg: any;
  fileuname: any;
  pmutationid: any;
  documentsList:any = [];
  documentsForm:FormGroup;
  documentDetailsList: any = [];


  constructor(private fb: FormBuilder, private router: Router, private _commonservice: CommonService, private _plotcreationservices: PlotcreationService, private datePipe: DatePipe) {
    this.ProjectLaunchdateConfig.containerClass = 'theme-dark-blue';
    this.ProjectLaunchdateConfig.showWeekNumbers = false;
    this.ProjectLaunchdateConfig.maxDate = new Date();
    this.ProjectLaunchdateConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit(): void {
    debugger;

    this.mutationDetailsForm = this.fb.group({
      proceedingNo: ['', Validators.required],
      proceedingDate: [new Date(), Validators.required],
      issuedBy: ['', Validators.required],
      khathaNo: ['', Validators.required]
    });

    this.mutationAddToGridForm = this.fb.group({

      village: ['', Validators.required],
      surveyNo: ['', Validators.required],
      subSurveyNo: [''],
      primaryLandareaValue: [''],
      primarylandareauomname: [''],
      primarylandareauom: [''],
      secondarylandareauomname: [''],
      secondarylandareavalue: [''],
      secondarylandareauom: [''],
      regdocNo : ['', Validators.required],


      primaryLandareaValueDharani: [''],
      primarylandareauomDharani: [''],
      primarylandareauomnameDharani: [''],
      secondarylandareavalueDharani: [''],
      secondarylandareauomDharani: [''],
      secondarylandareauomnameDharani: [''],


      totalExtent: [''],
      extent: [''],
      dharaniApplicable: [false],
      area: [''],
      subArea: [''],
      pDOCSTOREPATH: [''],
    });

    this.getUOMdata();
    this.getUOMdataDharani();


    this.PlotsLayoutsValidationErrors = {};
    this.BlurEventAllControll(this.mutationDetailsForm);
    this.BlurEventAllControll(this.mutationAddToGridForm);

    this.getLandVillage();

    this.documentsForm = this.fb.group({
      docID: [''],
      docName: [''],
      referenceNo: [''],
      pDOCSTOREPATH: ['']
    })

    this.getMutationDocumentType();

  }

  getLandVillage() {
    debugger;
    this._plotcreationservices.getLandVillage().subscribe(json => {
      this.villageData = json;
    })
  }

  villageChange(event) {
    debugger;
    this.mutationAddToGridForm.controls.surveyNo.setValue('');
    this.PlotsLayoutsValidationErrors.surveyNo = '';
    this.totalExtentInAcres = 0;
    this.totalExtentInSquareYards = 0;
    this.extentInAcres = 0;
    this.extentInSquareYards = 0;
    this.mutationAddToGridForm.controls.regdocNo.setValue('');
    this.landVillage = event.plandvillage;
    this._plotcreationservices.getLandVillageSurveyNo(event.plandvillage).subscribe(result => {
      this.surveyData = result;
    })
  }

  surveyNoChange(event) {
    debugger;
    this.totalExtentInAcres = 0;
    this.totalExtentInSquareYards = 0;
    this.extentInAcres = 0;
    this.extentInSquareYards = 0;
    this.mutationAddToGridForm.controls.regdocNo.setValue('');
    this.landSurveyNo = event.psurveyno;
    this.pmutationid = event.pmutationid;
    this.getExtent();
    this.getlandmutationextent();
    this.getLandDoumentcno();
  }

  getLandDoumentcno(){
    debugger;
    this._plotcreationservices.getLandDoumentcno(this.landVillage, this.landSurveyNo).subscribe(jsonData => {
      this.documentDetailss = jsonData;
    })
  }

  docNoChange(){
    debugger
  }

  getExtent() {
    debugger;
    this._plotcreationservices.GetlandextentData(this.landVillage, this.landSurveyNo).subscribe(json => {

      this.totalExtentInAcres = json[0].ptotalextent;
      this.totalExtentInSquareYards = json[0].ptotallandareainsqyds;

    })
  }

  getlandmutationextent() {
    debugger
    this._plotcreationservices.getlandmutationextent1(this.landVillage, this.landSurveyNo).subscribe(result => {

      this.extentInAcres = result[0].ptotalextent;
      this.extentInSquareYards = result[0].ptotallandareainsqyds;

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

      this.mutationAddToGridForm['controls']['primarylandareauomDharani'].setValue('1');
      this.mutationAddToGridForm['controls']['primarylandareauomnameDharani'].setValue('Acre');
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

  getUOMdataDharani() {
    debugger
    this._commonservice.GetUomData('LAND BANK').subscribe(data => {
      this.primaryUomdataDharani = data;
      this.secondaryUomdataDharani = this.primaryUomdata.filter(function (data) {
        return data.secondarylandareauomname != "Acre";
      });

      this.mutationAddToGridForm['controls']['primarylandareauomDharani'].setValue('1');
      this.mutationAddToGridForm['controls']['primarylandareauomnameDharani'].setValue('Acre');
    })


  }

  primaryUomDharani_Change($event: any): void {
    debugger;
    this.primaryuom = $event.target.value;
    const pPrimaryuomid = $event.target.value;
    if (pPrimaryuomid && pPrimaryuomid != '') {
      const primaryuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.mutationAddToGridForm['controls']['primarylandareauomnameDharani'].setValue(primaryuomtext);
    }
    else {
      this.mutationAddToGridForm['controls']['primarylandareauomnameDharani'].setValue(' ');
    }

  }

  secondaryUom_ChangeDharani($event: any): void {
    debugger
    const psecondaryuomidDharani = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomidDharani == 2) {
      this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomidDharani == 5) {
      this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomidDharani == 7) {
      this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomidDharani && psecondaryuomidDharani != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.mutationAddToGridForm['controls']['secondarylandareauomnameDharani'].setValue(secondaryyuomtext);
    }
    else {
      this.mutationAddToGridForm['controls']['secondarylandareauomnameDharani'].setValue('');
    }
    this.SecoundaryvaluechangeDharani();
    //this.computelandCostperAcre(); 
    this.totalLandCalc();
  }

  SecoundaryvaluechangeDharani() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalueDharani = this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].value
    this.centValueDharani = this.mutationAddToGridForm['controls']['secondarylandareauomDharani'].value;
    let psecondaryuomidDharani = this.mutationAddToGridForm['controls']['secondarylandareauomDharani'].value;
    if (psecondaryuomidDharani == 2) {
      this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].setValidators([Validators.required, Validators.max(99)]);
      this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].updateValueAndValidity();
      if (secondarylandareavalueDharani > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueDharani = "Cent Maximum value 99 only";
        return
      }
      else {
        this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].clearValidators();
        this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].updateValueAndValidity();
      }
    }

    if (psecondaryuomidDharani == 5) {
      this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].setValidators([Validators.required, Validators.max(4839)]);
      this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].updateValueAndValidity();
      if (secondarylandareavalueDharani > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueDharani = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].clearValidators();
        this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].updateValueAndValidity();
      }
    }

    if (psecondaryuomidDharani == 7) {
      this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].setValidators([Validators.required, Validators.max(39)]);
      this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].updateValueAndValidity();
      if (secondarylandareavalueDharani > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueDharani = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].clearValidators();
        this.mutationAddToGridForm['controls']['secondarylandareavalueDharani'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }

  totalLandCalc() {
    debugger;
    let primaryLandareaValue = +this.mutationAddToGridForm.controls.primaryLandareaValue.value;
    let psecondarylandarea = this.mutationAddToGridForm.controls.secondarylandareavalue.value;
    let primarylandareauomname = this.mutationAddToGridForm.controls.primarylandareauomname.value;
    let secondarylandareauomname = this.mutationAddToGridForm.controls.secondarylandareauomname.value;
    this.totalArea = primaryLandareaValue + ' ' + primarylandareauomname + ' ' + psecondarylandarea + ' ' + secondarylandareauomname;

    let primaryLandareaValueDharani = +this.mutationAddToGridForm.controls.primaryLandareaValueDharani.value;
    let psecondarylandareaDharani = +this.mutationAddToGridForm.controls.secondarylandareavalueDharani.value;
    let primarylandareauomnameDharani = this.mutationAddToGridForm.controls.primarylandareauomnameDharani.value;
    let secondarylandareauomnameDharani = this.mutationAddToGridForm.controls.secondarylandareauomnameDharani.value;
    this.totalAreaDharani = primaryLandareaValueDharani + ' ' + primarylandareauomnameDharani + ' ' + psecondarylandareaDharani + ' ' + secondarylandareauomnameDharani;

    //let primarylandareauomname = this.mutationAddToGridForm.controls.primarylandareauomname.value;


    // if(secondarylandareauomname == 'Guntas'){
    //   let convertAreaToSquareYards = primaryLandareaValue * 4840;
    //   let guntasToSquareYards = psecondarylandarea * 121;
    //   convertAreaToSquareYards = convertAreaToSquareYards + guntasToSquareYards;
    //   if(convertAreaToSquareYards > this.totalExtentInSquareYards){
    //     this._commonservice.showWarningMessage('Land Area shouldnot be greater than Total Extent');
    //     return;
    //   }
    // }


    if (secondarylandareauomname == 'Guntas' || secondarylandareauomnameDharani == 'Guntas') {
      let areaToSquareYards = primaryLandareaValue * 4840;
      let guntasToSquareYards = psecondarylandarea * 121;
      this.totalAreaInSquareYards = areaToSquareYards + guntasToSquareYards;

      // if (this.totalAreaInSquareYards > this.totalExtentInSquareYards) {
      //   this._commonservice.showWarningMessage('Land Area' + ' ' + this.totalArea + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
      //   this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
      //   //this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
      //   return;
      // }

      let areaToSquareYardsForDharani = primaryLandareaValueDharani * 4840;
      let guntasToSquareYardsForDharani = psecondarylandareaDharani * 121;
      this.totalAreaDharaniInSquareYards = areaToSquareYardsForDharani + guntasToSquareYardsForDharani;

      // if (this.totalAreaDharaniInSquareYards > this.totalExtentInSquareYards) {
      //   this._commonservice.showWarningMessage('Land Area As Per Dharani' + ' ' + this.totalAreaDharani + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
      //   //this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
      //   this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
      //   return;
      // }

    }

    else if (secondarylandareauomname == 'Cent' || secondarylandareauomnameDharani == 'Cent') {
      let areaToSquareYardss = primaryLandareaValue * 4840;
      let centToSquareYards = psecondarylandarea * 48.4;
      this.totalAreaInSquareYards = areaToSquareYardss + centToSquareYards;
      // 23-01-2025

      // if(this.totalAreaInSquareYards > this.totalExtentInSquareYards){
      //   this._commonservice.showWarningMessage('Land Area' + ' ' + this.totalArea + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
      //   this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
      //   return;
      // }

      let areaToSquareYardssForDharani = primaryLandareaValueDharani * 4840;
      let centToSquareYardsForDharani = psecondarylandareaDharani * 48.4;
      this.totalAreaDharaniInSquareYards = areaToSquareYardssForDharani + centToSquareYardsForDharani;
      // 23-01-2025

      // if (this.totalAreaDharaniInSquareYards > this.totalExtentInSquareYards) {
      //   this._commonservice.showWarningMessage('Land Area As Per Dharani' + ' ' + this.totalAreaDharani + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
      //   this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
      //   return;
      // }
    }

    else if (primarylandareauomname == 'Acre' || primarylandareauomnameDharani == 'Acre') {

      if (primarylandareauomname == 'Acre' || primarylandareauomnameDharani == 'Acre') {
        let convertAreaToSquareYards = primaryLandareaValue * 4840;
        this.totalAreaInSquareYards = convertAreaToSquareYards;
        // 23-01-2025

        // if (this.totalAreaInSquareYards > this.totalExtentInSquareYards) {
        //   this._commonservice.showWarningMessage('Land Area' + ' ' + this.totalArea + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
        //   this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');

        //   return;
        // }

        let convertAreaToSquareYardsDharani = primaryLandareaValueDharani * 4840;
        this.totalAreaDharaniInSquareYards = convertAreaToSquareYardsDharani;
        // 23-01-2025

        // if (this.totalAreaDharaniInSquareYards > this.totalExtentInSquareYards) {
        //   this._commonservice.showWarningMessage('Land Area As Per Dharani' + ' ' + this.totalAreaDharani + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
        //   this.mutationAddToGridForm.controls.primaryLandareaValueDharani.setValue('');

        //   return;
        // }
      }
    }

    else {
      let areaToSquareYardss = primaryLandareaValue * 4840;
      this.totalAreaInSquareYards = areaToSquareYardss + psecondarylandarea;
      // 23-01-2025

      // if(this.totalAreaInSquareYards > this.totalExtentInSquareYards){
      //   this._commonservice.showWarningMessage('Land Area' + ' ' + this.totalArea + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
      //   this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
      //   return;
      // }

      let areaToSquareYardssForDharani = primaryLandareaValueDharani * 4840;
      this.totalAreaDharaniInSquareYards = areaToSquareYardssForDharani + psecondarylandareaDharani;
      // 23-01-2025

      // if (this.totalAreaDharaniInSquareYards > this.totalExtentInSquareYards) {
      //   this._commonservice.showWarningMessage('Land Area As Per Dharani' + ' ' + this.totalAreaDharani + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
      //   this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
      //   return;
      // }
    }

  }

  addDetailsToGrid() {
    debugger;
    let isvalid = true;

    if (this.checkValidations(this.mutationAddToGridForm, isvalid)) {

      console.log(this.mutationDetailsForm.value);
      console.log(this.mutationAddToGridForm.value);

      if (this.mutationAddToGridForm.controls.secondarylandareauom.value == '') {
        this.mutationAddToGridForm.controls.secondarylandareauom.setValue(0);
      }

      let primaryLandareaValue = +this.mutationAddToGridForm.controls.primaryLandareaValue.value;
      let psecondarylandarea = +this.mutationAddToGridForm.controls.secondarylandareavalue.value;
      let primarylandareauomname = this.mutationAddToGridForm.controls.primarylandareauomname.value;
      let secondarylandareauomname = this.mutationAddToGridForm.controls.secondarylandareauomname.value;
      this.total = primaryLandareaValue + ' ' + primarylandareauomname + ' ' + psecondarylandarea + ' ' + secondarylandareauomname;

      let primaryLandareaValueDharani = +this.mutationAddToGridForm.controls.primaryLandareaValueDharani.value;
      let psecondarylandareaDharani = +this.mutationAddToGridForm.controls.secondarylandareavalueDharani.value;
      let primarylandareauomnameDharani = this.mutationAddToGridForm.controls.primarylandareauomnameDharani.value;
      let secondarylandareauomnameDharani = this.mutationAddToGridForm.controls.secondarylandareauomnameDharani.value;
      this.totalDharani = primaryLandareaValueDharani + ' ' + primarylandareauomnameDharani + ' ' + psecondarylandareaDharani + ' ' + secondarylandareauomnameDharani;

      if (secondarylandareauomname == 'Guntas' || secondarylandareauomnameDharani == 'Guntas') {
        let areaToSquareYards = primaryLandareaValue * 4840;
        let guntasToSquareYards = psecondarylandarea * 121;
        this.totalAreaInSquareYards = areaToSquareYards + guntasToSquareYards;

        let areaToSquareYardsForDharani = primaryLandareaValueDharani * 4840;
        let guntasToSquareYardsForDharani = psecondarylandareaDharani * 121;
        this.totalAreaDharaniInSquareYards = areaToSquareYardsForDharani + guntasToSquareYardsForDharani;

        this.differenceLandInSqYards = this.totalAreaInSquareYards - this.totalAreaDharaniInSquareYards;

     this.differenceinarea = this.convertAll(this.differenceLandInSqYards);

     this.totalDiffInAcre = this.differenceinarea['acres'] + ' ' +'Acres' + ' ' + this.differenceinarea['guntas'] + ' ' + 'Guntas';

      }
      else if (secondarylandareauomname == 'Cent' || secondarylandareauomnameDharani == 'Cent') {
        let areaToSquareYardss = primaryLandareaValue * 4840;
        let centToSquareYards = psecondarylandarea * 48.4;
        this.totalAreaInSquareYards = areaToSquareYardss + centToSquareYards;

        let areaToSquareYardssForDharani = primaryLandareaValueDharani * 4840;
        let centToSquareYardsForDharani = psecondarylandareaDharani * 48.4;
        this.totalAreaDharaniInSquareYards = areaToSquareYardssForDharani + centToSquareYardsForDharani;

     this.differenceLandInSqYards = this.totalAreaInSquareYards - this.totalAreaDharaniInSquareYards;

     this.differenceinarea = this.convertAll(this.differenceLandInSqYards);

     this.totalDiffInAcre = this.differenceinarea['acres'] + ' ' +'Acres' + ' ' + this.differenceinarea['cents'] + ' ' + 'Cent';
      }
      else if (secondarylandareauomname == 'Square Yards' || secondarylandareauomnameDharani == 'Square Yards') {
        let areaToSquareYardss = primaryLandareaValue * 4840;
        this.totalAreaInSquareYards = areaToSquareYardss + psecondarylandarea;

        let areaToSquareYardssForDharani = primaryLandareaValueDharani * 4840;
        this.totalAreaDharaniInSquareYards = areaToSquareYardssForDharani + psecondarylandareaDharani;

        

        this.differenceLandInSqYards = this.totalAreaInSquareYards - this.totalAreaDharaniInSquareYards;

        this.differenceinarea = this.convertAll(this.differenceLandInSqYards);
   
        this.totalDiffInAcre = this.differenceinarea['acres'] + ' ' +'Acres' + ' ' + this.differenceinarea['squareYards'] + ' ' + 'Sq.yds';
      }
      else{
        this.differenceLandInSqYards = this.totalAreaInSquareYards - this.totalAreaDharaniInSquareYards;

       this.differenceinarea = this.convertAll(this.differenceLandInSqYards);
   
        this.totalDiffInAcre = this.differenceinarea + ' ' +'Acres'}

    
        let pDateGrid = this.datePipe.transform(new Date(this.mutationDetailsForm.controls.proceedingDate.value), "yyyy-MM-dd")

      let data = {
        'pproceedingno': this.mutationDetailsForm.controls.proceedingNo.value,
        'pproceedingdate': pDateGrid,
        'pissuedby': this.mutationDetailsForm.controls.issuedBy.value,
        'ppattakhathano': this.mutationDetailsForm.controls.khathaNo.value,

        'pvillagemandal': this.mutationAddToGridForm.controls.village.value,
        'psurveyno': this.mutationAddToGridForm.controls.surveyNo.value,
        'psubsurveyno': this.mutationAddToGridForm.controls.subSurveyNo.value,
        'pconcatinatedsurveyno': this.mutationAddToGridForm.controls.surveyNo.value + '/' + this.mutationAddToGridForm.controls.subSurveyNo.value,
        'pprimarylandarea': +this.mutationAddToGridForm.controls.primaryLandareaValue.value,
        'pprimarylandareauomid': this.mutationAddToGridForm.controls.primarylandareauom.value,
        'psecondarylandarea': +this.mutationAddToGridForm.controls.secondarylandareavalue.value,
        'psecondarylandareauomid': this.mutationAddToGridForm.controls.secondarylandareauom.value,
        'psecondarylandareauomname': this.mutationAddToGridForm.controls.secondarylandareauomname.value,
        'ptotallandareainacres': this.total,
        'ptotallandareainsqyds': this.totalAreaInSquareYards,
        'pisdharaniapplicable': this.mutationAddToGridForm.controls.dharaniApplicable.value,
        'pprimarylandareaasperdharani': +this.mutationAddToGridForm.controls.primaryLandareaValueDharani.value,
        'psecondarylandareaasperdharani': +this.mutationAddToGridForm.controls.secondarylandareavalueDharani.value,
        'psecondarylandareauomnameDharani': this.mutationAddToGridForm.controls.secondarylandareauomnameDharani.value,
        'ptotallandareaasperdharani': this.totalDharani,
        'pptotallandareainsqydsasperdharani': this.totalAreaDharaniInSquareYards,
        'pdifferenceLandInSqYards': this.differenceLandInSqYards,
        'pdifferenceLandInAcres': this.totalDiffInAcre,
        'pregistereddocno' : this.mutationAddToGridForm.controls.regdocNo.value,
        'ptypeofoperation': 'CREATE',
        'pcreatedby': this._commonservice.pCreatedby

      }
      console.log(data);

      this.landDetailedList.push(data);
      console.log(this.landDetailedList);
      this.calculateGrandTotals();
      this.clearGridData();
    }
  }

  removeGridAddedData(event){
    debugger;
    const index = event.rowIndex;
    this.landDetailedList.splice(index,1);
  }

  convertAll(squareYards: number) {
    let secondarylandareauomname = this.mutationAddToGridForm.controls.secondarylandareauomname.value;

    let secondarylandareauomnameDharani = this.mutationAddToGridForm.controls.secondarylandareauomnameDharani.value;

    if (secondarylandareauomname == 'Cent' || secondarylandareauomnameDharani == 'Cent') {
    const acres = squareYards / 4840;
    const wholeAcres = Math.floor(acres);
    const cents = Math.round((acres - wholeAcres) * 100);
    
    return {
      acres: wholeAcres,
      cents: cents
    };
  }

  if (secondarylandareauomname == 'Guntas' || secondarylandareauomnameDharani == 'Guntas') {
    const acres = squareYards / 4840;
    const wholeAcres = Math.floor(acres);
    const remainingAcres = acres - wholeAcres;
    const guntas = Math.round(remainingAcres * 40);
    
    return {
      acres: wholeAcres,
      guntas: guntas
    };
  }

  if (secondarylandareauomname == 'Square Yards' || secondarylandareauomnameDharani == 'Square Yards') {
    const acres = squareYards / 4840;
    const wholeAcres = Math.floor(acres);
    const remainingSquareYards = squareYards % 4840;
    
    return {
      acres: wholeAcres,
      squareYards: remainingSquareYards
    };
  }
  else{
    return squareYards / 4840;
  }
    
  }

  // convertSquareYardsToAcresAndGuntas(squareYards: number) {
  //   const acres = squareYards / 4840;
  //   const wholeAcres = Math.floor(acres);
  //   const remainingAcres = acres - wholeAcres;
  //   const guntas = Math.round(remainingAcres * 40);
    
  //   return {
  //     acres: wholeAcres,
  //     guntas: guntas
  //   };
  // }

  // convertSquareYardsToAcresAndSquareYards(squareYards: number) {
  //   const acres = squareYards / 4840;
  //   const wholeAcres = Math.floor(acres);
  //   const remainingSquareYards = squareYards % 4840;
    
  //   return {
  //     acres: wholeAcres,
  //     squareYards: remainingSquareYards
  //   };
  // }

  // convertSquareYardsToAcres(squareYards: number): number {
  //   return squareYards / 4840;
  // }

  clearGridData() {
    debugger;
    this.mutationAddToGridForm.controls.village.setValue('');
    this.mutationAddToGridForm.controls.surveyNo.setValue('');
    this.mutationAddToGridForm.controls.subSurveyNo.setValue('');
    this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauomname.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauom.setValue('');
    this.mutationAddToGridForm.controls.regdocNo.setValue(''),
    this.total = '';
    this.mutationAddToGridForm.controls.dharaniApplicable.setValue(false);
    this.mutationAddToGridForm.controls.primaryLandareaValueDharani.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareavalueDharani.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauomnameDharani.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauomDharani.setValue('');
    this.totalDharani = '';
    this.totalExtentInAcres = 0;
    this.totalExtentInSquareYards = 0;
    this.extentInAcres = 0;
    this.extentInSquareYards = 0;

    this.PlotsLayoutsValidationErrors.village = '';
    this.PlotsLayoutsValidationErrors.surveyNo = '';
    this.PlotsLayoutsValidationErrors.proceedingDate = '';
    this.PlotsLayoutsValidationErrors.issuedBy = '';
    this.PlotsLayoutsValidationErrors.khathaNo = '';
    this.PlotsLayoutsValidationErrors.village = '';
    this.PlotsLayoutsValidationErrors.regdocNo = '';

  }


  calculateGrandTotals() {
    debugger
    let totalPrimaryArea = 0;
    let totalSecondaryArea = 0;
    let totalPTotal = 0;
    let totalDharaniArea = 0;
    let totalDharaniSubArea = 0;
    let totalDharaniTotal = 0;

    this.landDetailedList.forEach(item => {
      // Sum for pprimarylandarea and psecondarylandarea as numeric values
      if (item.pprimarylandarea != '') {
        totalPrimaryArea += parseFloat(item.pprimarylandarea);
      }
      if (item.psecondarylandarea != '') {
        totalSecondaryArea += parseFloat(item.psecondarylandarea);
      }

      // Convert and sum ptotallandareainacres (e.g., "2 Acre 20 Guntas")
      if (item.ptotallandareainacres != '') {
        totalPTotal += this.convertToAcres(item.ptotallandareainacres);
      }

      // Convert and sum pprimarylandareaasperdharani
      if (item.pprimarylandareaasperdharani != '') {
        totalDharaniArea += parseFloat(item.pprimarylandareaasperdharani);
      }

      // Sum psecondarylandareaasperdharani directly
      if (item.psecondarylandareaasperdharani != '') {
        totalDharaniSubArea += parseFloat(item.psecondarylandareaasperdharani);
      }

      // Convert and sum ptotallandareaasperdharani (e.g., "3 Acre 90 Cent")
      if (item.ptotallandareaasperdharani != '') {
        totalDharaniTotal += this.convertToAcres(item.ptotallandareaasperdharani);
      }
    });

    // Assign the calculated values to the grand total variables
    this.grandTotalPrimaryArea = totalPrimaryArea;
    this.grandTotalSecondaryArea = totalSecondaryArea;
    this.grandTotalPTotal = +totalPTotal.toFixed(2);
    this.grandTotalDharaniArea = totalDharaniArea;
    this.grandTotalDharaniSubArea = totalDharaniSubArea;
    this.grandTotalDharaniTotal = +totalDharaniTotal.toFixed(2);
  }

  // Function to convert "X Acre Y Guntas" or "X Acre Y Cent" into numeric Acres
  convertToAcres(areaString: string): number {
    debugger
    let acres = 0;
    let guntas = 0;
    let cent = 0;
    let squareYard = 0;

    // Match Acre, Guntas and Cent in the string
    const acresMatch = areaString.match(/(\d+)\s*Acre/);
    const guntasMatch = areaString.match(/(\d+)\s*Guntas/);
    const centMatch = areaString.match(/(\d+)\s*Cent/);
    const squareYardMatch = areaString.match(/(\d+)\s*Square Yards/);

    if (acresMatch) {
      acres = parseFloat(acresMatch[1]);
    }
    if (guntasMatch) {
      guntas = parseFloat(guntasMatch[1]);
    }
    if (centMatch) {
      cent = parseFloat(centMatch[1]);
    }
    if (squareYardMatch) {
      squareYard = parseFloat(squareYardMatch[1]);
    }

    // Assuming 1 Acre = 40 Guntas and 1 Acre = 100 Cents
    acres += guntas / 40; // Convert Guntas to Acres
    acres += cent / 100; // Convert Cent to Acres
    acres += squareYard / 4840; // Convert squareYard to Acres

    return acres;
  }

  DateChange(event) { 
    debugger;
    let a = event
  }


  saveMutationDetails() {
    debugger;

    if (this.landDetailedList.length == 0) {
      this._commonservice.showWarningMessage('Please add data to grid');
      return;
    }
    let isvalid = true;
    let pDate = this.datePipe.transform(new Date(this.mutationDetailsForm.controls.proceedingDate.value), "yyyy-MM-dd")

    let data = {
      "pproceedingno": this.mutationDetailsForm.controls.proceedingNo.value,
      "pproceedingdate": pDate,
      "pissuedby": this.mutationDetailsForm.controls.issuedBy.value,
      "ppattakhathano": this.mutationDetailsForm.controls.khathaNo.value,
      "ptypeofoperation": "CREATE",
      "pstausid": 0,
      "pcreatedby": this._commonservice.pCreatedby,
      "pmodifiedby": 0,
      "mutationDetailslist": this.landDetailedList,
      "documentStoreDTO": this.documentDetailsList
    }
    console.log(JSON.stringify(data));

    if (this.checkValidations(this.mutationDetailsForm, isvalid)) {
      this._plotcreationservices.saveMutation(data).subscribe(res => {
        if (res) {
          this._commonservice.showInfoMessage('Saved Successfully');
          this.landDetailedList = [];
          this.mutationDetailsForm.controls.proceedingNo.setValue('');
          this.mutationDetailsForm.controls.proceedingDate.setValue('');
          this.mutationDetailsForm.controls.issuedBy.setValue('');
          this.mutationDetailsForm.controls.khathaNo.setValue('');
          this.totalArea = '';
          this.documentDetailsList = [];

          this.grandTotalPrimaryArea = 0;
          this.grandTotalSecondaryArea = 0;
          this.grandTotalPTotal = 0;
          this.grandTotalDharaniArea = 0;
          this.grandTotalDharaniSubArea = 0;
          this.grandTotalDharaniTotal = 0;
          this.PlotsLayoutsValidationErrors.proceedingDate = '';
          this.PlotsLayoutsValidationErrors.issuedBy = '';
          this.PlotsLayoutsValidationErrors.khathaNo = '';
          this.PlotsLayoutsValidationErrors.proceedingNo = '';
        }
      })
    }
  }

  istdsapplicable_Checked($event) {
    debugger
    this.mutationAddToGridForm.controls.dharaniApplicable.value;
  }

  uploadAndProgress(event: any, files) {
    debugger;

    var extention = event.target.value.substring(event.target.value.lastIndexOf('.') + 1);
    if (extention.toLowerCase() != 'jpg' && extention.toLowerCase() != 'png' && extention.toLowerCase() != 'jpeg' && extention.toLowerCase() != 'pdf') {
      this._commonservice.showWarningMessage("Upload jpg or pdf files");
      return
    }

    this.datetimeimgpath = '';
    this.datetimeimg = '';

    let file = event.target.files[0];
    this.fileuname = file.name

    if (event && file) {
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
    let fileToUpload = <File>files[0];
    for (var i = 0; i < files.length; i++) {
      size += files[i].size;
      fname = files[i].name;

      let nameWithoutExt = fname.split('.').slice(0, -1).join('.');

      this.datetimeimg = this.datePipe.transform(new Date(), "ddMMyyyyhmmss") + '-' +
        'ttt' + '.' + extention;
      this.datetimeimgpath = this.datePipe.transform(new Date(), "ddMMyyyyhmmss") + '-' + 'ttt' + '.' + extention;

      this.datetimeimgpath = fname + ' ' + this.datetimeimgpath;
      this.datetimeimg = nameWithoutExt + ' ' + this.datetimeimg;

      formData.append('file', fileToUpload, this.datetimeimg);


      // formData.append(files[i].name, files[i]);
      // formData.append('NewFileName', this.companyconfigdocumentsform.value["pDOCUMENTNAME"] + '.' + files[i]["name"].split('.').pop());
    }
    size = size / 1024;
    console.log(formData);

    this._commonservice.fileUpload(formData).subscribe(data => {

      this.kycFileName = data[1];
      if (this.imageResponse)
        this.imageResponse.name = this.fileuname;
      this.kycFilePath = data[0];
      this.pDocFileType = extention
      event.target.value = null;
    })
  }

  getMutationDocumentType(){
    debugger;
    this._plotcreationservices.getMutationDocumentType(1).subscribe(res => {
      this.documentsList = res;
    })
  }

  documents_Change(event){
    this.documentsForm.controls.docName.setValue(event.pDocumentName)
  }

  addDocDetails(){
    debugger;
    let aa = this.documentsForm.controls.docID.value;
    if(this.documentsForm.controls.docName.value !='' && this.documentsForm.controls.docID.value!=''&& this.documentsForm.controls.referenceNo.value!=''){
    let data = {
      "pDOCUMENTNAME": this.documentsForm.controls.docName.value,
      "pDOCUMENTID": this.documentsForm.controls.docID.value,
      "pDOCREFERENCENO": this.documentsForm.controls.referenceNo.value,
      "pDOCSTOREPATH": this.kycFilePath,
      "pDOCFILENAME": this.kycFileName,
      "pDocFileType": this.pDocFileType,
      "ptypeofoperation": "CREATE",
      "pDOCISDOWNLOADABLE": true,
      "pDOCUMENTGROUPID": "1",
      "pCreatedby": this._commonservice.pCreatedby,
      "pCompanyId": 0,
      "pRecordId": 0
    }
    this.documentDetailsList.push(data);
    this.clearAddedDocDetails();
  }
  else{
    this._commonservice.showWarningMessage('Add Documents')
  }

  }
  clearAddedDocDetails(){
    debugger;
     this.documentsForm.controls.docName.setValue('');
     this.documentsForm.controls.docID.setValue('');
     this.documentsForm.controls.referenceNo.setValue('');
     this.kycFilePath = '';
     this.kycFileName = '';
     this.imageResponse.name = '';
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

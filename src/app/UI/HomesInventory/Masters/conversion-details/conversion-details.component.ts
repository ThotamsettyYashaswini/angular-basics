import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
@Component({
  selector: 'app-conversion-details',
  templateUrl: './conversion-details.component.html',
  styles: []
})
export class ConversionDetailsComponent implements OnInit {
  savebutton: any = 'Save';
  conversionDetailsForm: FormGroup;
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
  mutationVillageData: any = [];
  surveyData: any = []
  total: string;

  // grandTotalArea = 0;
 
  grandTotalPrimaryArea = 0;
  grandTotalSecondaryArea = 0;
  grandTotalPTotal = 0;
  
  extentsData: any = [];
  totalExtent: any;
  totalArea: any;
  landVillage: any;
  landSurveyNo: any;
  totalExtentInAcres: any = 0;
  totalExtentInSquareYards: any = 0;
  extentInSquareYards: any = 0;
  extentInAcres: any = 0;
  totalAreaInSquareYards: any;
  bindMutationDetails: any = [];
  pmutationid: any;
  kycFileName: any;
  kycFilePath: any;
  pDocFileType: any;
  imageResponse: any;
  datetimeimgpath: any;
  datetimeimg: any;
  fileuname: any;
  totalSqyds: any;
  previousExtentSQ: any;
  extentInSquareYards1: any = 0;
  documentDetailsList: any = [];
  documentsForm:FormGroup
  documentsList: any = [];
  documentDetailss: any = [];
  squareYards:any = 'Sq.Yds'


  constructor(private fb: FormBuilder, private router: Router, private _commonservice: CommonService, private _plotcreationservices: PlotcreationService, private datePipe: DatePipe) {
    this.ProjectLaunchdateConfig.containerClass = 'theme-dark-blue';
    this.ProjectLaunchdateConfig.showWeekNumbers = false;
    this.ProjectLaunchdateConfig.maxDate = new Date();
    this.ProjectLaunchdateConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit(): void {
    debugger;

    this.conversionDetailsForm = this.fb.group({
      proceedingNo: ['', Validators.required],
      proceedingDate: [new Date(), Validators.required],
      issuedBy: ['', Validators.required]
    })

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
      pDOCSTOREPATH: [''],
      regdocNo: [''],


     


      totalExtent: [''],
      extent: [''],
      area: [''],
      subArea: [''],
    })

    this.getUOMdata();


    this.PlotsLayoutsValidationErrors = {};
    this.BlurEventAllControll(this.conversionDetailsForm);
    this.BlurEventAllControll(this.mutationAddToGridForm);

    this.getLandVillage();
    this.documentsForm = this.fb.group({
      docID: [''],
      docName: [''],
      referenceNo: [''],
      pDOCSTOREPATH: ['']
    })
    this.getConvertionDocumentType();

  }

  getLandVillage() {
    debugger;
    this._plotcreationservices.getMutationvillage().subscribe(json => {
      this.mutationVillageData = json;
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
    this.landVillage = event.plandvillage;
    this.bindMutationDetails = [];
    this._plotcreationservices.GetMutationsurveyno(event.plandvillage).subscribe(result => {
      this.surveyData = result;
    })
  }

  surveyNoChange(event) {
    debugger;
    this.totalExtentInAcres = 0;
    this.totalExtentInSquareYards = 0;
    this.extentInAcres = 0;
    //this.extentInSquareYards = 0;
    this.landSurveyNo = event.psurveyno;
    this.pmutationid = event.pmutationid;
    this.bindMutationDetails = [];    
    this.getlandmutationextent();
    this.getExtent();
    this.BindMutationdetails();
    this.getMutationDocunments();
  }

  BindMutationdetails(){
    this._plotcreationservices.BindMutationdetails(this.landVillage, this.landSurveyNo,this.pmutationid).subscribe(json => {
      this.bindMutationDetails = json;
    })
  }

  getExtent() {
    debugger;
    this._plotcreationservices.getlandConvertionextent(this.landVillage, this.landSurveyNo).subscribe(json => {

      this.totalExtentInAcres = json[0].ptotalextent;
      this.totalExtentInSquareYards = json[0].ptotallandareainsqyds;

    })
  }

  getMutationDocunments(){
    this._plotcreationservices.getMutationDocunments(this.landVillage, this.landSurveyNo).subscribe(json => {
      this.documentDetailss = json;
    })
  }

  docNoChange(){}

  getlandmutationextent() {
    debugger
    this.previousExtentSQ = this.extentInSquareYards || 0;
    this._plotcreationservices.getlandmutationextent(this.landVillage, this.landSurveyNo,this.pmutationid).subscribe(result => {

      this.extentInAcres = result[0].ptotalextent;
      this.extentInSquareYards = result[0].ptotallandareainsqyds;
      const rawExtent = result[0].ptotallandareainsqyds;
       const newExtent = Number(rawExtent);
       this.extentInSquareYards1 += newExtent;

          console.log("New extent:", newExtent);
          console.log("Cumulative total:", this.extentInSquareYards1);

      // if (Array.isArray(result) && result.length > 0 && result[0]) {
      //   const rawExtent = result[0].ptotallandareainsqyds;

      //   console.log("Raw extent value from API:", rawExtent);

      //   // Convert to number safely
      //   const newExtent = Number(rawExtent);

      //   // Check if it's a valid number
      //   if (!isNaN(newExtent)) {
      //     this.extentInSquareYards = newExtent;
      //     this.extentInSquareYards1 += newExtent;

      //     console.log("New extent:", newExtent);
      //     console.log("Cumulative total:", this.extentInSquareYards1);
      //   } else {
      //     console.error("Extent value is not a valid number:", rawExtent);
      //   }
      // } else {
      //   console.error("Invalid API result format", result);
      // }
      

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

 

 

  

  

  totalLandCalc() {
    debugger;
    let primaryLandareaValue = +this.mutationAddToGridForm.controls.primaryLandareaValue.value;
    let psecondarylandarea = +this.mutationAddToGridForm.controls.secondarylandareavalue.value;
    let primarylandareauomname = this.mutationAddToGridForm.controls.primarylandareauomname.value;
    let secondarylandareauomname = this.mutationAddToGridForm.controls.secondarylandareauomname.value;
    this.totalArea = primaryLandareaValue + ' ' + primarylandareauomname + ' ' + psecondarylandarea + ' ' + secondarylandareauomname;

    

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


    if (secondarylandareauomname == 'Guntas') {
      let areaToSquareYards = primaryLandareaValue * 4840;
      let guntasToSquareYards = psecondarylandarea * 121;
      this.totalAreaInSquareYards = (areaToSquareYards + guntasToSquareYards).toFixed(2);

      if (this.totalAreaInSquareYards > this.extentInSquareYards) {
        this._commonservice.showWarningMessage('Land' + ' ' + this.totalAreaInSquareYards + ' ' + 'Sq.Yds' + ' ' + 'shouldnot be greater than Total Mutation Land' + ' ' + this.extentInSquareYards + ' ' + 'Sq.Yds');
        this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareauom.setValue('');
        this.totalArea = '';
        return;
      }


      // if (this.totalAreaDharaniInSquareYards > this.totalExtentInSquareYards) {
      //   this._commonservice.showWarningMessage('Land Area As Per Dharani' + ' ' + this.totalAreaDharani + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
      //   //this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
      //   this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
      //   return;
      // }

    }

    else if (secondarylandareauomname == 'Cent') {
      let areaToSquareYardss = primaryLandareaValue * 4840;
      let centToSquareYards = psecondarylandarea * 48.4;
      this.totalAreaInSquareYards = (areaToSquareYardss + centToSquareYards).toFixed(2);
      // 23-01-2025

      if(this.totalAreaInSquareYards > this.extentInSquareYards){
        this._commonservice.showWarningMessage('Land' + ' ' + this.totalAreaInSquareYards + ' ' + 'Sq.Yds' + ' ' + 'shouldnot be greater than Total Mutation Land' + ' ' + this.extentInSquareYards + ' ' + 'Sq.Yds');
        this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareauom.setValue('');
        this.totalArea = '';
        return;
      }

      
      // 23-01-2025

      // if (this.totalAreaDharaniInSquareYards > this.totalExtentInSquareYards) {
      //   this._commonservice.showWarningMessage('Land Area As Per Dharani' + ' ' + this.totalAreaDharani + ' ' + 'shouldnot be greater than Total Extent' + ' ' + this.totalExtentInAcres);
      //   this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
      //   return;
      // }
    }

    else if (secondarylandareauomname == '' && primarylandareauomname == 'Acre') {

      if (primarylandareauomname == 'Acre') {
        let convertAreaToSquareYards = primaryLandareaValue * 4840;
        this.totalAreaInSquareYards = convertAreaToSquareYards;
        // 23-01-2025

        if (this.totalAreaInSquareYards > this.extentInSquareYards) {
          this._commonservice.showWarningMessage('Land' + ' ' + this.totalAreaInSquareYards + ' ' + 'Sq.Yds' + ' ' + 'shouldnot be greater than Total Mutation Land' + ' ' + this.extentInSquareYards + ' ' + 'Sq.Yds');
        this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareauom.setValue('');
        this.totalArea = '';

          return;
        }

       
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
      this.totalAreaInSquareYards = (areaToSquareYardss + psecondarylandarea).toFixed(2);
      // 23-01-2025

      if(this.totalAreaInSquareYards > this.extentInSquareYards){
        this._commonservice.showWarningMessage('Land' + ' ' + this.totalAreaInSquareYards + ' ' + 'Sq.Yds' + ' ' + 'shouldnot be greater than Total Mutation Land' + ' ' + this.extentInSquareYards + ' ' + 'Sq.Yds');
        this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareauom.setValue('');
        this.totalArea = '';
        return;
      }

      
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

      console.log(this.conversionDetailsForm.value);
      console.log(this.mutationAddToGridForm.value);

      if (this.mutationAddToGridForm.controls.secondarylandareauom.value == '') {
        this.mutationAddToGridForm.controls.secondarylandareauom.setValue(0);
      }

      let primaryLandareaValue = +this.mutationAddToGridForm.controls.primaryLandareaValue.value;
      let psecondarylandarea = +this.mutationAddToGridForm.controls.secondarylandareavalue.value;
      let primarylandareauomname = this.mutationAddToGridForm.controls.primarylandareauomname.value;
      let secondarylandareauomname = this.mutationAddToGridForm.controls.secondarylandareauomname.value;
      this.total = primaryLandareaValue + ' ' + primarylandareauomname + ' ' + psecondarylandarea + ' ' + secondarylandareauomname; 

      //if(this.landDetailedList.length == 0){

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
    //}

    this.totalSqyds = this.landDetailedList.reduce((sum, c) => sum + parseFloat((c.ptotallandareainsqyds)), 0);

    let totCal = (this.totalSqyds + this.totalAreaInSquareYards);

      let pDateGrid = this.datePipe.transform(new Date(this.conversionDetailsForm.controls.proceedingDate.value), "yyyy-MM-dd")

      if (totCal > this.extentInSquareYards1) {
          this._commonservice.showWarningMessage('Land' + ' ' + totCal + ' ' + 'Sq.Yds' + ' ' + 'shouldnot be greater than Total Mutation Land' + ' ' + this.extentInSquareYards1 + ' ' + 'Sq.Yds');
        this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
        this.mutationAddToGridForm.controls.secondarylandareauom.setValue('');
        this.totalArea = '';

          return;
        }

      let data = {
        'pproceedingno': this.conversionDetailsForm.controls.proceedingNo.value,
        'pproceedingdate': pDateGrid,
        'pissuedby': this.conversionDetailsForm.controls.issuedBy.value,
        'pmutationid': this.bindMutationDetails[0].pmutationid,

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
        'pregistereddocno': this.mutationAddToGridForm.controls.regdocNo.value,

        // 'pisdharaniapplicable': this.mutationAddToGridForm.controls.dharaniApplicable.value,
        // 'pprimarylandareaasperdharani': +this.mutationAddToGridForm.controls.primaryLandareaValueDharani.value,
        // 'psecondarylandareaasperdharani': +this.mutationAddToGridForm.controls.secondarylandareavalueDharani.value,
        // 'psecondarylandareauomnameDharani': this.mutationAddToGridForm.controls.secondarylandareauomnameDharani.value,
        // 'ptotallandareaasperdharani': this.totalDharani,
        // 'pptotallandareainsqydsasperdharani': this.totalAreaDharaniInSquareYards,
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

  clearGridData() {
    debugger;
    //this.mutationAddToGridForm.controls.village.setValue('');
    //this.mutationAddToGridForm.controls.surveyNo.setValue('');
    //this.mutationAddToGridForm.controls.subSurveyNo.setValue('');
    this.mutationAddToGridForm.controls.primaryLandareaValue.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareavalue.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauomname.setValue('');
    this.mutationAddToGridForm.controls.secondarylandareauom.setValue('');
    this.total = '';
    
    // this.totalExtentInAcres = 0;
    // this.totalExtentInSquareYards = 0;
    // this.extentInAcres = 0;
    // this.extentInSquareYards = 0;

    this.PlotsLayoutsValidationErrors.village = '';
    this.PlotsLayoutsValidationErrors.surveyNo = '';
    this.PlotsLayoutsValidationErrors.proceedingDate = '';
    this.PlotsLayoutsValidationErrors.issuedBy = '';
    this.PlotsLayoutsValidationErrors.village = '';

  }


  calculateGrandTotals() {
    debugger
    let totalPrimaryArea = 0;
    let totalSecondaryArea = 0;
    let totalPTotal = 0;
    

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

      
      
    });

    // Assign the calculated values to the grand total variables
    this.grandTotalPrimaryArea = totalPrimaryArea;
    this.grandTotalSecondaryArea = totalSecondaryArea;
    this.grandTotalPTotal = +totalPTotal.toFixed(2);
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

  DateChange($event) { }


  saveConversionDetails() {
    debugger;

    if (this.landDetailedList.length == 0) {
      this._commonservice.showWarningMessage('Please add data to grid');
      return;
    }
    let isvalid = true;
    let pDate = this.datePipe.transform(new Date(this.conversionDetailsForm.controls.proceedingDate.value), "yyyy-MM-dd")
    let data = {
      "pproceedingno": this.conversionDetailsForm.controls.proceedingNo.value,
      "pproceedingdate": pDate,
      "pissuedby": this.conversionDetailsForm.controls.issuedBy.value,
      "pmutationid": this.bindMutationDetails[0].pmutationid,
      "ptypeofoperation": "CREATE",
      "pstausid": 0,
      "pcreatedby": this._commonservice.pCreatedby,
      "pmodifiedby": 0,
      "mutationDetailslist": this.landDetailedList,
      "documentStoreDTO": this.documentDetailsList
    }
    console.log(JSON.stringify(data));

    if (this.checkValidations(this.conversionDetailsForm, isvalid)) {
      this._plotcreationservices.saveConvertion(data).subscribe(res => {
        if (res) {
          this._commonservice.showInfoMessage('Saved Successfully');
          this.landDetailedList = [];
          this.conversionDetailsForm.controls.proceedingNo.setValue('');
          this.conversionDetailsForm.controls.proceedingDate.setValue('');
          this.conversionDetailsForm.controls.issuedBy.setValue('');
          this.mutationAddToGridForm.controls.village.setValue('');
          this.mutationAddToGridForm.controls.surveyNo.setValue('');
          this.mutationAddToGridForm.controls.subSurveyNo.setValue('');
          this.mutationAddToGridForm.controls.regdocNo.setValue('')

          this.grandTotalPrimaryArea = 0;
          this.grandTotalSecondaryArea = 0;
          this.extentInAcres = 0;  
          this.extentInSquareYards = 0;  
          this.extentInAcres = 0;  
          this.totalExtentInSquareYards = 0;  
          this.totalExtentInAcres = 0;  
          this.grandTotalPTotal = 0;
          this.bindMutationDetails = [];
          this.documentDetailsList = [];
         
          this.PlotsLayoutsValidationErrors.proceedingDate = '';
          this.PlotsLayoutsValidationErrors.issuedBy = '';
          this.PlotsLayoutsValidationErrors.village = '';
          this.PlotsLayoutsValidationErrors.surveyNo = '';
          this.PlotsLayoutsValidationErrors.subSurveyNo = '';
          this.PlotsLayoutsValidationErrors.proceedingNo = '';
          this.PlotsLayoutsValidationErrors.regdocNo = '';
        }
      })
    }
  }

  // uploadAndProgress(event: any, files) {
  //   debugger;

  //   var extention = event.target.value.substring(event.target.value.lastIndexOf('.') + 1);
  //   if (extention.toLowerCase() != 'jpg' && extention.toLowerCase() != 'png' && extention.toLowerCase() != 'jpeg' && extention.toLowerCase() != 'pdf') {
  //     this._commonservice.showWarningMessage("Upload jpg or pdf files");
  //     return
  //   }

  //   this.datetimeimgpath = '';
  //   this.datetimeimg = '';

  //   let file = event.target.files[0];
  //   this.fileuname = file.name

  //   if (event && file) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = e => {
  //       this.imageResponse = {
  //         name: file.name,
  //         fileType: "imageResponse",
  //         contentType: file.type,
  //         size: file.size,

  //       };
  //     };
  //   }
  //   let fname = "";
  //   if (files.length === 0) {
  //     return;
  //   }
  //   var size = 0;
  //   const formData = new FormData();
  //   let fileToUpload = <File>files[0];
  //   for (var i = 0; i < files.length; i++) {
  //     size += files[i].size;
  //     fname = files[i].name;

  //     let nameWithoutExt = fname.split('.').slice(0, -1).join('.');

  //     this.datetimeimg = this.datePipe.transform(new Date(), "ddMMyyyyhmmss") + '-' +
  //       'ttt' + '.' + extention;
  //     this.datetimeimgpath = this.datePipe.transform(new Date(), "ddMMyyyyhmmss") + '-' + 'ttt' + '.' + extention;

  //     this.datetimeimgpath = fname + ' ' + this.datetimeimgpath;
  //     this.datetimeimg = nameWithoutExt + ' ' + this.datetimeimg;

  //     formData.append('file', fileToUpload, this.datetimeimg);


  //     // formData.append(files[i].name, files[i]);
  //     // formData.append('NewFileName', this.companyconfigdocumentsform.value["pDOCUMENTNAME"] + '.' + files[i]["name"].split('.').pop());
  //   }
  //   size = size / 1024;
  //   console.log(formData);

  //   this._commonservice.fileUpload(formData).subscribe(data => {

  //     this.kycFileName = data[1];
  //     if (this.imageResponse)
  //       this.imageResponse.name = this.fileuname;
  //     this.kycFilePath = data[0];
  //     this.pDocFileType = extention
  //   })
  // }

  

  // VALIDATIONS
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

  getConvertionDocumentType(){
    debugger;
    this._plotcreationservices.getConvertionDocumentType(1).subscribe(res => {
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

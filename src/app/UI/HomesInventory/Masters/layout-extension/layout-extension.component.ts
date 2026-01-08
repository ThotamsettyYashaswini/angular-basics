import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { CompanyconfigService } from 'src/app/Services/Settings/companyconfig.service';


@Component({
  selector: 'app-layout-extension',
  templateUrl: './layout-extension.component.html',
  styles: []
})
export class LayoutExtensionComponent implements OnInit {
  layoutExtensionForm: FormGroup;
  layoutExtensionGridForm: FormGroup;

  PlotsLayoutsValidationErrors: any;
  RequestUom = 'LAND BANK';
  primaryUomdata: any = [];
  secondaryUomdata: any = [];
  primaryuom: any;
  LandCostperAcre: number;
  layoutDetailsList: any = [];
  companyData: any = [];
  documentList: any = [];
  addedGriddata: any = [];
  squareYards: any = 'Square Yards';
  totalGridSqyads: any = 0;
  totalGridArea: any = 0;
  totalGridSubArea: any = 0;
  conCatingAreaSubArea: any;
  savebutton: any = 'Save';
  today: Date = new Date();
  disableclearbutton: boolean = false;
  layoutDetailList: any = [];
  mortgageEnableFlag: boolean = false;





  public ocDateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public nocDateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public mortgageDateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public mortgageProceedingDateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public mortgageReleasedDateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public mortgageClosedDateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public reraDateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();


  constructor(private fb: FormBuilder, private _commonservice: CommonService, private _plotcreationservices: PlotcreationService, private CompanyconfigService: CompanyconfigService, private datePipe: DatePipe) {
    this.ocDateConfig.containerClass = 'theme-dark-blue';
    this.ocDateConfig.showWeekNumbers = false;
    this.ocDateConfig.maxDate = new Date();
    this.ocDateConfig.dateInputFormat = 'DD/MM/YYYY';

    this.nocDateConfig.containerClass = 'theme-dark-blue';
    this.nocDateConfig.showWeekNumbers = false;
    this.nocDateConfig.maxDate = new Date();
    this.nocDateConfig.dateInputFormat = 'DD/MM/YYYY';

    this.mortgageDateConfig.containerClass = 'theme-dark-blue';
    this.mortgageDateConfig.showWeekNumbers = false;
    this.mortgageDateConfig.maxDate = new Date();
    this.mortgageDateConfig.dateInputFormat = 'DD/MM/YYYY';

    this.mortgageProceedingDateConfig.containerClass = 'theme-dark-blue';
    this.mortgageProceedingDateConfig.showWeekNumbers = false;
    this.mortgageProceedingDateConfig.maxDate = new Date();
    this.mortgageProceedingDateConfig.dateInputFormat = 'DD/MM/YYYY';

    this.mortgageReleasedDateConfig.containerClass = 'theme-dark-blue';
    this.mortgageReleasedDateConfig.showWeekNumbers = false;
    this.mortgageReleasedDateConfig.maxDate = new Date();
    this.mortgageReleasedDateConfig.dateInputFormat = 'DD/MM/YYYY';

    this.mortgageClosedDateConfig.containerClass = 'theme-dark-blue';
    this.mortgageClosedDateConfig.showWeekNumbers = false;
    this.mortgageClosedDateConfig.maxDate = new Date();
    this.mortgageClosedDateConfig.dateInputFormat = 'DD/MM/YYYY';

    this.reraDateConfig.containerClass = 'theme-dark-blue';
    this.reraDateConfig.showWeekNumbers = false;
    this.reraDateConfig.maxDate = new Date();
    this.reraDateConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit() {
    this.layoutExtensionForm = this.fb.group({
      playoutname: [''],
      playoutid: [''],
      pocdate: [this.today],
      pnocdate: [this.today],
      pmortigatedate: [''],
      pmortigageproceedingno: [''],
      pmortigageproceedingdate: [''],
      pmortigagereleasedno: [''],
      pmortigagereleaseddate: [''],
      // pmortigagecloseddate: [this.today],
      prerano: [''],
      preradate: [this.today],
      pcreatedby: [this._commonservice.pCreatedby],
      pmodifiedby: [this._commonservice.pCreatedby],
      ptypeofoperation: ['CREATE']
    });
    this.layoutExtensionGridForm = this.fb.group({
      pcompanyname: [''],
      // pdocumentno: [''],
      // pcompanypercentage: [0],

      primaryLandareaValueRoads: [''],
      secondarylandareavalueRoads: [''],
      primarylandareauomRoads: [''],
      secondarylandareauomRoads: [''],
      primarylandareauomnameRoads: [''],
      secondarylandareauomnameRoads: [''],
    })
    this.PlotsLayoutsValidationErrors = {};
    this.getUOMdata();
    this.viewLayoutDetails();
    this.getCompanyDetails();
    this.disableclearbutton = false;

  }

  viewLayoutDetails() {
    debugger;
    this._plotcreationservices.viewLayout().subscribe(result => {
      this.layoutDetailsList = result;
    })
  }

  ChangeLayoutName(event) {
    debugger;
    this.layoutExtensionForm.controls.playoutid.setValue(event.playoutid);
    this._plotcreationservices.GetLayoutDocument(event.playoutid).subscribe(res => {
      this.documentList = res;
    })

    this.layoutExtensionForm.controls.playoutid.setValue(event.playoutid);
    this._plotcreationservices.viewLayoutById(event.playoutid).subscribe(res => {
      this.layoutDetailList = res;
    })

    this._plotcreationservices.getMortigageCount(event.playoutid).subscribe(res => {
      let count = res.pmortigagecount;
      if (count > 0) {
        this.mortgageEnableFlag = true;
      }
      else {
        this.mortgageEnableFlag = false;
      }
    })



  }

  DateChange(event) {
    debugger;
    let a = event
  }

  getCompanyDetails() {
    debugger
    this.CompanyconfigService.GetcompanyView1().subscribe(Json => {
      this.companyData = Json;

    })
  }

  companyChange(event) { }

  getUOMdata() {
    this._commonservice.GetUomData(this.RequestUom).subscribe(data => {
      this.primaryUomdata = data;
      this.secondaryUomdata = this.primaryUomdata.filter(function (data) {
        return data.secondarylandareauomname != "Acre";
      });

      this.layoutExtensionGridForm['controls']['primarylandareauomRoads'].setValue('1');

      this.layoutExtensionGridForm['controls']['primarylandareauomnameRoads'].setValue('Acre');


    })


  }

  primaryUom_Change($event: any): void {
    debugger;
    this.primaryuom = $event.target.value;
    const pPrimaryuomid = $event.target.value;
    if (pPrimaryuomid && pPrimaryuomid != '') {
      const primaryuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutExtensionGridForm['controls']['primarylandareauomnameRoads'].setValue(primaryuomtext);
    }
    else {
      this.layoutExtensionGridForm['controls']['primarylandareauomnameRoads'].setValue(' ');
    }

  }

  secondaryUom_ChangeRoads($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutExtensionGridForm['controls']['secondarylandareauomnameRoads'].setValue(secondaryyuomtext);
    }
    else {
      this.layoutExtensionGridForm['controls']['secondarylandareauomnameRoads'].setValue('');
    }
    this.SecoundaryvaluechangeRoads();
    //this.computelandCostperAcre();   


  }

  SecoundaryvaluechangeRoads() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].value
    let psecondaryuomid = this.layoutExtensionGridForm['controls']['secondarylandareauomRoads'].value;




    if (psecondaryuomid == 2) {
      this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(99)]);
      this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueRoads = "Cent Maximum value 99 only";
        return
      }
      else {
        this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].clearValidators();
        this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(4839)]);
      this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueRoads = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].clearValidators();
        this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(39)]);
      this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueRoads = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].clearValidators();
        this.layoutExtensionGridForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }

  calculationsArea() { }

  addDetailsToGrid() {
    debugger;
    if (this.layoutExtensionGridForm.controls.primaryLandareaValueRoads.value == '') {
      this.layoutExtensionGridForm.controls.primaryLandareaValueRoads.setValue(0);
    }
    if (this.layoutExtensionGridForm.controls.secondarylandareavalueRoads.value == '') {
      this.layoutExtensionGridForm.controls.secondarylandareavalueRoads.setValue(0);
    }

    let concatinateAReaInAcres = this.layoutExtensionGridForm.controls.primaryLandareaValueRoads.value + ' ' + this.layoutExtensionGridForm.controls.primarylandareauomnameRoads.value + ' ' + this.layoutExtensionGridForm.controls.secondarylandareavalueRoads.value + ' ' + this.layoutExtensionGridForm.controls.secondarylandareauomnameRoads.value;
    let subArea = this.layoutExtensionGridForm.controls.secondarylandareauomnameRoads.value;
    let result = this.convertAcresGuntasToSqYards(concatinateAReaInAcres, subArea);
    let landAreaInSqYds = this.layoutDetailList[0].land_area_in_sqys_total;


    if (this.addedGriddata.length == 0) {
      if (result > landAreaInSqYds) {
        this._commonservice.showWarningMessage('Added area cannot exceed the total land area.');
        return;
      }
    }

    let totalGridSqyadsVal = this.addedGriddata.reduce((sum, c) => sum + parseFloat((c.pcompanylayoutareainsqyards)), 0);

    totalGridSqyadsVal = totalGridSqyadsVal + result;

    if (this.addedGriddata.length > 0) {
      if (totalGridSqyadsVal > landAreaInSqYds) {
        this._commonservice.showWarningMessage('Added area cannot exceed the total land area.');
        return;
      }
    }

    let netLayoutAreaInSqYds = landAreaInSqYds - result;
    let netLayoutAreaInAcres = this.convertToAcresGuntas(netLayoutAreaInSqYds);
    console.log(netLayoutAreaInAcres);

    let finalArea = `${netLayoutAreaInAcres.acres} Acres ${netLayoutAreaInAcres.guntas} Guntas`
    let secondarylandareauom = this.layoutExtensionGridForm.controls.secondarylandareauomRoads.value;

    if (secondarylandareauom != '') {

      if (this.addedGriddata.some((item) => item.pcompanysecondarylandareauomid != secondarylandareauom && item.pcompanysecondarylandareauomid != 0)) {
        this._commonservice.showWarningMessage('Select Same Secondary UOM');
        return;
      }
    }
    let splitValue = this.layoutDetailList[0].secondarylandareavalueNetPlotArea.split(' ');
    splitValue = splitValue[0];
    let data = {
      "pmortigageid": 0,
      "playoutid": 0,
      "pcompanyname": this.layoutExtensionGridForm.controls.pcompanyname.value,
      // "pdocumentno": this.layoutExtensionGridForm.controls.pdocumentno.value,
      // "pcompanypercentage": this.layoutExtensionGridForm.controls.pcompanypercentage.value,
      "pcompanyprimarylandarea": this.layoutExtensionGridForm.controls.primaryLandareaValueRoads.value,
      "pcompanyprimarylandareauomid": this.layoutExtensionGridForm.controls.primarylandareauomRoads.value,
      "pcompanysecondarylandarea": this.layoutExtensionGridForm.controls.secondarylandareavalueRoads.value,
      "pcompanysecondarylandareauomid": this.layoutExtensionGridForm.controls.secondarylandareauomRoads.value,
      "ptotallayoutareainacers": this.layoutDetailList[0].land_area_in_acres_total,
      "ptotallayoutareainsqyards": this.layoutDetailList[0].land_area_in_sqys_total,
      "pnetlayoutareainacers": this.layoutDetailList[0].primaryLandareaValueNetPlotArea,
      "pnetlayoutareainsqyards": splitValue,
      "pcompanylayoutareainacers": concatinateAReaInAcres,
      "pcompanylayoutareainsqyards": result,
      "pcreatedby": this._commonservice.pCreatedby,
      "ptypeofoperation": "CREATE"
    }

    this.addedGriddata.push(data);
    // this.disableclearbutton=true;


    this.totalGridSqyads = this.addedGriddata.reduce((sum, c) => sum + parseFloat((c.pcompanylayoutareainsqyards)), 0);

    // this.totalGridArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat((c.pcompanyprimarylandarea)), 0);

    // this.totalGridSubArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat((c.pcompanysecondarylandarea)), 0);

    // this.conCatingAreaSubArea = this.totalGridArea + ' ' + this.layoutExtensionGridForm.controls.primarylandareauomnameRoads.value + ' ' + this.totalGridSubArea + ' ' + this.layoutExtensionGridForm.controls.secondarylandareauomnameRoads.value;

    if (subArea == 'Guntas') {

      this.totalGridArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat(c.pcompanyprimarylandarea), 0);
      this.totalGridSubArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat(c.pcompanysecondarylandarea), 0);

      // Convert Guntas to Acres
      const additionalAcresFromGuntas = Math.floor(this.totalGridSubArea / 40);
      const remainingGuntas = this.totalGridSubArea % 40;

      // Add extra acres from guntas to primary acres
      const finalAcres = this.totalGridArea + additionalAcresFromGuntas;

      // Compose final display string
      this.conCatingAreaSubArea = `${finalAcres} ${this.layoutExtensionGridForm.controls.primarylandareauomnameRoads.value} ${remainingGuntas} ${this.layoutExtensionGridForm.controls.secondarylandareauomnameRoads.value}`;
    }

    else if (subArea == 'Cent') {

      this.totalGridArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat(c.pcompanyprimarylandarea), 0);
      this.totalGridSubArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat(c.pcompanysecondarylandarea), 0);

      // Convert Guntas to Acres
      const additionalAcresFromGuntas = Math.floor(this.totalGridSubArea / 100);
      const remainingGuntas = this.totalGridSubArea % 100;

      // Add extra acres from guntas to primary acres
      const finalAcres = this.totalGridArea + additionalAcresFromGuntas;

      // Compose final display string
      this.conCatingAreaSubArea = `${finalAcres} ${this.layoutExtensionGridForm.controls.primarylandareauomnameRoads.value} ${remainingGuntas} ${this.layoutExtensionGridForm.controls.secondarylandareauomnameRoads.value}`;
    }

    else if (subArea == 'Square Yards') {

      this.totalGridArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat(c.pcompanyprimarylandarea), 0);
      this.totalGridSubArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat(c.pcompanysecondarylandarea), 0);

      // Convert Guntas to Acres
      const additionalAcresFromGuntas = Math.floor(this.totalGridSubArea / 4840);
      const remainingGuntas = this.totalGridSubArea % 4840;

      // Add extra acres from guntas to primary acres
      const finalAcres = this.totalGridArea + additionalAcresFromGuntas;

      // Compose final display string
      this.conCatingAreaSubArea = `${finalAcres} ${this.layoutExtensionGridForm.controls.primarylandareauomnameRoads.value} ${remainingGuntas} ${this.layoutExtensionGridForm.controls.secondarylandareauomnameRoads.value}`;
    }

    else {
      this.totalGridArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat(c.pcompanyprimarylandarea), 0);
      this.totalGridSubArea = this.addedGriddata.reduce((sum, c) => sum + parseFloat(c.pcompanysecondarylandarea), 0);

      // Convert Guntas to Acres
      const additionalAcresFromGuntas = Math.floor(this.totalGridSubArea / 4840);
      const remainingGuntas = this.totalGridSubArea % 4840;

      // Add extra acres from guntas to primary acres
      const finalAcres = this.totalGridArea + additionalAcresFromGuntas;

      // Compose final display string
      this.conCatingAreaSubArea = `${finalAcres} ${this.layoutExtensionGridForm.controls.primarylandareauomnameRoads.value} ${remainingGuntas} ${this.layoutExtensionGridForm.controls.secondarylandareauomnameRoads.value}`;
    }






    this.clearGridDetails();

  }

  convertToAcresGuntas(squareYards: number): { acres: number, guntas: number } {
    debugger
    const ACRE_IN_SQY = 4840;
    const GUNTA_IN_SQY = 121;

    const acres = Math.floor(squareYards / ACRE_IN_SQY);
    const remainingSqYards = squareYards % ACRE_IN_SQY;
    const guntas = Math.round(remainingSqYards / GUNTA_IN_SQY);

    return { acres, guntas };
  }

  clearGridDetails() {
    this.layoutExtensionGridForm.controls.pcompanyname.setValue('');
    // this.layoutExtensionGridForm.controls.pdocumentno.setValue('');
    // this.layoutExtensionGridForm.controls.pcompanypercentage.setValue('');
    this.layoutExtensionGridForm.controls.primaryLandareaValueRoads.setValue('');
    this.layoutExtensionGridForm.controls.primarylandareauomRoads.setValue(1);
    this.layoutExtensionGridForm.controls.primarylandareauomnameRoads.setValue('Acre');
    this.layoutExtensionGridForm.controls.secondarylandareavalueRoads.setValue('');
    this.layoutExtensionGridForm.controls.secondarylandareauomRoads.setValue('');
    this.layoutExtensionGridForm.controls.secondarylandareauomnameRoads.setValue('');
  }

  // convertAcresGuntasToSqYards(acresGuntasStr: string, subArea): number {
  //   debugger;
  //   if (subArea == 'Guntas') {
  //     const acreMatch = acresGuntasStr.match(/(\d+)\s*Acre/);
  //     const guntaMatch = acresGuntasStr.match(/(\d+)\s*Gunta/);

  //     const acres = acreMatch ? parseInt(acreMatch[1], 10) : 0;
  //     const guntas = guntaMatch ? parseInt(guntaMatch[1], 10) : 0;

  //     const totalSqYards = (acres * 4840) + (guntas * 121);
  //     return totalSqYards;
  //   }

  //   if (subArea == 'Cent') {
  //     const acreMatch = acresGuntasStr.match(/(\d+)\s*Acre/);
  //     const guntaMatch = acresGuntasStr.match(/(\d+)\s*Cent/);

  //     const acres = acreMatch ? parseInt(acreMatch[1], 10) : 0;
  //     const guntas = guntaMatch ? parseInt(guntaMatch[1], 10) : 0;

  //     const totalSqYards = (acres * 4840) + (guntas * 48.4);
  //     return totalSqYards;
  //   }

  //   if (subArea == 'Square Yards') {
  //     const acreMatch = acresGuntasStr.match(/(\d+)\s*Acre/);
  //     const guntaMatch = acresGuntasStr.match(/(\d+)\s*Square Yards/);

  //     const acres = acreMatch ? parseInt(acreMatch[1], 10) : 0;
  //     const guntas = guntaMatch ? parseInt(guntaMatch[1], 10) : 0;

  //     const totalSqYards = (acres * 4840) + guntas;
  //     return totalSqYards;
  //   }
  //   else{
  //    const acreMatch = acresGuntasStr.match(/(\d+)\s*Acre/);
  //     const acres = acreMatch ? parseInt(acreMatch[1], 10) : 0;

  //     const totalSqYards = (acres * 4840);
  //     return totalSqYards;
  //   }
  // }

  convertAcresGuntasToSqYards(acresGuntasStr: string, subArea: string): number {
    debugger;
    if (!acresGuntasStr || typeof acresGuntasStr !== 'string') {
      return 0;
    }

    const acreMatch = acresGuntasStr.match(/(\d+)\s*Acre/i);
    const secondValueMatch = acresGuntasStr.match(/Acre\s*(\d+)/i); // captures number after 'Acre' even if unit is missing

    const acres = acreMatch ? parseInt(acreMatch[1], 10) : 0;
    const secondValue = secondValueMatch ? parseInt(secondValueMatch[1], 10) : 0;

    let totalSqYards = 0;

    switch (subArea) {
      case 'Guntas':
        totalSqYards = (acres * 4840) + (secondValue * 121);
        break;
      case 'Cent':
        totalSqYards = (acres * 4840) + (secondValue * 48.4);
        break;
      case 'Square Yards':
        totalSqYards = (acres * 4840) + secondValue;
        break;
      default:
        totalSqYards = acres * 4840; // fallback if unknown
    }

    return totalSqYards;
  }


  saveLayoutExtension() {
    debugger;
    if (this.addedGriddata.length == 0) {
      this._commonservice.showWarningMessage('Add Land Details To Grid');
      return;
    }
    let pocdate = this.datePipe.transform(new Date(this.layoutExtensionForm.controls.pocdate.value), "yyyy-MM-dd");
    let pnocdate = this.datePipe.transform(new Date(this.layoutExtensionForm.controls.pnocdate.value), "yyyy-MM-dd");
    if (this.mortgageEnableFlag) {
      let pmortigatedate = this.datePipe.transform(new Date(this.layoutExtensionForm.controls.pmortigatedate.value), "yyyy-MM-dd");
      let pmortigageproceedingdate = this.datePipe.transform(new Date(this.layoutExtensionForm.controls.pmortigageproceedingdate.value), "yyyy-MM-dd");
      let pmortigagereleaseddate = this.datePipe.transform(new Date(this.layoutExtensionForm.controls.pmortigagereleaseddate.value), "yyyy-MM-dd");
      this.layoutExtensionForm.controls.pmortigatedate.setValue(pmortigatedate);
      this.layoutExtensionForm.controls.pmortigageproceedingdate.setValue(pmortigageproceedingdate);
      this.layoutExtensionForm.controls.pmortigagereleaseddate.setValue(pmortigagereleaseddate);
    }
    else {
      this.layoutExtensionForm.controls.pmortigatedate.setValue(null);
      this.layoutExtensionForm.controls.pmortigageproceedingdate.setValue(null);
      this.layoutExtensionForm.controls.pmortigagereleaseddate.setValue(null);
    }
    // let pmortigagecloseddate = this.datePipe.transform(new Date(this.layoutExtensionForm.controls.pmortigagecloseddate.value), "yyyy-MM-dd");
    let preradate = this.datePipe.transform(new Date(this.layoutExtensionForm.controls.preradate.value), "yyyy-MM-dd");

    this.layoutExtensionForm.controls.pocdate.setValue(pocdate);
    this.layoutExtensionForm.controls.pnocdate.setValue(pnocdate);

    // this.layoutExtensionForm.controls.pmortigagecloseddate.setValue(pmortigagecloseddate);
    this.layoutExtensionForm.controls.preradate.setValue(preradate);

    let newdata = { layoutExtentionDetailslist: this.addedGriddata }
    let data = Object.assign(this.layoutExtensionForm.value, newdata);
    console.log(data);

    this._plotcreationservices.saveLayoutExtension(data).subscribe(res => {
      if (res) {
        this._commonservice.showInfoMessage('Saved Successfully');
        this.clear();
      }
    })

  }



  clear() {
    debugger
    this.layoutExtensionForm.reset();
    this.layoutExtensionForm.controls.pocdate.setValue(this.today);
    this.layoutExtensionForm.controls.pnocdate.setValue(this.today);
    this.layoutExtensionForm.controls.pmortigatedate.setValue('');
    this.layoutExtensionForm.controls.pmortigageproceedingdate.setValue('');
    this.layoutExtensionForm.controls.pmortigagereleaseddate.setValue('');
    // this.layoutExtensionForm.controls.pmortigagecloseddate.setValue(this.today);
    this.layoutExtensionForm.controls.preradate.setValue(this.today);
    this.addedGriddata = [];
    this.layoutDetailList = [];
    this.totalGridSqyads = 0;
    this.conCatingAreaSubArea = '';
    this.disableclearbutton = false;
    this.mortgageEnableFlag = false;
    this.clearGridDetails();




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

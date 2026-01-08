import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
declare let $: any;
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-layout-details-new-upd',
  templateUrl: './layout-details-new-upd.component.html',
  styles: []
})
export class LayoutDetailsNewUpdComponent implements OnInit {
  savebutton: any = 'Save';
  layoutDetailsForm: FormGroup;
  layoutDetailsAddToGridForm: FormGroup;
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
  centValue: any;
  layoutDetailslist: any = [];
  surveyData: any = []
  total: string;

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

  kycFileName: any;
  kycFilePath: any;
  pDocFileType: any;
  imageResponse: any;
  disableclearbutton: boolean = false;
  totalExtentArea: any = 0;
  documentData: any = [];
  layoutDocumentNo: any;
  extentData: any = [];
  totalExtentInAcres1: any;
  totalExtentAreaInACres: any = 0;
  acres: number = 0;
  cents: number = 0;
  LandCostperAcre: number;
  totalAreaInSquareYards: any;
  totalAreaInSquareYardsSave: any;
  primaryUomdata: any = [];
  secondaryUomdata: any = [];
  RequestUom = 'LAND BANK';
  totalPlotArea: any;
  primaryuom: any;
  afterCalSqYds: any;


  netPlotAreaFor: any;
  typeofDeedList: any = [];
  captilizeGridValue: any;
  datetimeimgpath: any;
  datetimeimg: any;
  fileuname: any;
  datetimeimgpathTypeOfDeed: any;
  datetimeimgTypeOfDeed: any;
  fileunameTypeOfDeed: any;
  kycFilePathTypeOfDeed: any;
  kycFileNameTypeOfDeed: any;
  pDocFileTypeTypeOfDeed: any;
  imageResponseTypeOfDeed: any;

  areaList = [{ name: 'Roads' }, { name: 'Park' }, { name: 'Road Affected' }, { name: 'Others' }];
  entryEnable: boolean = false;
  addedBoundarieslist: any = [];
  totalBoundArea: any;
  totalBoundAreaInSqYards: any;



  constructor(private fb: FormBuilder, private router: Router, private _commonservice: CommonService, private _plotcreationservices: PlotcreationService, private datePipe: DatePipe) {
    this.ProjectLaunchdateConfig.containerClass = 'theme-dark-blue';
    this.ProjectLaunchdateConfig.showWeekNumbers = false;
    this.ProjectLaunchdateConfig.maxDate = new Date();
    this.ProjectLaunchdateConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit(): void {
    debugger;
    this.layoutDetailsForm = this.fb.group({
      lptcpdpNo: ['', Validators.required],
      proceedingNo: ['', Validators.required],
      proceedingDate: [new Date(), Validators.required],
      issuedBy: ['', Validators.required],
      layoutName: ['', Validators.required],
      layoutUrl: ['', Validators.required],
      layoutLocation: ['', Validators.required],
      typeofDeed: [''],
      roads: [0],
      roadAffected: [0],
      park: [0],
      others: [0],
      netArea: [0],
      deedNo: [''],
      description: [''],
      secondarylandareauomname: [''],
      secondarylandareavalue: [''],
      primaryLandareaValue: [''],
      primarylandareauomname: [''],
      primarylandareauom: [''],
      secondarylandareauom: [''],
      pDOCSTOREPATH: [''],
      pDOCSTOREPATHTypeOfDeed: [''],

      // 
      primaryLandareaValuePark: [''],
      secondarylandareavaluePark: [''],
      primarylandareauomPark: [''],
      secondarylandareauomPark: [''],
      primarylandareauomnamePark: [''],
      secondarylandareauomnamePark: [''],
      parkAreaInSqyds: [''],

      primaryLandareaValueRoads: [''],
      secondarylandareavalueRoads: [''],
      primarylandareauomRoads: [''],
      secondarylandareauomRoads: [''],
      primarylandareauomnameRoads: [''],
      secondarylandareauomnameRoads: [''],
      roadAreaInSqyds: [''],

      primaryLandareaValueRoadAffected: [''],
      secondarylandareavalueRoadAffected: [''],
      primarylandareauomRoadAffected: [''],
      secondarylandareauomRoadAffected: [''],
      primarylandareauomnameRoadAffected: [''],
      secondarylandareauomnameRoadAffected: [''],
      roadAffectedAreaInSqyds: [''],


      primaryLandareaValueOthers: [''],
      secondarylandareavalueOthers: [''],
      primarylandareauomOthers: [''],
      secondarylandareauomOthers: [''],
      primarylandareauomnameOthers: [''],
      secondarylandareauomnameOthers: [''],
      othersAreaInSqyds: [''],

      primaryLandareaValuefutureDevelopment: [''],
      secondarylandareavaluefutureDevelopment: [''],
      primarylandareauomfutureDevelopment: [''],
      secondarylandareauomfutureDevelopment: [''],
      primarylandareauomnamefutureDevelopment: [''],
      secondarylandareauomnamefutureDevelopment: [''],
      futureDevelopmentAreaInSqyds: [0],

      primaryLandareaValueNetPlotArea: [''],
      secondarylandareavalueNetPlotArea: [''],
      primarylandareauomNetPlotArea: [''],
      secondarylandareauomNetPlotArea: [''],
      primarylandareauomnameNetPlotArea: [''],
      secondarylandareauomnameNetPlotArea: [''],

      primaryLandareaValueTypeofDeed: [''],
      secondarylandareavalueTypeofDeed: [''],
      primarylandareauomTypeofDeed: [''],
      secondarylandareauomTypeofDeed: [''],
      primarylandareauomnameTypeofDeed: [''],
      secondarylandareauomnameTypeofDeed: [''],

      typeofBoundaries: [''],



    });

    this.layoutDetailsAddToGridForm = this.fb.group({
      documentNo: ['', Validators.required],
      surveyNo: ['', Validators.required],
      Extent: [''],
      // roads: [''],
      // roadAffected: [''],
      // park: [''],
      // others: [''],
      // netArea: [''],
      // deedNo: [''],

      extentInAcres: [''],
      extentInSqyds: ['']

    });
    this.PlotsLayoutsValidationErrors = {};
    this.BlurEventAllControll(this.layoutDetailsForm);
    this.BlurEventAllControll(this.layoutDetailsAddToGridForm);

    this.getConvertionDocLayout();
    this.getUOMdata();
    this.typeofDeedList = [{ name: 'Mortigage' }, { name: 'Gift Deed' }];

  }

  getConvertionDocLayout() {
    debugger;
    this._plotcreationservices.getConvertionDocLayout().subscribe(json => {
      this.documentData = json;
    })
  }

  entryYes() {
    debugger;
    this.entryEnable = true;
  }

  entryNo() {
    debugger;
    this.entryEnable = false;
  }

  documentNoChange(event) {
    debugger;
    this.layoutDetailsAddToGridForm.controls.surveyNo.setValue('');
    this.PlotsLayoutsValidationErrors.surveyNo = '';
    this.totalExtentInAcres = 0;
    this.totalExtentInSquareYards = 0;
    this.extentInAcres = 0;
    this.extentInSquareYards = 0;
    this.layoutDocumentNo = event.pregistereddocument;
    this._plotcreationservices.getConvertionSurveyNo(event.pregistereddocument).subscribe(result => {
      this.surveyData = result;
    })
  }

  surveyNoChange(event) {
    debugger;
    this.totalExtentInAcres = 0;
    this.totalExtentInSquareYards = 0;
    this.extentInAcres = 0;
    this.extentInSquareYards = 0;
    this.landSurveyNo = event.psurveyno;

    this._plotcreationservices.getLayoutExtent(this.layoutDocumentNo, this.landSurveyNo).subscribe(resp => {
      this.extentData = resp;
      this.layoutDetailsAddToGridForm.controls.extentInAcres.setValue(this.extentData[0].ptotalextent);
      this.layoutDetailsAddToGridForm.controls.extentInSqyds.setValue(this.extentData[0].ptotallandareainsqyds);
      this.totalExtentInAcres = this.extentData[0].ptotalextent;
      this.totalExtentInSquareYards = this.extentData[0].ptotallandareainsqyds;


      const regex = /(\d+(\.\d+)?)(\s*acre)\s*(\d+(\.\d+)?)(\s*cents)/;

      const match = this.totalExtentInAcres.match(regex);

      if (match) {
        this.acres = parseFloat(match[1]);  // Extract the acre value
        this.cents = parseFloat(match[4]);  // Extract the cents value
      }
    })
  }

  splitPrimaryLandArea(pprimarylandarea: string): void {
    // Regular expression to match acre and cents values

  }

  saleOfDeedUpload(event: any, files) {
    debugger;

    var extention = event.target.value.substring(event.target.value.lastIndexOf('.') + 1);
    if (extention.toLowerCase() != 'jpg' && extention.toLowerCase() != 'png' && extention.toLowerCase() != 'jpeg' && extention.toLowerCase() != 'pdf') {
      this._commonservice.showWarningMessage("Upload jpg or pdf files");
      return
    }

    this.datetimeimgpath = '';
    this.datetimeimg = '';

    let file = event.target.files[0];
    this.fileunameTypeOfDeed = file.name

    if (event && file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.imageResponseTypeOfDeed = {
          name: file.name,
          fileType: "imageResponseTypeOfDeed",
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

      this.datetimeimgTypeOfDeed = this.datePipe.transform(new Date(), "ddMMyyyyhmmss") + '-' +
        'ttt' + '.' + extention;
      this.datetimeimgpathTypeOfDeed = this.datePipe.transform(new Date(), "ddMMyyyyhmmss") + '-' + 'ttt' + '.' + extention;

      this.datetimeimgpathTypeOfDeed = fname + ' ' + this.datetimeimgpathTypeOfDeed;
      this.datetimeimgTypeOfDeed = nameWithoutExt + ' ' + this.datetimeimgTypeOfDeed;

      formData.append('file', fileToUpload, this.datetimeimgTypeOfDeed);


      // formData.append(files[i].name, files[i]);
      // formData.append('NewFileName', this.companyconfigdocumentsform.value["pDOCUMENTNAME"] + '.' + files[i]["name"].split('.').pop());
    }
    size = size / 1024;
    console.log(formData);

    this._commonservice.fileUpload(formData).subscribe(data => {

      this.kycFileNameTypeOfDeed = data[1];
      if (this.imageResponseTypeOfDeed)
        this.imageResponseTypeOfDeed.name = this.fileunameTypeOfDeed;
      this.kycFilePathTypeOfDeed = data[0];
      this.pDocFileTypeTypeOfDeed = extention
    })
  }

  uploadAndProgress1(event: any, files) {
    debugger;

    var extention = event.target.value.substring(event.target.value.lastIndexOf('.') + 1);
    if (extention.toLowerCase() != 'jpg' && extention.toLowerCase() != 'png' && extention.toLowerCase() != 'jpeg' && extention.toLowerCase() != 'pdf') {
      this._commonservice.showWarningMessage("Upload jpg or pdf files");
      return
    }

    let file = event.target.files[0];

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
    for (var i = 0; i < files.length; i++) {
      size += files[i].size;
      fname = files[i].name
      formData.append(files[i].name, files[i]);
      formData.append('NewFileName', this.layoutDetailsAddToGridForm.value["pDOCUMENTNAME"] + '.' + files[i]["name"].split('.').pop());
    }
    size = size / 1024;
    console.log(formData);

    this._commonservice.fileUpload(formData).subscribe(data => {

      this.kycFileName = data[1];
      if (this.imageResponse)
        this.imageResponse.name = data[1];
      this.kycFilePath = data[0];
      this.pDocFileType = extention
    })
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
    })
  }



  addDetailsToGrid() {
    debugger;
    let isvalid = true;
    this.totalExtentArea = 0;
    this.totalExtentAreaInACres = 0;
    let pDateGrid = this.datePipe.transform(new Date(this.layoutDetailsForm.controls.proceedingDate.value), "yyyy-MM-dd")
    if (this.layoutDetailslist.length != 0) {
      let splitSecondary = this.layoutDetailslist[0].pextentpprimarylandarea.split(' ');
      let captilizeGridValue = splitSecondary[3].toUpperCase();

      let splitTotalExtentInAcres = this.totalExtentInAcres.split(' ');
      let captilizetotalExtentInAcres = splitTotalExtentInAcres[3].toUpperCase();


      // if (captilizeGridValue != captilizetotalExtentInAcres) {
      //   this._commonservice.showWarningMessage('Select Same Secondary UOM');
      //   return;
      // }
    }
    if (this.checkValidations(this.layoutDetailsAddToGridForm, isvalid)) {
      let data = {
        'pdocumentno': this.layoutDetailsAddToGridForm.controls.documentNo.value,
        'psurveyno': this.layoutDetailsAddToGridForm.controls.surveyNo.value,
        'pprimarylandarea': this.acres,
        'psecondarylandarea': this.cents,
        'pproceedingno': this.layoutDetailsForm.controls.proceedingNo.value,
        'pproceedingdate': pDateGrid,
        'pextentpsecondarylandarea': this.totalExtentInSquareYards,
        'pextentpprimarylandarea': this.totalExtentInAcres,
        'ptypeofoperation': 'Create',

      }
      console.log(data);


      this.layoutDetailslist.push(data);
      this.totalExtentArea = this.layoutDetailslist.reduce((sum, c) => sum + parseFloat((c.pextentpsecondarylandarea)), 0).toFixed(2);


      //this.totalExtentAreaInACres = this.totalExtentArea / 4840;



      console.log(this.layoutDetailslist);
      //this.calculateTotalExtent();
      this.convertToAcresAndCents();
      this.clearGridData();
    }


  }

  addAllExtraDetails() {
    debugger;

    if (this.totalExtentAreaInACres == 0) {
      this._commonservice.showWarningMessage('No Land Available');
      return;
    }

    let area = this.layoutDetailsForm.controls.primaryLandareaValueRoads.value + ' ' + this.layoutDetailsForm.controls.primarylandareauomnameRoads.value + ' ' + this.layoutDetailsForm.controls.secondarylandareavalueRoads.value + ' ' + this.layoutDetailsForm.controls.secondarylandareauomnameRoads.value;
    let json = {
      'ptypeofBoundaries': this.layoutDetailsForm.controls.typeofBoundaries.value,
      'pEnableSqds': this.entryEnable,
      "primaryLandareaValueRoads": +this.layoutDetailsForm.controls.primaryLandareaValueRoads.value,
      "secondarylandareavalueRoads": +this.layoutDetailsForm.controls.secondarylandareavalueRoads.value,
      "primary_land_area_uom_Roads_id": +this.layoutDetailsForm.controls.primarylandareauomRoads.value,
      "secondary_land_area_uom_Roads_id": +this.layoutDetailsForm.controls.secondarylandareauomRoads.value,
      "pareainacres": area,

    }
    console.log(json);


    this.addedBoundarieslist.push(json);


    this.netGridCalculation();

    this.netAreaCalculation();

    this.clearAllExtraDetails();
  }

  netGridCalculation() {
    debugger;

    if (this.layoutDetailsForm.controls.secondarylandareauomnameRoads.value == 'Guntas') {
      let totalAcres = 0;
      let totalGuntas = 0;

      this.addedBoundarieslist.forEach(item => {
        const acreMatch = item.pareainacres.match(/(\d+)\s*Acre/i);
        const guntaMatch = item.pareainacres.match(/(\d+)\s*Guntas?/i);

        const acres = acreMatch ? parseInt(acreMatch[1], 10) : 0;
        const guntas = guntaMatch ? parseInt(guntaMatch[1], 10) : 0;

        totalAcres += acres;
        totalGuntas += guntas;
      });

      // Normalize guntas to acres
      totalAcres += Math.floor(totalGuntas / 40);
      totalGuntas = totalGuntas % 40;

      this.totalBoundArea = `${totalAcres} Acre ${totalGuntas} Guntas`;
      console.log("Total:", this.totalBoundArea);

      const squareYardsFromAcres = totalAcres * 4840;
      const squareYardsFromGuntas = totalGuntas * 121;
  
      const totalSquareYards = squareYardsFromAcres + squareYardsFromGuntas;
  
      this.totalBoundAreaInSqYards = `${totalSquareYards.toFixed(2)} sq.yd`;
    }

    if (this.layoutDetailsForm.controls.secondarylandareauomnameRoads.value == 'Cent') {
      let totalAcres = 0;
      let totalCents = 0;
  
      this.addedBoundarieslist.forEach(item => {
        const acreMatch = item.pareainacres.match(/(\d+)\s*Acre/i);
        const centMatch = item.pareainacres.match(/(\d+)\s*Cent/i);
  
        const acres = acreMatch ? parseInt(acreMatch[1], 10) : 0;
        const cents = centMatch ? parseInt(centMatch[1], 10) : 0;
  
        totalAcres += acres;
        totalCents += cents;
      });
  
      // Convert every 100 cents into 1 acre
      totalAcres += Math.floor(totalCents / 100);
      totalCents = totalCents % 100;
  
      console.log(`Total Area: ${totalAcres} Acre ${totalCents} Cent`);
  
  
      this.totalBoundArea = `${totalAcres} Acre ${totalCents} Cent`
  
      const squareYardsFromAcres = totalAcres * 4840;
      const squareYardsFromCents = totalCents * 48.4;
  
      const totalSquareYards = squareYardsFromAcres + squareYardsFromCents;
  
      this.totalBoundAreaInSqYards = `${totalSquareYards.toFixed(2)} sq.yd`;
    }
    
    this.netAreaCalculation();
  }

  netAreaCalculation() {
    debugger;

    let secondae = this.totalExtentAreaInACres.split(' ');
    if (secondae[3] == 'Guntas') {
      let [gridAcres, gridGuntas] = this.totalExtentAreaInACres.match(/\d+/g).map(Number);
      let [areaAcres, areaGuntas] = this.totalBoundArea.match(/\d+/g).map(Number);

      // Convert both areas to cents
      let gridTotalGunta = this.convertToGuntas(gridAcres, gridGuntas);
      let areaTotalGunta = this.convertToGuntas(areaAcres, areaGuntas);

      if (areaTotalGunta > gridTotalGunta) {
        this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }

      // Subtract the areas (in cents)
      let netPlotAreaGunta = gridTotalGunta - areaTotalGunta;

      // Convert the result back to Acres and Gunta
      let netPlotArea: any = this.convertToAcresAndGuntas(netPlotAreaGunta);

      // Final result (netPlotArea)
      console.log(`Net Plot Area: ${netPlotArea.acres} Acre(s) ${netPlotArea.guntas} Gunta(s)`);

      // You can assign this to your Angular component's netPlotArea
      this.netPlotAreaFor = `${netPlotArea.acres} Acre(s) ${netPlotArea.guntas} Gunta(s)`;

      let totalBoundArea = this.totalBoundArea.split(' ');
       let area = totalBoundArea[0];
       let subArea = totalBoundArea[2];

      let areaToSquareYardss = area * 4840;
      let centToSquareYards = subArea * 121;
      this.totalAreaInSquareYards = areaToSquareYardss + centToSquareYards + ' ' + 'Square Yards';
      this.totalAreaInSquareYardsSave = areaToSquareYardss + centToSquareYards;
      let finalARea = areaToSquareYardss + centToSquareYards;
      let totalExtentArea = parseFloat(this.totalExtentArea.toString().replace(/,/g, ""));
      if (finalARea > totalExtentArea) {
        // this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }
      this.afterCalSqYds = Math.round(totalExtentArea - finalARea);
      this.afterCalSqYds = this.afterCalSqYds + ' ' + 'Square Yards';
    }

    if (secondae[3] == 'Cents') {

      let [gridAcres, gridCents] = this.totalExtentAreaInACres.match(/\d+/g).map(Number);
      let [areaAcres, areaCents] = this.totalBoundArea.match(/\d+/g).map(Number);

      // Convert both areas to cents
      let gridTotalCents = this.convertToCents(gridAcres, gridCents);
      let areaTotalCents = this.convertToCents(areaAcres, areaCents);


      if (areaTotalCents > gridTotalCents) {
        this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }

      // Subtract the areas (in cents)
      let netPlotAreaCents = gridTotalCents - areaTotalCents;

      // Convert the result back to Acres and Cents
      let netPlotArea: any = this.convertToAcresAndCentss(netPlotAreaCents);

      // Final result (netPlotArea)
      console.log(`Net Plot Area: ${netPlotArea.acres} Acre(s) ${netPlotArea.cents} Cent(s)`);

      // You can assign this to your Angular component's netPlotArea
      this.netPlotAreaFor = `${netPlotArea.acres} Acre(s) ${netPlotArea.cents} Cent(s)`;

       let totalBoundArea = this.totalBoundArea.split(' ');
       let area = totalBoundArea[0];
       let subArea = totalBoundArea[2];



      let areaToSquareYardss = area * 4840;
      let centToSquareYards = subArea * 48.4;
      this.totalAreaInSquareYards = areaToSquareYardss + centToSquareYards + ' ' + 'Square Yards';
      this.totalAreaInSquareYardsSave = areaToSquareYardss + centToSquareYards;
      let finalARea = areaToSquareYardss + centToSquareYards;
      let totalExtentArea = parseFloat(this.totalExtentArea.toString().replace(/,/g, ""));
      if (finalARea > totalExtentArea) {
        // this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }
      this.afterCalSqYds = Math.round(totalExtentArea - finalARea);
      this.afterCalSqYds = this.afterCalSqYds + ' ' + 'Square Yards';
      
    }

    if (secondae[3] + ' ' + secondae[4] == 'Square Yards') {

      // Extract the numerical values of Acres and Cents from the strings
      let [gridAcres, gridsquareYards] = this.totalExtentAreaInACres.match(/\d+/g).map(Number);
      let [areaAcres, areasquareYards] = this.totalBoundArea.match(/\d+/g).map(Number);

      // Convert both areas to cents
      let gridTotalsquareYards = this.convertToSquareYards(gridAcres, gridsquareYards);
      let areaTotalsquareYards = this.convertToSquareYards(areaAcres, areasquareYards);

      if (areaTotalsquareYards > gridTotalsquareYards) {
        this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }

      // Subtract the areas (in cents)
      let netPlotAreasquareYards = gridTotalsquareYards - areaTotalsquareYards;

      // Convert the result back to Acres and squareYards
      let netPlotArea: any = this.convertToAcresAndSquareYards(netPlotAreasquareYards);

      // Final result (netPlotArea)
      console.log(`Net Plot Area: ${netPlotArea.acres} Acre(s) ${netPlotArea.squareYards} Square Yard(s)`);

      // You can assign this to your Angular component's netPlotArea
      this.netPlotAreaFor = `${netPlotArea.acres} Acre(s) ${netPlotArea.squareYards} Square Yard(s)`;

      let totalBoundArea = this.totalBoundArea.split(' ');
       let area = totalBoundArea[0];
       let subArea = totalBoundArea[2];

      let areaToSquareYardss = area * 4840;
      let centToSquareYards = subArea;
      this.totalAreaInSquareYards = areaToSquareYardss + centToSquareYards + ' ' + 'Square Yards';
      this.totalAreaInSquareYardsSave = areaToSquareYardss + centToSquareYards;
      let finalARea = areaToSquareYardss + centToSquareYards;
      let totalExtentArea = parseFloat(this.totalExtentArea.toString().replace(/,/g, ""));
      if (finalARea > totalExtentArea) {
        // this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }
      this.afterCalSqYds = Math.round(totalExtentArea - finalARea);
      this.afterCalSqYds = this.afterCalSqYds + ' ' + 'Square Yards';
    }
  }
  clearAllExtraDetails() {
    this.layoutDetailsForm.controls.typeofBoundaries.setValue('');
    this.layoutDetailsForm.controls.primaryLandareaValueRoads.setValue('');
    this.layoutDetailsForm.controls.secondarylandareavalueRoads.setValue('');
    this.layoutDetailsForm.controls.primarylandareauomRoads.setValue('1');
    this.layoutDetailsForm.controls.secondarylandareauomRoads.setValue('');
    this.entryEnable = false;
  }

  convertToAcresAndCents(): void {
    // 1 acre = 4840 square yards
    const totalAcres = this.totalExtentArea / 4840;

    let secondae = this.totalExtentInAcres.split(' ');
    if (secondae[3] == 'guntas') {
      const acres = Math.floor(totalAcres); // Get the whole acre part
      const guntas = Math.round((totalAcres - acres) * 40); // Get the remainder in cents (multiplied by 100)

      // Format the result as "Acres Cents"
      this.totalExtentAreaInACres = `${acres} Acre ${guntas} Guntas`;
    }
    if (secondae[3] == 'cents') {
      const acres = Math.floor(totalAcres); // Get the whole acre part
      const cents = Math.round((totalAcres - acres) * 100); // Get the remainder in cents (multiplied by 100)

      // Format the result as "Acres Cents"
      this.totalExtentAreaInACres = `${acres} Acre ${cents} Cents`;
    }

    if (secondae[3] + ' ' + secondae[4] == 'Square Yards') {
      const acres = Math.floor(totalAcres); // Get the whole acre part
      const squareYards = Math.round((totalAcres - acres) * 4840); // Get the remainder in cents (multiplied by 100)

      // Format the result as "Acres Cents"
      this.totalExtentAreaInACres = `${acres} Acre ${squareYards} Square Yards`;
    }

    // Calculate whole acres and the fractional part in cents

  }

  calculateTotalExtent(): void {
    debugger
    this.totalExtentInAcres1 = this.layoutDetailslist.reduce((sum, item) => {
      const extentInAcres = this.convertExtentToAcres(item.pextentpprimarylandarea);
      return sum + extentInAcres;
    }, 0);
    this.totalExtentInAcres1 = this.totalExtentInAcres1.toFixed(2);

    console.log(this.totalExtentInAcres1);


  }

  convertExtentToAcres(pextent: string): number {
    // Regular expression to extract acre and cents values
    const acreRegex = /(\d+(\.\d+)?)(\s*acre)/;
    const centRegex = /(\d+(\.\d+)?)(\s*cents)/;

    let acres = 0;
    let cents = 0;

    // Extract acre value
    const acreMatch = pextent.match(acreRegex);
    if (acreMatch) {
      acres = parseFloat(acreMatch[1]);
    }

    // Extract cent value
    const centMatch = pextent.match(centRegex);
    if (centMatch) {
      cents = parseFloat(centMatch[1]);
    }

    // Convert cents to acres (assuming 1 acre = 100 cents)
    const centsInAcres = cents / 100;

    return acres + centsInAcres;
  }

  netPlotAreaCalc() {
    debugger;
    let roads = this._commonservice.removeCommasInAmount(this.layoutDetailsForm.controls.roads.value);
    let park = this._commonservice.removeCommasInAmount(this.layoutDetailsForm.controls.park.value);
    let others = this._commonservice.removeCommasInAmount(this.layoutDetailsForm.controls.others.value);
    let roadAffected = this._commonservice.removeCommasInAmount(this.layoutDetailsForm.controls.roadAffected.value);
    this.totalPlotArea = roads + park + others + roadAffected;
    this.totalPlotArea = this._commonservice.currencyformat(this.totalPlotArea);
    this.layoutDetailsForm.controls.netArea.setValue(this.totalPlotArea);
  }

  clearGridData() {
    debugger;
    this.layoutDetailsAddToGridForm.controls.documentNo.setValue('');
    this.layoutDetailsAddToGridForm.controls.surveyNo.setValue('');
    this.PlotsLayoutsValidationErrors.documentNo = '';
    this.PlotsLayoutsValidationErrors.surveyNo = '';
    this.totalExtentInAcres = 0;
  }

  clear() {
    debugger;
    this.layoutDetailsForm.reset();
    this.layoutDetailsForm.controls.proceedingDate.setValue(new Date());
    this.PlotsLayoutsValidationErrors.lptcpdpNo = '';
    this.PlotsLayoutsValidationErrors.proceedingNo = '';
    this.PlotsLayoutsValidationErrors.proceedingDate = '';
    this.PlotsLayoutsValidationErrors.issuedBy = '';
    this.PlotsLayoutsValidationErrors.layoutName = '';
    this.PlotsLayoutsValidationErrors.layoutLocation = '';
    this.PlotsLayoutsValidationErrors.layoutUrl = '';
  }

  getUOMdata() {
    this._commonservice.GetUomData(this.RequestUom).subscribe(data => {
      this.primaryUomdata = data;
      this.secondaryUomdata = this.primaryUomdata.filter(function (data) {
        return data.secondarylandareauomname != "Acre";
      });

      this.layoutDetailsForm['controls']['primarylandareauomPark'].setValue('1');
      this.layoutDetailsForm['controls']['primarylandareauomRoads'].setValue('1');
      this.layoutDetailsForm['controls']['primarylandareauomRoadAffected'].setValue('1');
      this.layoutDetailsForm['controls']['primarylandareauomOthers'].setValue('1');
      this.layoutDetailsForm['controls']['primarylandareauomTypeofDeed'].setValue('1');
      this.layoutDetailsForm['controls']['primarylandareauomNetPlotArea'].setValue('1');
      this.layoutDetailsForm['controls']['primarylandareauomfutureDevelopment'].setValue('1');

      this.layoutDetailsForm['controls']['primarylandareauomnamePark'].setValue('Acre');
      this.layoutDetailsForm['controls']['primarylandareauomnameRoads'].setValue('Acre');
      this.layoutDetailsForm['controls']['primarylandareauomnameRoadAffected'].setValue('Acre');
      this.layoutDetailsForm['controls']['primarylandareauomnameOthers'].setValue('Acre');
      this.layoutDetailsForm['controls']['primarylandareauomnameTypeofDeed'].setValue('Acre');
      this.layoutDetailsForm['controls']['primarylandareauomnameNetPlotArea'].setValue('Acre');
      this.layoutDetailsForm['controls']['primarylandareauomnamefutureDevelopment'].setValue('Acre');


    })


  }

  primaryUom_Change($event: any): void {
    debugger;
    this.primaryuom = $event.target.value;
    const pPrimaryuomid = $event.target.value;
    if (pPrimaryuomid && pPrimaryuomid != '') {
      const primaryuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutDetailsForm['controls']['primarylandareauomnamePark'].setValue(primaryuomtext);
      this.layoutDetailsForm['controls']['primarylandareauomnameRoads'].setValue(primaryuomtext);
      this.layoutDetailsForm['controls']['primarylandareauomnameRoadAffected'].setValue(primaryuomtext);
      this.layoutDetailsForm['controls']['primarylandareauomnameOthers'].setValue(primaryuomtext);
      this.layoutDetailsForm['controls']['primarylandareauomnameTypeofDeed'].setValue(primaryuomtext);
      this.layoutDetailsForm['controls']['primarylandareauomnameNetPlotArea'].setValue(primaryuomtext);
      this.layoutDetailsForm['controls']['primarylandareauomnamefutureDevelopment'].setValue(primaryuomtext);
    }
    else {
      this.layoutDetailsForm['controls']['primarylandareauomnamePark'].setValue(' ');
      this.layoutDetailsForm['controls']['primarylandareauomnameRoads'].setValue(' ');
      this.layoutDetailsForm['controls']['primarylandareauomnameRoadAffected'].setValue(' ');
      this.layoutDetailsForm['controls']['primarylandareauomnameOthers'].setValue(' ');
      this.layoutDetailsForm['controls']['primarylandareauomnameTypeofDeed'].setValue('');
      this.layoutDetailsForm['controls']['primarylandareauomnameNetPlotArea'].setValue(' ');
      this.layoutDetailsForm['controls']['primarylandareauomnamefutureDevelopment'].setValue(' ');
    }

  }


  secondaryUom_ChangePark($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavaluePark'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavaluePark'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavaluePark'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutDetailsForm['controls']['secondarylandareauomnamePark'].setValue(secondaryyuomtext);
    }
    else {
      this.layoutDetailsForm['controls']['secondarylandareauomnamePark'].setValue('');
    }
    this.SecoundaryvaluechangePark();
    //this.computelandCostperAcre();
    this.calculationsArea()
  }


  // totalLandCalc() {
  //   debugger;
  //   let primaryLandareaValue = +this.layoutDetailsForm.controls.primaryLandareaValue.value;
  //   let psecondarylandarea = this.layoutDetailsForm.controls.secondarylandareavaluePark.value;
  //   let primarylandareauomname = this.layoutDetailsForm.controls.primarylandareauomname.value;
  //   let secondarylandareauomname = this.layoutDetailsForm.controls.secondarylandareauomname.value;
  //   this.totalArea = primaryLandareaValue + ' ' + primarylandareauomname + ' ' + psecondarylandarea + ' ' + secondarylandareauomname;


  //   if (secondarylandareauomname == 'Guntas') {
  //     let areaToSquareYards = primaryLandareaValue * 4840;
  //     let guntasToSquareYards = psecondarylandarea * 121;
  //     this.totalAreaInSquareYards = areaToSquareYards + guntasToSquareYards;
  //   }

  //   else if (secondarylandareauomname == 'Cent') {
  //     let areaToSquareYardss = primaryLandareaValue * 4840;
  //     let centToSquareYards = psecondarylandarea * 48.4;
  //     this.totalAreaInSquareYards = areaToSquareYardss + centToSquareYards;



  //   }

  //   else if (primarylandareauomname == 'Acre') {

  //     if (primarylandareauomname == 'Acre') {
  //       let convertAreaToSquareYards = primaryLandareaValue * 4840;
  //       this.totalAreaInSquareYards = convertAreaToSquareYards;



  //     }
  //   }

  //   else {
  //     let areaToSquareYardss = primaryLandareaValue * 4840;
  //     this.totalAreaInSquareYards = areaToSquareYardss + psecondarylandarea;
  //     // 23-01-2025



  //   }

  // }

  SecoundaryvaluechangePark() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.layoutDetailsForm['controls']['secondarylandareavaluePark'].value
    this.centValue = this.layoutDetailsForm['controls']['secondarylandareauomPark'].value;
    let psecondaryuomid = this.layoutDetailsForm['controls']['secondarylandareauomPark'].value;
    let secoundaryParkArea = this.layoutDetailsForm.controls.secondarylandareauomnamePark.value;
    let secoundaryRoadArea = this.layoutDetailsForm.controls.secondarylandareauomnameRoads.value;
    let splitSecondary = this.layoutDetailslist[0].pextentpprimarylandarea.split(' ');
    if (splitSecondary[3] == 'cents') {
      this.captilizeGridValue = splitSecondary[3].replace('cents', 'cent').toUpperCase();
    } else {
      this.captilizeGridValue = splitSecondary[3].toUpperCase();
    }
    // let captilizeGridValue = splitSecondary[3].toUpperCase();  
    let captilizeSecoundaryParkArea = secoundaryParkArea.toUpperCase();
    if (secondarylandareavalue != '' && secoundaryParkArea != '') {
      if (this.captilizeGridValue != captilizeSecoundaryParkArea) {

        if (this.captilizeGridValue == 'GUNTAS') {
          let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
          let acreValue = splitSecondaryValue[0];
          let acre = splitSecondaryValue[1];
          let guntaVlaue = splitSecondaryValue[2];
          let gunta = splitSecondaryValue[3];
          this.converGuntaTosqyards(acreValue, acre, guntaVlaue, gunta)
        }

        if (this.captilizeGridValue == 'CENT') {
          let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
          let acreValue = splitSecondaryValue[0];
          let acre = splitSecondaryValue[1];
          let centVlaue = splitSecondaryValue[2];
          let cent = splitSecondaryValue[3];
          this.converCentTosqyards(acreValue, acre, centVlaue, cent)
        }



        // this._commonservice.showWarningMessage('Select Same Secondary UOM');
        // this.layoutDetailsForm['controls']['secondarylandareavaluePark'].setValue('');
        // this.layoutDetailsForm['controls']['secondarylandareauomPark'].setValue('');
        // this.layoutDetailsForm.controls.secondarylandareauomnamePark.setValue('');
        // return;
      }
    }
    if (secondarylandareavalue != '' && secoundaryParkArea != '') {
      if (secoundaryRoadArea != secoundaryParkArea) {
        this._commonservice.showWarningMessage('Select Same Secondary UOM');
        this.layoutDetailsForm['controls']['secondarylandareavaluePark'].setValue('');
        this.layoutDetailsForm['controls']['secondarylandareauomRoadAffected'].setValue('');
        this.layoutDetailsForm['controls']['secondarylandareauomPark'].setValue('');
        this.layoutDetailsForm.controls.secondarylandareauomnamePark.setValue('');
        return;
      }
    }
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavaluePark'].setValidators([Validators.required, Validators.max(99)]);
      this.layoutDetailsForm['controls']['secondarylandareavaluePark'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavaluePark = "Cent Maximum value 99 only";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavaluePark'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavaluePark'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavaluePark'].setValidators([Validators.required, Validators.max(4839)]);
      this.layoutDetailsForm['controls']['secondarylandareavaluePark'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavaluePark = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavaluePark'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavaluePark'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavaluePark'].setValidators([Validators.required, Validators.max(39)]);
      this.layoutDetailsForm['controls']['secondarylandareavaluePark'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavaluePark = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavaluePark'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavaluePark'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }

  secondaryUom_ChangeRoads($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutDetailsForm['controls']['secondarylandareauomnameRoads'].setValue(secondaryyuomtext);
    }
    else {
      this.layoutDetailsForm['controls']['secondarylandareauomnameRoads'].setValue('');
    }
    this.SecoundaryvaluechangeRoads();
    //this.computelandCostperAcre();
    let splitSecondary = this.layoutDetailslist[0].pextentpprimarylandarea.split(' ');
    this.captilizeGridValue = splitSecondary[3].toUpperCase();
    let secoundaryRoadArea = this.layoutDetailsForm.controls.secondarylandareauomnameRoads.value;
    let captilizeSecoundaryRoadArea = secoundaryRoadArea.toUpperCase();
    if (this.captilizeGridValue == captilizeSecoundaryRoadArea) {
      this.calculationsArea()
    }
  }

  SecoundaryvaluechangeRoads() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].value
    this.centValue = this.layoutDetailsForm['controls']['secondarylandareauomRoads'].value;
    let psecondaryuomid = this.layoutDetailsForm['controls']['secondarylandareauomRoads'].value;
    let secoundaryRoadArea = this.layoutDetailsForm.controls.secondarylandareauomnameRoads.value;

    let splitSecondary = this.layoutDetailslist[0].pextentpprimarylandarea.split(' ');
    if (splitSecondary[3] == 'cents') {
      this.captilizeGridValue = splitSecondary[3].replace('cents', 'cent').toUpperCase();
    } else {
      this.captilizeGridValue = splitSecondary[3].toUpperCase();
    }
    let captilizeSecoundaryRoadArea = secoundaryRoadArea.toUpperCase();
    if (secondarylandareavalue != '' && secoundaryRoadArea != '') {
      if (this.captilizeGridValue != captilizeSecoundaryRoadArea) {

        if (this.captilizeGridValue == 'GUNTAS') {
          let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
          let acreValue = splitSecondaryValue[0];
          let acre = splitSecondaryValue[1];
          let guntaVlaue = splitSecondaryValue[2];
          let gunta = splitSecondaryValue[3];
          this.converGuntaTosqyards(acreValue, acre, guntaVlaue, gunta)
        }

        if (this.captilizeGridValue == 'CENT') {
          let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
          let acreValue = splitSecondaryValue[0];
          let acre = splitSecondaryValue[1];
          let centVlaue = splitSecondaryValue[2];
          let cent = splitSecondaryValue[3];
          this.converCentTosqyards(acreValue, acre, centVlaue, cent)
        }




        // this._commonservice.showWarningMessage('Select Same Secondary UOM');
        // this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].setValue('');
        // this.layoutDetailsForm['controls']['secondarylandareauomRoads'].setValue('');
        // this.layoutDetailsForm.controls.secondarylandareauomnameRoads.setValue('');
        // return;
      }
    }

    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(99)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueRoads = "Cent Maximum value 99 only";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(4839)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueRoads = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].setValidators([Validators.required, Validators.max(39)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueRoads = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }

  converGuntaTosqyards(acreValue, acre, guntaVlaue, gunta) {
    debugger;
    let acreValue1 = acreValue * 4840;
    let guntaVlaue1 = guntaVlaue * 121

    let gridtot = acreValue1 + guntaVlaue1;

    let primaryLandareaValueRoads = +this.layoutDetailsForm['controls']['primaryLandareaValueRoads'].value;
    let secondarylandareavalueRoads = +this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].value;

    let primaryLandareaValuePark = +this.layoutDetailsForm['controls']['primaryLandareaValuePark'].value;
    let secondarylandareavaluePark = +this.layoutDetailsForm['controls']['secondarylandareavaluePark'].value;

    let primaryLandareaValueRoadAffected = +this.layoutDetailsForm['controls']['primaryLandareaValueRoadAffected'].value;
    let secondarylandareavalueRoadAffected = +this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].value;

    let primaryLandareaValueOthers = +this.layoutDetailsForm['controls']['primaryLandareaValueOthers'].value;
    let secondarylandareavalueOthers = +this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].value;

    let primaryLandareaValueRoads1 = primaryLandareaValueRoads * 4840;
    let primaryLandareaValuePark1 = primaryLandareaValuePark * 4840;
    let primaryLandareaValueRoadAffected1 = primaryLandareaValueRoadAffected * 4840;
    let primaryLandareaValueRoadOthers1 = primaryLandareaValueOthers * 4840;
    let tot = secondarylandareavalueRoads + primaryLandareaValueRoads1 + secondarylandareavaluePark + primaryLandareaValuePark1 + primaryLandareaValueRoadAffected1 + secondarylandareavalueRoadAffected + primaryLandareaValueRoadOthers1 + secondarylandareavalueOthers;

    this.afterCalSqYds = (gridtot - tot).toFixed(2);
    const result = this.convertSqYardToAcreAndYard(this.afterCalSqYds);
    console.log(`Acres: ${result.acres}, Remaining Square Yards: ${result.remainingSqYards}`);

    this.netPlotAreaFor = `${result.acres} Acres  ${result.remainingSqYards} Square Yards`
    this.afterCalSqYds = this.afterCalSqYds + ' ' + 'Square Yards'

  }

  converCentTosqyards(acreValue, acre, centVlaue, cent) {
    debugger;
    let acreValue1 = acreValue * 4840;
    let centVlaue1 = centVlaue * 48.4

    let gridtot = acreValue1 + centVlaue1;

    let primaryLandareaValueRoads = +this.layoutDetailsForm['controls']['primaryLandareaValueRoads'].value;
    let secondarylandareavalueRoads = +this.layoutDetailsForm['controls']['secondarylandareavalueRoads'].value;

    let primaryLandareaValuePark = +this.layoutDetailsForm['controls']['primaryLandareaValuePark'].value;
    let secondarylandareavaluePark = +this.layoutDetailsForm['controls']['secondarylandareavaluePark'].value;

    let primaryLandareaValueRoadAffected = +this.layoutDetailsForm['controls']['primaryLandareaValueRoadAffected'].value;
    let secondarylandareavalueRoadAffected = +this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].value;

    let primaryLandareaValueOthers = +this.layoutDetailsForm['controls']['primaryLandareaValueOthers'].value;
    let secondarylandareavalueOthers = +this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].value;

    let primaryLandareaValueRoads1 = primaryLandareaValueRoads * 4840;
    let primaryLandareaValuePark1 = primaryLandareaValuePark * 4840;
    let primaryLandareaValueRoadAffected1 = primaryLandareaValueRoadAffected * 4840;
    let primaryLandareaValueRoadOthers1 = primaryLandareaValueOthers * 4840;
    let tot = secondarylandareavalueRoads + primaryLandareaValueRoads1 + secondarylandareavaluePark + primaryLandareaValuePark1 + primaryLandareaValueRoadAffected1 + secondarylandareavalueRoadAffected + primaryLandareaValueRoadOthers1 + secondarylandareavalueOthers;

    this.afterCalSqYds = (gridtot - tot).toFixed(2);
    const result = this.convertSqYardToAcreAndYard(this.afterCalSqYds);
    console.log(`Acres: ${result.acres}, Remaining Square Yards: ${result.remainingSqYards}`);

    this.netPlotAreaFor = `${result.acres} Acres  ${result.remainingSqYards} Square Yards`
    this.afterCalSqYds = this.afterCalSqYds + ' ' + 'Square Yards'
  }

  convertSqYardToAcreAndYard(areaInSqYard: number) {
    debugger
    const acres = Math.floor(areaInSqYard / 4840);
    const remainingSqYards = +(areaInSqYard % 4840).toFixed(2);

    return {
      acres,
      remainingSqYards
    };
  }


  secondaryUom_ChangeRoadAffected($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutDetailsForm['controls']['secondarylandareauomnameRoadAffected'].setValue(secondaryyuomtext);
    }
    else {
      this.layoutDetailsForm['controls']['secondarylandareauomnameRoadAffected'].setValue('');
    }
    this.SecoundaryvaluechangeRoadAffected();
    //this.computelandCostperAcre();
    this.calculationsArea()
  }

  SecoundaryvaluechangeRoadAffected() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].value
    this.centValue = this.layoutDetailsForm['controls']['secondarylandareauomRoadAffected'].value;
    let psecondaryuomid = this.layoutDetailsForm['controls']['secondarylandareauomRoadAffected'].value;
    let secoundaryRoadAffected = this.layoutDetailsForm.controls.secondarylandareauomnameRoadAffected.value;

    let splitSecondary = this.layoutDetailslist[0].pextentpprimarylandarea.split(' ');
    // let captilizeGridValue = splitSecondary[3].toUpperCase();  
    if (splitSecondary[3] == 'cents') {
      this.captilizeGridValue = splitSecondary[3].replace('cents', 'cent').toUpperCase();
    } else {
      this.captilizeGridValue = splitSecondary[3].toUpperCase();
    }
    let captilizeSecoundaryRoadAffected = secoundaryRoadAffected.toUpperCase();
    if (secondarylandareavalue != '' && secoundaryRoadAffected != '') {
      if (this.captilizeGridValue != captilizeSecoundaryRoadAffected) {

        if (this.captilizeGridValue == 'GUNTAS') {
          let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
          let acreValue = splitSecondaryValue[0];
          let acre = splitSecondaryValue[1];
          let guntaVlaue = splitSecondaryValue[2];
          let gunta = splitSecondaryValue[3];
          this.converGuntaTosqyards(acreValue, acre, guntaVlaue, gunta)
        }

        if (this.captilizeGridValue == 'CENT') {
          let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
          let acreValue = splitSecondaryValue[0];
          let acre = splitSecondaryValue[1];
          let centVlaue = splitSecondaryValue[2];
          let cent = splitSecondaryValue[3];
          this.converCentTosqyards(acreValue, acre, centVlaue, cent)
        }



        // this._commonservice.showWarningMessage('Select Same Secondary UOM');
        // this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].setValue('');
        // this.layoutDetailsForm['controls']['secondarylandareauomRoadAffected'].setValue('');
        // this.layoutDetailsForm.controls.secondarylandareauomnameRoadAffected.setValue('');
        // return;
      }
    }
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].setValidators([Validators.required, Validators.max(99)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueRoadAffected = "Cent Maximum value 99 only";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].setValidators([Validators.required, Validators.max(4839)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueRoadAffected = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].setValidators([Validators.required, Validators.max(39)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueRoadAffected = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueRoadAffected'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }

  secondaryUom_ChangefutureDevelopment($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutDetailsForm['controls']['secondarylandareauomnamefutureDevelopment'].setValue(secondaryyuomtext);
    }
    else {
      this.layoutDetailsForm['controls']['secondarylandareauomnamefutureDevelopment'].setValue('');
    }
    this.SecoundaryvaluechangefutureDevelopment();
    //this.computelandCostperAcre();
    this.calculationsArea()
  }

  SecoundaryvaluechangefutureDevelopment() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].value
    this.centValue = this.layoutDetailsForm['controls']['secondarylandareauomfutureDevelopment'].value;
    let psecondaryuomid = this.layoutDetailsForm['controls']['secondarylandareauomfutureDevelopment'].value;
    let secoundaryfutureDevelopment = this.layoutDetailsForm.controls.secondarylandareauomnamefutureDevelopment.value;

    let splitSecondary = this.layoutDetailslist[0].pextentpprimarylandarea.split(' ');
    // let captilizeGridValue = splitSecondary[3].toUpperCase();  
    if (splitSecondary[3] == 'cents') {
      this.captilizeGridValue = splitSecondary[3].replace('cents', 'cent').toUpperCase();
    } else {
      this.captilizeGridValue = splitSecondary[3].toUpperCase();
    }
    let captilizeSecoundaryfutureDevelopment = secoundaryfutureDevelopment.toUpperCase();
    if (secondarylandareavalue != '' && secoundaryfutureDevelopment != '') {
      // if (this.captilizeGridValue != captilizeSecoundaryfutureDevelopment) {
      //   this._commonservice.showWarningMessage('Select Same Secondary UOM');
      //   this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].setValue('');
      //   this.layoutDetailsForm['controls']['secondarylandareauomfutureDevelopment'].setValue('');
      //   this.layoutDetailsForm.controls.secondarylandareauomnamefutureDevelopment.setValue('');
      //   return;
      // }
    }
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].setValidators([Validators.required, Validators.max(99)]);
      this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavaluefutureDevelopment = "Cent Maximum value 99 only";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].setValidators([Validators.required, Validators.max(4839)]);
      this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavaluefutureDevelopment = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].setValidators([Validators.required, Validators.max(39)]);
      this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavaluefutureDevelopment = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavaluefutureDevelopment'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }





  secondaryUom_ChangeOthers($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutDetailsForm['controls']['secondarylandareauomnameOthers'].setValue(secondaryyuomtext);
    }
    else {
      this.layoutDetailsForm['controls']['secondarylandareauomnameOthers'].setValue('');
    }
    this.SecoundaryvaluechangeOthers();
    //this.computelandCostperAcre();
    this.calculationsArea()
  }

  SecoundaryvaluechangeOthers() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].value
    this.centValue = this.layoutDetailsForm['controls']['secondarylandareauomOthers'].value;
    let psecondaryuomid = this.layoutDetailsForm['controls']['secondarylandareauomOthers'].value;
    let secoundaryOthers = this.layoutDetailsForm.controls.secondarylandareauomnameOthers.value;

    let splitSecondary = this.layoutDetailslist[0].pextentpprimarylandarea.split(' ');
    //let captilizeGridValue = splitSecondary[3].toUpperCase();  
    let captilizeSecoundaryOthers = secoundaryOthers.toUpperCase();
    if (splitSecondary[3] == 'cents') {
      this.captilizeGridValue = splitSecondary[3].replace('cents', 'cent').toUpperCase();
    } else {
      this.captilizeGridValue = splitSecondary[3].toUpperCase();
    }
    if (secondarylandareavalue != '' && secoundaryOthers != '') {
      if (this.captilizeGridValue != captilizeSecoundaryOthers) {
        if (this.captilizeGridValue == 'GUNTAS') {
          let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
          let acreValue = splitSecondaryValue[0];
          let acre = splitSecondaryValue[1];
          let guntaVlaue = splitSecondaryValue[2];
          let gunta = splitSecondaryValue[3];
          this.converGuntaTosqyards(acreValue, acre, guntaVlaue, gunta)
        }
        if (this.captilizeGridValue == 'CENT') {
          let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
          let acreValue = splitSecondaryValue[0];
          let acre = splitSecondaryValue[1];
          let centVlaue = splitSecondaryValue[2];
          let cent = splitSecondaryValue[3];
          this.converCentTosqyards(acreValue, acre, centVlaue, cent)
        }
        // this._commonservice.showWarningMessage('Select Same Secondary UOM');
        // this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].setValue('');
        // this.layoutDetailsForm['controls']['secondarylandareauomOthers'].setValue('');
        // this.layoutDetailsForm.controls.secondarylandareauomnameOthers.setValue('');
        // return;
      }
    }
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].setValidators([Validators.required, Validators.max(99)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueOthers = "Cent Maximum value 99 only";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].setValidators([Validators.required, Validators.max(4839)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueOthers = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].setValidators([Validators.required, Validators.max(39)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueOthers = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueOthers'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }

  secondaryUom_ChangeTypeOfDeed($event: any): void {
    const psecondaryuomid = $event.target.value;
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutDetailsForm['controls']['secondarylandareauomnameTypeofDeed'].setValue(secondaryyuomtext);
    }
    else {
      this.layoutDetailsForm['controls']['secondarylandareauomnameTypeofDeed'].setValue('');
    }
    this.secoundaryvaluechangeTypeofDeed();
    //this.computelandCostperAcre();
    this.calculationsArea();
  }

  secoundaryvaluechangeTypeofDeed() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].value
    this.centValue = this.layoutDetailsForm['controls']['secondarylandareauomTypeofDeed'].value;
    let psecondaryuomid = this.layoutDetailsForm['controls']['secondarylandareauomTypeofDeed'].value;
    let secoundaryTypeofDeed = this.layoutDetailsForm.controls.secondarylandareauomnameTypeofDeed.value;

    let splitSecondary = this.layoutDetailslist[0].pextentpprimarylandarea.split(' ');
    //let captilizeGridValue = splitSecondary[3].toUpperCase();  
    if (splitSecondary[3] == 'cents') {
      this.captilizeGridValue = splitSecondary[3].replace('cents', 'cent').toUpperCase();
    } else {
      this.captilizeGridValue = splitSecondary[3].toUpperCase();
    }
    let captilizeSecoundaryTypeofDeed = secoundaryTypeofDeed.toUpperCase();
    // if (secondarylandareavalue != '' && secoundaryTypeofDeed != '') {
    //   if (this.captilizeGridValue != captilizeSecoundaryTypeofDeed) {
    //     this._commonservice.showWarningMessage('Select Same Secondary UOM');
    //     this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].setValue('');
    //     this.layoutDetailsForm['controls']['secondarylandareauomTypeofDeed'].setValue('');
    //     this.layoutDetailsForm.controls.secondarylandareauomnameTypeofDeed.setValue('');
    //     return;
    //   }
    // }
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].setValidators([Validators.required, Validators.max(99)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueTypeofDeed = "Cent Maximum value 99 only";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].setValidators([Validators.required, Validators.max(4839)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueTypeofDeed = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].setValidators([Validators.required, Validators.max(39)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueTypeofDeed = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueTypeofDeed'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }



  secondaryUom_ChangeNetPlotArea($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.layoutDetailsForm['controls']['secondarylandareauomnameNetPlotArea'].setValue(secondaryyuomtext);
    }
    else {
      this.layoutDetailsForm['controls']['secondarylandareauomnameNetPlotArea'].setValue('');
    }
    this.SecoundaryvaluechangeNetPlotArea();
    //this.computelandCostperAcre();
    this.calculationsArea()
  }

  SecoundaryvaluechangeNetPlotArea() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].value
    this.centValue = this.layoutDetailsForm['controls']['secondarylandareauomNetPlotArea'].value;
    let psecondaryuomid = this.layoutDetailsForm['controls']['secondarylandareauomNetPlotArea'].value;
    if (psecondaryuomid == 2) {
      this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].setValidators([Validators.required, Validators.max(99)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueNetPlotArea = "Cent Maximum value 99 only";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].setValidators([Validators.required, Validators.max(4839)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueNetPlotArea = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].setValidators([Validators.required, Validators.max(39)]);
      this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalueNetPlotArea = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].clearValidators();
        this.layoutDetailsForm['controls']['secondarylandareavalueNetPlotArea'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }


  convertToAcresToCents(primary: number, secondary: number): number {
    return primary + (secondary / 100);  // 100 cents = 1 acre
  }

  convertToAcresToSquareYards(primary: number, secondary: number): number {
    debugger
    return primary + (secondary / 4840);
  }

  convertToAcresToGuntas(primary: number, secondary: number): number {
    debugger
    return primary + (secondary / 40);
  }

  convertToAcres(primary: number): number {
    debugger
    return primary;
  }

  totalAreaInAcres: number;
  totalAcres: number;
  totalCents: number
  totalFinalArea: any;

  calculationsArea() {
    debugger;

    let primaryLandareaValuePark = +this.layoutDetailsForm.controls.primaryLandareaValuePark.value;
    let secondarylandareavaluePark = +this.layoutDetailsForm.controls.secondarylandareavaluePark.value;
    let primarylandareauomnamePark = this.layoutDetailsForm.controls.primarylandareauomnamePark.value;
    let secondarylandareauomnamePark = this.layoutDetailsForm.controls.secondarylandareauomnamePark.value;

    let primaryLandareaValueRoads = +this.layoutDetailsForm.controls.primaryLandareaValueRoads.value;
    let secondarylandareavalueRoads = +this.layoutDetailsForm.controls.secondarylandareavalueRoads.value;
    let primarylandareauomnameRoads = this.layoutDetailsForm.controls.primarylandareauomnamePark.value;
    let secondarylandareauomnameRoads = this.layoutDetailsForm.controls.secondarylandareauomnameRoads.value;

    let primaryLandareaValueRoadAffected = +this.layoutDetailsForm.controls.primaryLandareaValueRoadAffected.value;
    let secondarylandareavalueRoadAffected = +this.layoutDetailsForm.controls.secondarylandareavalueRoadAffected.value;

    let primaryLandareaValueOthers = +this.layoutDetailsForm.controls.primaryLandareaValueOthers.value;
    let primaryLandareaValueTypeofDeed = +this.layoutDetailsForm.controls.primaryLandareaValueTypeofDeed.value;
    let secondarylandareavalueOthers = +this.layoutDetailsForm.controls.secondarylandareavalueOthers.value;
    let secondarylandareavalueTypeofDeed = +this.layoutDetailsForm.controls.secondarylandareavalueTypeofDeed.value;

    let primaryLandareaValueNetPlotArea = +this.layoutDetailsForm.controls.primaryLandareaValueNetPlotArea.value;
    let secondarylandareavalueNetPlotArea = +this.layoutDetailsForm.controls.secondarylandareavalueNetPlotArea.value;

    let primaryLandareaValuefutureDevelopment = +this.layoutDetailsForm.controls.primaryLandareaValuefutureDevelopment.value;
    let secondarylandareavaluefutureDevelopment = +this.layoutDetailsForm.controls.secondarylandareavaluefutureDevelopment.value;

    let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
    let acreValue = splitSecondaryValue[0];
    let acre = splitSecondaryValue[1];
    let guntaVlaue = splitSecondaryValue[2];
    let gunta = splitSecondaryValue[3];



    if (secondarylandareauomnamePark == 'Cent' || secondarylandareauomnameRoads == 'Cent') {

      const parkArea = this.convertToAcresToCents(primaryLandareaValuePark, secondarylandareavaluePark);
      const roadsArea = this.convertToAcresToCents(primaryLandareaValueRoads, secondarylandareavalueRoads);
      const roadAffectedArea = this.convertToAcresToCents(primaryLandareaValueRoadAffected, secondarylandareavalueRoadAffected);
      const othersArea = this.convertToAcresToCents(primaryLandareaValueOthers, secondarylandareavalueOthers);
      const futureDevelopment = this.convertToAcresToCents(primaryLandareaValuefutureDevelopment, secondarylandareavaluefutureDevelopment);
      // const typeofDeedArea = this.convertToAcresToCents(primaryLandareaValueTypeofDeed,secondarylandareavalueTypeofDeed);
      // const NetPlotArea = this.convertToAcresToCents(primaryLandareaValueNetPlotArea, secondarylandareavalueNetPlotArea);

      // Calculate total area in Acres (decimal)
      this.totalAreaInAcres = parkArea + roadsArea + roadAffectedArea + othersArea + futureDevelopment;

      // Calculate total Acres and Cents
      this.totalAcres = Math.floor(this.totalAreaInAcres);  // Get integer part (Acres)
      this.totalCents = Math.round((this.totalAreaInAcres - this.totalAcres) * 100);  // Get fractional part (Cents)

      this.totalFinalArea = this.totalAcres + ' ' + primarylandareauomnameRoads + ' ' + this.totalCents + ' ' + secondarylandareauomnameRoads;

      let totalExtentArea = this.totalExtentArea - this.totalAreaInSquareYards;
      this.abc();
      this.totalExtentAreaInACres


    }

    if (gunta == secondarylandareauomnameRoads) {

      if (secondarylandareauomnamePark == 'Square Yards' || secondarylandareauomnameRoads == 'Square Yards') {

        const parkArea = this.convertToAcresToSquareYards(primaryLandareaValuePark, secondarylandareavaluePark);
        const roadsArea = this.convertToAcresToSquareYards(primaryLandareaValueRoads, secondarylandareavalueRoads);
        const roadAffectedArea = this.convertToAcresToSquareYards(primaryLandareaValueRoadAffected, secondarylandareavalueRoadAffected);
        const othersArea = this.convertToAcresToSquareYards(primaryLandareaValueOthers, secondarylandareavalueOthers);
        const futureDevelopment = this.convertToAcresToSquareYards(primaryLandareaValuefutureDevelopment, secondarylandareavaluefutureDevelopment);
        // const typeofDeedArea = this.convertToAcresToSquareYards(primaryLandareaValueTypeofDeed,secondarylandareavalueTypeofDeed);
        // const NetPlotArea = this.convertToAcresToCents(primaryLandareaValueNetPlotArea, secondarylandareavalueNetPlotArea);

        // Calculate total area in Acres (decimal)
        this.totalAreaInAcres = parkArea + roadsArea + roadAffectedArea + othersArea + futureDevelopment;

        // Calculate total Acres and Cents
        this.totalAcres = Math.floor(this.totalAreaInAcres);  // Get integer part (Acres)
        this.totalCents = Math.round((this.totalAreaInAcres - this.totalAcres) * 4840);  // Get fractional part (Cents)

        this.totalFinalArea = this.totalAcres + ' ' + primarylandareauomnameRoads + ' ' + this.totalCents + ' ' + secondarylandareauomnameRoads;
        this.abc();

        //this.convertToAcresToSquareYards
      }
    }



    if (gunta == secondarylandareauomnameRoads) {

      if (secondarylandareauomnamePark == 'Guntas' || secondarylandareauomnameRoads == 'Guntas') {

        const parkArea = this.convertToAcresToGuntas(primaryLandareaValuePark, secondarylandareavaluePark);
        const roadsArea = this.convertToAcresToGuntas(primaryLandareaValueRoads, secondarylandareavalueRoads);
        const roadAffectedArea = this.convertToAcresToGuntas(primaryLandareaValueRoadAffected, secondarylandareavalueRoadAffected);
        const othersArea = this.convertToAcresToGuntas(primaryLandareaValueOthers, secondarylandareavalueOthers);
        const futureDevelopment = this.convertToAcresToGuntas(primaryLandareaValuefutureDevelopment, secondarylandareavaluefutureDevelopment);
        // const typeofDeedArea = this.convertToAcresToGuntas(primaryLandareaValueTypeofDeed,secondarylandareavalueTypeofDeed);
        // const NetPlotArea = this.convertToAcresToCents(primaryLandareaValueNetPlotArea, secondarylandareavalueNetPlotArea);

        // Calculate total area in Acres (decimal)
        this.totalAreaInAcres = parkArea + roadsArea + roadAffectedArea + othersArea + futureDevelopment;

        // Calculate total Acres and Cents
        this.totalAcres = Math.floor(this.totalAreaInAcres);  // Get integer part (Acres)
        this.totalCents = Math.round((this.totalAreaInAcres - this.totalAcres) * 40);  // Get fractional part (Cents)

        this.totalFinalArea = this.totalAcres + ' ' + primarylandareauomnameRoads + ' ' + this.totalCents + ' ' + secondarylandareauomnameRoads;

        //this.convertToAcresToSquareYards
        this.abc();
      }
    }

    if (secondarylandareauomnamePark == '' && secondarylandareauomnameRoads == '') {

      const parkArea = this.convertToAcres(primaryLandareaValuePark);
      const roadsArea = this.convertToAcres(primaryLandareaValueRoads);
      const roadAffectedArea = this.convertToAcres(primaryLandareaValueRoadAffected);
      const othersArea = this.convertToAcres(primaryLandareaValueOthers);
      const futureDevelopment = this.convertToAcres(primaryLandareaValuefutureDevelopment);
      // const typeofDeedArea = this.convertToAcres(primaryLandareaValueTypeofDeed);
      // const NetPlotArea = this.convertToAcres(primaryLandareaValueNetPlotArea);

      // Calculate total area in Acres (decimal)
      this.totalAreaInAcres = parkArea + roadsArea + roadAffectedArea + othersArea + futureDevelopment;

      // Calculate total Acres and Cents
      this.totalAcres = Math.floor(this.totalAreaInAcres);  // Get integer part (Acres)
      this.totalCents = Math.round((this.totalAreaInAcres - this.totalAcres) * 4840);  // Get fractional part (Cents)

      this.totalFinalArea = this.totalAcres + ' ' + primarylandareauomnameRoads;

      this.abc();

      //this.convertToAcresToSquareYards
    }


    if (secondarylandareauomnamePark == 'Cent' || secondarylandareauomnameRoads == 'Cent') {
      let areaToSquareYardss = this.totalAcres * 4840;
      let centToSquareYards = this.totalCents * 48.4;
      this.totalAreaInSquareYards = areaToSquareYardss + centToSquareYards + ' ' + 'Square Yards';
      this.totalAreaInSquareYardsSave = areaToSquareYardss + centToSquareYards;
      let finalARea = areaToSquareYardss + centToSquareYards;
      let totalExtentArea = parseFloat(this.totalExtentArea.toString().replace(/,/g, ""));
      if (finalARea > totalExtentArea) {
        // this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }
      this.afterCalSqYds = Math.round(totalExtentArea - finalARea);
      this.afterCalSqYds = this.afterCalSqYds + ' ' + 'Square Yards';
    }

    else if (secondarylandareauomnamePark == 'Guntas' || secondarylandareauomnameRoads == 'Guntas') {
      let areaToSquareYards = this.totalAcres * 4840;
      let guntasToSquareYards = this.totalCents * 121;
      this.totalAreaInSquareYards = areaToSquareYards + guntasToSquareYards + ' ' + 'Square Yards';
      this.totalAreaInSquareYardsSave = areaToSquareYards + guntasToSquareYards;
      let finalARea = areaToSquareYards + guntasToSquareYards;
      let totalExtentArea = parseFloat(this.totalExtentArea.toString().replace(/,/g, ""));
      if (finalARea > totalExtentArea) {
        // this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }
      this.afterCalSqYds = Math.round(totalExtentArea - finalARea);
      this.afterCalSqYds = this.afterCalSqYds + ' ' + 'Square Yards';
    }

    else if (secondarylandareauomnamePark == '' && secondarylandareauomnamePark == '') {
      let convertAreaToSquareYards = this.totalAcres * 4840;
      this.totalAreaInSquareYards = convertAreaToSquareYards + ' ' + 'Square Yards';
      this.totalAreaInSquareYardsSave = convertAreaToSquareYards;
    }

    else {
      let areaToSquareYardss = this.totalAcres * 4840;
      this.totalAreaInSquareYards = areaToSquareYardss + this.totalCents + ' ' + 'Square Yards';
      this.totalAreaInSquareYardsSave = areaToSquareYardss + this.totalCents;
      // 23-01-2025



    }
    if (this.captilizeGridValue == 'GUNTAS') {
      if (gunta != secondarylandareauomnameRoads) {
        let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
        let acreValue = splitSecondaryValue[0];
        let acre = splitSecondaryValue[1];
        let guntaVlaue = splitSecondaryValue[2];
        let gunta = splitSecondaryValue[3];
        this.converGuntaTosqyards(acreValue, acre, guntaVlaue, gunta)
      }
    }

    if (this.captilizeGridValue == 'CENT') {
      if (gunta != secondarylandareauomnameRoads) {
        let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
        let acreValue = splitSecondaryValue[0];
        let acre = splitSecondaryValue[1];
        let guntaVlaue = splitSecondaryValue[2];
        let gunta = splitSecondaryValue[3];
        this.converCentTosqyards(acreValue, acre, guntaVlaue, gunta)
      }
    }

    let splitSecondary = this.layoutDetailslist[0].pextentpprimarylandarea.split(' ');
    this.captilizeGridValue = splitSecondary[3].toUpperCase();
    let secoundaryRoadArea = this.layoutDetailsForm.controls.secondarylandareauomnameRoads.value;
    let captilizeSecoundaryRoadArea = secoundaryRoadArea.toUpperCase();

    if(this.captilizeGridValue == 'GUNTAS' && captilizeSecoundaryRoadArea == 'CENT'){
      let splitSecondaryValue = this.totalExtentAreaInACres.split(' ');
      let acreValue = splitSecondaryValue[0];
        let acre = splitSecondaryValue[1];
        let guntaVlaue = splitSecondaryValue[2];
        let gunta = splitSecondaryValue[3];
        this.convertToAcreAndCent(this.totalExtentAreaInACres)
    }

  }

  convertToAcreAndCent(area: string): { acres: number, cents: number } {
    debugger;
    const regex = /(\d+)\s*Acre\s*(\d+)\s*Guntas/i;
    const match = area.match(regex);
  
    if (!match) {
      throw new Error('Invalid format. Expected format like "7 Acre 39 Guntas"');
    }
  
    const acres = parseInt(match[1], 10);
    const guntas = parseInt(match[2], 10);
  
    const totalCentsFromGuntas = guntas * 2.5;
  
    const totalAcres = acres;
    const remainingCents = totalCentsFromGuntas;
  
    return {
      acres: totalAcres,
      cents: remainingCents
    };
  }

  calculationsAreaInsq() {
    debugger;
    let roadAreaInSqyds = +this.layoutDetailsForm.controls.roadAreaInSqyds.value;
    let parkAreaInSqyds = +this.layoutDetailsForm.controls.parkAreaInSqyds.value;
    let roadAffectedAreaInSqyds = +this.layoutDetailsForm.controls.roadAffectedAreaInSqyds.value;
    let othersAreaInSqyds = +this.layoutDetailsForm.controls.othersAreaInSqyds.value;
    let futureDevelopmentAreaInSqyds = +this.layoutDetailsForm.controls.futureDevelopmentAreaInSqyds.value;
    let subTotal = roadAreaInSqyds + parkAreaInSqyds + roadAffectedAreaInSqyds + othersAreaInSqyds + futureDevelopmentAreaInSqyds;
    let extent = this.totalExtentArea;
    if (subTotal > extent) {
      this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
      return;
    }
    let sum = extent - subTotal;
    this.afterCalSqYds = sum + ' ' + 'Square Yards';

  }


  convertToCents(acres: number, cents: number): number {
    if (cents == undefined) {
      cents = 0;
      return (acres * 100) + cents;

    }
    else {
      return (acres * 100) + cents;
    }
  }


  convertToGuntas(acres: number, guntas: number): number {
    if (guntas == undefined) {
      guntas = 0;
      return (acres * 40) + guntas;
    }
    else {
      return (acres * 40) + guntas;
    }
  }

  convertToSquareYards(acres: number, squareYards: number): number {
    if (squareYards == undefined) {
      squareYards = 0;
      return (acres * 4840) + squareYards;
    }
    else {
      return (acres * 4840) + squareYards;
    }
  }



  convertToAcresAndCentss(totalCents: number): { acres: number, cents: number } {
    const acres = Math.floor(totalCents / 100);
    const cents = totalCents % 100;
    return { acres, cents };
  }

  convertToAcresAndGuntas(totalGuntas: number): { acres: number, guntas: number } {
    const acres = Math.floor(totalGuntas / 40);
    const guntas = totalGuntas % 40;
    return { acres, guntas };
  }

  convertToAcresAndSquareYards(totalSquareYards: number): { acres: number, squareYards: number } {
    const acres = Math.floor(totalSquareYards / 4840);
    const squareYards = totalSquareYards % 4840;
    return { acres, squareYards };
  }

  abc() {
    debugger;

    const totalAcres = this.totalExtentArea / 4840;

    let secondae = this.totalExtentAreaInACres.split(' ');
    if (secondae[3] == 'Guntas') {
      let [gridAcres, gridGuntas] = this.totalExtentAreaInACres.match(/\d+/g).map(Number);
      let [areaAcres, areaGuntas] = this.totalFinalArea.match(/\d+/g).map(Number);

      // Convert both areas to cents
      let gridTotalGunta = this.convertToGuntas(gridAcres, gridGuntas);
      let areaTotalGunta = this.convertToGuntas(areaAcres, areaGuntas);

      if (areaTotalGunta > gridTotalGunta) {
        this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }

      // Subtract the areas (in cents)
      let netPlotAreaGunta = gridTotalGunta - areaTotalGunta;

      // Convert the result back to Acres and Gunta
      let netPlotArea: any = this.convertToAcresAndGuntas(netPlotAreaGunta);

      // Final result (netPlotArea)
      console.log(`Net Plot Area: ${netPlotArea.acres} Acre(s) ${netPlotArea.guntas} Gunta(s)`);

      // You can assign this to your Angular component's netPlotArea
      this.netPlotAreaFor = `${netPlotArea.acres} Acre(s) ${netPlotArea.guntas} Gunta(s)`;
    }

    if (secondae[3] == 'Cents') {

      // Extract the numerical values of Acres and Cents from the strings
      let [gridAcres, gridCents] = this.totalExtentAreaInACres.match(/\d+/g).map(Number);
      let [areaAcres, areaCents] = this.totalFinalArea.match(/\d+/g).map(Number);

      // Convert both areas to cents
      let gridTotalCents = this.convertToCents(gridAcres, gridCents);
      let areaTotalCents = this.convertToCents(areaAcres, areaCents);


      if (areaTotalCents > gridTotalCents) {
        this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }

      // Subtract the areas (in cents)
      let netPlotAreaCents = gridTotalCents - areaTotalCents;

      // Convert the result back to Acres and Cents
      let netPlotArea: any = this.convertToAcresAndCentss(netPlotAreaCents);

      // Final result (netPlotArea)
      console.log(`Net Plot Area: ${netPlotArea.acres} Acre(s) ${netPlotArea.cents} Cent(s)`);

      // You can assign this to your Angular component's netPlotArea
      this.netPlotAreaFor = `${netPlotArea.acres} Acre(s) ${netPlotArea.cents} Cent(s)`;
    }

    if (secondae[3] == 'Cents') {

      // Extract the numerical values of Acres and Cents from the strings
      let [gridAcres, gridCents] = this.totalExtentAreaInACres.match(/\d+/g).map(Number);
      let [areaAcres, areaCents] = this.totalFinalArea.match(/\d+/g).map(Number);

      // Convert both areas to cents
      let gridTotalCents = this.convertToCents(gridAcres, gridCents);
      let areaTotalCents = this.convertToCents(areaAcres, areaCents);

      // Subtract the areas (in cents)
      let netPlotAreaCents = gridTotalCents - areaTotalCents;

      // Convert the result back to Acres and Cents
      let netPlotArea: any = this.convertToAcresAndCentss(netPlotAreaCents);

      // Final result (netPlotArea)
      console.log(`Net Plot Area: ${netPlotArea.acres} Acre(s) ${netPlotArea.cents} Cent(s)`);

      // You can assign this to your Angular component's netPlotArea
      this.netPlotAreaFor = `${netPlotArea.acres} Acre(s) ${netPlotArea.cents} Cent(s)`;
    }

    if (secondae[3] + ' ' + secondae[4] == 'Square Yards') {

      // Extract the numerical values of Acres and Cents from the strings
      let [gridAcres, gridsquareYards] = this.totalExtentAreaInACres.match(/\d+/g).map(Number);
      let [areaAcres, areasquareYards] = this.totalFinalArea.match(/\d+/g).map(Number);

      // Convert both areas to cents
      let gridTotalsquareYards = this.convertToSquareYards(gridAcres, gridsquareYards);
      let areaTotalsquareYards = this.convertToSquareYards(areaAcres, areasquareYards);

      if (areaTotalsquareYards > gridTotalsquareYards) {
        this._commonservice.showWarningMessage('Entered Total Should not be Greater than Grid Total');
        return;
      }

      // Subtract the areas (in cents)
      let netPlotAreasquareYards = gridTotalsquareYards - areaTotalsquareYards;

      // Convert the result back to Acres and squareYards
      let netPlotArea: any = this.convertToAcresAndSquareYards(netPlotAreasquareYards);

      // Final result (netPlotArea)
      console.log(`Net Plot Area: ${netPlotArea.acres} Acre(s) ${netPlotArea.squareYards} Square Yard(s)`);

      // You can assign this to your Angular component's netPlotArea
      this.netPlotAreaFor = `${netPlotArea.acres} Acre(s) ${netPlotArea.squareYards} Square Yard(s)`;
    }
  }








  DateChange($event) { }


  saveLayoutDetails() {
    debugger;

    //this.abc();

    // if (this.layoutDetailslist.length == 0) {
    //   this._commonservice.showWarningMessage('Please add data to grid');
    //   return;
    // }
    let isvalid = true;


    this.layoutDetailslist = this.layoutDetailslist.map(obj => {

      obj.ptotallandareainacres = this.totalExtentAreaInACres;
      obj.ptotallandareainsqyds = this.totalExtentArea;
      return obj;
    });

    let pDate = this.datePipe.transform(new Date(this.layoutDetailsForm.controls.proceedingDate.value), "yyyy-MM-dd")
    let data = {
      "pproceedingno": this.layoutDetailsForm.controls.proceedingNo.value,
      "pproceedingdate": pDate,
      "pissuedby": this.layoutDetailsForm.controls.issuedBy.value,
      "plptcpdpno": this.layoutDetailsForm.controls.lptcpdpNo.value,
      "playoutname": this.layoutDetailsForm.controls.layoutName.value,
      "proadarea": this.layoutDetailsForm.controls.roads.value,
      "pparkarea": this.layoutDetailsForm.controls.park.value,
      "proundoffarea": this.layoutDetailsForm.controls.roadAffected.value,
      "potherarea": this.layoutDetailsForm.controls.others.value,
      "pdescription": this.layoutDetailsForm.controls.description.value,
      "pnetplotarea": this.layoutDetailsForm.controls.netArea.value,
      "psaledeedno": this.layoutDetailsForm.controls.deedNo.value,
      "pfilename": this.kycFileName,
      "pfilepath": this.kycFilePath,
      "layoutlocation": this.layoutDetailsForm.controls.layoutLocation.value,
      "layoutlocationurl": this.layoutDetailsForm.controls.layoutUrl.value,
      "ptypeofoperation": "CREATE",
      "pcreatedby": this._commonservice.pCreatedby,
      "layoutDetailslist": this.layoutDetailslist,
      "primaryLandareaValuePark": +this.layoutDetailsForm.controls.primaryLandareaValuePark.value,
      "secondarylandareavaluePark": +this.layoutDetailsForm.controls.secondarylandareavaluePark.value,
      // "primarylandareauomname": this.layoutDetailsForm.controls.primarylandareauomnamePark.value,
      // "secondarylandareauomname": this.layoutDetailsForm.controls.secondarylandareauomnamePark.value,
      "primary_land_area_uom_Park_id": +this.layoutDetailsForm.controls.primarylandareauomPark.value,
      "secondary_land_area_uom_Park_id": +this.layoutDetailsForm.controls.secondarylandareauomPark.value,

      "primaryLandareaValueRoads": +this.layoutDetailsForm.controls.primaryLandareaValueRoads.value,
      "secondarylandareavalueRoads": +this.layoutDetailsForm.controls.secondarylandareavalueRoads.value,
      // "primarylandareauomnameRoads": this.layoutDetailsForm.controls.primarylandareauomnameRoads.value,
      // "secondarylandareauomnameRoads": this.layoutDetailsForm.controls.secondarylandareauomnameRoads.value,
      "primary_land_area_uom_Roads_id": +this.layoutDetailsForm.controls.primarylandareauomRoads.value,
      "secondary_land_area_uom_Roads_id": +this.layoutDetailsForm.controls.secondarylandareauomRoads.value,

      "primaryLandareaValueroadaffected": +this.layoutDetailsForm.controls.primaryLandareaValueRoadAffected.value,
      "secondarylandareavalueroadaffected": +this.layoutDetailsForm.controls.secondarylandareavalueRoadAffected.value,

      "primary_land_area_uom_roadaffected_id": +this.layoutDetailsForm.controls.primarylandareauomRoadAffected.value,
      "secondary_land_area_uom_roadaffected_id": +this.layoutDetailsForm.controls.secondarylandareauomRoadAffected.value,

      "primaryLandareaValueothers": +this.layoutDetailsForm.controls.primaryLandareaValueOthers.value,
      "primaryLandareaValueTypeofDeed": +this.layoutDetailsForm.controls.primaryLandareaValueTypeofDeed.value,
      "secondarylandareavalueothers": +this.layoutDetailsForm.controls.secondarylandareavalueOthers.value,
      "secondarylandareavalueTypeofDeed": +this.layoutDetailsForm.controls.secondarylandareavalueTypeofDeed.value,
      "primary_land_area_uom_others_id": +this.layoutDetailsForm.controls.primarylandareauomOthers.value,
      "primary_land_area_uom_TypeofDeed_id": +this.layoutDetailsForm.controls.primarylandareauomTypeofDeed.value,
      "secondary_land_area_uom_others_id": +this.layoutDetailsForm.controls.secondarylandareauomOthers.value,
      "secondary_land_area_uom_TypeofDeed_id": +this.layoutDetailsForm.controls.secondarylandareauomTypeofDeed.value,

      // "primaryLandareaValueNetPlotArea": +this.layoutDetailsForm.controls.primaryLandareaValueNetPlotArea.value,
      // "secondarylandareavalueNetPlotArea": +this.layoutDetailsForm.controls.secondarylandareavalueNetPlotArea.value,
      "primary_land_area_uom_NetPlotArea_id": +this.layoutDetailsForm.controls.primarylandareauomNetPlotArea.value,
      "secondary_land_area_uom_NetPlotArea_id": +this.layoutDetailsForm.controls.secondarylandareauomNetPlotArea.value,

      "land_area_in_acres_total": this.totalExtentAreaInACres,
      "land_area_in_sqys_total": this.totalExtentArea,
      "typedeedfile": this.kycFileNameTypeOfDeed,
      "typedeedfilepath": this.kycFilePathTypeOfDeed,
      "typeofdeed": this.layoutDetailsForm.controls.typeofDeed.value,
      "primaryLandareaValueNetPlotArea": this.netPlotAreaFor,
      "secondarylandareavalueNetPlotArea": this.afterCalSqYds,

      "total_extra_land_area_inacres": this.totalFinalArea,
      "total_extra_land_area_insqyds": this.totalAreaInSquareYardsSave,



    }
    console.log(JSON.stringify(data));
    if (this.checkValidations(this.layoutDetailsForm, isvalid)) {
      this._plotcreationservices.savelayout(data).subscribe(res => {
        if (res) {
          this._commonservice.showInfoMessage('Saved Successfully');
          this.clearLayoutDetails();
        }
      })
    }
  }

  clearLayoutDetails() {
    debugger;
    this.layoutDetailslist = [];
    this.layoutDetailsForm.controls.lptcpdpNo.setValue('');
    this.layoutDetailsForm.controls.proceedingNo.setValue('');
    this.layoutDetailsForm.controls.proceedingDate.setValue(new Date());
    this.layoutDetailsForm.controls.issuedBy.setValue('');
    this.layoutDetailsForm.controls.layoutName.setValue('');
    this.layoutDetailsForm.controls.layoutLocation.setValue('');
    this.layoutDetailsForm.controls.layoutUrl.setValue('');
    this.layoutDetailsForm.controls.primarylandareauomPark.setValue('1');
    this.layoutDetailsForm.controls.primarylandareauomRoads.setValue('1');
    this.layoutDetailsForm.controls.primarylandareauomRoadAffected.setValue('1');
    this.layoutDetailsForm.controls.primarylandareauomOthers.setValue('1');
    this.layoutDetailsForm.controls.primarylandareauomTypeofDeed.setValue('1');

    this.layoutDetailsForm.controls.primarylandareauomnamePark.setValue('Acre');
    this.layoutDetailsForm.controls.primarylandareauomnameRoads.setValue('Acre');
    this.layoutDetailsForm.controls.primarylandareauomnameRoadAffected.setValue('Acre');
    this.layoutDetailsForm.controls.primarylandareauomnameOthers.setValue('Acre');
    this.layoutDetailsForm.controls.primarylandareauomnameTypeofDeed.setValue('Acre');

    this.layoutDetailsForm.controls.secondarylandareauomnameRoads.setValue('');
    this.layoutDetailsForm.controls.secondarylandareauomnamePark.setValue('');
    this.layoutDetailsForm.controls.secondarylandareauomnameRoadAffected.setValue('');
    this.layoutDetailsForm.controls.secondarylandareauomnameOthers.setValue('');
    this.layoutDetailsForm.controls.secondarylandareauomnameTypeofDeed.setValue('');
    this.layoutDetailsForm.controls.secondarylandareavalueRoads.setValue('');
    this.layoutDetailsForm.controls.secondarylandareavaluePark.setValue('');
    this.layoutDetailsForm.controls.secondarylandareavalueRoadAffected.setValue('');
    this.layoutDetailsForm.controls.secondarylandareavalueOthers.setValue('');
    this.layoutDetailsForm.controls.secondarylandareavalueTypeofDeed.setValue('');
    this.layoutDetailsForm.controls.roads.setValue('');
    this.layoutDetailsForm.controls.park.setValue('');
    this.layoutDetailsForm.controls.roadAffected.setValue('');
    this.layoutDetailsForm.controls.description.setValue('');
    this.layoutDetailsForm.controls.others.setValue('');
    this.layoutDetailsForm.controls.netArea.setValue('');
    this.layoutDetailsForm.controls.deedNo.setValue('');

    this.layoutDetailsForm.controls.pDOCSTOREPATH.setValue('');
    this.layoutDetailsForm.controls.pDOCSTOREPATHTypeOfDeed.setValue('');
    this.layoutDetailsForm.controls.typeofDeed.setValue('');

    this.totalExtentArea = 0;
    this.totalExtentAreaInACres = 0;
    this.netPlotAreaFor = 0;
    this.afterCalSqYds = 0;

    this.layoutDetailsForm.controls.primaryLandareaValueRoads.setValue('');
    this.layoutDetailsForm.controls.primaryLandareaValuePark.setValue('');
    this.layoutDetailsForm.controls.primaryLandareaValueRoadAffected.setValue('');
    this.layoutDetailsForm.controls.primaryLandareaValueOthers.setValue('');



    this.grandTotalPrimaryArea = 0;
    this.grandTotalSecondaryArea = 0;
    this.grandTotalPTotal = 0;
    this.grandTotalDharaniArea = 0;
    this.grandTotalDharaniSubArea = 0;
    this.grandTotalDharaniTotal = 0;
    this.PlotsLayoutsValidationErrors.proceedingDate = '';
    this.PlotsLayoutsValidationErrors.issuedBy = '';
    this.PlotsLayoutsValidationErrors.lptcpdpNo = '';
    this.PlotsLayoutsValidationErrors.proceedingNo = '';
    this.PlotsLayoutsValidationErrors.park = '';
    this.PlotsLayoutsValidationErrors.roads = '';
    this.PlotsLayoutsValidationErrors.roadAffected = '';
    this.PlotsLayoutsValidationErrors.description = '';
    this.PlotsLayoutsValidationErrors.others = '';
    this.PlotsLayoutsValidationErrors.netArea = '';
    this.PlotsLayoutsValidationErrors.deedNo = '';
    this.PlotsLayoutsValidationErrors.secondarylandareauomnameRoads = '';
    this.PlotsLayoutsValidationErrors.secondarylandareauomnamePark = '';
    this.PlotsLayoutsValidationErrors.secondarylandareauomnameRoadAffected = '';
    this.PlotsLayoutsValidationErrors.secondarylandareauomnameOthers = '';
    this.PlotsLayoutsValidationErrors.secondarylandareauomnameTypeofDeed = '';
    this.PlotsLayoutsValidationErrors.typeofDeed = '';
    this.PlotsLayoutsValidationErrors.layoutName = '';
    this.PlotsLayoutsValidationErrors.layoutLocation = '';
    this.PlotsLayoutsValidationErrors.layoutUrl = '';
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

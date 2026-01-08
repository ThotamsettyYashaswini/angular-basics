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
  selector: 'app-court-case-details1',
  templateUrl: './court-case-details1.component.html',
  styles: []
})
export class CourtCaseDetails1Component implements OnInit {
  savebutton: any = 'Save';
  public disablesavebutton = false;
  disableclearbutton: boolean = false;

  caseDetailsdata: any = [];
  courtDetailsdata: any = [];
  advocateDetailsdata: any = [];
  relateLandDetailsdata: any = [];

  caseDetailsForm: FormGroup;
  courtDetailsForm: FormGroup;
  advocateDetailsForm: FormGroup;
  relateLandDetailsForm: FormGroup;

  Landdata: any = [];
  templanddata: any = [];
  caseDetailstabDisable: boolean = false;
  courtDetailstabEnabled: boolean = true;
  advocateDetailstabsEnabled: boolean = true;
  relatelandtabsEnabled: boolean = true;
  public ProjectLaunchdateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  courtCaseDataType: any = [];
  courtCaseStatusType: any = [];
  proDetailsList: any = [];
  addData: any = [];
  PlotsLayoutsValidationErrors: any;
  public headerCells: any = {
    textAlign: 'center'
  };
  showGrid: boolean = false;
  courtDetailsById: any = [];
  public pageSize = 10;
  public columns: Array<object>;

  public gridState: State = {
    sort: [],
    take: 10
  };
  surveyData: any = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any[];
  checkboxStates: { [key: string]: boolean } = {};
  selectedData: any = [];
  addGridData: any = [];
  buttonName: any = 'Add';
  index: any;
  SelectAllAccountHead: boolean = false;
  selectedrow: any = [];
  selectedrowLand: any = [];
  selectedrowCompany: any = [];
  selectedrowTotalLand: any = [];
  selectedrowSurveyNo: any = [];
  selectedvalues: any = "";
  selectedvaluesLands: string = "";
  selectedvaluesCompany: string = "";
  selectedvaluesSurveyNo: string = "";

  documentAdd: string = "";
  resultString: string = '';
  filteredGridData: any = [];
  selectedDocNo: any = [];
  alldocumentno: string;
  totalLand: string;
  selectedrowSurveyNo1: string;
  uncheckedData: any = [];
  checkedGridData: any = [];
  primaryuom: any;
  RequestUom = 'LAND BANK';
  primaryUomdata: any = [];
  secondaryUomdata: any = [];
  LandCostperAcre: number;
  centValue: any;
  relatedCaseNoList: any = [];


  constructor(private fb: FormBuilder, private _plotcreationservices: PlotcreationService, private commonservice: CommonService, private router: Router, private ActRoute: ActivatedRoute, private datePipe:DatePipe) {
    this.ProjectLaunchdateConfig.containerClass = 'theme-dark-blue';
    this.ProjectLaunchdateConfig.showWeekNumbers = false;
    //this.ProjectLaunchdateConfig.maxDate = this.today;
    this.ProjectLaunchdateConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit(): void {
    debugger;

    this.caseDetailsForm = this.fb.group({
      caseNO: ['', Validators.required],
      proceedingNo: [''],
      acres: [''],
      surveyNo: [''],
      guntas: [''],
      pregistereddocumentno: [''],
      casePartyType: ['Petitioner', Validators.required],
      caseTitle: [''],
      fillingDate: ['', Validators.required],
      courtName: ['', Validators.required],
      courtLocation: ['', Validators.required],
      advocateName: [''],
      advocateMobNo: [''],
      advocateEmail: [''],
      advocatePerformance: [''],
      caseStatus: [''],
      caseContestedBy: [''],
      repDocNo: [''],
      discussionPurchaseLand: ['', Validators.required],
      opponenetname: [''],
      opponenetadvocatename: [''],
      opponenetadvocatemobile: [''],
      plandbankid: [''],
      plandpurchasedetailsid: [''],
      plbCaseID: [''],
      pnameofland: [''],
      surveyNo1: [''],
      numPetitioners: [''],
      numPetitionersOrRespondent: [''],
      relatedCaseNo: [''],
      purchasedThrough: [''],
      situatedAt: [''],

      primaryLandareaValue: [''],
      secondarylandareavalue: [''],
      primarylandareauom: [''],
      secondarylandareauom: [''],
      primarylandareauomname: [''],
      secondarylandareauomname: [''],
      areaInAcres: [''],
      areaInSquareYards: ['']
    });
    if (this.ActRoute.snapshot.params['id']) {
      let caseNo = atob(this.ActRoute.snapshot.params['id']);
      this.getCourtCaseDetailsById(caseNo);
    }
    if (this.savebutton != 'Update') {
    this.getLanddata();
    }
    this.GetCourtcasepartytype();
    this.GetCourtcaseStatutypes();
    this.PlotsLayoutsValidationErrors = {};
    this.BlurEventAllControll(this.caseDetailsForm);

    this.getUOMdata();
    this.getRelatedCaseNos();


  }
  relatedCaseNoChange($event){}

  getRelatedCaseNos(){
    debugger;
    this._plotcreationservices.getRelatedCaseNos().subscribe(res => {
      this.relatedCaseNoList = res;
    })
  }

  getLanddata() {
    debugger;
    // console.log("landid after save", this.chklandbankid)
    this._plotcreationservices.getLandDetailsForCourtCases().subscribe(data => {
      debugger;
      this.Landdata = data;
      // this.Landdata = this.templanddata.filter(function (data) {
      //   return data.availableareaINACRESvalue > 0;
      // });

    })
  }

  // checkSeized(event, dataItem, rowIndex) {
  //   debugger;
  //   this.PlotsLayoutsValidationErrors.surveyNo = '';
  //   this.caseDetailsForm.controls.repDocNo.setValue('');

  //   this.caseDetailsForm.controls.surveyNo.setValue('');
  //   this.surveyData = [];
  //   this.PlotsLayoutsValidationErrors.surveyNo = '';

  //   dataItem.proceedingno;
  //   this.caseDetailsForm.controls.proceedingNo.setValue(dataItem.proceedingno);
  //   this.caseDetailsForm.controls.plandbankid.setValue(dataItem.landbankid);
  //   // this.caseDetailsForm.controls.plandpurchasedetailsid.setValue(dataItem.landpurchasedetailsid);


  //   let hhh = dataItem.landbankid

  // this.surveyData =   dataItem.landdetailslist
  // this.caseDetailsForm.controls.repDocNo.setValue(dataItem.landdetailslist[0].registereddocumentno);


  // this.PlotsLayoutsValidationErrors.surveyNo = '';
  // this.dropdownSettings = {
  //   idField: 'plandpurchasedetailsid',
  //   textField: 'surveyno',
  // }

  //   this.GetLandDetails1(hhh)

  // }



  selectAllStudentsChange($event: any) {
    debugger
    if ($event.target.checked) {
      this.SelectAllAccountHead = true;
      this.Landdata.filter(obj => obj.selectvalue = true);

    }
    else {
      this.SelectAllAccountHead = false;
      this.Landdata.filter(obj => obj.selectvalue = false);
    }

  }

  checkSeized($event, data, rowIndex) {
    debugger
    if ($event.target.checked) {
      if (this.selectedrowLand.length > 0 && !this.selectedrowLand.includes(data.nameofland)) {
        this.commonservice.showWarningMessage("You can't select different Name Of Layout");
        // Uncheck the checkbox
        $event.target.checked = false;
        return;
      }
      this.Landdata[rowIndex].selectvalue = true;
      this.SelectAllAccountHead = true;
      //this.caseDetailsForm.controls.pnameofland.setValue(data.nameofland);      
      this.selectedrow.push(data.landbankid);
      this.selectedrowLand.push(data.nameofland);
      this.selectedrowCompany.push(data.companyname);
      this.selectedrowTotalLand.push(data.totalarea);
      this.selectedrowSurveyNo.push(data);
      this.selectedvalues = ""
      this.selectedvaluesLands = ""
      this.selectedvaluesCompany = ""
      this.selectedrowSurveyNo1 = ""
      // for (let i = 0; i < this.selectedrow.length; i++) {
      //   this.selectedvalues += '@' + this.selectedrow[i] + '@,';
      //   this.selectedvalues = [...new Set(this.selectedvalues.split(','))].join(',');

      // }
      // this.selectedvalues = this.selectedvalues.toString().replace(/@/g, "'").slice(0, -1);
      // let values = this.selectedvalues.split(',');
      // let filteredValues = values.filter(value => value !== "'undefined'");
      // this.selectedvalues = filteredValues.join(',');

      this.selectedvalues = [...new Set(this.selectedrow.map(item => item))].join(', ');


      for (let i = 0; i < this.selectedrowLand.length; i++) {
        this.selectedvaluesLands += this.selectedrowLand[i] + ',';
      }
      this.selectedvaluesLands = this.selectedvaluesLands.toString().replace(/@/g, "'").slice(0, -1);
      let values1 = this.selectedvaluesLands.split(',');
      let filteredValues1 = values1.filter(value => value !== "'undefined'");
      this.selectedvaluesLands = filteredValues1.join(',');

      this.caseDetailsForm.controls.pnameofland.setValue(this.selectedvaluesLands)

      // 02-04-2025

      // for (let i = 0; i < this.selectedrowCompany.length; i++) {
      //   this.selectedvaluesCompany += '@' + this.selectedrowCompany[i] + '@,';
      //   this.selectedvaluesCompany = [...new Set(this.selectedvaluesCompany.split(','))].join(',');
      // }

      // this.selectedvaluesCompany = this.selectedvaluesCompany.toString().replace(/@/g, "'").slice(0, -1);
      // let values2 = this.selectedvaluesCompany.split(',');
      // let filteredValues2 = values2.filter(value => value !== "'undefined'");
      // this.selectedvaluesCompany = filteredValues2.join(',');

      this.selectedvaluesCompany = [...new Set(this.selectedrowCompany.map(item => item))].join(', ');


      // for (let i = 0; i < this.selectedrowSurveyNo.length; i++) {
      //   this.selectedvaluesSurveyNo += '@' + this.selectedrowSurveyNo[i] + '@,';
      //   this.selectedvaluesSurveyNo = [...new Set(this.selectedvaluesSurveyNo.split(','))].join(',');

      // }
      // this.selectedvaluesSurveyNo = this.selectedvaluesSurveyNo.toString().replace(/@/g, "'").slice(0, -1);
      // let values3 = this.selectedvaluesSurveyNo.split(',');
      // let filteredValues3 = values3.filter(value => value !== "'undefined'");
      // this.selectedvaluesSurveyNo = filteredValues3.join(',');

      // this.selectedrowSurveyNo1 = [...new Set(this.selectedrowSurveyNo.map(item => item.surveyno))].join(', ');

      this.selectedrowSurveyNo1 = [...new Set(this.selectedrowSurveyNo.map(item => item.surveyno))]
        .map(surveyno => `'${surveyno}'`).join(', ');
    let aa = this.Landdata.filter(obj => obj.selectvalue == true);


      this.GetLandDetails1(this.selectedvalues, this.selectedrowSurveyNo1);
    }
    else {
      this.Landdata[rowIndex].selectvalue = false;
      let data = this.Landdata.filter(obj => obj.selectvalue == false)
      this.uncheckedData = this.Landdata.filter(obj => obj.selectvalue == true)

      if (data.length == this.Landdata.length)
        this.SelectAllAccountHead = false;
      // this.selectedrow.splice(rowIndex, 1);
      // this.selectedrowCompany.splice(rowIndex, 1);
      // this.selectedrowTotalLand.splice(rowIndex, 1);
      // this.selectedrowSurveyNo.splice(rowIndex, 1);
      this.selectedvalues = ""
      this.selectedvaluesCompany = ""
      this.selectedrowSurveyNo1 = ""
      // for (let i = 0; i < this.selectedrow.length; i++) {
      //   this.selectedvalues += '@' + this.selectedrow[i] + '@,';
      //   this.selectedvalues = [...new Set(this.selectedvalues.split(','))].join(',');

      // }
      // this.selectedvalues = this.selectedvalues.toString().replace(/@/g, '').slice(0, -1);

      this.selectedvalues = [...new Set(this.uncheckedData.map(item => item.landbankid))].join(', ');

      if (this.selectedvalues == '') {
        this.selectedvalues = 0;
        this.proDetailsList = [];
        this.selectedrow = [];
        this.selectedrowLand = [];
        this.selectedrowCompany = [];
        this.selectedrowTotalLand = [];
        this.selectedrowSurveyNo = [];
      }

      // for (let i = 0; i < this.selectedrowCompany.length; i++) {
      //   this.selectedvaluesCompany += '@' + this.selectedrow[i] + '@,';
      // }
      // this.selectedvaluesCompany = this.selectedvaluesCompany.toString().replace(/@/g, '').slice(0, -1);

      this.selectedvaluesCompany = [...new Set(this.uncheckedData.map(item => item.companyname))].join(', ');


      this.selectedrowSurveyNo1 = [...new Set(this.uncheckedData.map(item => item.surveyno))]
        .map(surveyno => `'${surveyno}'`).join(', ');
      if (this.selectedrowSurveyNo1 == "") {
        this.selectedrowSurveyNo1 = '';
        this.proDetailsList = [];
        this.selectedrow = [];
        this.selectedrowLand = [];
        this.selectedrowCompany = [];
        this.selectedrowTotalLand = [];
        this.selectedrowSurveyNo = [];
      }
      this.GetLandDetails1(this.selectedvalues, this.selectedrowSurveyNo1)

    }

    this.totalLand = this.calculateTotalLand(this.selectedrowTotalLand);



  }

  getUOMdata() {
    this.commonservice.GetUomData(this.RequestUom).subscribe(data => {
      this.primaryUomdata = data;
      this.secondaryUomdata = this.primaryUomdata.filter(function (data) {
        return data.secondarylandareauomname != "Acre";
      });

      this.caseDetailsForm['controls']['primarylandareauom'].setValue('1');  
      this.caseDetailsForm['controls']['primarylandareauomname'].setValue('Acre');


    })


  }

  primaryUom_Change($event: any): void {
    debugger;
    this.primaryuom = $event.target.value;
    const pPrimaryuomid = $event.target.value;
    if (pPrimaryuomid && pPrimaryuomid != '') {
      const primaryuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.caseDetailsForm['controls']['primarylandareauomnamePark'].setValue(primaryuomtext);
      this.caseDetailsForm['controls']['primarylandareauomname'].setValue(primaryuomtext);
      this.caseDetailsForm['controls']['primarylandareauomnameRoadAffected'].setValue(primaryuomtext);
      this.caseDetailsForm['controls']['primarylandareauomnameOthers'].setValue(primaryuomtext);
      this.caseDetailsForm['controls']['primarylandareauomnameTypeofDeed'].setValue(primaryuomtext);
      this.caseDetailsForm['controls']['primarylandareauomnameNetPlotArea'].setValue(primaryuomtext);
    }
    else {
      this.caseDetailsForm['controls']['primarylandareauomnamePark'].setValue(' ');
      this.caseDetailsForm['controls']['primarylandareauomname'].setValue(' ');
      this.caseDetailsForm['controls']['primarylandareauomnameRoadAffected'].setValue(' ');
      this.caseDetailsForm['controls']['primarylandareauomnameOthers'].setValue(' ');
      this.caseDetailsForm['controls']['primarylandareauomnameTypeofDeed'].setValue('');
      this.caseDetailsForm['controls']['primarylandareauomnameNetPlotArea'].setValue(' ');
    }

  }

  secondaryUom_Change($event: any): void {
    const psecondaryuomid = $event.target.value;
    // this.LandCostperAcre = 0;
    if (psecondaryuomid == 2) {
      this.caseDetailsForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(99)]);
    }
    if (psecondaryuomid == 5) {
      this.caseDetailsForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(4839)]);
    }
    if (psecondaryuomid == 7) {
      this.caseDetailsForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(39)]);
    }
    if (psecondaryuomid && psecondaryuomid != '') {
      const secondaryyuomtext = $event.target.options[$event.target.selectedIndex].text;
      this.caseDetailsForm['controls']['secondarylandareauomname'].setValue(secondaryyuomtext);
    }
    else {
      this.caseDetailsForm['controls']['secondarylandareauomname'].setValue('');
    }
    this.Secoundaryvaluechange();
    //this.computelandCostperAcre();
    // this.calculationsArea()
  }

  getConvertedArea() {
    debugger
    const primaryLandareaValue = +this.caseDetailsForm.controls.primaryLandareaValue.value;
    const secondarylandareavalue = +this.caseDetailsForm.controls.secondarylandareavalue.value;
    const areaInSquareYards = this.convertToSquareYards(primaryLandareaValue, secondarylandareavalue);

    const primarylandareauomname = this.caseDetailsForm.controls.primarylandareauomname.value; 
    const secondarylandareauomname = this.caseDetailsForm.controls.secondarylandareauomname.value; 

    this.caseDetailsForm.controls.areaInAcres.setValue(primaryLandareaValue + ' ' + primarylandareauomname + ' ' + secondarylandareavalue + ' ' + secondarylandareauomname);
    this.caseDetailsForm.controls.areaInSquareYards.setValue(`${areaInSquareYards}`);

    console.log(`${areaInSquareYards}`);
  }

  convertToSquareYards(primaryLandareaValue: number, secondarylandareavalue: number): number {
    debugger;
    let secoundaryArea =  this.caseDetailsForm.controls.secondarylandareauomname.value;

    if(secoundaryArea == "Guntas"){

    const acreToSquareYards = 4840;
    const guntaToSquareYards = 121;

    const totalSquareYards = (primaryLandareaValue * acreToSquareYards) + (secondarylandareavalue * guntaToSquareYards);
    return totalSquareYards;
  }

  if(secoundaryArea == "Cent"){

    const acreToSquareYards = 4840; 
    const centToSquareYards = 48.4; 

    const totalSquareYards = (primaryLandareaValue * acreToSquareYards) + (secondarylandareavalue * centToSquareYards);
    return totalSquareYards;
  }

  if(secoundaryArea == "Square Yards"){

    const acreToSquareYards = 4840;
    const totalSquareYards = (primaryLandareaValue * acreToSquareYards) + (secondarylandareavalue);
    return totalSquareYards;
  } 


  }

  Secoundaryvaluechange() {
    debugger
    this.LandCostperAcre = 0;
    let secondarylandareavalue = this.caseDetailsForm['controls']['secondarylandareavalue'].value
    this.centValue = this.caseDetailsForm['controls']['secondarylandareauom'].value;
    let psecondaryuomid = this.caseDetailsForm['controls']['secondarylandareauom'].value;
    let secoundaryRoadArea =  this.caseDetailsForm.controls.secondarylandareauomname.value;


    if (psecondaryuomid == 2) {
      this.caseDetailsForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(99)]);
      this.caseDetailsForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 99) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalue = "Cent Maximum value 99 only";
        return
      }
      else {
        this.caseDetailsForm['controls']['secondarylandareavalue'].clearValidators();
        this.caseDetailsForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 5) {
      this.caseDetailsForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(4839)]);
      this.caseDetailsForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 4839) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalue = "Square Yards Maximum value 4839 Only ";
        return
      }
      else {
        this.caseDetailsForm['controls']['secondarylandareavalue'].clearValidators();
        this.caseDetailsForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }

    if (psecondaryuomid == 7) {
      this.caseDetailsForm['controls']['secondarylandareavalue'].setValidators([Validators.required, Validators.max(39)]);
      this.caseDetailsForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      if (secondarylandareavalue > 39) {
        this.PlotsLayoutsValidationErrors.secondarylandareavalue = "Gunta Maximum value 39 Only ";
        return
      }
      else {
        this.caseDetailsForm['controls']['secondarylandareavalue'].clearValidators();
        this.caseDetailsForm['controls']['secondarylandareavalue'].updateValueAndValidity();
      }
    }
    this.PlotsLayoutsValidationErrors = {};
    //this.computelandCostperAcre();

  }

  calculateTotalLand(selectedrowTotalLand: string[]): string {
    let totalAcres = 0;
    let totalGuntas = 0;
    let parts
    let acres
    let secondaryVal
    let secondaryValue

    selectedrowTotalLand.forEach(land => {
      parts = land.trim().split(" "); // Split by spaces
      acres = parseFloat(parts[0]); // Extract acre value
      secondaryVal = parseFloat(parts[2]); // Extract guntas value
      secondaryValue = parts[3]; // Extract guntas value

      totalAcres += acres;
      totalGuntas += secondaryVal;
    });

    if (secondaryValue == 'GUNTAS') {
      // Convert guntas to acres if >= 40
      totalAcres += Math.floor(totalGuntas / 40);
      totalGuntas = totalGuntas % 40;

      return `${totalAcres.toFixed(2)} ACER ${totalGuntas.toFixed(2)} GUNTAS`;
    }

    if (secondaryValue == 'CENTS') {
      // Convert guntas to acres if >= 40
      totalAcres += Math.floor(totalGuntas / 100);
      totalGuntas = totalGuntas % 100;

      return `${totalAcres.toFixed(2)} ACER ${totalGuntas.toFixed(2)} CENTS`;
    }

    if (secondaryValue == '' || secondaryValue == undefined) {
      // Convert guntas to acres if >= 40
      // totalAcres += acres


      return `${totalAcres.toFixed(2)} ACER`;
    }


  }

  // selectAllStudentsChange($event: any, dataItem, rowIndex) {
  //   debugger

  //   if ($event.target.checked) {
  //     rowIndex.selectvalue = true;
  //     //this.SelectAllClassificationss = true;
  //   }
  // }

  // clickselectforpayments($event: any, dataItem, rowIndex) {
  //   debugger

  //   if ($event.target.checked) {
  //     rowIndex.selectvalue = true;
  //     //this.SelectAllClassificationss = true;
  //   }
  //   else{
  //     rowIndex.selectvalue = true;
  //   }
  // }

  public onItemSelect(item: any) {
    debugger
    this.caseDetailsForm.controls.repDocNo.setValue('');
    this.selectedData = [];
    let data = this.surveyData.find(({ plandpurchasedetailsid }) => plandpurchasedetailsid == item.plandpurchasedetailsid);
    this.selectedData = [...this.selectedData, ...data];
    console.log(this.selectedData);
    this.caseDetailsForm.controls.repDocNo.setValue(this.selectedData[0].registereddocumentno);

    let daya = this.selectedData

  }

  public onDeSelect(item: any) {
    debugger
    this.selectedData = this.selectedData.filter((itemData) => itemData.plandpurchasedetailsid !== item.plandpurchasedetailsid);
    console.log(this.selectedData);
    let avv = this.selectedData
    this.caseDetailsForm.controls.repDocNo.setValue('');

  }

  public onSelectAll(items: any) {
    debugger;
    let i;
    this.selectedData = [];
    for (i = 0; i < items.length; i++) {
      let plandpurchasedetailsid = items[i].plandpurchasedetailsid;
      let data = this.surveyData.filter(function (data) {
        return data.plandpurchasedetailsid == plandpurchasedetailsid;
      });
      this.selectedData = [...this.selectedData, ...data];
    }
    this.caseDetailsForm.controls.repDocNo.setValue(this.selectedData[0].registereddocumentno);

    let ggg = this.selectedData
  }

  public onDeSelectAll() {
    debugger;
    this.selectedData = [];
    let ggwg = this.selectedData
    this.caseDetailsForm.controls.repDocNo.setValue('');
  }

  DateChange(event) {
    debugger
  }

  GetCourtcasepartytype() {
    debugger;
    this._plotcreationservices.GetCourtcasepartytype().subscribe(result => {
      this.courtCaseDataType = result;
    })
  }

  GetCourtcaseStatutypes() {
    debugger;
    this._plotcreationservices.GetCourtcaseStatutypes().subscribe(result => {
      this.courtCaseStatusType = result;
    })

  }

  // GetLandDetail(abc){
  //   debugger;
  //   this._plotcreationservices.GetLandDetail(abc).subscribe(aaa => {
  //     this.proDetailsList = aaa;
  //   })
  // }

  GetLandDetails1(data, selectedvaluesSurveyNo) {
    debugger;
    this._plotcreationservices.GetLandDetails1(data, selectedvaluesSurveyNo).subscribe(res => {
      this.proDetailsList = res;

      this.alldocumentno = [...new Set(this.proDetailsList.map(item => item.pregistereddocumentno))].join(', ');
      // this.alldocumentno = this.alldocumentno.toString().replace(/@/g, "'").slice(0, -1);    
      
      this.caseDetailsForm.controls.repDocNo.setValue(this.alldocumentno);

      console.log(this.alldocumentno);


      if (this.savebutton != 'Update') {
        this.showGrid = true;

      }

      // 
      // this.documentAdd = ''
      // for (let i = 0; i < this.proDetailsList.length; i++) {
      //   this.documentAdd += '@' + this.proDetailsList[i].pregistereddocumentno + '@,';

      // }      

      // this.documentAdd = this.documentAdd.toString().replace(/@/g, '').slice(0, -1);
      // this.documentAdd = this.documentAdd.replace(/'/g, '');

      // let valuesArray = this.documentAdd.replace(/'/g, '').split(',');

      // let uniqueValues = [...new Set(valuesArray)];

      // this.documentAdd = uniqueValues.map(value => `'${value}'`).join(',');
      // console.log(this.documentAdd);

      // this.caseDetailsForm.controls.repDocNo.setValue(this.documentAdd);



      //this.caseDetailsForm.controls.surveyNo.setValue(res[0].psurveyno);
      this.caseDetailsForm.controls.acres.setValue(res[0].pprimarylandarea);
      this.caseDetailsForm.controls.guntas.setValue(res[0].psecondarylandarea);
      this.caseDetailsForm.controls.pregistereddocumentno.setValue(res[0].pregistereddocumentno);
      this.caseDetailsForm.controls.plandpurchasedetailsid.setValue(res[0].plandpurchasedetailsid);
    })
  }

  addToGrid() {
    debugger;

    if (this.buttonName != 'Update') {

      if (this.caseDetailsForm.controls.advocateName.value != '' && this.caseDetailsForm.controls.advocateMobNo.value != '') {

        let data = {
          "padvocatename": this.caseDetailsForm.controls.advocateName.value,
          "padvocatephone": this.caseDetailsForm.controls.advocateMobNo.value,
          "padvocatemail": this.caseDetailsForm.controls.advocateEmail.value,
          "pcreatedby": this.commonservice.pCreatedby,
          "plandbankid": 0,
          "plandpurchasedetailsid": this.caseDetailsForm.controls.plandpurchasedetailsid.value,
          "psurveyno": this.caseDetailsForm.controls.surveyNo1.value
        }
        this.addGridData.push(data);
        this.caseDetailsForm.controls.advocateName.setValue(''),
          this.caseDetailsForm.controls.advocateMobNo.setValue(''),
          this.caseDetailsForm.controls.advocateEmail.setValue('')
      } else {
        this.commonservice.showWarningMessage('Add Details');
      }
    }

    if (this.buttonName == 'Update') {

      if (this.caseDetailsForm.controls.advocateName.value != '' && this.caseDetailsForm.controls.advocateMobNo.value != '' && this.caseDetailsForm.controls.advocateEmail.value != '') {

        this.index

        this.addGridData[this.index].padvocatename = this.caseDetailsForm.controls.advocateName.value;
        this.addGridData[this.index].padvocatephone = this.caseDetailsForm.controls.advocateMobNo.value;
        this.addGridData[this.index].padvocatemail = this.caseDetailsForm.controls.advocateEmail.value;
        this.addGridData[this.index].pcreatedby = this.commonservice.pCreatedby;
        this.addGridData[this.index].plandbankid = 0;
        this.addGridData[this.index].plandpurchasedetailsid = this.caseDetailsForm.controls.plandpurchasedetailsid.value;
        this.addGridData[this.index].psurveyno = this.caseDetailsForm.controls.surveyNo1.value;
        console.log(this.addGridData);
        this.buttonName = 'Add';
        this.caseDetailsForm.controls.advocateName.setValue(''),
          this.caseDetailsForm.controls.advocateMobNo.setValue(''),
          this.caseDetailsForm.controls.advocateEmail.setValue('')
      }
      else {
        this.commonservice.showWarningMessage('Add / Update Details');
      }
    }

  }

  advocateDetailsGridDataEdit(row, rowIndex) {
    debugger;
    this.index = rowIndex;
    let data = row;
    this.buttonName = 'Update';
    this.caseDetailsForm.controls.advocateName.setValue(data.padvocatename);
    this.caseDetailsForm.controls.advocateMobNo.setValue(data.padvocatephone);
    this.caseDetailsForm.controls.advocateEmail.setValue(data.padvocatemail);







  }

  deleteAdvocateDetailsGridData(row, rowIndex) {
    debugger;
    this.addGridData.splice(rowIndex, 1);
    this.addGridData = this.addGridData;
    this.buttonName = 'Add';

    this.caseDetailsForm.controls.advocateName.setValue('');
    this.caseDetailsForm.controls.advocateMobNo.setValue('');
    this.caseDetailsForm.controls.advocateEmail.setValue('');
  }

  saveCourtCaseDetails() {
    debugger;
    // this.addData = {

    // }
    this.Landdata = this.Landdata.filter(obj => obj.selectvalue == true);
    // let abc = this.Landdata[0].landdetailslist
    // for (let index = 0; index < this.Landdata.length; index++) {
    //   this.filteredGridData = this.Landdata[index].landdetailslist;

    // }
    // console.log(this.filteredGridData);

    if (this.Landdata.length == 0) {
      this.commonservice.showWarningMessage('Please Select');
      return;
    }

    this.checkedGridData = this.Landdata.filter(obj => obj.selectvalue == true)

    if (this.addGridData.length == 0) {
      this.commonservice.showWarningMessage('Please add data to grid');
      return;
    }
    let isvalid = true;
    if (this.checkValidations(this.caseDetailsForm, isvalid)) {

      if (this.savebutton == 'Update') {
        this.updateCourtCaseDetails();
      }

      if (this.savebutton != 'Update') {
        if (this.proDetailsList.length == 0) {
          this.commonservice.showWarningMessage('Please Select Land');
          return
        }

        let selectedItemsdata =[];


        for(let i=0; i<this.Landdata.length; i++){
          let data ={
            "landbankid":this.Landdata[i].landbankid,
            "nameofland": this.Landdata[i].nameofland,
            "surveyno": this.Landdata[i].surveyno,
            "totalareainacers": this.Landdata[i].totalarea,
            "registereddocumentno": this.Landdata[i].registereddocumentno,
            "vendorname": this.Landdata[i].vendorname,
            "companyname": this.Landdata[i].companyname,
            "representednby": this.Landdata[i].companyname,
            "cityvillage": this.Landdata[i].companyname,
        
          }
          selectedItemsdata.push(data)
    
        }

        console.log(this.proDetailsList.length);
        let fillingDate = this.datePipe.transform(new Date(this.caseDetailsForm.controls.fillingDate.value), "yyyy-MM-dd")
        let data = {
          "plbCaseID": 0,
          // "plandbankid": this.caseDetailsForm.controls.plandbankid.value,
          "plandbankid": 0,
          "plandpurchasedetailsid": this.caseDetailsForm.controls.plandpurchasedetailsid.value,

          "psurveyno": this.caseDetailsForm.controls.surveyNo1.value,

          //"psurveyno": "",

          "pCasePartytype": this.caseDetailsForm.controls.casePartyType.value,
          "plbCaseNumber": this.caseDetailsForm.controls.caseNO.value,
          "plbCaseTitle": this.caseDetailsForm.controls.caseTitle.value,
          "plbFilingDate": fillingDate,
          "pnameofland": this.caseDetailsForm.controls.pnameofland.value,

          "plbCaseType": this.caseDetailsForm.controls.casePartyType.value,

          "pCourtName": this.caseDetailsForm.controls.courtName.value,
          "pCourtLocation": this.caseDetailsForm.controls.courtLocation.value,
          // "pAdvocateName": this.caseDetailsForm.controls.advocateName.value,
          // "pAdvmobileno": this.caseDetailsForm.controls.advocateMobNo.value,
          "pAdvperformance": this.caseDetailsForm.controls.advocatePerformance.value,
          "pCaseStatus": this.caseDetailsForm.controls.caseStatus.value,
          "pWhoiscontentcourtcase": this.caseDetailsForm.controls.caseContestedBy.value,
          "pRepresentedbydocumentinland": this.caseDetailsForm.controls.repDocNo.value,
          "pWhoiswithdiscussioninpurchaseland": this.caseDetailsForm.controls.discussionPurchaseLand.value,
          "popponentname": this.caseDetailsForm.controls.opponenetname.value,
          "popponentadvocatename": this.caseDetailsForm.controls.opponenetadvocatename.value,
          "popponentadvocatemobileno": this.caseDetailsForm.controls.opponenetadvocatemobile.value,
          "pstatusid": 0,
          "pcreatedby": this.commonservice.pCreatedby,
          "landdetailslist": this.Landdata,
          "advocateDetailslist": this.addGridData,
          "pcompanyname": this.selectedvaluesCompany,
          "pmultiplelandbankids": this.selectedvalues,
          "preferencedocno": this.alldocumentno,
          "ptotallandarea": this.totalLand,
          "pcaseserialno": this.caseDetailsForm.controls.numPetitionersOrRespondent.value,
          "pprimarysuitlandarea": +this.caseDetailsForm.controls.primaryLandareaValue.value,
          "psecondarysuitlandarea": +this.caseDetailsForm.controls.secondarylandareavalue.value,
          "pprimarysuitlandareauomid": +this.caseDetailsForm.controls.primarylandareauom.value,
          "psecondarysuitlandareauomid": +this.caseDetailsForm.controls.secondarylandareauom.value,
          "ptotalsuitlandareainacres": this.caseDetailsForm.controls.areaInAcres.value,
          "ptotalsuitlandareainsqyds": +this.caseDetailsForm.controls.areaInSquareYards.value,
          "psituatedat": this.caseDetailsForm.controls.situatedAt.value,
          "ppurchasedthrough": this.caseDetailsForm.controls.purchasedThrough.value,
          "prelatedcaseno": this.caseDetailsForm.controls.relatedCaseNo.value,
          "caseLandlist": selectedItemsdata,
        }

        let bbb = JSON.stringify(data)
        console.log(bbb);

        //return;
        this._plotcreationservices.SaveCourtCases(bbb).subscribe(resdata => {
          this.commonservice.showInfoMessage('Saved Successfully');
          this.caseDetailsForm.reset();
          this.clearForm();
          this.router.navigate(["/ViewCourtCaseDetails"])
        })
      }

    }
  }

  updateCourtCaseDetails() {  
    debugger;
    let data = {
      "plbCaseID": this.caseDetailsForm.controls.plbCaseID.value,
      "plandbankid": this.caseDetailsForm.controls.plandbankid.value,
      "plandpurchasedetailsid": this.caseDetailsForm.controls.plandpurchasedetailsid.value,
      "psurveyno": this.caseDetailsForm.controls.surveyNo1.value,
      "pCasePartytype": this.caseDetailsForm.controls.casePartyType.value,
      "plbCaseNumber": this.caseDetailsForm.controls.caseNO.value,
      "plbCaseTitle": this.caseDetailsForm.controls.caseTitle.value,
      "plbFilingDate": this.caseDetailsForm.controls.fillingDate.value,

      "plbCaseType": this.caseDetailsForm.controls.casePartyType.value,

      "pCourtName": this.caseDetailsForm.controls.courtName.value,
      "pCourtLocation": this.caseDetailsForm.controls.courtLocation.value,
      // "pAdvocateName": this.caseDetailsForm.controls.advocateName.value,
      // "pAdvmobileno": this.caseDetailsForm.controls.advocateMobNo.value,
      "pAdvperformance": this.caseDetailsForm.controls.advocatePerformance.value,
      "pCaseStatus": this.caseDetailsForm.controls.caseStatus.value,
      "pWhoiscontentcourtcase": this.caseDetailsForm.controls.caseContestedBy.value,
      "pRepresentedbydocumentinland": this.caseDetailsForm.controls.repDocNo.value,
      "pWhoiswithdiscussioninpurchaseland": this.caseDetailsForm.controls.discussionPurchaseLand.value,
      "pstatusid": 0,
      "pcreatedby": this.commonservice.pCreatedby,
      "advocateDetailslist": this.addGridData,
    }

    let bbb = JSON.stringify(data)

    this._plotcreationservices.updateCourtCaseDetails(bbb).subscribe(resdata => {
      this.commonservice.showInfoMessage('Updated Successfully');
      this.caseDetailsForm.reset();
      this.clearForm();
      this.router.navigate(["/ViewCourtCaseDetails"])
    })

  }

  getCourtCaseDetailsById(caseNo) {
    debugger;
    this.savebutton = 'Update';
    this.Landdata = [];
    this.addGridData = [];
    this._plotcreationservices.viewCourtCaseDetailsById(caseNo).subscribe(res => {
      this.courtDetailsById = res;
      this.caseDetailsForm.controls.plbCaseID.setValue(res[0].plbCaseID);
      this.caseDetailsForm.controls.plandbankid.setValue(res[0].plandbankid);
      this.caseDetailsForm.controls.casePartyType.setValue(res[0].pCasePartytype);
      this.caseDetailsForm.controls.caseNO.setValue(res[0].plbCaseNumber);
      this.caseDetailsForm.controls.caseTitle.setValue(res[0].plbCaseTitle);
      this.caseDetailsForm.controls.fillingDate.setValue(res[0].plbFilingDate);
      this.caseDetailsForm.controls.casePartyType.setValue(res[0].plbCaseType);
      this.caseDetailsForm.controls.courtName.setValue(res[0].pCourtName);
      this.caseDetailsForm.controls.courtLocation.setValue(res[0].pCourtLocation);
      // this.caseDetailsForm.controls.advocateName.setValue(res[0].pAdvocateName);
      // this.caseDetailsForm.controls.advocateMobNo.setValue(res[0].pAdvmobileno);
      this.caseDetailsForm.controls.advocatePerformance.setValue(res[0].pAdvperformance);
      this.caseDetailsForm.controls.caseStatus.setValue(res[0].pCaseStatus);
      this.caseDetailsForm.controls.caseContestedBy.setValue(res[0].pWhoiscontentcourtcase);
      this.caseDetailsForm.controls.repDocNo.setValue(res[0].pRepresentedbydocumentinland);
      this.caseDetailsForm.controls.discussionPurchaseLand.setValue(res[0].pWhoiswithdiscussioninpurchaseland);
      this.surveyData = res[0].landdetailslist;
      this.addGridData = res[0].advocateDetailslist;
      this.Landdata = res[0].landdetailslist;
      let selectedvalues = [...new Set(this.Landdata.map(item => item.landbankid))].join(', ');

      let selectedrowSurveyNo1 = [...new Set(this.Landdata.map(item => item.surveyno))]
        .map(surveyno => `'${surveyno}'`).join(', ');

      this.GetLandDetails1(selectedvalues, selectedrowSurveyNo1);

      this.caseDetailsForm.controls.surveyNo1.setValue(res[0].psurveyno);
      
      // this.caseDetailsForm.controls.surveyNo.setValue(res[0].psurveyno);
      //this.GetLandDetails1(res[0].plandbankid);
    })

  }









  clearForm() {
    debugger;
    this.PlotsLayoutsValidationErrors.caseNO = '';
    this.PlotsLayoutsValidationErrors.casePartyType = 'Petitioner';
    this.PlotsLayoutsValidationErrors.caseTitle = '';
    this.PlotsLayoutsValidationErrors.fillingDate = '';
    this.PlotsLayoutsValidationErrors.courtName = '';
    this.PlotsLayoutsValidationErrors.courtLocation = '';
    this.PlotsLayoutsValidationErrors.advocateName = '';
    this.PlotsLayoutsValidationErrors.advocateMobNo = '';
    this.PlotsLayoutsValidationErrors.advocatePerformance = '';
    this.PlotsLayoutsValidationErrors.caseStatus = '';
    this.PlotsLayoutsValidationErrors.caseContestedBy = '';
    this.PlotsLayoutsValidationErrors.repDocNo = '';
    this.PlotsLayoutsValidationErrors.discussionPurchaseLand = '';
    this.PlotsLayoutsValidationErrors.surveyNo1 = '';
    this.Landdata = [];
    this.addGridData = [];

    // this.PlotsLayoutsValidationErrors.quantity = '';
    // this.PlotsLayoutsValidationErrors.quantity = '';
    // this.PlotsLayoutsValidationErrors.quantity = '';
    // this.PlotsLayoutsValidationErrors.quantity = '';
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
                errormessage = this.commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
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


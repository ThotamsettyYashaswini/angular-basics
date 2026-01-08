import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { State, process } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
import { ExcelExportData, Workbook } from '@progress/kendo-angular-excel-export';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import * as kendo from '@progress/kendo-drawing';
declare const $: any;
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
@Component({
  selector: 'app-mutation-of-land',
  templateUrl: './mutation-of-land.component.html',
  styles: []
})
export class MutationOfLandComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild(GridComponent, { static: false }) grid: GridComponent;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  mutationOfLandData: any = [];
  public pageSize = 10;

  public gridState: State = {
    sort: [],
    take: 10
  };
  public headerCells: any = {
    textAlign: 'center'
  };
  GridData: any = [];
  public squareYards: any = 'sq. yd.'
  fileNameDocs: any = [];
  stylevarable: boolean = true;
  pfilename: any;
  extension: any;
  ViewImageDocs: string;
  path: string;
  fileDownload: any;
  pfilenameTypeOfDeed: any;
  ViewImageDocsTypeOfDeed: string;
  imageViewData: any = [];
  viewFileType: any;
  ViewImage: string;
  mutationOfLandForm: FormGroup;
  proceedinglist: any = [];
  villageList: any = [];
  documentList: any = [];
  proceedingNo: any;
  villageName: any;
  documentNo: any;
  public isLoading: boolean = false;
  companyData: any = [];
  companyName: any;
  surveyNoList: any;
  surveyNo: any;
  isExporting: boolean = false;
  skip = 0;
  headerFlag: any = false;
  headerAllFlag: any = false;
  headerCompanyFlag: any = false;

  constructor(private _plotcreationservices: PlotcreationService, private commonservice: CommonService,
    private router: Router, private datePipe: DatePipe, private http: HttpClient, private fb: FormBuilder, private _landBankService: LandBankService) {
    this.allData = this.allData.bind(this);
  }

  ngOnInit() {
    debugger;
    let urldata = environment.apiURL;
    this.http.get(urldata).subscribe(res => {
      //this.path=res[0]['ApiHostUrl'];
      let appspath = res[0]['ApiHostUrl'].split("/");
      this.path = appspath[0] + '//' + appspath[2] + '/Upload/';
      // console.log(res)
    });
    this.mutationOfLandForm = this.fb.group({
      companyName: ['All'],
      proceedingNo: ['All'],
      villageName: ['All'],
      documentno: ['All'],
      surveyNo: ['All'],
    })
    //this.viewMutationDetails();
    //this.getMutationReport();
    this.getProceedingsMutation();
    this.getvillagesMutation();
    this.getDocumentsMutation();
    this.getCompanyslbreport();
  }


  getCompanyslbreport() {
    this._landBankService.getCompanyslbreport().subscribe(res => {
      let json: any = [];
      json = res;
      let tempArray = [{ "companynameid": 0, "companyname": 'All' }];
      let companyNameslist = [...tempArray, ...json];
      this.companyData = companyNameslist;
    });
  }

  companyName_Change(event) { 
    debugger;
    this.companyName = event.companyname;
    this.mutationOfLandData = [];
    this.mutationOfLandForm.controls.villageName.setValue('All');
    this.mutationOfLandForm.controls.documentno.setValue('All');
    this.mutationOfLandForm.controls.surveyNo.setValue('All');

    this.getvillagesMutation();
  }

  getProceedingsMutation() {
    this._landBankService.getProceedingsMutation().subscribe(res => {
      let json: any = [];
      json = res;
      let tempArray = [{ "pproceedingnoid": 0, "pproceedingno": 'All' }];
      let proceedinglist = [...tempArray, ...json];
      this.proceedinglist = proceedinglist;
    });
  }

  proceedingNo_Change(event) {
    debugger;
    this.mutationOfLandForm.controls.villageName.setValue('All');
    this.mutationOfLandForm.controls.documentno.setValue('All');
    this.proceedingNo = event.pproceedingno;
    this.mutationOfLandData = [];
    //this.getMutationReport();

  }

  getvillagesMutation() {
    this._landBankService.getvillagesMutation(this.companyName).subscribe(res => {
      let json: any = [];
      json = res;
      let tempArray = [{ "pVillagemandalid": 0, "pVillagemandal": 'All' }];
      let villageList = [...tempArray, ...json];
      this.villageList = villageList;
    });
  }

  villageName_Change(event) {
    debugger;
    this.villageName = event.pVillagemandal;
    this.mutationOfLandForm.controls.documentno.setValue('All');
    this.mutationOfLandForm.controls.surveyNo.setValue('All');
    this.getDocumentsMutation();
    //this.getMutationSurveyNo();

  }

  getDocumentsMutation() {
    this._landBankService.getDocumentsMutation(this.companyName,this.villageName).subscribe(res => {
      let json: any = [];
      json = res;
      let tempArray = [{ "pregistereddocnoid": 0, "pregistereddocno": 'All' }];
      let documentList = [...tempArray, ...json];
      this.documentList = documentList;
    });
  }

  documentNo_Change(event) {
    debugger;
    this.documentNo = event.pregistereddocno;
    this.mutationOfLandForm.controls.surveyNo.setValue('All');

    this.getMutationSurveyNo();
    //this.getMutationReport();
  }

  getMutationSurveyNo(){
    debugger;
    this._landBankService.getMutationSurveyNo(this.companyName,this.villageName,this.documentNo).subscribe(rs =>{
      this.surveyNoList  = rs;
    })
  }

  surveyNo_Change(event){
    debugger;
    this.surveyNo = event.psurveyno;
  }

  getMutationReport() {
    debugger;
    this.isLoading = true;

    let companyName = this.mutationOfLandForm.controls.companyName.value;
    let villageName = this.mutationOfLandForm.controls.villageName.value;
    let documentNo = this.mutationOfLandForm.controls.documentno.value;
    let surveyNo = this.mutationOfLandForm.controls.surveyNo.value;

    if (companyName == undefined || companyName == 'All') {
      companyName = 'null';
    }
    if (villageName == undefined || villageName == 'All') {
      villageName = 'null';
    }
    if (documentNo == undefined || documentNo == 'All') {
      documentNo = 'null';
    }

     if (surveyNo == undefined || surveyNo == 'All') {
      surveyNo = 'null';
    }

    if (this.mutationOfLandForm.controls.companyName.value != 'All' && this.mutationOfLandForm.controls.villageName.value != 'All') {
      this.headerFlag = true;
      this.headerAllFlag = false;
      this.headerCompanyFlag = false;
    }
    if (this.mutationOfLandForm.controls.companyName.value == 'All' && this.mutationOfLandForm.controls.villageName.value == 'All') {
      this.headerAllFlag = true;
      this.headerFlag = false;
      this.headerCompanyFlag = false;

    }

    if (this.mutationOfLandForm.controls.companyName.value != 'All' && this.mutationOfLandForm.controls.villageName.value == 'All') {
      this.headerCompanyFlag = true;
      this.headerFlag = false;
      this.headerAllFlag = false;
    }

    //  if (proceedingNo == 'null' && villageName !='null') {
    //   this.commonservice.showWarningMessage('Please Select Proceeding No.');
    //   return;
    // }

    this._landBankService.getMutationReport(companyName,villageName, documentNo,surveyNo).subscribe(result => {
      this.GridData = result;
      this.mutationOfLandData = this.GridData;
      this.expandAllRows();
      this.isLoading = false;
      this.calculateLandAreaDifferences();
      if(this.GridData.length == 0){
        this.commonservice.showWarningMessage('No Data To Retrieve');
      }
      //this.mutationOfLandData = result;
    })
  }
  expandAllRows() {
    this.mutationOfLandData.forEach((item, index) => {
      this.grid.expandRow(index); // Expands each row based on its index
    });
  }

//   calculateLandAreaDifference() {
//     debugger;
//   this.mutationOfLandData.forEach(mutation => {
//     mutation.mutationDetailslist.forEach(detail => {
//       const totalSqYds = Number(detail.ptotallandareainsqyds) || 0;
//       const allocatedSqYds = Number(detail.allocationmutationareainsqyds) || 0;

//       const difference = totalSqYds - allocatedSqYds;

//       detail.landAreaDifferenceInSqYds = difference;
//       detail.landAreaDifferenceInAcresAndGuntas = this.convertSqYardsToAcresGuntas(Math.abs(difference));
//     });
//     console.log(this.mutationOfLandData);
    
//   });
// }

// convertSqYardsToAcresGuntas(sqYards: number): string {
//   debugger;
//   const ACRE_IN_SQYD = 4840;
//   const GUNTA_IN_SQYD = 121;

//   const acres = Math.floor(sqYards / ACRE_IN_SQYD);
//   const remainingYards = sqYards % ACRE_IN_SQYD;
//   const guntas = Math.floor(remainingYards / GUNTA_IN_SQYD);

//   return `${acres} Acre ${guntas} Guntas`;
// }

calculateLandAreaDifferences(): void {
  debugger
  this.mutationOfLandData.forEach(mutation => {
    mutation.mutationDetailslist.forEach(detail => {
      const totalSqYds = parseFloat(detail.ptotallandareainsqyds) || 0;
      const allocatedSqYds = parseFloat(detail.allocationmutationareainsqyds) || 0;

      const differenceSqYds = +(totalSqYds - allocatedSqYds).toFixed(2); // Avoid floating point precision issues

      // Determine the unit type from the original land area text (Guntas or Cents)
      const unitTypeText = detail.ptotallandareainacres || '';

      // Convert and assign
      detail.landAreaDifferenceInSqYds = differenceSqYds;
      detail.landAreaDifferenceInAcresAndGuntas = this.convertSqYdsToAcresSubUnit(Math.abs(differenceSqYds), unitTypeText);
    });
    console.log(this.mutationOfLandData);

  });
}


convertSqYdsToAcresSubUnit(sqYds: number, unitLabel: string): string {
  debugger
  const ACRE_IN_SQYD = 4840;
  let subUnitInSqYds // Default: Gunta
  let label

  if (unitLabel.toLowerCase().includes('cent')) {
    subUnitInSqYds = 48.4;
    label = 'Cents';
  }

   if (unitLabel.toLowerCase().includes('guntas')) {
    subUnitInSqYds = 121;
    label = 'Guntas';
  }

  const acres = Math.floor(sqYds / ACRE_IN_SQYD);
  const remainder = sqYds % ACRE_IN_SQYD;
  const subUnits = +(remainder / subUnitInSqYds).toFixed(2); // Round to 2 decimal places

  return `${acres} Acre ${subUnits} ${label}`;
}


  view() {
    this.router.navigate(["/MutationDetails"])
  }
  //dataItem.documentStoreDTO


  ViewimgData(dataItem) {
    debugger
    this.imageViewData = [];


    //  this.imageViewData =   dataItem.documentStoreDTO;
    this.imageViewData = dataItem.mutationDetailslist[0].documentStoreDTO



    $('#ViewuploadDocs').modal('show');
    this.stylevarable = false;
  }

  downloadimgData(dataItem) {
    debugger
    this.viewFileType = dataItem.pDOCFILENAME.split('.').pop();
    // this.ViewImage =this.path+'Documents/'+dataItem[0].FilePath ; 
    this.ViewImage = this.path + dataItem.pDOCFILENAME;
    if (this.viewFileType == 'pdf' || this.viewFileType == 'PDF') {
      window.open(this.ViewImage);
    }
    else {
      let filepath = dataItem.pDOCFILENAME;
      this.commonservice.GetImage(filepath).subscribe(res => {
        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + res[0]; //Image Base64 Goes here
        a.download = dataItem.pDOCFILENAME; //File name Here
        a.click(); //Downloaded file
      })
    }
  }

  public onFilter(inputValue: string): void {
    this.mutationOfLandData = process(this.GridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pproceedingno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pissuedby',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'ppattakhathano',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'psurveyno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'ptotallandareainacres',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }

  allData() {

    const result: ExcelExportData = {
      data: process(this.mutationOfLandData, { sort: [{ field: 'pReferenceId', dir: 'desc' }] }).data
    };

    return result;
  }

  downloadExcel(): void {
    const rows: any[] = [];

    const parentHeaders = ['Mutation Proceeding No.', 'Mutation Date', 'Competent Authority', 'Custody At'];
    const childHeaders = ['Village/Mandal', 'Survey No. ', 'Doc. No. ', 'Land Area', 'Land Area(sq.yds)', 'Allocated Land Area', 'Allocated Land Area'];

    const formatDate = (date: any) => {
      if (!date) return '';
      if (date instanceof Date) return date.toLocaleDateString();
      return new Date(date).toLocaleDateString();
    };

    const border = { color: '#000000', size: 1 };
    const borderAll = { top: border, bottom: border, left: border, right: border };

    const parentHeaderStyle = {
      bold: true,
      background: '#003366',
      color: '#FFFFFF',
      textAlign: 'center',
      verticalAlign: 'center',
      border: borderAll
    };

    const subHeaderStyle = {
      bold: true,
      background: '#ADD8E6',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'center',
      border: borderAll
    };

    const cellStyle = {
      border: borderAll,
      textAlign: 'center',
      verticalAlign: 'center'
    };

    // Optional: Add top title row
    rows.push({
      cells: [{
        value: 'Mutation Details',
        colSpan: 8,
        bold: true,
        fontSize: 14,
        textAlign: 'center',
        color: '#000000'
      }]
    });

    // Add parent headers only once
    rows.push({
      cells: [
        { value: parentHeaders[0], ...parentHeaderStyle },
        { value: parentHeaders[1], ...parentHeaderStyle },
        { value: parentHeaders[2], ...parentHeaderStyle },
        { value: parentHeaders[3], ...parentHeaderStyle },
        { value: parentHeaders[4], ...parentHeaderStyle },
        { value: parentHeaders[5], ...parentHeaderStyle },
        { value: parentHeaders[6], ...parentHeaderStyle },
        { value: parentHeaders[7], ...parentHeaderStyle },
        // { value: parentHeaders[8], ...parentHeaderStyle },
        // { value: parentHeaders[9], ...parentHeaderStyle },
        // { value: parentHeaders[10], ...parentHeaderStyle },
        // { value: parentHeaders[11], ...parentHeaderStyle },
      ]
    });

    if (this.mutationOfLandData.length) {
      for (const item of this.mutationOfLandData) {
        // let pDate = this.datePipe.transform(new Date(item.pproceedingdate), "dd-MM-yyyy")
        // Parent data row
        rows.push({
          cells: [
            { value: item.pproceedingno, ...cellStyle },
            { value: item.pproceedingdate, ...cellStyle },

            { value: item.pissuedby || '', ...cellStyle },
            { value: item.ppattakhathano || '', ...cellStyle },


            // { value: formatDate(item.pwarrantyfrom), ...cellStyle },
            // { value: formatDate(item.pwarrantyto), ...cellStyle },
            // { value: '', ...cellStyle },
            // { value: '', ...cellStyle }
          ]
        });

        // Child header row
        rows.push({
          cells: [
            { value: '', ...subHeaderStyle },
            { value: childHeaders[0], ...subHeaderStyle },
            { value: childHeaders[1], ...subHeaderStyle },
            { value: childHeaders[2], ...subHeaderStyle },
            { value: childHeaders[3], ...subHeaderStyle },
            { value: childHeaders[4], ...subHeaderStyle },
            { value: childHeaders[5], ...subHeaderStyle },
            { value: childHeaders[6], ...subHeaderStyle },
            // { value: childHeaders[7], ...subHeaderStyle }
          ]
        });

        // Child data rows
        if (item.mutationDetailslist.length) {
          for (const detail of item.mutationDetailslist) {
            rows.push({
              cells: [
                { value: '', ...cellStyle },
                { value: detail.pVillagemandal || '', ...cellStyle },
                { value: detail.psurveyno || '', ...cellStyle },
                { value: detail.pregistereddocno || '', ...cellStyle },
                { value: detail.ptotallandareainacres || '', ...cellStyle },
                { value: detail.ptotallandareainsqyds || '', ...cellStyle },
                { value: detail.allocationmutationareainacers || '', ...cellStyle },
                { value: detail.allocationmutationareainsqyds || '', ...cellStyle },
                // { value: detail.prate || '', ...cellStyle },
                // { value: detail.pcgstpercentage || '', ...cellStyle },
                // { value: detail.psgstpercentage || '', ...cellStyle },
                // { value: detail.pigstpercentage || '', ...cellStyle },
                // { value: detail.passetsamount || '', ...cellStyle }
              ]
            });
          }
        }
      }
    }

    const workbook = new Workbook({
      sheets: [{
        name: 'Court Case Details',
        rows: rows,
        columns: [
          { width: 150 },
          { width: 180 },
          { width: 150 },
          { width: 150 },
          { width: 120 },
          { width: 120 },
          { width: 150 },
          { width: 150 },
          { width: 150 },
          { width: 150 },
          { width: 150 },
          { width: 150 }
        ]
      }]
    });

    workbook.toDataURL().then((dataUrl) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'Mutation_Details.xlsx';
      link.click();
    });
  }

  splitSurveyNo(surveyno: string | null | undefined): string[][] {
    debugger;
    const safe = (surveyno || '').split('/');
    return safe.map(part => part.trim().split(''));
  }

  isTeluguChar(char: string): boolean {
    return /[\u0C00-\u0C7F]/.test(char);
  }

  exportPDF(): void {
    this.isExporting = true;
    const currentSkip = this.skip;
    const currentPageSize = this.pageSize;
    this.isLoading = true;
  
    this.skip = 0;
    this.pageSize = this.mutationOfLandData.length;
  
    const paginator = this.pdfContent.nativeElement.querySelector('.k-pager-wrap');
    if (paginator) {
      paginator.style.display = 'none';
    }
  
    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.fontSize = '20px';
    header.style.fontWeight = 'bold';
    header.style.marginBottom = '20px';
  
    if (this.headerFlag) {
      header.innerText = `${this.mutationOfLandForm.controls.companyName.value} - ${this.mutationOfLandForm.controls.villageName.value}`;
    } else if (this.headerCompanyFlag) {
      header.innerText = `${this.mutationOfLandForm.controls.companyName.value}`;
    } else if (this.headerAllFlag) {
      header.innerText = 'Mutation Of Land Details';
    } else {
      header.innerText = 'Mutation Of Land';
    }
  
    this.pdfContent.nativeElement.insertBefore(header, this.pdfContent.nativeElement.firstChild);
  
    setTimeout(() => {
      drawDOM(this.pdfContent.nativeElement, {
        paperSize: 'A3',
        scale: 0.55,
        landscape: true,
        margin: {
          top: '1cm',
          bottom: '0.5cm',
          left: '0.5cm',
          right: '0.5cm',
        }
      })
      .then(group => exportPDF(group))
      .then(dataUri => {
        saveAs(dataUri, 'Purchase_Of_Land.pdf');
      })
      .catch(err => {
        console.error('PDF export failed:', err);
      })
      .finally(() => {
        // Clean up
        this.pdfContent.nativeElement.removeChild(header);
        this.skip = currentSkip;
        this.pageSize = currentPageSize;
  
        if (paginator) {
          paginator.style.display = '';
        }
  
        this.isLoading = false;
      });
    }, 500);
  }

  

}

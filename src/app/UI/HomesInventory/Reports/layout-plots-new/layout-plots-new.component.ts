import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { State, process } from '@progress/kendo-data-query';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
import { CommonService } from 'src/app/Services/common.service';
import { Workbook } from '@progress/kendo-angular-excel-export';
import { DatePipe } from '@angular/common';
import * as kendo from '@progress/kendo-drawing';
declare const $: any;
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
import { log } from 'console';
@Component({
  selector: 'app-layout-plots-new',
  templateUrl: './layout-plots-new.component.html',
  styles: []
})
export class LayoutPlotsNewComponent implements OnInit {
  @ViewChild(GridComponent, { static: false }) grid: GridComponent;
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  layoutForm: FormGroup;
  companyData: any = [];
  villageList: any = [];
  documentList: any = [];
  surveyNoList: any = [];
  layoutPlotData: any = [];
  GridData: any = [];
  isLoading: boolean = false;
  companyName: any;
  villageName: any;
  documentNo: any;
  surveyNo: any;
  public pageSize = 10;

  public gridState: State = {
    sort: [],
    take: 10
  };
  public headerCells: any = {
    textAlign: 'center'
  };
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
  isExporting: boolean = false;
  skip = 0;
  headerFlag: any = false;
  headerAllFlag: any = false;
  headerCompanyFlag: any = false;
  Type: string;
  layoutView: boolean = false;
  detailedLayoutView: boolean = false;
  childHeaders: string[];
  constructor(private fb: FormBuilder, private _landBankService: LandBankService, private commonservice: CommonService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.layoutForm = this.fb.group({
      companyName: ['All'],
      proceedingNo: ['All'],
      villageName: ['All'],
      documentno: ['All'],
      surveyNo: ['All']
    });
    this.getCompanyslbreport();
    this.Type = 'layoutView';
    this.layoutViewClick();
  }

  layoutViewClick() {
    debugger;
    this.Type = "layoutView";
    this.layoutView = true;
    this.detailedLayoutView = false;
    this.layoutPlotData = [];
  }

  detailedLayoutViewClick() {
    debugger
    this.Type = "detailedLayoutView";
    this.layoutView = false;
    this.detailedLayoutView = true;
    this.layoutPlotData = [];
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
    this.layoutPlotData = [];
    this.layoutForm.controls.villageName.setValue('All');
    this.layoutForm.controls.documentno.setValue('All');
    this.layoutForm.controls.surveyNo.setValue('All');

    this.getVillagesLayout();
  }

  getVillagesLayout() {
    debugger;
    this._landBankService.getVillagesLayout(this.companyName).subscribe(villageData => {
      this.villageList = villageData;
    })
  }

  villageName_Change(event) {
    debugger;
    this.layoutForm.controls.documentno.setValue('All');
    this.layoutForm.controls.surveyNo.setValue('All');
    this.villageName = event.cityvillage;
    this.getDocumentsLayout();
  }

  getDocumentsLayout() {
    debugger;
    this._landBankService.getDocumentsLayout(this.companyName, this.villageName).subscribe(docData => {
      this.documentList = docData;
    })
  }

  documentNo_Change(event) {
    debugger;
    this.documentNo = event.pdocumentno;
    this.layoutForm.controls.surveyNo.setValue('All');
    this.getMutationsurveyNo();
  }

  getMutationsurveyNo() {
    debugger;
    this._landBankService.getMutationsurveyNo(this.companyName, this.villageName, this.documentNo).subscribe(surveyData => {
      this.surveyNoList = surveyData;
    })
  }

  surveyNo_Change(event) {
    debugger;
    this.surveyNo = event.psurveyno;
  }


  getLayoutDetails() {
    debugger;
    this.isLoading = true;
    let companyName = this.layoutForm.controls.companyName.value;
    let villageName = this.layoutForm.controls.villageName.value;
    let documentNo = this.layoutForm.controls.documentno.value;
    let surveyNo = this.layoutForm.controls.surveyNo.value;

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
    if (this.layoutForm.controls.companyName.value != 'All' && this.layoutForm.controls.villageName.value != 'All') {
      this.headerFlag = true;
      this.headerAllFlag = false;
      this.headerCompanyFlag = false;
    }
    if (this.layoutForm.controls.companyName.value == 'All' && this.layoutForm.controls.villageName.value == 'All') {
      this.headerAllFlag = true;
      this.headerFlag = false;
      this.headerCompanyFlag = false;

    }

    if (this.layoutForm.controls.companyName.value != 'All' && this.layoutForm.controls.villageName.value == 'All') {
      this.headerCompanyFlag = true;
      this.headerFlag = false;
      this.headerAllFlag = false;
    }
    //, documentNo, surveyNo,, villageName
    this._landBankService.getLayoutReport(companyName).subscribe(layoutData => {
      this.GridData = layoutData;
      this.layoutPlotData = this.GridData;
      this.expandAllRows();
      this.isLoading = false;

      this.layoutPlotData.forEach(layout => {
        const parts = layout.totallandareainacreslandbank.split('Acre');
        layout.acres = +parts[0].trim();
        let abc = parts[1].trim();
        let def = abc.split(' ');
        def[1]
        if(def[1] == 'Cents'){
        layout.cents = +(parts[1].replace('Cents', '').trim());
        }

        if(def[1] == 'Guntas'){
        layout.cents = +(parts[1].replace('Guntas', '').trim());
        }

        const par = layout.land_area_in_sqys_total;

        const totLayoutArea = +par;
        console.log('this is total layout value:',totLayoutArea);
        
        layout.salablePlottedArea = Math.round(totLayoutArea - layout.totallandareavalueroadsinsqyards - layout.totallandareavalueparkinyards - layout.totallandareavalueothersaminitiesinsqyards - layout.totallandareavalueroadaffectedinsqyards)
        console.log('this is total vallue:',layout.salablePlottedArea)
        layout.layoutDetailslist.forEach(detail => {
        });
      });
    })
  }

  expandAllRows() {
    this.layoutPlotData.forEach((item, index) => {
      this.grid.expandRow(index); // Expands each row based on its index
    });
  }

  // FILTERS
  ViewimgData1(row) {
    debugger;

    this.fileNameDocs = [];


    this.pfilenameTypeOfDeed = row.typedeedfile;

    this.pfilenameTypeOfDeed = this.pfilenameTypeOfDeed.toUpperCase();

    let ett = this.pfilenameTypeOfDeed.split('.');

    this.extension = this.pfilenameTypeOfDeed.trim().split('.').pop();

    //this.extension = ett[1];


    this.fileDownload = this.pfilenameTypeOfDeed.trim()


    $('#ViewuploadTypeOfDeed').modal('show');
    this.stylevarable = false;

  }

  downloadimgData1(data) {
    debugger
    let data1 = this.pfilenameTypeOfDeed.trim();

    this.ViewImageDocsTypeOfDeed = this.path + data1;
    if (this.extension == 'PDF') {
      window.open(this.ViewImageDocsTypeOfDeed);
    }

    else {
      let filepathDocs = this.ViewImageDocsTypeOfDeed;
      this.commonservice.GetImage(filepathDocs).subscribe(res => {
        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + res[0]; //Image Base64 Goes here
        a.download = data; //File name Here
        a.click(); //Downloaded file
      })
    }
  }

  public onFilter(inputValue: string): void {
    this.layoutPlotData = process(this.GridData, {
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

  // downloadExcel(): void {
  //   const rows: any[] = [];

  //   const parentHeaders = ['Name Of The Company', 'Location of Land', 'Location of Land', 'State', 'Acres', 'Guntas / Cents', 'In Square Yards', 'Total Layout Area', 'Roads Area', 'Parks Area', 'Amenities', 'Others / Road affected Area', 'Saleable Plotted Area'];
  //   //const childHeaders = ['Document No.', 'Survey No.', 'Land Area', 'Land Area(sq.yds)'];

  //   const formatDate = (date: any) => {
  //     if (!date) return '';
  //     if (date instanceof Date) return date.toLocaleDateString();
  //     return new Date(date).toLocaleDateString();
  //   };

  //   const border = { color: '#000000', size: 1 };
  //   const borderAll = { top: border, bottom: border, left: border, right: border };

  //   const parentHeaderStyle = {
  //     bold: true,
  //     background: '#003366',
  //     color: '#FFFFFF',
  //     textAlign: 'center',
  //     verticalAlign: 'center',
  //     border: borderAll
  //   };

  //   const subHeaderStyle = {
  //     bold: true,
  //     background: '#ADD8E6',
  //     color: '#000000',
  //     textAlign: 'center',
  //     verticalAlign: 'center',
  //     border: borderAll
  //   };

  //   const cellStyle = {
  //     border: borderAll,
  //     textAlign: 'center',
  //     verticalAlign: 'center'
  //   };

  //   // Optional: Add top title row
  //   rows.push({
  //     cells: [{
  //       value: 'Layout Details',
  //       colSpan: 8,
  //       bold: true,
  //       fontSize: 14,
  //       textAlign: 'center',
  //       color: '#000000'
  //     }]
  //   });

  //   // Add parent headers only once
  //   rows.push({
  //     cells: [
  //       { value: parentHeaders[0], ...parentHeaderStyle },
  //       { value: parentHeaders[1], ...parentHeaderStyle },
  //       { value: parentHeaders[2], ...parentHeaderStyle },
  //       { value: parentHeaders[3], ...parentHeaderStyle },
  //       { value: parentHeaders[4], ...parentHeaderStyle },
  //       { value: parentHeaders[5], ...parentHeaderStyle },
  //       { value: parentHeaders[6], ...parentHeaderStyle },
  //       { value: parentHeaders[7], ...parentHeaderStyle },
  //       { value: parentHeaders[8], ...parentHeaderStyle },
  //       { value: parentHeaders[9], ...parentHeaderStyle },
  //       { value: parentHeaders[10], ...parentHeaderStyle },
  //       { value: parentHeaders[11], ...parentHeaderStyle },
  //       { value: parentHeaders[12], ...parentHeaderStyle },
  //       { value: parentHeaders[13], ...parentHeaderStyle },
  //       { value: parentHeaders[14], ...parentHeaderStyle },
  //       // { value: parentHeaders[14], ...parentHeaderStyle },
  //     ]
  //   });

  //   if (this.layoutPlotData.length) {
  //     for (const item of this.layoutPlotData) {
  //       //let pDate = this.datePipe.transform(new Date(item.pproceedingdate), "dd-MM-yyyy")
  //       let ddd = 'Open Land'

  //       // Parent data row
  //       rows.push({
  //         cells: [
  //           { value: item.companyname, ...cellStyle },
  //           { value: item.cityvillage, ...cellStyle },
  //           { value: ddd, ...cellStyle },
  //           { value: item.state, ...cellStyle },
  //           { value: item.acres, ...cellStyle },
  //           { value: item.cents, ...cellStyle },
  //           { value: item.totallandareainsqydslandbank, ...cellStyle },
  //           // { value: item.playoutname, ...cellStyle },
  //           { value: item.secondarylandareavalueNetPlotArea, ...cellStyle },
  //           { value: item.totallandareavalueroadsinsqyards, ...cellStyle },
  //           { value: item.totallandareavalueparkinyards, ...cellStyle },
  //           { value: item.totallandareavalueothersaminitiesinsqyards, ...cellStyle },
  //           { value: item.totallandareavalueroadaffectedinsqyards, ...cellStyle },
  //           { value: item.salablePlottedArea, ...cellStyle },
           

  //           // { value: item.ppattakhathano || '', ...cellStyle },


  //           // { value: formatDate(item.pwarrantyfrom), ...cellStyle },
  //           // { value: formatDate(item.pwarrantyto), ...cellStyle },
  //           // { value: '', ...cellStyle },
  //           // { value: '', ...cellStyle }
  //         ]
  //       });

       
  //     }
  //   }

  //   const workbook = new Workbook({
  //     sheets: [{
  //       name: 'Layout Details',
  //       rows: rows,
  //       columns: [
  //         { width: 150 },
  //         { width: 180 },
  //         { width: 150 },
  //         { width: 150 },
  //         { width: 120 },
  //         { width: 120 },
  //         { width: 150 },
  //         { width: 150 },
  //         { width: 150 },
  //         { width: 150 },
  //         { width: 150 },
  //         { width: 150 },
  //         { width: 200 },
  //         { width: 200 },
  //         { width: 180 },
  //         { width: 180 },
  //       ]
  //     }]
  //   });

  //   workbook.toDataURL().then((dataUrl) => {
  //     const link = document.createElement('a');
  //     link.href = dataUrl;
  //     link.download = 'Layout_Details.xlsx';
  //     link.click();
  //   });
  // }

  downloadExcel(): void {
    const rows: any[] = [];

    const parentHeaders = ['Name Of The Company', 'Location of Land', 'Location of Land', 'State', 'Acres', 'Guntas / Cents', 'In Square Yards', 'Total Layout Area', 'Roads Area', 'Parks Area', 'Amenities', 'Others / Road affected Area', 'Saleable Plotted Area'];
    if(this.detailedLayoutView){
    this.childHeaders = ['Document No.', 'Survey No.', 'Land Area', 'Land Area(sq.yds)'];
    }

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
        value: 'Layout Details',
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
        { value: parentHeaders[8], ...parentHeaderStyle },
        { value: parentHeaders[9], ...parentHeaderStyle },
        { value: parentHeaders[10], ...parentHeaderStyle },
        { value: parentHeaders[11], ...parentHeaderStyle },
        { value: parentHeaders[12], ...parentHeaderStyle },
        { value: parentHeaders[13], ...parentHeaderStyle },
        { value: parentHeaders[14], ...parentHeaderStyle },
        // { value: parentHeaders[14], ...parentHeaderStyle },
      ]
    });

    if (this.layoutPlotData.length) {
      for (const item of this.layoutPlotData) {
        //let pDate = this.datePipe.transform(new Date(item.pproceedingdate), "dd-MM-yyyy")

    let ddd = 'Open Land'

        // Parent data row
        rows.push({
          cells: [
            { value: item.companyname, ...cellStyle },
            { value: item.cityvillage, ...cellStyle },
            { value: ddd, ...cellStyle },
            { value: item.state, ...cellStyle },
            { value: item.acres, ...cellStyle },
            { value: item.cents, ...cellStyle },
            { value: item.totallandareainsqydslandbank, ...cellStyle },
            // { value: item.playoutname, ...cellStyle },
            { value: item.secondarylandareavalueNetPlotArea, ...cellStyle },
            { value: item.totallandareavalueroadsinsqyards, ...cellStyle },
            { value: item.totallandareavalueparkinyards, ...cellStyle },
            { value: item.totallandareavalueothersaminitiesinsqyards, ...cellStyle },
            { value: item.totallandareavalueroadaffectedinsqyards, ...cellStyle },
            { value: item.salablePlottedArea, ...cellStyle },
           

            // { value: item.ppattakhathano || '', ...cellStyle },


            // { value: formatDate(item.pwarrantyfrom), ...cellStyle },
            // { value: formatDate(item.pwarrantyto), ...cellStyle },
            // { value: '', ...cellStyle },
            // { value: '', ...cellStyle }
          ]
        });

        // Child header row
        if(this.detailedLayoutView){
        rows.push({
          cells: [
            { value: '', ...subHeaderStyle },
            { value: '', ...subHeaderStyle },
            { value: this.childHeaders[0], ...subHeaderStyle },
            { value: this.childHeaders[1], ...subHeaderStyle },
            { value: this.childHeaders[2], ...subHeaderStyle },
            { value: this.childHeaders[3], ...subHeaderStyle },
            { value: this.childHeaders[4], ...subHeaderStyle },
            { value: this.childHeaders[5], ...subHeaderStyle },
            { value: this.childHeaders[6], ...subHeaderStyle },
            { value: this.childHeaders[7], ...subHeaderStyle },
            { value: this.childHeaders[8], ...subHeaderStyle },
            { value: this.childHeaders[9], ...subHeaderStyle },
            { value: this.childHeaders[10], ...subHeaderStyle },
            { value: this.childHeaders[11], ...subHeaderStyle },
            { value: this.childHeaders[12], ...subHeaderStyle },
          ]
        });
      }

        // Child data rows
        if(this.detailedLayoutView){
        if (item.layoutDetailslist.length) {
          for (const detail of item.layoutDetailslist) {
            rows.push({
              cells: [
                { value: '', ...cellStyle },
                { value: '', ...cellStyle },
                { value: detail.pdocumentno || '', ...cellStyle },
                { value: detail.psurveyno || '', ...cellStyle },
                { value: detail.ptotallandareainacres || '', ...cellStyle },
                { value: detail.ptotallandareainsqyds || '', ...cellStyle },

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
    }

    const workbook = new Workbook({
      sheets: [{
        name: 'Layout Details',
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
          { width: 150 },
          { width: 200 },
          { width: 200 },
          { width: 180 },
          { width: 180 },
        ]
      }]
    });

    workbook.toDataURL().then((dataUrl) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'Layout_Details.xlsx';
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
    this.pageSize = this.layoutPlotData.length;

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
      header.innerText = `${this.layoutForm.controls.companyName.value} - ${this.layoutForm.controls.villageName.value}`;
    } else if (this.headerCompanyFlag) {
      header.innerText = `${this.layoutForm.controls.companyName.value}`;
    } else if (this.headerAllFlag) {
      header.innerText = 'Layout Details';
    } else {
      header.innerText = 'Layout Details';
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
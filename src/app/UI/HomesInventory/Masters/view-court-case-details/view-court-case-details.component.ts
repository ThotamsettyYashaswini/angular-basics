import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { State,process } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { Workbook } from '@progress/kendo-angular-excel-export';



@Component({
  selector: 'app-view-court-case-details',
  templateUrl: './view-court-case-details.component.html',
  styles: []
})
export class ViewCourtCaseDetailsComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild(GridComponent , { static: false }) grid: GridComponent;

  courtCaseData: any = [];
  public pageSize = 10;

  public gridState: State = {
    sort: [],
    take: 10
  };
  public headerCells: any = {
    textAlign: 'center'
  };
  GridData: any = [];
  constructor(private _plotcreationservices:PlotcreationService, private commonservice:CommonService,
    private router:Router) { 
      this.allData = this.allData.bind(this);
    }

  ngOnInit() {
    debugger;
    this.viewCourtCaseDetails();
  }

  viewCourtCaseDetails(){
    debugger;
   this._plotcreationservices.viewCourtCaseDetails().subscribe(result => {
    this.GridData = result;
    this.courtCaseData = this.GridData;
    this.expandAllRows();

    //this.courtCaseData = result;
   })
  }
  expandAllRows() {
    this.courtCaseData.forEach((item, index) => {
      this.grid.expandRow(index); // Expands each row based on its index
    });
  }

  view(){
    this.router.navigate(["/CourtCaseDetails"])
  }

  courtCaseEdit(dataItem){
    debugger;
    var myparams = btoa(dataItem.plbCaseID);
     this.router.navigate(["/CourtCaseDetails", { id: myparams}]);
  }

  public onFilter(inputValue: string): void {
    this.courtCaseData = process(this.GridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'plbCaseNumber',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pCourtLocation',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pAdvocateName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pAdvmobileno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pWhoiscontentcourtcase',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

     this.dataBinding.skip = 0;
  }

  allData()  {
  
    const result: ExcelExportData = {
      data: process(this.courtCaseData, {  sort: [{ field: 'pReferenceId', dir: 'desc' }] }).data
    };

    return result;
  }

downloadExcel(): void {
  const rows: any[] = [];

  const parentHeaders = ['Site Name', 'Survey No', 'Case No.', 'Filing Date', 'Case Type', 'Court Name','Court Location','Rep. By Doc No.','Hearing Date','Next Hearing Date','Hearing Details','Remarks'];
  const childHeaders = ['Advocate Name', 'Advocate Mob No. ', 'Advocate Email'];

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
      value: 'Court Case Details',
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
    ]
  });

  if (this.courtCaseData.length) {
    for (const item of this.courtCaseData) {
      // Parent data row
      rows.push({
        cells: [
          { value: item.pLandname, ...cellStyle },
          { value: item.psurveyno || '', ...cellStyle },
          { value: item.plbCaseNumber || '', ...cellStyle },
          { value: formatDate(item.plbFilingDate), ...cellStyle },

          { value: item.plbCaseType || '', ...cellStyle },
          { value: item.pCourtName || '', ...cellStyle },
          { value: item.pCourtLocation || '', ...cellStyle },
          { value: item.pRepresentedbydocumentinland || '', ...cellStyle },
          { value: formatDate(item.plbcasehearingdate), ...cellStyle },
          { value: formatDate(item.pnexthearingdate), ...cellStyle },
          { value: item.phearing_details || '', ...cellStyle },
          { value: item.poutcome || '', ...cellStyle },

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
          { value: childHeaders[7], ...subHeaderStyle }
        ]
      });

      // Child data rows
      if (item.advocateDetailslist.length) {
        for (const detail of item.advocateDetailslist) {
          rows.push({
            cells: [
              { value: '', ...cellStyle },
              { value: detail.padvocatename || '', ...cellStyle },
              { value: detail.padvocatephone || '', ...cellStyle },
              { value: detail.padvocatemail || '', ...cellStyle },
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
    link.download = 'Court_Case_Details.xlsx';
    link.click();
  });
}

}

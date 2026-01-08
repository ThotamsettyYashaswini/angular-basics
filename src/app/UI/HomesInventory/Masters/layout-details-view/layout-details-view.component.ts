import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { State,process } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
import { ExcelExportData, Workbook } from '@progress/kendo-angular-excel-export';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
declare const $: any;

@Component({
  selector: 'app-layout-details-view',
  templateUrl: './layout-details-view.component.html',
  styles: []
})
export class LayoutDetailsViewComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild(GridComponent , { static: false }) grid: GridComponent;

  layoutDetailsView: any = [];
  public pageSize = 10;

  public gridState: State = {
    sort: [],
    take: 10
  };
  public headerCells: any = {
    textAlign: 'center'
  };
  GridData: any = [];
  public squareYards :any = 'sq. yd.'
  fileNameDocs: any=[];
  stylevarable: boolean=true;
  pfilename: any;
  extension: any;
  ViewImageDocs: string;
  path: string;
  fileDownload: any;
  pfilenameTypeOfDeed: any;
  ViewImageDocsTypeOfDeed: string;

  constructor(private _plotcreationservices:PlotcreationService, private commonservice:CommonService,
    private router:Router, private http:HttpClient, private datePipe:DatePipe) { 
      this.allData = this.allData.bind(this);
    }

  ngOnInit() {
    debugger;
    this.viewLayoutDetails();
    let urldata = environment.apiURL;
    
    this.http.get(urldata).subscribe(res => {       
      let appspath = res[0]['ApiHostUrl'].split("/");
      this.path=appspath[0]+'//'+appspath[2]+'/Upload/';
      });
  }

  viewLayoutDetails(){
    debugger;
   this._plotcreationservices.viewLayout().subscribe(result => {
    this.GridData = result;
    this.layoutDetailsView = this.GridData;
    this.expandAllRows();

    //this.courtCaseData = result;
   })
  }
  expandAllRows() {
    this.layoutDetailsView.forEach((item, index) => {
      this.grid.expandRow(index); // Expands each row based on its index
    });
  }

  view(){
    this.router.navigate(["/LayoutDetailsNew"])
  }

  ViewimgData(row){
    debugger;

    this.fileNameDocs = [];
  

     this.pfilename = row.pfilename;

     this.pfilename =   this.pfilename.toUpperCase();

     let ett = this.pfilename.split('.'); 

    //  this.extension = ett[1];

     this.extension = this.pfilename.trim().split('.').pop();



     this.fileDownload = this.pfilename.trim()

    
   $('#ViewuploadVehicleDocs').modal('show');
   this.stylevarable = false; 
  
  }

  downloadimgData(data){
    debugger
    let data1 = this.pfilename.trim();
  
      this.ViewImageDocs =this.path+ data1;
        if(this.extension=='PDF'){
         window.open(this.ViewImageDocs);
       }
  
       else{
         let filepathDocs=this.ViewImageDocs;
         this.commonservice.GetImage(filepathDocs).subscribe(res => {
           var a = document.createElement("a"); //Create <a>
          a.href = "data:image/png;base64," + res[0]; //Image Base64 Goes here
          a.download =data; //File name Here
          a.click(); //Downloaded file
         })
       }
   }

   ViewimgData1(row){
    debugger;

    this.fileNameDocs = [];
  

     this.pfilenameTypeOfDeed = row.typedeedfile;

     this.pfilenameTypeOfDeed =   this.pfilenameTypeOfDeed.toUpperCase();

     let ett = this.pfilenameTypeOfDeed.split('.'); 

     this.extension = this.pfilenameTypeOfDeed.trim().split('.').pop();

     //this.extension = ett[1];


     this.fileDownload = this.pfilenameTypeOfDeed.trim()

    
   $('#ViewuploadTypeOfDeed').modal('show');
   this.stylevarable = false; 
  
  }

  downloadimgData1(data){
    debugger
    let data1 = this.pfilenameTypeOfDeed.trim();
  
      this.ViewImageDocsTypeOfDeed =this.path+ data1;
        if(this.extension=='PDF'){
         window.open(this.ViewImageDocsTypeOfDeed);
       }
  
       else{
         let filepathDocs=this.ViewImageDocsTypeOfDeed;
         this.commonservice.GetImage(filepathDocs).subscribe(res => {
           var a = document.createElement("a"); //Create <a>
          a.href = "data:image/png;base64," + res[0]; //Image Base64 Goes here
          a.download =data; //File name Here
          a.click(); //Downloaded file
         })
       }
   }

  public onFilter(inputValue: string): void {
    this.layoutDetailsView = process(this.GridData, {
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

  allData()  {
  
    const result: ExcelExportData = {
      data: process(this.layoutDetailsView, {  sort: [{ field: 'pReferenceId', dir: 'desc' }] }).data
    };

    return result;
  }

  downloadExcel(): void {
        const rows: any[] = [];
      
        const parentHeaders = ['LP / TCP / DP No.','Proceeding No.', 'Proceeding Date', 'Issued By','Layout Name','Land Area','Land Area(sq.yds)','Net Land Area','Net Land Area(sq.yds)','Road Area','Park Area','Road Affected Area','Others Area','Total Extra Area','Total Extra Area(sq.yds)'];
        const childHeaders = ['Document No.','Survey No.','Land Area','Land Area(sq.yds)'];
      
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
      
        if (this.layoutDetailsView.length) {
          for (const item of this.layoutDetailsView) {
                    let pDate = this.datePipe.transform(new Date(item.pproceedingdate), "dd-MM-yyyy")
  
            // Parent data row
            rows.push({
              cells: [
                { value: item.plptcpdpno, ...cellStyle },
                { value: item.pproceedingno, ...cellStyle },
                { value: pDate, ...cellStyle },
                { value: item.pissuedby, ...cellStyle },
                { value: item.playoutname, ...cellStyle },
                { value: item.land_area_in_acres_total, ...cellStyle },
                { value: item.land_area_in_sqys_total, ...cellStyle },
                // { value: item.playoutname, ...cellStyle },
                 { value: item.primaryLandareaValueNetPlotArea, ...cellStyle },
                { value: item.secondarylandareavalueNetPlotArea, ...cellStyle },
                { value: item.roadarea , ...cellStyle },
                { value: item.parkarea , ...cellStyle },
                { value: item.roadsaffectedarea , ...cellStyle },
                { value: item.othersarea , ...cellStyle },
                { value: item.total_extra_land_area_inacres , ...cellStyle },
                { value: item.total_extra_land_area_insqyds , ...cellStyle },
      
                // { value: item.ppattakhathano || '', ...cellStyle },
                
      
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
                 { value: '', ...subHeaderStyle },
                { value: childHeaders[0], ...subHeaderStyle },
                { value: childHeaders[1], ...subHeaderStyle },
                { value: childHeaders[2], ...subHeaderStyle },
                { value: childHeaders[3], ...subHeaderStyle },
                { value: childHeaders[4], ...subHeaderStyle },
                { value: childHeaders[5], ...subHeaderStyle },
                { value: childHeaders[6], ...subHeaderStyle },
                { value: childHeaders[7], ...subHeaderStyle },
                { value: childHeaders[8], ...subHeaderStyle },
                { value: childHeaders[9], ...subHeaderStyle },
                { value: childHeaders[10], ...subHeaderStyle },
                { value: childHeaders[11], ...subHeaderStyle },
                { value: childHeaders[12], ...subHeaderStyle },
              ]
            });
      
            // Child data rows
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

}

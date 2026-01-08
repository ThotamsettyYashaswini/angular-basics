import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { State,process } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
import { ExcelExportData, Workbook } from '@progress/kendo-angular-excel-export';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
declare const $: any;

@Component({
  selector: 'app-mutation-view',
  templateUrl: './mutation-view.component.html',
  styles: []
})
export class MutationViewComponent implements OnInit {
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
  imageViewData: any=[];
  viewFileType: any;
  ViewImage: string;
  constructor(private _plotcreationservices:PlotcreationService, private commonservice:CommonService,
    private router:Router, private datePipe:DatePipe, private http:HttpClient) { 
      this.allData = this.allData.bind(this);
    }

  ngOnInit() {
    debugger;
    let urldata = environment.apiURL;

    this.http.get(urldata).subscribe(res => {
       
      //this.path=res[0]['ApiHostUrl'];
      let appspath = res[0]['ApiHostUrl'].split("/");
      this.path=appspath[0]+'//'+appspath[2]+'/Upload/';
       // console.log(res)
      });
    this.viewMutationDetails();
  }

  viewMutationDetails(){
    debugger;
   this._plotcreationservices.viewMutationDetails().subscribe(result => {
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
    this.router.navigate(["/MutationDetails"])
  }
  //dataItem.documentStoreDTO


  ViewimgData(dataItem){
    debugger
    this.imageViewData = [];
  

     this.imageViewData =   dataItem.documentStoreDTO;

    
   $('#ViewuploadDocs').modal('show');
   this.stylevarable = false; 
  }

  downloadimgData(dataItem){
    debugger
     this.viewFileType=  dataItem.pDOCFILENAME.split('.').pop();
      // this.ViewImage =this.path+'Documents/'+dataItem[0].FilePath ; 
        this.ViewImage =this.path+dataItem.pDOCFILENAME ; 
        if(this.viewFileType=='pdf' || this.viewFileType == 'PDF'){
         window.open(this.ViewImage);
       }
       else{
         let filepath=dataItem.pDOCFILENAME;
         this.commonservice.GetImage(filepath).subscribe(res => {
           var a = document.createElement("a"); //Create <a>
          a.href = "data:image/png;base64," + res[0]; //Image Base64 Goes here
          a.download =dataItem.pDOCFILENAME; //File name Here
          a.click(); //Downloaded file
         })
       }
   }

  public onFilter(inputValue: string): void {
    this.courtCaseData = process(this.GridData, {
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
      data: process(this.courtCaseData, {  sort: [{ field: 'pReferenceId', dir: 'desc' }] }).data
    };

    return result;
  }

  downloadExcel(): void {
    const rows: any[] = [];
  
    const parentHeaders = ['Proceeding No.', 'Proceeding Date', 'Issued By', 'Patta/Khatha No.'];
    const childHeaders = ['Village/Mandal', 'Survey No. ', 'Land Area','Land Area(sq.yds)','Land Area(Govt.)','Land Area(Govt.)'];
  
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
        // { value: parentHeaders[7], ...parentHeaderStyle },
        // { value: parentHeaders[8], ...parentHeaderStyle },
        // { value: parentHeaders[9], ...parentHeaderStyle },
        // { value: parentHeaders[10], ...parentHeaderStyle },
        // { value: parentHeaders[11], ...parentHeaderStyle },
      ]
    });
  
    if (this.courtCaseData.length) {
      for (const item of this.courtCaseData) {
        let pDate = this.datePipe.transform(new Date(item.pproceedingdate), "dd-MM-yyyy")
        // Parent data row
        rows.push({
          cells: [
            { value: item.pproceedingno, ...cellStyle },
            { value: pDate, ...cellStyle },
  
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
            // { value: childHeaders[6], ...subHeaderStyle },
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
                { value: detail.ptotallandareainacres || '', ...cellStyle },
                { value: detail.ptotallandareainsqyds || '', ...cellStyle },
                { value: detail.ptotallandareaasperdharani || '', ...cellStyle },
                { value: detail.pptotallandareainsqydsasperdharani || '', ...cellStyle },
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

}

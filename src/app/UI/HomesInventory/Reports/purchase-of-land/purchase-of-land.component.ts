import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { BranchconfigService } from 'src/app/Services/Settings/branchconfig.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';

import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { GroupDescriptor, State, process } from '@progress/kendo-data-query';
import { ExcelExportData, Workbook } from '@progress/kendo-angular-excel-export';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
declare const $: any;
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
@Component({
  selector: 'app-purchase-of-land',
  templateUrl: './purchase-of-land.component.html',
  styles: []
})

export class PurchaseOfLandComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild(GridComponent, { static: false }) grid: GridComponent;
@ViewChild('pdfExportSection', { static: false }) pdfExportSection: ElementRef;

  public groups: GroupDescriptor[] = [{ field: 'nameofland' }];

  public columns: Array<object>;
  public pageSize = 10;

  public gridState: State = {
    sort: [],
    take: 10
  };
  public headerCells: any = {
    textAlign: 'center'
  };


  public ColumnMode = ColumnMode;
  public Landdata: any;
  public TempLanddata: any;
  public rows = [];
  public selected = [];
  public temp: any;
  public SelectionType = SelectionType;
  GridData: any = [];
  surveyData: any = [];
  stylevarable: boolean = true;
  path: string;
  fileNameDocs: any = [];
  filepathDocs: any;
  filetypeDocs: any;
  fileName1Docs: any;
  filePathDataDocs: string;
  ViewImageDocs: string;
  // 
  purchaseOfLandForm: FormGroup;
  companyList: any = [];
  locationList: any = [];
  Type: any;
  companyNameFlag: boolean = false;
  locationFlag: boolean = false;
  compData: any = [];
  locDtaa: any = [];
  loading: boolean = false;


  constructor(private _commonservice: CommonService, private fb: FormBuilder, private _LandBankservice: LandBankService, private _branchconfigService: BranchconfigService, private _plotcreationservices: PlotcreationService, private _routes: Router, private http: HttpClient, private datePipe: DatePipe) {
    this.allData = this.allData.bind(this);

  }

  ngOnInit() {

    let urldata = environment.apiURL;

    this.http.get(urldata).subscribe(res => {
      let appspath = res[0]['ApiHostUrl'].split("/");
      this.path = appspath[0] + '//' + appspath[2] + '/Upload/';
    });
    debugger
    // this.getLanddata();
    this.columns = [

      { prop: 'landpurchasetype' },
      { prop: 'nameofland' },
      { prop: 'purchasedate' },
      { prop: 'totallandareainacrestodisplay' },
      { prop: 'availableareaINACRES' }

    ];

    this.purchaseOfLandForm = this.fb.group({
      companyName: [''],
      location: ['']
    });
    this.getCompanyDetails();
    this.getLocationDetails();
    this.companyNameClick();

  }

  /**
   * editLand
   */
  public editLand(dataItem) {
    //this._LandBankservice._SetLandPurchaseUpdate($event, row, rowIndex);
    this._LandBankservice.SetButtonType("Update");
    var myparams = btoa(dataItem.landbankid);
    this._routes.navigate(['/LandPurchase', { id: myparams }]);
  }

  companyNameClick() {
    debugger;
    this.Type = "COMPANYNAME";
    this.companyNameFlag = true;
    this.locationFlag = false;
    this.Landdata = [];
    this.purchaseOfLandForm.controls.companyName.setValue('');
    this.purchaseOfLandForm.controls.location.setValue('');

    // this.companyList = [];
  }

  locationClick() {
    debugger
    this.Type = "LOCATION";
    this.companyNameFlag = false;
    this.locationFlag = true;
    this.Landdata = [];
    this.purchaseOfLandForm.controls.companyName.setValue('');
    this.purchaseOfLandForm.controls.location.setValue('');

    // this.companyList = [];
  }

  getCompanyDetails() {
    debugger;
    this._plotcreationservices.getLanddata().subscribe(res => {
      let json: any = [];
      json = res;
      let tempArray = [{ "companynameid": 0, "companyname": 'All' }];
      let companyList = [...tempArray, ...json];

      this.companyList = this.removeDuplicateCompanyNames(companyList);
    })
  }

  removeDuplicateCompanyNames(myArray) {
    debugger
    return myArray.filter(
      (v, i, a) =>
        a.findIndex((t) => t.companyname === v.companyname) === i
    );

  }

  companyName_change(event) {
    debugger;
    this.loading = true;
    this._plotcreationservices.getLandPurchaseddetailsByCompanyName(event.companyname).subscribe(js => {
      this.Landdata = js;
      console.log(js);
      console.log(this.compData);
      this.expandAllRows();
      this.loading = false;



    })
  }

  isTelugu(text: string): boolean {
  return /[\u0C00-\u0C7F]/.test(text || '');
}

  getLocationDetails() {
    debugger;
    // let tempArray = [{"locationID":0,"locationName":'Alls'}];
    // this.locationList = [...tempArray];  

    this._plotcreationservices.getLanddata().subscribe(res => {
      let json: any = [];
      json = res;
      let tempArray = [{ "nameoflandID": 0, "nameofland": 'All' }];
      let locationList = [...tempArray, ...json];

      this.locationList = this.removeDuplicateLocations(locationList);
    });
  }

  removeDuplicateLocations(myArray) {
    debugger
    return myArray.filter(
      (v, i, a) =>
        a.findIndex((t) => t.nameofland === v.nameofland) === i
    );

  }

  location_change(event) {
    debugger;
    this.loading = true;
    this._plotcreationservices.getLandPurchaseddetailsByLocation(event.nameofland).subscribe(data => {
      this.Landdata = data;
      this.expandAllRows();
      this.loading = false;

    })
  }

  getLanddata() {
    debugger
    this._plotcreationservices.getLanddata().subscribe(data => {
      //this.Landdata = data;
      // this.Landdata = this.temp = data;

      this.GridData = data;
      this.Landdata = this.GridData;
      this.expandAllRows();
      // push our inital complete list
    })
  }

  expandAllRows() {
    this.Landdata.forEach((item, index) => {
      this.grid.expandRow(index); // Expands each row based on its index
    });
  }

  updateFilter(event) {
    debugger;
    let val = event.currentTarget.value
    const value = val.toString().toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    this.Landdata = this.temp.filter(item => {
      for (let i = 0; i < count; i++) {
        let datagrid = item[keys[i]].toString().toLowerCase().indexOf(value)
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          debugger
          return true;
        }
      }
    });
  }

  LandDetailsView(landid) {
    this._LandBankservice._SetLandDetailsViewbyid({ value: landid });
    // this._routes.navigate(['/Landdetailsview']);
  }

  allData() {

    const result: ExcelExportData = {
      data: process(this.Landdata, { sort: [{ field: 'pReferenceId', dir: 'desc' }] }).data
    };

    return result;
  }
  public onFilter(inputValue: string): void {
    this.Landdata = process(this.GridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'landpurchasetype',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'nameofland',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'totallandareatodisplay',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'totallandareainacrestodisplay',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'availableareaINACRES',
            operator: 'contains',
            value: inputValue
          }

        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }

  clickparent(dataItem) {
    debugger;
    this.surveyData = dataItem.landdetailslist
  }

  ViewimgData(row) {
    debugger;

    row.landdoclist
    this.fileNameDocs = [];

    this.fileNameDocs = row.landdoclist;

    $('#ViewuploadVehicleDocs').modal('show');
    this.stylevarable = false;


  }

  close() {
    $('#ViewuploadVehicleDocs').modal('hide');
  }

  downloadimgData(data) {
    debugger


    this.ViewImageDocs = this.path + data.documentfilename;
    if (data.filetype == 'PDF') {
      window.open(this.ViewImageDocs);
    }

    else {
      let filepathDocs = this.ViewImageDocs;
      this._commonservice.GetImage(filepathDocs).subscribe(res => {
        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + res[0]; //Image Base64 Goes here
        a.download = data; //File name Here
        a.click(); //Downloaded file
      })
    }
  }

  downloadExcel(): void {
    const rows: any[] = [];

    const parentHeaders = ['Name Of the Company', 'Location', 'Town', 'Type Of Property', 'SRO At', 'Purchaser Name', 'Doc No.', 'Google Location'];
    const childHeaders = ['Survey No.', 'Total Land Area', 'Total Land Area(sq.yds)'];

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
        value: 'Purchased Land Details',
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
        //  { value: parentHeaders[8], ...parentHeaderStyle },
        //  { value: parentHeaders[9], ...parentHeaderStyle },
        //  { value: parentHeaders[10], ...parentHeaderStyle },
        //  { value: parentHeaders[11], ...parentHeaderStyle },
        //  { value: parentHeaders[12], ...parentHeaderStyle },
        //  { value: parentHeaders[13], ...parentHeaderStyle },
        //  { value: parentHeaders[14], ...parentHeaderStyle },
        // { value: parentHeaders[14], ...parentHeaderStyle },
      ]
    });

    if (this.Landdata.length) {
      for (const item of this.Landdata) {
        //let pDate = this.datePipe.transform(new Date(item.pproceedingdate), "dd-MM-yyyy")

        // Parent data row
        rows.push({
          cells: [
            { value: item.companyname, ...cellStyle },
            { value: item.nameofland, ...cellStyle },
            { value: item.nameofland, ...cellStyle },
            { value: item.landpurchasetype, ...cellStyle },
            { value: item.sroloaction, ...cellStyle },
            { value: item.vendorname, ...cellStyle },
            { value: item.registereddocumentno, ...cellStyle },
            { value: item.nameofland, ...cellStyle },
            //   { value: item.primaryLandareaValueNetPlotArea, ...cellStyle },
            //  { value: item.secondarylandareavalueNetPlotArea, ...cellStyle },
            //  { value: item.roadarea , ...cellStyle },
            //  { value: item.parkarea , ...cellStyle },
            //  { value: item.roadsaffectedarea , ...cellStyle },
            //  { value: item.othersarea , ...cellStyle },
            //  { value: item.total_extra_land_area_inacres , ...cellStyle },
            //  { value: item.total_extra_land_area_insqyds , ...cellStyle },

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
            //  { value: childHeaders[6], ...subHeaderStyle },
            //  { value: childHeaders[7], ...subHeaderStyle },
            //  { value: childHeaders[8], ...subHeaderStyle },
            //  { value: childHeaders[9], ...subHeaderStyle },
            //  { value: childHeaders[10], ...subHeaderStyle },
            //  { value: childHeaders[11], ...subHeaderStyle },
            //  { value: childHeaders[12], ...subHeaderStyle },
          ]
        });

        // Child data rows
        if (item.landdetailslist.length) {
          for (const detail of item.landdetailslist) {
            rows.push({
              cells: [
                { value: '', ...cellStyle },
                { value: '', ...cellStyle },
                { value: detail.surveyno || '', ...cellStyle },
                { value: detail.totalarea || '', ...cellStyle },
                { value: detail.totalarea || '', ...cellStyle },
                //  { value: detail.ptotallandareainsqyds || '', ...cellStyle },

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
        name: 'Purchased Land Details',
        rows: rows,
        columns: [
          { width: 200 },
          { width: 180 },
          { width: 150 },
          { width: 180 },
          { width: 180 },
          { width: 180 },
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
      link.download = 'Purchased_Land.xlsx';
      link.click();
    });
  }

  exportPDFFile() {
    drawDOM(this.pdfExportSection.nativeElement, {
      paperSize: 'A4',
      margin: {
        top: '1cm',
        bottom: '1cm',
        left: '1cm',
        right: '1cm'
      }
    }).then(group => exportPDF(group)).then(dataUri => {
      saveAs(dataUri, 'land-details.pdf');
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { FormBuilder } from '@angular/forms';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { BranchconfigService } from 'src/app/Services/Settings/branchconfig.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';

import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { GroupDescriptor, State,process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { DataBindingDirective,GridComponent  } from '@progress/kendo-angular-grid';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
declare const $: any;


@Component({
  selector: 'app-land-purchase-view',
  templateUrl: './land-purchase-view.component.html',
  styles: []
})
export class LandPurchaseViewComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild(GridComponent , { static: false }) grid: GridComponent;
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
  stylevarable: boolean=true;
  path: string;
  fileNameDocs: any = [];
  filepathDocs: any;
  filetypeDocs: any;
  fileName1Docs: any;
  filePathDataDocs: string;
  ViewImageDocs: string;

  constructor(private _commonservice: CommonService, private fb: FormBuilder, private _LandBankservice: LandBankService, private _branchconfigService: BranchconfigService, private _plotcreationservices: PlotcreationService, private _routes: Router,private http: HttpClient ) {
    this.allData = this.allData.bind(this);

  }

  ngOnInit() {

    let urldata = environment.apiURL;

    this.http.get(urldata).subscribe(res => {       
      let appspath = res[0]['ApiHostUrl'].split("/");
      this.path=appspath[0]+'//'+appspath[2]+'/Upload/';
      });

    this.getLanddata();
    this.columns = [

      { prop: 'landpurchasetype' },
      { prop: 'nameofland' },
      { prop: 'purchasedate' },
      { prop: 'totallandareainacrestodisplay'},
      { prop: 'availableareaINACRES' }

    ];
  }

  /**
   * editLand
   */
  public editLand( dataItem ) {
    //this._LandBankservice._SetLandPurchaseUpdate($event, row, rowIndex);
    this._LandBankservice.SetButtonType("Update");
    var myparams = btoa(dataItem.landbankid);
    this._routes.navigate(['/LandPurchase', { id: myparams }]);
  }

  getLanddata() {
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

  allData()  {
  
    const result: ExcelExportData = {
      data: process(this.Landdata, {  sort: [{ field: 'pReferenceId', dir: 'desc' }] }).data
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

  clickparent(dataItem){
    debugger;
   this.surveyData =  dataItem.landdetailslist
  }

  ViewimgData(row){
    debugger;

    row.landdoclist
    this.fileNameDocs = [];
  
     this.fileNameDocs = row.landdoclist;
    //this.fileNameDocs = row.documentfilename;
    // this.filepathDocs = row.pFilepathForVehicleDocs;
    // this.filetypeDocs = row.pFiletypeForVehicleDocs;

    //this.filetypeDocs=  row.documentfilename.split('.').pop();
  
    //this.fileName1Docs = this.fileNameDocs.substring(0, this.fileNameDocs.lastIndexOf('.')) 
  
    //this.vehicleFileName.split('.').slice(0, -1).join('.');
  
    // let partsDocs = this.filepathDocs.split('Documents\\');
  
    //this.filePathDataDocs = this.path +  this.fileNameDocs;
    // Return the second part if 'Documents\\' was found, otherwise return the original path
  
  //   this.imageViewData = []
  // this.imageViewData =   row.documents;
   $('#ViewuploadVehicleDocs').modal('show');
   this.stylevarable = false;
  
  
  }

  close(){
    $('#ViewuploadVehicleDocs').modal('hide');
  }

  downloadimgData(data){
    debugger
    //  let viewFileTypeDocs=  data.split('.').pop();
      // this.ViewImage =this.path+'Documents/'+dataItem[0].FilePath ; 
        
      //let parts = this.filepathDocs.split('Documents\\');
  
      this.ViewImageDocs =this.path+ data.documentfilename;
        if(data.filetype=='PDF'){
         window.open(this.ViewImageDocs);
       }
  
       else{
         let filepathDocs=this.ViewImageDocs;
         this._commonservice.GetImage(filepathDocs).subscribe(res => {
           var a = document.createElement("a"); //Create <a>
          a.href = "data:image/png;base64," + res[0]; //Image Base64 Goes here
          a.download =data; //File name Here
          a.click(); //Downloaded file
         })
       }
   }
}

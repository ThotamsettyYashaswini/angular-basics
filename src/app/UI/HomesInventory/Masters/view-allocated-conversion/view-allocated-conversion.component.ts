import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { State,process } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
@Component({
  selector: 'app-view-allocated-conversion',
  templateUrl: './view-allocated-conversion.component.html',
  styles: []
})
export class ViewAllocatedConversionComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;

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
  allocatedConversionDetailsData: any = [];
  constructor(private _plotcreationservices:PlotcreationService, private commonservice:CommonService,
    private router:Router) {
      this.allData = this.allData.bind(this);

    }

  ngOnInit() {
    debugger;
    this.viewConvertionDocument();
  }

  viewConvertionDocument(){
    debugger;
   this._plotcreationservices.viewConvertionDocument().subscribe(result => {
    this.GridData = result;
    this.allocatedConversionDetailsData = this.GridData;

    //this.courtCaseData = result;
   })
  }

  newContact(){
    this.router.navigate(["/AllocatingConversionDetails"])
  }

  // hearingEdit(dataItem){
  //   debugger;
  //     var myparams = btoa(dataItem.plbHearingID);
  //      this.router.navigate(["/HearingDetails", { id: myparams}]);
  //     }

  public onFilter(inputValue: string): void {
    this.allocatedConversionDetailsData = process(this.GridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pproceedingno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pregistereddocument',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'psurveyno',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

     this.dataBinding.skip = 0;
  }

  allData()  {
  debugger
    const result: ExcelExportData = {
      data: process(this.allocatedConversionDetailsData, {  sort: [{ field: 'pproceedingno', dir: 'desc' }] }).data
    };

    return result;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { State,process } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';

@Component({
  selector: 'app-view-hearing-details',
  templateUrl: './view-hearing-details.component.html',
  styles: []
})

export class ViewHearingDetailsComponent implements OnInit {
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
  hearingDetailsData: any = [];
  constructor(private _plotcreationservices:PlotcreationService, private commonservice:CommonService,
    private router:Router) {
      this.allData = this.allData.bind(this);

    }

  ngOnInit() {
    debugger;
    this.viewHearingDetails();
  }

  viewHearingDetails(){
    debugger;
   this._plotcreationservices.viewHearingDetails().subscribe(result => {
    this.GridData = result;
    this.hearingDetailsData = this.GridData;

    //this.courtCaseData = result;
   })
  }

  newContact(){
    this.router.navigate(["/HearingDetails"])
  }

  hearingEdit(dataItem){
    debugger;
      var myparams = btoa(dataItem.plbHearingID);
       this.router.navigate(["/HearingDetails", { id: myparams}]);
      }

  public onFilter(inputValue: string): void {
    this.hearingDetailsData = process(this.GridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pOutcome',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pCaseHearingType',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'plbCaseID',
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
      data: process(this.hearingDetailsData, {  sort: [{ field: 'pReferenceId', dir: 'desc' }] }).data
    };

    return result;
  }

}

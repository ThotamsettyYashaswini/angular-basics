import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { State,process } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
@Component({
  selector: 'app-view-allocating-mutation',
  templateUrl: './view-allocating-mutation.component.html',
  styles: []
})
export class ViewAllocatingMutationComponent implements OnInit {
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
  allocatedMutationDetailsData: any = [];
  constructor(private _plotcreationservices:PlotcreationService, private commonservice:CommonService,
    private router:Router) {
      this.allData = this.allData.bind(this);

    }

  ngOnInit() {
    debugger;
    this.ViewMutationDocument();
  }

  ViewMutationDocument(){
    debugger;
   this._plotcreationservices.ViewMutationDocument().subscribe(result => {
    this.GridData = result;
    this.allocatedMutationDetailsData = this.GridData;

    //this.courtCaseData = result;
   })
  }

  newContact(){
    this.router.navigate(["/AllocatingMutation"])
  }

  // hearingEdit(dataItem){
  //   debugger;
  //     var myparams = btoa(dataItem.plbHearingID);
  //      this.router.navigate(["/HearingDetails", { id: myparams}]);
  //     }

  public onFilter(inputValue: string): void {
    this.allocatedMutationDetailsData = process(this.GridData, {
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
      data: process(this.allocatedMutationDetailsData, {  sort: [{ field: 'pproceedingno', dir: 'desc' }] }).data
    };

    return result;
  }

}

import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ChargemasterService } from '../../../../Services/HomesInventory/chargemaster.service';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';


@Component({
  selector: 'app-cadre-commission-view',
  templateUrl: './cadre-commission-view.component.html',
  styles: []
})
export class CadreCommissionViewComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
    public cadreCommissionDetails:any= [];
  public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public selected = [];
  public SelectionType = SelectionType;
  public groups: GroupDescriptor[] = [{ field: 'pprojectname' }];
  constructor(private _routes: Router, private _ChargemasterService: ChargemasterService,private _PlotcreationService: PlotcreationService) { }

  ngOnInit() {
    debugger
    this.columns=[
      {prop:'pcadrename'},
      {prop:'ischargeapplicableonuom'},
      {prop:'chargevaluefixedpercentage'},
      {prop:'chargevalue'},
      {prop:'primarylandareauomname'}
    ]
    this.getCadreDetails();
  }

  getCadreDetails() {
    debugger;
    this.cadreCommissionDetails=[];
    this._ChargemasterService.getCadreDetailsView(0,0).subscribe(data => {    
      debugger;
      if (data != null) { 
        this.cadreCommissionDetails = data;
        console.log("Cadre Commission",this.cadreCommissionDetails)
      }
    })  }

    public editLayout($event, row, rowIndex) {
      debugger;
      //this._PlotcreationService.SetButtonType("Edit");
      var myparams = btoa(row.pcadreconfigid);
      this._routes.navigate(['/CadreCommission', { id: myparams }]);
    }

}

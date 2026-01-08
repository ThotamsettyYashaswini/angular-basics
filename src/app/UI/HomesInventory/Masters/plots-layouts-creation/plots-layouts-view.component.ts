import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';

@Component({
  selector: 'app-plots-layouts-view',
  templateUrl: './plots-layouts-view.component.html',
  styles: []
})
export class PlotsLayoutsViewComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  lstplotslayoutdetails: [];
  layoutid:any;
  public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public selected = [];
  public temp: any;
  public SelectionType = SelectionType;
  constructor(private _routes: Router, private _PlotcreationService: PlotcreationService) { }

  ngOnInit() {
    this.getplotslayoutdetails();
     this.columns = [
      { prop: 'layoutname' },
      { prop: 'pbranchname' },
      { prop: 'totalprojectarea' },
      { prop: 'standardrate'},
      { prop: 'totalnoofplotunits' },
      { prop: 'layoutareainAcres' },
      { prop: 'layoutareainsquareYards'},
      {prop: 'primaryprojectarea'},
      {prop:'primaryprojectareauomname'},
      {prop:'secondaryprojectarea'},
      {prop:'secondaryprojectareauomname'}    ];
  }
  getplotslayoutdetails() {
    debugger;
    this._PlotcreationService.getplotslayoutdetails().subscribe(data => {
      debugger;
      if (data != null) {
        this.lstplotslayoutdetails = this.temp=data;
    console.log("grid data", this.lstplotslayoutdetails)
      }
    })
  }
  public editLayout($event, row, rowIndex) {
    debugger;
    this._PlotcreationService.SetButtonType("Edit");
    var myparams = btoa(row.layoutid);
    this._routes.navigate(['/PlotsLayouts', { id: myparams }]);
  }
updateFilter(event) {
    debugger;
    let val = event.currentTarget.value
    const value = val.toString().toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    this.lstplotslayoutdetails = this.temp.filter(item => {
      debugger;
      for (let i = 0; i < keys.length; i++) {
        let datagrid = item[keys[i]]
        if(item[keys[i]]!=null){
               if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          debugger
          return true;
        }
         }
      }
    });
  }
LayoutPlotsDetailsView(layoutid){
    debugger;
    this._PlotcreationService._SetlayoutDetailsViewbyid({value: layoutid });
   
  }

}

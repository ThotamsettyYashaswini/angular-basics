import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BranchconfigService } from '../../../../Services/Settings/branchconfig.service';
@Component({
  selector: 'app-branch-creation-view',
  templateUrl: './branch-creation-view.component.html',
  styles: []
})
export class BranchCreationViewComponent implements OnInit {
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
    public branchdetails:any= [];
  public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public selected = [];
  public SelectionType = SelectionType;
  constructor(private _routes: Router, private _branchconfigService: BranchconfigService) { }

  ngOnInit() {
    debugger
    this.columns=[
      {prop:'pCompanyname'},
      {prop:'pbranchname'},
      {prop:'pbranchcode'},
      {prop:'pcontactnumber'}
    ]
    this.getbranchdetails();
  }
  getbranchdetails() {
    this.branchdetails=[];
    this._branchconfigService.getBranchCreationView().subscribe(data => {
      debugger
      if (data != null) { 
        this.branchdetails = data;
        console.log("branch details",this.branchdetails)
      }
    })
  }
  public editbranch($event, row, rowIndex) {
    debugger;
    this._branchconfigService.SetButtonType("Edit");
    var myparams = btoa(row.pBranchId);
    this._routes.navigate(['/BranchCreation', { id: myparams }]);
  }
}

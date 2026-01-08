import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { FormBuilder } from '@angular/forms';
import { CompanyconfigService } from 'src/app/Services/Settings/companyconfig.service';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies-creation-view',
  templateUrl: './companies-creation-view.component.html',
  styles: []
})
export class CompaniesCreationViewComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  public CompanyData : any;
  public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public rows = [];
  public selected = [];
  public SelectionType = SelectionType;

  constructor(private _commonservice: CommonService, private fb: FormBuilder, private _CompanyService: CompanyconfigService, private _routes: Router) { }

  ngOnInit() {
    this.getCompanyData();
    this.columns=[
      {prop:'pCompanyname'},
      {prop:'pCompanycode'},
      {prop:'pnameofenterprise'},
      {prop:'pcontactnumber'},
      {prop:'pemailid'}
      ]
  }

  public getCompanyData() {

    this._CompanyService.GetcompanyViewId().subscribe(data => {
      debugger;
      this.CompanyData = data;
    })

  }

  public editLand($event, row, rowIndex) {
    debugger;
    //this._CompanyService.SetButtonType("Update");
    var myparams = btoa(row.pCompanyId);
    this._routes.navigate(['/CompaniesCreation', { id: myparams }]);
  }
}

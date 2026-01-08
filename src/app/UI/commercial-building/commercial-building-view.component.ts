import { Component, OnInit,ViewChild } from '@angular/core';
import { CommercialBuildingService } from 'src/app/Services/commercial-building.service';
import { CommercialBuildingDetailsViewComponent } from '../commercial-building/commercial-building-details-view.component';

import { Router } from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-commercial-building-view',
  templateUrl: './commercial-building-view.component.html',
  styles: []
})
export class CommercialBuildingViewComponent implements OnInit {
  @ViewChild(CommercialBuildingDetailsViewComponent, { static: false }) CommercialDetailView: CommercialBuildingDetailsViewComponent;
  CommercialResidendata:any=[];
  title:any;
  New:any;
  public columns: Array<object>;
  temp:any;
  editbuttonhide:any;
  constructor(private _commercialbuildingService: CommercialBuildingService,private router: Router) { }

  ngOnInit() {
    debugger;
    this.editbuttonhide='';
this.temp=[];
this.CommercialResidendata=[];
this.columns = [
  { prop: 'projectname' },
  { prop: 'launchdate' },
  { prop: 'itemtype' },
  { prop: 'noofblocks'}
    ];
if(this.router.url=='/ResidentialApartmentsView'){
  this.getCommercialResidentialViewdata(0,3);
  this.title='Residential Apartments Details';
  this.New='/ResidentialApartments';
}else{
  this.getCommercialResidentialViewdata(0,2);
  this.title='Commercial Building Details';
  this.New='/Commercial Building';

}
  }
  getCommercialResidentialViewdata(landbankid,itemtypeid){
    debugger
    //this._commercialbuildingService.GetCommercialResidentialViewdataDetailed(landbankid,itemtypeid).subscribe(res => {

    this._commercialbuildingService.GetCommercialResidentialViewdataDetailed(itemtypeid).subscribe(res => {
      debugger
      this.CommercialResidendata = this.temp=res;
      //this.editbuttonhide=res.inventoryexists;
    });
  }
  CommercialBuildingDetailsView(landid){
    debugger;
    let a=landid;
    this._commercialbuildingService._SetLandDetailsViewbyid({value: landid });
   
  }

  CommercialBuildingedit($event, row){
debugger;
  var myparams = btoa(row.buildingid);
  this._commercialbuildingService._GetBankData(row.landbankid);
  this.router.navigate([this.New, { id: myparams }]);
  }

  updateFilter(event) {
    debugger;
    let val = event.currentTarget.value
    const value = val.toString().toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    this.CommercialResidendata = this.temp.filter(item => {
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
}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CommercialBuildingService {
  bankid: any;
  Buildingid: any;
  Propertytype: any;
  availablearea:any;
  Availabledata:any;
  AllAvailabledata:any;
  private landid = new Subject<any>();
  GetCommercialBuildingbyid$ = this.landid.asObservable();
  constructor(private _http: HttpClient, private _CommonService: CommonService) { }

  _GetBankData(bank) {
    debugger
    this.bankid = bank;
  }
  _SetBankData() {
    debugger
    return this.bankid;
  }

  _SetAvailablearea(availablearea) {
    debugger
    this.availablearea = availablearea;
  }
  _GetAvailablearea(){
    return this.availablearea;
  }

 _SetAvailabledata(Availabledata) {
    debugger
    this.Availabledata = Availabledata;
  }
  _GetAvailabledata(){
    return this.Availabledata;
  }
  _SetAllAvailabledata(AllAvailabledata) {
    debugger
    this.AllAvailabledata = AllAvailabledata;
  }
  _GetAllAvailabledata(){
    return this.AllAvailabledata;
  }
  savecommercialbuilding(data) {
    debugger;
    return this._CommonService.callPostAPI('/HomesInventory/masters/CBController/saveCommercialBuildingDetails', data)
  }
  GetCommercialResidentialViewdataDetailedData(landbankid): Observable<any> {
     const params = new HttpParams().set('landbankid', landbankid);
    return this._CommonService.callGetAPI('/HomesInventory/masters/CBController/getCommercialResidentialViewdata', params, 'YES')
  }
//   GetCommercialResidentialViewdataDetailed(landbankid,itemtypeid): Observable<any> {
//     const params = new HttpParams().set('landbankid', landbankid).set('itemtypeid', itemtypeid);
//    return this._CommonService.callGetAPI('/HomesInventory/masters/CBController/getCommercialResidentialViewdata', params, 'YES')
//  }

GetCommercialResidentialViewdataDetailed(itemtypeid): Observable<any> {
  const params = new HttpParams().set('itemtypeid', itemtypeid);
 return this._CommonService.callGetAPI('/HomesInventory/masters/CBController/getCommercialResidentialViewdata', params, 'YES')
}


  _SetLandDetailsViewbyid(data: any) {
    debugger
     this.landid.next(data)
  }

  GetcommercialbuildingdetailsDetailed(buildingid): Observable<any> {
    const params = new HttpParams().set('_buildingid', buildingid);
    return this._CommonService.callGetAPI('/HomesInventory/masters/CBController/getCommercialResidentialDetailsDetailed', params, 'YES')
  }
  
  GetAreaStatementbyprojectid(projectid):Observable<any>{
    debugger;
   const params = new HttpParams().set('projectid', projectid);
    return this._CommonService.callGetAPIs('/CommercialBuildingController/GetAreaStatementbyprojectid', params, 'YES')
  }
  
  GetCBFloorUnitsAreaStatementbyprojectid(projectid):Observable<any>{
     const params = new HttpParams().set('projectid', projectid);
    return this._CommonService.callGetAPIs('/CommercialBuildingUnitsController/GetCBFloorUnitsAreaStatementbyprojectid', params, 'YES')
  }

}

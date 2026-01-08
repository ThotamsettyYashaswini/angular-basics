import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { environment } from 'src/environments/environment';
import { CommonService } from './../common.service';

@Injectable({
    providedIn: 'root'
})
export class DiscountsmasterService {

    editinfo: any;
    ctype: any;
    ButtonType: any;
    httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    });
    constructor(private http: HttpClient, private _CommonService: CommonService) {

    }

    getprojecttypes(): Observable<any> {
        debugger
        try {
            return this._CommonService.callGetAPI('/Settings/GetItemTypes', '', 'NO');
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }

    }
    
  GetProjectdetails(itemtypeid): Observable<any> {
      
    const params = new HttpParams().set('itemtypeid', itemtypeid)
    return this._CommonService.callGetAPI('/HomesInventory/masters/InstallmentConfigurationController/GetProjectDetails', params, 'YES')
  }
    getDiscountdetails(itemtypeid,projectname): Observable<any> {
        debugger
        try {
            const params = new HttpParams().set('itemtypeid', itemtypeid).set('projectname',projectname);
            return this._CommonService.callGetAPI('/HomesInventory/masters/DiscountsController/GetitemtypewiseDiscount',params, 'YES');
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }

    }
    savediscountsdetails(data): Observable<any> {
        try {
            debugger;   
            return this._CommonService.callPostAPI('/HomesInventory/masters/DiscountsController/SaveItemTypeDiscount', data)
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }
}
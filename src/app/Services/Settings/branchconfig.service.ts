import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class BranchconfigService {
  Buttontype: any;




  constructor(private _http: HttpClient, private _CommonService: CommonService) { }

  getAddressTypes(): Observable<any> {
    try {
      //return this.http.get(this._CommonService.apiURL + '/loans/masters/contactmaster/GetAddressType?contactype=' + contactType);
      const params = new HttpParams().set('contactype', "BUSINESS ENTITY");
      return this._CommonService.callGetAPI('/loans/masters/contactmaster/GetAddressType', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  getAddressTypeDetails(contacttype):Observable<any> {
    try {
      //return this.http.get(this._CommonService.apiURL + '/loans/masters/contactmaster/GetAddressType?contactype=' + contactType);
      const params = new HttpParams().set('contactype',contacttype);
      return this._CommonService.callGetAPI('/loans/masters/contactmasterNew/GetAddressType', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  getBranchDetails(): Observable<any> {
    try {
      const params = new HttpParams();
      return this._CommonService.callGetAPI('/Settings/Branch/getBranchDetails', params, 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  getBranchCreationView(): Observable<any> {
    try {
      debugger;
      const params = new HttpParams();
      return this._CommonService.callGetAPI('/Settings/BranchesCreation/getBranchCreationView', params, 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  SetButtonType(type) {
    this.Buttontype = type
  }
  GetButtonType() {
    return this.Buttontype
  }
  getBranchcreationDetailsbyId(branchid): Observable<any> {
    try {
      const params = new HttpParams().set('branchid', branchid);
      return this._CommonService.callGetAPI('/Settings/Branch/getBranchDetails', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }


  checkbranchnameDuplicates(branchname, branchcode, branchid): Observable<any> {
    const params = new HttpParams().set('branchname', branchname.toString()).set('branchcode', branchcode).set('branchid', branchid);
    return this._CommonService.callGetAPI('/Settings/Branch/checkbranchnameDuplicates', params, 'YES')
  }

  checkbranchnameCreationDuplicates(branchname, branchcode, branchid): Observable<any> {
    debugger;
    try {
      const params = new HttpParams().set('branchname', branchname).set('branchcode', branchcode).set('branchid', branchid);
      return this._CommonService.callGetAPI('/Settings/BranchesCreation/checkbranchcreationnameDuplicates', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }


  saveBranchconfigformdata(data): Observable<any> {
    
    return this._CommonService.callPostAPI('/Settings/Branch/SaveBranchDetails', data)
  }

  saveBranchCreationconfigformdata(data): Observable<any> {
    try {
    return this._CommonService.callPostAPI('/Settings/BranchesCreation/SaveBranchcreationDetails', data)
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  GetcompanyView() {
    try {
      return this._CommonService.callGetAPI('/Settings/Company/getCompanyCreationView', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  getBranchconfigeditDetails(branchid): Observable<any> {
    try {
      const params = new HttpParams().set('branchid', branchid);
      return this._CommonService.callGetAPI('/Settings/BranchesCreation/getBranchcreationDetails', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommonService } from '../common.service';
import { HttpClient, HttpParams } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class CompanyconfigService {
  tabname:any;
  documentdformdata:any;
  promtorsformdata:any;
  constructor(private _commonservice:CommonService)
   {

    }
    private Data = new Subject<any>();
    getTitleOnClick(title)
    {
      debugger
       this.tabname=title;
    }
    sendTitle()
    {
      debugger
      return this.tabname;
    }
    _GetButtonName(): Observable<any> {
      return this.Data.asObservable();
   }
    savecompanyconfig(data)
    {
      debugger;
      return this._commonservice.callPostAPI('/Settings/Company/SaveCompanyDetails', data)
    }
    Getcompanydetails()
    {
      return this._commonservice.callGetAPI('/Settings/Company/getCompanyDetails','', 'NO')
    }

    savecompanycreationconfig(data)
    {
      debugger;
      return this._commonservice.callPostAPI('/Settings/Company/SaveCompanycreationDetails', data)
    }
    Getcompanycreationdetails(companyid)
    {
      const params = new HttpParams().set('companyid', companyid);
      return this._commonservice.callGetAPI('/Settings/Company/getCompanyCreationDetails',params, 'YES')
    }

    GetcompanyView()
    {
      return this._commonservice.callGetAPI('/Settings/Company/getCompanyCreationdata','', 'NO')
    }

    GetcompanyView1()
    {
      return this._commonservice.callGetAPI('/Settings/Company/getCompanyCreationdata1','', 'NO')
    }

    GetcompanyViewId()
    {
      return this._commonservice.callGetAPI('/Settings/Company/getCompanyCreationView','', 'NO')
    }
    checkcompany(companyname): Observable<any> {
      const params = new HttpParams().set('Companyname', companyname)
      return this._commonservice.callGetAPI('/Settings/Company/checkCompany', params, 'YES')
    }
}

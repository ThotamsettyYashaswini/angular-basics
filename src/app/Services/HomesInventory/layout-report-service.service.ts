import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from '../common.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutReportServiceService {
  
  constructor(private http: HttpClient, private _CommonService: CommonService) { }

  GetItemTypes() {
    const params = new HttpParams();
    return this._CommonService.callGetAPI('/Settings/GetItemTypes', params, 'NO')
  }


GetProjectdetailsbyid(Projecttype,connectionstring): Observable<any> {
  try{
      debugger;
    const params = new HttpParams().set('Projecttype', Projecttype).set('Connectionstring',connectionstring)
    return this._CommonService.callGetAPI('/Settings/GetProjectNames', params, 'YES')
  }
  catch (e) {
      this._CommonService.showErrorMessage(e);
    }
}
getlayoutbranches():Observable<any>{
    try{
          const params = new HttpParams();
           return this._CommonService.callGetAPI('/Settings/getlayoutbranches', params, 'NO');
    }
    catch(e){
        this._CommonService.showErrorMessage(e);
    }
}
PlotsLayoutsInventoryReport(itemtypeid,projectid,Connectionstring):Observable<any>{
    try{
          const params = new HttpParams().set('projectid', projectid).set('itemtypeid', itemtypeid).set('Connectionstring', Connectionstring);
           return this._CommonService.callGetAPI('/Settings/GetInventoryReports', params, 'YES');
    }
      catch(e){
        this._CommonService.showErrorMessage(e);
    }
}
}

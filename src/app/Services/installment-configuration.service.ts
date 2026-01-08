import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class InstallmentConfigurationService {

  constructor(private http: HttpClient, private _CommonService: CommonService) { }

  GetProjectdetails(itemtypeid): Observable<any> {
    const params = new HttpParams().set('itemtypeid', itemtypeid)
    return this._CommonService.callGetAPI('/HomesInventory/masters/InstallmentConfigurationController/GetProjectDetails', params, 'YES')
  }

  GetInstallmentGridData(itemtypeid, projectid): Observable<any> {
    const params = new HttpParams().set('itemtypeid', itemtypeid).set('projectid', projectid)
    return this._CommonService.callGetAPI('/HomesInventory/masters/InstallmentConfigurationController/GetInstallmentGridData', params, 'YES')
  }

  saveInstallmentConfigurationDetails(data): Observable<any> {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/InstallmentConfigurationController/saveInstallmentConfigurationDetails', data);
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
}

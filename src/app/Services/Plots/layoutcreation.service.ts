import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommonService } from '../common.service';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LayoutcreationService {

  
  constructor(private _http: HttpClient, private _CommonService: CommonService) { }


  GetPermitnumber(): Observable<any> {
    try {
      const params = new HttpParams();
      return this._CommonService.callGetAPI('/Plots/Masters/PlotDetails/GetPermitnumber', params , 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
}

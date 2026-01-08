import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { environment } from 'src/environments/environment';
import { CommonService } from './../common.service';

@Injectable({
  providedIn: 'root'
})
export class InstallmentremainderService {

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
}
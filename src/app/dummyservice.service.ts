import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "./Services/common.service";
import { HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class DummyserviceService {
  constructor(private _Commonservice: CommonService) {}
  getUserRightsByUserName(userName: string) {
    const params = new HttpParams().set("UserName", userName);
    return this._Commonservice.callGetAPI(
      "/Settings/Users/UserRights/GetUserRightsBasedonUserName",
      params,
      "YES"
    );
  }
  GetCompanyslbreport() {
    return this._Commonservice.callGetAPI(
      "/HomesInventory/masters/LandBank/GetCompanyslbreport",
      "",
      "NO"
    );
  }
  GetVillageslbreport(company: string) {
    const params = new HttpParams().set("company", company);
    return this._Commonservice.callGetAPI(
      "/HomesInventory/masters/LandBank/Getvillageslbreport",
      params,
      "YES"
    );
  }
  Getdocumentslbreport(company: string, village: string) {
    const params = new HttpParams()
      .set("company", company)
      .set("village", village);
    return this._Commonservice.callGetAPI(
      "/HomesInventory/masters/LandBank/Getdocumentslbreport",
      params,
      "YES"
    );
  }
}

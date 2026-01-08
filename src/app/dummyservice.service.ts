import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "./Services/common.service";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DummyserviceService {
  constructor(private _Commonservice: CommonService) {}

  getCourse(landbankid): Observable<any> {
    const params = new HttpParams().set("landbankid", landbankid);
    return this._Commonservice.callGetAPI(
      "/HomesInventory/masters/LandBank/GetLandPurchaseddetailsDetailed",
      params,
      "YES"
    );
  }

  getCompanyslbreport(): Observable<any> {
    return this._Commonservice.callGetAPI(
      "/HomesInventory/masters/LandBank/GetCompanyslbreport",
      "",
      "NO"
    );
  }
  // GetUserForms(User): Observable<any> {
  //   try {
  //     const params = new HttpParams().set("UserName", User);
  //     return this._Commonservice.callGetAPI(
  //       "/Settings/Users/UserRights/GetUserRightsBasedonUserName",
  //       params,
  //       "YES"
  //     );
  //   } catch (e) {
  //     this._Commonservice.showErrorMessage(e);
  //   }
  // }
  // SelectUser() {
  //   try {
  //     return this._Commonservice.callGetAPI('/Settings/Users/UserRights/GetUsers', '', 'NO');
  //   }
  //   catch (e) {
  //     this._Commonservice.showErrorMessage(e);
  //   }
  // }



  getUserForms1(UserName): Observable<any> {
  const params = new HttpParams().set("UserName", UserName);
  return this._Commonservice.callGetAPI(
    "/Settings/Users/UserRights/GetUserRightsBasedonUserName",
    params,
    "YES"
  );
}

}

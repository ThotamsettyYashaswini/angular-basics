import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "./Services/common.service";
import { HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class DummyserviceService {
  constructor(private _Commonservice: CommonService) {}

  getUsers() {
    return this._Commonservice.callGetAPI(
      "/Settings/Users/UserRights/GetUsers",
      "",
      "NO"
    );
  }

  getUserRightsByUserName(userName: string) {
    const params = new HttpParams().set("UserName", userName);
    return this._Commonservice.callGetAPI(
      "/Settings/Users/UserRights/GetUserRightsBasedonUserName",
      params,
      "YES"
    );
  }
}

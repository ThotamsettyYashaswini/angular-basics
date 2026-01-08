import { Injectable } from '@angular/core';
import { CommonService } from '../../common.service';
import{ Subject, Observable } from 'rxjs'
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FdRdTransactionsService {

  private RdTransactionTab1Data = new Subject<any>();
  
  constructor(private _commonService: CommonService) { }

  _SetRdTransTab1Data(data) {
    this.RdTransactionTab1Data.next(data)
  }
  _GetRdTransTab1Data():Observable<any> {
    return this.RdTransactionTab1Data.asObservable();
  }  
  GetapplicantTypes(ContactType)
  {
    debugger
    const params = new HttpParams().set('ContactType', ContactType);
  return this._commonService.callGetAPI('/Banking/Masters/FIMember/GetapplicantTypes',params,'Yes')
  }
  GetMembersForFd(ContactType,MemberType)
  {
    debugger
    const params = new HttpParams().set('ContactType', ContactType).set('MemberType',MemberType)
    return this._commonService.callGetAPI('/Banking/GetallFDMembers',params,'Yes')
   
  }
  GetFdSchemes(ApplicantType,MemberType)
  {
    const params = new HttpParams().set('ApplicantType', ApplicantType).set('MemberType',MemberType)
    return this._commonService.callGetAPI('/Banking/GetFdSchemes',params,'Yes')
  }
  GetFdSchemeDetails(FdDetailsRecordid)
  {
    const params = new HttpParams().set('FdDetailsRecordid', FdDetailsRecordid);
    return this._commonService.callGetAPI('/Banking/GetFdSchemeDetails',params,'Yes')
  }

}

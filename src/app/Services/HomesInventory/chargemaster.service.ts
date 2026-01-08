import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { environment } from 'src/environments/environment';
import { CommonService } from './../common.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
    providedIn: 'root'
})


export class ChargemasterService {
    editinfo: any;
    ctype: any;
    ButtonType: any;
    httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    });
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
    getChargeTypes(): Observable<any> {
        try {
            return this._CommonService.callGetAPI('/Settings/getchargeNames', '', 'NO');
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }

    }
    CheckDuplicateChargeName(chargename):Observable<any>{
        try{
         const params = new HttpParams().set('chargename', chargename);    
         return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/CheckDuplicatechargeNames', params, 'YES');
        }
        catch(e){
            this._CommonService.showErrorMessage(e)
        }
    }

    SaveNewChargeName(data): Observable<any> {
        try {
            debugger;

         return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveChargesName', data)
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }
    GetUnitofMeasureDetails(requestfrom): Observable<any> {
        try {
             const params = new HttpParams().set('requestfrom', requestfrom);
            return this._CommonService.callGetAPI('/Settings/GetUnitofMeasureDetails',params,'YES');
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }
    getGstPercentages(): Observable<any> {
        debugger;
        try {

            return this._CommonService.callGetAPI('/accounting/accountingtransactions/GetGstPercentages', '', 'NO')
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }

    getChargeConfigurationDataOnItem(iemtypeid): Observable<any> {

        debugger
        const params = new HttpParams().set('iemtypeid', iemtypeid);
        return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/viewitemtypechargeconfiguration', params, 'YES');
    }
    getitemtypewisechargeConfig(itemtypeid,projectid): Observable<any> {
      try{
        debugger
        const params = new HttpParams().set('itemtypeid', itemtypeid).set('projectid',projectid);
        return this._CommonService.callGetAPI('/Settings/getitemtypewisechargeConfig', params, 'YES');
         }
      catch(e){
                this._CommonService.showErrorMessage(e);
       }

    }
viewitemtypechargeconfiguration(iemtypeid,projectid): Observable<any> {
    try{
        debugger
        const params = new HttpParams().set('iemtypeid', iemtypeid).set('projectid',projectid);
        return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/viewitemtypechargeconfiguration', params, 'YES');
      }
      catch(e){
                this._CommonService.showErrorMessage(e);
       }
    }
    SaveChargeConfiguration(data): Observable<any> {
        debugger;
        try {

            return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveChargeconfiguration', data);
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }

    CheckDuplicateExtraTypes(extratype): Observable<any> {
        try {
            const params = new HttpParams().set('extratype',extratype);
            return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/CheckDuplicateExtratype', params, 'YES')
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }
    SaveNewExtraTypes(data): Observable<any> {
        try {

            return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveExtratype', data)
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }
    GetExtraTypes(): Observable<any> {
        debugger;
        try {
            const params = new HttpParams();
            return this._CommonService.callGetAPI('/Settings/getExtraNames',params,'NO')
        }
        catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }
GetExtratypesDetailsOnItem(itemtypeid,projectid,deductiontype):Observable<any>{
    try {
debugger;
const params = new HttpParams().set('itemtypeid',itemtypeid).set('projectid',projectid).set('deductiontype',deductiontype);
        return this._CommonService.callGetAPI('/Settings/getitemtypewiseExtratypesNames',params,'YES')
    }
    catch (e) {
        this._CommonService.showErrorMessage(e);
    }
}
getExtraNamesconfig(itemtypeid,projectid,deductiontype):Observable<any>{
    try {
debugger;
const params = new HttpParams().set('itemtypeid',itemtypeid).set('projectid',projectid).set('deductiontype',deductiontype);
        return this._CommonService.callGetAPI('/Settings/getExtraNamesconfig',params,'YES')
    }
    catch (e) {
        this._CommonService.showErrorMessage(e);
    }
}
GetProjectdetails(itemtypeid): Observable<any> {
      try {
debugger; 
    const params = new HttpParams().set('itemtypeid', itemtypeid)
    return this._CommonService.callGetAPI('/HomesInventory/masters/InstallmentConfigurationController/GetProjectDetails', params, 'YES')
      }
        catch (e) {
        this._CommonService.showErrorMessage(e);
    }
  }
SaveExtratypeConfiguration(data): Observable<any> {
    try {
        return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveExtraTypeconfiguration', data)
    }
    catch (e) {
        this._CommonService.showErrorMessage(e);
    }
}
SaveStandardRateConfiguration(data):Observable<any>{
    debugger;
   
       return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveStandardRateconfiguration',data);

    // catch(e){
    //     this._CommonService.showErrorMessage(e);
    // }
}
viewitemtypeStandardrateconfiguration(itemtypeid,_projectname):Observable<any>{
    try{
        debugger;
      const params = new HttpParams().set('iemtypeid',itemtypeid).set('_projectname',_projectname);  
return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/viewitemtypeStandardrateconfiguration',params,'YES');
    }
    catch(e){   
        this._CommonService.showErrorMessage(e)
    }
}
GetProjectdetailsbyid(itemtypeid): Observable<any> {
    const params = new HttpParams().set('itemtypeid', itemtypeid)
    return this._CommonService.callGetAPI('/HomesInventory/masters/InstallmentConfigurationController/GetProjectDetails', params, 'YES')
  }


//-------------------  SERVICE FOR CADRE COMMISSION---------------------


getCommissionReleaseType() : Observable<any> {
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetCommissionReleaseType', '', 'NO')
}

saveCadreCommission(data): Observable<any>{

    return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveCadreCommConfiguration',data)
}

saveCadre(data): Observable<any>{

    return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveCadre',data)
}

getCadres() : Observable<any> {
    debugger
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetCadres', '', 'NO')
}

checkDuplicateCadre(cadre): Observable<any> {

    const params = new HttpParams().set('cadre', cadre);
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/CheckDuplicateCadre', params, 'YES')
}

getCadreDetailsView(itemytypeid,projecttypeid) : Observable<any>{

    const params = new HttpParams().set('itemtypeid', itemytypeid).set('projectid', projecttypeid);
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetCadreCommissionConfigurationData',params,'YES')
}

// /api/HomesInventory/masters/LandBank/GetCadreCommissionConfigById

GetCadreCommissionConfigById(pcadreconfigid): Observable<any> {
    const params = new HttpParams().set('pcadreconfigid', pcadreconfigid)
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetCadreCommissionConfigById', params, 'YES')
  }

 


  updateCadreCommConfiguration(cadreconfigid,cadrevalue) {
    let path = '/HomesInventory/masters/LandBank/updateCadreCommConfiguration?cadreconfigid=' + cadreconfigid + '&cadrevalue=' + cadrevalue
    return this._CommonService.callPostAPIMultipleParameters(path);
  }

  
///api/HomesInventory/masters/LandBank/updateCadreCommConfiguration
}
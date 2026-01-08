import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from '../common.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandBankService {
  private _TabsData = new Subject<any>();
  private LandPurchaseUpdate = new Subject<any>();
  private AddressData = new Subject<any>();
  private landid = new Subject<any>();
  GetLandDetailsViewbyid$ = this.landid.asObservable();

  Buttontype: any
  constructor(private http: HttpClient, private _CommonService: CommonService) { }

  saveLandbankdetails(data): Observable<any> {

    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveLandBank', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  saveLandbankAddressdetails(data): Observable<any> {

    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveAddressDetails', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  SavedocumentDetails(data): Observable<any> {

    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveDocumentDetails', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  checkLandbankdata(checkparamtype, fielddata, landbankid): Observable<any> {
    const params = new HttpParams().set('checkparamtype', checkparamtype).set('fielddata', fielddata).set('landbankid', landbankid)
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/checkLandbankdata', params, 'YES')
  }

  getLandpurchasedsharedetails(landbankid): Observable<any> {
    const params = new HttpParams().set('landbankid', landbankid)
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetLandPurchasedsharedetails', params, 'YES')
  }

  _SetLandpurchasedatatonextTab(data) {
    debugger;
    this._TabsData.next(data)
  }

  _GetLandpurchasedatatonextTab(): Observable<any> {
    return this._TabsData.asObservable();
  }


  
    
  _SetLandPurchaseUpdate($event, row, rowIndex) {
    this.LandPurchaseUpdate=row;
}
_GetLandPurchaseUpdate(): Observable<any> {

    return this.LandPurchaseUpdate;
}

SetButtonType(type) {
  this.Buttontype = type
}
GetButtonType() {
  return this.Buttontype
}

_SetAddress(addresData) {
  this.AddressData=addresData;
}



GetLandPurchaseddetailsDetailed(landbankid): Observable<any> {
  const params = new HttpParams().set('landbankid', landbankid);
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetLandPurchaseddetailsDetailed', params, 'YES')
}

GetLayoutsdetailsDetailed(landbankid): Observable<any> {
  const params = new HttpParams().set('landbankid', landbankid);
  return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/GetLandPurchasedLayoutdetailsby_landbankid', params, 'YES')
}

_SetLandDetailsViewbyid(data: any) {
  debugger
   this.landid.next(data)
}

getTowersListdetails(buildingid): Observable<any> {
  const params = new HttpParams().set('buildingid', buildingid)
  return this._CommonService.callGetAPI('/HomesInventory/masters/CBController/BindTowersList', params, 'YES')
}

getBindTowersFloorsListdetails(buildingblockstructureid): Observable<any> {
  const params = new HttpParams().set('buildingblockstructureid', buildingblockstructureid)
  return this._CommonService.callGetAPI('/HomesInventory/masters/CBController/BindTowersFloorsList', params, 'YES')
}

SaveCommercialBuildingFloorDetails(data): Observable<any> {

  try {
    return this._CommonService.callPostAPI('/HomesInventory/masters/CBController/saveCommercialBuildingFloorDetails', data);

  }
  catch (e) {
    this._CommonService.showErrorMessage(e);
  }
}
getrepresentedbydetails():Observable<any>{
  try{
    return this._CommonService.callGetAPI('/Settings/Employee/GetallEmployeeDetails', '', 'NO')
  }
  catch(e){
    this._CommonService.showErrorMessage(e);
  }
}
checkcommercialbuildingduplicates(buildingid,projectname): Observable<any> {

  try {
    const params = new HttpParams().set('buildingid', buildingid).set('checkname', projectname);
  return this._CommonService.callGetAPI('/HomesInventory/masters/CBController/checkcommercialbuildingduplicates', params, 'YES')


  }
  catch (e) {
    this._CommonService.showErrorMessage(e);
  }
}

getCompanyslbreport():Observable<any>{
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetCompanyslbreport','',"NO");
}

///api/HomesInventory/masters/LandBank/Getvillageslbreport
getvillageslbreport(company):Observable<any>{
  const params = new HttpParams().set('company',company);
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getvillageslbreport',params,"YES");
}

///api/HomesInventory/masters/LandBank/Getdocumentslbreport
getdocumentslbreport(company,village):Observable<any>{
    const params = new HttpParams().set('company',company).set('village',village);
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getdocumentslbreport',params,"YES");
}

///api/HomesInventory/masters/PlotLayoutController/GetLandPurchaseddetails
getLandPurchaseddetails():Observable<any>{
  return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/GetLandPurchaseddetails',"","NO");
}

//HomesInventory/masters/LandBank/GetLandPurchaseddetailsReport
getLandPurchasedDetailsReport(company,village,document): Observable<any> {

  try {
    const params = new HttpParams().set('company', company).set('village', village).set('document', document);
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetLandPurchaseddetailsReport', params, 'YES')


  }
  catch (e) {
    this._CommonService.showErrorMessage(e);
  }
}

//HomesInventory/masters/LandBank/GetProceedingsmutation

getProceedingsMutation():Observable<any>{
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetProceedingsmutation','',"NO");
}

//HomesInventory/masters/LandBank/Getvillagesmutation

getvillagesMutation(company):Observable<any>{
   const params = new HttpParams().set('company', company)
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getvillagesmutation',params,"YES");
}

//HomesInventory/masters/LandBank/Getdocumentsmutation

getDocumentsMutation(company,village):Observable<any>{
     const params = new HttpParams().set('company', company).set('village', village)

  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getdocumentsmutation',params,"YES");
}

//HomesInventory/masters/LandBank/GetMutationsurveynoreport

getMutationSurveyNo(company,village,document):Observable<any>{
     const params = new HttpParams().set('company', company).set('village', village).set('document', document);
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetMutationsurveynoreport',params,"YES");
}

//HomesInventory/masters/LandBank/GetMutationReport

getMutationReport(company,village,document,surveyno): Observable<any> {

  try {
    const params = new HttpParams().set('company', company).set('village', village).set('document', document).set('surveyno',surveyno);
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetMutationReport', params, 'YES')


  }
  catch (e) {
    this._CommonService.showErrorMessage(e);
  }
}

//HomesInventory/masters/LandBank/GetProceedingsConvertion
getProceedingsConvertion():Observable<any>{
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetProceedingsConvertion','',"NO");
}

//HomesInventory/masters/LandBank/GetvillagesConvertion

getvillagesConvertion(company):Observable<any>{
     const params = new HttpParams().set('company', company);

  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetvillagesConvertion',params,"yes");
}

//HomesInventory/masters/LandBank/GetdocumentsConvertion

getDocumentsConvertion(company,village):Observable<any>{
       const params = new HttpParams().set('company', company).set('village',village);

  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetdocumentsConvertion',params,"YES");
}

//HomesInventory/masters/LandBank/GetConvertionsurveynoreport

getConvertionSurveyNo(company,village,document):Observable<any>{
     const params = new HttpParams().set('company', company).set('village', village).set('document', document);
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetConvertionsurveynoreport',params,"YES");
}

//HomesInventory/masters/LandBank/GetConvertionReport

getConvertionReport(company,village,document,surveyno): Observable<any> {

  try {
    const params = new HttpParams().set('company', company).set('village', village).set('document', document).set('surveyno', surveyno);
    console.log('/HomesInventory/masters/LandBank/GetConvertionReport', params);
    
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetConvertionReport', params, 'YES')


  }
  catch (e) {
    this._CommonService.showErrorMessage(e);
  }
}

//HomesInventory/masters/LandBank/GetvillagesLayout

getVillagesLayout(company):Observable<any>{
     const params = new HttpParams().set('company', company);

  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetvillagesLayout',params,"yes");
}

//HomesInventory/masters/LandBank/GetdocumentsLayout

getDocumentsLayout(company,village):Observable<any>{
       const params = new HttpParams().set('company', company).set('village',village);

  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetdocumentsLayout',params,"YES");
}

//HomesInventory/masters/LandBank/GetMutationsurveynoreport

getMutationsurveyNo(company,village,document):Observable<any>{
     const params = new HttpParams().set('company', company).set('village', village).set('document', document);
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetMutationsurveynoreport',params,"YES");
}

//HomesInventory/masters/LandBank/GetLandPlotcount

getLandPlotCount(company,village,document):Observable<any>{
     const params = new HttpParams().set('company', company).set('village', village).set('document', document);
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetLandPlotcount',params,"YES");
}

//HomesInventory/masters/LandBank/Getayoutreport

getLayoutReport(company):Observable<any>{
     const params = new HttpParams().set('company', company);
     //.set('village', village).set('document', document).set('surveyno', surveyno)
  return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getayoutreport',params,"YES");
}

//HomesInventory/masters/PlotLayoutController/GetLandPurchaseddetailsbyid

getLandPurchasedDetailsByID(landbankid):Observable<any>{
     const params = new HttpParams().set('landbankid', landbankid);
  return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/GetLandPurchaseddetailsbyid',params,"YES");
}

///api/HomesInventory/masters/LandBank/updatelandbank

updateLandBank(landbankid,surveyno,documentno,village,data){  

  let str = "/HomesInventory/masters/LandBank/updatelandbank?landbankid="+landbankid+"&surveyno="+surveyno+"&documentno="+documentno+"&village="+village;
  return this._CommonService.callPostAPI(str, data);
}

}

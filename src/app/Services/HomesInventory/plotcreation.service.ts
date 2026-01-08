import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from '../common.service';
import { Observable, Subject } from 'rxjs';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { formatDate } from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class PlotcreationService {
  Buttontype: any;
  private layoutid = new Subject<any>();
  Getlayoutbyid$ = this.layoutid.asObservable();
  constructor(private http: HttpClient, private _CommonService: CommonService) { }


  SavePurchasedland_plot_layout(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/PlotLayoutController/SavePurchasedland_plot_layout', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }


  getLanddata() {
    const params = new HttpParams();
    return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/GetLandPurchaseddetails', params, 'NO')
  }

  //api/HomesInventory/masters/PlotLayoutController/GetLandDetailsforcourtcases

  getLandDetailsForCourtCases() {
    const params = new HttpParams();
    return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/GetLandDetailsforcourtcases', params, 'NO')
  }

  GetItemTypes() {
    const params = new HttpParams();
    return this._CommonService.callGetAPI('/Settings/GetItemTypes', params, 'NO')
  }


  getitemtypewisechargeNames(ProjectLaunchDate, projectid, itemtypeid): Observable<any> {
    debugger
    try {
      const params = new HttpParams().set('itemtypeid', itemtypeid).set('projectid', projectid).set('ProjectLaunchDate', ProjectLaunchDate);
      return this._CommonService.callGetAPI('/Settings/getitemtypewisechargeNames', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  getitemtypewiseExtratypesNamesconfiguration(itemtypeid, projectid, ProjectLaunchDate): Observable<any> {
    const params = new HttpParams().set('itemtypeid', itemtypeid).set('projectid', projectid).set('ProjectLaunchDate', ProjectLaunchDate);
    return this._CommonService.callGetAPI('/Settings/getitemtypewiseExtratypesNamesconfiguration', params, 'YES')
  }

  SaveTransactiontypechargesDetails(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/PlotLayoutController/SaveTransactiontypechargesDetails', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  GetExtraTypes(): Observable<any> {
    debugger;
    try {
      const params = new HttpParams();
      return this._CommonService.callGetAPI('/Settings/getExtraNames', params, 'NO')
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
  SetButtonType(type) {
    this.Buttontype = type
  }
  GetButtonType() {
    return this.Buttontype
  }
  getplotslayoutdetails(): Observable<any> {
    try {

      return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/GetLandPurchasedLayoutdetailsby_landbankid', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  getplotslayoutdetailsbyid(layoutid): Observable<any> {
    try {
      const params = new HttpParams().set('layoutid', layoutid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/getplotslayoutsDetailsDetailed', params, 'YES')
    }
    catch (e) {

    }
  }

  _SetlayoutDetailsViewbyid(data: any) {
    debugger
    this.layoutid.next(data)
  }



  GetLayoutplotsdetailsbylayoutid(layoutid): Observable<any> {
    try {
      const params = new HttpParams().set('layoutid', layoutid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/GetLayoutplotsdetailsbylayoutid', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  checkplotslayoutsduplicates(layoutid, checkname): Observable<any> {
    try {
      debugger;
      const params = new HttpParams().set('layoutid', layoutid).set('checkname', checkname);
      return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/checkplotslayoutsduplicates', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  checklayoutspermitnoduplicates(layoutid, permitno): Observable<any> {
    try {
      debugger;
      const params = new HttpParams().set('layoutid', layoutid).set('permitno', permitno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/checklayoutspermitnoduplicates', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  checklayoutsreranoduplicates(layoutid, rerano): Observable<any> {
    try {
      debugger;
      const params = new HttpParams().set('layoutid', layoutid).set('rerano', rerano);
      return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/checklayoutsreranoduplicates', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  getcompanydetailsfortest() {
    try {
      debugger;
      return this._CommonService.callGetAPIs('/Settings/Company/getCompanyDetails', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  getitemtypewiseStandardrates(itemtypeid, launchdate, Projectname): Observable<any> {

    try {
      const params = new HttpParams().set('itemtypeid', itemtypeid).set('ProjectLaunchDate', launchdate).set('Projectname', Projectname);
      return this._CommonService.callGetAPI('/Settings/getitemtypewiseStandardrates', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }
  GetPlotnodetails(Plotno, LayoutId): Observable<any> {
    try {
      const params = new HttpParams().set('Plotno', Plotno).set('LayoutId', LayoutId);
      return this._CommonService.callGetAPI('/Plots/Masters/LayoutEntry/GetPlotnodetails', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }
  GetProjectdetailsbyid(itemtypeid): Observable<any> {
    try {
      const params = new HttpParams().set('itemtypeid', itemtypeid)
      return this._CommonService.callGetAPI('/HomesInventory/masters/InstallmentConfigurationController/GetProjectDetails', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  ///HomesInventory/masters/LandBank/GetCourtcasepartytype

  GetCourtcasepartytype() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetCourtcasepartytype', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/GetCourtcaseStatutypes

  GetCourtcaseStatutypes() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetCourtcaseStatutypes', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  GetLandDetails1(landbankid, surveyno): Observable<any> {
    try {
      const params = new HttpParams().set('landbankid', landbankid).set('surveyno', surveyno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetLandDetails', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  SaveCourtCases(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveCourtCases', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/GetCourtcaseHearingtype
  GetCourtcaseHearingtype() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetCourtcaseHearingtype', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/Getcasenumber

  Getcasenumber() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getcasenumber', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  ///api/HomesInventory/masters/LandBank/SaveCaseHearings
  SaveCaseHearings(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveCaseHearings', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/UpdateHearingdetails

  updateHearingDetails(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/UpdateHearingdetails', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  Checklbcasecount(lbcaseide): Observable<any> {
    try {
      const params = new HttpParams().set('lbcaseide', lbcaseide)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Checklbcasecount', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/Getmaxhearigdate

  Getmaxhearigdate(lbcaseide): Observable<any> {
    try {
      const params = new HttpParams().set('lbcaseide', lbcaseide)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getmaxhearigdate', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  Gethearigdate(lbcaseid): Observable<any> {
    try {
      const params = new HttpParams().set('lbcaseid', lbcaseid)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Gethearigdate', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //banking/masters/LienEntry/Gethearigdate

  ///api/HomesInventory/masters/LandBank/UpdateCourtcasedetails

  updateCourtCaseDetails(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/UpdateCourtcasedetails', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  viewCourtCaseDetails() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/ViewCourtCasesDetails', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  viewCourtCaseDetailsById(plbcaseid): Observable<any> {
    try {
      const params = new HttpParams().set('plbcaseid', plbcaseid)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/ViewCourtCasesDetailsbyid', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  viewHearingDetails() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/ViewHearingdetails', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  ///api/HomesInventory/masters/LandBank/GetHearingdetailsbyid
  getHearingDetailsById(lbhearingid): Observable<any> {
    try {
      const params = new HttpParams().set('lbhearingid', lbhearingid)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetHearingdetailsbyid', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  getLandDetails(landname): Observable<any> {
    try {
      const params = new HttpParams().set('landname', landname)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetLandbankbyid', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  //HomesInventory/masters/LandBank/Getlandvillage
  getLandVillage() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getlandvillage', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/Getlandvillagesurveyno

  getLandVillageSurveyNo(village): Observable<any> {
    try {
      const params = new HttpParams().set('village', village)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getlandvillagesurveyno', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //api/HomesInventory/masters/LandBank/Getlandextent
  getLandExtent(village): Observable<any> {
    try {
      const params = new HttpParams().set('village', village)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getlandextent', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  //api/HomesInventory/masters/LandBank/SaveMutation
  saveMutation(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveMutation', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  ///api/HomesInventory/masters/LandBank/Getlandextent

  GetlandextentData(village, surveyno): Observable<any> {

    try {
      const params = new HttpParams().set('village', village).set('surveyno', surveyno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getlandextent', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //api/HomesInventory/masters/LandBank/Getlandmutationextent

  getlandmutationextent(village, surveyno, mutationid): Observable<any> {

    try {
      const params = new HttpParams().set('village', village).set('surveyno', surveyno).set('mutationid', mutationid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getlandmutationextent', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  getlandmutationextent1(village, surveyno): Observable<any> {

    try {
      const params = new HttpParams().set('village', village).set('surveyno', surveyno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getlandmutationextent', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  // Mutation VIEW

  viewMutationDetails() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/ViewMutation', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //api/HomesInventory/masters/LandBank/Getproceedingnos
  getProceedingNo() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getproceedingnos', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  //api/HomesInventory/masters/LandBank/Getsurveygnos

  getSurveyNo(proceedingno): Observable<any> {
    try {
      const params = new HttpParams().set('proceedingno', proceedingno)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getsurveygnos', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/Bindmutation

  bindMutation(proceedingno, mutationid): Observable<any> {
    try {
      const params = new HttpParams().set('proceedingno', proceedingno).set('mutationid', mutationid)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Bindmutation', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  getMutationDocuments(proceedingno, surveyno, mutationdetailsid, village, documentno): Observable<any> {
    try {
      const params = new HttpParams().set('proceedingno', proceedingno).set('surveyno', surveyno).set('mutationdetailsid', mutationdetailsid).set('village', village).set('documentno', documentno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getmutationdocuments', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  //api/HomesInventory/masters/LandBank/SaveMutationDocument
  saveMutationDocument(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveMutationDocument', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/ViewMutationDocument

  ViewMutationDocument() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/ViewMutationDocument', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/GetMutationvillage

  getMutationvillage() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetMutationvillage', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/GetMutationsurveyno

  GetMutationsurveyno(village): Observable<any> {
    try {
      const params = new HttpParams().set('village', village);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetMutationsurveyno', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/BindMutationdetails

  BindMutationdetails(village, surveyno, mutationid): Observable<any> {
    try {
      const params = new HttpParams().set('village', village).set('surveyno', surveyno).set('mutationid', mutationid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/BindMutationdetails', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/GetlandConvertionextent

  getlandConvertionextent(village, surveyno): Observable<any> {

    try {
      const params = new HttpParams().set('village', village).set('surveyno', surveyno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetlandConvertionextent', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //api​/HomesInventory​/masters​/LandBank​/SaveConvertion
  saveConvertion(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveConvertion', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/ViewConvertion

  viewConvertion() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/ViewConvertion', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/Getmutationproceedingnos

  Getmutationproceedingnos() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getmutationproceedingnos', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/BindConvertion

  bindConvertion(proceedingno, convertionid): Observable<any> {
    try {
      const params = new HttpParams().set('proceedingno', proceedingno).set('convertionid', convertionid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/BindConvertion', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/GetConvertiondocuments

  GetConvertiondocuments(proceedingno, surveyno, convertionid): Observable<any> {
    try {
      const params = new HttpParams().set('proceedingno', proceedingno).set('surveyno', surveyno).set('convertionid', convertionid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetConvertiondocuments', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/SaveConvertionDocument

  saveConvertionDocument(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveConvertionDocument', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/ViewConvertionDocument

  viewConvertionDocument() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/ViewConvertionDocument', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  //HomesInventory/masters/LandBank/Getconvertiondoclayout
  getConvertionDocLayout() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getconvertiondoclayout', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  //HomesInventory/masters/LandBank/Getconvertionsurveyno
  getConvertionSurveyNo(documentno): Observable<any> {
    try {
      const params = new HttpParams().set('documentno', documentno)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getconvertionsurveyno', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/Getlayoutextent

  getLayoutExtent(documentno, surveyno): Observable<any> {
    try {
      const params = new HttpParams().set('documentno', documentno).set('surveyno', surveyno)
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getlayoutextent', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/Savelayout

  savelayout(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/Savelayout', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/Viewlayout

  viewLayout() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Viewlayout', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  // api/HomesInventory/masters/LandBank/GetlandDoumentcno

  getLandDoumentcno(village, surveyno): Observable<any> {

    try {
      const params = new HttpParams().set('village', village).set('surveyno', surveyno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetlandDoumentcno', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //api/HomesInventory/masters/LandBank/Getcourtcasesreport

  // getCourtCasesReport(){
  //   try {
  //     debugger;
  //     return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getcourtcasesreport', '', 'NO')
  //   }
  //   catch (e) {
  //     this._CommonService.showErrorMessage(e);
  //   }
  // }

  getCourtCasesReport(date, sector): Observable<any> {

    try {
      const params = new HttpParams().set('date', date).set('sector', sector);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getcourtcasesreport', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/Getsectors

  getSectors() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/Getsectors', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  //HomesInventory/masters/LandBank/getRelatedCaseNos

  getRelatedCaseNos() {
    try {
      debugger;
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetRelatedCaseno', '', 'NO')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  ////Settings/ReferralAdvocate/GetMutationDocumentType

  getMutationDocumentType(DocId): Observable<any> {

    try {
      const params = new HttpParams().set('DocId', DocId);
      return this._CommonService.callGetAPI('/Settings/ReferralAdvocate/GetMutationDocumentType', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  getConvertionDocumentType(DocId): Observable<any> {

    try {
      const params = new HttpParams().set('DocId', DocId);
      return this._CommonService.callGetAPI('/Settings/ReferralAdvocate/GetConvertionDocumentType', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/GetMutationDocunments

  getMutationDocunments(village, surveyno): Observable<any> {

    try {
      const params = new HttpParams().set('village', village).set('surveyno', surveyno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetMutationDocunments', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/SaveMutationDocumentDetails

  saveMutationDocumentDetails(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveMutationDocumentDetails', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  saveConvertionDocumentDetails(data) {
    try {
      return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SaveConvertionDocumentDetails', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  ///HomesInventory/masters/LandBank/GetMutationDocdetails

  getMutationDocdetails(mutationid): Observable<any> {

    try {
      const params = new HttpParams().set('mutationid', mutationid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetMutationDocdetails', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/GetConvertionDocdetails

  getConvertionDocdetails(convertionid): Observable<any> {

    try {
      const params = new HttpParams().set('convertionid', convertionid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetConvertionDocdetails', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/GetmutationUploadSurveyno

  GetmutationUploadSurveyno(proceedingno): Observable<any> {

    try {
      const params = new HttpParams().set('proceedingno', proceedingno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetmutationUploadSurveyno', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  ///HomesInventory/masters/LandBank/GetmutationUploadDocno

  GetmutationUploadDocno(proceedingno, surveyno): Observable<any> {

    try {
      const params = new HttpParams().set('proceedingno', proceedingno).set('surveyno', surveyno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetmutationUploadDocno', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/GetconvertionUploadSurveyno

  GetconvertionUploadSurveyno(proceedingno): Observable<any> {

    try {
      const params = new HttpParams().set('proceedingno', proceedingno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetconvertionUploadSurveyno', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/GetconvertionUploadDocno

  GetconvertionUploadDocno(proceedingno, surveyno): Observable<any> {

    try {
      const params = new HttpParams().set('proceedingno', proceedingno).set('surveyno', surveyno);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetconvertionUploadDocno', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/GetLayoutDocument

  GetLayoutDocument(layoutid): Observable<any> {

    try {
      const params = new HttpParams().set('layoutid', layoutid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetLayoutDocument', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/ViewLayoutbyid

  viewLayoutById(layoutid): Observable<any> {

    try {
      const params = new HttpParams().set('layoutid', layoutid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/ViewLayoutbyid', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/LandBank/GetMortigagecount

  getMortigageCount(layoutid): Observable<any> {

    try {
      const params = new HttpParams().set('layoutid', layoutid);
      return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/GetMortigagecount', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  // HomesInventory/masters/LandBank/SavelayoutExtention

  saveLayoutExtension(data) {
    return this._CommonService.callPostAPI('/HomesInventory/masters/LandBank/SavelayoutExtention', data);
  }

  //HomesInventory/masters/LandBank/ViewLayoutExtension

  viewLayoutExtension() {
    const params = new HttpParams();
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/ViewLayoutExtension', params, 'NO')
  }

  getMutationProceedingNosDoc() {
    const params = new HttpParams();
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/getMutationProceedingNosDoc', params, 'NO')
  }

  getProceedingNosDoc() {
    const params = new HttpParams();
    return this._CommonService.callGetAPI('/HomesInventory/masters/LandBank/getProceedingNosDoc', params, 'NO')
  }

  //HomesInventory/masters/LandBank/getProceedingNosDoc


  //HomesInventory/masters/LandBank/getMutationProceedingNosDoc

  //HomesInventory/masters/PlotLayoutController/getLandPurchaseddetailsByCompanyName
  getLandPurchaseddetailsByCompanyName(companyName): Observable<any> {

    try {
      const params = new HttpParams().set('companyName', companyName);
      return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/getLandPurchaseddetailsByCompanyName', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }

  //HomesInventory/masters/PlotLayoutController/getLandPurchaseddetailsByLocation

  getLandPurchaseddetailsByLocation(location): Observable<any> {

    try {
      const params = new HttpParams().set('location', location);
      return this._CommonService.callGetAPI('/HomesInventory/masters/PlotLayoutController/getLandPurchaseddetailsByLocation', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }


  _downloadPayrollProcessApprovalPdf(reportName, gridData, gridheaders, colWidthHeight, pagetype, betweenorason, fromdate, todate, printorpdf, gridtotals, empCount) {
    debugger;
    let address = this._CommonService.comapnydetails.pAddress1 + ' ' + this._CommonService.comapnydetails.pAddress2 + ' ' + this._CommonService.comapnydetails.pDistrict + ' ' + this._CommonService.comapnydetails.pcity + ' ' + this._CommonService.comapnydetails.pState + ' - ' + this._CommonService.comapnydetails.pPincode;
    //let Companyreportdetails = this.comapnydetails;;
    let Companyreportdetails = this._CommonService.comapnydetails;
    let doc = new jsPDF(pagetype);
    //let currencyformat = this._CommonService.currencysymbol;
    //let rupeeImage = this._CommonService._getRupeeSymbol();
    let kapil_logo = this._CommonService.getKapilGroupLogo();
    //Sowjanya Starts//

    let pageSize = doc.internal.pageSize;
    console.log(`Page Size: ${pageSize}`);

    let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    console.log(`Page Width: ${pageWidth}`);

    //  if (Companyreportdetails.pCompanyName === "BVM DIGITAL MEDIA PVT LTD") {
    //    let BVM_Img = this._CommonService.getBvmLogo();

    //    doc.addImage(BVM_Img, 'PNG', 265,5);
    //  }


    // Sowjanya Ends//
    // let doc = new jsPDF('lanscape');
    let totalPagesExp = '{total_pages_count_string}'
    let today = formatDate(new Date(), 'dd-MMM-yyyy  h:mm:ss a', 'en-IN');
    var lMargin = 15; //left margin in mm
    var rMargin = 15; //right margin in mm
    var pdfInMM;
    let pageheight;
    let data2;

    var raw = gridData;
    var body = []

    for (var i = 0; i < raw.length; i++) {
      var row = []

      for (var key in raw[i]) {
        row.push(raw[i][key])

      }
      if (i % 2 === 0) {
        row.unshift({
          rowSpan: 2,
          content: row[1],
          styles: { valign: 'middle', halign: 'left' },
        })
        row.splice(2, 1);
      }
      if (i % 2 === 0) {
        row.unshift({
          rowSpan: 2,
          content: row[1],
          styles: { valign: 'middle', halign: 'left' },
        })
        row.splice(2, 1);
      }

      body.push(row);

    }
    doc.autoTable({
      head: gridheaders,
      body: body,
      theme: 'grid',//'striped'|'grid'|'plain'|'css' = 'striped'
      headStyles: {
        fillColor: this._CommonService.pdfProperties("Header Color"),
        halign: this._CommonService.pdfProperties("Header Alignment"),
        fontSize: this._CommonService.pdfProperties("Header Fontsize")
      }, // Red
      styles: {
        cellPadding: 1, fontSize: this._CommonService.pdfProperties("Cell Fontsize"), cellWidth: 'wrap',
        rowPageBreak: 'avoid',
        overflow: 'linebreak'
      },
      // Override the default above for the text column
      columnStyles: colWidthHeight,
      startY: 18,
      showHead: 'everyPage',//|'everyPage'|'never' = 'firstPage''
      showFoot: 'lastPage',
      didDrawPage: function (data) {

        let pageSize = doc.internal.pageSize;
        let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        data2 = data;
        // Header
        doc.setFontStyle('normal');
        if (doc.internal.getNumberOfPages() == 1) {
          debugger;
          doc.setFontSize(10);
          if (pagetype == "a4") {

            doc.addImage(kapil_logo, 'JPEG', 270, 5)
            doc.setTextColor('black');
            //doc.text(Companyreportdetails.pCompanyName, 60, 10);
            //doc.text(Companyreportdetails.pCompanyName, 75, 10);
            //syam
            //doc.text(Companyreportdetails.pCompanyName, pageWidth/2,20,{align:'center'});

            doc.setFontSize(8);
            //doc.text(address, 40, 17, 0, 0, 'left');
            //doc.text(address, pageWidth/2,20,{align:'center'});
            //doc.text(address, 60, 17, 0, 0, 'left');
            if (!isNullOrEmptyString(Companyreportdetails.pCinNo)) {
              doc.text('CIN : ' + Companyreportdetails.pCinNo + '', 98, 26);
            }
            doc.setFontSize(14);
            doc.text(reportName, 100, 32);
            doc.setFontSize(10);
            // if (betweenorason == "Between") {

            //   doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 57);
            // }
            // else if (betweenorason == "As on") {

            //   if (fromdate != "") {
            //     doc.text('As on  : ' + fromdate + '', 15, 57);
            //   }
            // }
            //doc.text('Branch : ' + Companyreportdetails.pBranchname + '', 163, 40 ,{align:'center'});
            doc.setDrawColor(0, 0, 0);
            pdfInMM = 233;
            doc.line(10, 43, (pdfInMM - lMargin - rMargin), 43) // horizontal line
          }
          if (pagetype == "landscape") {
            // doc.addImage(kapil_logo, 'JPEG', 15, 5)
            // doc.setTextColor('black');
            //doc.text(Companyreportdetails.pCompanyName, 110, 10);
            //doc.text(Companyreportdetails.pCompanyName, 100, 10);
            //syam
            //doc.text(Companyreportdetails.pCompanyName, pageWidth/2, 10,{align:'center'});
            //doc.setFontSize(10);
            //doc.text(address, 80, 17, 0, 0, 'left');
            //doc.text(address, pageWidth/2,20,{align:'center'});
            //doc.text(address, 80, 17, 0, 0, 'left');
            // if (!isNullOrEmptyString(Companyreportdetails.pCinNo)) {
            //   doc.text('CIN : ' + Companyreportdetails.pCinNo + '', 98, 26);
            // }
            doc.setFontSize(14);

            doc.text(reportName, 100, 15);

            doc.setFontSize(10);
            //  doc.text('Printed On : ' + today + '', 15, 57);
            //doc.text('Branch : ' + Companyreportdetails.pBranchname + '', 235, 42);
            doc.setDrawColor(0, 0, 0);
            pdfInMM = 315;
            //doc.line(10, 28, (pdfInMM - lMargin - rMargin), 28) // horizontal line
            doc.setFontSize(10);
            // if (betweenorason == "Between") {

            //   doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 58);
            // }
            // else if (betweenorason == "As on") {

            //   if (fromdate != "") {
            //     doc.text('As on  : ' + fromdate + '', 15, 58);
            //   }
            // }
            // doc.text('Printed On : ' + today + '', 15, 57);
          }

        }
        else {

          data.settings.margin.top = 20;
          data.settings.margin.bottom = 15;
        }

        var pageCount = doc.internal.getNumberOfPages();
        if (doc.internal.getNumberOfPages() == totalPagesExp) {
          debugger;

        }
        // Footer
        let page = "Page " + doc.internal.getNumberOfPages()
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          debugger;
          page = page + ' of ' + totalPagesExp
        }
        doc.line(5, pageHeight - 10, (pdfInMM - lMargin - rMargin), pageHeight - 10) // horizontal line

        doc.setFontSize(10);
        doc.text("Printed on : " + today, data.settings.margin.left, pageHeight - 5);

        //doc.text(officeCd, pageWidth / 2, pageHeight - 5, 'center');
        doc.text(page, pageWidth - data.settings.margin.right - 20, pageHeight - 5);

      },
      didDrawCell: function (data) {

        if ((data.column.index == 23 || data.column.index == 3 || data.column.index == 4 || data.column.index == 5 || data.column.index == 6 || data.column.index == 7 || data.column.index == 8 || data.column.index == 9 || data.column.index == 10 || data.column.index == 11 || data.column.index == 12 || data.column.index == 13 || data.column.index == 14 || data.column.index == 15 || data.column.index == 16 || data.column.index == 17 || data.column.index == 18 || data.column.index == 19 || data.column.index == 20 || data.column.index == 21 || data.column.index == 22) && data.cell.section === 'body') {

          var td = data.cell.raw;
          //   if (td) {
          //     if (currencyformat == "₹") {
          //       var textPos = data.cell.textPos;
          //       doc.setFontStyle('normal');
          //       doc.addImage(rupeeImage, textPos.x - data.cell.contentWidth, textPos.y + 0.5, 1.5, 1.5);
          //     }
          //   }

        }

      }
    });

    const employeeCount = gridData.length;
    // console.log('employeeCount'+employeeCount);
    console.log('employeeCount' + employeeCount);



    doc.setFontSize(12);
    ///By Ramakanth adding extra page for the totals : 27-09-2021
    if (doc.autoTable.previous.finalY + 50 < doc.internal.pageSize.getHeight() - 15) {
      doc.setFont("helvetica", "bold");
      //doc.text('Totals ', 20, doc.autoTable.previous.finalY + 8);
      doc.setFont("helvetica", "normal");
      // doc.text('No.of Employes        :'+empCount['No of Employees'], 20, doc.autoTable.previous.finalY +10 );

      //doc.text('Basic                  :'+"     "+gridtotals['basic'], 20, doc.autoTable.previous.finalY + 15);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 54, doc.autoTable.previous.finalY + 13, 1.9, 1.9);

      // }
      //doc.text('VDA                    :'+"     "+gridtotals['vda'], 20, doc.autoTable.previous.finalY + 20);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 54, doc.autoTable.previous.finalY + 18, 1.9, 1.9);
      // }
      //doc.text('Arrears               :'+"     "+gridtotals['arrears'], 20, doc.autoTable.previous.finalY + 25);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 54, doc.autoTable.previous.finalY + 23, 1.9, 1.9);
      // }
      //doc.text('Basic Protection :'+"     "+gridtotals['basicprotection'], 20, doc.autoTable.previous.finalY + 30);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 54, doc.autoTable.previous.finalY + 28, 1.9, 1.9);
      // }
      //doc.text('Allowances         :'+"     "+gridtotals['allowances'], 20, doc.autoTable.previous.finalY + 35);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 54, doc.autoTable.previous.finalY + 33, 1.9, 1.9);
      // }
      //doc.text('Special Allowance     :'+"     "+gridtotals['specialallowance'], 120, doc.autoTable.previous.finalY + 15);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 162, doc.autoTable.previous.finalY + 13, 1.9, 1.9);
      // }
      //doc.text('Increment Protection :'+"     "+gridtotals['incrementprotection'], 120, doc.autoTable.previous.finalY + 20);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 162, doc.autoTable.previous.finalY + 18, 1.9, 1.9);
      // }
      //doc.text('Advance                    :'+"     "+gridtotals['advances'], 120, doc.autoTable.previous.finalY + 25);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 162, doc.autoTable.previous.finalY + 23, 1.9, 1.9);
      // }
      //doc.text('Insurance                  :'+"     "+gridtotals['insurance'], 120, doc.autoTable.previous.finalY + 30);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 162, doc.autoTable.previous.finalY + 28, 1.9, 1.9);
      // }
      //doc.text('Recoveries                :'+"     "+gridtotals['recoveries'], 120, doc.autoTable.previous.finalY + 35);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 162, doc.autoTable.previous.finalY + 33, 1.9, 1.9);

      // }


      //Sowjanya 14-11-2024//
      doc.setFont("helvetica", "bold");
      //doc.text('No.Of Employes :'+" "+empCount, 220, doc.autoTable.previous.finalY +8);
      doc.setFont("helvetica", "normal");
      //sowjanya Ends//
      //doc.text('Income Tax :'+"     "+gridtotals['incometax'], 220, doc.autoTable.previous.finalY +15);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 245, doc.autoTable.previous.finalY + 13, 1.9, 1.9);
      // }
      //doc.text('PF               :'+"     "+gridtotals['pf'], 220, doc.autoTable.previous.finalY + 20);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 245, doc.autoTable.previous.finalY + 18, 1.9, 1.9);
      // }
      //doc.text('ESI              :'+"     "+gridtotals['esi'], 220, doc.autoTable.previous.finalY + 25);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 245, doc.autoTable.previous.finalY + 23, 1.9, 1.9);
      // }
      //doc.text('Absent        :'+"     "+gridtotals['absenties'], 220, doc.autoTable.previous.finalY + 30);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 245, doc.autoTable.previous.finalY + 28, 1.9, 1.9);
      // }
      //doc.text('Prof. Tax     :'+"     "+gridtotals['proftax'], 220, doc.autoTable.previous.finalY + 35);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 245, doc.autoTable.previous.finalY + 33, 1.9, 1.9);
      // }
      //doc.setDrawColor(0, 0, 0);
      pdfInMM = 315;
      //doc.line(10, doc.autoTable.previous.finalY + 40, (pdfInMM - lMargin - rMargin), doc.autoTable.previous.finalY + 40);
      //doc.text('Total Gross Salary :'+"    "+gridtotals['gross'], 20, doc.autoTable.previous.finalY + 45);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 59, doc.autoTable.previous.finalY + 43, 1.9, 1.9);
      // }
      //doc.text('Total Deductions:'+"    "+gridtotals['deductions'], 120, doc.autoTable.previous.finalY + 45);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 154, doc.autoTable.previous.finalY + 43, 1.9, 1.9);
      // }
      //doc.text('Total Net Salary:'+"    "+gridtotals['net'], 220, doc.autoTable.previous.finalY + 45);
      // if (currencyformat == "₹") {
      //   doc.addImage(rupeeImage, 'JPEG', 253,doc.autoTable.previous.finalY + 43, 1.9, 1.9);
      // }
      doc.setDrawColor(0, 0, 0);
      pdfInMM = 315;
      //  doc.line(10, doc.autoTable.previous.finalY + 50, (pdfInMM - lMargin - rMargin), doc.autoTable.previous.finalY + 50);
      // doc.text("Cheque No.", 15, doc.autoTable.previous.finalY + 60);
      // doc.text("Bank", 115, doc.autoTable.previous.finalY + 60);

      // doc.text("A.G.M", 15, doc.autoTable.previous.finalY + 70);
      // doc.text("R.M", 95, doc.autoTable.previous.finalY + 70);
      // doc.text("Manager", 165, doc.autoTable.previous.finalY + 70);
      // doc.text("Account Officer", 225, doc.autoTable.previous.finalY + 70);
    }

    //extra page 
    // else{
    //   doc.addPage();
    //   doc.setFontSize(10);
    //   doc.setFont("helvetica", "bold");
    //   //doc.text('Totals '+ '', 15, 10);
    //   doc.setFont("helvetica", "normal");
    // }


    if (typeof doc.putTotalPages === 'function') {
      debugger;
      doc.putTotalPages(totalPagesExp);

    }
    if (printorpdf == "Pdf") {
      doc.save('' + reportName + '.pdf');
    }
    if (printorpdf == "Print") {
      this.setiFrameForPrint(doc);
    }

  }

  setiFrameForPrint(doc) {
    debugger;
    const iframe = document.createElement('iframe');
    iframe.id = "iprint";
    iframe.name = "iprint";
    iframe.src = doc.output('bloburl');
    iframe.setAttribute('style', 'display: none;');
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  }

}

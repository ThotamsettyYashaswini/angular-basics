import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl, FormArray } from '@angular/forms';


import { Observable } from 'rxjs/Rx'
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import appsettings from '../../assets/appsettings.json';
import { mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { DatePipe, formatDate } from '@angular/common';
import { debug } from 'util';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Injectable({
    providedIn: 'root'
})
export class CommonService {

    //apiURL = appsettings[0].ApiHostUrl;
    FiTab1Details: any
    //BankData: any;
    currencySymbl: any;
    public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
    dateFormat: any;
    pageSize = 10;
    private ActiveTabName = new Subject<any>()
    private FiTab1Data = new Subject<any>();
    private BankData = new Subject<any>();
    private BankUpdate = new Subject<any>();
    private KYCData = new Subject<any>();
    private KYCUpdate = new Subject<any>();
    private TDSData = new Subject<any>();
    private TDSUpdate = new Subject<any>();
    private ContactData = new Subject<any>();
    private ContactUpdate = new Subject<any>();
    private LandPurchaseUpdate = new Subject<any>();
    private UpdateContactData = new Subject<any>();
    public ReferralViewData: any;
    public ReferralId: any;
    public GeneralReceiptView = new Subject<any>();
    public PaymentView = new Subject<any>();
    public UserRightsView = new Subject<any>();
    public reportLableName: any;
    // private dataSource = new BehaviorSubject({});
    // data = this.dataSource.asObservable();
    // FiTab1Details: any
    // private FiTab1Data = new Subject<any>()
    ValidationErrorMessages = {}
    errormessages: any
    datevalue: any;
    year: any;
    month: any;
    day: any;
    newDate: any;


    pCreatedby: any;
    pStatusname = 'ACTIVE';
    ptypeofoperation = 'CREATE';
    comapnydetails: any;

    private ValidationStatus = new Subject<any>()
    _validationStatus: any;


    public extractData(res: Response) {

        let body = res;
        return body;
    }

    public handleError(error: Response | any) {
        debugger
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    showErrorMessage(errormsg: string) {
        debugger
        this.toastr.error(errormsg, "Error!");
    }
    showErrorMessageForLessTime(errormsg: string) {
        debugger
        this.toastr.error(errormsg, "Error!", { timeOut: 2500 });
    }
    GetImage(strPath)
    {
        const params = new HttpParams().set('strPath', strPath)
        return this.callGetAPI('/loans/masters/contactmasterNew/ConvertImagepathtobase64', params, 'YES')
    }
    GetImageFilepath(strPath)
    {
        const params = new HttpParams().set('strPath', strPath)
        return this.callGetAPI('/loans/masters/contactmasterNew/ConvertImagepathtobase64Contactfilepath', params, 'YES')
    }
    GetBankNames() {
        try {
          return this.callGetAPI('/Accounting/Masters/GetBankNames', ' ', 'NO');
        }
        catch (e) {
          this.showErrorMessage(e);
        }
      }
    showInfoMessage(errormsg: string) {

        this.toastr.success(errormsg, "Success!");
    }
    constructor(private datepipe: DatePipe, private http: HttpClient, private toastr: ToastrService) {

        this._validationStatus = false;
        let Urc = sessionStorage.getItem("Urc");
        if (Urc == null) {

            this.pCreatedby = 0;

        }
        else {
            this.pCreatedby = JSON.parse(sessionStorage.getItem("Urc"))["pUserID"];
        }

        this.comapnydetails = JSON.parse(sessionStorage.getItem("companydetails"));

        //if (this.comapnydata == null) {
        //    this.pCompanyName = '';
        //    this.pAddress1 = '';
        //    this.pAddress2 = '';
        //    this.pcity = '';
        //    this.pCountry = '';
        //    this.pState = '';
        //    this.pDistrict ='';
        //    this.pPincode ='';
        //    this.pCinNo = '';
        //    this.pGstinNo = '';
        //    this.pBranchname = '';
        //}
        //else {
        //    this.pCompanyName = this.comapnydata['pCompanyName'];
        //    this.pAddress1 = this.comapnydata['pAddress1'];
        //    this.pAddress2 = this.comapnydata['pAddress2'];
        //    this.pcity = this.comapnydata['pcity'];
        //    this.pCountry = this.comapnydata['pCountry'];
        //    this.pState = this.comapnydata['pState'];
        //    this.pDistrict = this.comapnydata['pDistrict'];
        //    this.pPincode = this.comapnydata['pPincode'];
        //    this.pCinNo = this.comapnydata['pCinNo'];
        //    this.pGstinNo = this.comapnydata['pGstinNo'];
        //    this.pBranchname = this.comapnydata['pBranchname'];
        //}
        // 
        //this.apiURL = appsettings.ApiHostUrl;
    }

    _setCompanyDetails() {

        this.comapnydetails = JSON.parse(sessionStorage.getItem("companydetails"));
    }

    _setPcreatedby() {

        this.pCreatedby = JSON.parse(sessionStorage.getItem("Urc"))["pUserID"];
    }
    getValidationMessage(formcontrol: AbstractControl, errorkey: string, lablename: string, key: string, skipKey: string): string {
        debugger;
        let errormessage;
        //else if
        if (errorkey == 'required')
            errormessage = lablename + ' Required';
        if (errorkey == 'email' || errorkey == 'pattern')
            errormessage = 'Invalid ' + lablename;
        if (errorkey == 'minlength') {

            let length = formcontrol.errors[errorkey].requiredLength;
            errormessage = lablename + ' Must Have ' + length + ' Digits';
        }
        if (errorkey == 'maxlength' && key != skipKey) {

            let length = formcontrol.errors[errorkey].requiredLength;
            errormessage = lablename + ' Must Have ' + length + ' Digits';
        }
        if (errorkey == 'maxlength' && key == skipKey) {

            //let length = formcontrol.errors[errorkey].requiredLength;
            errormessage = 'Invalid ' + lablename;
        }
        if (errorkey == 'max') {
            let maxValue = formcontrol.errors.max.max;
            errormessage = lablename + ' Maximum value can be ' + maxValue;
        }

        return errormessage;
    }

    formatDateFromDDMMYYYY(value: any): Date | null {

        value = value.substr(0, 10);
        if (value != '' && value != null) {
            if (value.indexOf('/') > -1) {
                this.datevalue = value.split('/');
            }
            if (value.indexOf('-') > -1) {
                this.datevalue = value.split('-');
            }
            if (value.indexOf(' ') > -1) {
                this.datevalue = value.split(' ');
            }
            //console.log("this.datevalue : ", this.datevalue);

            this.day = Number(this.datevalue[0]);
            this.month = Number(this.datevalue[1]) - 1;
            this.year = Number(this.datevalue[2]);

            this.newDate = new Date(this.year, this.month, this.day);
            //console.log("this.newDate : ", this.newDate);

            return this.newDate;
        } else {
            return null
        }

    }
    formatDateFromYYYYMMDD(value: any): Date | null {

        value = value.substr(0, 10);
        if (value != '' && value != null) {
            if (value.indexOf('/') > -1) {
                this.datevalue = value.split('/');
            }
            if (value.indexOf('-') > -1) {
                this.datevalue = value.split('-');
            }
            if (value.indexOf(' ') > -1) {
                this.datevalue = value.split(' ');
            }

            this.day = Number(this.datevalue[2]);
            this.month = Number(this.datevalue[1]) - 1;
            this.year = Number(this.datevalue[0]);

            this.newDate = new Date(this.year, this.month, this.day);
            return this.newDate;
        } else {
            return null
        }

    }
    formatDateFromMMDDYYYY(value: any): Date | null {
        //undefined should be provide
        value = value.substr(0, 10);
        if (value != '' && value != null) {
            if (value.indexOf('/') > -1) {
                this.datevalue = value.split('/');
            }
            if (value.indexOf('-') > -1) {
                this.datevalue = value.split('-');
            }
            if (value.indexOf(' ') > -1) {
                this.datevalue = value.split(' ');
            }

            this.day = Number(this.datevalue[0]);
            this.month = Number(this.datevalue[1]) - 1;
            this.year = Number(this.datevalue[2]);

            this.newDate = new Date(this.year, this.month, this.day);
            return this.newDate;
        } else {
            return null
        }

    }
    getFormatDate(dateData: any): string | null {
        let data = this.datepipe.transform(dateData, 'dd/MM/yyyy');
        return data;
    }
    callGetAPI(apiPath, params, parameterStatus) {

        //let data = environment.apiURL;
        //if (parameterStatus.toUpperCase() == 'YES')
        //  return this.http.get(environment.apiURL + apiPath, { params }).map(this.extractData).catch(this.handleError);
        //else
        //  return this.http.get(environment.apiURL + apiPath).map(this.extractData).catch(this.handleError);
        let urldata = environment.apiURL;
        if (parameterStatus.toUpperCase() == 'YES')

            return this.http.get(urldata).pipe(
                mergeMap(json => this.http.get(json[0]['ApiHostUrl'] + apiPath, { params }).map(this.extractData).catch(this.handleError)));
        else
            return this.http.get(urldata).pipe(
                mergeMap(json => this.http.get(json[0]['ApiHostUrl'] + apiPath).map(this.extractData).catch(this.handleError)));

    }
      callGetAPIs(apiPath, params, parameterStatus) {

        debugger;
        let urldata = environment.apiURL;
        if (parameterStatus.toUpperCase() == 'YES')

            return this.http.get(urldata).pipe(
                mergeMap(json => this.http.get(json[0]['ApiHostUrlInventory'] + apiPath, { params }).map(this.extractData).catch(this.handleError)));
        else
            return this.http.get(urldata).pipe(
                mergeMap(json => this.http.get(json[0]['ApiHostUrlInventory'] + apiPath).map(this.extractData).catch(this.handleError)));

    }

    

    callPostAPI(apiPath, data) {

        let urldata = environment.apiURL;
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        //httpHeaders.append('Access-Control-Allow-Origin', '/*');

        let options = {
            headers: httpHeaders
        };
        //console.log("data : ", data);

        //return this.http.post(environment.apiURL + apiPath, data, options).map(this.extractData).catch(this.handleError);
        return this.http.get(urldata).pipe(
            mergeMap(json => this.http.post(json[0]['ApiHostUrl'] + apiPath, data, options).map(this.extractData).catch(this.handleError)));

    }

    //Not used(Repeated)
    callPostAPIMultipleParameters(apiPath) {
        let urldata = environment.apiURL;
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        httpHeaders.append('Access-Control-Allow-Origin', '/*');

        let options = {
            headers: httpHeaders
        };
        return this.http.get(urldata).pipe(
            mergeMap(json => this.http.post(json[0]['ApiHostUrl'] + apiPath, options).map(this.extractData).catch(this.handleError)));

    }


    public currencyformat(value) {
        //
        if (value == null) { value = 0; }
        else {
            value = parseFloat(value.toString().replace(/,/g, ""));
        }
        let withNegativeData: any;
        var result: any;
        //let currencyformat= this.cookieservice.get("savedformat")
        let currencyformat = "India"
        if (currencyformat == "India") {
            if (value < 0) {
                let stringData = value.toString();
                withNegativeData = stringData.substring(1, stringData.length);
                result = withNegativeData.toString().split('.');
            }
            else if (value >= 0) {
                result = value.toString().split('.');
            }
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
                output += "." + result[1];
            }
            if (value >= 0) {
                return output
            }
            else if (value < 0) {
                output = '-' + '' + output;
                return output
            }
            // } 
        }
        else {
            // this.symbol = this.cookieservice.get("symbolofcurrency")
            var result = value.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
                output += "." + result[1];
            }
            //return this.symbol+"  "+output
        }

    }
    public functiontoRemoveCommas(value) {
        let a = value.split(',')
        let b = a.join('')
        let c = b
        return c;
    }

    GetContactDetails(contacttype: string) {

        const params = new HttpParams().set('contactType', contacttype)
        return this.callGetAPI('/Settings/ReferralAdvocate/getContactDetails', params, 'YES')
        //   let httpHeaders = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Cache-Control': 'no-cache'
        //   })
        //   let HttpParams = { 'contactType': contacttype }
        //   let options = {
        //     headers: httpHeaders,
        //     params: HttpParams
        //   };  
        // return this.http.get('http://192.168.2.164:9999/api/Settings/ReferralAdvocate/getContactDetails',options)
    }
    GetUomData(RequestUom) {
        const params = new HttpParams().set('requestfrom', RequestUom)
        return this.callGetAPI('/Settings/GetUnitofMeasureDetails', params, 'YES')
    }

    getUOMConversionData() {

        return this.callGetAPI('/Settings/GetUOMConvertiondetails', '', 'NO')
    }
    GetContactDetailsbyId(ContactId) {

        const params = new HttpParams().set('ContactId', ContactId)
        return this.callGetAPI('/Settings/ReferralAdvocate/GetContactDetailsbyId', params, 'YES')
    }
    ConvertImagepathtobase64(path) {
        const params = new HttpParams().set('strPath', path)
        return this.callGetAPI('/loans/masters/contactmaster/ConvertImagepathtobase64', params, 'YES')
    }

    SetFiTab1Data(data) {
        this.FiTab1Details = data
    }
    GetFiTab1Data() {
        return this.FiTab1Details
    }
    _SetFiTab1Data(data) {
        this.FiTab1Data.next(data)
    }
    _GetFiTab1Data(): Observable<any> {
        return this.FiTab1Data.asObservable();
    }

    _SetBankUpdate(data) {
        this.BankUpdate.next(data);
    }
    _GetBankUpdate(): Observable<any> {
        return this.BankUpdate.asObservable();
    }
    _SetBankData(data) {
        this.BankData.next(data);
    }
    _GetBankData(): Observable<any> {
        return this.BankData.asObservable();
    }
    /////mahesh m
    CheckValidationStatus(status) {
        this.ValidationStatus.next(status)
    }
    GetValidationStatus(): Observable<any> {
        return this.ValidationStatus
    }


    _setValidationStatus(data: any) {

        this._validationStatus = data
    }
    _getValidationStatus() {
        return this._validationStatus;
    }

    _checkValidationsBetweenComponents() {
        this.ValidationStatus.next();
    }
    _CheckValidationStatus(): Observable<any> {
        return this.ValidationStatus.asObservable();
    }
    /////
    _SetKYCData(data) {
        this.KYCData.next(data);
    }
    _GetKYCData(): Observable<any> {
        return this.KYCData.asObservable();
    }
    _SetKYCUpdate(data) {
        this.KYCUpdate.next(data);
    }
    _GetKYCUpdate(): Observable<any> {
        return this.KYCUpdate.asObservable();
    }
    _SetTDSData(data) {
        this.TDSData.next(data);
    }
    _GetTDSData(): Observable<any> {
        return this.TDSData.asObservable();
    }

    _SetTDSUpdate(data) {
        this.TDSUpdate.next(data);
    }
    _GetTDSUpdate(): Observable<any> {
        return this.TDSUpdate.asObservable();
    }

    _SetContactData(data) {
        this.ContactData.next(data);
    }
    _GetContactData(): Observable<any> {
        return this.ContactData.asObservable();
    }
    _SetContactUpdate(data) {
        this.ContactUpdate.next(data);
    }
    _GetContactUpdate(): Observable<any> {
        return this.ContactUpdate.asObservable();
    }

    _SetReferralViewData(data) {
        this.ReferralViewData = data;
    }
    _GetReferralViewData() {
        return this.ReferralViewData;
    }


    _SetGeneralReceiptView(data) {
        this.GeneralReceiptView = data
        // this.GeneralReceiptView.next(data);
    }
    _GetGeneralReceiptView() {
        return this.GeneralReceiptView
    }

    _SetPaymentView(data) {
        this.PaymentView = data
    }
    _GetPaymentView() {
        return this.PaymentView
    }


    _SetReferralid(data) {
        this.ReferralId = data;
    }
    _GetReferralid() {
        return this.ReferralId;
    }


    fileUpload(data) {
        let urldata = environment.apiURL;
        return this.http.get(urldata).pipe(
            mergeMap(json => this.http.post(json[0]['ApiHostUrl'] + '/loans/masters/contact/MultiFileUpload', data).map(this.extractData).catch(this.handleError)));
    }

    imageUpload(data) {
        let urldata = environment.apiURL;
        return this.http.get(urldata).pipe(
            mergeMap(json => this.http.post(json[0]['ApiHostUrl'] + '/ImageCompress', data).map(this.extractData).catch(this.handleError)));
    }

    fileUploadinfolder(foldername, data) {
        let urldata = environment.apiURL;
        return this.http.get(urldata).pipe(
          mergeMap(json => this.http.post(json[0]['ApiHostUrl'] + '/loans/masters/contact/MultiFileUploads?subfoldername=' + foldername, data).map(this.extractData).catch(this.handleError)));
      }

    GetContactDetailsforKYC(ContactId) {

        const params = new HttpParams().set('pContactId', ContactId)
        return this.callGetAPI('/Settings/getDocumentstoreDetails', params, 'YES')
    }

    removeCommasForEntredNumber(enteredNumber) {
        return parseFloat(enteredNumber.toString().replace(/,/g, ""))
    }

    showWarningMessage(message) {
        this.toastr.warning(message, 'Warning!');
    }
    GetCollectionReport(fromDate, toDate, recordid, fieldname, fieldtype): Observable<any> {
        try {
            const params = new HttpParams().set('fromDate', fromDate).set('toDate', toDate).set('recordid', recordid).set('fieldname', fieldname).set('fieldtype', fieldtype);
            return this.callGetAPI('/CollectionReport/api/Loans/Reports/GetColletionsummary', params, 'YES');
        }
        catch (e) {
            this.showErrorMessage(e);
        }
    }
    _SetUserrightsView(data) {
        this.UserRightsView = data
        // this.GeneralReceiptView.next(data);
    }
    _GetUserrightsView() {
        return this.UserRightsView
    }


    GetCollectiondetails(fromDate, toDate, applicationid): Observable<any> {
        try {
            const params = new HttpParams().set('fromDate', fromDate).set('toDate', toDate).set('Applicationid', applicationid)
            return this.callGetAPI('/CollectionReport/api/Loans/Reports/GetColletiondetails', params, 'YES');
        }
        catch (e) {
            this.showErrorMessage(e);
        }
    }


    _setReportLableName(data) {

        this.reportLableName = data;
    }
    _getReportLableName() {

        return this.reportLableName;
    }

    Getmemberdetails(): Observable<any> {
        try {
            return this.callGetAPI('/Banking/Masters/MemberType/GetMemberDetails', '', 'NO');
        }
        catch (e) {
            this.showErrorMessage(e);
        }
    }
    ageCalculatorYYYYMMDD(fromDate, Todate): string {
        let Currentage = "";
        if (!isNullOrEmptyString(fromDate) && !isNullOrEmptyString(Todate)) {
            let start = new Date(fromDate);
            let end = new Date(Todate)

            let b_day = start.getDate();
            let b_month = start.getMonth() + 1;
            let b_year = start.getFullYear();

            let c_day = end.getDate();
            let c_month = end.getMonth() + 1;
            let c_year = end.getFullYear();

            if (b_day > c_day) {
                c_day = c_day + this.daysInMonth(c_month - 1, c_year);
                c_month = c_month - 1;
            }
            if (b_month > c_month) {
                c_year = c_year - 1;
                c_month = c_month + 12;
            }

            let calculated_date = c_day - b_day;
            let calculated_month = c_month - b_month;
            let calculated_year = c_year - b_year;

            Currentage = calculated_year + " Year  " + calculated_month + "  Months " + calculated_date + "  Days";

        }
        return Currentage;
    }
    daysInMonth(month, year) {
        if (month < 0)
            return 31;
        return new Date(year, month, 0).getDate();
    }
    ageCalculation(DOB): Number {


        let age;
        let dob = DOB;
        if (dob != '' && dob != null) {
            let currentdate = Date.now();
            //let agedate = new Date(dob);
            let agedate = new Date(dob).getTime();
            let timeDiff = Math.abs(currentdate - agedate);
            if (timeDiff.toString() != 'NaN')
                age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
            else
                age = 0;
        }
        else {
            age = 0;
        }
        return age;

    }

    DatePickerDateFormat(property) {
        
        let data;
        if (property == "containerClass") {
            data = "theme-dark-blue"
        }
        if (property == "dateInputFormat") {
            //data = "DD-MMM-YYYY";
            if (this.dateFormat == null) {
                data = "DD-MMM-YYYY";
            }
            else {
                data = this.dateFormat;
            }
        }
        if (property == "showWeekNumbers") {
            data = false;
        }
        return data;
    }

    public removeCommasInAmount(value) {
        if (isNullOrEmptyString(value))
            value = 0;
        return parseFloat(value.toString().replace(/,/g, ""))
        // let a = value.split(',')
        // let b = a.join('')
        // let c = b
        // return c;
    }

    getFormatDateGlobal(date: any): string | null {

        this.dateFormat = sessionStorage.getItem("dateformat");
        if (this.dateFormat == "MM DD YYYY") {
          return this.datepipe.transform(date, 'MM dd yyyy')
        }
        if (this.dateFormat == "DD MM YYYY") {
          return this.datepipe.transform(date, 'dd MM yyyy')
        }
        if (this.dateFormat == "YYYY MM DD") {
          return this.datepipe.transform(date, 'yyyy MM dd')
        }
        if (this.dateFormat == "DD/MM/YYYY") {
          return this.datepipe.transform(date, 'dd/MM/yyyy')
        }
        if (this.dateFormat == "MM/DD/YYYY") {
          return this.datepipe.transform(date, 'MM/dd/yyyy')
        }
        if (this.dateFormat == "YYYY/MM/DD") {
          return this.datepipe.transform(date, 'yyyy/MM/dd')
        }
        if (this.dateFormat == "DD-MM-YYYY") {
          return this.datepipe.transform(date, 'dd-MM-yyyy')
        }
        if (this.dateFormat == "MM-DD-YYYY") {
          return this.datepipe.transform(date, 'MM-dd-yyyy')
        }
        if (this.dateFormat == "YYYY-MM-DD") {
          return this.datepipe.transform(date, 'yyyy-MM-dd')
        }
        if (this.dateFormat == "DD-MMM-YYYY") {
          return this.datepipe.transform(date, 'dd-MMM-yyyy')
        }
        if (this.dateFormat == "MMM-DD-YYYY") {
          return this.datepipe.transform(date, 'MMM-dd-yyyy')
        }
        if (this.dateFormat == "YYYY-MMM-DD") {
          return this.datepipe.transform(date, 'yyyy-MMM-dd')
        }
        if (this.dateFormat == "YYYY-DD-MMM") {
          return this.datepipe.transform(date, 'dd-MMM-yyyy')
        }
      }

      _getRupeeSymbol() {
        return "data:image/png;base64,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";
      }   

      pdfProperties(propertytype) {
        if (propertytype == "Date") {
          let time = formatDate(new Date(), 'dd-MMM-yyyy/h:mm:ss a', 'en-IN').split('/')[1];
          let today = (new Date()) + " " + time;
          return today;
        }
        if (propertytype == "Header Color") {
          return '#0b4093';
        }
        if (propertytype == "Header Color1") {
          return 'white';
        }
        if (propertytype == "Header Alignment") {
          return 'center';
        }
        if (propertytype == "Header Fontsize") {
          return 7;
        }
        if (propertytype == "Cell Fontsize") {
          return 7;
        }
        if (propertytype == "Address Fontsize") {
          return 8;
        }
      }

    //   

    getKapilGroupLogo() {
        
        let img = "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";
        return img;
      }
}


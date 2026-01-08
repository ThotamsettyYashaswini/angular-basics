import { Component, OnInit, ViewChild, Input,Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { KYCDocumentsComponent } from 'src/app/UI/Common/kycdocuments/kycdocuments.component';
import { FIIndividualService } from 'src/app/Services/Loans/Transactions/fiindividual.service';
import { CompanyconfigService } from 'src/app/Services/Settings/companyconfig.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
declare const $: any;
@Component({
  selector: 'app-court-case-document-details',
  templateUrl: './court-case-document-details.component.html',
  styles: []
})
export class CourtCaseDocumentDetailsComponent implements OnInit {
  @ViewChild(KYCDocumentsComponent, { static: false }) kycDetails;
  @Input() lstApplicantsandothers = [];
  deletedrows:any;
  groupDetails: any;
  selectedIdProofType: any;
  kycDocumentType: any;
  kycDocumentName: any;
  pDid: any;
  kycFileName: any;
  kycFilePath: any;
  pDocFileType: any;
  imageResponse: any;
  uploadSuccess = false;
  pDoc: any;
  pDidd: any;
  pDocs: any;
  datafromprevioustabs: any;
  companyconfigdocumentsform: FormGroup;
  companyconfigdocumentvalidations: any = {};
  public gridData: any[] = [];
  layoutList: any = [];

  stylevarable: boolean=true;
  path: string;
  fileNameDocs: any = [];
  filepathDocs: any;
  filetypeDocs: any;
  fileName1Docs: any;
  filePathDataDocs: string;
  ViewImageDocs: string;
  existingDocList: any = [];
  caseDetailsList: any = [];
  datetimeimgpath: any;
  datetimeimg: any;
  fileuname: any;
  courtDocList:any = [
    {'pCourtDocumentId':1,'pCourtDocumentName':'Plaintiff'},
    {'pCourtDocumentId':2,'pCourtDocumentName':'Defendant'}
  ]
  constructor(private _commonService: CommonService, private fIIndividualService: FIIndividualService, private _companyconfigservice: CompanyconfigService, private _landbankservice: LandBankService,private http:HttpClient, private datePipe:DatePipe) { }



  ngOnInit() {
    debugger;
    let urldata = environment.apiURL;

    this.http.get(urldata).subscribe(res => {       
      let appspath = res[0]['ApiHostUrl'].split("/");
      this.path=appspath[0]+'//'+appspath[2]+'/Upload/';
      });
    this.deletedrows=[];
    this.getDocumentGroupNames();
    this._commonService._GetKYCUpdate().subscribe(data => {
      this.gridData = data;
      console.log(this.gridData)
    });

    this.companyconfigdocumentsform = this.companyconfigdocumentcontrols();
    this.BlurEventAllControll(this.companyconfigdocumentsform)

    this._landbankservice._GetLandpurchasedatatonextTab().subscribe(res => {
      debugger;
      this.datafromprevioustabs = res;
    });

    this.getDocmentDetails();

    this.getCaseDetails();

  }

  getDocmentDetails(){
    this.fIIndividualService.getDocumentNames(1).subscribe(response => {
      if (response.length != 0) {
        debugger
        this.kycDocumentType = response;
      }
      this.companyconfigdocumentsform['controls']['pDOCUMENTID'].value;

    });
  }

  companyconfigdocumentcontrols(): FormGroup {
    return new FormGroup({
      pCompanyId: new FormControl(0),
      pRecordId: new FormControl(0),
      pDOCUMENTID: new FormControl('', Validators.required),
      LayoutName: new FormControl(''),
      LayoutId: new FormControl('', Validators.required),
      pDOCUMENTGROUPID: new FormControl('1'),
      pDOCUMENTGROUPNAME: new FormControl(''),
      pDOCUMENTNAME: new FormControl(''),
      pDOCSTOREPATH: new FormControl(''),
      pDOCFILETYPE: new FormControl(''),
      pDocFileType: new FormControl(''),
      pDOCFILENAME: new FormControl(''),
      pDOCREFERENCENO: new FormControl(''),
      pDOCISDOWNLOADABLE: new FormControl('true'),
      ptypeofoperation: new FormControl('CREATE'),
      pcourtdocumenttype: new FormControl('CREATE')
    })
  }

  getDocumentGroupNames() {
    debugger
    this.fIIndividualService.getDocumentGroupNames().subscribe(json => {
      if (json != null) {
        this.groupDetails = json
      }

    })
  }
  getCaseDetails() {
    debugger
    this.fIIndividualService.getCaseDetails().subscribe(json => {
      if (json != null) {
        this.caseDetailsList = json
      }

    })
  }
  layoutnameChange(event){
    debugger;
    this.companyconfigdocumentsform['controls']['LayoutId'].setValue(event.plbcaseid);  
    this.getCaseDocDetails(event.plbcaseid);      
  }

  getCaseDocDetails(courtCaseId){
    this.fIIndividualService.GetcaseDocdetails(courtCaseId).subscribe(json => {
      this.existingDocList = json;
      console.log(this.existingDocList);      
    })
  }

  documentDelete(dataItem){
    debugger
    let createdby=this._commonService.pCreatedby;
    let pdocumentstoreid=dataItem.pdocumentstoreid;
    let ptypeofoperation='DELETE';
    let data = [{ 
      "pCreatedby":createdby,
      "documentstoreid": pdocumentstoreid, 
      "ptypeofoperation": ptypeofoperation,
      "typeid": dataItem.plandbankid,
      "propertytype": dataItem.ppropertytype
    }];
    let data1 = {
      "documentStoreDTO" : data
    }
    console.log(data1);    
    this.fIIndividualService.deleteCourtCaseDocumentDetails(data1).subscribe(res => {      
      this.getCaseDocDetails(dataItem.plandbankid);
      this._commonService.showInfoMessage('Document Deteted Successfully');
    });
    }

  removeHandler(event) {
    debugger;
    if(event.dataItem.ptypeofoperation=='UPDATE' || event.dataItem.ptypeofoperation=='OLD'){
      let deleterow:[]=event.dataItem;
      this.deletedrows=[...this.deletedrows,...deleterow];
      this.deletedrows=this.deletedrows.filter(row=>row.ptypeofoperation='DELETE');
    }
    this.gridData.splice(event.rowIndex, 1);
    this.gridData=[...this.gridData];
  }

  idProofType_Change($event: any): void {

    debugger;

    this.selectedIdProofType = $event.target.value;
    console.log(this.selectedIdProofType)
    const pDocumentId = $event.target.value;
    if (pDocumentId && pDocumentId != '') {
      const pDocumentGroup = $event.target.options[$event.target.selectedIndex].text;
      this.companyconfigdocumentsform['controls']['pDOCUMENTGROUPNAME'].setValue(pDocumentGroup);

     // this.pIdsProof_Change($event)
    }
    else {
      this.kycDocumentType = [];
      this.companyconfigdocumentsform['controls']['pDOCUMENTGROUPNAME'].setValue('');
    }

  }
  pIdsProof_Change($event: any) {
    debugger

    //const pDocumentId = $event.target.value;
    const pDocumentId = 1;
    // if (pDocumentId && pDocumentId != '') {
      const documentName = $event.target.options[$event.target.selectedIndex].text;
      this.pDoc = documentName;
      this.pDid = pDocumentId;
      this.kycDocumentType = [];
      this.companyconfigdocumentsform['controls']['pDOCUMENTID'].setValue('');
      this.companyconfigdocumentvalidations.pDOCUMENTID=null;
      this.fIIndividualService.getDocumentNames(pDocumentId).subscribe(response => {
        if (response.length != 0) {
          debugger
          this.kycDocumentType = response;
        }
        this.companyconfigdocumentsform['controls']['pDOCUMENTID'].value;

      });
    //}
    // else {
    //   this.kycDocumentName = [];
    //   this.companyconfigdocumentsform['controls']['pDOCUMENTID'].setValue('');
    //   this.companyconfigdocumentvalidations.pDOCUMENTID=null;

    // }
  }
  pIdProof_Change($event: any) {

    debugger
    for (let i = 0; i < this.gridData.length; i++) {

      if ((this.selectedIdProofType == Number(this.gridData[i].pDocumentGroupId)) && (Number(this.gridData[i].pDocumentId) == $event.target.value)) {
        this._commonService.showWarningMessage("Already existed");
        setTimeout(() => {
          this.companyconfigdocumentsform.controls['pDOCUMENTID'].setValue('');
          if (this.companyconfigdocumentsform.controls['pDOCUMENTNAME'].value) {
            this.companyconfigdocumentsform.controls['pDOCUMENTNAME'].setValue('');
          }
          this.companyconfigdocumentsform.controls['pDOCUMENTID'].setValue('');
          // this.kycDocumentForm.patchValue({
          //   pDocumentId: null
          // })
        }, 0);

        break;
      }

    }

    const pDocumentId = $event.target.value;
    console.log("pDocumentId : ", pDocumentId);

    if (pDocumentId && pDocumentId != '') {
      const documentName = $event.target.options[$event.target.selectedIndex].text;

      this.pDocs = documentName;

      this.companyconfigdocumentsform.controls.pDOCUMENTNAME.setValue(documentName);
      this.pDocs = documentName;

      this.fIIndividualService.getDocumentNames(1).subscribe(response => {
        if (response.length != 0) {
          debugger
          this.kycDocumentType = response;
        }
        this.companyconfigdocumentsform['controls']['pDOCUMENTID'].value;
        this.kycDocumentName = [];
      });
    }
    else {
      this.kycDocumentName = [];
      this.companyconfigdocumentsform['controls']['pDOCUMENTID'].setValue('');
    }

  }
  Datapassing(data) {
    this._commonService._SetKYCData(data)
  }
  
  addKycDocument() {

    debugger
    this.imageResponse = null;
    let isValid = true;
    if(this.kycFileName == undefined || this.kycFileName == ''){
      this._commonService.showWarningMessage('Upload Documents To Add');
      return
    }
    if (this.checkValidations(this.companyconfigdocumentsform, isValid)) {
      if (this.companyconfigdocumentsform.value.pDOCUMENTGROUPID ||
        this.companyconfigdocumentsform.value.pDOCUMENTID ||
        this.companyconfigdocumentsform.value.pDOCUMENTGROUPID) {


        this.companyconfigdocumentsform.controls.pDOCFILENAME.setValue(this.kycFileName);
        this.companyconfigdocumentsform.controls.pDOCSTOREPATH.setValue(this.kycFilePath);
        this.companyconfigdocumentsform.controls.pDocFileType.setValue(this.pDocFileType);
        this.companyconfigdocumentsform.controls.pDOCISDOWNLOADABLE.setValue(true);
        this.companyconfigdocumentsform.controls.ptypeofoperation.setValue("CREATE");
        let documentdata = [];
        documentdata = this.gridData.filter(data => {
          return data.pDOCUMENTNAME == "Sale Deed";
        })

        // if (documentdata.length == 0) {       

          this.gridData.push({ ...this.companyconfigdocumentsform.value, ...this.datafromprevioustabs });        

          console.log(this.gridData);
          this.companyconfigdocumentvalidations = {}
        //}
        // else {
        //   this._commonService.showWarningMessage('Id Proof already exists')

        // }
        this.getDocmentDetails();
        
        //this.companyconfigdocumentsform.reset()
        this.companyconfigdocumentcontrols()
        this.companyconfigdocumentvalidations = {}
        //  this.companyconfigdocumentsform
        this.Datapassing(this.gridData)
        // this.companyconfigdocumentsform.value.pDOCUMENTGROUPID.setValue(1);
        // this.companyconfigdocumentsform.value.pCompanyId.setValue(0);
        // this.companyconfigdocumentsform.value.pRecordId.setValue(0);

        this.companyconfigdocumentsform['controls']['pDOCUMENTID'].setValue('');
        this.companyconfigdocumentsform['controls']['pDOCREFERENCENO'].setValue('');
        this.companyconfigdocumentsform['controls']['pDOCSTOREPATH'].setValue('');


        this.companyconfigdocumentsform['controls']['pDOCUMENTGROUPID'].setValue(1);
        this.companyconfigdocumentsform['controls']['pCompanyId'].setValue(0);
        this.companyconfigdocumentsform['controls']['pRecordId'].setValue(0);

        this.companyconfigdocumentvalidations.pDOCUMENTID = '';

        //console.log(this.gridData);     
        this.selectedIdProofType = null;
        this.kycDocumentType = [];
        this.kycFileName = null;
        this.kycFilePath = null;
        $('#fileInput1').val(null);

        if (this.imageResponse) {
          this.imageResponse.name = '';
        }
        // }
      } else {
        if ($('#fileInput1').val()) {
          $('#fileInput1').val(null);
          if (this.imageResponse) {
            this.imageResponse.name = '';
          }
          this.kycFileName = null;
          this.kycFilePath = null;
        }
      }
    }




  }
  uploadAndProgress(event: any, files) {
debugger;

var extention = event.target.value.substring(event.target.value.lastIndexOf('.') + 1);
    if (extention.toLowerCase() != 'jpg' && extention.toLowerCase() != 'png' && extention.toLowerCase() != 'jpeg' && extention.toLowerCase() != 'pdf') {
      this._commonService.showWarningMessage("Upload jpg or pdf files");
      return
    }

    this.datetimeimgpath = '';
    this.datetimeimg = '';

    let file = event.target.files[0];
    this.fileuname = file.name


    if (event && file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.imageResponse = {
          name: file.name,
          fileType: "imageResponse",
          contentType: file.type,
          size: file.size,

        };
      };
    }
    let fname = "";
    if (files.length === 0) {
      return;
    }
    var size = 0;
    const formData = new FormData();
    let fileToUpload = <File>files[0];

    for (var i = 0; i < files.length; i++) {
      size += files[i].size;
      fname = files[i].name;

      let nameWithoutExt = fname.split('.').slice(0, -1).join('.');

      this.datetimeimg = this.datePipe.transform(new Date(), "ddMMyyyyhmmss") + '-' +
        'ttt' + '.' + extention;
      this.datetimeimgpath = this.datePipe.transform(new Date(), "ddMMyyyyhmmss") + '-' + 'ttt' + '.' + extention;

      this.datetimeimgpath =  fname + ' ' + this.datetimeimgpath;
      this.datetimeimg =  nameWithoutExt + ' ' + this.datetimeimg;

      formData.append('file', fileToUpload, this.datetimeimg);


      // formData.append(files[i].name, files[i]);
      // formData.append('NewFileName', this.companyconfigdocumentsform.value["pDOCUMENTNAME"] + '.' + files[i]["name"].split('.').pop());
    }
    size = size / 1024;
    console.log(formData);
    
    this._commonService.fileUpload(formData).subscribe(data => {

      this.kycFileName = data[1];
      if (this.imageResponse)
        this.imageResponse.name = this.fileuname;
      this.kycFilePath = data[0];
      this.pDocFileType = extention
    })
  }

  trackByFn(index, item) {
    return index; // or item.id
  }
  showErrorMessage(errormsg: string) {
    this._commonService.showErrorMessage(errormsg);
  }

  showInfoMessage(errormsg: string) {
    this._commonService.showInfoMessage(errormsg);
  }
  checkValidations(group: FormGroup, isValid: boolean): boolean {

    try {
      Object.keys(group.controls).forEach((key: string) => {
        isValid = this.GetValidationByControl(group, key, isValid);
      })
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }
  GetValidationByControl(formGroup: FormGroup, key: string, isValid: boolean): boolean {

    try {
      let formcontrol;
      formcontrol = formGroup.get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.companyconfigdocumentvalidations[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.companyconfigdocumentvalidations[key] += errormessage + ' ';
                isValid = false;
              }
            }
          }
        }
      }
    }
    catch (e) {
      //this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }


  BlurEventAllControll(fromgroup: FormGroup) {
    try {
      Object.keys(fromgroup.controls).forEach((key: string) => {
        this.setBlurEvent(fromgroup, key);
      })
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
  }
  setBlurEvent(fromgroup: FormGroup, key: string) {
    try {
      let formcontrol;
      formcontrol = fromgroup.get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          this.BlurEventAllControll(formcontrol)
        }
        else {
          if (formcontrol.validator)
            fromgroup.get(key).valueChanges.subscribe((data) => { this.GetValidationByControl(fromgroup, key, true) })
        }
      }
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
  }
  clear() {
    debugger
    this.gridData = []
    this.companyconfigdocumentsform.reset()
    this.companyconfigdocumentvalidations = {}
  }

  saveDocumentDetails(){
    debugger;

 let gridDataAddre =    this.gridData.map(obj => {
      obj.transactionno = this.companyconfigdocumentsform['controls']['LayoutId'].value;
      obj.typeid = this.companyconfigdocumentsform['controls']['LayoutId'].value;
      obj.propertytype = 'Land';
      obj.status = true;
      obj.pCreatedby = this._commonService.pCreatedby;
     
    
      return obj;
    });

    let data = {
      "documentStoreDTO" : gridDataAddre
    }
    let formData = JSON.stringify(data)
    console.log(data);
    console.log(formData);
    
    
    this.fIIndividualService.saveCourtCaseDocumentDetails(data).subscribe(res=>{
         if(res){
          this._commonService.showInfoMessage('Documents Saved Successfully');
          this.gridData = [];
          this.existingDocList = [];
          this.companyconfigdocumentsform['controls']['LayoutName'].setValue('');
         }
    })
  }

  ViewimgData(row){
    debugger;

    row.landdoclist
    this.fileNameDocs = [];
  
     this.fileNameDocs = row.landdetailslist;
    
   $('#ViewuploadVehicleDocs').modal('show');
   this.stylevarable = false;
  
  
  }

  close(){
    $('#ViewuploadVehicleDocs').modal('hide');
  }

  downloadimgData(data){
    debugger
    
  
      this.ViewImageDocs =this.path+ data.pdocumentfilename;
        if(data.pfiletype=='PDF'){
         window.open(this.ViewImageDocs);
       }
  
       else{
         let filepathDocs=this.ViewImageDocs;
         this._commonService.GetImage(filepathDocs).subscribe(res => {
           var a = document.createElement("a"); //Create <a>
          a.href = "data:image/png;base64," + res[0]; //Image Base64 Goes here
          a.download =data; //File name Here
          a.click(); //Downloaded file
         })
       }
   }
}

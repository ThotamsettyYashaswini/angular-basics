import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { ContactSelectComponent } from 'src/app/UI/Common/contact-select/contact-select.component';
import { CompanyconfigService } from 'src/app/Services/Settings/companyconfig.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-companyconfig-promotors',
  templateUrl: './companyconfig-promotors.component.html',
  styleUrls: ['./companyconfig-promotors.component.css']
})
export class CompanyconfigPromotorsComponent implements OnInit {

  @ViewChild(ContactSelectComponent, { static: false }) ContacttypeComp: ContactSelectComponent;
  @Input() SelectType: any;
  gridData: any = []
  contactselect: any = []
  deletedrows:any=[];
  lstCompanyContactDTO: any = []
  selectedContact: any;
  constructor(private _commonService: CommonService, private _companyconfigservice: CompanyconfigService) { }
  companyconfigpromotorsform = new FormGroup({
    pCompanyId: new FormControl(0),
    pRecordId: new FormControl(0),
    pContactId: new FormControl(''),
    ptypeofoperation: new FormControl('CREATE')

  })
  ngOnInit() {

  }
  GetContactPersonDataInFiOther(data) {

    debugger;
    this.selectedContact = data;

  }
  addDataToTable() {
    debugger;
    if (this.selectedContact != undefined) {
      console.log("this.selectedContact : ", this.selectedContact);

      if (this.selectedContact) {


        this.companyconfigpromotorsform.controls.pContactId.setValue(this.selectedContact.pContactId);
        this.companyconfigpromotorsform.controls.ptypeofoperation.setValue('CREATE')
        //console.log(this.companyconfigpromotorsform.controls.pContactId.value) 

        this.ContacttypeComp.refreshContactSelectComponent();
        let documentdata = [];
        documentdata = this.gridData.filter(data => {
          return data.pContactId == this.selectedContact.pContactId
        })


        if (documentdata.length == 0) {
          this.gridData.push(this.selectedContact)
          this.lstCompanyContactDTO.push(this.companyconfigpromotorsform.value)
        }
        else {
          this._commonService.showWarningMessage('Already Exists.')
        }
        this.ContacttypeComp.ShowImageCard = false;
        this.selectedContact = null
      }
      else if (this.selectedContact == undefined) {
        this.showWarningMessage('please select contact')
      }
    }


  }


  addData(selectedContact) {
    debugger;
    console.log("this.selectedContact : ", selectedContact);


    if (selectedContact) {
      for (let i = 0; i < selectedContact.length; i++) {
        this.companyconfigpromotorsform.controls.pCompanyId.setValue(selectedContact[i].pCompanyId)
        this.companyconfigpromotorsform.controls.pRecordId.setValue(selectedContact[i].pRecordId)
        this.companyconfigpromotorsform.controls.pContactId.setValue(selectedContact[i].pContactId)
        this.companyconfigpromotorsform.controls.ptypeofoperation.setValue('OLD')
        //console.log(this.companyconfigpromotorsform.controls.pContactId.value) 

        this.ContacttypeComp.refreshContactSelectComponent();
        let documentdata = [];
        documentdata = this.gridData.filter(data => {
          return data.pContactId == selectedContact.pContactId
        })
        if (documentdata.length == 0) {
          this.gridData.push(selectedContact[i])
          this.lstCompanyContactDTO.push(this.companyconfigpromotorsform.value)
        }
      }

    }

  }

  removeHandler(event) {
    debugger;
    if(event.dataItem.ptypeofoperation=='UPDATE'){
      let deletedrow:[]=event.dataItem;
      this.deletedrows=[...this.deletedrows,...deletedrow];
      this.deletedrows=this.deletedrows.filter(row=>row.ptypeofoperation="DELETE");
    }
    this.gridData.splice(event.rowIndex, 1);
    this.gridData=[...this.gridData];
        if(this.lstCompanyContactDTO.length>0){	
    this.lstCompanyContactDTO=this.lstCompanyContactDTO.filter(row=>row.pContactId!=event.dataItem.pContactId);	
    }
  }
  showWarningMessage(errormsg: string) {
    this._commonService.showWarningMessage(errormsg)
  }
  clear() {
    this.gridData = []
    this.companyconfigpromotorsform.reset()
  }
}

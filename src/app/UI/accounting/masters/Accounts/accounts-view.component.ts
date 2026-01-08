import { Component, ViewChild, OnInit } from '@angular/core';
import { ContextMenuComponent, FlatBindingDirective, } from '@progress/kendo-angular-menu';
import { Observable } from 'rxjs';

import { AccountingMastresService } from '../../../../Services/Accounting/accounting-mastres.service';
import { AccountsMasterComponent } from './accounts-master.component';
import { FormGroup, FormBuilder } from '@angular/forms'
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';




declare let $: any


@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styles: []
})


export class AccountsViewComponent implements OnInit {
   
  @ViewChild('treemenu', { static: false })
 
  public gridContextMenu: ContextMenuComponent;
  
 public loading = false;
  parrentId: number;
  accountid: number;
  parrentaccountname: string;
  accountname: string;
  formtype: string;
  chracctype: string;
  openingdate: string;
  haschild = true;
  index: string = "";
  AccounttreeForm: FormGroup;
  @ViewChild(AccountsMasterComponent, { static: false }) accountmaster: AccountsMasterComponent;
  constructor(private _Accountingmasterservice: AccountingMastresService, private formbuilder: FormBuilder) { }
  public Accounts: any[];
  public AccountsTreedata: any[];
  public parentdetails = [];
  public tempfilterdata = [];
  public keys: string[] = [];
  ngOnInit() {
    this.AccounttreeForm = this.formbuilder.group({
      pAccountsearch: [''],
      ExpandAndCollapse:['']
    })
    this.loading = true;
    
    this.GetaccountTreeDetails();
    this.AccounttreeForm.controls.ExpandAndCollapse.setValue('Expand'); 
  }
  public expandedKeys: any[]=[];
  public selectedKeys:any[]=['0'];

  //context menu click
  public onNodeClick(e: any): void {
    
    if (e.type === 'contextmenu') {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();
      this.contextItem = e.item.dataItem;
      this.accountid = this.contextItem.pAccountid;
      this.parrentId = this.contextItem.pParentId;
      this.accountname = this.contextItem.pAccountname;
      this.chracctype = this.contextItem.pChracctype;
      this.openingdate = this.contextItem.pOpeningdate;
      this.parrentaccountname = this.contextItem.pParrentAccountname;
      this.haschild = this.contextItem.pHaschild; 
      this.gridContextMenu.items = [{ text: 'Add Sibling', icon: 'add', value: "Sibling" }, { text: 'Add Child', icon: 'add', value: "Child" }];
      if (this.parrentId == null) {
        this.gridContextMenu.items = [{ text: 'Add Child', icon: 'add', value: "Child" }];
      }
      else if (this.haschild == false) {
       this.gridContextMenu.items = [{ text: 'Add Sibling', icon: 'add', value: "Sibling" }];
      }
      //if (this.parrentId == null) {
      //  this.gridContextMenu.items = [{ text: 'Add Child', icon: 'add', value: "Child" }];
      //}
      //if (this.parrentId != null) {
      //  this.gridContextMenu.items = [{ text: 'Add Sibling', icon: 'add', value: "Sibling" }, { text: 'Add Child', icon: 'add', value: "Child" }];
      //}
      //if (this.chracctype == '3') {
      //  this.gridContextMenu.items = [{ text: 'Add Sibling', icon: 'add', value: "Sibling" }];
      //}
      this.gridContextMenu.show({ left: originalEvent.pageX, top: originalEvent.pageY });
    
    }
  }
  //select context menu
  public onSelect({ item }): void {
    debugger;
    this.accountmaster.AccountMasterForm.reset();
    this.accountmaster.accountid = this.accountid;
    this.accountmaster.parrentId = this.parrentId;
    this.accountmaster.parrentaccountname = item.value == "Child" ? this.accountname : this.parrentaccountname;
    this.accountmaster.formtype = item.value;
    this.formtype = item.value;
    this.accountmaster.chracctype = this.chracctype;
    this.accountmaster.openingdate = this.openingdate;
    this.accountmaster.showPage = true;
    
    //if (this.chracctype == '1' && this.formtype == "Sibling") {
    //  this.accountmaster.showopeningbalance = false;
      
    //}
    //else {
    //  this.accountmaster.showopeningbalance = true;
    //}

   // // don't show opening balance on 1 type account
    this.accountmaster.showopeningbalance = (this.chracctype == '1' && this.formtype == "Sibling") ? false : true;

    //
    if (this.chracctype == '1' && this.formtype != "Sibling") {
      this.accountmaster.showacctype = true;
      
    }
    else {
      this.accountmaster.AccountMasterForm['controls']['pChracctype'].setValue(this.chracctype);
      this.accountmaster.showacctype = false;
    }
    this.accountmaster.submitted = false;
    this.accountmaster.AccountMasterForm['controls']['pOpeningdate'].setValue(this.openingdate);
    this.accountmaster.AccountMasterForm['controls']['pOpeningBalanceType'].setValue("DEBIT");
    let data = [];
    if (this.chracctype == '1') {
      data = this.AccountsTreedata.filter(
        itm => itm.pParentId === this.accountid && itm.pChracctype == 2);
    }
    let formcontrol;
    if (data.length > 0) {

      //formcontrol = <FormGroup>this.accountmaster.AccountMasterForm['controls']['pChracctype'];
      this.accountmaster.AccountMasterForm['controls']['pChracctype'].setValue('2');
      this.accountmaster.showaccledger = true;
      this.accountmaster.showaccgroup = false;

    }
    else {
      this.accountmaster.showaccledger = true;
      this.accountmaster.showaccgroup = true;
    }
    if (this.chracctype == '2' && this.formtype == "Child") {
      this.accountmaster.GetSubLedgerData(this.accountid);
      this.accountmaster.showsubledgergrid = true;
    }
    this.accountmaster.showsubledgergrid = (this.chracctype == '2' && this.formtype == "Child") ? true : false;
    this.accountmaster.loading = (this.chracctype == '2' && this.formtype == "Child") ? true : false;
    $('#add-detail').modal('show');
  }


  private contextItem: any;
  //get account tree details

  GetaccountTreeDetails(): void {
    

    this._Accountingmasterservice.GetAccountTreeDetails().subscribe(json => {
      
     // this.Accounts = json;
      this.AccountsTreedata = json;
      
      this.Accounts = this.AccountsTreedata.slice();
      let data = [];
      data = this.AccountsTreedata.filter(itm =>  itm.pParentId == null);
      let parentid = Array.from(new Set(data.map(x => x.pAccountname)))
      this.expandedKeys = parentid;
      //this.ExpandAll();
      this.loading = false;

    })

  }

  Refresh() {
    
    this.AccounttreeForm.controls.pAccountsearch.setValue('');
    this.GetaccountTreeDetails();
    //let inputvalue= this.AccounttreeForm.controls.pAccountsearch.value;
    //this.GetaccountTreeDetails();
    //if (!isNullOrEmptyString(inputvalue)) {
    //  this.SearchAccountLedger(inputvalue);
    //}

  }
 //Searching account Ledgers
  public SearchAccountLedger(inputvalue: string): void {
    
   
    this.Accounts = [];
     this.index = "";
    if (inputvalue != "") {
      this.expandedKeys.length = 0;
      this.search(this.AccountsTreedata, inputvalue);
      
      this.Accounts = this.parentdetails.sort(function (obj1, obj2) { return obj1.pRecordId - obj2.pRecordId }).slice();
      this.ExpandtreeView(this.Accounts);
      this.AccounttreeForm.controls.ExpandAndCollapse.setValue('Expand');
    }
    else {
      this.Accounts = this.AccountsTreedata;
      this.AccounttreeForm.controls.ExpandAndCollapse.setValue('Collapse');
      this.expandedKeys.length = 0;
    }
   
  }
  
  public searchTerm = '';
  public count = 1;
  public search(items: any[], term: string): any[] {
   
    this.parentdetails.length = 0;
    this.expandedKeys.length = 0;
    this.count = 1;
    return items.reduce((acc, item) => {
      if (this.contains(item.pAccountname, term)) {
       
        // this.parentdetails.push(item);

        this.parentdetails = this.parentdetails.concat(this.GetParentDetails(item, items).slice());
        this.tempfilterdata = [];
        this.count = 1;
      }
      
      return this.parentdetails;
    }, []);
  }

  public contains(text: string, term: string): boolean {
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
  }
  //Get Root Nodes of  accountLedger
  public GetParentDetails(itemdetails: any, items: any[]): any[] {
    if (this.count == 1) {
     
      this.tempfilterdata.push(itemdetails);
    }
  
    let Parentidexist = this.parentdetails.findIndex(elem => {
        return elem.pAccountid === itemdetails.pParentId
      });
   
    if (Parentidexist == -1) {
      let data = [];
      data = items.filter(
        itm => itm.pAccountid === itemdetails.pParentId && itemdetails.pParentId != null);
      if (data.length > 0) {
        this.tempfilterdata.push(data[0]);
     //   this.parentdetails.push(data[0]);

      }
    
      if (data.length > 0 && data[0].pParentId != null) {
        this.count = this.count + 1;
        this.GetParentDetails(data[0], items);
      }    
    }

    let filterdata = this.tempfilterdata.sort(function (obj1, obj2) { return obj1.pRecordId - obj2.pRecordId });

 
    return filterdata;
  }

 
  public ExpandtreeView(itemdata: any[]) {
    
   
    itemdata = itemdata.sort(function (obj1, obj2) { return obj1.pLevel - obj2.pLevel, obj1.pRecordId - obj2.pRecordId, obj1.pParentid - obj2.pParentid });
    let parentid = Array.from(new Set(itemdata.map(x => x.pAccountname)));
    this.expandedKeys = parentid;

  }
 
  ExpandAll() {
    let parentid = Array.from(new Set(this.AccountsTreedata.map(x => x.pAccountname)))
    this.expandedKeys = parentid;
  }

  ExpandAndCollapseAll(type: any) {
    
    if (type == "Expand") {
      let parentid = Array.from(new Set(this.AccountsTreedata.map(x => x.pAccountname)))
      this.expandedKeys = parentid;
    }
    if (type == "Collapse") {
      this.expandedKeys.length = 0;
    }
  }
}

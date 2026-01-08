import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ChargemasterService } from '../../../../Services/HomesInventory/chargemaster.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../Services/common.service'
import { MenuModulesService } from 'src/app/Services/Settings/menu-modules.service';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { JsonpClientBackend } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchconfigService } from '../../../../Services/Settings/branchconfig.service';
import { X } from '@angular/cdk/keycodes';
import { stringify } from 'querystring';
declare let $: any
@Component({
  selector: 'app-cadre-commission',
  templateUrl: './cadre-commission.component.html',
  styles: []
})
export class CadreCommissionComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  cadreForm: FormGroup;
  ModelForm: FormGroup;
  lstprojecttypes: any;
  commissionTypes: any;
  cadreNameTypes: any;
  addbutton: any;
  buttonsave = "save";
  cadreconfigurationDetails: any = [];
  alldeletedrows = [];
  lstcharges: any;
  projecttypeid: any;
  lstpermintnumber: any;
  showuomfield = false;
  cadreConnissionErrorMessage: any;
  lstUOMvalue: any;
  showchargetype = true;
  submitted = false;
  issubmitted = false;
  Modulesdata: any;
  public columns: Array<object>;
  rowindex: any;
  showInclude = true;
  showExclude = false;
  disablesavebutton = false;
  disabletype = false;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public rows = [];
  public selected = [];
  pcomrelid: number;
  public temp: any;
  cadreCommissiondetails = [];
  // newcadres:any
  // SAMPLE
  modalid: any;
  modalname: any;
  SubModulesdata: any;
  ModuleForm: FormGroup;
  IsCapsWarning: Boolean;
  CadreNameForm: FormGroup;

  cadrenamebid: any;
  cadreforname: any;
  Cadredata: any;

  gridolddatastatus = false;

  cadreDetails: any;
  buttonnameedit: any
  public cadreCommissionDetails: any = [];
  public viewData: any;
  public GetCadreCommissionConfigData: any = [];


  constructor(private formBuilder: FormBuilder, private _commonService: CommonService, private _MenuModulesService: MenuModulesService,
    private toastr: ToastrService, private _ChargemasterService: ChargemasterService,
    private _routes: Router, private _branchconfigService: BranchconfigService, private ActRoute: ActivatedRoute) { }

  ngOnInit() {
    this.showuomfield = false;
    this.cadreConnissionErrorMessage = {};
    this.disabletype = false;
    this.Bindprojecttypes();
    this.BindUOMNames();
    this.BindCommissionReleaseType();
    this.BindCadreNames();
    this.GetallNames();
    this.submitted = false;
    this.addbutton = "Add";
    this.buttonsave = "Save";
    this.columns = [];
    this.cadreDetails = [];
    this.rowindex = '';
    this.showInclude;
    this.showExclude = false;
    this.cadreForm = this.formBuilder.group({
      itemtype: [''],
      pitemtypeid: ['', Validators.required],
      projectname: [''],
      pprojectid: [''],
      // itemtypeid: ['', Validators.required],
      projectidfirst: ['', Validators.required],
      permitno: [''],
      piscadreapplicableonuom: [false],
      punitofmeasureid: [0],
      cadredependancetype: ['Value'],
      primarylandareauom: ['0'],
      primarylandareauomname: [''],
      pcadrevaluefixedpercentage: ['Fixed'],
      pcadrevalue: ['', Validators.required],
      pcadretotalvalue: ['', Validators.required],
      prel_particulars: '',
      pcadre_order_id: ['', Validators.required],
      pcomrelid: ['', Validators.required],
      pcadreid: ['', Validators.required],
      pcadrename: [''],
      pcadreconfigid: [0],
      pStatusname: [this._commonService.pStatusname],
      pCreatedby: [this._commonService.pCreatedby],
      ptypeofoperation: ['CREATE'],
      status: ['TRUE'],
      pEffectfromdate: [null],
      pEffecttodate: [null],
    });

    // this.cadreForm.controls.pitemtypeid.valueChanges.subscribe((x => {
    //   this.cadreForm.controls.pitemtypeid.patchValue({pitemtypeid: +(x)})
    // }));





    this.CadreNameForm = this.formBuilder.group({
      pcadrename: ['', Validators.required,],
      pCreatedby: ['']
    })


    this.ModelForm = this.formBuilder.group({
      pModulename: ['', Validators.required],
      pCreatedby: ['']
    });

    this.cadreForm.controls.primarylandareauom.setValidators(null);
    this.cadreForm.controls.primarylandareauom.updateValueAndValidity();
    // let newcadres = Number(this.cadreForm.controls.pcadreid.value)
    debugger



    if (this.ActRoute.snapshot.params['id']) {
      debugger
      this.viewData = atob(this.ActRoute.snapshot.params['id']);
      this.geteditdATA(this.viewData);
    }

  }


  Bindprojecttypes() {
    debugger;
    this._ChargemasterService.getprojecttypes().subscribe(data => {
      debugger;
      this.lstprojecttypes = data;
    })
  }

  BindUOMNames() {
    debugger;
    let requestfrom = 'plots_CADRE';
    this._ChargemasterService.GetUnitofMeasureDetails(requestfrom).subscribe(data => {
      this.lstUOMvalue = data;
    }, error => {
      this.toastr.error(error, 'error')
    })
  }



  BindCommissionReleaseType() {
    this._ChargemasterService.getCommissionReleaseType().subscribe(data => {
      this.commissionTypes = data;
    })
  }

  releasetype_Change(event: any): void {
    debugger;
    if (event.target.value != '') {
      this.cadreForm.controls.prel_particulars.setValue(event.target.options[event.target.selectedIndex].text);
      this.cadreForm.controls.pcadreid.setValue(Number(event.target.value));
    }
  }

  BindCadreNames() {
    debugger
    this._ChargemasterService.getCadres().subscribe(data => {
      // alert(JSON.stringify(data))
      console.log(data);

      debugger
      this.cadreNameTypes = data;
    })
  }



  permitno_Change(event) {
    debugger
    if (event != null && event != null) {
      this.addbutton = "Add";
      this.ClearFields();
      this.cadreconfigurationDetails = [];
      this.alldeletedrows = [];
      let pitemtypeid = parseInt(event.itemtypeid);
      let pprojectid = parseInt(event.projectid);
      this.cadreForm.controls.pprojectid.setValue(Number(event.projectid));
      //this.getCadreDetails(pitemtypeid,pprojectid)
    }
  }
  getCadreDetails(pitemtypeid, pprojectid) {
    debugger;
    this.cadreconfigurationDetails = [];
    this._ChargemasterService.getCadreDetailsView(pitemtypeid, pprojectid).subscribe(data => {
      debugger;
      if (data != null) {
        this.cadreconfigurationDetails = data;
        if (this.cadreconfigurationDetails.length > 0) {
          this.cadreForm.controls.pcadretotalvalue.setValue(this._commonService.currencyformat(this.cadreconfigurationDetails[0].pcadretotalvalue));
          this.cadreForm.controls.pcadrevaluefixedpercentage.setValue(this.cadreconfigurationDetails[0].pcadrevaluefixedpercentage);
          this.disabletype = true;
          let type = this.cadreconfigurationDetails[0].pcadrevaluefixedpercentage;
          if (type.toUpperCase() == 'PERCENTAGE') {
            this.showchargetype = false;
          } else {
            this.showchargetype = true;
          }
        }
        else {
          this.cadreForm.controls.pcadretotalvalue.setValue('');
          this.cadreForm.controls.pcadrevaluefixedpercentage.setValue('');
          this.disabletype = false;
          this.showchargetype = true;
        }
        console.log("Cadre Commission", this.cadreCommissiondetails)
      }
    })
  }
  pprojecttype_Change($event: any) {
    debugger;
    this.addbutton = "Add";
    this.cadreForm.patchValue(
      {
        pprojectid: '',
        projectidfirst: '',
        projectname: '',
      })
    this.ClearFields();
    this.cadreconfigurationDetails = [];
    this.alldeletedrows = [];
    this.lstcharges = [];
    if ($event.target.value != '') {
      //this.Newrowstatus=true;
      this.GetProjectdetailsbyid($event.target.options[$event.target.selectedIndex].text);
    }

  }
  GetProjectdetailsbyid(id) {
    this.cadreForm.controls.itemtype.setValue(id);
    let pitemtypeid = parseInt(this.cadreForm.controls.pitemtypeid.value);
    this.projecttypeid = pitemtypeid;
    this.lstpermintnumber = [];
    this._ChargemasterService.GetProjectdetailsbyid(pitemtypeid).subscribe(data => {
      debugger;
      if (data != null) {
        this.lstpermintnumber = data;

      }
    })
  }
  UOMvalue_change(event) {
    debugger;
    if (event.target.value != '') {

      this.cadreForm.controls.primarylandareauomname.setValue(event.target.options[event.target.selectedIndex].text);
      this.cadreForm.controls.punitofmeasureid.setValue(event.target.options[event.target.selectedIndex].value);


    }
    this.GetValidationByControl(this.cadreForm, 'primarylandareauom', true)
  }

  pcadrevaluechange() {
    debugger;
    this.showuomfield = false;
    this.cadreForm.controls.primarylandareauom.setValue('');
    this.cadreForm.controls.primarylandareauomname.setValue('');
    this.cadreForm.controls.punitofmeasureid.setValue('0');
    this.cadreForm.controls.piscadreapplicableonuom.setValue(false);
    this.cadreForm.controls.primarylandareauom.setValidators(null);
    this.cadreForm.controls.primarylandareauom.updateValueAndValidity();
  }

  chargeUOMchange() {
    debugger;
    this.showuomfield = true;
    this.cadreForm.controls.primarylandareauom.setValue('');
    this.cadreForm.controls.primarylandareauomname.setValue('');
    this.cadreForm.controls.punitofmeasureid.setValue('0');
    this.cadreConnissionErrorMessage.primarylandareauom = null;
    this.cadreForm.controls.piscadreapplicableonuom.setValue(true);
    this.cadreForm.controls.primarylandareauom.setValidators([Validators.required]);
    this.cadreForm.controls.primarylandareauom.updateValueAndValidity()
  }

  pcharge_Change(event: any): void {
    debugger;
    if (event.target.value != '') {
      this.cadreForm.controls.releaseName.setValue(event.target.options[event.target.selectedIndex].text);
    }
  }

  fixedchargetype() {
    debugger;
    this.showchargetype = true;
    this.cadreForm.controls.pcadretotalvalue.setValue('');
    this.cadreConnissionErrorMessage.pcadretotalvalue = null;
  }

  percentagechargetype() {
    debugger;
    this.showchargetype = false;
    this.cadreForm.controls.pcadretotalvalue.setValue('');
    this.cadreConnissionErrorMessage.pcadretotalvalue = null;
  }


  ClearFields() {

    let pcadrevaluefixedpercentage = this.cadreForm.controls.pcadrevaluefixedpercentage.value;
    let cadretotalvalue;
    if (this.cadreForm.controls.pcadretotalvalue.value != null && this.cadreForm.controls.pcadretotalvalue.value != "" && this.cadreForm.controls.pcadretotalvalue.value != 0) {
      cadretotalvalue = this._commonService.removeCommasForEntredNumber(this.cadreForm.controls.pcadretotalvalue.value);
    }
    else {
      cadretotalvalue = 0;
    }
    this.cadreForm.patchValue(
      {
        piscadreapplicableonuom: false,
        punitofmeasureid: '0',
        chargetypeid: '',
        chargesconfigid: '0',
        primarylandareauom: '0',
        primarylandareauomname: '',
        cadredependancetype: 'Value',
        pcadrevalue: '',
        releaseName: '',
        pcadre_order_id: '',
        pcomrelid: '',
        pcadrename: '',
        pcadreid: '',
        pcadrevaluefixedpercentage: pcadrevaluefixedpercentage,
        pEffectfromdate: '',
        pEffecttodate: '',
        priority: '',
        ptypeofoperation: 'CREATE',
        status: 'TRUE',
        pcadretotalvalue: cadretotalvalue > 0 ? this._commonService.currencyformat(cadretotalvalue) : cadretotalvalue,
        pCreatedby: this._commonService.pCreatedby,
      }
    )
    this.cadreConnissionErrorMessage = {};
    this.showuomfield = false;
    // this.table.offset = 0;
  }

  ClearCadreCommission() {
    debugger;
    this.cadreconfigurationDetails = [];
    this.alldeletedrows = [];
    this.ClearFields();
    this.cadreForm.patchValue({
      itemtype: '',
      pitemtypeid: '',
      projectname: '',
      pprojectid: '',
      projectidfirst: '',
      permitno: ''
    })
    this.cadreForm.controls.pcadrevaluefixedpercentage.setValue('Fixed');
    this.cadreForm.controls.pcadretotalvalue.setValue('');
    this.columns = [];
    this.rowindex = '';
    this.projecttypeid = 0;
    this.showuomfield = false;
    this.showInclude = true;
    this.showExclude = false;
    this.addbutton = "Add";
    this.showchargetype = true;
    this.buttonsave = "Save";
    this.disablesavebutton = false;
    this.cadreconfigurationDetails = [];
    this.alldeletedrows = [];
    this.lstpermintnumber = [];

    this.cadreDetails = [];

    this.table.offset = 0;
    this.cadreConnissionErrorMessage = {};
    this.disabletype = false;
    this.cadreForm.controls.primarylandareauom.setValidators(null);
    this.cadreForm.controls.primarylandareauom.updateValueAndValidity();
    this.Bindprojecttypes();
    this.BindUOMNames();

  }


  // FOR CADRE NAME BINDING WITH MODAL

  SelectCadreName(cNamedata: any) {
    this.cadrenamebid = cNamedata.target.value;
    this.cadreforname = cNamedata.target.options[cNamedata.target.selectedIndex].text;
    this.cadreForm.controls.pcadrename.setValue(cNamedata.target.options[cNamedata.target.selectedIndex].text);
  }




  GetallNames() {

    this._ChargemasterService.getCadres().subscribe(data => {
      this.Cadredata = data;
    });
  }



  ModelCadreNameSave() {
    this.issubmitted = true;
    if (this.CadreNameForm.valid) {
      this.CadreNameForm.controls.pCreatedby.setValue(this._commonService.pCreatedby);
      var data = JSON.stringify(this.CadreNameForm.value);
      let CadreNameTitle = this.CadreNameForm.value.pcadrename;
      this._ChargemasterService.checkDuplicateCadre(CadreNameTitle).subscribe(count => {
        if (count) {
          this.toastr.info("Cadre name already exist", "Info");
          this.CadreNameForm.reset();

          // $('#add-detail').modal('hide');
          // this.toastr.error("Module Name Already Exist", "Exist");
        }
        else {

          this._ChargemasterService.saveCadre(data).subscribe(res => {
            this.GetallNames();
            this.toastr.success("New Cadre Name Saved Successfully", "Success");
            $('#add-detail').modal('hide');
          });

        }

      });
    }


  }


  Clear() {
    this.submitted = false;
    this.issubmitted = false;
    this.CadreNameForm.reset();
  }



  CadreNameTitle(event) {
    if (event.getModifierState("CapsLock")) {
      this.IsCapsWarning = true
    } else {
      this.IsCapsWarning = false
    }
  }



  OpenModel() {
    this.submitted = false;
    this.issubmitted = false;
    this.CadreNameForm.reset();
    $('#add-detail').modal('show');
  }

  CloseModel() {
    this.CadreNameForm.reset()
    $('#add-detail').modal('hide');
    $('#add-submodule').modal('hide');
  }


  SaveCadreCommissions() {
    debugger;
    if (this.cadreconfigurationDetails != null && this.cadreconfigurationDetails != [] && this.cadreconfigurationDetails.length > 0) {
      // if(this.alldeletedrows.length>0){
      //     if(this.cadreCommissiondetails.length>0){
      //    this.cadreCommissiondetails=[...this.cadreCommissiondetails,...this.alldeletedrows];
      //     }else{
      //         this.cadreCommissiondetails= this.alldeletedrows;
      //     }

      // }
      // this.cadreconfigurationDetails=this.cadreconfigurationDetails.filter(function(row){
      //     row.pitemtypeid=Number(row.pitemtypeid);
      //     row.punitofmeasureid=Number(row.punitofmeasureid);
      //     row.primarylandareauom=Number(row.primarylandareauom);
      //     row.pcadre_order_id=Number(row.pcadre_order_id);
      //     row.pcomrelid=Number(row.pcomrelid);
      //     row.pcadreid=Number(row.pcadreid);

      // })
      let totgridvalue = 0;
      let pcadretotalvalue = 0;
      pcadretotalvalue = this._commonService.removeCommasForEntredNumber(this.cadreForm.controls.pcadretotalvalue.value);
      totgridvalue = this.cadreconfigurationDetails.reduce((sum, c) => sum + c.pcadrevalue, 0);

      if (totgridvalue != pcadretotalvalue) {
        this._commonService.showWarningMessage('Total Cadre Value must be equal to ' + pcadretotalvalue);
        return;
      }
      let newdata = this.cadreconfigurationDetails;

      //  this.cadreForm.setValue(this.newcadres)

      let cadresCommissionConfigurationDTO = { cadresCommissionConfigurationDTO: newdata }
      let formdata = Object.assign(cadresCommissionConfigurationDTO)
      this.buttonsave = "Processing";
      this.disablesavebutton = true;
      let newdataresult = JSON.stringify(formdata);
      console.log("savedata", newdataresult);
      this._ChargemasterService.saveCadreCommission(JSON.stringify(formdata)).subscribe(data => {


        // +this.cadreForm.get('pitemtypeid').value

        if (data) {
          //  alert(JSON.stringify(formdata))
          console.log(JSON.stringify(formdata));
          this._commonService.showInfoMessage('Saved Successfully.');
          this.ClearCadreCommission();

          this._routes.navigate(['/CadreCommissionView',]);
        }
      }, error => {
        this.toastr.error(error, 'error');
        this.buttonsave = "Save";
        //  this.table.offset = 0;
        this.disablesavebutton = false;

      })
    }
    else {
      if (this.addbutton == "Save") {
        this._commonService.showWarningMessage('Add One Item to Grid');
      }
    }

    if (this.buttonsave == "UPDATE") {
      debugger
      this.updateCadreCommissionValue();

    }
  }




  addCadreCommissionToGrid() {
    debugger;

    let isValid: boolean = true;
    this.gridolddatastatus = false;

    if (this.checkValidations(this.cadreForm, isValid)) {
      debugger;
      let pcadrevalue = this.cadreForm['controls']['pcadrevalue'].value;
      pcadrevalue = parseFloat(pcadrevalue.toString().replace(/,/g, ""));
      if (pcadrevalue <= 0) {
        this.cadreForm['controls']['pcadrevalue'].setValue('');
        this._commonService.showWarningMessage('Charge Value Must be Greater Than Zero.');
        return;
      }
      if (this.cadreconfigurationDetails.length > 0) {
        let type = this.cadreconfigurationDetails[0].pcadrevaluefixedpercentage;
        if (type.toUpperCase() != (this.cadreForm.controls.pcadrevaluefixedpercentage.value).toUpperCase()) {
          this._commonService.showWarningMessage('Value type must be Same.');
          this.cadreForm.controls.pcadrevaluefixedpercentage.setValue(type);
          if (type.toUpperCase() == 'PERCENTAGE') {
            this.showchargetype = false;
          } else {
            this.showchargetype = true;
          }
          return;
        }
      }
      let totgridvalue = 0;
      let pcadretotalvalue = 0;
      let singlecadrevalue = 0;

      pcadretotalvalue = this._commonService.removeCommasForEntredNumber(this.cadreForm.controls.pcadretotalvalue.value);
      singlecadrevalue = this.cadreForm.controls.pcadrevalue.value;
      totgridvalue = this.cadreconfigurationDetails.reduce((sum, c) => sum + c.pcadrevalue, 0);
      let finalvalue = Number(totgridvalue) + Number(singlecadrevalue);
      if (finalvalue > pcadretotalvalue) {
        this._commonService.showWarningMessage('Total Cadre Value must be equal to ' + pcadretotalvalue);
        this.cadreForm['controls']['pcadrevalue'].setValue('');
        return;
      }
      // else{
      //   totgridvalue = this.cadreconfigurationDetails.reduce((sum, c) => sum + c.pcadrevalue, 0);
      //   totgridvalue=totgridvalue+pcadrevalue;
      //   if(Number(totgridvalue)>25){
      //     this._commonService.showWarningMessage('Total Cadre Value must be equal to' + pcadretotalvalue);
      //     this.cadreForm['controls']['pcadrevalue'].setValue('');
      //      return;
      //   }
      // }

      this.cadreForm['controls']['pcadrevalue'].setValue(pcadrevalue);

      //   if(this.addbutton=="Update"){
      //   this.UpdateRow();
      //   return;pcadreid:['',Validators.required]
      // }
      // this.cadreDetails=this.cadreconfigurationDetails.filter(row=>row.chargename== this.cadreForm.controls.chargename.value );
      // this.cadreDetails=this.cadreconfigurationDetails.filter(row=>row.pcadreid== this.cadreForm.controls.pcadreid.value );

      if (this.cadreconfigurationDetails.length != 0) {
        for (var i = 0; i < this.cadreconfigurationDetails.length; i++) {
          if ((this.cadreconfigurationDetails[i].pcadrename == this.cadreForm.controls.pcadrename.value)) {
            this._commonService.showWarningMessage('Cadre Name Already Exists. ');
            return;
          }

          if (this.cadreconfigurationDetails[i].pcadrename == this.cadreForm.controls.pcadrename.value) {
            this._commonService.showWarningMessage('Already Exists. ');
            // this.cadreForm.controls.pEffectfromdate.reset();
            this.gridolddatastatus = true;
          }

        }

      }

      // this.gridolddatastatus != true

      if (this.buttonsave == 'Save') {


        if (this.gridolddatastatus == false) {
          debugger;
          this.cadreForm.controls.pitemtypeid.setValue(Number(this.cadreForm.controls.pitemtypeid.value));
          this.cadreForm.controls.punitofmeasureid.setValue(Number(this.cadreForm.controls.punitofmeasureid.value));
          this.cadreForm.controls.primarylandareauom.setValue(Number(this.cadreForm.controls.primarylandareauom.value));
          this.cadreForm.controls.pcadre_order_id.setValue(Number(this.cadreForm.controls.pcadre_order_id.value));
          this.cadreForm.controls.pcomrelid.setValue(Number(this.cadreForm.controls.pcomrelid.value));
          this.cadreForm.controls.pcadreid.setValue(Number(this.cadreForm.controls.pcadreid.value));

          this.cadreconfigurationDetails = [...this.cadreconfigurationDetails, ...this.cadreForm.value];
          let olditemid = this.cadreForm.controls.pitemtypeid.value;
          this.cadreForm.controls.primarylandareauom.setValidators(null);
          this.cadreForm.controls.primarylandareauom.updateValueAndValidity();
          this.ClearFields();
          this.columns = [];
          this.rowindex = '';
          this.projecttypeid = 0;
          this.showuomfield = false;
          this.showInclude = true;
          this.showExclude = false;
          this.addbutton = "Add";
          this.disabletype = true;
          this.buttonsave = "Save";
          this.cadreForm.controls.pitemtypeid.setValue(olditemid);
        }



      }

      //   if(this.buttonsave == 'UPDATE'){


      //     if (this.gridolddatastatus == false) {
      //         debugger;
      //         this.cadreForm.controls.pitemtypeid.setValue(Number(this.cadreForm.controls.pitemtypeid.value));
      //         this.cadreForm.controls.punitofmeasureid.setValue(Number(this.cadreForm.controls.punitofmeasureid.value));
      //         this.cadreForm.controls.primarylandareauom.setValue(Number(this.cadreForm.controls.primarylandareauom.value));
      //         this.cadreForm.controls.pcadre_order_id.setValue(Number(this.cadreForm.controls.pcadre_order_id.value));
      //         this.cadreForm.controls.pcomrelid.setValue(Number(this.cadreForm.controls.pcomrelid.value));
      //         this.cadreForm.controls.pcadreid.setValue(Number(this.cadreForm.controls.pcadreid.value));

      //         this.cadreconfigurationDetails = [...this.cadreconfigurationDetails, ...this.cadreForm.value];
      //         let olditemid=this.cadreForm.controls.pitemtypeid.value;
      //          this.cadreForm.controls.primarylandareauom.setValidators(null);
      //          this.cadreForm.controls.primarylandareauom.updateValueAndValidity();
      //          this.ClearFields();
      //           this.columns=[];
      // this.rowindex='';
      // this.projecttypeid=0;
      // this.showuomfield = false;
      // this.showInclude = true;
      // this.showExclude = false;
      // this.addbutton="Add";
      // this.disabletype=true;
      // this.buttonsave = "UPDATE";
      // this.cadreForm.controls.pitemtypeid.setValue(olditemid);
      //        }



      // }
    }
  }



  geteditdATA(id) {
    debugger
    this.buttonsave = "UPDATE";
    this._ChargemasterService.GetCadreCommissionConfigById(id).subscribe(data => {
      this.GetCadreCommissionConfigData = data;
      console.log('23-05-2023xxxx', this.GetCadreCommissionConfigData);
      this.cadreForm.controls.pitemtypeid.setValue(this.GetCadreCommissionConfigData[0]['pitemtypeid']);
      this.GetProjectdetailsbyid(this.GetCadreCommissionConfigData[0]['pitemtypeid']);
      this.cadreForm.controls.projectidfirst.setValue(this.GetCadreCommissionConfigData[0]['pprojectid']);
      //  this.cadreForm.controls.cadredependancetype.setValue(this.GetCadreCommissionConfigData[0]['piscadreapplicableonuom'])
      //  this.cadreForm.controls.primarylandareauom.setValue(this.GetCadreCommissionConfigData[0]['punitofmeasureid'])
      this.cadreForm.controls.pcadrevaluefixedpercentage.setValue(this.GetCadreCommissionConfigData[0]['pcadrevaluefixedpercentage']);
      this.cadreForm.controls.pcadretotalvalue.setValue(this.GetCadreCommissionConfigData[0]['ptotalcadrevalue']);
      this.cadreForm.controls.pcadreid.setValue(this.GetCadreCommissionConfigData[0]['pcadreid']);
      this.cadreForm.controls.pcomrelid.setValue(this.GetCadreCommissionConfigData[0]['pcomrelid']);
      this.cadreForm.controls.primarylandareauom.setValue(this.GetCadreCommissionConfigData[0]['piscadreapplicableonuom']);
      this.cadreForm.controls.primarylandareauom.setValue(this.GetCadreCommissionConfigData[0]['punitofmeasure_name']);
      this.cadreForm.controls.pcadre_order_id.setValue(this.GetCadreCommissionConfigData[0]['pcadre_order_id']);
      this.cadreForm.controls.pcadrevalue.setValue(this.GetCadreCommissionConfigData[0]['pcadrevalue']);
      if (this.GetCadreCommissionConfigData[0]['ptypeofoperation'] == 'UPDATE' || this.GetCadreCommissionConfigData[0]['ptypeofoperation'] == 'OLD') {
        this.cadreForm.controls.ptypeofoperation.setValue('UPDATE');
      }
      else {
        this.cadreForm.controls.ptypeofoperation.setValue('CREATE');
      }
      console.log('24-05-2023yyyyyyyyyyy', this.GetCadreCommissionConfigData);

    })

    $("#projectname").prop("disabled", true);
    this.cadreForm.controls['projectidfirst'].disable();
    $("#release").prop("disabled", true);
    $("#cadreid").prop("disabled", true);
    $("#cadre_order_id").prop("disabled", true);
    this.cadreForm.controls['pcadrevaluefixedpercentage'].disable();
    this.cadreForm.controls['pcadretotalvalue'].disable();

  }


  updateCadreCommissionValue() {
    debugger;
    let abc = this.cadreForm.value;
    let totgridvalue = 0;
      let pcadretotalvalue = 0;
      let singlecadrevalue = 0;

      pcadretotalvalue = this._commonService.removeCommasForEntredNumber(this.cadreForm.controls.pcadretotalvalue.value);
      singlecadrevalue = this.cadreForm.controls.pcadrevalue.value;
      totgridvalue = this.cadreconfigurationDetails.reduce((sum, c) => sum + c.pcadrevalue, 0);
      let finalvalue = Number(totgridvalue) + Number(singlecadrevalue);
      if (finalvalue > pcadretotalvalue) {
        this._commonService.showWarningMessage('Total Cadre Value must be equal to ' + pcadretotalvalue);
        this.cadreForm['controls']['pcadrevalue'].setValue('');
        return;
      }
    this._ChargemasterService.updateCadreCommConfiguration(this.viewData,this.cadreForm.controls.pcadrevalue.value).subscribe(res => {
      console.log(res);
      
      this._commonService.showInfoMessage('Updated Successfully.');
      this._routes.navigate(['/CadreCommissionView']);

    })

  }


  showErrorMessage(errormsg: string) {
    this._commonService.showErrorMessage(errormsg);
  }

  showInfoMessage(errormsg: string) {
    this._commonService.showInfoMessage(errormsg);
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

  trackByFn(index, item) {
    return index; // or item.id
  }




  checkValidations(group: FormGroup, isValid: boolean): boolean {

    try {

      Object.keys(group.controls).forEach((key: string) => {

        isValid = this.GetValidationByControl(group, key, isValid);
      })

    }
    catch (e) {
      //this.showErrorMessage(e);
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
          this.cadreConnissionErrorMessage[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;

            //if (key == 'pTitleName')
            //  lablename = 'Title';

            //else
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.cadreConnissionErrorMessage[key] += errormessage + ' ';
                isValid = false;
              }
            }

          }
        }
      }
    }
    catch (e) {
      this.showErrorMessage(key);

      return false;
    }
    return isValid;
  }




}

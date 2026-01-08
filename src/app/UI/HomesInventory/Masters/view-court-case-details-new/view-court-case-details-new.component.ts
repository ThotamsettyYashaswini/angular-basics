import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { State, process } from '@progress/kendo-data-query';
import { CommonService } from 'src/app/Services/common.service';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view-court-case-details-new',
  templateUrl: './view-court-case-details-new.component.html',
  styles: []
})

export class ViewCourtCaseDetailsNewComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild(GridComponent, { static: false }) grid: GridComponent;

  courtCaseData: any = [];
  public pageSize = 10;

  public gridState: State = {
    sort: [],
    take: 10
  };
  public headerCells: any = {
    textAlign: 'center'
  };
  gridData: any = [];
  getRegion: any = [];
  runningCourtForm: FormGroup;
  region: any;
  constructor(private _plotcreationservices: PlotcreationService, private commonservice: CommonService,
    private router: Router, private datepipe: DatePipe, private fb: FormBuilder) {
    this.allData = this.allData.bind(this);
  }

  ngOnInit() {
    debugger;
    this.viewCourtCaseDetails();
    this.getSectors();

    this.runningCourtForm = this.fb.group({
      region: [''],
    })
  }

  regionChange(event) {
    debugger;
    this.region = event.psector
    this.viewCourtCaseDetails();
  }

  viewCourtCaseDetails() {
    debugger;
    this._plotcreationservices.getCourtCasesReport('', this.region).subscribe(result => {
      this.gridData = result;
      this.courtCaseData = this.gridData;
      this.expandAllRows();

      //this.courtCaseData = result;
    })
  }
  expandAllRows() {
    this.courtCaseData.forEach((item, index) => {
      this.grid.expandRow(index); // Expands each row based on its index
    });
  }

  getSectors() {
    debugger
    this._plotcreationservices.getSectors().subscribe(result => {
      //this.getRegion = json;
      let json: any = [];
      json = result;
      let testArray = [{ psectorid: 0, psector: "ALL" }];
      this.getRegion = [...testArray, ...json];

    })
  }


  pdfOrprint(printorpdf) {
    debugger;
    let Designation;
    if (this.courtCaseData.length > 0) {
      let rows = [];
      let reportname = "Running Court Case Details";
      let gridheaders = [
        ['S.No', 'Hearing Status', 'Plaintiff/ Appealant', 'Defendant/Respondant', 'Court Name', 'Case No.', 'Filing Date', 'Suit Extent', 'Advocate Name', 'Contact No.', 'Mail-ID', 'Next Hearing Date',],
        [
          { content: '', colSpan: 11 },
        ],
        ['', '','Status', 'Case Pursuing By', 'Represented in\n Document by', 'Related Site/\n Venture', 'Related Documents', 'Situated At', 'Survey Nos.', 'Purchase Through', 'Type of Case and\nReasons for Case Filing','Case Order',''],
      ];
      // let colWidthHeight={};
      let colWidthHeight = {
        0: { cellWidth: 'auto' },
        1: { cellWidth: '1px', halign: 'center' },
        2: { cellWidth: 'auto', halign: 'center' },
        3: { cellWidth: 'auto', halign: 'center' },
        4: { cellWidth: 'auto', halign: 'center' },
        5: { cellWidth: 'auto', halign: 'center' },
        6: { cellWidth: 'auto', halign: 'center' },
        7: { cellWidth: 'auto', halign: 'center' },
        8: { cellWidth: 'auto', halign: 'center' },
        9: { cellWidth: 'auto', halign: 'center' },
        10: { cellWidth: 'auto', halign: 'center' },
        11: { cellWidth: 'auto', halign: 'center' },
        12: { cellWidth: '1px', halign: 'center' },
        13: { cellWidth: 'auto', halign: 'center' },
        14: { cellWidth: 'auto', halign: 'center' },
        15: { cellWidth: 'auto', halign: 'center' },
        16: { cellWidth: 'auto', halign: 'center' },
        17: { cellWidth: 'auto', halign: 'center' },
        18: { cellWidth: 'auto', halign: 'center' },
        19: { cellWidth: 'auto', halign: 'center' },
        20: { cellWidth: 'auto', halign: 'center' },
        21: { cellWidth: 'auto', halign: 'center' },
        22: { cellWidth: 'auto', halign: 'center' },
        // 23: { cellWidth: 'auto', halign: 'center' },
        // 24: { cellWidth: '100', halign: 'center' },
        // 25: { cellWidth: 'auto', halign: 'center' }
      }
      this.courtCaseData.forEach((element, index) => {

        let pDateOfReporting = element.pDateOfReporting;
        if (element.pDeptName != undefined) {
          Designation = element.pDeptName;
        }
        else {
          Designation = "";
        }
        let serialNumber = index + 1;
        let filingDate = this.datepipe.transform(element.plbcasehearingdate, 'dd-MM-yyyy')
        let pnexthearingdate = this.datepipe.transform(element.pnexthearingdate, 'dd-MM-yyyy')
        let temp = [
          element.pcaseorder,
          element.phearingstatus,
          element.pPlaintiff,
          element.pDefendant,
          element.pcourtname,
          element.plbcasenumber,
          filingDate,
          element.ptotallandareainacres,
          element.padvocatename,
          element.padvocatemobile,
          element.padvocatemail,
          pnexthearingdate,
          


        ]
        rows.push(temp);

        let temp1 = [
          element.poutcome,
          element.phearingattendedby,
          element.pwhoiswithdiscussioninpurchaseland,
          element.pnameofland,
          element.pdocno,
          element.psituatedat,
          element.psurveyno,
          element.ppurchasedthrough,
          element.pTypeofCaseReasonsforCaseFiling,
         
          //element.pwhoiswithdiscussioninpurchaseland


        ]
        rows.push(temp1)
      })

      // // pass Type of Sheet Ex : a4 or lanscspe
      if (printorpdf == "Pdf") {
        debugger;
        this._plotcreationservices._downloadPayrollProcessApprovalPdf(reportname, rows, gridheaders, colWidthHeight, "landscape", "As On", this.commonservice.getFormatDateGlobal(new Date()), null, printorpdf, "", this.courtCaseData.length);
      }
      else {
        debugger;
        this._plotcreationservices._downloadPayrollProcessApprovalPdf(reportname, rows, gridheaders, colWidthHeight, "landscape", "As On", this.commonservice.getFormatDateGlobal(new Date()), "", printorpdf, "", this.courtCaseData.length);
      }
    }
  }

  view() {
    this.router.navigate(["/CourtCaseDetails"])
  }

  courtCaseEdit(dataItem) {
    debugger;
    var myparams = btoa(dataItem.plbCaseID);
    this.router.navigate(["/CourtCaseDetails", { id: myparams }]);
  }

  public onFilter(inputValue: string): void {
    this.courtCaseData = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pPlaintiff',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pDefendant',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pcourtname',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'plbcasenumber',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'padvocatename',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'poutcome',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'phearingattendedby',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pwhoiswithdiscussioninpurchaseland',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pdocno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'psituatedat',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'psurveyno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'padvperformance',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pcaseorder',
            operator: 'contains',
            value: inputValue
          }

        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }

  allData() {

    const result: ExcelExportData = {
      data: process(this.courtCaseData, { sort: [{ field: 'pReferenceId', dir: 'desc' }] }).data
    };

    return result;
  }

}

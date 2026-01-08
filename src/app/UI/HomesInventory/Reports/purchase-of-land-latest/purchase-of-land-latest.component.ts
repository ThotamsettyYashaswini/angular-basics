import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, process } from '@progress/kendo-data-query';
import { Workbook } from '@progress/kendo-angular-excel-export';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
// import { load } from '@progress/kendo-drawing';
import * as kendo from '@progress/kendo-drawing';
declare const $: any;
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
@Component({
  selector: 'app-purchase-of-land-latest',
  templateUrl: './purchase-of-land-latest.component.html',
  styles: []
})

export class PurchaseOfLandLatestComponent implements OnInit {

  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild(GridComponent, { static: false }) grid: GridComponent;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  public purchaseOfLandGrid: any;
  purchaseOfLandGridarray: any = [];
  landofPurchaseForm: FormGroup;
  companyNameslist: any = [];
  villageNameslist: any = [];
  documentNolist: any = [];
  surveyNoList: any = [];
  ErrorMessages: any = {};
  companyName: any;
  villageName: any;
  documentNo: any;
  stylevarable: boolean = true;
  isLoading: boolean = false;
  path: string;
  fileNameDocs: any = [];
  filepathDocs: any;
  filetypeDocs: any;
  fileName1Docs: any;
  filePathDataDocs: string;
  ViewImageDocs: string;
  showOrhiddenPlotFlag: boolean = false;
  headerFlag: boolean = false;
  headerAllFlag: boolean = false;
  headerCompanyFlag: boolean = false;
  isExporting: boolean = false;
  skip = 0;
  pageSize = 10;
   public groups: GroupDescriptor[] = [
  { field: 'northboundary' },
  { field: 'eastboundary' },
  { field: 'southboundary' },
  { field: 'westboundary' }
];
  
  constructor(private fb: FormBuilder, private _commonService: CommonService, private _landBankService: LandBankService, private http: HttpClient) { }

  ngOnInit() {

    //    load('/fonts/NotoSansTelugu-Regular.ttf').then(() => {
    //   console.log('✅ NotoSansTelugu font loaded');
    // });
    kendo.pdf.defineFont({
      'NotoSansTelugu': '/fonts/NotoSansTelugu-Regular.ttf',
      'Roboto': '/fonts/Roboto-Regular.ttf'
    });

    let urldata = environment.apiURL;

    this.http.get(urldata).subscribe(res => {
      let appspath = res[0]['ApiHostUrl'].split("/");
      this.path = appspath[0] + '//' + appspath[2] + '/Upload/';
    });
    this.landofPurchaseForm = this.fb.group({
      companyname: ['All'],
      villagename: ['All'],
      documentno: ['All'],
      surveyno: ['']
    });
    this.getCompanyslbreport();
    this.getVillageData();
    this.documentNoData();
    //this.showGridData();
    //this.BlurEventAllControll(this.landofPurchaseForm);
    debugger
    //this.getLandPurchasedDetailsReport();
  }

  getCompanyslbreport() {
    this._landBankService.getCompanyslbreport().subscribe(res => {
      let json: any = [];
      json = res;
      let tempArray = [{ "companynameid": 0, "companyname": 'All' }];
      let companyNameslist = [...tempArray, ...json];
      this.companyNameslist = companyNameslist;
      console.log("Company Names : ", this.companyNameslist);
    });
  }

  //original  exportPDF(): void {
  //   drawDOM(this.pdfContent.nativeElement, {
  //     paperSize: 'A4',
  //     scale: 0.5,
  //     margin: {
  //       top: '1cm',
  //       bottom: '1cm',
  //       left: '1cm',
  //       right: '1cm'
  //     }
  //   }).then((group) => {
  //     return exportPDF(group);
  //   }).then((dataUri) => {
  //     saveAs(dataUri, 'Purchase_Of_Land.pdf');
  //   });
  // }


  //beow is for pdf adjustent

  // exportPDF(): void {
  //   setTimeout(() => {
  //     drawDOM(this.pdfContent.nativeElement, {
  //       paperSize: 'A4',
  //       scale: 0.42,
  //       landscape: true,
  //       repeatHeaders: true,
  //       margin: {
  //         top: '1cm',
  //         bottom: '1cm',
  //         left: '1cm',
  //         right: '1cm',
  //       },
  //     }).then(group => exportPDF(group))
  //       .then(dataUri => saveAs(dataUri, 'Purchase_Of_Land.pdf'));
  //   }, 200); // Give it time to render bindings
  // }

  // exportPDF(): void {
  //     this.isExporting = true; // Set flag when exporting

  //     setTimeout(() => {
  //       drawDOM(this.pdfContent.nativeElement, {
  //         paperSize: 'A4',
  //         scale: 0.42,
  //         landscape: true,
  //         repeatHeaders: false,
  //         margin: {
  //           top: '1cm',
  //           bottom: '1cm',
  //           left: '1cm',
  //           right: '1cm',
  //         },
  //       }).then(group => exportPDF(group))
  //         .then(dataUri => saveAs(dataUri, 'Purchase_Of_Land.pdf'))
  //         .finally(() => {
  //           this.isExporting = false; // Reset the flag after export
  //         });
  //     }, 200); // Give it time to render bindings
  //   }

  // exportPDF(): void {
  //   // Store current pagination state
  //   const currentSkip = this.skip;
  //   const currentPageSize = this.pageSize;
  //   this.isExporting = true;
  //   // Show all rows for export
  //   this.skip = 0;
  //   this.pageSize = this.purchaseOfLandGrid.length; // show all rows

  //   // Trigger Angular to update UI, then export
  //   setTimeout(() => {
  //     drawDOM(this.pdfContent.nativeElement, {
  //       paperSize: 'A3',
  //       scale: 0.6,
  //       landscape: true,
  //       margin: {
  //         top: '1cm',
  //         bottom: '1cm',
  //         left: '1cm',
  //         right: '1cm',
  //       }
  //     }).then(group => exportPDF(group))
  //       .then(dataUri => {
  //         saveAs(dataUri, 'Purchase_Of_Land.pdf');

  //         // Restore original pagination
  //         this.skip = currentSkip;
  //         this.pageSize = currentPageSize;
  //       });
  //   }, 500);
  // }

//   exportPDF(): void {
//   // Store current pagination state
//   const currentSkip = this.skip;
//   const currentPageSize = this.pageSize;
//   this.isExporting = true;

//   // Show all rows for export
//   this.skip = 0;
//   this.pageSize = this.purchaseOfLandGrid.length;

//   // Hide pagination UI
//   const paginator = this.pdfContent.nativeElement.querySelector('.k-pager-wrap');
//   if (paginator) {
//     paginator.style.display = 'none';
//   }

  

//   // Trigger Angular to update UI, then export
//  setTimeout(() => {
//       drawDOM(this.pdfContent.nativeElement, {
//         paperSize: 'A3',
//         scale: 0.55,
//         landscape: true,
//         margin: {
//           top: '0.5cm',
//           bottom: '0.5cm',
//           left: '0.5cm',
//           right: '0.5cm',
//         }
//     }).then(group => exportPDF(group))
//       .then(dataUri => {
//         saveAs(dataUri, 'Purchase_Of_Land.pdf');

//         // Restore original pagination
//         this.skip = currentSkip;
//         this.pageSize = currentPageSize;

//         // Show pagination again
//         if (paginator) {
//           paginator.style.display = '';
//         }
//       });
//   }, 500);
// }

// exportPDF(): void {
//   const currentSkip = this.skip;
//   const currentPageSize = this.pageSize;
//   this.isExporting = true;

//   // Show all rows
//   this.skip = 0;
//   this.pageSize = this.purchaseOfLandGrid.length;

//   const paginator = this.pdfContent.nativeElement.querySelector('.k-pager-wrap');
//   if (paginator) {
//     paginator.style.display = 'none';
//   }

//   // === Step 1: Create and insert the header element ===
//   const header = document.createElement('div');
//   header.style.textAlign = 'center';
//   header.style.fontSize = '20px';
//   header.style.fontWeight = 'bold';
//   header.style.marginBottom = '20px';

//   if (this.headerFlag) {
//     header.innerText = `${this.landofPurchaseForm.controls.companyname.value} - ${this.landofPurchaseForm.controls.villagename.value}`;
//   } else if (this.headerCompanyFlag) {
//     header.innerText = `${this.landofPurchaseForm.controls.companyname.value}`;
//   } else if (this.headerAllFlag) {
//     header.innerText = 'Purchase Of Land Details';
//   } else {
//     header.innerText = 'Purchase Of Land';
//   }

//   this.pdfContent.nativeElement.insertBefore(header, this.pdfContent.nativeElement.firstChild);

//   // === Step 2: Export ===
//   setTimeout(() => {
//     drawDOM(this.pdfContent.nativeElement, {
//       paperSize: 'A3',
//       scale: 0.55,
//       landscape: true,
//       margin: {
//         top: '1cm',
//         bottom: '0.5cm',
//         left: '0.5cm',
//         right: '0.5cm',
//       }
//     })
//     .then(group => exportPDF(group))
//     .then(dataUri => {
//       saveAs(dataUri, 'Purchase_Of_Land.pdf');

//       // === Step 3: Clean up ===
//       this.pdfContent.nativeElement.removeChild(header);
//       this.skip = currentSkip;
//       this.pageSize = currentPageSize;

//       if (paginator) {
//         paginator.style.display = '';
//       }
//     });
//   }, 500);
// }

exportPDF(): void {
  this.isExporting = true;
  const currentSkip = this.skip;
  const currentPageSize = this.pageSize;
  this.isLoading = true;

  this.skip = 0;
  this.pageSize = this.purchaseOfLandGrid.length;

  const paginator = this.pdfContent.nativeElement.querySelector('.k-pager-wrap');
  if (paginator) {
    paginator.style.display = 'none';
  }

  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.fontSize = '20px';
  header.style.fontWeight = 'bold';
  header.style.marginBottom = '20px';

  if (this.headerFlag) {
    header.innerText = `${this.landofPurchaseForm.controls.companyname.value} - ${this.landofPurchaseForm.controls.villagename.value}`;
  } else if (this.headerCompanyFlag) {
    header.innerText = `${this.landofPurchaseForm.controls.companyname.value}`;
  } else if (this.headerAllFlag) {
    header.innerText = 'Purchase Of Land Details';
  } else {
    header.innerText = 'Purchase Of Land';
  }

  this.pdfContent.nativeElement.insertBefore(header, this.pdfContent.nativeElement.firstChild);

  setTimeout(() => {
    drawDOM(this.pdfContent.nativeElement, {
      paperSize: 'A3',
      scale: 0.55,
      landscape: true,
      margin: {
        top: '1cm',
        bottom: '0.5cm',
        left: '0.5cm',
        right: '0.5cm',
      }
    })
    .then(group => exportPDF(group))
    .then(dataUri => {
      saveAs(dataUri, 'Purchase_Of_Land.pdf');
    })
    .catch(err => {
      console.error('PDF export failed:', err);
    })
    .finally(() => {
      // Clean up
      this.pdfContent.nativeElement.removeChild(header);
      this.skip = currentSkip;
      this.pageSize = currentPageSize;

      if (paginator) {
        paginator.style.display = '';
      }

      this.isLoading = false;
    });
  }, 500);
}



  // isBoundaryVisible(landIndex: number, detailIndex: number): boolean {
  //     debugger
  //     const landdetails = this.purchaseOfLandGrid[landIndex].landdetailslist;

  //     if (detailIndex === 0) {
  //       return true; // Always show the first row
  //     }

  //     const current = landdetails[detailIndex];
  //     const previous = landdetails[detailIndex - 1];

  //     const isSame =
  //       current.northboundary === previous.northboundary &&
  //       current.southboundary === previous.southboundary &&
  //       current.eastboundary === previous.eastboundary &&
  //       current.westboundary === previous.westboundary;

  //     return !isSame; // Show if not the same as previous
  //   }

  // isBoundaryVisible(landIndex: number, detailIndex: number): boolean {
  //   const landDetails = this.purchaseOfLandGrid[landIndex].landdetailslist;

  //   // Always show boundaries for first row
  //   if (detailIndex === 0) {
  //     return true;
  //   }

  //   const current = landDetails[detailIndex];
  //   const previous = landDetails[detailIndex - 1];

  //   // Check if all boundaries match
  //   const isSame =
  //     current.northboundary === previous.northboundary &&
  //     current.eastboundary === previous.eastboundary &&
  //     current.southboundary === previous.southboundary &&
  //     current.westboundary === previous.westboundary;

  //   return !isSame; // Only show if not same as previous
  // }

  isBoundaryVisible(landIndex: number, detailIndex: number): boolean {
  if (
    !this.purchaseOfLandGrid ||
    !this.purchaseOfLandGrid[landIndex] ||
    !this.purchaseOfLandGrid[landIndex].landdetailslist
  ) {
    return false;
  }

  const landdetails = this.purchaseOfLandGrid[landIndex].landdetailslist;

  if (!landdetails[detailIndex]) {
    return false;
  }

  const current = landdetails[detailIndex];

  const north = current.northboundary ? current.northboundary.trim() : '';
  const east = current.eastboundary ? current.eastboundary.trim() : '';
  const south = current.southboundary ? current.southboundary.trim() : '';
  const west = current.westboundary ? current.westboundary.trim() : '';

  const currentKey = `${north}|${east}|${south}|${west}`;

  for (let i = 0; i < detailIndex; i++) {
    const prev = landdetails[i];
    if (!prev) continue;

    const pNorth = prev.northboundary ? prev.northboundary.trim() : '';
    const pEast = prev.eastboundary ? prev.eastboundary.trim() : '';
    const pSouth = prev.southboundary ? prev.southboundary.trim() : '';
    const pWest = prev.westboundary ? prev.westboundary.trim() : '';

    const prevKey = `${pNorth}|${pEast}|${pSouth}|${pWest}`;

    if (currentKey === prevKey) {
      return false;
    }
  }

  return true;
}











  //done getSurveyParts(surveyno: string | null | undefined): { prefix: string, telugu: string, suffix: string } {
  //   const safeValue = surveyno || ''; // fallback to empty string if null/undefined
  //   const parts = safeValue.split('/');

  //   return {
  //     prefix: parts[0] || '',
  //     telugu: parts[1] || '',
  //     suffix: parts[2] || ''
  //   };
  // }
  // getSurveyParts(surveyno: string | null | undefined): { prefix: string, telugu: string, suffix: string } {
  //   const safeValue = surveyno || '';
  //   const parts = safeValue.split('/');
  //   return {
  //     prefix: parts[0] || '',
  //     telugu: parts[1] || '',
  //     suffix: parts[2] || ''
  //   };
  // }


  //finally below one is done for all dropdowns
  // getSurveyParts(surveyno: string | null | undefined): { prefix: string, telugu: string, suffix: string } {
  //   const safeValue = surveyno || '';
  //   const parts = safeValue.split('/');

  //   return {
  //     prefix: parts[0] ? parts[0].trim() : '',
  //     telugu: parts[1] ? parts[1].trim() : '',
  //     suffix: parts[2] ? parts[2].trim() : ''
  //   };
  // }

  // // Helper to check if the middle part is likely a Telugu character
  // isTelugu(text: string): boolean {
  //   return /[అఆఇఈఉఊఋఌఎఏఐఒఓఔంఃౖఁ]/.test(text);
  // }
  ///final end

  // buildSurveyNo(surveyno: string | null | undefined): string {
  //   debugger;
  //   const safeValue = surveyno || '';
  //   const parts = safeValue.split('/').map(p => p.trim()).filter(p => p !== '');

  //   return parts.join('/');
  // }
  // isTeluguOnly(surveyno: string | null | undefined): boolean {
  //   return /[అ-హ]/.test(surveyno || '');
  // }
  //  getSurveyParts(surveyno: string | null | undefined): { prefix: string, telugu: string, suffix: string } {
  //   const safeValue = surveyno || '';
  //   const parts = safeValue.split('/').map(p => p.trim());
  //   return {
  //     prefix: parts[0] || '',
  //     telugu: parts[1] || '',
  //     suffix: parts[2] || ''
  //   };
  // }

  // today

  // getSurveyParts(surveyno: string | null | undefined): { prefix: string, telugu: string, suffix: string } {
  //   const safeValue = surveyno || '';
  //   const parts = safeValue.split('/').map(p => p.trim());
  //   return {
  //     prefix: parts[0] || '',
  //     telugu: parts[1] || '',
  //     suffix: parts[2] || ''
  //   };
  // }

  // isTelugu(text: string): boolean {
  //   // Check if any Telugu Unicode characters exist
  //   return /[\u0C00-\u0C7F]/.test(text);
  // }

  // isBoundaryVisible(landIndex: number, detailIndex: number): boolean {
  //   debugger
  //   const landdetails = this.purchaseOfLandGrid[landIndex].landdetailslist;
  //   if (!landdetails || detailIndex < 0) {
  //     return false;
  //   }

  //   const current = landdetails[detailIndex];
  //   const north = current.northboundary ? current.northboundary.trim() : '';
  //   const east = current.eastboundary ? current.eastboundary.trim() : '';
  //   const south = current.southboundary ? current.southboundary.trim() : '';
  //   const west = current.westboundary ? current.westboundary.trim() : '';

  //   // Step 1: Check if all four boundaries are equal for current row
  //   const allEqual = (north === east) && (east === south) && (south === west);

  //   // If boundaries are NOT all equal, always show
  //   if (!allEqual) {
  //     return true;
  //   }

  //   // Step 2: If all equal, check if current row is the first occurrence of these boundary values
  //   // Loop through previous rows to see if these boundaries already appeared
  //   for (let i = 0; i < detailIndex; i++) {
  //     const prev = landdetails[i];
  //     const pNorth = prev.northboundary ? prev.northboundary.trim() : '';
  //     const pEast = prev.eastboundary ? prev.eastboundary.trim() : '';
  //     const pSouth = prev.southboundary ? prev.southboundary.trim() : '';
  //     const pWest = prev.westboundary ? prev.westboundary.trim() : '';

  //     const prevAllEqual = (pNorth === pEast) && (pEast === pSouth) && (pSouth === pWest);

  //     // If previous row boundaries are also all equal AND values match current row, hide current row boundaries
  //     if (
  //       prevAllEqual &&
  //       pNorth === north &&
  //       pEast === east &&
  //       pSouth === south &&
  //       pWest === west
  //     ) {
  //       return false; // Hide current row boundaries because they match a previous one
  //     }
  //   }

  //   return true; // Show boundaries if no match found before
  // }





  splitSurveyNo(surveyno: string | null | undefined): string[][] {
    const safe = (surveyno || '').split('/');
    return safe.map(part => part.trim().split(''));
  }

  isTeluguChar(char: string): boolean {
    return /[\u0C00-\u0C7F]/.test(char);
  }


  companyName_Change(event) {
    debugger;
    //this.villageNameslist = [];
    //this.documentNolist = [];
    if (event) {
      this.purchaseOfLandGrid = [];
      this.purchaseOfLandGridarray = [];
      this.landofPurchaseForm.controls.villagename.setValue('All');
      this.ErrorMessages['villagename'] = '';
      this.landofPurchaseForm.controls.documentno.setValue('All');
      this.ErrorMessages['documentno'] = '';
      this.companyName = event.companyname;

      if (event.companyname) {
        //this.getLandPurchasedDetailsReport();
        this.showOrhiddenPlotFlag = false;
        this.getVillageData();
      }
    } else {
      this.villageNameslist = [];
      this.landofPurchaseForm.controls.villagename.setValue('');
      this.ErrorMessages['villagename'] = '';
    }
  }

  getVillageData() {
    debugger;
    this._landBankService.getvillageslbreport(this.companyName).subscribe(res => {
      //this.villageNameslist = res;
      let json: any = [];
      json = res;
      let tempArray = [{ "cityvillageid": 0, "cityvillage": 'All' }];
      let villageNameslist = [...tempArray, ...json];
      this.villageNameslist = villageNameslist;
      console.log("Village Names : ", this.villageNameslist);
    });
  }


  villageName_Change(event) {
    debugger;
    //this.documentNolist = [];
    if (event) {
      this.showOrhiddenPlotFlag = false;
      this.landofPurchaseForm.controls.documentno.setValue('All');
      const companyName = this.landofPurchaseForm.controls.companyname.value;
      this.villageName = event.cityvillage;
      this.documentNoData();



    }
  }

  documentNoData() {
    this._landBankService.getdocumentslbreport(this.companyName, this.villageName).subscribe(res => {
      // this.documentNolist = res;
      let json: any = [];
      json = res;
      let tempArray = [{ "registereddocumentnoid": 0, "registereddocumentno": 'All' }];
      let documentNolist = [...tempArray, ...json];
      this.documentNolist = documentNolist;
      console.log("Document Nos : ", this.documentNolist);
    });
  }


  documentNo_Change(event) {
    debugger;
    this.documentNo = event.registereddocumentno;
    this.showOrhiddenPlotFlag = false;
    this.getLandPlotCount();
    //this.getLandPurchasedDetailsReport();
  }

  getLandPlotCount() {
    debugger;
    this._landBankService.getLandPlotCount(this.companyName, this.villageName, this.documentNo).subscribe(landCount => {
      let count = landCount.pplotcount;
      if (count > 0) {
        this.showOrhiddenPlotFlag = true;
      }
      else {
        this.showOrhiddenPlotFlag = false;
      }
      console.log(count);

    })
  }


  getLandPurchasedDetailsReport() {
    debugger;
    this.isLoading = true;
    console.log(this.companyName);
    console.log(this.villageName);
    console.log(this.documentNo);
    let companyName = this.landofPurchaseForm.controls.companyname.value;
    let villageName = this.landofPurchaseForm.controls.villagename.value;
    let documentNo = this.landofPurchaseForm.controls.documentno.value;

    if (companyName == undefined || companyName == 'All') {
      companyName = '';
    }
    if (villageName == undefined || villageName == 'All') {
      villageName = '';
    }
    if (documentNo == undefined || documentNo == 'All') {
      documentNo = '';
    }

    if (this.landofPurchaseForm.controls.companyname.value != 'All' && this.landofPurchaseForm.controls.villagename.value != 'All') {
      this.headerFlag = true;
      this.headerAllFlag = false;
      this.headerCompanyFlag = false;
    }
    if (this.landofPurchaseForm.controls.companyname.value == 'All' && this.landofPurchaseForm.controls.villagename.value == 'All') {
      this.headerAllFlag = true;
      this.headerFlag = false;
      this.headerCompanyFlag = false;

    }

    if (this.landofPurchaseForm.controls.companyname.value != 'All' && this.landofPurchaseForm.controls.villagename.value == 'All') {
      this.headerCompanyFlag = true;
      this.headerFlag = false;
      this.headerAllFlag = false;
    }

    this._landBankService.getLandPurchasedDetailsReport(companyName, villageName, documentNo).subscribe(res => {
      this.purchaseOfLandGrid = res;
      console.log(res);

      this.purchaseOfLandGridarray = this.purchaseOfLandGrid;
      this.expandAllRows();
      this.isLoading = false;
      if (this.purchaseOfLandGrid.length == 0) {
        this._commonService.showWarningMessage('No Data To Retrieve');
      }

      // this.purchaseOfLandGrid.forEach(landPurchase => {
      //   if (landPurchase.landdetailslist && landPurchase.landdetailslist.length) {
      //     landPurchase.landdetailslist.forEach(landDetail => {
      //       if (landDetail.totalarea) {
      //         // Replace '.00 ACER' with ' ACER'
      //         landDetail.totalarea = landDetail.totalarea.replace(/\.00 ACER/, ' ACER');
      //       }
      //     });
      //   }
      // });
      this.purchaseOfLandGrid.forEach(landPurchase => {
        // Fix registrationfee in main object
        if (typeof landPurchase.registrationfee === 'string') {
          landPurchase.registrationfee = landPurchase.registrationfee.replace(/\.00$/, '');
        }

        // Fix registrationfee in nested landdetailslist
        if (Array.isArray(landPurchase.landdetailslist)) {
          landPurchase.landdetailslist.forEach(landDetail => {
            if (typeof landDetail.registrationfee === 'string') {
              landDetail.registrationfee = landDetail.registrationfee.replace(/\.00$/, '');
            }
          });
        }
      });


      this.purchaseOfLandGrid.forEach(landPurchase => {
        if (landPurchase.landdetailslist && landPurchase.landdetailslist.length) {
          landPurchase.landdetailslist.forEach(landDetail => {
            if (landDetail.totalarea) {
              // Replace '.00 ACER' with ' ACER'
              landDetail.totalarea = landDetail.totalarea.replace(/\.00 ACER/, ' ACER');
            }

            // Format registration fee
            landDetail.registrationfee = this._commonService.currencyformat(landDetail.registrationfee);
          });
        }
      });


      // this.purchaseOfLandGrid = this.hideDuplicateBoundaries(this.purchaseOfLandGrid);

    })
  }

  expandAllRows() {
    this.purchaseOfLandGrid.forEach((item, index) => {
      this.grid.expandRow(index);
    });
  }


  surveyNo_Change(event) {

  }

  private hideDuplicateBoundaries(purchaseOfLandGrid: any[]): any[] {
    return purchaseOfLandGrid.map(item => {
      const seenBoundaryKeys = new Set<string>();

      item.landdetailslist = item.landdetailslist.map((detail, index) => {
        const key = `${detail.northboundary}|${detail.southboundary}|${detail.eastboundary}|${detail.westboundary}`;
        if (seenBoundaryKeys.has(key)) {
          return {
            ...detail,
            northboundary: '',
            southboundary: '',
            eastboundary: '',
            westboundary: ''
          };
        } else {
          seenBoundaryKeys.add(key);
          return detail;
        }
      });

      return item;
    });
  }


  // showGridData(){
  //   this.purchaseOfLandGrid = [];
  //   this.purchaseOfLandGridarray = [];
  //   this._landBankService.getLandPurchaseddetails().subscribe(res =>{
  //     this.purchaseOfLandGrid = res;
  //     console.log("this is Grid Data : ",this.purchaseOfLandGrid);
  //     this.purchaseOfLandGridarray = this.purchaseOfLandGrid;
  //     this.expandAllRows();
  //   });
  // }





  public onFilter(inputValue: string): void {
    this.purchaseOfLandGrid = process(this.purchaseOfLandGridarray, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'registereddocumentno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'sro',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'vendorname',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'sroloaction',
            operator: 'contains',
            value: inputValue
          },
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }


  downloadExcel(): void {
    const rows: any[] = [];

    const parentHeaders = ['Sale Deed No.', 'Sale Deed Date', 'SRO at', 'Village', 'Seller Name', 'Purchaser Name', 'Land Cost', 'Reg. Fee', 'Brokerage', 'Others', 'Total Doc. Value', 'Custody at', 'Googel Location', 'Custody at', 'Google Location'];
    // 'House No.','Property tax No','Electricity No',

    const childHeaders = ['Survey Nos', 'Total Area', 'Total Area (Sq.yds)', 'North', 'East', 'South', 'West'];
    // 'Survey sub Numbers', 'Extent in Acres', 'Extent in Guntas', 'Extent in Sq. yards', 'Extent in Cents', 

    const formatDate = (date: any) => {
      if (!date) return '';
      if (date instanceof Date) return date.toLocaleDateString();
      return new Date(date).toLocaleDateString();
    };

    const border = { color: '#000000', size: 1 };
    const borderAll = { top: border, bottom: border, left: border, right: border };

    const parentHeaderStyle = {
      bold: true,
      background: '#003366',
      color: '#FFFFFF',
      textAlign: 'center',
      verticalAlign: 'center',
      border: borderAll
    };

    const subHeaderStyle = {
      bold: true,
      background: '#ADD8E6',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'center',
      border: borderAll
    };

    const cellStyle = {
      border: borderAll,
      textAlign: 'center',
      verticalAlign: 'center'
    };

    rows.push({
      cells: [{
        value: 'Purchased Land Details',
        colSpan: 8,
        bold: true,
        fontSize: 14,
        textAlign: 'center',
        color: '#000000'
      }]
    });

    rows.push({
      cells: [
        { value: parentHeaders[0], ...parentHeaderStyle },
        { value: parentHeaders[1], ...parentHeaderStyle },
        { value: parentHeaders[2], ...parentHeaderStyle },
        { value: parentHeaders[3], ...parentHeaderStyle },
        { value: parentHeaders[4], ...parentHeaderStyle },
        { value: parentHeaders[5], ...parentHeaderStyle },
        { value: parentHeaders[6], ...parentHeaderStyle },
        { value: parentHeaders[7], ...parentHeaderStyle },
        { value: parentHeaders[8], ...parentHeaderStyle },
        { value: parentHeaders[9], ...parentHeaderStyle },
        { value: parentHeaders[10], ...parentHeaderStyle },
        { value: parentHeaders[11], ...parentHeaderStyle },
        { value: parentHeaders[12], ...parentHeaderStyle },
      ]
    });

    // original sir
    if (this.purchaseOfLandGrid.length) {
      for (const item of this.purchaseOfLandGrid) {
        rows.push({
          cells: [
            { value: item.registereddocumentno, ...cellStyle },
            { value: item.purchasedate, ...cellStyle },
            { value: item.sro, ...cellStyle },
            { value: item.villagename, ...cellStyle },
            { value: item.vendorname, ...cellStyle },
            { value: item.companyname, ...cellStyle },
            { value: item.landvalue, ...cellStyle },
            { value: item.registrationfee, ...cellStyle },
            { value: item.brokarage, ...cellStyle },
            { value: item.others, ...cellStyle },
            { value: item.totaldocumentvalue, ...cellStyle },
            { value: item.custodyat, ...cellStyle },
            // { value: item.houseNo, ...cellStyle },
            // { value: item.propertytaxNo, ...cellStyle },
            // { value: item.electricityNo, ...cellStyle },
            { value: item.googlelocation, ...cellStyle },
          ]
        });

        rows.push({
          cells: [
            { value: '', ...subHeaderStyle },
            // { value: '', ...subHeaderStyle },
            { value: childHeaders[0], ...subHeaderStyle },
            { value: childHeaders[1], ...subHeaderStyle },
            { value: childHeaders[2], ...subHeaderStyle },
            { value: childHeaders[3], ...subHeaderStyle },
            { value: childHeaders[4], ...subHeaderStyle },
            { value: childHeaders[5], ...subHeaderStyle },
            { value: childHeaders[6], ...subHeaderStyle },
            { value: childHeaders[7], ...subHeaderStyle },
            { value: childHeaders[8], ...subHeaderStyle },
            { value: childHeaders[9], ...subHeaderStyle },
          ]
        });

        if (item.landdetailslist.length) {
          for (const detail of item.landdetailslist) {
            rows.push({
              cells: [
                { value: '', ...cellStyle },
                // { value: '', ...cellStyle },
                // { value: detail.surveyno || '', ...cellStyle },
                { value: detail.surveyno || '', fontFamily: 'Roboto', ...cellStyle },
                { value: detail.totalarea || '0', ...cellStyle },
                { value: detail.areainsqyards || '0', ...cellStyle },
                { value: detail.northboundary || '', ...cellStyle },
                { value: detail.eastboundary || '', ...cellStyle },
                { value: detail.southboundary || '', ...cellStyle },
                { value: detail.westboundary || '', ...cellStyle },
              ]
            });
          }
        }
      }
    }

    //me start
    // const teluguFontStyle = {
    //   fontFamily: 'NotoSansTelugu',
    //   fontSize: 10,
    //   color: '#000'
    // };

    // const defaultFontStyle = {
    //   fontSize: 10,
    //   color: '#000'
    // };

    // if (this.purchaseOfLandGrid.length) {
    //   for (const item of this.purchaseOfLandGrid) {
    //     rows.push({
    //       cells: [
    //         { value: item.registereddocumentno, ...defaultFontStyle },
    //         { value: item.purchasedate, ...defaultFontStyle },
    //         { value: item.sro, ...defaultFontStyle },
    //         { value: item.villagename, ...defaultFontStyle },
    //         { value: item.vendorname, ...defaultFontStyle },
    //         { value: item.companyname, ...defaultFontStyle },
    //         { value: item.landvalue, ...defaultFontStyle },
    //         { value: item.registrationfee, ...defaultFontStyle },
    //         { value: item.brokarage, ...defaultFontStyle },
    //         { value: item.others, ...defaultFontStyle },
    //         { value: item.totaldocumentvalue, ...defaultFontStyle },
    //         { value: item.custodyat, ...defaultFontStyle },
    //         { value: item.googlelocation, ...defaultFontStyle },
    //       ]
    //     });

    //     rows.push({
    //       cells: [
    //         { value: '', ...defaultFontStyle },
    //         { value: childHeaders[0], ...defaultFontStyle },
    //         { value: childHeaders[1], ...defaultFontStyle },
    //         { value: childHeaders[2], ...defaultFontStyle },
    //         { value: childHeaders[3], ...defaultFontStyle },
    //         { value: childHeaders[4], ...defaultFontStyle },
    //         { value: childHeaders[5], ...defaultFontStyle },
    //         { value: childHeaders[6], ...defaultFontStyle },
    //         { value: childHeaders[7], ...defaultFontStyle },
    //         { value: childHeaders[8], ...defaultFontStyle },
    //         { value: childHeaders[9], ...defaultFontStyle },
    //       ]
    //     });

    //     if (item.landdetailslist.length) {
    //       for (const detail of item.landdetailslist) {
    //         rows.push({
    //           cells: [
    //             { value: '', ...defaultFontStyle },
    //             { value: detail.surveyno || '', ...teluguFontStyle },
    //             { value: detail.totalarea || '0', ...defaultFontStyle },
    //             { value: detail.areainsqyards || '0', ...defaultFontStyle },
    //             { value: detail.northboundary || '', ...defaultFontStyle },
    //             { value: detail.eastboundary || '', ...defaultFontStyle },
    //             { value: detail.southboundary || '', ...defaultFontStyle },
    //             { value: detail.westboundary || '', ...defaultFontStyle },
    //           ]
    //         });
    //       }
    //     }
    //   }
    // }

    ///end

    const workbook = new Workbook({
      sheets: [{
        name: 'Purchased Land Details',
        rows: rows,
        columns: [
          { width: 200 },
          { width: 180 },
          { width: 150 },
          { width: 180 },
          { width: 180 },
          { width: 200 },
          { width: 200 },
          { width: 200 },
          { width: 150 },
          { width: 150 },
          { width: 150 },
          { width: 150 },
          { width: 200 },
          { width: 200 },
          { width: 180 },
          { width: 180 },
          { width: 180 },
          { width: 180 },
        ]
      }]
    });

    workbook.toDataURL().then((dataUrl) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'Purchased_Land.xlsx';
      link.click();
    });
  }

  ViewimgData(row) {
    debugger;

    row.landdoclist
    this.fileNameDocs = [];

    this.fileNameDocs = row.landdoclist;
    //this.fileNameDocs = row.documentfilename;
    // this.filepathDocs = row.pFilepathForVehicleDocs;
    // this.filetypeDocs = row.pFiletypeForVehicleDocs;

    //this.filetypeDocs=  row.documentfilename.split('.').pop();

    //this.fileName1Docs = this.fileNameDocs.substring(0, this.fileNameDocs.lastIndexOf('.')) 

    //this.vehicleFileName.split('.').slice(0, -1).join('.');

    // let partsDocs = this.filepathDocs.split('Documents\\');

    //this.filePathDataDocs = this.path +  this.fileNameDocs;
    // Return the second part if 'Documents\\' was found, otherwise return the original path

    //   this.imageViewData = []
    // this.imageViewData =   row.documents;
    $('#ViewuploadVehicleDocs').modal('show');
    this.stylevarable = false;


  }

  close() {
    $('#ViewuploadVehicleDocs').modal('hide');
  }

  downloadimgData(data) {
    debugger
    //  let viewFileTypeDocs=  data.split('.').pop();
    // this.ViewImage =this.path+'Documents/'+dataItem[0].FilePath ; 

    //let parts = this.filepathDocs.split('Documents\\');

    this.ViewImageDocs = this.path + data.documentfilename;
    if (data.filetype == 'PDF') {
      window.open(this.ViewImageDocs);
    }

    else {
      let filepathDocs = this.ViewImageDocs;
      this._commonService.GetImage(filepathDocs).subscribe(res => {
        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + res[0]; //Image Base64 Goes here
        a.download = data; //File name Here
        a.click(); //Downloaded file
      })
    }
  }


  //VALIDATIONS

  BlurEventAllControll(fromgroup: FormGroup): boolean {
    debugger;
    try {
      debugger
      Object.keys(fromgroup.controls).forEach((key: string) => {
        this.setBlurEvent(fromgroup, key);
      })
      return true;
    }
    catch (e) {
      debugger
      this._commonService.showErrorMessage(e);
      return false;
    }
  }


  setBlurEvent(fromgroup: FormGroup, key: string): boolean {
    debugger;
    try {
      debugger
      let formcontrol;
      formcontrol = fromgroup.get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          debugger;
          this.BlurEventAllControll(formcontrol)
        }
        else {
          if (formcontrol.validator)
            fromgroup.get(key).valueChanges.subscribe((data) => { this.GetValidationByControl(fromgroup, key, true) })
        }
      }
      return true;
    }
    catch (e) {
      debugger;
      this._commonService.showErrorMessage(e);
      return false;
    }
  }


  checkValidations(group: FormGroup, isValid: boolean): boolean {
    debugger;
    try {
      Object.keys(group.controls).forEach((key: string) => {
        isValid = this.GetValidationByControl(group, key, isValid);
      });
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }


  GetValidationByControl(formGroup: FormGroup, key: string, isValid: boolean): boolean {
    debugger;
    try {
      const formcontrol = formGroup.get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          this.checkValidations(formcontrol, isValid);
        }
        else if (formcontrol.validator) {
          this.ErrorMessages[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            const element = document.getElementById(key);
            const lablename = element ? element.title : key;
            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.ErrorMessages[key] += errormessage + ' ';
                isValid = false;
              }
            }
          }
        }
      }
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }


  showErrorMessage(errormsg: any) {
    debugger
    this._commonService.showErrorMessage(errormsg);
  }

}

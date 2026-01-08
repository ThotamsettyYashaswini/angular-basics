import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from "ngx-bootstrap/datepicker";
import { ImageCropperModule } from "ngx-image-cropper";
import { DatePipe, TitleCasePipe } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { NgxLoadingModule } from "ngx-loading";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
// import { AccountingModule } from '../app/UI/accounting/accounting.module'

import { NumbersonlyDirective } from "./Directives/numbersonly.directive";
import { AddressformatDirective } from "./Directives/addressformat.directive";
import { CharactersonlyDirective } from "./Directives/charactersonly.directive";
import { EmailpatternDirective } from "./Directives/emailpattern.directive";
import { MycurrencyFormatterDirective } from "./Directives/mycurrency-formatter.directive";
import { NewlineDirective } from "./Directives/newline.directive";
import { TitlecasewordDirective } from "./Directives/titlecaseword.directive";
import { EmailFormatDirective } from "./Directives/emailformat.directive";
import { EnterpriseNameFormatDirective } from "./Directives/enterprisenameformat";
import { TwoDigitDecimaNumberDirective } from "./Directives/two-digit-decima-number.directive";
import { ThreeDigitDecimaNumberDirective } from "./Directives/three-digit-decima-number.directive";
import { InitCapDirective } from "./Directives/InitCap.directive";
import { NumbersWithZeroDirective } from "./Directives/numberswithzero.directive";

import { AppComponent } from "./app.component";
import { FilterPipeModule } from "ngx-filter-pipe";

import { DashboardComponent } from "./UI/Home/dashboard.component";
import { NavigationComponent } from "./UI/Home/navigation.component";

import { CookieService } from "ngx-cookie-service";

import { ReferralAgentViewComponent } from "./UI/Settings/Referral-Agent/referral-agent-view.component";
import { ReferralAgentMasterComponent } from "./UI/Settings/Referral-Agent/referral-agent-master.component";
import { AdvocateLawyerMasterComponent } from "./UI/Settings/Advocate-Lawyer/advocate-lawyer-master.component";
import { AdvocateLawyerViewComponent } from "./UI/Settings/Advocate-Lawyer/advocate-lawyer-view.component";
import { EmployeeViewComponent } from "./UI/Settings/Employee/employee-view.component";
import { EmployeeMasterComponent } from "./UI/Settings/Employee/employee-master.component";

import { MycurrencypipePipe } from "./Pipes/mycurrencypipe.pipe";

//import { ReferralAgentContactComponent } from './UI/Settings/Referral-Agent/referral-agent-contact.component';
//import { ReferralAgentKycdocumentsComponent } from './UI/Settings/Referral-Agent/referral-agent-kycdocuments.component';
//import { ReferralAgentBankdetailsComponent } from './UI/Settings/Referral-Agent/referral-agent-bankdetails.component';
//import { ReferralAgentTdsdetailsComponent } from './UI/Settings/Referral-Agent/referral-agent-tdsdetails.component';
// import { AdvocateLawyerTdsdetailsComponent } from './UI/Settings/Advocate-Lawyer/advocate-lawyer-tdsdetails.component';
// import { AdvocateLawyerBankdetailsComponent } from './UI/Settings/Advocate-Lawyer/advocate-lawyer-bankdetails.component';
// import { AdvocateLawyerKycdocumentsComponent } from './UI/Settings/Advocate-Lawyer/advocate-lawyer-kycdocuments.component';
// import { AdvocateSelectComponent } from './UI/Settings/Advocate-Lawyer/advocate-select.component';

import { PartyViewComponent } from "./UI/Settings/contact-party/party-view.component";
import { PartyMasterComponent } from "./UI/Settings/contact-party/party-master.component";
// import { PartyBankdetailsComponent } from './UI/Settings/contact-party/party-bankdetails.component';
// import { PartyKycdocumentsComponent } from './UI/Settings/contact-party/party-kycdocuments.component';
// import { PartySelectComponent } from './UI/Settings/contact-party/party-select.component';
// import { PartyTdsdetailsComponent } from './UI/Settings/contact-party/party-tdsdetails.component';

import { KYCDocumentsComponent } from "./UI/Common/kycdocuments/kycdocuments.component";
import { BankdetailsComponent } from "./UI/Common/bankdetails/bankdetails.component";
import { TDSDetailsComponent } from "./UI/Common/tdsdetails/tdsdetails.component";
import { RoundecimalDirective } from "./Directives/roundecimal.directive";
import {
  GridModule,
  ExcelModule,
  PDFModule,
} from "@progress/kendo-angular-grid";
import { GroupViewComponent } from "./UI/Common/group-view/group-view.component";
import { GroupCreationComponent } from "./UI/Common/group-creation/group-creation.component";
import { ContactSelectComponent } from "./UI/Common/contact-select/contact-select.component";

import { PersonalDetailsComponent } from "./UI/Common/personal-details/personal-details.component";
import { FamilyDetailsComponent } from "./UI/Common/family-details/family-details.component";
import { EmployeeDetailsComponent } from "./UI/Common/employee-details/employee-details.component";
import { ValidationMessageComponent } from "./UI/Common/validation-message/validation-message.component";
import { AddressComponent } from "./UI/Common/address/address.component";
import { ButtonDoubleClickDirective } from "./Directives/button-double-click.directive";
import { AlphaNumericDirective } from "./Directives/alpha-numeric.directive";
import { AlphanumericcharsonlyDirective } from "./Directives/alphanumericcharsonly.directive";
import { appAlphanumericwithSpecialCharactersDirective } from "./Directives/AlphaNumericWithSpecialCharacters.directive";
import { PropertyDetailsComponent } from "./UI/Common/property-details/property-details.component";
import { MovablePropertyDetailsComponent } from "./UI/Common/movable-property-details/movable-property-details.component";
import { TimeMaskDirective } from "./Directives/time-mask.directive";

///
import { ChequemanagementViewComponent } from "../app/UI/accounting/masters/Chequemanagement/chequemanagement-view.component";
import { ChequemanagementMasterComponent } from "../app/UI/accounting/masters/Chequemanagement/chequemanagement-master.component";
import { AccountsMasterComponent } from "../app/UI/accounting/masters/Accounts/accounts-master.component";
import { AccountsViewComponent } from "../app/UI/accounting/masters/Accounts/accounts-view.component";
import { BankViewComponent } from "../app/UI/accounting/masters/Bankinformation/bank-view.component";
import { BankMasterComponent } from "../app/UI/accounting/masters/Bankinformation/bank-master.component";

import { GeneralreceiptViewComponent } from "../app/UI/accounting/Transactions/Generalreceipt/generalreceipt-view.component";
import { GeneralreceiptNewComponent } from "../app/UI/accounting/Transactions/Generalreceipt/generalreceipt-new.component";
import { PaymentvoucherViewComponent } from "../app/UI/accounting/Transactions/Paymentvoucher/paymentvoucher-view.component";
import { PaymentvoucherNewComponent } from "../app/UI/accounting/Transactions/Paymentvoucher/paymentvoucher-new.component";
import { JournalvoucherNewComponent } from "../app/UI/accounting/Transactions/Journalvoucher/journalvoucher-new.component";
import { JournalvoucherViewComponent } from "../app/UI/accounting/Transactions/Journalvoucher/journalvoucher-view.component";

import { ChequesonhandNewComponent } from "../app/UI/accounting/Transactions/Chequesonhand/chequesonhand-new.component";
import { ChequesissuedNewComponent } from "../app/UI/accounting/Transactions/Chequesissued/chequesissued-new.component";
import { ChequesinbankNewComponent } from "../app/UI/accounting/Transactions/Chequesinbank/chequesinbank-new.component";

import { IfsccodevalidatorDirective } from "./Directives/ifsccodevalidator.directive";

import { ContextMenuModule } from "@progress/kendo-angular-menu";
import { TreeViewModule } from "@progress/kendo-angular-treeview";
import { AmazingTimePickerModule } from "amazing-time-picker";

import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
import { AddMenuComponent } from "./UI/Settings/add-menu/add-menu.component";
import { UserRightsComponent } from "./UI/Settings/user-rights/user-rights.component";

import { GeneralReceiptReportsComponent } from "./UI/accounting/reports/general-receipt-reports.component";
import { PaymentVoucherReportsComponent } from "./UI/accounting/./reports/payment-voucher-reports.component";
import { NumberToWordsPipe } from "./Pipes/number-to-words.pipe";
import { UsersviewComponent } from "./UI/Settings/Users/usersview/usersview.component";
import { UsersregistrationComponent } from "./UI/Settings/Users/usersregistration/usersregistration.component";
import { CashBookComponent } from "./UI/accounting/reports/cash-book.component";
import { BankBookComponent } from "./UI/accounting/reports/bank-book.component";
import { UppercaseDirective } from "./Directives/uppercase.directive";

import { LoginComponent } from "./login/login.component";
import { UserLoginComponent } from "./UI/Settings/Users/user-login/user-login.component";
import { JwtInterceptor } from "./Services/Settings/Users/_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./Services/Settings/Users/_helpers/error.interceptor";
import { AuthGuard } from "./Services/Settings/Users/_helpers/auth.guard";
import { AccountLedgerComponent } from "./UI/accounting/reports/account-ledger.component";
import { DayBookComponent } from "./UI/accounting/reports/day-book.component";
import { PartyLedgerComponent } from "./UI/accounting/reports/party-ledger.component";

import { BankReconStatmentComponent } from "./UI/accounting/reports/bank-recon-statment.component";
import { TrialBalanceComponent } from "./UI/accounting/reports/trialbalance/trial-balance.component";

import { AutoFocusDirective } from "./Directives/auto-focus.directive";

import { BalanceSheetComponent } from "./UI/accounting/reports/balance-sheet.component";
import { ProfitAndLossComponent } from "./UI/accounting/reports/profit-and-loss.component";
import { ComparisionTrialBalanceComponent } from "./UI/accounting/reports/comparision-trial-balance.component";
import { AccountSummaryDetailsComponent } from "./UI/accounting/reports/account-summary-details.component";
import { RePrintComponent } from "./UI/accounting/reports/re-print.component";
import { JournalVoucherReportComponent } from "./UI/accounting/reports/journal-voucher-report.component";
import { CompanyDetailsComponent } from "./UI/Common/company-details/company-details.component";
import { TrialbalanceLedgersummeryComponent } from "./UI/accounting/reports/trialbalance/trialbalance-ledgersummery.component";
import { TrialbalanceAccountledgerComponent } from "./UI/accounting/reports/trialbalance/trialbalance-accountledger.component";

import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";

import { RemoveZeroDirective } from "./Directives/remove-zero.directive";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgSelectModule } from "@ng-select/ng-select";
import { ZeroDirective } from "./Directives/zero.directive";

import { GenerateidMasterComponent } from "./UI/Settings/generateid-master/generateid-master.component";
import { ChequeEnquiryComponent } from "./UI/accounting/reports/cheque-enquiry/cheque-enquiry.component";
import { JvListComponent } from "./UI/accounting/reports/jv-list/jv-list.component";
import { LedgerExtractComponent } from "./UI/accounting/reports/ledger-extract/ledger-extract.component";
import { ChequeCancelComponent } from "./UI/accounting/reports/cheque-cancel/cheque-cancel.component";
import { ChequeReturnComponent } from "./UI/accounting/reports/cheque-return/cheque-return.component";

import { IssuedChequeComponent } from "./UI/accounting/reports/issued-cheque/issued-cheque.component";

import { CompanyConfigComponent } from "./UI/Settings/company-config/company-config.component";
import { BranchConfigComponent } from "./UI/Settings/branch-config/branch-config.component";
import { CompanyconfigDocumentsComponent } from "./UI/Settings/company-config/companyconfig-documents/companyconfig-documents.component";
import { CompanyconfigPromotorsComponent } from "./UI/Settings/company-config/companyconfig-promotors/companyconfig-promotors.component";

import { SubaccountLedgerComponent } from "./UI/accounting/reports/subaccount-ledger/subaccount-ledger.component";
import { MembertypeViewComponent } from "./UI/Banking/Masters/Membertype/membertype-view.component";
import { MembertypeNewComponent } from "./UI/Banking/Masters/Membertype/membertype-new.component";
import { MemberNewComponent } from "./UI/Banking/Masters/Member/member-new.component";
import { MemberViewComponent } from "./UI/Banking/Masters/Member/member-view.component";
import { CompanydocumentsComponent } from "./UI/Common/companydocuments/companydocuments.component";

import { SubledgerSummaryComponent } from "./UI/accounting/reports/subledger-summary/subledger-summary.component";
import { RdconfigNewComponent } from "./UI/Banking/Masters/Rdconfig/rdconfig-new.component";
import { RdconfigViewComponent } from "./UI/Banking/Masters/Rdconfig/rdconfig-view.component";
import { SavingsConfigNewComponent } from "./UI/Banking/Masters/Savings-AC/savings-config-new.component";
import { SavingsConfigViewComponent } from "./UI/Banking/Masters/Savings-AC/savings-config-view.component";
import { SharesConfigViewComponent } from "./UI/Banking/Masters/Shares/shares-config-view.component";
import { SharesConfigNewComponent } from "./UI/Banking/Masters/Shares/shares-config-new.component";
import { CompanynameCompanycodeComponent } from "./UI/Common/companyname-companycode/companyname-companycode.component";

import { ShareCapitalComponent } from "./UI/Banking/Masters/Shares/share-capital.component";
import { ShareReferralCommissionComponent } from "./UI/Banking/Masters/Shares/share-referral-commission.component";

import { SavingsNameCodeComponent } from "./UI/Banking/Masters/Savings-AC/savings-name-code.component";
import { SavingsConfigurationComponent } from "./UI/Banking/Masters/Savings-AC/savings-configuration.component";
import { LoanFacilityComponent } from "./UI/Banking/Masters/Savings-AC/loan-facility.component";
import { ReferralCommissionComponent } from "./UI/Banking/Masters/Savings-AC/referral-commission.component";
import { IdentificationDocumentsComponent } from "./UI/Common/identification-documents/identification-documents.component";
import { DecimalwithcurrencyformatDirective } from "./Directives/decimalwithcurrencyformat.directive";
import { ProfitandLossMTDYTDComponent } from "./UI/accounting/reports/profitand-loss-mtdytd/profitand-loss-mtdytd.component";

import { RdnameandcodeComponent } from "./UI/Banking/Masters/Rdconfig/rdnameandcode.component";
import { RdconfigurationComponent } from "./UI/Banking/Masters/Rdconfig/rdconfiguration.component";
import { RdloanandfacilityComponent } from "./UI/Banking/Masters/Rdconfig/rdloanandfacility.component";
import { RdidentificationComponent } from "./UI/Banking/Masters/Rdconfig/rdidentification.component";
import { RdrefferalcommisionComponent } from "./UI/Banking/Masters/Rdconfig/rdrefferalcommision.component";
import { CurrencypipewithdecimalPipe } from "./Pipes/currencypipewithdecimal.pipe";
import { FiKycandidentificationComponent } from "./UI/Loans/Transactions/FIIndividual/fi-kycandidentification.component";
import { NegativevaluePipe } from "./Pipes/negativevalue.pipe";
import { FiReferencesComponent } from "./UI/Loans/Transactions/FIIndividual/fi-references.component";
import { FiReferralComponent } from "./UI/Loans/Transactions/FIIndividual/fi-referral.component";
import { FiPersonaldetailsComponent } from "./UI/Loans/Transactions/FIIndividual/fi-personaldetails.component";
import { LayoutCreationComponent } from "./UI/Plots/layout-creation/layout-creation.component";
import { PlotDetailsComponent } from "./UI/Plots/plot-details/plot-details.component";
import { PlotBookingComponent } from "./UI/Plots/plot-booking/plot-booking.component";
import { MemberReceiptComponent } from "./UI/Plots/member-receipt/member-receipt.component";
import { ExtraTypesComponent } from "./UI/Plots/configuration/extra-types/extra-types.component";
import { LandComponent } from "./UI/Plots/land/land.component";
import { LayoutComponent } from "./UI/Plots/layout/layout.component";
import { ContactViewComponent } from "./UI/Loans/Masters/contact/contact-view.component";
import { ContactComponent } from "./UI/Loans/Masters/contact/contact.component";
import { ContactIndividualComponent } from "./UI/Loans/Masters/contact/contact-individual.component";
import { ContactBusinessComponent } from "./UI/Loans/Masters/contact/contact-business.component";
import { ProjectMasterComponent } from "./UI/Plots/configuration/project-master/project-master.component";
import { CompanyMasterComponent } from "./UI/Plots/configuration/company-master/company-master.component";
import { CompanymasterDocumentsComponent } from "./UI/Plots/configuration/companymaster-documents/companymaster-documents.component";
import { CompanymasterPromotorsComponent } from "./UI/Plots/configuration/companymaster-promotors/companymaster-promotors.component";
import { ProjectmasterDocumentsComponent } from "./UI/Plots/configuration/projectmaster-documents/projectmaster-documents.component";
import { ProjectmasterPromotorsComponent } from "./UI/Plots/configuration/projectmaster-promotors/projectmaster-promotors.component";
import { LayoutViewComponent } from "./UI/Plots/layout-creation/layout-view.component";
import { PlotDetailsViewComponent } from "./UI/Plots/plot-details/plot-details-view.component";
import { ChargeconfigurationMasterComponent } from "./UI/HomesInventory/Masters/charges/chargeconfiguration-master.component";
import { LandPurchaseComponent } from "./UI/HomesInventory/Masters/land-purchase/land-purchase.component";
import { PlotsLayoutsCreationComponent } from "./UI/HomesInventory/Masters/plots-layouts-creation/plots-layouts-creation.component";
import { LandPurchaseViewComponent } from "./UI/HomesInventory/Masters/land-purchase/land-purchase-view.component";
import { CompaniesCreationComponent } from "./UI/Settings/companies-creation/companies-creation.component";
// import { LandPurchaseComponent } from './UI/Inventory/configuration/land-purchase/land-purchase.component';
import { DocumentsComponent } from "./UI/Loans/Masters/documents/documents.component";
import { AgmCoreModule } from "@agm/core";
import { CompaniesCreationViewComponent } from "./UI/Settings/companies-creation/companies-creation-view.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { Page } from "./UI/Common/Paging/page";
import { ExtraTypesConfigurationComponent } from "./UI/HomesInventory/Masters/extra-types-configuration/extra-types-configuration.component";
import { BranchCreationComponent } from "./UI/Settings/branch-creation/branch-creation.component";
import { PlotsLayoutsViewComponent } from "./UI/HomesInventory/Masters/plots-layouts-creation/plots-layouts-view.component";
import { LandDetailsViewComponent } from "./UI/HomesInventory/Masters/land-purchase/land-details-view.component";
import { BranchCreationViewComponent } from "./UI/Settings/branch-creation/branch-creation-view/branch-creation-view.component";
import { CommercialBuildingComponent } from "./UI/commercial-building/commercial-building.component";
import { LandSelectComponent } from "./UI/Settings/land-select/land-select.component";
import { DiscountsComponent } from "./UI/HomesInventory/Masters/discounts/discounts.component";
import { CommercialBuildingViewComponent } from "./UI/commercial-building/commercial-building-view.component";
import { CommercialBuildingDetailsViewComponent } from "./UI/commercial-building/commercial-building-details-view.component";
import { PlotsLayoutDetailsViewComponent } from "./UI/HomesInventory/Masters/plots-layouts-creation/plots-layout-details-view/plots-layout-details-view.component";
import { LayoutStandardRateDetailsComponent } from "./UI/HomesInventory/Masters/layout-standard-rate-details/layout-standard-rate-details.component";
import { ResidentialApartmentsComponent } from "./UI/HomesInventory/Masters/residential-apartments/residential-apartments.component";
import { ResidentialApartmentsViewComponent } from "./UI/HomesInventory/Masters/residential-apartments/residential-apartments-view.component";
import { InstallmentConfigurationComponent } from "./UI/HomesInventory/Masters/installment-configuration/installment-configuration.component";
import { ContactNewBusinessComponent } from "./UI/Loans/Masters/contact-new/contact-new-business.component";
import { ContactNewDetailedComponent } from "./UI/Loans/Masters/contact-new/contact-new-detailed.component";
import { ContactNewIndividualComponent } from "./UI/Loans/Masters/contact-new/contact-new-individual.component";
import { ContactNewPhotouploadComponent } from "./UI/Loans/Masters/contact-new/contact-new-photoupload.component";
import { ContactNewViewComponent } from "./UI/Loans/Masters/contact-new/contact-new-view.component";
import { ContactNewComponent } from "./UI/Loans/Masters/contact-new/contact-new.component";
import { SelectsubscriberComponent } from "./UI/Loans/Masters/contact-new/selectsubscriber.component";
import { ContactMoreComponent } from "./UI/Loans/Masters/contact-more/contact-more.component";
import { BankdetailsNewComponent } from "./UI/Common/bankdetails-new/bankdetails-new.component";
import { KycdocumentsNewComponent } from "./UI/Common/kycdocuments-new/kycdocuments-new.component";
import { EmployeeDetailsNewComponent } from "./UI/Common/employee-details/employee-details-new.component";
import { LayoutInventoryStatusReportComponent } from "./UI/HomesInventory/Reports/layout-inventory-status-report/layout-inventory-status-report.component";
import { CadreCommissionComponent } from "./UI/HomesInventory/Masters/cadre-commission/cadre-commission.component";
import { CadreCommissionViewComponent } from "./UI/HomesInventory/Masters/cadre-commission-view/cadre-commission-view.component";
import { CourtCaseDetailsComponent } from "./UI/HomesInventory/Masters/court-case-details/court-case-details.component";
import { CourtCaseDetails1Component } from "./UI/HomesInventory/Masters/court-case-details1/court-case-details1.component";
import { HearingDetailsComponent } from "./UI/HomesInventory/Masters/hearing-details/hearing-details.component";
import { ViewCourtCaseDetailsComponent } from "./UI/HomesInventory/Masters/view-court-case-details/view-court-case-details.component";
import { ViewHearingDetailsComponent } from "./UI/HomesInventory/Masters/view-hearing-details/view-hearing-details.component";
import { MenuSortingComponent } from "./UI/Settings/menu-sorting/menu-sorting.component";
import { LandPurchaseNewComponent } from "./UI/HomesInventory/Masters/land-purchase-new/land-purchase-new.component";
import { DocumentDetailsNewComponent } from "./UI/HomesInventory/Masters/document-details-new/document-details-new.component";
import { MutationDetailsComponent } from "./UI/HomesInventory/Masters/mutation-details/mutation-details.component";
import { MutationViewComponent } from "./UI/HomesInventory/Masters/mutation-view/mutation-view.component";
import { AllocatingMutationComponent } from "./UI/HomesInventory/Masters/allocating-mutation/allocating-mutation.component";
import { ViewAllocatingMutationComponent } from "./UI/HomesInventory/Masters/view-allocating-mutation/view-allocating-mutation.component";
import { AllocatingMutationDummyComponent } from "./UI/HomesInventory/Masters/allocating-mutation-dummy/allocating-mutation-dummy.component";
import { ConversionDetailsComponent } from "./UI/HomesInventory/Masters/conversion-details/conversion-details.component";
import { ViewConversionDetailsComponent } from "./UI/HomesInventory/Masters/view-conversion-details/view-conversion-details.component";
import { AllocatingConversionDetailsComponent } from "./UI/HomesInventory/Masters/allocating-conversion-details/allocating-conversion-details.component";
import { ViewAllocatedConversionComponent } from "./UI/HomesInventory/Masters/view-allocated-conversion/view-allocated-conversion.component";
import { LayoutDetailsNewComponent } from "./UI/HomesInventory/Masters/layout-details-new/layout-details-new.component";
import { LayoutDetailsViewComponent } from "./UI/HomesInventory/Masters/layout-details-view/layout-details-view.component";
import { ViewCourtCaseDetailsNewComponent } from "./UI/HomesInventory/Masters/view-court-case-details-new/view-court-case-details-new.component";
import { CourtCaseDocumentDetailsComponent } from "./UI/HomesInventory/Masters/court-case-document-details/court-case-document-details.component";
import { ReportWithCompanyDetailsComponent } from "./UI/HomesInventory/Masters/report-with-company-details/report-with-company-details.component";
import { LayoutDetailsNewUpdComponent } from "./UI/HomesInventory/Masters/layout-details-new-upd/layout-details-new-upd.component";
import { MutationDocumentDetailsComponent } from "./UI/HomesInventory/Masters/mutation-document-details/mutation-document-details.component";
import { ConversionDocumentDetailsComponent } from "./UI/HomesInventory/Masters/conversion-document-details/conversion-document-details.component";
import { LayoutExtensionComponent } from "./UI/HomesInventory/Masters/layout-extension/layout-extension.component";
import { ViewLayoutExtensionComponent } from "./UI/HomesInventory/Masters/view-layout-extension/view-layout-extension.component";
import { PurchaseOfLandComponent } from "./UI/HomesInventory/Reports/purchase-of-land/purchase-of-land.component";
import { MutationOfLandComponent } from "./UI/HomesInventory/Reports/mutation-of-land/mutation-of-land.component";
import { PurchaseOfLandLatestComponent } from "./UI/HomesInventory/Reports/purchase-of-land-latest/purchase-of-land-latest.component";
import { ConversionOfLandComponent } from "./UI/HomesInventory/Reports/conversion-of-land/conversion-of-land.component";
import { LayoutPlotsComponent } from "./UI/HomesInventory/Reports/layout-plots/layout-plots.component";
import { LandPurchaseUpdateComponent } from "./UI/HomesInventory/Masters/land-purchase-update/land-purchase-update.component";
import { LayoutPlotsNewComponent } from "./UI/HomesInventory/Reports/layout-plots-new/layout-plots-new.component";
import { Dummy1Component } from "./UI/Settings/dummy1.component";

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: "DD/MM/YYYY",
  });
}

const appRoutes: Routes = [
  { path: "", component: UserLoginComponent },

  {
    path: "",
    component: NavigationComponent,
    children: [
      {
        path: "Dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },

      { path: "AdvocateLawyerView", component: AdvocateLawyerViewComponent },
      {
        path: "AdvocateLawyerMaster",
        component: AdvocateLawyerMasterComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "AdvocateLawyerMaster/:id",
        component: AdvocateLawyerMasterComponent,
      },
      { path: "ReferralAgentView", component: ReferralAgentViewComponent },
      { path: "ReferralAgentMaster", component: ReferralAgentMasterComponent },
      {
        path: "ReferralAgentMaster/:id",
        component: ReferralAgentMasterComponent,
      },
      { path: "PartyView", component: PartyViewComponent },
      {
        path: "PartyMaster",
        component: PartyMasterComponent,
        canActivate: [AuthGuard],
      },
      { path: "PartyMaster/:id", component: PartyMasterComponent },
      {
        path: "GroupView",
        component: GroupViewComponent,
        canActivate: [AuthGuard],
      },
      { path: "GroupCreation", component: GroupCreationComponent },
      { path: "EmployeeView", component: EmployeeViewComponent },
      { path: "EmployeeMaster", component: EmployeeMasterComponent },
      { path: "EmployeeMaster/:id", component: EmployeeMasterComponent },
      {
        path: "CompaniesCreation",
        component: CompaniesCreationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Commercial Building",
        component: CommercialBuildingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Installment Configuration",
        component: InstallmentConfigurationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "BranchCreation",
        component: BranchCreationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "AccountsView",
        component: AccountsViewComponent,
        canActivate: [AuthGuard],
      },
      { path: "BankView", component: BankViewComponent },
      {
        path: "ChequemanagementView",
        component: ChequemanagementViewComponent,
      },
      { path: "AccountsMaster", component: AccountsMasterComponent },
      {
        path: "BankMaster",
        component: BankMasterComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ChequemanagementMaster",
        component: ChequemanagementMasterComponent,
        canActivate: [AuthGuard],
      },
      { path: "GeneralreceiptView", component: GeneralreceiptViewComponent },
      { path: "PaymentvoucherView", component: PaymentvoucherViewComponent },
      { path: "JournalvoucherView", component: JournalvoucherViewComponent },
      {
        path: "GeneralreceiptNew",
        component: GeneralreceiptNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "PaymentvoucherNew",
        component: PaymentvoucherNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "JournalvoucherNew",
        component: JournalvoucherNewComponent,
        canActivate: [AuthGuard],
      },
      { path: "GeneralreceiptNew/:id", component: GeneralreceiptNewComponent },
      { path: "PaymentvoucherNew/:id", component: PaymentvoucherNewComponent },
      { path: "JournalvoucherNew/:id", component: JournalvoucherNewComponent },
      {
        path: "ChequesonHandNew",
        component: ChequesonhandNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ChequesinBankNew",
        component: ChequesinbankNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ChequesIssuedNew",
        component: ChequesissuedNewComponent,
        canActivate: [AuthGuard],
      },
      { path: "ContactForm", component: ContactComponent },
      { path: "ContactMore", component: ContactMoreComponent },
      { path: "ContactNew", component: ContactNewComponent },
      {
        path: "ContactNewViewDetailed",
        component: ContactNewDetailedComponent,
      },
      {
        path: "PlotUnitDetailReport",
        component: LayoutInventoryStatusReportComponent,
      },
      { path: "ContactViewNew", component: ContactNewViewComponent },
      { path: "ContactView", component: ContactViewComponent },
      { path: "ContactIndividual", component: ContactIndividualComponent },
      { path: "ContactBusiness", component: ContactBusinessComponent },
      {
        path: "AddMenu",
        component: AddMenuComponent,
        canActivate: [AuthGuard],
      },
      { path: "AddMenu/:id", component: AddMenuComponent },
      {
        path: "UserRights",
        component: UserRightsComponent,
        canActivate: [AuthGuard],
      },
      { path: "UserRights/:id", component: UserRightsComponent },
      { path: "UsersView", component: UsersviewComponent },
      { path: "UsersRegistration", component: UsersregistrationComponent },
      {
        path: "CashBook",
        component: CashBookComponent,
        canActivate: [AuthGuard],
      },
      { path: "CashBook/:id", component: CashBookComponent },
      {
        path: "BankBook",
        component: BankBookComponent,
        canActivate: [AuthGuard],
      },
      { path: "BankBook/:id", component: BankBookComponent },
      {
        path: "AccountLedger",
        component: AccountLedgerComponent,
        canActivate: [AuthGuard],
      },
      { path: "AccountLedger/:id", component: AccountLedgerComponent },
      {
        path: "DayBook",
        component: DayBookComponent,
        canActivate: [AuthGuard],
      },
      { path: "DayBook/:id", component: DayBookComponent },
      {
        path: "TrialBalance",
        component: TrialBalanceComponent,
        canActivate: [AuthGuard],
      },
      { path: "TrialBalance/:id", component: TrialBalanceComponent },
      {
        path: "PartyLedger",
        component: PartyLedgerComponent,
        canActivate: [AuthGuard],
      },
      { path: "PartyLedger/:id", component: PartyLedgerComponent },

      {
        path: "BRStatment",
        component: BankReconStatmentComponent,
        canActivate: [AuthGuard],
      },
      { path: "BRStatment/:id", component: BankReconStatmentComponent },
      {
        path: "BalanceSheet",
        component: BalanceSheetComponent,
        canActivate: [AuthGuard],
      },
      { path: "BalanceSheet/:id", component: BalanceSheetComponent },
      {
        path: "ProfitAndLoss",
        component: ProfitAndLossComponent,
        canActivate: [AuthGuard],
      },
      { path: "ProfitAndLoss/:id", component: ProfitAndLossComponent },
      {
        path: "ComparisionTrialBalance",
        component: ComparisionTrialBalanceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ComparisionTrialBalance/:id",
        component: ComparisionTrialBalanceComponent,
      },
      {
        path: "AccountSummaryDetails",
        component: AccountSummaryDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "AccountSummaryDetails/:id",
        component: AccountSummaryDetailsComponent,
      },
      {
        path: "RePrint",
        component: RePrintComponent,
        canActivate: [AuthGuard],
      },
      { path: "RePrint/:id", component: RePrintComponent },

      { path: "GenerateidMaster", component: GenerateidMasterComponent },
      { path: "ChequeEnquiry", component: ChequeEnquiryComponent },
      { path: "ChequeCancel", component: ChequeCancelComponent },
      { path: "ChequeReturn", component: ChequeReturnComponent },
      { path: "IssuedCheque", component: IssuedChequeComponent },
      { path: "JvList", component: JvListComponent },
      { path: "LedgerExtract", component: LedgerExtractComponent },
      { path: "CompanyConfig", component: CompanyConfigComponent },
      { path: "BranchConfig", component: BranchConfigComponent },

      { path: "MembertypeView", component: MembertypeViewComponent },
      { path: "MembertypeNew", component: MembertypeNewComponent },
      // { path: 'Fiindividual/:id', component: FiMasterComponent },
      { path: "MemberNew/:id", component: MemberNewComponent },
      { path: "MemberNew", component: MemberNewComponent },
      { path: "MemberView", component: MemberViewComponent },
      { path: "SubaccountLedgerreports", component: SubaccountLedgerComponent },
      { path: "SubledgerSummary", component: SubledgerSummaryComponent },
      { path: "RdView", component: RdconfigViewComponent },
      { path: "RdNew", component: RdconfigNewComponent },
      { path: "RdNew/:id", component: RdconfigNewComponent },
      { path: "SavingsView", component: SavingsConfigViewComponent },
      { path: "SavingsNew", component: SavingsConfigNewComponent },
      { path: "SharesConfigView", component: SharesConfigViewComponent },
      { path: "SharesConfigNew", component: SharesConfigNewComponent },
      { path: "ProfitandLossMTDYTD", component: ProfitandLossMTDYTDComponent },
      {
        path: "LayoutCreation",
        component: LayoutCreationComponent,
        canActivate: [AuthGuard],
      },
      { path: "LayoutView", component: LayoutViewComponent },
      { path: "PlotBooking", component: PlotBookingComponent },
      {
        path: "PlotDetails",
        component: PlotDetailsComponent,
        canActivate: [AuthGuard],
      },
      { path: "PlotDetailsView", component: PlotDetailsViewComponent },
      { path: "MemberReceipt", component: MemberReceiptComponent },
      { path: "ExtraTypes", component: ExtraTypesComponent },
      { path: "Layout", component: LayoutComponent },
      { path: "Land", component: LandComponent },
      { path: "ContactIndividual", component: ContactIndividualComponent },
      { path: "ContactBusiness", component: ContactBusinessComponent },
      { path: "ContactView", component: ContactViewComponent },
      { path: "ProjectMaster", component: ProjectMasterComponent },
      {
        path: "ProjectmasterDocuments",
        component: ProjectmasterDocumentsComponent,
      },
      {
        path: "ProjectmasterPromotors",
        component: ProjectmasterPromotorsComponent,
      },
      { path: "CompanyMaster", component: CompanyMasterComponent },
      {
        path: "CompanyconfigDocuments",
        component: CompanyconfigDocumentsComponent,
      },
      {
        path: "CompanyconfigPromotors",
        component: CompanyconfigPromotorsComponent,
      },
      // { path: 'LandPurchase', component: LandPurchaseComponent },
      { path: "LandPurchase", component: LandPurchaseNewComponent },
      // { path: 'LandPurchaseNew', component: LandPurchaseNewComponent },
      {
        path: "ChargeconfigurationMaster",
        component: ChargeconfigurationMasterComponent,
      },
      { path: "CadreCommission", component: CadreCommissionComponent },
      { path: "CadreCommissionView", component: CadreCommissionViewComponent },
      { path: "Discounts", component: DiscountsComponent },
      { path: "PlotsLayouts", component: PlotsLayoutsCreationComponent },
      { path: "Documents", component: DocumentsComponent },
      //{ path: 'CourtCaseDetails', component: CourtCaseDetailsComponent },
      { path: "CourtCaseDetails", component: CourtCaseDetails1Component },
      { path: "HearingDetails", component: HearingDetailsComponent },
      {
        path: "ViewCourtCaseDetails",
        component: ViewCourtCaseDetailsComponent,
      },
      { path: "ViewHearingDetails", component: ViewHearingDetailsComponent },
      { path: "MenuSorting", component: MenuSortingComponent },
      { path: "DocumentDetails", component: DocumentDetailsNewComponent },
      // { path: 'MutationDetails', component: MutationDetailsComponent },
      {
        path: "MutationDetails",
        component: MutationDetailsComponent,
        runGuardsAndResolvers: "always", // This ensures the component reloads
      },
      { path: "MutationView", component: MutationViewComponent },
      //{ path: 'AllocatingMutation', component: AllocatingMutationComponent },
      {
        path: "AllocatingMutation",
        component: AllocatingMutationDummyComponent,
      },
      {
        path: "AllocatingMutationDummy",
        component: AllocatingMutationDummyComponent,
      },
      {
        path: "ViewAllocatingMutation",
        component: ViewAllocatingMutationComponent,
      },

      { path: "ConversionDetails", component: ConversionDetailsComponent },
      { path: "ConversionView", component: ViewConversionDetailsComponent },
      {
        path: "AllocatingConversionDetails",
        component: AllocatingConversionDetailsComponent,
      },
      {
        path: "ViewAllocatingConversion",
        component: ViewAllocatedConversionComponent,
      },
      { path: "LayoutDetailsNew", component: LayoutDetailsNewComponent },
      { path: "LayoutDetailsNewUpd", component: LayoutDetailsNewUpdComponent },
      { path: "LayoutDetailsView", component: LayoutDetailsViewComponent },
      {
        path: "ViewCourtDetailsNew",
        component: ViewCourtCaseDetailsNewComponent,
      },
      {
        path: "CompanyDetailsReport",
        component: ReportWithCompanyDetailsComponent,
      },
      { path: "LayoutAdd-Ons", component: LayoutExtensionComponent },
      { path: "ViewLayoutAdd-Ons", component: ViewLayoutExtensionComponent },
      //some text
      { path: "LandPurchaseView", component: LandPurchaseViewComponent },
      { path: "CompanyView", component: CompaniesCreationViewComponent },
      {
        path: "ExtraTypesConfiguration",
        component: ExtraTypesConfigurationComponent,
      },
      { path: "AreaStatement", component: PlotsLayoutsViewComponent },
      { path: "Landdetailsview", component: LandDetailsViewComponent },
      {
        path: "CourtCaseDocumentDetails",
        component: CourtCaseDocumentDetailsComponent,
      },
      {
        path: "MutationDocumentDetails",
        component: MutationDocumentDetailsComponent,
      },
      {
        path: "ConversionDocumentDetails",
        component: ConversionDocumentDetailsComponent,
      },

      { path: "BranchCreationView", component: BranchCreationViewComponent },
      {
        path: "CommercialBuildingView",
        component: CommercialBuildingViewComponent,
      },
      {
        path: "PlotsLayoutDetailsViewComponent",
        component: PlotsLayoutDetailsViewComponent,
      },
      {
        path: "LayoutStandardRateDetails",
        component: LayoutStandardRateDetailsComponent,
      },
      {
        path: "ResidentialApartments",
        component: ResidentialApartmentsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ResidentialApartmentsView",
        component: ResidentialApartmentsViewComponent,
      },

      //  REPORTS

      { path: "PurchaseOfLand", component: PurchaseOfLandComponent },
      { path: "MutationOfLand", component: MutationOfLandComponent },
      {
        path: "PurchaseOfLandLatest",
        component: PurchaseOfLandLatestComponent,
      },
      { path: "ConversionOfLand", component: ConversionOfLandComponent },
      { path: "Layout-Plots", component: LayoutPlotsNewComponent },
      { path: "LayoutPlotsNew", component: LayoutPlotsNewComponent },

      // UPDATE SCREENS
      { path: "LandPurchase-Update", component: LandPurchaseUpdateComponent },
      { path: "Dummy1", component: Dummy1Component },
    ],
  },
  { path: "PaymentVoucherReports", component: PaymentVoucherReportsComponent },
  {
    path: "PaymentVoucherReports/:id",
    component: PaymentVoucherReportsComponent,
  },
  { path: "GeneralReceiptReports", component: GeneralReceiptReportsComponent },
  {
    path: "GeneralReceiptReports/:id",
    component: GeneralReceiptReportsComponent,
  },
  { path: "JournalvoucherReport", component: JournalVoucherReportComponent },
  {
    path: "JournalvoucherReport/:id",
    component: JournalVoucherReportComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent,
    NumbersWithZeroDirective,
    NumbersonlyDirective,
    UserLoginComponent,
    AddressformatDirective,
    CharactersonlyDirective,
    UppercaseDirective,
    EmailpatternDirective,
    EmailFormatDirective,
    EnterpriseNameFormatDirective,
    ThreeDigitDecimaNumberDirective,
    TwoDigitDecimaNumberDirective,
    MycurrencyFormatterDirective,
    UppercaseDirective,
    NewlineDirective,
    TitlecasewordDirective,
    AddMenuComponent,
    UserRightsComponent,
    InitCapDirective,
    ReferralAgentViewComponent,
    ReferralAgentMasterComponent,
    AdvocateLawyerMasterComponent,
    AdvocateLawyerViewComponent,
    EmployeeViewComponent,
    EmployeeMasterComponent,
    MycurrencypipePipe,
    IfsccodevalidatorDirective,
    AutoFocusDirective,
    TrialBalanceComponent,
    KYCDocumentsComponent,
    BankdetailsComponent,
    TDSDetailsComponent,
    RoundecimalDirective,

    PartyViewComponent,

    PartyMasterComponent,

    GroupViewComponent,

    GroupCreationComponent,

    ContactSelectComponent,

    PersonalDetailsComponent,

    FamilyDetailsComponent,

    EmployeeDetailsComponent,

    ValidationMessageComponent,
    FiReferencesComponent,
    AddressComponent,
    FiKycandidentificationComponent,
    FiPersonaldetailsComponent,
    ButtonDoubleClickDirective,

    AlphaNumericDirective,
    AlphanumericcharsonlyDirective,
    appAlphanumericwithSpecialCharactersDirective,

    TimeMaskDirective,
    PropertyDetailsComponent,
    MovablePropertyDetailsComponent,

    ChequemanagementViewComponent,
    ChequemanagementMasterComponent,
    AccountsMasterComponent,
    AccountsViewComponent,
    BankViewComponent,
    BankMasterComponent,
    GeneralreceiptViewComponent,
    GeneralreceiptNewComponent,
    PaymentvoucherViewComponent,
    PaymentvoucherNewComponent,
    JournalvoucherNewComponent,
    JournalvoucherViewComponent,
    ChequesonhandNewComponent,
    ChequesissuedNewComponent,
    ChequesinbankNewComponent,
    GeneralReceiptReportsComponent,
    PaymentVoucherReportsComponent,
    NumberToWordsPipe,
    AddMenuComponent,
    UserRightsComponent,
    UsersviewComponent,
    UsersregistrationComponent,
    CashBookComponent,
    BankBookComponent,
    LoginComponent,

    UserLoginComponent,

    AccountLedgerComponent,
    DayBookComponent,
    PartyLedgerComponent,
    BankReconStatmentComponent,
    BalanceSheetComponent,
    ProfitAndLossComponent,
    ComparisionTrialBalanceComponent,
    AccountSummaryDetailsComponent,
    RePrintComponent,
    JournalVoucherReportComponent,
    CompanyDetailsComponent,
    TrialbalanceLedgersummeryComponent,
    TrialbalanceAccountledgerComponent,
    RemoveZeroDirective,
    ZeroDirective,
    GenerateidMasterComponent,
    ChequeEnquiryComponent,
    JvListComponent,
    LedgerExtractComponent,
    ChequeCancelComponent,
    ChequeReturnComponent,
    CompanyConfigComponent,
    BranchConfigComponent,
    CompanyconfigDocumentsComponent,
    CompanyconfigPromotorsComponent,

    MembertypeViewComponent,
    MembertypeNewComponent,
    MemberNewComponent,
    CompanydocumentsComponent,
    MemberViewComponent,
    IssuedChequeComponent,
    SubaccountLedgerComponent,

    RdconfigNewComponent,
    RdconfigViewComponent,
    CompanynameCompanycodeComponent,
    SavingsConfigViewComponent,
    SavingsConfigNewComponent,
    SharesConfigViewComponent,
    SharesConfigNewComponent,
    SubledgerSummaryComponent,
    ShareCapitalComponent,
    ShareReferralCommissionComponent,
    SavingsNameCodeComponent,
    SavingsConfigurationComponent,
    LoanFacilityComponent,
    ReferralCommissionComponent,
    IdentificationDocumentsComponent,
    DecimalwithcurrencyformatDirective,
    ProfitandLossMTDYTDComponent,
    RdnameandcodeComponent,
    RdconfigurationComponent,
    RdloanandfacilityComponent,
    RdidentificationComponent,
    RdrefferalcommisionComponent,
    CurrencypipewithdecimalPipe,

    NegativevaluePipe,
    LayoutCreationComponent,
    PlotDetailsComponent,
    PlotBookingComponent,
    MemberReceiptComponent,
    ExtraTypesComponent,
    ContactViewComponent,
    ContactComponent,
    ContactBusinessComponent,
    ContactIndividualComponent,
    ProjectMasterComponent,
    CompanyMasterComponent,
    CompanymasterDocumentsComponent,
    CompanymasterPromotorsComponent,
    ProjectmasterDocumentsComponent,
    ProjectmasterPromotorsComponent,
    LandComponent,
    LayoutComponent,
    LayoutViewComponent,
    PlotDetailsViewComponent,
    LandPurchaseComponent,
    PlotsLayoutsCreationComponent,
    LandPurchaseViewComponent,
    CompaniesCreationComponent,
    ChargeconfigurationMasterComponent,
    PlotsLayoutsCreationComponent,
    DocumentsComponent,
    CompaniesCreationViewComponent,
    ExtraTypesConfigurationComponent,
    BranchCreationComponent,
    PlotsLayoutsViewComponent,
    LandDetailsViewComponent,
    CommercialBuildingComponent,
    LandSelectComponent,
    BranchCreationViewComponent,
    DiscountsComponent,
    CommercialBuildingViewComponent,
    CommercialBuildingDetailsViewComponent,
    PlotsLayoutDetailsViewComponent,
    LayoutStandardRateDetailsComponent,
    ResidentialApartmentsComponent,
    ResidentialApartmentsViewComponent,
    InstallmentConfigurationComponent,
    ContactNewBusinessComponent,
    ContactNewDetailedComponent,
    ContactNewIndividualComponent,
    ContactNewPhotouploadComponent,
    ContactNewViewComponent,
    ContactNewComponent,
    SelectsubscriberComponent,
    ContactMoreComponent,
    BankdetailsNewComponent,
    KycdocumentsNewComponent,
    EmployeeDetailsNewComponent,
    LayoutInventoryStatusReportComponent,
    CadreCommissionViewComponent,
    CadreCommissionComponent,
    CourtCaseDetailsComponent,
    CourtCaseDetails1Component,
    HearingDetailsComponent,
    ViewCourtCaseDetailsComponent,
    ViewHearingDetailsComponent,
    MenuSortingComponent,
    LandPurchaseNewComponent,
    DocumentDetailsNewComponent,
    MutationDetailsComponent,
    MutationViewComponent,
    AllocatingMutationComponent,
    ViewAllocatingMutationComponent,
    AllocatingMutationDummyComponent,
    ConversionDetailsComponent,
    ViewConversionDetailsComponent,
    AllocatingConversionDetailsComponent,
    ViewAllocatedConversionComponent,
    LayoutDetailsNewComponent,
    LayoutDetailsViewComponent,
    ViewCourtCaseDetailsNewComponent,
    CourtCaseDocumentDetailsComponent,
    ReportWithCompanyDetailsComponent,
    LayoutDetailsNewUpdComponent,
    MutationDocumentDetailsComponent,
    ConversionDocumentDetailsComponent,
    LayoutExtensionComponent,
    ViewLayoutExtensionComponent,
    PurchaseOfLandComponent,
    MutationOfLandComponent,
    PurchaseOfLandLatestComponent,
    ConversionOfLandComponent,
    LayoutPlotsComponent,
    LandPurchaseUpdateComponent,
    LayoutPlotsNewComponent,
    Dummy1Component,
  ],
  imports: [
    FormsModule,
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAdjvx40arfFIKZTq6bIenG586DP5kjJFw",
    }),
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
    AmazingTimePickerModule,
    ReactiveFormsModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    GridModule,
    NgSelectModule,
    ExcelModule,
    PDFModule,
    NgMultiSelectDropDownModule.forRoot(),
    FilterPipeModule,
    NgxDatatableModule,
    ContextMenuModule,
    TreeViewModule,
    NgxLoadingModule.forRoot({}),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      // timeOut: 1000,
      positionClass: "toast-top-right",
      closeButton: true,
      preventDuplicates: true,
    }),

    RouterModule.forRoot(appRoutes, {
      useHash: true,
      scrollPositionRestoration: "enabled",
    }),

    PDFExportModule,
    Ng2SearchPipeModule,
    AutocompleteLibModule,
  ],
  providers: [
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    { provide: LOCALE_ID, useValue: "en-IN" },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CookieService,
    DatePipe,
    TitleCasePipe,
    NegativevaluePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

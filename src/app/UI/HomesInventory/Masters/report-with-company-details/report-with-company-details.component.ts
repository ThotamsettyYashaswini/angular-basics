import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FIIndividualService } from 'src/app/Services/Loans/Transactions/fiindividual.service';

@Component({
  selector: 'app-report-with-company-details',
  templateUrl: './report-with-company-details.component.html',
  styles: []
})
export class ReportWithCompanyDetailsComponent implements OnInit {
  reportwithLayoutForm:FormGroup;
  layoutList: any = [];

  constructor(private fb:FormBuilder, private fIIndividualService:FIIndividualService) { }

  ngOnInit() {

    this.reportwithLayoutForm = this.fb.group({
      layoutName: ['']
    });
    this.getLandBankDetails();
  }

  getLandBankDetails() {
    debugger
    this.fIIndividualService.Getlandbankdertails().subscribe(json => {
      if (json != null) {
        this.layoutList = json;

        this.layoutList = this.layoutList.map(item => ({...item, plandbanname: this.toTitleCase(item.plandbanname)})).sort((a, b) => a.plandbanname.localeCompare(b.plandbanname));
      }

    })
  }
  toTitleCase(str: string): string {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  layoutnameChange(event){}

}

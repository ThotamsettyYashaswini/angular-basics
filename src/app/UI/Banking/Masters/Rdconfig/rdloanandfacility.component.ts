import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-rdloanandfacility',
  templateUrl: './rdloanandfacility.component.html',
  styles: []
})
export class RdloanandfacilityComponent implements OnInit {

  constructor(private fb:FormBuilder,private _CommonService:CommonService) { }
  Rdloanfacilityform:FormGroup
  isloanfacilityaplicable=false
  isloanage=false
  islockin=false;
  islatefeeapplicable=false;

  forFixed:boolean = false;
  forPercentage:boolean = false;

  ngOnInit() 
  {
    this.isloanfacilityaplicable = false
    this.isloanage = false
    this.islockin = false;
    this.islatefeeapplicable=false;
    this.forFixed = true;
    this.forPercentage = false;
    this.Rdloanfacilityform = this.fb.group({
      precordid: 0,
      pIsloanfacilityapplicable: false,
      pEligiblepercentage: 0,
      pIsloanageperiod: false,
      pAgeperiod: 0,
      pAgeperiodtype: [''],
      pIsprematuretylockingperiod: false,
      pPrematuretyageperiod: 0,
      pPrematuretyageperiodtype: [''],
      pIslatefeepayble: false,
      pLatefeepaybletype: ['comfixed'],
      pLatefeepayblevalue: 0,
      pLatefeeapplicablefrom: 0,
      pLatefeeapplicabletype: [''],
      pTypeofOperation:['CREATE'] ,
      pCreatedby: [this._CommonService.pCreatedby],
     
    })
  }
  Loanfacility(event)
  {
    this.Rdloanfacilityform.patchValue({
      pEligiblepercentage: ''
    })
    if(event.target.checked)
    {
      this.isloanfacilityaplicable=true
    }
    else{
      this.isloanfacilityaplicable=false
    }
  }
  Loanageperiod(event)
  {
    this.Rdloanfacilityform.patchValue({
      pAgeperiod: ''
    })
    if(event.target.checked)
    {
      this.isloanage=true
    }
    else{
      this.isloanage=false
    }
  }
  Lockinperiod(event)
  {
    this.Rdloanfacilityform.patchValue({
      pPrematuretyageperiod: ''
    })
    if(event.target.checked)
    {
      this.islockin=true
    }
    else{
      this.islockin=false
    }
  }
  Latefeeapplicable(event)
  {
    this.Rdloanfacilityform.patchValue({
      pLatefeepaybletype: 'comfixed',
      pLatefeepayblevalue: ''
    })
    if(event.target.checked)
    {
      this.islatefeeapplicable=true
    }
    else{
      this.islatefeeapplicable=false
    }
  }

  latefeePayablechange(type) {
    if(type == 'fixed') {
      this.forFixed = true;
      this.forPercentage = false;
      this.Rdloanfacilityform.patchValue({
        pLatefeepayblevalue: ''
      })
    }
    else {
      this.forFixed = false;
      this.forPercentage = true;
      this.Rdloanfacilityform.patchValue({
        pLatefeepayblevalue: ''
      })
    }
  }
}

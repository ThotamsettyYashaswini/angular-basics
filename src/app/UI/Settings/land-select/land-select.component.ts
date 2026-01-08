import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';
import { CommercialBuildingService } from 'src/app/Services/commercial-building.service';
import { CommercialBuildingComponent } from '../../commercial-building/commercial-building.component';

@Component({
  selector: 'app-land-select',
  templateUrl: './land-select.component.html',
  styles: []
})
export class LandSelectComponent implements OnInit {
  templanddata: any;
  Landdata: any;
  landbankid: any;
  landradiodisabled: boolean = false;
  @ViewChild(CommercialBuildingComponent, { static: false }) commercialbuilding;
  @Output() private selectavailablearea = new EventEmitter<number>();
  

  constructor(private _plotcreationservices: PlotcreationService, private _commercialbuildingServices: CommercialBuildingService) { }

  ngOnInit() {
    debugger;
    this.landbankid = '';
    this.landbankid = this._commercialbuildingServices._SetBankData();
    if (this.landbankid != 0) { this.landradiodisabled = true; } else { this.landradiodisabled = false; }
    this._commercialbuildingServices._SetAvailabledata('nodata');
    this._commercialbuildingServices._GetBankData(0);
    this._commercialbuildingServices._SetAvailablearea(0);

    this.getLanddata();
  }

  getLanddata() {
    this.Landdata = '';
    this.templanddata='';
    this._plotcreationservices.getLanddata().subscribe(data => {

      this.templanddata = data;
      // landdataarray=data;
      this.Landdata = this.templanddata.filter(function (data) {
        return data.availableareaINACRESvalue > 0;
      });

      // this.Landdata = data;
      this._commercialbuildingServices._SetAllAvailabledata(this.Landdata);

      if (this.Landdata == '') {
        this._commercialbuildingServices._SetAvailabledata('nodata');

      }
      else {
        this._commercialbuildingServices._SetAvailabledata('data');

      }
    })
  }

  checkFixedDepositGridRow(rowIndex, row) {
    debugger
    let bankid = row.landbankid;
    let availablearea = row.availableareaINACRES;
    console.log(bankid);
    this._commercialbuildingServices._GetBankData(bankid);
    this._commercialbuildingServices._SetAvailablearea(availablearea);
    this.selectavailablearea.emit(row);

  }

}

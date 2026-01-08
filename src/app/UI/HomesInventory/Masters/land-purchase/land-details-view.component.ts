import { Component, OnInit } from '@angular/core';
import { LandBankService } from 'src/app/Services/HomesInventory/LandBank.service';
import { CommercialBuildingService } from 'src/app/Services/commercial-building.service';

@Component({
  selector: 'app-land-details-view',
  templateUrl: './land-details-view.component.html',
  styles: []
})
export class LandDetailsViewComponent implements OnInit {
  LandDetails: any;
  NameOfLandPurchased: any;
  landpurchasetype: any;
  public Address: any = [];
  purchasedetails: any = [];
  LayoutsDetails: any = [];
  CommercialViewdata: any = [];
  ResidentialViewdata: any = [];
  CommercialResidential: any = [];
  Commercial: any = [];
  Residential: any = [];
  TotalAreainAcres: any;
  TotalAreainSquareYards: any;
  BalanceAreainAcres: any;
  BalanceAreainSquareYards: any;
  AvailableAcres: any;
  AvailableSquareYards: any;


  CommercialAcres: any;
  CommercialSquareYards: any;

  ResidentialAcres: any;
  ResidentialSquareYards: any;
  purchasedate: any;
  totalarea: any;
  totallandvalue: any;
  constructor(private _LandBankservice: LandBankService, private _Commercialbuildingservice: CommercialBuildingService) { }

  ngOnInit() {

    this.purchasedetails = [];
    this.LayoutsDetails = [];
    this.CommercialViewdata = [];
    this.ResidentialViewdata = [];
    this.CommercialResidential = [];
    this.Commercial = [];
    this.Residential = [];
    this._LandBankservice.GetLandDetailsViewbyid$.subscribe(res => {
      this.LandDetails = '';
      this.NameOfLandPurchased = '';
      this.landpurchasetype = "";
      this.purchasedetails = [];
      this.Address = [];
      this.LayoutsDetails = [];

      this.TotalAreainAcres = 0;
      this.TotalAreainSquareYards = 0;
      this.BalanceAreainAcres = 0;
      this.BalanceAreainSquareYards = 0;

      this.CommercialAcres = 0;
      this.CommercialSquareYards = 0;

      this.AvailableAcres = 0;
      this.AvailableSquareYards = 0;
      let landbankid = res["value"];
      this.getLanddata(landbankid);
    });
  }
  getLanddata(landbankid) {
    this._LandBankservice.GetLandPurchaseddetailsDetailed(landbankid).subscribe(data => {
      debugger
      this.LandDetails = data;
      this.NameOfLandPurchased = this.LandDetails.nameofland;
      this.landpurchasetype = this.LandDetails.landpurchasetype;
      this.totallandvalue = this.LandDetails.totallandvalue;
      this.totalarea = this.LandDetails.totalarea;
      this.purchasedate = this.LandDetails.purchasedate;
      if (this.LandDetails.addressDetailsStoreDTO.length != 0) {
       this.Address =this.LandDetails.addressDetailsStoreDTO[0];
        //  this.Address = this.LandDetails.addressDetailsStoreDTO[0].paddress1 + ' , ' + this.LandDetails.addressDetailsStoreDTO[0].paddress2 + ' , ' + this.LandDetails.addressDetailsStoreDTO[0].pCountry + ' , ' + this.LandDetails.addressDetailsStoreDTO[0].pState + ' , ' + this.LandDetails.addressDetailsStoreDTO[0].pcity + ' , ' + this.LandDetails.addressDetailsStoreDTO[0].pDistrict + '-' + this.LandDetails.addressDetailsStoreDTO[0].pincode + '.';
      }
      else {
        this.Address =[];
      }
      this.purchasedetails = this.LandDetails.purchasedetailsDTO;
      let TotalAreaAcres = this.purchasedetails.reduce((sum, item) => sum + item.totallandareainacres, 0);
      this.TotalAreainAcres = Number(TotalAreaAcres).toFixed(3);
      let TotalAreaSquareYards = this.purchasedetails.reduce((sum, item) => sum + item.totalareainysquareyards, 0);
      this.TotalAreainSquareYards = Number(TotalAreaSquareYards).toFixed(3);
      this.getLayoutsdata(landbankid);
      this.getCBdata(landbankid);
    });

  }
  getLayoutsdata(landbankid) {
    this._LandBankservice.GetLayoutsdetailsDetailed(landbankid).subscribe(data => {
      this.LayoutsDetails = data;
      if (this.LayoutsDetails.length != 0) {
        let BalanceAreaAcres = this.LayoutsDetails.reduce((sum, item) => sum + item.layoutareainAcres, 0);
        this.BalanceAreainAcres = Number(BalanceAreaAcres).toFixed(3);
        let BalanceAreaSquareYards = this.LayoutsDetails.reduce((sum, item) => sum + item.layoutareainsquareYards, 0);
        this.BalanceAreainSquareYards = Number(BalanceAreaSquareYards).toFixed(3);

      }
      else {
        this.BalanceAreainAcres = 0;
        this.BalanceAreainSquareYards = 0;

      }
      // this.AvailableAcres=Number(this.TotalAreainAcres-this.BalanceAreainAcres).toFixed(2);
      // this.AvailableSquareYards=Number(this.TotalAreainSquareYards-this.BalanceAreainSquareYards).toFixed(2);
    });
  }
  getCBdata(landbankid) {
    debugger
    this._Commercialbuildingservice.GetCommercialResidentialViewdataDetailed(2).subscribe(data => {
      this.Commercial = data;

      if (this.Commercial.length != 0) {
        let CommercialinAcres = this.Commercial.reduce((sum, item) => sum + item.bulidingareainAcres, 0);
        this.CommercialAcres = Number(CommercialinAcres).toFixed(3);
        let CommercialinSquareYards = this.Commercial.reduce((sum, item) => sum + item.buildingareainSquareyards, 0);
        this.CommercialSquareYards = Number(CommercialinSquareYards).toFixed(3);

      }
      else {
        this.CommercialAcres = 0;
        this.CommercialSquareYards = 0;

      }
      this.getavailableArea();

      if (this.Commercial.length != 0) {

        this.CommercialViewdata = data
      }
      else {
        this.CommercialViewdata = [];
      }
    });

    this._Commercialbuildingservice.GetCommercialResidentialViewdataDetailed(3).subscribe(data => {
      this.Residential = data;

      if (this.Residential.length != 0) {
        let ResidentialinAcres = this.Residential.reduce((sum, item) => sum + item.bulidingareainAcres, 0);
        this.ResidentialAcres = Number(ResidentialinAcres).toFixed(3);
        let ResidentialinSquareYards = this.Residential.reduce((sum, item) => sum + item.buildingareainSquareyards, 0);
        this.ResidentialSquareYards = Number(ResidentialinSquareYards).toFixed(3);

      }
      else {
        this.ResidentialAcres = 0;
        this.ResidentialSquareYards = 0;

      }
      this.getavailableArea();

      if (this.Residential.length != 0) {
        this.ResidentialViewdata = data
      }
      else {
        this.ResidentialViewdata = [];
      }
    });
  }

  getavailableArea() {
    debugger
    let bacres = this.BalanceAreainAcres;
    let commAcres = this.CommercialAcres;
    let ResAcres = this.ResidentialAcres;
    // let AvlbleAcre = (this.BalanceAreainAcres + this.CommercialAcres + this.ResidentialAcres);
    let AvlbleAcre = parseFloat(bacres) + parseFloat(commAcres) + parseFloat(ResAcres);
    this.AvailableAcres = Number(this.TotalAreainAcres - AvlbleAcre).toFixed(3);

    let AvlbleSquareYards = Number(Number(this.BalanceAreainSquareYards)+ Number(this.CommercialSquareYards) +Number(this.ResidentialSquareYards));
    this.AvailableSquareYards = Number(Number(this.TotalAreainSquareYards) - AvlbleSquareYards).toFixed(3);

  }

}
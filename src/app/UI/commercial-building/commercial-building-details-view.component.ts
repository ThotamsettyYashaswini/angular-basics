import { Component, OnInit, ViewChild } from '@angular/core';
import { CommercialBuildingService } from 'src/app/Services/commercial-building.service';
@Component({
  selector: 'app-commercial-building-details-view',
  templateUrl: './commercial-building-details-view.component.html',
  styles: [],
  
})

export class CommercialBuildingDetailsViewComponent implements OnInit {
  ProjectName:any;
  ProjectType:any;
  LandName:any;
  NoOfBlockTowers:any;
  commercialbuildingdata:any=[];
  commercialbuildingdatasub:any=[];
  commercialbuildingdataunit:any=[];
  commercialbuildingdataunits:any=[];
  commercialbuildingdataunitsempty:any=[]; 
  lstCBblocksfloorinventory:any=[];
  @ViewChild('myTable', { static: false }) table :any;
  
  constructor(private _commercialbuildingService: CommercialBuildingService) { }

  ngOnInit() {
    debugger

  this._commercialbuildingService.GetCommercialBuildingbyid$.subscribe(res => {
    debugger;
    this.ProjectName='';
    this.ProjectType='';
    this.LandName='';
    this.NoOfBlockTowers=0;
    this.commercialbuildingdataunits=[];
    this.commercialbuildingdataunitsempty=[];
    this.commercialbuildingdatasub=[];
    this.commercialbuildingdataunit=[];
    this.commercialbuildingdataunits=[];
    this.commercialbuildingdata=[];
    this.lstCBblocksfloorinventory=[];
    let  buildingid=res["value"];
   // this.getcommercialbuildingdata(buildingid);
    this.GetDatafromView(buildingid);

  });
  }

  // getcommercialbuildingdata(buildingid){
  //   this._commercialbuildingService.GetcommercialbuildingdetailsDetailed(buildingid).subscribe(data => {
  //     this.commercialbuildingdata=data;
  //     this.ProjectName=this.commercialbuildingdata.projectname;
  //     this.ProjectType=this.commercialbuildingdata.itemtype;
  //     this.LandName=this.commercialbuildingdata.landname;
  //     this.NoOfBlockTowers=this.commercialbuildingdata.noofblocks;
  //     this.lstCBblocksfloorinventory=this.commercialbuildingdata.lstCBblocksfloorinventory;
  //   });
  // }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  
  toggleExpandGroup(group) {
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }  
  GetDatafromView(buildingid){
    debugger
    this._commercialbuildingService.GetcommercialbuildingdetailsDetailed(buildingid).subscribe(data => {
      debugger;
     this.ProjectName=data.projectname;
      this.ProjectType=data.itemtype;
      this.LandName=data.landname;
      this.NoOfBlockTowers=data.noofblocks; 
      this.lstCBblocksfloorinventory=data.lstCBblocksfloorinventory;
      this.lstCBblocksfloorinventory=this.lstCBblocksfloorinventory.filter(row=>
      row.noofsubdivisions==0 && row.totalnoofunits==0)
         })

       this._commercialbuildingService.GetAreaStatementbyprojectid(buildingid).subscribe(data=>{
          debugger;
          console.log("area statement data ",data)
          this.commercialbuildingdata=data;
          this.commercialbuildingdatasub=this.commercialbuildingdata.filter(row=>
          row.subdivisioncount>0
          )
          if(this.commercialbuildingdataunitsempty.length==0){
           this.commercialbuildingdataunitsempty=this.commercialbuildingdata.filter(row=>
           row.subdivisioncount==0 && row.unitscount==0)
          }
        })
        

      this._commercialbuildingService.GetCBFloorUnitsAreaStatementbyprojectid(buildingid).subscribe(data=>{
         debugger;
          console.log("area units statement data ",data)
          this.commercialbuildingdataunit=data;
          this.commercialbuildingdataunits=this.commercialbuildingdataunit.filter(row=>
          row.unitscount>0)
          if(this.commercialbuildingdataunitsempty.length==0){
                this.commercialbuildingdataunitsempty=this.commercialbuildingdataunit.filter(row=>
             row.unitscount==0 && row.subdivisioncount==0)
          }
            
          
     
 })
  }
}

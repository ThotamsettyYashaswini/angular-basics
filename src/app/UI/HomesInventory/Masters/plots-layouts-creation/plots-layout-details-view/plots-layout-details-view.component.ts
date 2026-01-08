import { Component, OnInit, Input } from '@angular/core';
import { PlotcreationService } from 'src/app/Services/HomesInventory/plotcreation.service';

@Component({
  selector: 'app-plots-layout-details-view',
  templateUrl: './plots-layout-details-view.component.html',
  styles: []
})
export class PlotsLayoutDetailsViewComponent implements OnInit {

  Layoutname: any;
  ProjectType: any;
  LandName: any;
  NoOfplots: any;
  Plotsdetailsdata: any = [];
  layoutId: any;
  individualPlotData: any = [];
  constructor(private _plotsService: PlotcreationService) { }
  ngOnInit() {
    debugger
    this.individualPlotData = [];
    this.Layoutname = '';
    this.ProjectType = '';
    this.LandName = '';
    this.NoOfplots = 0;
    this.Plotsdetailsdata = [];
    this.layoutId = '';
    this._plotsService.Getlayoutbyid$.subscribe(res => {
      let layoutId = res["value"];
      this.layoutId = layoutId;
      this.getLayoutplotsdetails(layoutId);
    });
  }

  getLayoutplotsdetails(layoutid) {
    debugger
    this._plotsService.GetLayoutplotsdetailsbylayoutid(layoutid).subscribe(res => {
      debugger;
      this.Plotsdetailsdata = res;
      this.Plotsdetailsdata = res.sort((a, b) => a.plotno - b.plotno);
    })
  }
  GetPlotnodetails(event) {
    debugger;
    let plotNo = event.currentTarget.innerText;
    this._plotsService.GetPlotnodetails(plotNo, this.layoutId).subscribe(json => {
      this.individualPlotData = json;
    })
  }

}

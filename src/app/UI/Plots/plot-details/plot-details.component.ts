import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plot-details',
  templateUrl: './plot-details.component.html',
  styles: []
})
export class PlotDetailsComponent implements OnInit {

  constructor() { }
  debitcarddetails = false;
  ngOnInit() {
  }

  bankdebitcardchecked(event) {

debugger
    if (event.target.checked == true) {

      this.debitcarddetails = true;
    }
    else {
    this.debitcarddetails = false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Nav } from 'src/app/services/nav.service';


@Component({
  selector: 'app-discount-location',
  templateUrl: './discount-location.page.html',
  styleUrls: ['./discount-location.page.scss'],
})
export class DiscountLocationPage implements OnInit {

  constructor(public nav: Nav) { 
    console.log("on discount page");
    console.log(nav.get('data'));
  }

  ngOnInit() {
  }

}

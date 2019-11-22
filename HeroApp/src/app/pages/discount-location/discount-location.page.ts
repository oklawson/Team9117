import { Component, OnInit } from '@angular/core';
import { Nav } from 'src/app/services/nav.service';


@Component({
  selector: 'app-discount-location',
  templateUrl: './discount-location.page.html',
  styleUrls: ['./discount-location.page.scss'],
})
export class DiscountLocationPage implements OnInit {

  Image: string | null;
  Title: string | null;
  Location: string | null;
  Discount: string | null;
  Limitations: string | null;
  UnlimitedUsage: string | null;
  LocationType: string | null;


  constructor(public nav: Nav) { 
    console.log("on discount page");
    console.log(nav.get('data'));
    let data = nav.get('data');

    this.Image = data.Image;
    this.Title = data.Title;
    this.Location = data.Location;
    this.Discount = data.Discount;
    this.Limitations = data.Limitations;
    this.UnlimitedUsage = data.UnlimitedUsage;
    this.LocationType = data.LocationType;
  }

  ngOnInit() {
  }

}

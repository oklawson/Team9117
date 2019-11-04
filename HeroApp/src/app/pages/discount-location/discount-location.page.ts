import { Component, OnInit } from '@angular/core';
import { Nav } from 'src/app/services/nav.service';


@Component({
  selector: 'app-discount-location',
  templateUrl: './discount-location.page.html',
  styleUrls: ['./discount-location.page.scss'],
})
export class DiscountLocationPage implements OnInit {


  title: string | null;
  rating: string | null;
  address: string | null;
  hours: string | null;
  description: string | null;


  constructor(public nav: Nav) { 
    console.log("on discount page");
    console.log(nav.get('data'));
    let data = nav.get('data');

    this.title = data.title;
    this.rating = data.rating;
    this.address = data.address;
    this.hours = data.hours;
    this.description = data.description;
  }

  ngOnInit() {
  }

}

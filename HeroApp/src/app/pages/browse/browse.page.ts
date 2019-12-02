import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../popover/popover.component';

import { FirebaseService } from 'src/app/services/firebase.service';
import { Nav } from 'src/app/services/nav.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})

export class BrowsePage implements OnInit {

  cards = [
    // {
    //   Image: "Image",
    //   Title: "Title",
    //   Location: "Location",
    //   Discount: "Discount",
    //   Limitations: "Limitations",
    //   UnlimitedUsage: "UnlimitedUsage",
    //   LocationType: "LocationType",
    //   Latitude: "Latitude",
    //   Longitude: "Longitude"
    // },
  ];

  allCards = [];

  UserLat: number | null;
  UserLong: number | null;

  constructor(
    public nav: Nav,
    private firebaseService: FirebaseService,
    public popoverController: PopoverController,
    private geolocation: Geolocation
  )
  {
    console.log("Browse page constructor");

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.UserLat = data.coords.latitude;
      this.UserLong = data.coords.longitude;
      console.log("user's latitude: " + this.UserLat);
      console.log("user's longitude: " + this.UserLong);
    });

    function distance(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295;
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 +
              c(lat1 * p) * c(lat2 * p) *
              (1 - c((lon2 - lon1) * p))/2;

      return 12742 * Math.asin(Math.sqrt(a));
    }

    this.firebaseService.getLocationListData().subscribe(
    (data) => {
      console.log("data");
      data.forEach(
      (d) => {
        if (!d.data().Title)
        {
          //console.log(d.data());
          //console.log(d.data().LocationType);
        }
        else
        {
          const dist = distance(d.data().Latitude, d.data().Longitude, this.UserLat, this.UserLong);
          console.log(dist);
          this.cards.push(
            {
              Image: d.data().Image,
              Title: d.data().Title,
              Location: d.data().Location,
              Discount: d.data().Discount,
              Limitations: d.data().Limitations,
              UnlimitedUsage: d.data().UnlimitedUsage,
              LocationType: d.data().LocationType,
              Latitude: d.data().Latitude,
              Longitude: d.data().Longitude,
              Distance: dist
            }
          );
          this.allCards.push(
            {
              Image: d.data().Image,
              Title: d.data().Title,
              Location: d.data().Location,
              Discount: d.data().Discount,
              Limitations: d.data().Limitations,
              UnlimitedUsage: d.data().UnlimitedUsage,
              LocationType: d.data().LocationType,
              Latitude: d.data().Latitude,
              Longitude: d.data().Longitude,
              Distance: dist
            }
          );
        }

      });
    });

  }

  goToDetailPage(inp: any) {
    console.log(inp);
    this.nav.push('/discount-location', {data: inp});

  }

  search(query) {
    const searchBar = document.querySelector('ion-searchbar');
    console.log(searchBar.value);

    this.cards = this.allCards.filter(card => card.Title.toLowerCase().includes(searchBar.value.toLowerCase()));
  }


  async presentPopover(ev: any) {
    console.log(ev);
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then((dataReturned) => {
      const locationType = dataReturned.data.locationType;
      const sortBy = dataReturned.data.sortBy;

      // edit to have first char uppercase - wasn't working all lowercase
      const filteredLocation = locationType.charAt(0).toUpperCase() + locationType.slice(1);
      console.log("location type: " + filteredLocation);
      console.log("sort by: " + sortBy);

      if (filteredLocation == "All") {
        this.cards = this.allCards;
      } else {
        this.cards = this.allCards.filter(card => card.LocationType.includes(filteredLocation));
      }

      if (sortBy == "alphabetical") {
        this.cards.sort(function(a, b) {
            var textA = a.Title.toUpperCase();
            var textB = b.Title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      } else if (sortBy == "distance") {
        this.cards.sort(function(a, b) {
          if (isFinite(a.Distance - b.Distance)) {
            return (a.Distance - b.Distance);
          } else {
            return isFinite(a.Distance) ? -1 : 1;
          }
        })
      }
    });

    return await popover.present();
  }

  ngOnInit() {
  }




  // const searchbar = document.querySelector('ion-searchbar');
  // const items = Array.from(document.querySelector('ion-card').children);
  // searchbar.addEventListener('ionInput', handleInput);
  // function handleInput(event) {
  //   const query = event.target.value.toLowerCase();
  //   requestAnimationFrame(() => {
  //     items.forEach(item => {
  //       const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
  //       item.style.display = shouldShow ? 'block' : 'none';
  //     });
  //   });
  // };

}

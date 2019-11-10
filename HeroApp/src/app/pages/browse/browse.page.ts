import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../popover/popover.component';


import { FirebaseService } from 'src/app/services/firebase.service';
import { Nav } from 'src/app/services/nav.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})

export class BrowsePage implements OnInit {

  cards = [
    {
      Title: "Title",
      Location: "Location",
      Discount: "Discount",
      Limitations: "Limitations",
      UnlimitedUsage: "UnlimitedUsage",
      LocationType: "LocationType"
    },
  ];

  allCards = [];

  constructor(
    public nav: Nav,
    private firebaseService: FirebaseService,
    public popoverController: PopoverController
  )
  {
    console.log("Browse page constructor");
    this.firebaseService.getLocationListData().subscribe(
    (data) => {
      console.log("data");
      data.forEach(
      (d) => {
        if (!d.data().Title)
        {
          console.log(d.data());
          console.log(d.data().LocationType);
        }
        else
        {
          this.cards.push(
            {
              Title: d.data().Title,
              Location: d.data().Location,
              Discount: d.data().Discount,
              Limitations: d.data().Limitations,
              UnlimitedUsage: d.data().UnlimitedUsage,
              LocationType: d.data().LocationType,

            }
          );
          this.allCards.push(
            {
              Title: d.data().Title,
              Location: d.data().Location,
              Discount: d.data().Discount,
              Limitations: d.data().Limitations,
              UnlimitedUsage: d.data().UnlimitedUsage,
              LocationType: d.data().LocationType,
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
      console.log("data returned: " + dataReturned);
      const locationType = dataReturned.data.locationType;

      // edit to have first char uppercase - wasn't working all lowercase
      const filteredLocation = locationType.charAt(0).toUpperCase() + locationType.slice(1);
      console.log("location type: " + filteredLocation);

      this.cards = this.allCards.filter(card => card.LocationType.includes(filteredLocation));
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

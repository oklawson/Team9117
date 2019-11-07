import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
=======
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../popover/popover.component';


import { FirebaseService } from 'src/app/services/firebase.service';
import { Nav } from 'src/app/services/nav.service';
>>>>>>> ab43e3cacf2b9a2cabe01e41e227dab1821d8878

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})

export class BrowsePage implements OnInit {

  cards = [
    {
<<<<<<< HEAD
      title: "Title 1",
      subtitle: "Subtitle 1",
      description: "Description 1",
      // tags: "Tags",
    },
    {
      title: "Title 2",
      subtitle: "Subtitle 2",
      description: "Description 2",
      // tags: "Tags",
    }
  ];

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
    // public searchbar = document.querySelector('ion-searchbar'),
    // public items = Array.from(document.querySelector('ion-list').children),
  )
  {
    // searchbar.addEventListener('ionInput', handleInput);

=======
      title: "Title",
      subtitle: "Subtitle",
      description: "Description",
      rating: "Rating",
      address: "Address",
      hours: "Hours",
    },
  ];

  constructor(
    public nav: Nav,
    private firebaseService: FirebaseService,
    public popoverController: PopoverController
  )
  {
    console.log("Browse page constructor");
>>>>>>> ab43e3cacf2b9a2cabe01e41e227dab1821d8878
    this.firebaseService.getLocationListData().subscribe(
    (data) => {
      console.log("data");
      console.log(data);
      data.forEach(
      (d) => {
        console.log(d);
        this.cards.push(
          {
            title: d.data().title,
            subtitle: d.data().subtitle,
            description: d.data().description,
            rating: d.data().rating,
            address: d.data().address,
            hours: d.data().hours,
          }
        );

      });
    });

  }

<<<<<<< HEAD
  // handleInput(event) {
  //   const query = event.target.value.toLowerCase();
  //   requestAnimationFrame(() => {
  //     items.forEach(item => {
  //       const shouldShow = item.title.toLowerCase().indexOf(query) > -1;
  //       item.style.display = shouldShow ? 'block' : 'none';
  //     });
  //   });
  // }

  ngOnInit() {
=======
  goToDetailPage(inp: any) {
    console.log(inp);
    this.nav.push('/discount-location', {data: inp});
>>>>>>> ab43e3cacf2b9a2cabe01e41e227dab1821d8878
  }

  async presentPopover(ev: any) {
    console.log(ev);
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
      const locationType = dataReturned.data.locationType;
      const sortBy = dataReturned.data.sortBy;

      //TODO: implement filtering based on returned data
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

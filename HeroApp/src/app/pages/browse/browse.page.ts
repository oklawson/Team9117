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
      title: "Title 1",
      subtitle: "Subtitle 1",
      description: "Description 1",
    },
    {
      title: "Title 2",
      subtitle: "Subtitle 2",
      description: "Description 2",
    }
  ];

  constructor(
    public nav: Nav,
    private firebaseService: FirebaseService,
    public popoverController: PopoverController
  )
  {
    this.firebaseService.getLocationListData().subscribe(
    (data) => {
      data.forEach(
      (d) => {
        this.cards.push(
          {
            title: d.data().title,
            subtitle: d.data().subtitle,
            description: d.data().description,
          }
        );

      });
    });
  }

  goToDetailPage(inp: any) {
    console.log(inp);
    this.nav.push('/discount-location', {data: inp});
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

  goToDiscountLocation() {
    this.navCtrl.navigateForward('/discount-location')
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

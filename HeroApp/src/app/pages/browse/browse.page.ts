import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

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

    this.firebaseService.getLocationListData().subscribe(
    (data) => {
      data.forEach(
      (d) => {
        console.log(d.data());

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

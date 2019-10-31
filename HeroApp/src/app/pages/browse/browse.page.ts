import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
    public navCtrl: NavController,
  ) { }

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

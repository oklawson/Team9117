import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, Events } from '@ionic/angular';
// import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  page;

  constructor(
    private events: Events,
    private navParams: NavParams,
    private popoverController: PopoverController) {

  }

  ngOnInit() {
    //Get data from popover page
    this.page = this.navParams.get('data');
  }

  apply() {
    // let sortBy = document.querySelector('#sort-by') as HTMLInputElement;
    let locationType = document.querySelector('#location-type') as HTMLInputElement;

    this.events.publish('fromPopoverEvent');
    const onClosedData = {
      // sortBy: sortBy.value,
      locationType: locationType.value
    };
    this.popoverController.dismiss(onClosedData);
  }
}

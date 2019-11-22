import { Component, OnInit } from '@angular/core';

import readXlsxFile from 'read-excel-file';

import { FirebaseService } from 'src/app/services/firebase.service';
 
@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  input;

  constructor(
    private firebaseService: FirebaseService,
  ) {
    
  }

  ngAfterViewInit() {
    this.input = document.getElementById('input');
    this.addListener();
    console.log(this.input)
  }

  addListener() {
    this.input.addEventListener('change', () => {
      readXlsxFile(this.input.files[0]).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        
        for(var i = 1; i < rows.length; i++)
        {
          let d = rows[i]; // entire location
          console.log(d);
          let Image = d[0];
          let Title = d[1];
          let Location = d[2];
          let Discount = d[3];
          let Limitations = d[4];
          let UnlimitedUsage = d[5];
          let LocationType = d[6];


          console.log(Image+" "+Title+" "+Location+" "+Discount+" "+Limitations+" "+UnlimitedUsage+" "+LocationType);
          this.firebaseService.uploadDiscountLocation(Image, Title, Location, Discount, Limitations, UnlimitedUsage, LocationType);
        }     
      })
    });
  }

  ngOnInit() {
  }

}

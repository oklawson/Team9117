import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = '';
  sheetsu_url = 'https://sheetsu.com/apis/v1.0su/fee85c97ac5f';

  constructor() { }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import{GlobalDataSummary} from '../models/global-data'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl=`https://api.covid19india.org/data.json`

 
  constructor(private http:HttpClient) { }
  getGlobalData():Observable<any>{
    return this.http.get(this.globalDataUrl)
    

  }
}

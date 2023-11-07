import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../models/stocks/stock';

const API_ENDPOINT = 'https://reveal-api.azurewebsites.net';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(
    private http: HttpClient
  ) { }

  public getStockList(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${API_ENDPOINT}/stocks`);
  }
}

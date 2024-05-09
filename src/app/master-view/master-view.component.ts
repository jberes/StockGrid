import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Stock } from '../models/stocks/stock';
import { StocksService } from '../services/stocks.service';
import { IgxGridComponent } from 'igniteui-angular';
import { fdc3Ready } from '@finos/fdc3';


@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public stocksStock: Stock[] = [];
  public columnVisible: boolean = false;
  public initialSymbol: string [] = [];

  @ViewChild('finGrid', { static: true })
  public finGrid!: IgxGridComponent;

  constructor(
    private stocksService: StocksService,
  ) { }

  ngOnInit() {
    this.stocksService.getStockList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.stocksStock = data;
        this.initialSymbol = [this.stocksStock[0].stock_symbol];
        const selectedStock = this.stocksStock.find(x => x.stock_symbol === this.initialSymbol[0]);
        if (selectedStock) {
          this.handleRowSelection(selectedStock);
        }
      },
      error: () => this.stocksStock = []
    });
  }

  public handleRowSelection(stock: Stock) {
    console.log("Stock Received: " + stock.stock_symbol)
    const _stock = this.stockToFdc3Context(stock.stock_symbol, stock.stock_name);
    if (_stock !== undefined) {
      fdc3Ready().then(() => {
        window.fdc3.broadcast(_stock);
        //window.fdc3.raiseIntent('ViewChart', _stock, app.apps[0].name);
      });
    }
  }

  public stockToFdc3Context(ticker: any, stock_name: any) {
    return {
      type: 'fdc3.instrument',
      name: stock_name,
      id: {
        stock: ticker
      }
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

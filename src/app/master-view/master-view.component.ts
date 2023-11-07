import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Stock } from '../models/stocks/stock';
import { StocksService } from '../services/stocks.service';
import { IRowSelectionEventArgs, IgxGridComponent } from 'igniteui-angular';
import { Context } from '@finos/fdc3';


@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public stocksStock: Stock[] = [];
  public columnVisible: boolean = false;

  @ViewChild('finGrid', { static: true })
  public finGrid!: IgxGridComponent;

  constructor(
    private stocksService: StocksService,
  ) { }

  ngOnInit() {
    this.stocksService.getStockList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.stocksStock = data;
        // I thought this would select the 1st row
        this.finGrid.selectRows([1], true);
      },
      error: () => this.stocksStock = []
    });
  }

  public handleRowSelection(event: IRowSelectionEventArgs) {
    // broadcast fdc3, this will throw and error if the fdc3 is not installed
    const _stock = this.stockToFdc3Context(event.newSelection[0].stock_symbol, event.newSelection[0].stock_name);
    if (_stock !== undefined) {
      window.fdc3.broadcast(_stock);
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
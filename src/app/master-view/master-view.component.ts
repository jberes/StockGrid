import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Stock } from '../models/stocks/stock';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public stocksStock: Stock[] = [];
  public columnVisible: boolean = false;

  constructor(
    private stocksService: StocksService,
  ) {}

  ngOnInit() {
    this.stocksService.getStockList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.stocksStock = data,
      error: (_err: any) => this.stocksStock = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

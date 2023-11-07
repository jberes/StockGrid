export interface Stock {
  id: string;
  company_name: string;
  stock_symbol: string;
  stock_name: string;
  stock_market_cap: string;
  stock_market: string;
  stock_industry: string;
  stock_sector: string;
  country: string;
  longitude: number;
  latitude: number;
  earnings: number;
  expenses: number;
  earnings_date: string;
  previous_close: number;
  day_range: number;
  year_range: number;
  avg_volume: number;
  pe_ratio: number;
  dividend_yield: number;
  img_url: string;
}

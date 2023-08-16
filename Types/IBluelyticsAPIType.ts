export interface IBluelyticsAPIType {
  oficial: {
    value_avg: number;
    value_sell: number;
    value_buy: number;
  },
  blue: {
    value_avg: number;
    value_sell: number;
    value_buy: number;
  },
  oficial_euro: {
    value_avg: number;
    value_sell: number;
    value_buy: number;
  },
  blue_euro: {
    value_avg: number;
    value_sell: number;
    value_buy: number;
  },
  last_update: string;
}

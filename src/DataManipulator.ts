import { ServerRespond } from './DataStreamer';

//The structure of the return object of the only function of the DataManipulator class
export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}

/*
update the generateRow function of the DataManipulator 
class to properly process the raw server data passed to it.
That it can return the processed data which will be rendered by the Graph component’s table
*/
export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row{
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperrBound = 1.05;
    const lowerBound = 0.95;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp? serverRespond[0].timestamp: serverRespond[1].timestamp,
      upper_bound: upperrBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperrBound || ratio < lowerBound) ? ratio : undefined,
      };
  }
}

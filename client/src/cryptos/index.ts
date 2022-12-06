import {Base} from "../base";
import {Routes} from "../routes/routes";

export class Cryptos extends Base {

  getCryptoListings(
      apiInterface: {
        start?: number,
        limit?: number,
        price_min?: number,
        price_max?: number,
        market_cap_min?: number,
        market_cap_max?: number,
        volume_24h_min?: number,
        volume_24h_max?: number,
        circulating_supply_min?: number,
        circulating_supply_max?: number,
        percent_change_24h_min?: number,
        percent_change_24h_max?: number,
        convert?: string,
        convert_id?: string,
        sort?: string,
        sort_dir?: string,
        cryptocurrency_type?: string,
        tag?: string,
        aux?: string
      }
  ): Promise<any> {
    let endpoint = this.constructUrlEndPoint(apiInterface.start, apiInterface.limit, apiInterface.price_min, apiInterface.price_max,
        apiInterface.market_cap_min, apiInterface.market_cap_max, apiInterface.volume_24h_min, apiInterface.volume_24h_max,
        apiInterface.circulating_supply_min, apiInterface.circulating_supply_max,
        apiInterface.percent_change_24h_min, apiInterface.percent_change_24h_max, apiInterface.convert,
        apiInterface.convert_id, apiInterface.sort, apiInterface.sort_dir, apiInterface.cryptocurrency_type,
        apiInterface.tag, apiInterface.aux);
    return this.request(endpoint);
  }

  constructUrlEndPoint(start: number,
                       limit: number,
                       price_min: number,
                       price_max: number,
                       market_cap_min: number,
                       market_cap_max: number, volume_24h_min: number, volume_24h_max: number, circulating_supply_min: number, circulating_supply_max: number,
                       percent_change_24h_min: number,
                       percent_change_24h_max: number,
                       convert: string, convert_id: string, sort: string, sort_dir: string, cryptocurrency_type: string, tag: string, aux: string) {
    let endpoint = `/${Routes.CRYPTO_LISTINGS}?`;

    if (start !== undefined) {
      endpoint += 'start=' + start + '&';
    }
    if (limit !== undefined) {
      endpoint += 'limit=' + limit + '&';
    }
    if (price_min !== undefined) {
      endpoint += 'price_min=' + price_min + '&';
    }
    if (price_max !== undefined) {
      endpoint += 'price_max=' + price_max + '&';
    }
    if (market_cap_min !== undefined) {
      endpoint += 'market_cap_min=' + market_cap_min + '&';
    }
    if (market_cap_max !== undefined) {
      endpoint += 'market_cap_max=' + market_cap_max + '&';
    }
    if (volume_24h_min !== undefined) {
      endpoint += 'volume_24h_min=' + volume_24h_min + '&';
    }
    if (volume_24h_max !== undefined) {
      endpoint += 'volume_24h_max=' + volume_24h_max + '&';
    }
    if (circulating_supply_min !== undefined) {
      endpoint += 'circulating_supply_min=' + circulating_supply_min + '&';
    }
    if (circulating_supply_max !== undefined) {
      endpoint += 'circulating_supply_max=' + circulating_supply_max + '&';
    }
    if (percent_change_24h_min !== undefined) {
      endpoint += 'percent_change_24h_min=' + percent_change_24h_min + '&';
    }
    if (percent_change_24h_max !== undefined) {
      endpoint += 'percent_change_24h_max=' + percent_change_24h_max + '&';
    }
    if (convert !== undefined) {
      endpoint += 'convert=' + convert + '&';
    }
    if (convert_id !== undefined) {
      endpoint += 'convert_id=' + convert_id + '&';
    }
    if (sort !== undefined) {
      endpoint += 'sort=' + sort + '&';
    }

    if (sort_dir !== undefined) {
      endpoint += 'sort_dir=' + sort_dir + '&';
    }
    if (cryptocurrency_type !== undefined) {
      endpoint += 'cryptocurrency_type=' + cryptocurrency_type + '&';
    }
    if (tag !== undefined) {
      endpoint += 'tag=' + tag + '&';
    }
    if (aux !== undefined) {
      endpoint += 'aux=' + aux + '&';
    }
    return endpoint;
  }
}

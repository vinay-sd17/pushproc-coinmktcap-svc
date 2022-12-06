import {ConfigService} from "@nestjs/config";
import {HttpService, Injectable} from "@nestjs/common";

var axios = require('axios');

@Injectable()
export class ListingService {
  constructor(
      private httpService: HttpService,
      private configService: ConfigService
  ) {
  }


  async getListings(start: number,
                    limit: number,
                    price_min: number,
                    price_max: number,
                    market_cap_min: number,
                    market_cap_max: number, volume_24h_min: number, volume_24h_max: number, circulating_supply_min: number, circulating_supply_max: number,
                    percent_change_24h_min: number,
                    percent_change_24h_max: number,
                    convert: string, convert_id: string, sort: string, sort_dir: string, cryptocurrency_type: string, tag: string, aux: string) {
    let url = this.constructUrl(start, limit, price_min, price_max,
        market_cap_min, market_cap_max, volume_24h_min, volume_24h_max, circulating_supply_min, circulating_supply_max,
        percent_change_24h_min, percent_change_24h_max, convert, convert_id, sort, sort_dir, cryptocurrency_type, tag, aux);
    let axiosResponse = await this.httpService.get(
        url,
        {
          headers: {
            'X-CMC_PRO_API_KEY': this.configService.get('X_CMC_PRO_API_KEY'),
            'Accept': '*/*'
          }
        }
    ).toPromise();

    return axiosResponse;
  }

  constructUrl(start: number,
               limit: number,
               price_min: number,
               price_max: number,
               market_cap_min: number,
               market_cap_max: number, volume_24h_min: number, volume_24h_max: number, circulating_supply_min: number, circulating_supply_max: number,
               percent_change_24h_min: number,
               percent_change_24h_max: number,
               convert: string, convert_id: string, sort: string, sort_dir: string, cryptocurrency_type: string, tag: string, aux: string) {
    let url = this.configService.get("MKT_SVC_BASE_URL") + '/v1/cryptocurrency/listings/latest?';
    if (start !== undefined) {
      url += 'start=' + start + '&';
    }
    if (limit !== undefined) {
      url += 'limit=' + limit + '&';
    }
    if (price_min !== undefined) {
      url += 'price_min=' + price_min + '&';
    }
    if (price_max !== undefined) {
      url += 'price_max=' + price_max + '&';
    }
    if (market_cap_min !== undefined) {
      url += 'market_cap_min=' + market_cap_min + '&';
    }
    if (market_cap_max !== undefined) {
      url += 'market_cap_max=' + market_cap_max + '&';
    }
    if (volume_24h_min !== undefined) {
      url += 'volume_24h_min=' + volume_24h_min + '&';
    }
    if (volume_24h_max !== undefined) {
      url += 'volume_24h_max=' + volume_24h_max + '&';
    }
    if (circulating_supply_min !== undefined) {
      url += 'circulating_supply_min=' + circulating_supply_min + '&';
    }
    if (circulating_supply_max !== undefined) {
      url += 'circulating_supply_max=' + circulating_supply_max + '&';
    }
    if (percent_change_24h_min !== undefined) {
      url += 'percent_change_24h_min=' + percent_change_24h_min + '&';
    }
    if (percent_change_24h_max !== undefined) {
      url += 'percent_change_24h_max=' + percent_change_24h_max + '&';
    }
    if (convert !== undefined) {
      url += 'convert=' + convert + '&';
    }
    if (convert_id !== undefined) {
      url += 'convert_id=' + convert_id + '&';
    }
    if (sort !== undefined) {
      url += 'sort=' + sort + '&';
    }

    if (sort_dir !== undefined) {
      url += 'sort_dir=' + sort_dir + '&';
    }
    if (cryptocurrency_type !== undefined) {
      url += 'cryptocurrency_type=' + cryptocurrency_type + '&';
    }
    if (tag !== undefined) {
      url += 'tag=' + tag + '&';
    }
    if (aux !== undefined) {
      url += 'aux=' + aux + '&';
    }
    return url;
  }
}

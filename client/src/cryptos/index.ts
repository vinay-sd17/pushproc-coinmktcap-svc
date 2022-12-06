import {Base} from "../base";
import {Routes} from "../routes/routes";

export class Cryptos extends Base {
  getCryptoListings(): Promise<any> {
    return this.request(`/${Routes.CRYPTO_LISTINGS}`);
  }
}

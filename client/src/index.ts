import {Base} from "./base";
import {applyMixins} from "./utils";
import {Cryptos} from "./cryptos";

class PushProcCoinMktCapClient extends Base {
}

interface PushProcCoinMktCapClient extends Cryptos {
}

applyMixins(PushProcCoinMktCapClient, [Cryptos]);

export default PushProcCoinMktCapClient;

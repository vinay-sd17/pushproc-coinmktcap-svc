import { Base } from "./base";
import { applyMixins } from "./utils";
import {Cryptos} from "./cryptos";

class Typicode extends Base {}
interface Typicode extends Cryptos {}

applyMixins(Typicode, [Cryptos]);

export default Typicode;

import {HttpModule, Module} from '@nestjs/common';
import {ListingsController} from "./controller/listings-controller";
import {ListingService} from "./service/listing-service";

@Module({
  imports: [HttpModule],
  controllers: [ListingsController],
  providers: [ListingService],
  exports: [ListingService]
})
export class CryptoModule {
}

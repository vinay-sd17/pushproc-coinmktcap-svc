import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {
  Controller,
  Get,
  HttpCode,
  Query,
  Req
} from "@nestjs/common";
import {ListingService} from "../service/listing-service";

@Controller('api/crypto')
@ApiBearerAuth('JWT')
@ApiTags("Crypto")
export class ListingsController {

  constructor(private listingService: ListingService) {
  }

  @Get('listings')
  @ApiOperation({summary: 'Get all Projects with NFTs (only necessary fields required for list page will be in response).'})
  @HttpCode(200)
  @ApiQuery({name: 'start', required: false, schema: {default: 1}})
  @ApiQuery({name: 'limit', required: false, schema: {default: 100}})
  @ApiQuery({name: 'price_min', required: false, schema: {default: 0}})
  @ApiQuery({name: 'price_max', required: false, schema: {default: 0}})
  @ApiQuery({name: 'market_cap_min', required: false, schema: {default: 0}})
  @ApiQuery({name: 'market_cap_max', required: false, schema: {default: 0}})
  @ApiQuery({name: 'volume_24h_min', required: false, schema: {default: 0}})
  @ApiQuery({name: 'volume_24h_max', required: false, schema: {default: 0}})
  @ApiQuery({name: 'circulating_supply_min', required: false, schema: {default: 0}})
  @ApiQuery({name: 'circulating_supply_max', required: false, schema: {default: 0}})
  @ApiQuery({name: 'percent_change_24h_min', required: false, schema: {default: -100}})
  @ApiQuery({name: 'percent_change_24h_max', required: false, schema: {default: -100}})
  @ApiQuery({name: 'convert', required: false})
  async findAllForListPage(
      @Query('start') start: number,
      @Query('limit') limit: number = 100,
      @Query('price_min') price_min: number,
      @Query('price_max') price_max: number,
      @Query('market_cap_min') market_cap_min: number,
      @Query('market_cap_max') market_cap_max: number,
      @Query('volume_24h_min') volume_24h_min: number,
      @Query('volume_24h_max') volume_24h_max: number,
      @Query('circulating_supply_min') circulating_supply_min: number,
      @Query('circulating_supply_max') circulating_supply_max: number,
      @Query('percent_change_24h_min') percent_change_24h_min: number,
      @Query('percent_change_24h_max') percent_change_24h_max: number,
      @Query('convert') convert: string = "",
      @Req() request) {
    try {
      let axiosResponse = await this.listingService.getListings(start, limit, price_min, price_max, market_cap_min, market_cap_max, volume_24h_min, volume_24h_max, circulating_supply_min,
          circulating_supply_max, percent_change_24h_min, percent_change_24h_max, convert);
      console.log(axiosResponse);
    } catch (e) {
      console.log(e)
    }

  }
}

import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {
  Controller,
  Get,
  HttpCode,
  Query
} from "@nestjs/common";
import {ListingService} from "../service/listing-service";
import {mapToResponse} from "../../common/utils";
import {Status} from "../../common/status";

@Controller('api/crypto')
@ApiBearerAuth('JWT')
@ApiTags("Crypto")
export class ListingsController {

  constructor(private listingService: ListingService) {
  }

  @Get('listings')
  @ApiOperation({summary: 'Get all Projects with NFTs (only necessary fields required for list page will be in response).'})
  @HttpCode(200)
  @ApiQuery({
    name: 'start',
    description: "Optionally offset the start (1-based index) of the paginated list of items to return",
    required: false,
    schema: {default: 1}
  })
  @ApiQuery({
    name: 'limit',
    description: "Optionally specify the number of results to return. Use this parameter and the \"start\" parameter to determine your own pagination size.",
    required: false,
    schema: {default: 100}
  })
  @ApiQuery({
    name: 'price_min',
    description: "Optionally specify a threshold of minimum USD price to filter results by",
    required: false,
    schema: {default: 0}
  })
  @ApiQuery({
    name: 'price_max',
    description: "Optionally specify a threshold of maximum USD price to filter results by",
    required: false,
    schema: {default: 0}
  })
  @ApiQuery({
    name: 'market_cap_min',
    description: "Optionally specify a threshold of minimum market cap to filter results by",
    required: false,
    schema: {default: 0}
  })
  @ApiQuery({
    name: 'market_cap_max',
    description: "Optionally specify a threshold of maximum market cap to filter results by",
    required: false,
    schema: {default: 0}
  })
  @ApiQuery({
    name: 'volume_24h_min',
    description: "Optionally specify a threshold of minimum 24 hour USD volume to filter results by",
    required: false,
    schema: {default: 0}
  })
  @ApiQuery({
    name: 'volume_24h_max',
    description: "Optionally specify a threshold of maximum 24 hour USD volume to filter results by",
    required: false,
    schema: {default: 0}
  })
  @ApiQuery({
    name: 'circulating_supply_min',
    description: "Optionally specify a threshold of minimum circulating supply to filter results by",
    required: false,
    schema: {default: 0}
  })
  @ApiQuery({
    name: 'circulating_supply_max',
    description: "Optionally specify a threshold of maximum circulating supply to filter results by",
    required: false,
    schema: {default: 0}
  })
  @ApiQuery({
    name: 'percent_change_24h_min',
    description: "Optionally specify a threshold of minimum 24 hour percent change to filter results by",
    required: false,
    schema: {default: -100}
  })
  @ApiQuery({
    name: 'percent_change_24h_max',
    description: "Optionally specify a threshold of maximum 24 hour percent change to filter results by",
    required: false,
    schema: {default: -100}
  })
  @ApiQuery({
    name: 'convert',
    description: "Optionally calculate market quotes in up to 120 currencies at once by passing a comma-separated list of cryptocurrency or fiat currency symbols. Each additional convert option beyond the first requires an additional call credit. A list of supported fiat options can be found here. Each conversion is returned in its own \"quote\" object",
    required: false
  })
  @ApiQuery({
    name: 'convert_id',
    description: "Optionally calculate market quotes by CoinMarketCap ID instead of symbol. This option is identical to convert outside of ID format. Ex: convert_id=1,2781 would replace convert=BTC,USD in your query. This parameter cannot be used when convert is used",
    required: false
  })
  @ApiQuery({
    name: 'sort', required: false,
    description: "What field to sort the list of cryptocurrencies by",
    schema: {
      default: "market_cap",
      "enum": ["market_cap", "name", "symbol", "date_added", "market_cap", "market_cap_strict",
        "price", "circulating_supply", "total_supply", "max_supply", "num_market_pairs",
        "volume_24h", "percent_change_1h", "percent_change_24h", "percent_change_7d",
        "market_cap_by_total_supply_strict", "volume_7d", "volume_30d"]
    }
  })
  @ApiQuery({
    name: 'sort_dir', required: false,
    description: "The direction in which to order cryptocurrencies against the specified sort",
    schema: {
      "enum": ["asc", "desc"]
    }
  })
  @ApiQuery({
    name: 'cryptocurrency_type', required: false,
    description: "The type of cryptocurrency to include",
    schema: {
      default: "all",
      "enum": ["all", "coins", "tokens"]
    }
  })
  @ApiQuery({
    name: 'tag', required: false,
    description: "The tag of cryptocurrency to include",
    schema: {
      default: "all",
      "enum": ["all", "defi", "filesharing"]
    }
  })
  @ApiQuery({
    name: 'aux',
    required: false,
    description: "Optionally specify a comma-separated list of supplemental data fields to return. Pass num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,market_cap_by_total_supply,volume_24h_reported,volume_7d,volume_7d_reported,volume_30d,volume_30d_reported,is_market_cap_included_in_calc to include all auxiliary fields"
  })
  async findAllForListPage(
      @Query('start') start: number,
      @Query('limit') limit: number,
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
      @Query('convert') convert: string,
      @Query('convert_id') convert_id: string,
      @Query('sort') sort: string,
      @Query('sort_dir') sort_dir: string,
      @Query('cryptocurrency_type') cryptocurrency_type: string,
      @Query('tag') tag: string,
      @Query('aux') aux: string)
  {
    try {
      let axiosResponse = await this.listingService.getListings(start, limit, price_min, price_max, market_cap_min, market_cap_max, volume_24h_min, volume_24h_max, circulating_supply_min,
          circulating_supply_max, percent_change_24h_min, percent_change_24h_max, convert,
          convert_id, sort, sort_dir, cryptocurrency_type, tag, aux
      );
      return mapToResponse(axiosResponse.data.data, false, Status.SUCCESS);
    } catch (e) {
      return mapToResponse({
        message: "Error while processing request"
      }, true, Status.FAILURE);
    }
  }
}

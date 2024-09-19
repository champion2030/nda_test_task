import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { EtherscanActions } from '../enums/action.enum';
import { BlockResponse } from '../types/get-block-by-number.response';
import { RecentBlockResponse } from '../types/get-recent-block.response';
import { ModuleName } from '../enums/module-name.enum';
import { etherScan } from '../../../config';

@Injectable()
export class EtherscanService {
  private static readonly baseUrl = 'https://api.etherscan.io/api';

  constructor(private readonly httpClient: HttpService) {}
  public async getTransactionInformationByBlockNumber(
    blockNumber: string,
  ): Promise<BlockResponse> {
    const response = await firstValueFrom(
      this.httpClient.get(EtherscanService.baseUrl, {
        params: {
          module: ModuleName.Proxy,
          action: EtherscanActions.GetBlockByNumber,
          tag: blockNumber,
          boolean: true,
          apikey: etherScan.apiKey,
        },
      }),
    );

    return response?.data;
  }

  public async getRecentBlockNumber(): Promise<RecentBlockResponse> {
    const response = await firstValueFrom(
      this.httpClient.get(EtherscanService.baseUrl, {
        params: {
          module: ModuleName.Proxy,
          action: EtherscanActions.GetRecentBlockNumber,
          apikey: etherScan.apiKey,
        },
      }),
    );
    return response?.data;
  }
}

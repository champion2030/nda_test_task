import { BadRequestException, Injectable } from '@nestjs/common';
import { EtherscanService } from '../../etherscan/services/etherscan.service';
import { BalanceBiggestChangeResponse } from '../types/balance-biggest-change.response';
import { ErrorResponse } from '../../etherscan/types/error.response';
import { numberToHex } from '../../../utils/numberToHex';
import { hexToNumber } from '../../../utils/hexToNumber';

@Injectable()
export class BalanceService {
  constructor(private readonly etherscanService: EtherscanService) {}

  public async getBalanceBiggestChange(): Promise<BalanceBiggestChangeResponse> {
    try {
      const blocksToCheck = 100;
      const recentBlockResponse =
        await this.etherscanService.getRecentBlockNumber();

      if (this.isErrorResponse(recentBlockResponse)) {
        throw new BadRequestException(
          'Request to get recent block number failed with error',
          { description: recentBlockResponse.result },
        );
      }

      const recentBlockNumber = hexToNumber(recentBlockResponse.result);

      const addressBalanceMap = new Map<string, number>();

      for (let i = 0; i < blocksToCheck; i++) {
        const blockNumber = recentBlockNumber - i;
        const transactions =
          await this.etherscanService.getTransactionInformationByBlockNumber(
            numberToHex(blockNumber),
          );

        if (this.isErrorResponse(transactions)) {
          throw new BadRequestException(
            'Request to get recent block number failed with error',
            { description: transactions.result },
          );
        }

        for (const transaction of transactions.result.transactions) {
          const { to, from } = transaction;
          const value = hexToNumber(transaction.value);

          addressBalanceMap.set(
            from,
            (addressBalanceMap.get(from) || 0) - value,
          );

          if (to) {
            addressBalanceMap.set(to, (addressBalanceMap.get(to) || 0) + value);
          }
        }
      }

      let biggestChange = 0;
      let addressWithMostChange = '';

      for (const [address, change] of addressBalanceMap.entries()) {
        if (Math.abs(change) > Math.abs(biggestChange)) {
          biggestChange = change;
          addressWithMostChange = address;
        }
      }

      return {
        address: addressWithMostChange,
        change: biggestChange,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  isErrorResponse<T>(response: ErrorResponse | T): response is ErrorResponse {
    return !!(response as ErrorResponse).status;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { EtherscanService } from '../../etherscan/services/etherscan.service';
import { BalanceBiggestChangeResponse } from '../types/balance-biggest-change.response';
import { ErrorResponse } from '../../etherscan/types/error.response';
import { SuccessBlockResponse } from '../../etherscan/types/get-block-by-number.response';

@Injectable()
export class BalanceService {
  constructor(private readonly etherscanService: EtherscanService) {}

  public async getBalanceBiggestChange(): Promise<BalanceBiggestChangeResponse> {
    try {
      const blocksToCheck = 100;
      const recentBlockResponse =
        await this.etherscanService.getRecentBlockNumber();

      if ((recentBlockResponse as ErrorResponse).status) {
        throw new BadRequestException(
          'Request to get recent block number failed with error',
          { description: recentBlockResponse.result },
        );
      }

      const recentBlockNumber = this.hexToNumber(recentBlockResponse.result);

      const addressBalanceMap = new Map<string, number>();

      for (let i = 0; i < blocksToCheck; i++) {
        const blockNumber = recentBlockNumber - i;
        const transactions =
          await this.etherscanService.getTransactionInformationByBlockNumber(
            this.numberToHex(blockNumber),
          );

        if ((transactions as ErrorResponse).status) {
          throw new BadRequestException(
            'Request to get recent block number failed with error',
            { description: transactions.result as string },
          );
        }

        for (const transaction of (transactions as SuccessBlockResponse).result
          .transactions) {
          const from = transaction.from;
          const to = transaction.to ? transaction.to : null;
          const value = this.hexToNumber(transaction.value);

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

  numberToHex(value: number): string {
    return '0x' + value.toString(16);
  }

  hexToNumber(hexValue: string): number {
    return parseInt(hexValue, 16);
  }
}

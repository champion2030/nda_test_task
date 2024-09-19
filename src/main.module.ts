import { Module } from '@nestjs/common';
import { EtherscanModule } from './modules/etherscan/etherscan.module';
import { BalanceModule } from './modules/balance/balance.module';

@Module({
  imports: [EtherscanModule, BalanceModule],
})
export class MainModule {}

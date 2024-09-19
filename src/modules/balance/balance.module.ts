import { Module } from '@nestjs/common';
import { BalanceService } from './services/balance.service';
import { EtherscanModule } from '../etherscan/etherscan.module';
import { BalanceController } from './controllers/balance.controller';

@Module({
  imports: [EtherscanModule],
  controllers: [BalanceController],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}

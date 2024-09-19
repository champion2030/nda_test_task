import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EtherscanService } from './services/etherscan.service';

@Module({
  imports: [HttpModule],
  providers: [EtherscanService],
  exports: [EtherscanService],
})
export class EtherscanModule {}

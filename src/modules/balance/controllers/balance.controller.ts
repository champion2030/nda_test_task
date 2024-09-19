import { Controller, Get } from '@nestjs/common';
import { BalanceService } from '../services/balance.service';
import { BalanceBiggestChangeResponse } from '../types/balance-biggest-change.response';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('biggest/changed')
  async findBalanceBiggestChange(): Promise<BalanceBiggestChangeResponse> {
    return this.balanceService.getBalanceBiggestChange();
  }
}

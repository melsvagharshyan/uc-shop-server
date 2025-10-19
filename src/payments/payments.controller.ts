import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  createPayment(@Body() body: { orderId: string; amount: number }) {
    const url = this.paymentsService.createPayment(body.orderId, body.amount);
    return { url };
  }

  @Get('callback')
  callback(@Query() query: any) {
    return this.paymentsService.handleCallback(query);
  }
}

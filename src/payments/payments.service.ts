import { Injectable } from '@nestjs/common';
import * as Paysera from 'paysera-nodejs';

@Injectable()
export class PaymentsService {
  private paysera: any;

  constructor() {
    const PayseraClient =
      (Paysera as any).Paysera || (Paysera as any).default || Paysera;

    this.paysera = new PayseraClient({
      projectid: Number(process.env.PAYSERA_PROJECT_ID),
      sign_password: process.env.PAYSERA_SIGN_PASSWORD,
      accepturl: `${process.env.CLIENT_URL}`,
      cancelurl: `${process.env.CLIENT_URL}`,
      callbackurl: `${process.env.SERVER_URL}/payments/callback`,
      test: 0, // 1 = test mode, 0 = production
    });
  }

  createPayment(orderId: string, amount: number) {
    const url = this.paysera.buildRequestUrl({
      orderid: orderId,
      amount: amount * 100, // Paysera expects cents
      currency: 'USD',
    });

    return url;
  }

  handleCallback(query: any) {
    const isValid = this.paysera.checkCallback(query);

    if (!isValid) {
      return { success: false, message: 'Invalid callback' };
    }

    const order = this.paysera.decode(query.data);
    // Here you can mark order as paid in DB
    return { success: true, order };
  }
}

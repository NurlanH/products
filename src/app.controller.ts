import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_category' })
  async createCategory(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.appService.createCategory(data);
  }

  @MessagePattern({ cmd: 'create_product' })
  public async createProduct(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.appService.createProduct(data);
  }

  @MessagePattern({ cmd: 'create_order' })
  public async createOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.appService.createOrder();
  }

  @MessagePattern({ cmd: 'create_loan' })
  public async createLoan(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.appService.createLoan();
  }

  @MessagePattern({ cmd: 'create_invoice' })
  public async createInvoice(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.appService.createInvoice();
  }
}

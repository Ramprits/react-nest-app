/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = new OrderEntity();
    Object.assign(order, createOrderDto);
    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.getOrderBaseQuery().getMany();
  }

  async findOne(id: string): Promise<OrderEntity> {
    return await this.getOrderBaseQuery()
      .andWhere('e.id = :id', { id })
      .getOne();
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private getOrderBaseQuery() {
    return this.orderRepository.createQueryBuilder('e').orderBy('e.id', 'DESC');
  }
}

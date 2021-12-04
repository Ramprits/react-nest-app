import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEntity } from '../app/event/entities/event.entity';
import { UserEntity } from '../app/user/entities/user.entity';
import { AttendeeEntity } from './../app/event/entities/attendee.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: 'inventory',
    entities: [UserEntity, EventEntity, AttendeeEntity],
    synchronize: true,
  })
);

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { UserEntity } from './user/entities/user.entity';
import { EventEntity } from './event/entities/event.entity';

@Module({
  imports: [
    UserModule,
    EventModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      database: 'ecom',
      username: 'postgres',
      password: 'plumtree',
      entities: [UserEntity, EventEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

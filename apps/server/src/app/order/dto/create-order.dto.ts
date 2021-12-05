import { IsString, Length } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @Length(4, 255)
  name: string;

  @IsString()
  @Length(4, 255)
  description: string;
}

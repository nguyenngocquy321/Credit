import { IsNotEmpty } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty({ message: 'Không được để trống name' })
  name: string;
  @IsNotEmpty({ message: 'Không được để trống price' })
  price: number;
  @IsNotEmpty({ message: 'Không được để trống credit_amount' })
  credit_amount: number;
}

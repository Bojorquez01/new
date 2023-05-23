import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';


@InputType()
export class CreateUserAccessInput {
  @Field()
  correo: string;

  @Field()
  contrasenia: string;

  @IsNotEmpty()
  @Field((type)=> Int)
  usuarios_id: number;
}

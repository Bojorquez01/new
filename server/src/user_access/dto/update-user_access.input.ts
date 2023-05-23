import { CreateUserAccessInput } from './create-user_access.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserAccessInput extends PartialType(CreateUserAccessInput) {
  @Field(() => Int)
  id: number;
}

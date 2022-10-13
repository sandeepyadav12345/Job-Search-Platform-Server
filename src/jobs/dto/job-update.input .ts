import {Field, ID, InputType, PartialType} from '@nestjs/graphql';
import {JobCreateInput} from './job-create.input';
import {IsMongoId} from 'class-validator';
import {ObjectId} from 'mongodb';
import {Transform} from 'class-transformer';

@InputType()
export class JobUpdateInput extends PartialType(JobCreateInput) {
  @Field(() => ID)
  //@Transform((val: string) => new ObjectId(val))
  _id: ObjectId;
}

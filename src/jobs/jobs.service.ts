import {Injectable} from '@nestjs/common';
import {Job} from './job';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BaseService} from '../common/base.service';
import {Constants} from '../common/constants';
import { JobCreateInput } from './dto/job-create.input';
import { JobUpdateInput } from './dto/job-update.input ';
import {ObjectId} from 'mongodb';
import { JobModule } from './jobs.module';
import { query } from 'express';
@Injectable()
export class JobService extends BaseService<Job> {
  constructor(@InjectModel(Constants.JobRef) jobModel: Model<Job>) {
    super(jobModel);
  }

  async create( dto: JobCreateInput): Promise<Job> {
    return super.createOne({...dto} as Job );
  }

  public async getOneById(id: string): Promise<Job> {
    return super.getOne({_id: id});
  }

  public async getAllJobs(): Promise<Job[]> {
    return super.getMany();
  }

  public async searchJobs(q: string): Promise<Job[]> {
    const jobs = await this.model.find({
      $or: [
          { placeName: { $regex: q, $options: "i" } },
          { title: { $regex: q, $options: "i" } },
          { companyName: { $regex: q, $options: "i" } }
      ]
  }).exec();
  return jobs;
  }

  async update( dto: JobUpdateInput): Promise<Job> {
    return super.updateOne(
      {_id: dto._id},
      {$set: {...dto}}
    );
  }

  public async delete( id: string): Promise<Job>{
    return super.deleteOne({_id: id});
  }

}

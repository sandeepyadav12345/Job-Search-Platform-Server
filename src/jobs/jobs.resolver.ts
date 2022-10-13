import {Args, ID, Mutation,  Query,  Resolver} from '@nestjs/graphql';
import {Job} from './job';
import {JobService} from './jobs.service';
import {JobCreateInput} from './dto/job-create.input';
import {JobUpdateInput} from './dto/job-update.input ';
import {UseGuards} from '@nestjs/common';
import {JwtGuard} from '../auth/jwt.guard';
import {ObjectId} from 'mongodb';
import { IsMongoIdPipe } from 'src/common/is-mongoid.pipe';
@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {
  }

  @Mutation(() => Job,{name:'createJob'})
  create(@Args('job') dto: JobCreateInput): Promise<Job> {
    return this.jobService.create(dto);
  }

  @Query(() => Job,{name:'getJobById'})
  getJobById(@Args('id') id: string): Promise<Job> {
    return this.jobService.getOneById(id);
  }

  @Mutation(() => Job,{name:'deleteJobById'})
  deleteJobById(@Args('id') id: string): Promise<Job> {
    return this.jobService.delete(id);
  }

  @Query(() => [Job],{name:'getAllJobs'})
  getAllJob(): Promise<Job[]> {
    return this.jobService.getAllJobs();
  }

  @Query(() => [Job],{name:'searchJobs'})
  searchJobs(@Args('q') q: string): Promise<Job[]> {
    return this.jobService.searchJobs(q);
  }

  @Mutation(() => Job, {name: 'updateJob'})
  update(@Args('job') dto: JobUpdateInput): Promise<Job> {
    return this.jobService.update( dto);
  }
}

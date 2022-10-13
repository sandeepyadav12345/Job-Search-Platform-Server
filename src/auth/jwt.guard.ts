import {AuthGuard} from '@nestjs/passport';
import {ExecutionContext, Injectable} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';
import { Constants } from 'src/common/constants';

@Injectable()
export class JwtGuard extends AuthGuard(Constants.AdminRef) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
   // console.log(ctx);
    //console.log(ctx.getContext().req);
    return ctx.getContext().req;
  }
}

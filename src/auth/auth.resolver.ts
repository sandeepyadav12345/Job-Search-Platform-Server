import {Args, Mutation, Query,  Resolver} from '@nestjs/graphql';
import {Admin} from '../admin/admin';
import {AdminRegisterInput} from './dto/adminregister.input';
import {AuthService} from './auth.service';
import {AdminLoginInput} from './dto/adminlogin.input';
import {CurrentUser} from '../common/current-user.decorator';
import {Req, UseGuards} from '@nestjs/common';
import { JwtGuard} from './jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/common/constants';
import { Types } from 'mongoose';
import {  Tokens } from './dto/token.type';
import { RefreshJwtGuard } from './jwt-refresh.guard';
import {ObjectId} from 'mongodb';
import { AdminService } from 'src/admin/admin.service';

@Resolver(() => Admin)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly adminService:AdminService) {
  }

  @Mutation(() => Tokens)
  register(@Args('adminregisterData') adminregisterData: AdminRegisterInput): Promise<Tokens> {
    return this.authService.register(adminregisterData);
  }

  @Mutation(()=> Tokens)
  login(@Args('adminloginData') adminloginData: AdminLoginInput): Promise<Tokens> {
    return this.authService.login(adminloginData);
  }

  @Query(() => Admin)
  findAdmin(@Args('email') email:string): Promise<Admin>{
    return this.adminService.getOneByEmail(email);
  }

  @UseGuards(RefreshJwtGuard)
  @Query(()=>Tokens)
  refreshTokens(@CurrentUser() admin:Admin) {
    const adminId = admin.payload.sub ;
    const refreshToken = admin.refreshToken;
    return this.authService.refreshTokens(new ObjectId(adminId), refreshToken);
  }

  @Query(() => Admin)
  @UseGuards(JwtGuard)
  adminProfile(@CurrentUser() admin: Admin): Admin {
    return admin;
  }

  @UseGuards(RefreshJwtGuard)
  @Mutation(()=> String)
  logout(@CurrentUser() admin: Admin): Promise<string> {
   return this.authService.logout(new ObjectId(admin.payload.sub));
  }

}

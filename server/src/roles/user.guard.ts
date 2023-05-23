import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from "@nestjs/graphql";
import { ForbiddenError } from "apollo-server-express";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.headers.authorization?.split(' ')[1];

    if (token){
      try{

        const decodedToken = jwt.verify(token, 'hide-me') as {role : string};
        ctx.getContext().req.user = {user_role: decodedToken.role};
        return decodedToken.role.includes('user');

      }catch (err){


        throw new ForbiddenException(`Falta el encabezado de autorización.\n Error: ${err}`);
      }

    }else{

      throw new ForbiddenException('You do not have permission to access this resource.');
    }

  }
}
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UserAccessService } from './user_access.service';
import { UserAccess } from './entities/user_access.entity';
import { CreateUserAccessInput } from './dto/create-user_access.input';
import { UpdateUserAccessInput } from './dto/update-user_access.input';
import { NotFoundException, UseGuards } from '@nestjs/common';

import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from 'src/roles/admin.guard';
import { UserGuard } from 'src/roles/user.guard';
import { User_adminGuard } from 'src/roles/user-admin.guard';


@Resolver(() => UserAccess)
export class UserAccessResolver {
  
  //Inyección de repositorio y servicio
  constructor(

    private userAccessService: UserAccessService,
    ){};

    //Funciones
    @UseGuards(AdminGuard)
    @Query((returns)=> [UserAccess])
    usersAccess(){
      return this.userAccessService.findAll();
    };

    @UseGuards(User_adminGuard)
    @UseGuards(UserGuard)
    @Query((returns)=> UserAccess, {name: 'userAccess'})
    async findOne(@Args('user_name') user_name: string){

      const userAccess = await this.userAccessService.findOne(user_name);

      if (userAccess){
        return userAccess;
      } else {
        throw new NotFoundException(`User with username '${user_name}' not fuound`);
      }
    };

    @Query(()=> [UserAccess], {name: 'usersAccess'})
    @UseGuards(AdminGuard)
    findAll(){
      return this.userAccessService.findAll();
  
    }

    @UseGuards(AdminGuard)
    @Mutation((returns) => UserAccess)
    createUserAccess(@Args('userAccessInput') userAccessInput: CreateUserAccessInput){

      return this.userAccessService.createUserAccess(userAccessInput);
    };

    @UseGuards(AdminGuard)
    @Mutation(()=> UserAccess)
    updateUserAccess(@Args('updateUserAccess') updateUserAccess: UpdateUserAccessInput){
      return this.userAccessService.update(updateUserAccess.id, updateUserAccess);
    };
    
    @UseGuards(AdminGuard)
    @Mutation(()=> Boolean)
    removeUserAccess(@Args('id', {type: () => Int}) id: number): Promise<boolean>{

      return this.userAccessService.remove(id);
    };

    
    @ResolveField((returns)=> Usuario)
    async user(@Parent() userAccess: UserAccess){
    const user = await this.userAccessService.getUsuarios(userAccess.usuarios_id);
    
      if (user){

        return user;

      }else{
        return{
          id: parseInt('0', 10),
          nombre: 'No hay un usuario asociado a este accesso',
          userAccess: [],
        }
      }

    }
  }

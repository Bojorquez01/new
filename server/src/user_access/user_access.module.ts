import { Module } from '@nestjs/common';
import { UserAccessService } from './user_access.service';
import { UserAccessResolver } from './user_access.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccess } from './entities/user_access.entity';

import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

import { AdminGuard } from 'src/roles/admin.guard';
import { UserGuard } from 'src/roles/user.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccess]), UserAccessModule, UsuariosModule],
  providers: [UserAccessResolver, UserAccessService, AdminGuard, UserGuard],
  exports: [UserAccessService],
})
export class UserAccessModule {}
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_access')
@ObjectType()
export class UserAccess {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field((type) => String)
  correo: string;

  @Column()
  @Field((type) => String)
  contrasenia: string;

  @Column()
  @Field()
  usuarios_id: number;

  @ManyToOne(()=> Usuario, (usuario) => usuario.user_access)
  @JoinColumn({name: 'usuarios_id'})
  @Field({nullable:true, deprecationReason: 'Este campo ha cambiado su valor' })
  usuario: Usuario;
  
}

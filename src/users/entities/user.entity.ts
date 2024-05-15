import { Post } from '../../posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from '../enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'first_name', nullable: true, default: null })
  public firstName: string;

  @Column({ type: 'decimal', nullable: true, default: null })
  public weight: number;

  @Column({ name: 'last_name', nullable: true, default: null })
  public lastName: string;

  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ nullable: true })
  public password: string;

  @Column({ enum: UserRoleEnum, default: UserRoleEnum.USER, nullable: false })
  public role: UserRoleEnum;

  @OneToMany(() => Post, (post) => post.user)
  public posts: Post[];
}

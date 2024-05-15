import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public topic: string;

  @Column()
  public text: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}

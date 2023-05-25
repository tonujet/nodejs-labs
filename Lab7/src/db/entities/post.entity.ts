import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { UserEntity } from "./user.entity.js";

@Entity({ name: "posts" })
export class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, user => user.posts, { nullable: false })
  user: Relation<UserEntity>;

  @CreateDateColumn({ name: "created_at" })
  dateCreation: Date;
}

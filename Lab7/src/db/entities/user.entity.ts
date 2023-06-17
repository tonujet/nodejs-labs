import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity.js";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  info: string;

  @Column({ type: "simple-json", nullable: true })
  address: {
    city: string;
    street: string;
  };

  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];
}

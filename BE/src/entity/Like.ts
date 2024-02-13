import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";
@Entity({ name: "likes" })
export class Like {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.likes, { 
        onUpdate: "CASCADE",
        onDelete: "CASCADE", 
    })
    @JoinColumn({ name: "user_id" }) // untuk membuat foreign key
    user: User;

    @ManyToOne(() => Thread, (thread) => thread.likes, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "thread_id" }) // untuk membuat foreign key
    thread: Thread;

}
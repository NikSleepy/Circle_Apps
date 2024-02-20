import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity()
export class Reply {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({ nullable: true })
    file_reply: string

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

    @ManyToOne(() => User, (user) => user.reply,{
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Thread, (thread) => thread.reply,{
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'thread_id' })
    thread: Thread;

}
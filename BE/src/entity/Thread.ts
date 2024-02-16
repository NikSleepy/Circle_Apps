import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./User"
import { Like } from "./Like"
import { Reply } from "./Reply"
@Entity()
export class Thread {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ nullable: true })
    content: string

    @Column({ nullable: true })
    image_thread: string

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

    @ManyToOne(() => User, (user) => user.threads, {
    })
    user: User

    @OneToMany(() => Like, (like) => like.thread,)
    likes: Like[]

    @OneToMany(() => Reply, (reply) => reply.user,)
    replies: Reply[]


}
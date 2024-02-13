import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Thread } from "./Thread"
import { Like } from "./Like"
import { Reply } from "./Reply"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    username: string

    @Column()
    fullName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    photo_profile: string

    @Column({ nullable: true })
    photo_cover: string

    @Column({ nullable: true })
    description: string

    @OneToMany(() => Thread, ( thread ) => thread.user, {
    })
    threads: Thread[];

    @OneToMany(() => Thread, ( thread ) => thread.user, {
    })
    likes: Like[];

    @OneToMany(() => Reply, ( reply ) => reply.user, {
    })
    replies: Reply[];
    
    @ManyToMany(() => User, ( user ) => user.followings)
    @JoinTable({
        name: 'user_following',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'following_id',
            referencedColumnName: 'id'
        }
    })
    followers: User[];

    @ManyToMany(() => User, ( user ) => user.followers)
    followings: User[];

}

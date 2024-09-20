import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import User from "./User"
import Project from "./Project"

@Entity('userProject')
class UserProject {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('int', {nullable: false})
    horas_trabalhada: number

    @Column('int', {nullable: false})
    user_id: number

    @Column('int', {nullable: false})
    project_id: number

    @CreateDateColumn()
    criado_em: Date

    @ManyToOne(() => User, (user) => user.userProjects)
    @JoinColumn({name: "user_id"})
    users: User

    @ManyToOne(() => Project, (project) => project.userProjects)
    @JoinColumn({name: "project_id"})
    projects: Project

}

export default UserProject
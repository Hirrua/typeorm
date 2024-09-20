import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import UserProject from "./UserProject"

@Entity('project')
class Project {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', {nullable: false, length: 100, unique: true})
    nome: string

    @Column('varchar', {nullable: false, length: 255})
    descricao: string

    @Column('date', {nullable: false})
    inicio_em: Date

    @Column('date', {nullable: false})
    termino_em: Date

    @Column('boolean', {default: true})
    active: boolean

    @CreateDateColumn()
    criado_em: Date

    @OneToMany(() => UserProject, (userProject) => userProject.users)
    userProjects: UserProject[]

}

export default Project
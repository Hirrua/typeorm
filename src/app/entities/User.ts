import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Address from "./Address"
import UserProject from "./UserProject"

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', {nullable: false, length: 100})
    nome: string

    @Column('varchar', {nullable: false, length: 50, unique: true})
    email: string

    @Column('date', {nullable: false})
    nascimento: Date

    @CreateDateColumn()
    criado_em: Date

    @OneToMany(() => Address, (address) => address.users) // De 1:N, Address é a entidade onde o ponto de conexão é address.users (NÃO VAI TER UMA COLUNA ADDRESS E USER NO BANCO)
    address: Address[]

    @OneToMany(() => UserProject, (userProject) => userProject.users)
    userProjects: UserProject[]
}

export default User
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}

export default User
import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import User from "./User"

@Entity('address')
class Address {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column("int", { nullable: false })
    user_id: number

    @ManyToOne(() => User, (user) => user.address) // Criando um relacionamento de 1:N, que dentro do USER vou ter uma conexão
    @JoinColumn({ name: "user_id" }) // Qual coluna vai se tornar a chave estrangeira
    users: User // users é relacionado a entidade User

    @Column('varchar', { nullable: false, length: 100})
    street: string

    @Column('varchar', {nullable: false, length: 100 })
    city: string

    @Column('varchar', { nullable: false, length: 2 })
    state: string

    @CreateDateColumn()
    criado_em: Date
}

export default Address
import { Table, type MigrationInterface, type QueryRunner } from "typeorm";

export class CreateUsersTable1726242370576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '100',
                        isNullable: false // Campo obrigatório
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                        isUnique: true // Unico
                    },
                    {
                        name: 'nascimento',
                        type: 'Date',
                        isNullable: false
                    },
                    {
                        name: 'criado_em',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}

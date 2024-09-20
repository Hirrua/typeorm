import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProjectTable1726846806548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "projects",
                columns: [{
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "nome",
                    type: "varchar",
                    length: "100",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "descricao",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "inicio_em",
                    type: "Date",
                    isNullable: false
                },
                {
                    name: "termino_em",
                    type: "Date",
                    isNullable: false
                },
                {
                    name: "active",
                    type: "boolean",
                    default: true,
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
        await queryRunner.dropTable("projects")
    }

}

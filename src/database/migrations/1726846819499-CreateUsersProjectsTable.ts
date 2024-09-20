import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersProjectsTable1726846819499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usersProject",
                columns: [{
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "horas_trabalhada",
                    type: "int",
                    default: 0
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "project_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: 'criado_em',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["project_id"],
                    referencedTableName: "projects",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                }
            ],
            indices: [ // Quem vai ser a chave primaria e que vai gerenciar o indice (SELECT)
                {
                    columnNames: ["id"]
                }
            ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

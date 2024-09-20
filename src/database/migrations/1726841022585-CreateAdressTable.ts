import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAdressTable1726841022585 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "address",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "city",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "state",
                        type: "varchar",
                        length: "2",
                        isNullable: false
                    },
                    {
                        name: "street",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "user_id",
                        type: "int",
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
        await queryRunner.createForeignKey(
            "address", new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("address")
    }

}

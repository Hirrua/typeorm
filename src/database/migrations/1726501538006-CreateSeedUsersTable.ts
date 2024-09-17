import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import User from "../../app/entities/User";
import userSeed from "../seed/UserSeed";

export class CreateSeedUsersTable1726501538006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRespository = AppDataSource.getRepository(User)
        await userRespository.save(userSeed)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

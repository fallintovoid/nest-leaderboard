import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1673019374115 implements MigrationInterface {
    name = 'UserEntity1673019374115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "points" integer NOT NULL DEFAULT '0', "bio" character varying NOT NULL DEFAULT '', "img" character varying NOT NULL DEFAULT '', "achievments" text NOT NULL DEFAULT '[]', "purchaseHistory" text NOT NULL DEFAULT '[]', "pointsHistory" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

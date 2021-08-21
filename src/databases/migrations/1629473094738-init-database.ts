import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabase1629473094738 implements MigrationInterface {
    name = 'initDatabase1629473094738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`my_app\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`created_by_id\` int NULL, \`updated_by_id\` int NULL, \`deleted_by_id\` int NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, \`permissions\` text NOT NULL, \`status\` enum ('pending', 'active', 'blocked') NOT NULL DEFAULT 'pending', \`reset_password_mail_sent_at\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`my_app\`.\`user_token\` (\`user_id\` int NOT NULL, \`iat\` int NOT NULL, \`exp\` int NOT NULL, \`user_agent\` text NOT NULL, PRIMARY KEY (\`user_id\`, \`iat\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`my_app\`.\`user_token\` ADD CONSTRAINT \`FK_79ac751931054ef450a2ee47778\` FOREIGN KEY (\`user_id\`) REFERENCES \`my_app\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`my_app\`.\`user_token\` DROP FOREIGN KEY \`FK_79ac751931054ef450a2ee47778\``);
        await queryRunner.query(`DROP TABLE \`my_app\`.\`user_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`my_app\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`my_app\`.\`users\``);
    }

}

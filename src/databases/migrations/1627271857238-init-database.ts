import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabase1627271857238 implements MigrationInterface {
    name = 'initDatabase1627271857238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `created_by_id` int NULL, `updated_by_id` int NULL, `deleted_by_id` int NULL, `email` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `avatar` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `users`");
    }

}

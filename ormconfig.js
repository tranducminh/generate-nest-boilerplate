const dotenv = require('dotenv');

const { SnakeNamingStrategy } = require('./dist/configs/database/snake-naming.strategy');

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
    process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  multipleStatements: true,
  migrationsTableName: '__migrations',
  entities: ["dist/**/*.entity{.ts,.js}"],
  subscribers: ["dist/**/*.subscriber{.ts,.js}"],
  migrations: ['dist/databases/migrations/**/*{.ts,.js}'],
  seeds: ['dist/databases/seeds/**/*.js'],
  factories: ['dist/databases/factories/**/*.js']
};

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const testConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'test',
  synchronize: true,
  entities: [__dirname + '/dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
};

export default testConfig;

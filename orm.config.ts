import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "pm1",
    synchronize: true,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/migrations/*.js"],
    migrationsTableName: "migrations"
}

export default config;
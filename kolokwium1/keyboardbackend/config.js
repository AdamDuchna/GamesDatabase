module.exports = {
    postgresUser: process.env.POSTGRES_USER,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: process.env.PGPORT,
    postgresDb: process.env.POSTGRES_DB,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
}

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bits';

module.exports = connectionString;
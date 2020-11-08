const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'mates_rates_app_two',
    }
  },
//     production: {
//       connection: {
//         connectionString: DB_URL,
//         ssl: {
//           rejectUnauthorized: false,
//         },
//       },
//   },
  test: {
    connection: {
      database: 'mates_rates_app_test_two'
      // user,
      // password
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };

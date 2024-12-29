/* eslint-disable prettier/prettier */
export default () => ({
  database: {
    host: process.env.host,
    port: parseInt(process.env.port, 10) || 3306,
    username: process.env.username,
    password: process.env.password,
    name: process.env.database,
  },
});
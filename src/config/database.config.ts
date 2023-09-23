import { registerAs } from '@nestjs/config';

export default registerAs<{
  type: string;
  host: string;
  database: string;
  port: number;
  user: string;
  password: string;
}>('database', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  port: +process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
}));

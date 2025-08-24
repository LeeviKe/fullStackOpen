import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { knexSnakeCaseMappers } from 'objection';

import knexfile from '../knexfile.js';

// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const API_PORT = process.env.PORT || 5000;
export const APOLLO_PORT = process.env.APOLLO_PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET;

export const KNEX_CONFIG = {
  ...knexfile,
  ...knexSnakeCaseMappers(),
};

export const GITHUB_API_URL =
  process.env.GITHUB_API_URL || 'https://api.github.com';

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const ACCESS_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;

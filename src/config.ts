import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const appPort = process.env.APP_PORT || 3000;

export const etherScan = {
  apiKey: process.env.EHER_SCAN_API_KEY || '',
};

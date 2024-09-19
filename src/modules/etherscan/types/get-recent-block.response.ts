import { ErrorResponse } from './error.response';

export type RecentBlockResponse = SuccessRecentBlockResponse | ErrorResponse;

export type SuccessRecentBlockResponse = {
  jsonrpc: string;
  id: number;
  result: string;
};

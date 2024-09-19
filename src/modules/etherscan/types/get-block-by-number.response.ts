import { ErrorResponse } from './error.response';

export type BlockResponse = SuccessBlockResponse | ErrorResponse;

export type SuccessBlockResponse = {
  jsonrpc: string;
  id: number;
  result: Block;
};

export type Block = {
  number: string;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  transactions: Transaction[];
  uncles: string[];
};

export type Transaction = {
  hash: string;
  nonce: string;
  blockHash: string;
  blockNumber: string;
  transactionIndex: string;
  from: string;
  to: string | null;
  value: string;
  gas: string;
  gasPrice: string;
};

import { Client } from '@hashgraph/sdk';

export const mockClient = {
  _maxExecutionTime: 1000,
  setMaxExecutionTime: jest.fn(),
  _setNetworkFromName: jest.fn(),
  setMirrorNetwork: jest.fn(),
} as unknown as Client;

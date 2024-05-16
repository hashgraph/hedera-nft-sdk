import { AccountId, PrivateKey } from '@hashgraph/sdk';
import { Network } from './mint-token';
export type LocalNode = {
    [key: string]: string | AccountId;
};
export type LogInType = {
    myAccountId: string;
    myPrivateKey: PrivateKey;
    network: Network;
    localNode?: LocalNode;
    localMirrorNode?: string;
};
//# sourceMappingURL=login.d.ts.map
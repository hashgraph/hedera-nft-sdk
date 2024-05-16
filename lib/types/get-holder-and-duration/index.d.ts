import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
export declare const getHolderAndDuration: ({ tokenId, serialNumber, network, }: {
    tokenId: string;
    serialNumber: number;
    network: NetworkName;
}) => Promise<{
    holder: string;
    holderSince: string;
}>;
//# sourceMappingURL=index.d.ts.map
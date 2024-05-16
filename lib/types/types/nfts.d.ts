export interface NFTDetails {
    account_id: string;
    created_timestamp: string;
    delegating_spender?: null | string;
    deleted: boolean;
    metadata: string;
    modified_timestamp: string;
    serial_number: number;
    token_id: string;
    spender: null | string;
}
export interface NFTTransactions {
    consensus_timestamp: string;
    nonce: number;
    transaction_id: string;
    type: string;
    is_approval: boolean;
    receiver_account_id: string;
    sender_account_id: string;
}
export interface NFTTransactionsRequest {
    transactions: NFTTransactions[];
    links: Links;
}
interface Links {
    next: string | null;
}
export interface NFTS {
    nfts: NFTDetails[];
    links: Links;
}
export interface DecodedMetadata {
    metadata: string;
    serialNumber: number;
}
export interface ParsedNFTS {
    decodedMetadata: DecodedMetadata[];
    links: Links;
}
export {};
//# sourceMappingURL=nfts.d.ts.map
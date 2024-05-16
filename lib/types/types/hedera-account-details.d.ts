export interface TokenBalance {
    token_id: string;
    balance: number;
}
interface TokenTransfer {
    token_id: string;
    account: string;
    amount: number;
    is_approval: boolean;
}
interface StakingRewardTransfer {
    account: number;
    amount: number;
}
interface Transfer {
    account: string;
    amount: number;
    is_approval: boolean;
}
interface Transaction {
    bytes: null;
    charged_tx_fee: number;
    consensus_timestamp: string;
    entity_id: string;
    max_fee: number;
    memo_base64: null;
    name: string;
    node: string;
    nonce: number;
    parent_consensus_timestamp: string;
    result: string;
    scheduled: boolean;
    staking_reward_transfers: StakingRewardTransfer[];
    transaction_hash: string;
    transaction_id: string;
    token_transfers: TokenTransfer[];
    transfers: Transfer[];
    valid_duration_seconds: number;
    valid_start_timestamp: string;
}
export interface Balance {
    timestamp: string;
    balance: number;
    tokens: TokenBalance[];
}
interface Links {
    next: string;
}
export interface HederaAccountDetails {
    account: string;
    alias: string;
    auto_renew_period: number;
    balance: Balance;
    decline_reward: boolean;
    deleted: boolean;
    ethereum_nonce: number;
    evm_address: string;
    key: {
        _type: string;
        key: string;
    };
    max_automatic_token_associations: number;
    memo: string;
    pending_reward: number;
    receiver_sig_required: boolean;
    staked_account_id: Record<string, unknown> | null;
    staked_node_id: number | null;
    stake_period_start: Record<string, unknown> | null;
    transactions: Transaction[];
    links: Links;
}
export {};
//# sourceMappingURL=hedera-account-details.d.ts.map
/// <reference types="node" />
import type { Blob } from 'buffer';
import { S3Client } from '@aws-sdk/client-s3';
import { FileStorage } from '../../../types/file-storage-service';
export declare class AWSService implements FileStorage {
    client: S3Client;
    awsAccessKeyId?: string;
    awsSecretAccessKey?: string;
    awsS3Region?: string;
    awsS3Bucket?: string;
    constructor(awsAccessKeyId: string, awsSecretAccessKey: string, awsS3Region: string, awsS3Bucket: string);
    uploadFile(file: Blob): Promise<string>;
}
//# sourceMappingURL=aws-service.d.ts.map
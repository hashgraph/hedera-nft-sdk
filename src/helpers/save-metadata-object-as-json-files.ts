import { MetadataObject } from '../types/csv';
import fs from 'fs';

export const saveMetadataObjectsAsJsonFiles = (metadataFromCSV: MetadataObject[], folderPath: string): void => {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
  }

  fs.mkdirSync(folderPath, { recursive: true });

  metadataFromCSV.forEach((fileContent, index) => {
    const fileName = `${folderPath}/${index + 1}.json`;
    fs.writeFileSync(fileName, JSON.stringify(fileContent), { encoding: 'utf-8' });
  });
};

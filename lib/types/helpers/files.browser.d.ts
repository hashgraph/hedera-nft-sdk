import { Instance } from '../types/validator';
/**
 * @param dir Absolute path to file you want to read contents for
 * @param filenames An array of filenames
 * @returns Array of objects containing a filename and filedata
 */
export declare const readFiles: (_: string, __: string[]) => {
    filename: string;
    filedata: Instance;
}[];
/**
 * @param dir Absolute path to folder you want to validate
 * @returns An array of filenames with extension
 */
export declare const getJSONFilesForDir: (_: string) => string[];
//# sourceMappingURL=files.browser.d.ts.map
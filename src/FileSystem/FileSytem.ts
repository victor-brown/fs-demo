import { Logger } from "../Logger/Logger";
import { type IFileSystem } from "./IFileSytem";
import md5 from "md5";
import fs from "fs-extra";

export class FS implements IFileSystem {
  private readonly fileToContentMap: Map<string, string>;
  private readonly dataDirectory: string;

  private readonly logger = new Logger(FS.name);

  constructor(dataDirectoryPath: string) {
    this.fileToContentMap = new Map();
    this.dataDirectory = dataDirectoryPath;
  }

  log(): void {
    this.logger.log("fileToContentMap:");
    this.logger.logMap(this.fileToContentMap);
  }

  store(filename: string, content: string): void {
    const hashedContent = this.getHashedContent(content);
    const filePath = this.getFilePath(hashedContent);

    if (!fs.existsSync(filePath)) {
      fs.outputFileSync(filePath, content);
      this.logger.log(`"${content}", has been saved to: "${filePath}"`);
    } else {
      this.logger.log(`"${content}", already exists as: "${filePath}"`);
    }

    this.fileToContentMap.set(filename, hashedContent);
    this.logger.log(`"${filename}", has been assigned to: "${filePath}"`);
  }

  get(filename: string): string {
    if (!this.fileToContentMap.has(filename)) {
      throw new Error(`Failed to found file with "${filename}" name`);
    }

    const hashedContent = this.fileToContentMap.get(filename) as string;
    const filePath = this.getFilePath(hashedContent);

    this.logger.log(`Successfully found "${filePath}" for "${filename}"`);

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Could not load content for "${filename}" on "${filePath}" path`,
      );
    }
    return fs.readFileSync(filePath, "utf8");
  }

  private getHashedContent(content: string): string {
    return md5(content);
  }

  private getFilePath(filename: string): string {
    return `${this.dataDirectory}/${filename}.txt`;
  }
}

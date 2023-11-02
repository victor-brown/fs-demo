import { FS } from "./FileSystem/FileSytem";
import { Logger } from "./Logger/Logger";

const fileSystem = new FS("saved-files");
const logger = new Logger("Main");

fileSystem.store("file1", "a very long string1");
fileSystem.store("file2", "a very long string1");
fileSystem.store("file3", "a very long string2");
fileSystem.store("file4", "");

console.log("\n----------------------\n");

fileSystem.log();

console.log("\n----------------------\n");

try {
  console.log("Content of file1:", fileSystem.get("file1"));
  console.log("Content of file2:", fileSystem.get("file2"));
  console.log("Content of file3:", fileSystem.get("file3"));
  console.log("Content of file4:", fileSystem.get("file4"));
} catch (e: any) {
  logger.error(e.message);
}

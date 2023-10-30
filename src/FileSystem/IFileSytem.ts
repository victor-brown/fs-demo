export interface IFileSystem {
  store: (filename: string, content: string) => void;
  get: (filename: string) => string;
}

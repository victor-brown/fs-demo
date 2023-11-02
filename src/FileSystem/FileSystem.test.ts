import { FS } from "./FileSytem";

jest.mock("fs-extra", () => {
  const fs = jest.requireActual("fs-extra");

  const mockResults: Record<string, any> = {};

  return {
    ...fs,
    outputFileSync: jest.fn((filePath: string, content: any) => {
      mockResults[filePath] = content;
    }),
    existsSync: jest.fn((filePath: string) => !!mockResults[filePath]),
    readFileSync: jest.fn((filePath: string) => mockResults[filePath] || null),
  };
});

describe("FileSystem", () => {
  let fileSystem: FS;

  beforeEach(() => {
    fileSystem = new FS("test-files");
  });

  test.each([
    ["file1", "Content of file1"],
    ["file2", "Content of file2"],
    ["file3", "Content of file3"],
    // Add more test cases as needed
  ])(
    `should store and retrieve content correctly for %s`,
    (filename, content) => {
      fileSystem.store(filename, content);

      expect(fileSystem.get(filename)).toBe(content);
    },
  );

  it("should store and retrieve content correctly for multiple files", () => {
    const testContent1 = "Test Content 1";
    const testContent2 = "Test Content 2";
    const testFileName1 = "file1";
    const testFileName2 = "file2";

    fileSystem.store(testFileName1, testContent1);
    fileSystem.store(testFileName2, testContent2);

    expect(fileSystem.get(testFileName1)).toBe(testContent1);
    expect(fileSystem.get(testFileName2)).toBe(testContent2);
  });

  it("should store and retrieve content correctly for multiple files with duplicated files", () => {
    const testContent1 = "Test Content 1";
    const testContent2 = "Test Content 2";
    const testFileName1 = "file1";
    const testFileName2 = "file2";
    const testFileName3 = "file3";

    fileSystem.store(testFileName1, testContent1);
    fileSystem.store(testFileName2, testContent2);
    fileSystem.store(testFileName3, testContent1);

    expect(fileSystem.get(testFileName1)).toBe(testContent1);
    expect(fileSystem.get(testFileName2)).toBe(testContent2);
    expect(fileSystem.get(testFileName3)).toBe(testContent1);
  });

  it("should return error for non-existent files", () => {
    const filename = "nonexistent-file";

    expect(() => fileSystem.get(filename)).toThrow(
      `Failed to found file with "${filename}" name`,
    );
  });

  it("should update content when storing with the same filename", () => {
    const filename = "file1";
    const initialContent = "Initial content";
    const updatedContent = "Updated content";

    fileSystem.store(filename, initialContent);
    fileSystem.store(filename, updatedContent);

    expect(fileSystem.get(filename)).toBe(updatedContent);
  });

  it("should not override other references when updates a file", () => {
    const testContent1 = "Test Content 1";
    const testContent2 = "Test Content 2";
    const testFileName1 = "file1";
    const testFileName2 = "file2";

    fileSystem.store(testFileName1, testContent1);
    fileSystem.store(testFileName2, testContent1);
    fileSystem.store(testFileName1, testContent2);

    expect(fileSystem.get(testFileName1)).toBe(testContent2);
    expect(fileSystem.get(testFileName2)).toBe(testContent1);
  });
});

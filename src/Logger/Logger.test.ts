import { Logger } from "./Logger";

describe("Logger", () => {
  let logger: Logger;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new Logger("TestComponent");
    consoleLogSpy = jest.spyOn(console, "log");
  });

  it("should log messages with the component name for log method", () => {
    logger.log("Test message");

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "LOG: TestComponent -- Test message",
    );
  });

  it("should log error messages with the component name for log method", () => {
    logger.error("Test message");

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "ERROR: TestComponent -- Test message",
    );
  });

  it("should log key-value pairs from a Map", () => {
    const map = new Map([
      ["key1", "value1"],
      ["key2", "value2"],
    ]);

    logger.logMap(map);

    expect(consoleLogSpy).toHaveBeenCalledWith("Key: key1, Value: value1");
    expect(consoleLogSpy).toHaveBeenCalledWith("Key: key2, Value: value2");
  });
});

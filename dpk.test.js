const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return provided partition key when event has partitionKey property", () => {
    const event = { partitionKey: "test-key" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(event.partitionKey);
  });

  it("should return hash of stringified event when event has no partitionKey property", () => {
    const event = { data: "test-data" };
    const data = JSON.stringify(event);
    const expectedHash = crypto
      .createHash("sha3-512")
      .update(data)
      .digest("hex");

    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedHash);
  });

  it("should stringify non-string partitionKey", () => {
    const event = { partitionKey: { key: "test-key" } };
    const expectedKey = JSON.stringify(event.partitionKey);

    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedKey);
  });

  it("should return hash of candidate when length is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const longKey = "a".repeat(257);
    const event = { partitionKey: longKey };
    const expectedHash = crypto
      .createHash("sha3-512")
      .update(longKey)
      .digest("hex");

    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedHash);
  });
});

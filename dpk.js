const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// Helper functions
const createHash = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

const getPartitionKeyFromEvent = (event) => {
  if (event.partitionKey) {
    return event.partitionKey;
  }

  const data = JSON.stringify(event);
  return createHash(data);
};

const getStringifiedCandidate = (candidate) => {
  if (!candidate) {
    return TRIVIAL_PARTITION_KEY;
  }

  return typeof candidate === "string" ? candidate : JSON.stringify(candidate);
};

const truncateCandidate = (candidate) =>
  candidate.length > MAX_PARTITION_KEY_LENGTH
    ? createHash(candidate)
    : candidate;

// Main function
exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const candidate = getPartitionKeyFromEvent(event);
  const stringifiedCandidate = getStringifiedCandidate(candidate);
  return truncateCandidate(stringifiedCandidate);
};

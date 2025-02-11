import { ByteBuffer } from 'flatbuffers';
import { HubError } from '~/utils/hubErrors';

export const bytesCompare = (a: Uint8Array, b: Uint8Array): number => {
  const aValue = a[0];
  const bValue = b[0];

  if (typeof aValue !== 'number' && typeof bValue !== 'number') {
    return 0;
  } else if (typeof aValue !== 'number') {
    return -1;
  } else if (typeof bValue !== 'number') {
    return 1;
  }

  if (aValue < bValue) {
    return -1;
  } else if (aValue > bValue) {
    return 1;
  } else {
    return bytesCompare(a.subarray(1), b.subarray(1));
  }
};

/* eslint-disable security/detect-object-injection */
export const bytesIncrement = (bytes: Uint8Array): Uint8Array => {
  let i = bytes.length - 1;
  while (i >= 0) {
    if (bytes[i] < 255) {
      bytes[i] = bytes[i] + 1;
      return bytes;
    } else {
      bytes[i] = 0;
    }
    i = i - 1;
  }
  return new Uint8Array([1, ...bytes]);
};

export const bytesDecrement = (bytes: Uint8Array): Uint8Array => {
  let i = bytes.length - 1;
  while (i >= 0) {
    if (bytes[i] > 0) {
      bytes[i] = bytes[i] - 1;
      return bytes;
    } else {
      if (i === 0) {
        throw new HubError('bad_request.invalid_param', 'Cannot decrement zero');
      }

      bytes[i] = 255;
    }
    i = i - 1;
  }

  return new Uint8Array([...bytes]);
};

export const FARCASTER_EPOCH = 1640995200000; // January 1, 2022 UTC
export const getFarcasterTime = (): number => {
  return toFarcasterTime(Date.now());
};

export const toFarcasterTime = (time: number): number => {
  if (time < FARCASTER_EPOCH) {
    throw new HubError('bad_request.invalid_param', 'time must be after Farcaster epoch (01/01/2022)');
  }
  const secondsSinceEpoch = Math.round((time - FARCASTER_EPOCH) / 1000);
  if (secondsSinceEpoch > 2 ** 32 - 1) {
    throw new HubError('bad_request.invalid_param', 'time too far in future');
  }
  return secondsSinceEpoch;
};

export const fromFarcasterTime = (time: number): number => {
  return time * 1000 + FARCASTER_EPOCH;
};

export const toByteBuffer = (buffer: Buffer): ByteBuffer => {
  return new ByteBuffer(new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length / Uint8Array.BYTES_PER_ELEMENT));
};

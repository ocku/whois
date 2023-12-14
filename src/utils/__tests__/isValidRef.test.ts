// utils
import { isValidRef } from '../isValidRef';
// testing
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('utils / isValidRef', () => {
  it('should return false if the ref starts with www', () => {
    assert(isValidRef('www.verisigninc.com') === false);
  });

  it('should return false if the ref uses http or https', () => {
    assert(isValidRef('http://www.verisign.com') === false);
    assert(isValidRef('https://www.verisign.com') === false);
    // This is an edge case, but it might just happen
    assert(isValidRef('http.example.com') === true);
    assert(isValidRef('https.example.com') === true);
  });
});

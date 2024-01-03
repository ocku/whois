// utils
import { guardSocket } from '../guardSocket';
// testing
import { describe, it } from 'node:test';
import assert from 'node:assert';
// libs
import { Socket } from 'node:net';

describe('utils / guardSocket', () => {
  it('should throw when a socket times out', async () => {
    assert(
      (await new Promise((_, reject) => {
        const socket = new Socket();
        guardSocket(socket, reject);
        socket.emit('timeout', true);
      }).catch(() => '__timeout__')) === '__timeout__'
    );
  });

  it('should throw when a socket errors out', async () => {
    assert(
      (await new Promise((_, reject) => {
        const socket = new Socket();
        guardSocket(socket, reject);
        socket.emit('error', true);
      }).catch(() => '__error__')) === '__error__'
    );
  });
});

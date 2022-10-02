import { describe, expect } from "@jest/globals";
import { agent } from 'supertest';

const server = agent('http://localhost:3005');

describe('test all sports apis', () => {
  it('list all sports for valid language [OK]', async () => {
    const response = await server.get('/sports?lang=en');

    expect(response.status).toBe(200);
  });

  it('list all sports for all language [OK]', async () => {
    const response = await server.get('/sports/all');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3)
  });

  it('list all sports for invalid language [ERR]', async () => {
    const response = await server.get('/sports?lang=xy');

    expect(response.status).toBe(400);
  });
});

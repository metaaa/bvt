import { describe, expect } from "@jest/globals";
import { agent } from 'supertest';

const server = agent('http://localhost:3005');

describe('test all events apis', () => {
  it('list all events without grouping [OK]', async () => {
    const response = await server.get('/events?lang=en');

    expect(response.status).toBe(200);
  });

  it('list all events with grouping [OK]', async () => {
    const response = await server.get('/events?lang=en&group-events=yes')

    expect(response.status).toBe(200);
  });

  it('list single event with valid id [OK]', async () => {
    const response = await server.get('/events/1792062300?lang=en');

    expect(response.status).toBe(200);
  });

  it('list all events with invalid grouping [ERR]', async () => {
    const response = await server.get('/events?lang=en&group-events=asd')

    expect(response.status).toBe(200);
  });

  it('list all without grouping with invalid language [ERR]', async () => {
    const response = await server.get('/events?lang=es');

    expect(response.status).toBe(400);
  });

  it('list all without grouping without language [ERR]', async () => {
    const response = await server.get('/events');

    expect(response.status).toBe(400);
  });

  it('list all events without grouping [ERR]', async () => {
    const response = await server.get('/events');

    expect(response.status).toBe(400);
  });

  it('list single event with invalid id [ERR]', async () => {
    const response = await server.get('/events/as3?lang=en');

    expect(response.status).toBe(400);
  });
});

const baseUrl = 'https://bookstore.demoqa.com';
import { describe, expect, test as it } from '@jest/globals';

// Для тестирования был создан аккаунт (QWERty/QWERty11310@)
describe('CheckingRegistration', () => {
  it('the username is already in use', async () => {
    const response = await fetch(`${baseUrl}/Account/v1/User`, {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'QWERty',
        password: 'QWERty11310@',
        expiresInMins: 30
      })
    });

    expect(response.status).toEqual(406);
  });

  it('password doesnt fit', async () => {
    const response = await fetch(`${baseUrl}/Account/v1/User`, {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Qwerty',
        password: 'Qwerty',
        expiresInMins: 30
      })
    });

    const data = await response.json();

    expect(response.status).toEqual(400);
    expect(data.code).toBe('1300');
  });

  it('successful registration', async () => {
    const response = await fetch(`${baseUrl}/Account/v1/User`, {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Igor161612',
        password: 'Petr2828@',
        expiresInMins: 30
      })
    });

    const data = await response.json();

    expect(response.status).toEqual(201);
    expect(data.username).toBe('Igor161612');
  });
});

describe('TokenGeneration', () => {
  it('Generating a token with an error', async () => {
    const response = await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'QWERty',
        password: 'QWERty',
        expiresInMins: 30
      })
    });

    expect(response.status).toEqual(400);
  });

  it('Successful token generation', async () => {
    const response = await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'QWERty',
        password: 'QWERty11310@',
        expiresInMins: 30
      })
    });

    const data = await response.json();

    expect(response.status).toEqual(200);
    expect(data.status).toBe('Success');
  });
});

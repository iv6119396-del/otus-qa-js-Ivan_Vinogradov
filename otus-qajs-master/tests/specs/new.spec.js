const baseUrl = 'https://dummyjson.com';

describe('Users', () => {
  it('List of users', async () => {
    const response = await fetch(`${baseUrl}/users`);
    expect(response.status).toEqual(200);
  });
});

describe('Authentication', () => {
  it('Success login', async () => {
    const respons = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30
      })
    });
    const data = await respons.json();

    expect(respons.status).toEqual(200);
    expect(data.username).toBe('emilys');
    expect(data.accessToken).toBeTruthy();
  });

  it('Authorization', async () => {
    const authorizationData = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30
      })
    });

    const token = (await authorizationData.json()).accessToken;

    const response = await fetch(`${baseUrl}/auth/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.lastName).toBe('Johnson');
  });
});

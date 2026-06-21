import { config, password, userName, headers } from '../../framework/config/authConfig.js';

// Тесты на авторизацию, метод: https://bookstore.demoqa.com/Account/v1/AuthorizedЫ
describe('Авторизация', () => {
  it('Успешная авторизация', async () => {
    const respons = await fetch(`${config}/Account/v1/Authorized`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        userName: userName,
        password: password,
        expiresInMins: 30
      })
    });

    expect(respons.status).toEqual(200);
  });

  it('Пользователь не существует', async () => {
    const respons = await fetch(`${config}/Account/v1/Authorized`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        userName: 'Egor15',
        password: 'Egor15@',
        expiresInMins: 30
      })
    });
    const data = await respons.json();

    expect(respons.status).toEqual(404);
    expect(data.code).toBe('1207');
    expect(data.message).toBe('User not found!');
  });

  it('Некорректный запрос', async () => {
    const respons = await fetch(`${config}/Account/v1/Authorized`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username: 'Egor15',
        password: 'Egor15@',
        expiresInMins: 30
      })
    });
    const data = await respons.json();

    expect(respons.status).toEqual(400);
    expect(data.code).toBe('1200');
    expect(data.message).toBe('UserName and Password required.');
  });
});

// Теcты на получение информации о пользователе, метод: https://bookstore.demoqa.com/Account/v1/User/{UUID}
describe('Получение информации о пользователе', () => {
  it('Некорректный userId при получении информации о пользователе', async () => {
    const respons = await fetch(`${config}/Account/v1/User/QWERty`, {
      method: 'GET',
      headers: headers
    });
    const data = await respons.json();

    expect(respons.status).toEqual(401);
    expect(data.code).toBe('1200');
    expect(data.message).toBe('User not authorized!');
  });
});

// Теcты на удаление пользователя, метод: https://bookstore.demoqa.com/Account/v1/User/{UUID}
describe('Удаление пользователя', () => {
  it('Некорректный userId при удалении пользователя', async () => {
    const respons = await fetch(`${config}/Account/v1/User/QWERty`, {
      method: 'DELETE',
      headers: headers
    });
    const data = await respons.json();

    expect(respons.status).toEqual(401);
    expect(data.code).toBe('1200');
    expect(data.message).toBe('User not authorized!');
  });
});

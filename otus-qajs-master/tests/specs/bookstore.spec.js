const AuthController = require('../../framework/services/auth.controller');
const BooksController = require('../../framework/services/books.controller');
const { generateBookPayload } = require('../../framework/fixtures/book.fixtures');

let token;
let booksController;

beforeAll(async () => {
  // Получаем токен один раз на весь блок тестов
  token = await AuthController.login();
  console.log(token);
  booksController = new BooksController(token);
});

describe('Bookstore API', () => {
  let createdBook;

  test('1. POST /Books должен добавить книгу и вернуть её данные с ISBN', async () => {
    const payload = generateBookPayload();
    createdBook = await booksController.addBook(payload);

    expect(createdBook).toHaveProperty('isbn');
    expect(createdBook.isbn).toBe(payload.isbn);
    expect(createdBook.title).toBe(payload.title);
  }, 30000);

  test('2. GET /Book?ISBN={isbn} должен вернуть ту же книгу по ISBN', async () => {
    const fetched = await booksController.getBookByISBN(createdBook.isbn);
    expect(fetched.isbn).toBe(createdBook.isbn);
    expect(fetched.title).toBe(createdBook.title);
    expect(fetched.author).toBe(createdBook.author);
  });

  test('3. GET /Book с несуществующим ISBN должен вернуть 404', async () => {
    await expect(booksController.getBookByISBN('9780000000000')).rejects.toThrowErrorMatchingObject({
      response: { status: 404 }
    });
  });

  test('4. PUT /Books/{ISBN} должен обновить данные книги', async () => {
    const updatedPayload = generateBookPayload({
      isbn: createdBook.isbn,
      title: 'Updated Book Title',
      author: 'Updated Author'
    });

    const updated = await booksController.updateBook(createdBook.isbn, updatedPayload);
    expect(updated.title).toBe(updatedPayload.title);
    expect(updated.author).toBe(updatedPayload.author);
    expect(updated.isbn).toBe(createdBook.isbn);
  });

  test('5. PUT с пустым title не должен ломать структуру (API примет)', async () => {
    const updatedPayload = generateBookPayload({
      isbn: createdBook.isbn,
      title: '',
      author: 'Another Author'
    });

    const updated = await booksController.updateBook(createdBook.isbn, updatedPayload);
    expect(updated.title).toBe('');
    expect(updated.author).toBe('Another Author');
  });

  test('6. DELETE /Book?ISBN={isbn} удаляет книгу и возвращает 204', async () => {
    const status = await booksController.deleteBook(createdBook.isbn);
    expect(status).toBe(204);
  });

  test('7. После DELETE книга недоступна через GET (404)', async () => {
    await expect(booksController.getBookByISBN(createdBook.isbn)).rejects.toThrowErrorMatchingObject({
      response: { status: 404 }
    });
  });

  test('8. Можно добавить несколько книг подряд с разными ISBN', async () => {
    const books = [];
    for (let i = 0; i < 3; i++) {
      const payload = generateBookPayload({ title: `Batch Book ${i}` });
      const book = await booksController.addBook(payload);
      books.push(book);
    }

    expect(books.length).toBe(3);

    const isbns = books.map(b => b.isbn);
    expect(new Set(isbns).size).toBe(3);
  });

  test('9. При отсутствии токена POST /Books должен вернуть 401', async () => {
    // Создаём клиент без токена специально для проверки
    const unauthorizedController = new (require('../../framework/services/books.controller'))('');
    const payload = generateBookPayload();

    await expect(unauthorizedController.addBook(payload)).rejects.toThrowErrorMatchingObject({
      response: { status: 401 }
    });
  });

  test('10. Сквозной сценарий: создать → прочитать → обновить → удалить', async () => {
    const initialPayload = generateBookPayload({ title: 'End-to-End Book' });
    const created = await booksController.addBook(initialPayload);

    const read = await booksController.getBookByISBN(created.isbn);
    expect(read.title).toBe(initialPayload.title);

    const updatedPayload = { ...initialPayload, title: 'Updated End-to-End' };
    const updated = await booksController.updateBook(created.isbn, updatedPayload);
    expect(updated.title).toBe(updatedPayload.title);

    const deleteStatus = await booksController.deleteBook(updated.isbn);
    expect(deleteStatus).toBe(204);

    // Финальная проверка, что книги нет
    await expect(booksController.getBookByISBN(updated.isbn)).rejects.toThrowErrorMatchingObject({
      response: { status: 404 }
    });
  });
});

import { I } from 'codeceptjs';

// ============ PAGE OBJECTS ============

class LoginPage {
  private url: string = 'https://www.saucedemo.com/';
  private usernameField: string = '#user-name';
  private passwordField: string = '#password';
  private loginButton: string = '#login-button';
  private errorMessage: string = '[data-test="error"]';

  constructor(private I: CodeceptJS.I) {}

  visit(): void {
    this.I.amOnPage(this.url);
  }

  login(username: string, password: string): void {
    this.I.fillField(this.usernameField, username);
    this.I.fillField(this.passwordField, password);
    this.I.click(this.loginButton);
  }

  loginAsStandardUser(): void {
    this.login('standard_user', 'secret_sauce');
  }

  loginAsLockedOutUser(): void {
    this.login('locked_out_user', 'secret_sauce');
  }

  loginAsProblemUser(): void {
    this.login('problem_user', 'secret_sauce');
  }

  loginAsPerformanceGlitchUser(): void {
    this.login('performance_glitch_user', 'secret_sauce');
  }

  seeLoginPage(): void {
    this.I.seeInCurrentUrl(this.url);
    this.I.seeElement(this.loginButton);
  }

  seeErrorMessage(message: string): void {
    this.I.seeElement(this.errorMessage);
    this.I.see(message, this.errorMessage);
  }

  getUrl(): string {
    return this.url;
  }
}

class InventoryPage {
  private url: string = 'https://www.saucedemo.com/inventory.html';
  private pageTitle: string = '.title';
  private productContainer: string = '.inventory_list';
  private products: string = '.inventory_item';
  private productNames: string = '.inventory_item_name';
  private productPrices: string = '.inventory_item_price';
  private productDescriptions: string = '.inventory_item_desc';
  private sortDropdown: string = '[data-test="product_sort_container"]';
  private addToCartButtons: string = '.btn_inventory';
  private removeButtons: string = '.btn_secondary';
  private shoppingCartLink: string = '.shopping_cart_link';
  private shoppingCartBadge: string = '.shopping_cart_badge';
  private menuButton: string = '#react-burger-menu-btn';
  private logoutLink: string = '#logout_sidebar_link';

  constructor(private I: CodeceptJS.I) {}

  seeInventoryPage(): void {
    this.I.seeInCurrentUrl(this.url);
    this.I.seeElement(this.productContainer);
    this.I.see('Products', this.pageTitle);
  }

  seeProductsCount(count: number): void {
    this.I.seeNumberOfElements(this.products, count);
  }

  async getFirstProductName(): Promise<string> {
    return await this.I.grabTextFrom(`${this.productNames}:first-child`);
  }

  async getFirstProductPrice(): Promise<string> {
    return await this.I.grabTextFrom(`${this.productPrices}:first-child`);
  }

  async getProductNames(): Promise<string[]> {
    return await this.I.grabTextFromAll(this.productNames);
  }

  async getProductPrices(): Promise<string[]> {
    return await this.I.grabTextFromAll(this.productPrices);
  }

  addProductToCart(index: number = 0): void {
    const buttonSelector = `${this.addToCartButtons}:nth-child(${index + 1})`;
    this.I.click(buttonSelector);
  }

  addMultipleProductsToCart(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addProductToCart(i);
    }
  }

  addProductByName(productName: string): void {
    const productSelector = `.inventory_item:has-text("${productName}")`;
    this.I.click(`${productSelector} ${this.addToCartButtons}`);
  }

  removeProductFromCart(index: number = 0): void {
    const buttonSelector = `${this.removeButtons}:nth-child(${index + 1})`;
    this.I.click(buttonSelector);
  }

  sortProductsBy(option: string): void {
    this.I.selectOption(this.sortDropdown, option);
  }

  seeCartCount(count: number): void {
    if (count > 0) {
      this.I.see(count.toString(), this.shoppingCartBadge);
    } else {
      this.I.dontSeeElement(this.shoppingCartBadge);
    }
  }

  goToCart(): void {
    this.I.click(this.shoppingCartLink);
  }

  openMenu(): void {
    this.I.click(this.menuButton);
  }

  logout(): void {
    this.openMenu();
    this.I.click(this.logoutLink);
  }

  getUrl(): string {
    return this.url;
  }
}

class CartPage {
  private url: string = 'https://www.saucedemo.com/cart.html';
  private pageTitle: string = '.title';
  private cartItems: string = '.cart_item';
  private cartItemNames: string = '.inventory_item_name';
  private cartItemPrices: string = '.inventory_item_price';
  private checkoutButton: string = '#checkout';
  private continueShoppingButton: string = '#continue-shopping';
  private removeButtons: string = '.cart_button';

  constructor(private I: CodeceptJS.I) {}

  seeCartPage(): void {
    this.I.seeInCurrentUrl(this.url);
    this.I.seeElement(this.checkoutButton);
    this.I.see('Your Cart', this.pageTitle);
  }

  seeItemsInCart(count: number): void {
    this.I.seeNumberOfElements(this.cartItems, count);
  }

  seeItemInCart(itemName: string): void {
    this.I.see(itemName, this.cartItemNames);
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.I.grabTextFromAll(this.cartItemNames);
  }

  async getCartItemPrices(): Promise<string[]> {
    return await this.I.grabTextFromAll(this.cartItemPrices);
  }

  removeItem(index: number = 0): void {
    this.I.click(`${this.removeButtons}:nth-child(${index + 1})`);
  }

  continueShopping(): void {
    this.I.click(this.continueShoppingButton);
  }

  proceedToCheckout(): void {
    this.I.click(this.checkoutButton);
  }

  getUrl(): string {
    return this.url;
  }
}

class CheckoutPage {
  private url: string = 'https://www.saucedemo.com/checkout-step-one.html';
  private firstNameField: string = '#first-name';
  private lastNameField: string = '#last-name';
  private postalCodeField: string = '#postal-code';
  private continueButton: string = '#continue';
  private cancelButton: string = '#cancel';
  private errorMessage: string = '[data-test="error"]';

  constructor(private I: CodeceptJS.I) {}

  seeCheckoutPage(): void {
    this.I.seeInCurrentUrl(this.url);
    this.I.seeElement(this.continueButton);
  }

  fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): void {
    this.I.fillField(this.firstNameField, firstName);
    this.I.fillField(this.lastNameField, lastName);
    this.I.fillField(this.postalCodeField, postalCode);
  }

  continue(): void {
    this.I.click(this.continueButton);
  }

  cancel(): void {
    this.I.click(this.cancelButton);
  }

  seeErrorMessage(message: string): void {
    this.I.seeElement(this.errorMessage);
    this.I.see(message, this.errorMessage);
  }

  getUrl(): string {
    return this.url;
  }
}

// ============ INSTANTIATE PAGE OBJECTS ============

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

// ============ TESTS ============

Feature('SauceDemo E-commerce Tests');

Before(({ I }) => {
  loginPage = new LoginPage(I);
  inventoryPage = new InventoryPage(I);
  cartPage = new CartPage(I);
  checkoutPage = new CheckoutPage(I);

  loginPage.visit();
  I.waitForElement('#login-button', 5);
});

Scenario('Test 1: Успешный вход в систему с корректными учетными данными', async ({ I }) => {
  // Act
  loginPage.loginAsStandardUser();

  // Assert
  inventoryPage.seeInventoryPage();
  I.see('Products', '.title');
});

Scenario('Test 2: Отображение ошибки при входе с заблокированным пользователем', async ({ I }) => {
  // Act
  loginPage.loginAsLockedOutUser();

  // Assert
  loginPage.seeErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  I.seeInCurrentUrl(loginPage.getUrl());
});

Scenario('Test 3: Добавление товаров в корзину и проверка счетчика', async ({ I }) => {
  // Arrange
  loginPage.loginAsStandardUser();
  inventoryPage.seeInventoryPage();

  // Act
  const firstProductName = await inventoryPage.getFirstProductName();
  const firstProductPrice = await inventoryPage.getFirstProductPrice();

  inventoryPage.addProductToCart(0);
  inventoryPage.addProductToCart(1);

  // Assert
  inventoryPage.seeCartCount(2);

  // Act
  inventoryPage.goToCart();

  // Assert
  cartPage.seeCartPage();
  cartPage.seeItemsInCart(2);
  cartPage.seeItemInCart(firstProductName);
  I.see(firstProductPrice, '.inventory_item_price');
});

Scenario('Test 4: Сортировка товаров по цене от высокой к низкой', async ({ I }) => {
  // Arrange
  loginPage.loginAsStandardUser();
  inventoryPage.seeInventoryPage();

  // Act
  const pricesBeforeSort = await inventoryPage.getProductPrices();

  // Sort by price high to low
  inventoryPage.sortProductsBy('hilo');
  I.wait(1); // Wait for sorting animation
  const pricesAfterSort = await inventoryPage.getProductPrices();

  // Assert
  const firstPriceAfterSort = await inventoryPage.getFirstProductPrice();
  I.assertEqual(firstPriceAfterSort, '$49.99');

  // Verify prices are different after sorting
  I.assertNotEqual(pricesBeforeSort[0], pricesAfterSort[0]);

  // Sort by price low to high
  inventoryPage.sortProductsBy('lohi');
  I.wait(1);
  const priceLowToHigh = await inventoryPage.getFirstProductPrice();
  I.assertEqual(priceLowToHigh, '$7.99');
});

Scenario('Test 5: Полный цикл покупки - добавление, проверка корзины и оформление заказа', async ({ I }) => {
  // Arrange
  loginPage.loginAsStandardUser();
  inventoryPage.seeInventoryPage();

  // Act - Add products
  const productName = 'Sauce Labs Backpack';
  inventoryPage.addProductByName(productName);
  inventoryPage.seeCartCount(1);

  // Go to cart
  inventoryPage.goToCart();
  cartPage.seeCartPage();
  cartPage.seeItemsInCart(1);
  cartPage.seeItemInCart(productName);

  // Proceed to checkout
  cartPage.proceedToCheckout();
  checkoutPage.seeCheckoutPage();

  // Fill checkout information
  checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  checkoutPage.continue();

  // Assert - Check overview page
  I.seeInCurrentUrl('https://www.saucedemo.com/checkout-step-two.html');
  I.see('Checkout: Overview', '.title');
  I.see(productName, '.inventory_item_name');

  // Complete order
  I.click('#finish');

  // Assert - Order complete
  I.seeInCurrentUrl('https://www.saucedemo.com/checkout-complete.html');
  I.see('Checkout: Complete!', '.title');
  I.see('Thank you for your order', '.complete-header');
});

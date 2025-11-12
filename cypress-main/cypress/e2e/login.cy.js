import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); //Перейти на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверка цвета забыл пароль
    });

   afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Проверка крестик виден пользователю
    });

   it('Правильный логин и правильный логин пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввести верный логин
        cy.get(main_page.password).type(data.password); // Ввести верный пароль
        cy.get(main_page.login_button).click(); // Нажать войти
        cy.get(result_page.title).contains('Авторизация прошла успешно');  // Проверка текста просле авторизации
        cy.get(result_page.title).should('be.visible'); // Проверка текст виден пользователю
    })

    it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password_page.email).type(data.login);
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
        cy.get(result_page.title).should('be.visible');
    })

    it('Правильный логин и НЕправильный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('iLoveqastudio2');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

    it('НЕправильный логин и правильный пароль', function () {
        cy.get(main_page.email).type('name@dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

    it('Валидация на наличие @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    })

    it('Приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
        cy.get(result_page.title).should('be.visible');
    })

})


// запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome

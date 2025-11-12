import * as signin from "../locators/pokemon_battle/signin.json";
import * as main from "../locators/pokemon_battle/main.json";
import * as trainer from "../locators/pokemon_battle/trainer.json";
import * as avatars from "../locators/pokemon_battle/avatars.json";
import * as payment from "../locators/pokemon_battle/payment.json";
import * as confirm from "../locators/pokemon_battle/confirm.json";
import * as data from "../helpers/default_data_pokemon_battle.json"

describe('Сквозной e2e автотест для покемонов: на покупку нового аватара для своего тренера', function () {

    beforeEach('Начало теста', function () {
        cy.visit('https://pokemonbattle.ru/');
        cy.get(signin.email).type(data.login);
        cy.get(signin.password).type(data.password);
        cy.get(signin.login_button).click();
    });

   it('Покупка аватара', function () {
        cy.get(main.trainer).click();
        cy.get(trainer.change_avatar).click();
        cy.get(avatars.avatar).first().click();
        cy.get(payment.card_number).type('4620869113632996');
        cy.get(payment.card_date).type('1226');
        cy.get(payment.card_csv).type('125');
        cy.get(payment.card_name).type('NAME');
        cy.get(payment.btn_pay).click();
        cy.get(confirm.sms).type('56456');
        cy.get(confirm.btn_confirm).click();
        cy.contains('Покупка прошла успешно').should('be.visible');
    })

})


// запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome

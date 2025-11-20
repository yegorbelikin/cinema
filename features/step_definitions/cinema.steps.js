const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { clickElement, choiseTheChair } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(string, {
    setTimeout: 20000,
  });
});

When("user selects row and place", async function () {
  await choiseTheChair(this.page);
  await clickElement(this.page, "button");
  await this.page.waitForSelector(".ticket__details.ticket__chairs");
});

Then("the selected seat {string} is reserved", async function (string) {
  const chairText = await this.page.$eval(
    ".ticket__details.ticket__chairs",
    (element) => element.textContent
  );
  expect(chairText).contains(string);
});

When("user selects VIPchair", async function () {
  await choiseTheChair(this.page);
  await clickElement(this.page, "button");
  await this.page.waitForSelector(".ticket__details.ticket__cost");
});

Then(
  "the selected VIPchair for {string} rubles is reserved",
  async function (string) {
    const chairPrice = await this.page.$eval(
      ".ticket__details.ticket__cost",
      (element) => element.textContent
    );
    expect(chairPrice).contain(string);
  }
);

When("user selects and reserved chair", async function () {
  await choiseTheChair(this.page);
  await clickElement(this.page, "button");
  await this.page.waitForSelector(".ticket__check-title");
  await clickElement(this.page, "button");
  await this.page.goto("https://qamid.tmweb.ru/client/index.php");
  await choiseTheChair(this.page);
});

Then("user sees an inactive button and seat", async function () {
  const disableButton = (await this.page.$("button[disabled]")) !== null;
  expect(disableButton).to.equal(true);
  const takenChair = await this.page.$eval(
    "div:nth-child(10) span:nth-child(8)",
    (el) => el.className
  );
  const hasClass = takenChair.includes(
    "buying-scheme__chair buying-scheme__chair_vip buying-scheme__chair_taken"
  );
  expect(hasClass).to.equal(true);
});

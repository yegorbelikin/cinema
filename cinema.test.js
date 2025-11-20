const { clickElement } = require("./lib/commands.js");
const { choiseTheChair } = require("./lib/commands.js");

let page;

afterEach(() => {
  page.close();
});

describe("Let's go to the cinema tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("successful choice of chair", async () => {
    await choiseTheChair(page);
    await clickElement(page, "button");
    await page.waitForSelector(".ticket__details.ticket__chairs");
    const chairText = await page.$eval(
      ".ticket__details.ticket__chairs",
      (element) => element.textContent
    );
    expect(chairText).toContain("10/8");
  }, 60000);

  test("successful choice of VIPchair", async () => {
    await choiseTheChair(page);
    const vipchairPrice = await page.$eval(
      "p:nth-child(2) span:nth-child(2)",
      (element) => element.textContent
    );
    await clickElement(page, "button");
    await page.waitForSelector(".ticket__details.ticket__cost");
    const chairPrice = await page.$eval(
      ".ticket__details.ticket__cost",
      (element) => element.textContent
    );
    expect(chairPrice).toContain(vipchairPrice);
  }, 60000);

  test("unsuccessful choice of token chair'", async () => {
    await choiseTheChair(page);
    await clickElement(page, "button");
    await page.waitForSelector(".ticket__check-title");
    await clickElement(page, "button");
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await choiseTheChair(page);
    const disableButton = (await page.$("button[disabled]")) !== null;
    expect(disableButton).toBe(true);
    const takenChair = await page.$eval(
      "div:nth-child(10) span:nth-child(8)",
      (el) => el.className
    );
    const hasClass = takenChair.includes(
      "buying-scheme__chair buying-scheme__chair_vip buying-scheme__chair_taken"
    );
    expect(hasClass).toBe(true);
  }, 60000);
});

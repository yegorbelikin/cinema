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

  test("successful choice of chair'", async () => {
    await clickElement(page, "a:nth-child(5)");
    await clickElement(page, '[data-seance-id="223"]');
    await clickElement(page, "div:nth-child(3) span:nth-child(5)");
    await clickElement(page, "button");
    await page.waitForSelector(".ticket__details.ticket__chairs");
    const chairText = await page.$eval(
      ".ticket__details.ticket__chairs",
      (element) => element.textContent
    );
    expect(chairText).toContain("3/5");
  }, 60000);

  test("successful choice of VIPchair'", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(page, '[data-seance-id="225"]');
    await clickElement(page, "div:nth-child(10) span:nth-child(10)");
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
    await clickElement(page, "a:nth-child(6)");
    await clickElement(page, '[data-seance-id="225"]');
    await clickElement(page, "div:nth-child(10) span:nth-child(10)");
    await clickElement(page, "button");
    await page.waitForSelector(".ticket__check-title");
    await clickElement(page, "button");
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "a:nth-child(6)");
    await clickElement(page, '[data-seance-id="225"]');
    await clickElement(page, "div:nth-child(10) span:nth-child(10)");
    const is_disabled = (await page.$("button[disabled]")) !== null;
    await console.log(is_disabled);
    expect(is_disabled).toBe(true);
  }, 60000);
});

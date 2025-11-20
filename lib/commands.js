async function clickElement(page, selector) {
  try {
    await page.waitForSelector(selector);
    await page.click(selector);
  } catch (error) {
    throw new Error(`Selector is not clickable: ${selector}`);
  }
}

async function choiseTheChair(page) {
  await clickElement(page, "a:nth-child(4)");
  await clickElement(page, '[data-seance-id="225"]');
  await clickElement(page, "div:nth-child(10) span:nth-child(8)");
}

module.exports = {
  clickElement,
  choiseTheChair,
};

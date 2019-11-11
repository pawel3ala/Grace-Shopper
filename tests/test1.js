const chrome = require('selenium-webdriver/chrome')
const {Builder, By, Key, until} = require('selenium-webdriver')
const {expect} = require('chai')

const screen = {
  width: 1024,
  height: 768
}

describe('Test1', () => {
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .build()

  it('should go to homepage and check if 10 products available', async () => {
    await driver.get('https://boiling-lake-46318.herokuapp.com/')
    const amountOfProducts = await driver.findElements(
      By.className('productDiv')
    )
    expect(amountOfProducts.length).equals(10)
  })

  after(function() {
    driver.quit()
  })
})

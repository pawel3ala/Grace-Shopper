const puppeteer = require('puppeteer')
const {expect} = require('chai')

describe('GrapefruitShopper homepage', () => {
  let browser
  let page

  beforeEach(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto('https://grapefruitshopper.herokuapp.com')
    //TODO: unhardcode www address
  })

  afterEach(async () => {
    if (browser) await browser.close()
  })

  it('should have the correct page title', async () => {
    expect(await page.title()).to.eql('The GrapefruitShopper')
  })
})

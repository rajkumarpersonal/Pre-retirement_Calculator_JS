const { When, Then, Given } = require("@cucumber/cucumber");
const webdriver = require("selenium-webdriver");
const {
  Builder,
  By,
  until,
  window,
  WebDriverWait,
  elementIsEnabled,
} = require("selenium-webdriver");
const cucumberHtmlReporter = require("cucumber-html-reporter");
const { Key,click,perform,actions } = require("selenium-webdriver/lib/input");

const { setDefaultTimeout, setTimeouts } = require("@cucumber/cucumber");
setDefaultTimeout(70 * 1000);

const driver = new webdriver.Builder()
  .forBrowser(webdriver.Browser.CHROME)
  .build();

Given("I Open The Pre-retirement calculator", async () => {
  driver
    .navigate()
    .to("https://www.securian.com/insights-tools/retirement-calculator.html");
  driver.manage().window().maximize();
  driver.manage().deleteAllCookies();
});

When("Common details of the form", { timeout: 60 * 1000 }, async () => {
  await driver.findElement(webdriver.By.id("current-age")).sendKeys("40");
  await driver.findElement(webdriver.By.id("retirement-age")).sendKeys("68");

  try {
    const currentIncome = await driver.findElement(
      webdriver.By.id("current-income")
    );
    await currentIncome.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await currentIncome.sendKeys("100000");

    const spouseIncome = await driver.findElement(
      webdriver.By.id("spouse-income")
    );
    await spouseIncome.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await spouseIncome.sendKeys("75000");

    const savingsBalance = await driver.findElement(
      webdriver.By.id("current-total-savings")
    );
    await savingsBalance.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await savingsBalance.sendKeys("500000");

    const currentAnnualSaving = await driver.findElement(
      webdriver.By.id("current-annual-savings")
    );
    await currentAnnualSaving.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await currentAnnualSaving.sendKeys("10");

    const rateOfIncrease = await driver.findElement(
      webdriver.By.id("savings-increase-rate")
    );
    await rateOfIncrease.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await rateOfIncrease.sendKeys("2");
  } finally {
  }
});

When("Submit the application", async () => {
  //  const xpath = '//*[@id="retirement-form"]/div[4]/div[2]/div[1]/button"';

  async function scrollDown() {
    try {
      // Scroll down using JavaScriptExecutor
      await driver.executeScript("window.scrollTo(0, 600);");

      // Wait for a moment to allow the page to scroll
      await driver
        .findElement(
          By.xpath("//*[@id='retirement-form']/div[4]/div[2]/div[1]/button")
        )
        .click();
    } finally {
    }
  }

  scrollDown();
});

Then("Validate results", { timeout: 60 * 1000 }, async () => {
  try {
    let { setDefaultTimeout } = require("@cucumber/cucumber");

    setDefaultTimeout(70 * 1000);

    let result = await driver.findElement(By.id("result-message")).getText();
    let resultMessage = result.replace("$", "");
    console.log(`Result Message is : `, resultMessage);

    let retirementMoney = await driver
      .findElement(By.id("retirement-amount-results"))
      .getText();
    console.log("Minimum needed to retire is : ", retirementMoney);

    let moneySaved = await driver
      .findElement(By.id("current-savings-results"))
      .getText();
    console.log(`What you have saved is : `, moneySaved);
  } finally {
  }
});

Then("Edit Info", { timeout: 60 * 1000 }, async () => {
  

  async function scrollDown() {
    try {
      // Scroll down using JavaScriptExecutor
      await driver.executeScript("window.scrollTo(0, 800);");

      

      const edit = await driver.findElement(
        By.xpath(
          "//*[@id='calculator-results-container']/div[2]/div[2]/div[2]/div/div[2]/div/button"
        )
      )
      await driver.wait(until.elementIsVisible(edit), 10000)
      await edit.click()

    } 
    finally {
      
    }
  }

  scrollDown();
});

Then("Clear form", async () => {

  async function scrollDown() {
    try {
      // Scroll down using JavaScriptExecutor
      await driver.executeScript("window.scrollTo(0, window.To.Height);");


      let el = await driver.findElement(
        By.xpath(
          "//*[@id='retirement-form']/div[4]/div[2]/div[2]/button"))
      await driver.wait(until.elementIsVisible(el), 10000)

      await el.click()
      scrollDown();
     
    } finally {
      // await driver.quit();
    }
  }

 
});

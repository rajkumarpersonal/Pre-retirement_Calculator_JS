const { When, Then, Given } = require("@cucumber/cucumber");
//const { Before } = require('cucumber');
const webdriver = require("selenium-webdriver");
const { Builder, By, Key, until, window } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const cucumberHtmlReporter = require("cucumber-html-reporter");

const { setDefaultTimeout, Before } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

let driver = new webdriver.Builder()
  .forBrowser(webdriver.Browser.CHROME)
  .build();

Given("Open Pre-retirement calculator", async () => {
  driver
    .navigate()
    .to("https://www.securian.com/insights-tools/retirement-calculator.html");
  driver.manage().window().maximize();
  driver.manage().deleteAllCookies();
});

Then("Fill the Common details of the form", async (applicationDetails) => {

  //object values
  applicationDetails({
    currentAge: 40,
    retiredAge: 68,
    currentIncome: 100000,
    spouseIncome: 75000,
    savingsBalance: 500000,
    currentAnnualSaving: 10,
    rateOfIncrease: 2
  }) 
  
  await driver.findElement(webdriver.By.id("current-age")).sendKeys(`${currentAge}`);
  await driver.findElement(webdriver.By.id("retirement-age")).sendKeys(`${retiredAge}`);

  try {
    const currentIncome = await driver.findElement(
      webdriver.By.id("current-income")
    );
    await currentIncome.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await currentIncome.sendKeys(`${currentIncome}`);

    const spouseIncome = await driver.findElement(
      webdriver.By.id("spouse-income")
    );
    await spouseIncome.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await spouseIncome.sendKeys(`${spouseIncome}`);

    const savingsBalance = await driver.findElement(
      webdriver.By.id("current-total-savings")
    );
    await savingsBalance.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await savingsBalance.sendKeys(`${savingsBalance}`);

    const currentAnnualSaving = await driver.findElement(
      webdriver.By.id("current-annual-savings")
    );
    await currentAnnualSaving.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await currentAnnualSaving.sendKeys(`${currentAnnualSaving}`);

    const rateOfIncrease = await driver.findElement(
      webdriver.By.id("savings-increase-rate")
    );
    await rateOfIncrease.click();
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await rateOfIncrease.sendKeys(`${rateOfIncrease}`);
  } finally {
  }
 
});

Then("Fill the additional details", function () {
  async function scrollDown() {
    //securityBenefitsYes
    await driver
      .findElement(
        By.xpath("//*[@id='include-social-container']/ul/li[1]/label")
      )
      .click();

    try {
      // Scroll down using JavaScriptExecutor
      await driver.executeScript("window.scrollTo(0, 500);");

      // Wait for a moment to allow the page to scroll
      // Marital Status
      await driver
        .findElement(By.xpath("//*[@id='marital-status-ul']/li[2]"))
        .click();

      await driver.executeScript("window.scrollTo(0, 500);");

      // SecurityOverride Amount entering
      const securityOverrideAmount = await driver.findElement(
        By.id("ssocial-security-override")
      );
      await driver.wait(until.elementIsVisible(securityOverrideAmount), 10000);
      await securityOverrideAmount.click();
      await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
      await securityOverrideAmount.sendKeys("2");
    } finally {
    }
  }

  scrollDown();
});

Then("Click on the calculator", async () => {
  //  const xpath = '//*[@id="retirement-form"]/div[4]/div[2]/div[1]/button"';

  async function scrollDown() {
    try {
      // Scroll down using JavaScriptExecutor
      await driver.executeScript("window.scrollTo(0, 500);");

      // Wait for a moment to allow the page to scroll - Calculate Button
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

Then("Check the results", { timeout: 60 * 1000 }, async () => {

  let result = await driver.findElement(By.id("result-message"));
  await driver.wait(until.elementIsVisible(result), 10000);
  let resultMessage = result.getText();
  console.log("The Result Message is : ", resultMessage);

  let retiremoney = await driver.findElement(
    By.id("retirement-amount-results")
  );
  await driver.wait(until.elementIsVisible(retiremoney), 10000);
  let retirementMoney = retiremoney.getText();
  console.log("The Result Message is : ", retirementMoney);

  let savemoney = await driver.findElement(By.id("current-savings-results"));
  await driver.wait(until.elementIsVisible(savemoney), 10000);
  let moneySaved = savemoney.getText();
  console.log("The Result Message is : ", moneySaved);
});

Then("The Edit Info", { timeout: 60 * 1000 }, async () => {
  async function scrollDown() {
    try {
      await driver.executeScript("window.scrollTo(0, 800);")

      const el = await driver.findElement(
        By.xpath(
          "//*[@id='calculator-results-container']/div[2]/div[2]/div[2]/div/div[2]/div/button"
        )
      )
      await driver.wait(until.elementIsVisible(el), 10000)

      await el.click().perform()
    } finally {
    }
  }

  scrollDown();
});

Then("Clear the application form", async () => {
  async function scrollDown() {
    try {
      // Scroll down using JavaScriptExecutor
      await driver.executeScript("window.scrollTo(0, window.To.Height);");

      let el = await driver.findElement(
        By.xpath("//*[@id='retirement-form']/div[4]/div[2]/div[2]/button")
      );
      await driver.wait(until.elementIsVisible(el), 10000);

      await el.click();
      scrollDown();
    } finally {
      // await driver.quit();
    }
  }
});

const { When, Then, Given } = require('@cucumber/cucumber')
//const { Before } = require('cucumber');
const webdriver = require('selenium-webdriver');
const { Builder, By, Key, until, window } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const cucumberHtmlReporter = require('cucumber-html-reporter');

const {setDefaultTimeout, Before} = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);



let driver = new webdriver.Builder()
    .forBrowser(webdriver.Browser.CHROME)
    .build();

    Given('Open Pre-retirement calculator',  async() => {
        driver.navigate().to("https://www.securian.com/insights-tools/retirement-calculator.html")
        driver.manage().window().maximize()
        
      });
    
        
    Then('Fill the Common details of the form', async() => {  
      await driver.findElement(webdriver.By.id("current-age")).sendKeys("40");
      await driver.findElement(webdriver.By.id("retirement-age")).sendKeys("68")
    
      try{
        const currentIncome = await driver.findElement(webdriver.By.id('current-income'))
        await currentIncome.click();
        await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
        await currentIncome.sendKeys('100000');
    
        const spouseIncome = await driver.findElement(webdriver.By.id('spouse-income'))
        await spouseIncome.click();
        await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
        await spouseIncome.sendKeys('75000');
    
        const savingsBalance = await driver.findElement(webdriver.By.id('current-total-savings'))
        await savingsBalance.click();
        await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
        await savingsBalance.sendKeys('500000');
    
        const currentAnnualSaving = await driver.findElement(webdriver.By.id('current-annual-savings'))
        await currentAnnualSaving.click();
        await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
        await currentAnnualSaving.sendKeys('10');
    
        const rateOfIncrease = await driver.findElement(webdriver.By.id('savings-increase-rate'))
        await rateOfIncrease.click();
        await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
        await rateOfIncrease.sendKeys('2');
    
        }
        finally{
          
        }
      
      
      });

      Then('Fill the additional details', function () {

        async function scrollDown() {
            //securityBenefitsYes
            await driver.findElement(By.xpath("//*[@id='include-social-container']/ul/li[1]/label")).click()

            try {
                 
              // Scroll down using JavaScriptExecutor
              await driver.executeScript('window.scrollTo(0, 500);');
          
              // Wait for a moment to allow the page to scroll
              // Marital Status
              await driver.findElement(By.xpath("//*[@id='marital-status-ul']/li[2]")).click()

             // SecurityOverride Amount entering   
              const securityOverrideAmount = await driver.findElement(webdriver.By.id('ssocial-security-override'))
              await securityOverrideAmount.click();
              await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
              await securityOverrideAmount.sendKeys('2');   

                       
            } finally {
              
            }
          }
          
          scrollDown();

        
      });  
    
      Then('Click on the calculator', async() => {
    
        //  const xpath = '//*[@id="retirement-form"]/div[4]/div[2]/div[1]/button"'; 
    
          async function scrollDown() {
           
            try {
                 
              // Scroll down using JavaScriptExecutor
              await driver.executeScript('window.scrollTo(0, 500);');
          
              // Wait for a moment to allow the page to scroll - Calculate Button
              await driver.findElement(By.xpath("//*[@id='retirement-form']/div[4]/div[2]/div[1]/button")).click()
                       
            } finally {
              
            }
          }
          
          scrollDown();
    });  

    Then('Check the results', {timeout: 60 * 1000}, async() => {
      
      Before({timeout: 60 * 1000}, function() {
        // Does some slow browser/filesystem/network actions
      });
    
      let result = await driver.findElement(By.id("result-message")).getText();
      console.log("The Result Message is : ", result);
    
      let retirementMoney = await driver.findElement(By.id("retirement-amount-results")).getText();
      console.log("Minimum needed to retire is : ", retirementMoney);
    
      let moneySaved = await driver.findElement(By.id("current-savings-results")).getText();
      console.log("What you have saved is : ", moneySaved);
    });
    
        
    Then('Clear the application form', async() => {
    
      async function scrollDown() {

        await driver.findElement(By.xpath('//*[@id="calculator-results-container"]/div[2]/div[2]/div[2]/div/div[2]/div/button')).click();
  
           
        try {
             
          // Scroll down using JavaScriptExecutor
          await driver.executeScript('window.scrollTo(0, 700);');
      
          // Wait for a moment to allow the page to scroll
          await driver.findElement(By.xpath("//*[@id='retirement-form']/div[4]/div[2]/div[2]/button")).click()
                   
        } finally {
            await driver.quit()
        }
      }
      
      scrollDown();

      
    });
    
import LoginPage from '../pageobjects/login.page.ts'

import { AndroidInfo } from '../../config/android.info.ts';
// import SecurePage from '../pageobjects/secure.page.js'
import logger from '@wdio/logger'
const log: any = logger('Authentication');
// import { getVerificationCode } from '../pageobjects/yopmail.ts'

describe('My Login application', () => {
    // let testCases: any;

    it('Start an empty spec to support record video for all other specs', async () => {
        // This test is empty to support video recording for all other specs
        // await browser.url('https://translate.google.com/');
        // await browser.saveScreenshot(`./logs/Launch the yopmail site.png`);
        // await getVerificationCode();
        // await browser.saveScreenshot(`./logs/yopmail.png`);
    });

    // testCases = (global as any).testData['TC1'];
    // testCases.forEach((testData: any) => {
    //     it(`should login with User ${testData.Username} Password ${testData.Password}`, async () => {
    //         try {
    //             // Set test data
    //             testData.sheet = 'TC1';
    //             (global as any).testCase = testData;

    //             // Install the app
    //             await LoginPage.installApp();
    //             log.info(`Installed the app successfully`);

    //             // Log the credentials being used for login
    //             log.info(`Logging in with User: ${testData.Username}, Password: ${testData.Password}`);

    //             // Perform login
    //             await LoginPage.login(testData.Username, testData.Password);
    //             log.info(`Login action performed`);

    //             // Handle notification permission
    //             await LoginPage.handleNotificationPermission(true);
    //             log.info(`Notification permission handled`);

    //             // Handle location permission
    //             await LoginPage.handleLocationPermission(true);
    //             log.info(`Location permission handled`);

    //             // Wait for the greeting element to be displayed
    //             await LoginPage.waitForDisplayed(await LoginPage.greeting, 30000);
    //             log.info(`Greeting element displayed`);

    //             // Verify that the greeting element is displayed
    //             const isGreetingDisplayed = await (await LoginPage.greeting).isDisplayed();
    //             await expect(isGreetingDisplayed).toBeTrue();
    //             log.info('Login success');

    //         } catch (error) {
    //             log.error(`Test failed with error: ${error}`);
    //             throw error; // Re-throw the error to ensure the test fails
    //         }
    //     });

    // })

    it('Yopmail', async () => {
        log.info(`Installed the app successfully`);
        // Open the app
        // const contexts: any = await browser.getContexts();
        // log.info(`Installed the app successfully ${contexts}`);
        // if (contexts.length > 1) {
        //     await browser.switchContext(contexts[1]); // Assuming the WebView is the second context

        //     // Perform actions in the WebView
        //     await browser.url('https://www.example.com');
        //     const title = await browser.getTitle();
        //     console.log('Web page title:', title);

        //     // Switch back to the native app context
        //     await browser.switchContext(contexts[0]);
        //     await LoginPage.login("anh.hoang+01@innomizetech.com", "123456");
        //     console.log('Switched back to native context');
        // } else {
        //     console.log('No WebView context available');
        // }
        //@ts-ignore
        // await mobile.pause(3000); // wait for the app to load
        // log.info(`Installed the app successfully ${driver.getContexts()}`);
        // var caps = await browser['web'].session();
        // log.info('Installed the app successfully' + caps);
        // log.info(`Installed the app successfully ${JSON.stringify(driver)}`);
        // log.info(`Installed the app successfully ${JSON.stringify(browser)}`);
        //@ts-ignore
        // await LoginPage.login("anh.hoang+01@innomizetech.com", "123456");
        await browser.url('https://yopmail.com/');
        //@ts-ignore
        await browser.pause(10000);
        var mobileApp: WebdriverIO.Browser
        const app = await mobileApp.launchChromeApp({
            // capabilities for local Appium web tests on an Android Emulator
            'appium:platformName': 'Android',
            'appium:deviceName': AndroidInfo.deviceName(),
            'appium:platformVersion': AndroidInfo.platFormVersion(),
            'appium:automationName': 'UiAutomator2',
            'appium:app': AndroidInfo.appPath(),
            'appium:appPackage': AndroidInfo.appPackage(),
            'appium:fullReset': true,
            'appium:noReset': false,
            "appium:appWaitActivity": "*",
            // excludeDriverLogs: ['bugreport']
        })
        //@ts-ignore
        await app.pause(10000);

        // Get all available contexts
        // const contexts = await browser.getContexts();
        // console.log('Available contexts:', contexts);

        // Install the app
        // await LoginPage.installApp();
        // log.info(`Installed the app successfully`);

        // // Perform login
        // await LoginPage.login("anh.hoang+01@innomizetech.com", "123456");
        // log.info(`Login action performed`);
        // await LoginPage.handleNotificationPermission(true);
        // await LoginPage.handleLocationPermission(true);
        // // Verify that the greeting element is displayed
        // await LoginPage.waitForDisplayed(await LoginPage.greeting, 30000);
        // // const isGreetingDisplayed = await (await LoginPage.greeting).isDisplayed();
        // // await expect(isGreetingDisplayed).toBeTrue();
        // log.info('Login success');

        // await getVerificationCode();
    });
})


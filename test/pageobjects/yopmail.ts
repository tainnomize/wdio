import { remote, attach } from 'webdriverio';
import { AndroidInfo } from '../../config/android.info.ts';
import logger from '@wdio/logger';
const log: any = logger('Yopmail');

export async function getVerificationCode() {
    log.info(`getVerificationCode`);
    let chromeBrowser: WebdriverIO.Browser;
    chromeBrowser = await remote({
        protocol: 'http',
        hostname: 'localhost', // The Appium server hostname
        port: 4724,            // The Appium server port
        path: '/wd/hub',       // The Appium server path
        capabilities: {
            // browserName: 'chrome',
            // 'goog:chromeOptions': {
            //     args: ['--window-size=1920,1080']
            // },
            // acceptInsecureCerts: true
            platformName: 'Android',
            browserName: 'Chrome',
            'appium:deviceName': 'emulator-5554',
            'appium:platformVersion': '14.0',
            'appium:automationName': 'UiAutomator2',
            'appium:chromedriverExecutableDir': '.\\node_modules\\chromedriver\\lib\\chromedriver',
        },
        // baseUrl: 'https://yopmail.com/'
        // services: [[
        //     'appium',
        //     {
        //         logPath: './logs',
        //         command: 'appium',
        //         basePath: '/wd/hub',
        //         args: {
        //             address: 'localhost',
        //             port: 4724,
        //         }
        //     }
        // ]]
    });
    // const newBrowser = await attach(chromeBrowser)
    await chromeBrowser.url('https://yopmail.com/');
    await chromeBrowser.saveScreenshot(`./logs/Launch the yopmail site.png`);
    //Delete the browser session
    await chromeBrowser.deleteSession();
}

// {
//     'appium:platformName': 'Android',
//     'appium:browserName': 'Chrome',
//     'appium:deviceName': AndroidInfo.deviceName(),
//     'appium:platformVersion': AndroidInfo.platFormVersion(),
//     'appium:automationName': 'UiAutomator2',
//     'appium:chromedriverExecutableDir': '.\\node_modules\\chromedriver\\lib\\chromedriver',
// }
Npm init wdio

Add command: 'appium' if using appium to test mobile app
services: [
    [
      'appium',
      {
        logPath: './logs',
        command: 'appium',
        basePath: '/wd/hub'
      }
    ]
  ]



Kill port 4723 after executing:
Add the following to onComplete:
        const stdout = await cmd('npx kill-port 4723 -y');
        await log.info(`npx kill-port 4723 -y\n${stdout}`);

Add cmd function into the wdio.conf.ts

import { exec } from 'child_process';
function cmd(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

Config allureReporter
import { exec } from 'child_process';
import allureReporter from '@wdio/allure-reporter';


reporters: [
    [
      'allure',
      {
        outputDir: './logs/allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false
      }
    ]
  ],


beforeTest
    await allureReporter.addFeature(test.fullName);
    await browser.startRecordingScreen();

afterTest
    await browser.takeScreenshot();
    await browser.saveRecordingScreen(`./logs/${test.fullName}.mp4`);

onComplete
        const reportError = new Error('Could not generate Allure report');
        const generation = exec('allure generate ./logs/allure-results --clean -o ./logs/allure-report');

        return new Promise<void>((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 10000);

            generation.on('exit', function (exitCode: number) {
                clearTimeout(generationTimeout);

                if (exitCode !== 0) {
                    return reject(reportError);
                }

                console.log('Allure report successfully generated');
                resolve();
            });
        });

Config @wdio/logger

import logger from '@wdio/logger';
const log = logger('wdio');

    outputDir: './logs',


COMMON ISSUES
appium-service: Appium exited before timeout (exit code: 1)
=> Increase defaultTimeoutInterval greater than total execution time
jasmineOpts: {
        // Jasmine default timeout
        defaultTimeoutInterval: 60000,
       …
    },

No Chromedriver found that can automate Chrome '113.0.5672'. You could also try to enable automated chromedrivers download as a possible workaround.

Npm i chromedriver@113.0.0 (install correct version on emulator, not the latest)
Add 'appium:chromedriverExecutableDir': '.\\node_modules\\chromedriver\\lib\\chromedriver', to capabilities

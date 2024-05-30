import { expect } from '@wdio/globals'
// import LoginPage from '../pageobjects/login.page.js'
// import SecurePage from '../pageobjects/secure.page.js'
import logger from '@wdio/logger'
const log: any = logger('Authentication');

describe('My Login application', () => {
    let testCases: any;

    it('Start an empty spec to support record video for all other specs', async () => {
        // This test is empty to support video recording for all other specs
    });

    testCases = (browser as any).testData['TC1'];
    testCases.forEach((testData: any) => {
        it(`should login with User ${testData.Username} Password ${testData.Password}`, async () => {
            testData.sheet = 'TC1';
            (browser as any).testCase = testData;

            log.info(`User ${testData.Username} Password ${testData.Password}`);
            await LoginPage.open()
            await LoginPage.login('tomsmith', 'SuperSecretPassword!')
            log.info('Login success');

            await expect(SecurePage.flashAlert).toBeExisting()
        })
    })
})


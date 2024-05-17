import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import logger from '@wdio/logger'
const log = logger('wdio');

describe('My Login application', () => {
    it('should login with valid credentials', async () => { })
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        log.progress('some logs')
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
    })
})


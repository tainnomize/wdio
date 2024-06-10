
import { AndroidInfo } from '../../config/android.info.ts';
import logger from '@wdio/logger';
const log: any = logger('BasePage');

export default class Page {
    passed = 'PASSED';
    failed = 'FAILED';

    get signIn() { return $('//android.widget.Button[@resource-id="com.thegymcube.gymcube.dev:id/btnLogin"]'); }
    get createAccount() { return $('//android.widget.Button[@resource-id="com.thegymcube.gymcube.dev:id/btnRegister"]'); }
    get continueWithApple() { return $('Continue with Apple'); }
    get continueWithGoogle() { return $('Continue with Google'); }
    get allowNotification() { return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]'); }
    get dontAllowNotification() { return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]'); }
    get allowLocation() { return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_foreground_only_button"]'); }
    get dontAllowLocation() { return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]'); }
    get greeting() { return $('//android.widget.TextView[@resource-id="com.thegymcube.gymcube.dev:id/txtWelcomeText"]'); }
    // get session() { return $('//android.widget.TextView[@text="12:30 PM"]'); }
    get confirmBooking() { return $('//android.widget.TextView[@text="Confirm Booking"]'); }
    get stripePay() { return $('//android.widget.TextView[contains(text(),"Pay $")]'); }
    get addToWaitlist() { return $('//android.widget.TextView[@text="Add to waitlist"]'); }
    get closeWaitlist() { return $('//android.widget.TextView[@text="Close"]'); }

    //notifications
    get incorrectUsernamePassword() { return $('//android.widget.TextView[@text="The Email or Password is incorrect."]'); }
    get bookingCreatedSuccessfully() { return $('//android.widget.TextView[@text="Booking Created Successfully"]'); }


    public async waitForDisplayed(element: WebdriverIO.Element, timeout = 30000) {
        log.info(`waitForDisplayed:: ${timeout}`);
        try {
            await element.waitForDisplayed({ timeout: timeout });
        } catch (error) {
            log.warn(`waitForDisplayed:: ${error}`);
            return;
        }
    }

    /**
     * Function to handle notification permission
     * @param {boolean} allow - Boolean to allow (true) or deny (false) the notification permission
     */
    async handleNotificationPermission(allow: boolean): Promise<void> {
        // Check if the allowNotification element is displayed
        await this.waitForDisplayed(await this.allowNotification, 30000);
        const isAllowNotificationDisplayed = await this.allowNotification.isDisplayed();

        if (isAllowNotificationDisplayed) {
            if (allow) {
                await this.allowNotification.click();
            } else {
                await this.dontAllowNotification.waitForDisplayed({ timeout: 5000 });
                await this.dontAllowNotification.click();
            }
        } else {
            console.log('Allow notification button is not displayed. Ignoring permission handling.');
        }
    }

    /**
     * Function to handle location permission
     * @param {boolean} allow - Boolean to allow (true) or deny (false) the location permission
     */
    async handleLocationPermission(allow: boolean): Promise<void> {
        // Check if the allowLocation element is displayed
        await this.waitForDisplayed(await this.allowLocation, 30000);
        const isAllowLocationDisplayed = await this.allowLocation.isDisplayed();

        if (isAllowLocationDisplayed) {
            if (allow) {
                await this.allowLocation.click();
            } else {
                await this.dontAllowLocation.waitForDisplayed({ timeout: 5000 });
                await this.dontAllowLocation.click();
            }
        } else {
            console.log('Allow location button is not displayed. Ignoring permission handling.');
        }
    }

    public async installApp() {
        //Remove app and install again to run the app from beginner
        await browser.removeApp(AndroidInfo.appPackage());
        await browser.installApp(AndroidInfo.appPath());
        await browser.activateApp(AndroidInfo.appPackage());
    }
}
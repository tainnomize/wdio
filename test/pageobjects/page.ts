import logger from '@wdio/logger';
const log: any = logger('BasePage');

export default class Page {
    passed = 'PASSED';
    failed = 'FAILED';

    get signIn() { return $('Sign In'); }
    get createAccount() { return $('Create Account'); }
    get continueWithApple() { return $('Continue with Apple'); }
    get continueWithGoogle() { return $('Continue with Google'); }

    get username() { return $('//android.widget.LinearLayout[@resource-id="com.thegymcube.gymcube.dev:id/editTextEmail"]'); }
    get password() { return $('//android.widget.LinearLayout[@resource-id="com.thegymcube.gymcube.dev:id/editTextPassword"]'); }
    get eyeIcon() { return $('//android.widget.LinearLayout[@resource-id="com.thegymcube.gymcube.dev:id/editTextPassword"]//android.widget.ImageButton'); }

    async login(usernameValue: string, passwordValue: string) {
        try {
            await this.username.setValue(usernameValue);
            await this.password.setValue(passwordValue);
            await this.signIn.click();
            // Optionally, you can add additional verification steps after clicking sign in
        } catch (error) {
            log.error(`Login failed: ${error}`);
            throw new Error('Login failed');
        }
    }
}
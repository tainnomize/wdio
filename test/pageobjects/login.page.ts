import Page from './page.ts';
import logger from '@wdio/logger';
const log: any = logger('LoginPage');

class LoginPage extends Page {
    /**
     * define elements
     */

    get username() { return $('//android.widget.EditText[@resource-id="com.thegymcube.gymcube.dev:id/editTextEmail"]'); }
    get password() { return $('//android.widget.EditText[@resource-id="com.thegymcube.gymcube.dev:id/editTextPassword"]'); }
    get eyeIcon() { return $('//android.widget.LinearLayout[@resource-id="com.thegymcube.gymcube.dev:id/editTextPassword"]//android.widget.ImageButton'); }
    get loginSignIn() { return $('//android.widget.Button[@resource-id="com.thegymcube.gymcube.dev:id/btnSignIn"]'); }


    async login(usernameValue: string, passwordValue: string) {
        try {
            (await this.signIn).click();
            await this.username.setValue(usernameValue);
            await this.password.setValue(passwordValue);
            await this.loginSignIn.click();
        } catch (error) {
            log.error(`Login failed: ${error}`);
            throw new Error('Login failed');
        }
    }
}

export default new LoginPage();

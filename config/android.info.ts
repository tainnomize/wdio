import { resolve } from 'path';

export class AndroidInfo {
  static deviceName() {
    return 'emulator-5554'; // pass the udid or devicename
  }

  static platFormVersion() {
    return '14';
  }

  static appPackage() {
    return 'com.thegymcube.gymcube.dev';
  }

  static appPath() {
    return resolve(`./config/app-dev-release-197.apk`);
  }
}

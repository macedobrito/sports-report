/**
 * Created by franciscobrito on 12/10/17.
 */
if (typeof module === 'object') {
    window.module = module;
    module = undefined;
}
var isDesktopMode = true;
let electron;
try {
    electron = require('electron');
}
catch(err) {
    isDesktopMode = false;
}
finally {
    if(isDesktopMode){
        let welcomeNotification = new Notification('Welcome', {
            body: 'Hope you enjoy it ! :)'
        });
        function closeApp() {
            var window = electron.remote.getCurrentWindow();
            window.close();
        }
        require('./render.js')
    }
}

// todo: redirect user to "403" page if his role is not equivalent to role in .env file
// https://keycloak.discourse.group/t/what-is-the-workflow-of-refreshing-the-token-in-an-api-client-scenario/12634/2
// https://github.com/dasniko/keycloak-reactjs-demo
import app from './App';

let keycloak = null;

const Account = {
    keycloak: () => {
        return keycloak || {};
    },
    token: () => {
        return Account.keycloak().token;
    },
    user: () => {
        if (Account.keycloak().tokenParsed['family_name'] || Account.keycloak().tokenParsed['given_name']) {
            return Account.keycloak().tokenParsed['given_name'] + ' ' + Account.keycloak().tokenParsed['family_name']
        } else {
            return Account.keycloak().tokenParsed.preferred_username;
        }
    },
    userGuid: () => {
        return Account.keycloak().subject;
    },
    createLoginUrl: () => {
        if (typeof Account.keycloak().createLoginUrl === 'function') {
            return Account.keycloak().createLoginUrl();
        }
        return 'NA';
    },
    updateToken: (callback) => {
        return Account
            .keycloak()
            .updateToken(4)
            .then(refreshed => {
                if (refreshed) {
                    // console.info('Token is refreshed');
                } else {
                    // console.info('Token is still valid')
                }
                if (callback && typeof callback === 'function') {
                    return callback();
                }
            }).catch(() => {
                console.error('Failed to refresh the token, or the session has expired');
                Account.checkLogin();
            });
    },
    createAccountUrl: () => {
        if (typeof Account.keycloak().createAccountUrl === 'function') {
            return Account.keycloak().createAccountUrl();
        }
        return 'NA';
    },
    createLogoutUrl: () => {
        return Account.keycloak().createLogoutUrl();
    },
    logout: () => {
        return Account.keycloak().logout();
    },
    role: () => {
        if (!Account.keycloak().tokenParsed) {
            return 'User';
        }
        var role = keycloak.tokenParsed.roles.filter(i => i.charAt(0) === i.charAt(0).toUpperCase());
        if (role.length > 0) {
            return role[0];
        }
        return 'User';
    },
    isSuperAdmin: () => {
        if (!Account.keycloak().tokenParsed) {
            return false;
        }
        return app.keycloak().tokenParsed.roles.includes('SuperAdmin');
    },
    checkLogin: (callback) => {
        var conf = {
            url: process.env.REACT_APP_ACCOUNTS_URL + '/auth',
            realm: process.env.REACT_APP_ACCOUNTS_REALM,
            client: process.env.REACT_APP_ACCOUNTS_CLIENT
        };

        if (conf.url && conf.realm && conf.client) {
            if (!window["Keycloak"]) {
                throw new Error("Keycloak script is not loaded. Make sure internet is connected, and make sure accounts panel is up and running.")
            }
            keycloak = new window["Keycloak"]({
                url: conf.url,
                realm: conf.realm,
                clientId: conf.client,
                redirectUrl: document.location.origin
            });

            keycloak.init({
                checkLoginIframe: false
            }).then(function (auth) {
                if (auth) {
                    app.emit(app.accountUpdated);
                    if (callback && typeof callback === "function") {
                        callback();
                    }
                } else {
                    console.error('Not Authenticated');
                    keycloak.login();
                }
            }).catch(error => {
                console.log(error);
            });
        } else {
            throw new Error('Security is not configured.')
        }
    }
}

export default Account;
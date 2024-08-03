import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
import { getTokenSession } from '../../script/session';

class SignupConfirmForm extends Form {
    FIELD_NAME = {
        CODE: 'code',
    }
    FIELD_ERROR = {
        IS_EMPTY: 'Empty field',
        IS_BIG: 'Too much characters',
    }

    submit = async () => {
        if (this.disabled) {
            this.validateAll();
        } else {
            console.log(this.value);

            this.setAlert('progress', 'Loading...');

            try {
                const res = await fetch('/signup-confirm', { // Ensure correct endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: this.convertData(),
                });

                const data = await res.json();

                if (res.ok) {
                    this.setAlert('success', data.message);
                    location.assign('/home');
                } else {
                    this.setAlert('error', data.message);
                }
            } catch (err) {
                this.setAlert('error', err.message);
            }
        }
    }

    convertData = () => {
        return JSON.stringify({
            [this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
            token: getTokenSession()
        });
    }
}

window.signupConfirmForm = new SignupConfirmForm();


document.addEventListener('DOMContentLoaded', () => {
    if (window.session && window.user.isConfirm) {
        location.assign('/home')
    }
})
export const REG_EXP_PASSWORD = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // Ensures the password contains at least one digit, one lowercase letter, one uppercase letter, and is at least 8 characters long
)

export const REG_EXP_EMAIL = new RegExp(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Ensures the email follows the format name@domain.tld with certain constraints
)

export class Form {
    FIELD_NAME = {} // Object to store field names
    FIELD_ERROR = {} // Object to store field errors

    value = {} // Object to store field values
    error = {} // Object to store current errors for each field
    disabled = true // Object to store disabled state for fields

    change = (name, value) => {
        const error = this.validate(name,value)
        this.value[name] = value
        
        if (error) {
            this.setError(name, error)
            this.error[name] = error
        } else {
            this.setError(name, null)
            delete this.error[name]
        }
        
        this.checkDisabled()
    }

    setError = (name, error) => {
        const span = document.querySelector(`.field__error[name="${name}"]`) // Find the span element for the error message
        const field = document.querySelector(`.validation[name="${name}"]`) // Find the field element to apply validation styles

        console.log(name, error)
        console.log(field, span)

        if (span) {
            span.classList.toggle(
                'field__error--active',
                Boolean(error), // Toggle the active error class based on the presence of an error
            )
            span.innerText = error || '' // Set the error message text
        }

        if (field) {
            field.classList.toggle(
                'validation--active',
                Boolean(error), // Toggle the active validation class based on the presence of an error
            )
        }
    }

    checkDisabled = () => {
        let disabled = false // Initialize the disabled state as false
        
        Object.values(this.FIELD_NAME).forEach((name) => {
           if (this.error[name] || this.value[name] === undefined) {
                disabled = true
           }
        })

        const el = document.querySelector('.button')

        if (el) {
            el.classList.toggle('button--disabled', Boolean(disabled))
        }

        this.disabled = disabled 
    }

    validateAll = () => {
        Object.values(this.FIELD_NAME).forEach((name) => {
            const error = this.validate(name, this.value[name])

            if (error) {
                this.setError(name, error)
            }
        })
    }

    setAlert = (status, text) => {
        const el = document.querySelector('.alert')

        if (status === 'progress') {
            el.className = 'alert alert--progress'
        } else if (status === 'success') {
            el.className = 'alert alert--success'
        } else if (status === 'error') {
            el.className = 'alert alert--error'
        } else {
            el.className = 'alert alert--disabled'
        }

        if (text) el.innerText = text
    }
}

class FieldSelect {
    static toggle = (target) => {
        const options = target.nextElementSibling

        options.toggleAttribute('active')
    }

    static change = (target) => {
        const active = target.parentElement.querySelector('*[active]')

        if (active) active.toggleAttribute('active')

        const parent = target.parentElement.parentElement
        const value = parent.querySelector('.field__value')
        
        if (value) {
            value.innerText = target.innerText
            value.classList.remove('field__value--placeholder')
        }

        const list = target.parentElement

        list.toggleAttribute('active')
    }
}

window.fieldSelect = FieldSelect

class FieldSelect {
    static toggle = (target) => {
        const options = target.nextElementSibling // Get the next sibling element which is the options list
        options.toggleAttribute('active') // Toggle the 'active' attribute on the options list
    }

    static change = (target) => {
        const active = target.parentElement.querySelector('*[active]') // Find the currently active option

        if (active) active.toggleAttribute('active') // Deactivate the current active option

        const parent = target.parentElement.parentElement // Get the grandparent element
        const value = parent.querySelector('.field__value') // Find the element displaying the selected value
        
        if (value) {
            value.innerText = target.innerText // Update the display with the selected option's text
            value.classList.remove('field__value--placeholder') // Remove the placeholder class if present
        }

        const list = target.parentElement // Get the parent element which is the options list

        list.toggleAttribute('active') // Toggle the 'active' attribute on the options list to close it
    }
}

window.fieldSelect = FieldSelect

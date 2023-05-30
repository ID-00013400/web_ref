class ErrorManager {
    constructor(errors) {
        this.errors = JSON.parse(errors.replace(/&quot;/g, '"'))
    }

    manage() {
        for (const error of this.errors) {
            const input = document.querySelector(`[name='${error.param}']`)
            if (input) {
                const errorMessage = this.generateErroMessage(error.msg)
                const parentInput = input.closest(".form__input")
                input.classList.add("error-input")
                parentInput.append(errorMessage)
            }
        }
    }

    generateErroMessage(text) {
        const message = document.createElement("small")
        message.classList.add("error")
        message.innerText = text
        return message
    }
}
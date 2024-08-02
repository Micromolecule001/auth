class Confirm {
    static #list = []

    constructor(data) {
        this.code = Confirm.generateCode()
        this.data = data
    }

    static generateCode = () => {
        const code = Math.floor(Math.random() * 9000) + 1000
        console.log('New code: ', code)

        return code
    }

    static create = (data) => {
        this.#list.push(new Confirm(data))

        setTimeout(() => {
            this.delete(code)
        }, 24 * 60 * 60 * 1000)

        console.log(this.#list)
    }

    static delete = (code) => {
        this.#list = this.#list.filter((item) => {
            item.code !== code
        })

        return length > this.#list.length
    }

    static getData = (code) => {
        console.log('Confirm getData code: ', code, this.#list)
        const obj = this.#list.find((item) => {
            console.log('item: ', item, item.code)
            return item.code === code // missing return???
        })

        return obj ? obj.data : null 
    }
}

module.exports = {
    Confirm
}
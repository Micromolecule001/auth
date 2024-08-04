class Confirm {
    static #list = []

    // create code and save email for it
    constructor(data) {
        this.code = Confirm.generateCode()
        this.data = data
    }

    // code generator
    static generateCode = () => {
        const code = Math.floor(Math.random() * 9000) + 1000
        console.log('New code: ', code)

        return code
    }

    // create Confirm that will be deleted after 24*60*60*1000
    static create = (data) => {
        this.#list.push(new Confirm(data))

        setTimeout(() => {
            this.delete(code)
        }, 24 * 60 * 60 * 1000)

        console.log(this.#list)
    }
    
    // delete Confirm from the lsit after Timeout
    static delete = (code) => {
        this.#list = this.#list.filter((item) => {
            item.code !== code
        })

        return length > this.#list.length
    }

    // getData by code 
    static getData = (code) => {
        console.log('Confirm getData code: ', code, this.#list);
        const obj = this.#list.find((item) => item.code === code);
        console.log('Found object: ', obj); // Log the found object
        return obj ? obj.data : null;
    }
}

module.exports = {
    Confirm
}
class Session {
    static #list = [] // list of sessions 

    constructor(user) {
        this.token = Session.generateCode() // generate token for user 
        this.user = {
            email: user.email,          // user email
            isConfirm: user.isConfirm,  // cofirm status
            role: user.role,            // user role
            id: user.id,                // user id
        }
    }

    // generate 6 symbol code for constructor
    static generateCode = () => {
        const length = 6
        const characters = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdcfvgbhbjklzxcvbnm1234567890'
        let result = ''

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            result += characters[randomIndex]
        }

        return result
    }

    // create session and add to the #list
    static create = (user) => {
        const session = new Session(user)
        this.#list.push(session)
        return session
    }

    // return the session by the token
    static get = (token) => {
        return (this.#list.find((item) => item.token === token)) || null
    }
}

module.exports = {
    Session,
}

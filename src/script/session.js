export const SESSION_KEY = 'sessionAuth'

export const saveSession = (session) => {
    console.log(session)

    window.session = session

    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const loadSession = () => {
    try {
        const session = JSON.parse(localStorage.getItem(SESSION_KEY))

        if (session) {
            window.session = session
        } else {
            window.session = null
        }
    } catch (error) {
        console.log(error)
        window.session = null
    }
}

export const getTokenSession = () => {
    try {
        const session = JSON.parse(localStorage.getItem(SESSION_KEY)) || window.session

        if (session) {
            return session.token
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}
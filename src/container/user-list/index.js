import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserList extends List {
    constructor() {
        super()

        this.element = document.querySelector('#user-list')
        if (!this.element) throw new Error('Element is null')

        this.loadData()
    }

    loadData = async () => {
        this.updateStatus(this.STATE.LOADING)

        try {
            const res = await fetch('/user-list-data', {
                method: 'GET',
            })

            const data = await res.json()

            if (res.ok) {
                this.updateStatus(this.STATE.SUCCESS, this.convertData(data))
            } else {
                this.updateStatus(this.STATE.ERROR, data)
            }
            
        } catch (error) {
            console.log(error)
            this.updateStatus(this.STATE.ERROR, {
                message: error.message,
            })
        }
    }

    convertData = (data) => {
        return {
            ...data,
            list: data.list.map((user) => ({
                ...user,
                role: USER_ROLE[user.role]
            }))
        }
    }

    updateView = () => {
        this.element.innerHTML = ''

        console.log(this.status, this.data)

        switch (this.status) {
            case this.STATE.LOADING:
                this.element.innerHTML = `
                    <span class="alert alert--loading"> loading... </span>
                `
                break

            case this.STATE.SUCCESS:
                this.data.list.forEach((item) => {
                    this.element.innerHTML += `
                        <a href="/user-item?id=${item.id}" class="user" >
                            <span class="user__title" id="${item.email}">${item.email}</span>
                            <span class="user__sub" id="${item.role}">${item.role}</span>
                        </a>
                    `
                })
                break

            case this.STATE.ERROR:
                this.element.innerHTML = `
                    <span class="alert alert--error"> ${this.data.message} </span>
                `
                break
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('window ses: ', window.session, !window.session.user, !window.session.user.isConfirm)
    if (!window.session || !window.session.user || !window.session.user.isConfirm) {
        location.assign('/')
    } 

    new UserList()
})

import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserItem extends List {
    constructor() {
        super()

        this.element = document.querySelector('#user-item')
        if (!this.element) throw new Error('Element is null')
        
        this.id = new URL(location.href).searchParams.get('id')
        if (!this.id) location.assign('/user-list')

        this.loadData()
    }

    loadData = async () => {
        this.updateStatus(this.STATE.LOADING)

        console.log('load item id: ', this.id)

        try {
            const res = await fetch(`/user-item-data?id=${this.id}`, {
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
            user: {
                ...data.user, 
                role: USER_ROLE[data.user.role],
                confirm: data.user.isConfirm ? 'yes' : 'no'
            }
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
                const { id, email, role, confirm } = this.data.user

                this.element.innerHTML = `
                    <div class="data">
                        <span class="data__title> ID </span>
                        <span class="data__value">ID: ${id} </span>
                    </div>
                    <div class="data">
                        <span class="data__title> Email </span>
                        <span class="data__value">Email:  ${email} </span>
                    </div>
                    <div class="data">
                        <span class="data__title> Role </span>
                        <span class="data__value">Role: ${role} </span>
                    </div>
                    <div class="data">
                        <span class="data__title> Confirm </span>
                        <span class="data__value">Confirm: ${confirm} </span>
                    </div>
                `
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
    if (!window.session || !window.session.user.isConfirm) {
        location.assign('/')
    } 

    new UserItem()
})

export class List {
    STATE = {
        LOADING: 'LOADING',
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR',
    }

    status = null
    data = null 
    elemnent = null
    
    updateStatus = (status, data) => {
        this.status = status

        if(data) this.data = data

        this.updateView()
    }

    updateView = () => {

    }

    loadData = async () => {

    }

    convertData = () => {

    }
}

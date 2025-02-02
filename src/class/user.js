class User {
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }

  static #list = []   // list 

  static #count = 1

  // building users 
  constructor({email, password, role}) {
    this.id = User.#count++
    this.email = String(email).toLowerCase()
    this.password = password
    this.role = User.#convertRole(role)
    this.isConfirm = false
  }

  // Number(role) or default user role
  static #convertRole = (role) => {
    role == Number(role) // convert role to number()

    if (isNaN(role)) {
      role = this.USER_ROLE.USER // if role NaN --> default.role 
    }

    role = Object.values(this.USER_ROLE).includes(role) // if role exist
      ? role  // nothing to do
      : this.USER_ROLE.USER // else --> default.role

    return role
  }

  // create the user by { email, password, role }
  static create(data) {
    const user = new User(data) // create one USER by constructor 
    this.#list.push(user) // add to "db"
    return user
  }

  static getList = () => this.#list

  // getting user by email 
  static getByEmail(email) {
    return (
      this.#list.find((user) => user.email === String(email).toLowerCase()) || // looking for a user by email
      null 
    )
  }
  
  static getById(id) {
    return (
      this.#list.find((user) => user.id === Number(id)) || // looking for a user by email
      null 
    )
  }
}

// export class 
module.exports = {
  User,
}

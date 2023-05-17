export default class UsersDTO {
  constructor(user) {
    this.first_name = user.first_name || this.name;
    this.name = user.name || this.first_name;
    this.email = user.email;
  }
}

class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser(user) {
    const id = this.id;
    this.storage[id] = { id, ...user };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, user) {
    this.storage[id] = { ...this.storage[id], ...user };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}

// Singleton design pattern.
module.exports = new UsersStorage();

class UserService {
    userRepository;
    constructor(userRepo) {
        this.userRepository = userRepo;
    }
    async get(id) {
        return await this.userRepository.get(id);
    }
    ;
    async getAll() {
        return await this.userRepository.getAll();
    }
    ;
    async create(user) {
        return await this.userRepository.create(user);
    }
    ;
    async delete(id) {
        return await this.userRepository.delete(id);
    }
    ;
    async update(properties, id) {
        return await this.userRepository.update(properties, id);
    }
    ;
}
export { UserService };

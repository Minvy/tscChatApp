class Room {
    name: string
    users: string[]
    password: string | undefined

    constructor(name:string, password: string | undefined){
        this.name = name
        this.users = []
        this.password = password
    }

    addUser(id: string, password: string | undefined): boolean {
        if(!this.authorise(password)) return false
        this.users.push(id)
        return true
    }

    private authorise(password: string | undefined): boolean {
        if(this.password !== password){
            return false
        }
        return true
    }
}
export default Room
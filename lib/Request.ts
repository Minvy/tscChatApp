interface KeyValueObject {
    [key:string]: any 
}

class Request {
    type: string
    payload: KeyValueObject
    date: Date

    constructor(type:string, payload:KeyValueObject, date: Date){
        this.type = type
        this.payload = payload
        this.date = date
    }
}
export default Request
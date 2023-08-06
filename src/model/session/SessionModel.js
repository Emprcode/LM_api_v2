import SessionSchema from "./SessionSchema.js"

//create token
export const createSession = (userObj) => {
    return SessionSchema(userObj).save()
}

//get session
export const getSession = (filter) => {
    return SessionSchema.findOne(filter)
}
//delete token
export const deleteSession = (filter) => {
    return SessionSchema.findOneAndDelete(filter)
}



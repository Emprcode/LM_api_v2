import SessionSchema from "./SessionSchema.js"

//create token
export const createSession = (userObj) => {
    return SessionSchema(userObj).save()
}

//delete token
export const deleteSession = (filter) => {
    return SessionSchema.findOneAndDelete(filter)
}



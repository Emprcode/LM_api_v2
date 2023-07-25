import UserSchema from "./UserSchema.js"

export const createUser = (userObj) => {
    return UserSchema(userObj).save()
}


export const getUserByEmail = (email)=> {
    return UserSchema.findOne({email})
}

export const getUserById = (userId) => {
    return UserSchema.findById(userId)
}

export const updateUser = (userId, userObj) => {
    return UserSchema.findOneAndUpdate(userId, userObj, {new: true})
}
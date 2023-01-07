import { UserDocument } from "../models/User";

export const sterilizeUserObj = (obj: UserDocument) => {
    return {
        id: obj._id,
        first_name: obj.first_name,
        last_name: obj.last_name,
        email: obj.email,
        role: obj.role,
        account_verified: obj.account_verified,
        trials: 3
    }
} 
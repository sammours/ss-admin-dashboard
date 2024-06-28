import { UserModel } from "../models";

export class UserModelUtil {
    public static fullName(user: UserModel) {
        return `${user.lastName}, ${user.firstName}`;
    }
    
    public static address(user: UserModel) {
        return `${user.street}, ${user.zipCode}  <br />${user.city}, ${user.country}`;
    }
}
import { UserModel } from "../models";

export class UserModelUtil {
    public static fullName(user: UserModel) {
        return `${user.lastName}, ${user.firstName}`;
    }
    
    public static address(user: UserModel) {
        return `${user.street}, ${user.zipCode}  <br />${user.city}, ${user.country}`;
    }

    public static userStatus(user: UserModel): 'blocked' | 'active' | 'inactive' {
        if (user.blocked) {
            return 'blocked';
        }

        return user.active ? 'active' : 'inactive';
    } 
}
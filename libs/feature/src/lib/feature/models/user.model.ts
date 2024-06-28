import { DateTime } from 'luxon';

export class UserModel {
    public id = '';
    public firstName = '';
    public lastName = '';
    public jobTitle = '';
    public country = '';
    public city = '';
    public street = '';
    public zipCode = '';
    public email = '';
    public avatar = '';
    public birthDate: DateTime | undefined;
    public registeredAt: DateTime | undefined;
    public blocked = false;
    public active = true;
}
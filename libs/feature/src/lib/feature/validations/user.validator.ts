import { Rule, Validator } from "@ss-admin-dashboard/util-common";
import { UserModel } from "../models";

export class UserValidator extends Validator<UserModel> {
    constructor() {
        super(
            new UserFirstNameMustBeDefinedRule(),
            new UserLastNameMustBeDefinedRule(),
            new UserEmailMustBeValidRule(),
            new UserJobTitleMustBeDefinedRule()
        );
    }
}


class UserFirstNameMustBeDefinedRule extends Rule<UserModel>  {
    constructor() {
        super(x => x.firstName != null && x.firstName !== '', 'firstName', 'First name cannot be empty');
    }
}

class UserLastNameMustBeDefinedRule extends Rule<UserModel>  {
    constructor() {
        super(x => x.lastName != null && x.lastName !== '', 'lastName', 'Last name cannot be empty');
    }
}

class UserJobTitleMustBeDefinedRule extends Rule<UserModel>  {
    constructor() {
        super(x => x.jobTitle != null && x.jobTitle !== '', 'jobTitle', 'Job Title cannot be empty');
    }
}

class UserEmailMustBeValidRule extends Rule<UserModel> {
    private regex = /^[a-zA-Z0-9.!#$%&’+/=?^_` {|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
    constructor() {
        super(x => this.regex.test(x.email), 'email', 'Email is not valid');
    }
}


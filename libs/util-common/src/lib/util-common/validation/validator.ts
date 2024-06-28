import { Rule } from "./rule.model";
import { IValidationResult } from "./validation-result.model";

export class Validator<T> {
    public errors: IValidationResult[] = [];
    public isValid = true;
    private rules: Rule<T>[] = [];

    constructor(...rules: Rule<T>[]) {
        this.rules = rules;
    }

    public validate(model: T) {
        this.errors =[];
        const failingRules = this.rules.where(x => !x.isSatisfied(model));

        if (failingRules && failingRules.length > 0) {
            this.errors = [...failingRules.map(x => { return { message: x.message, propertyName: x.propertyName } })];
            this.isValid = false;
            return;
        }

        this.isValid = true;
    }

    public isPropertySatisfied(property: string) {
        return this.errors.find(x => x.propertyName === property) == null;
    } 

    public getErrorMessage(property: string) {
        return this.errors.find(x => x.propertyName === property)?.message ?? '';
    } 
}
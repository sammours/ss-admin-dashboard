import { signal } from "@angular/core";
import { Rule } from "./rule.model";
import { IValidationResult } from "./validation-result.model";

export class Validator<T> {
    public errors = signal<IValidationResult[]>([]);
    public isValid = signal<boolean>(true);
    private rules = signal<Rule<T>[]>([]);

    constructor(...rules: Rule<T>[]) {
        this.rules.set(rules);
    }

    public validate(model: T) {
        this.errors.set([]);
        
        const failingRules = this.rules().where(x => !x.isSatisfied(model));
        if (failingRules && failingRules.length > 0) {
            this.errors.set([...failingRules.map(x => { return { message: x.message, propertyName: x.propertyName } })]);
            this.isValid.set(false);
            return;
        }

            this.isValid.set(true);
    }

    public isPropertySatisfied(property: string) {
        return this.errors().find(x => x.propertyName === property) == null;
    } 

    public getErrorMessage(property: string) {
        return this.errors().find(x => x.propertyName === property)?.message ?? '';
    } 
}
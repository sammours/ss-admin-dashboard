export class Rule<T> {
    constructor(private readonly rule: (model: T) => boolean, public propertyName: string, public readonly message: string) {}

    public isSatisfied(model: T) {
        return this.rule(model);
    }
}
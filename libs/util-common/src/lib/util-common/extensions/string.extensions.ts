interface String {
    contains(value: string, ignoreCase?: boolean): boolean;
}

String.prototype.contains = function (value: string, ignoreCase?: boolean): boolean { 
    return !ignoreCase || ignoreCase === true ? this.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1 : this.indexOf(value) > -1; 
};

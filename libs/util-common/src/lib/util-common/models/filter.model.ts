import { Sort } from "./sort.model";

export class FilterOptions {
    public skip = 0;
    public take = 10;
    public sort: Sort = {field: '', direction: 'asc'};
    public filter: Filter[] = [];
}

export class Filter {
    public field = '';
    public value = '';
}
import { FilterOptions } from '@ss-admin-dashboard/util-common';

export class FilterOptionsFactory {
  public sort(filter: FilterOptions, field: string) {
    if (filter.sort.field === field) {
      filter.sort.direction = filter.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      filter.sort.direction = 'asc';
    }

    filter.sort.field = field;
  }

  public paginate(filter: FilterOptions, page: number) {
    filter.skip = page * filter.take;
  }

  public filter(filter: FilterOptions, field: string, value: string) {
    const existFilter = filter.filter.find((x) => x.field === field);
    if (existFilter) {
        if (value === '') {
            filter.filter = filter.filter.where((x) => x.field !== field);
        } else {
            existFilter.value = value;
        }
    } else {
      filter.filter.push({ field, value: value });
    }
  }

  public toggleFilter(filter: FilterOptions, field: string) {
    if (this.hasFilter(filter, field)) {
        this.filter(filter, field, '');
      } else {
        this.filter(filter, field, 'true');
      }
  }

  public hasFilter(filter: FilterOptions, field: string) {
    return filter.filter.contains(x => x.field === field);
  }
}

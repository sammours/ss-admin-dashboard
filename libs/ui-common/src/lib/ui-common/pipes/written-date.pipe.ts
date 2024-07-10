import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'writtenDate',
  standalone: true,
})
export class WrittenDatePipe implements PipeTransform {
  transform(date: DateTime): string {
    if (!date) {
      return '';
    }

    // dates are converted to string from the API. Force cast
    const castedDate = DateTime.fromISO(date + '');

    const today = DateTime.now();
    const diff = today.diff(castedDate, ["years", "months", "days", "hours"]).toObject();

    if (diff.days === undefined) {
      return '';
    }

    if (diff.days === 0) {
      return 'today';
    }

    if (diff.days === 1) {
      return `${diff.days} day ago`;
    }

    if (diff.days < 7) {
      return `${diff.days} days ago`;
    }

    return castedDate.toFormat('dd.MM.yyyy');
  }
}
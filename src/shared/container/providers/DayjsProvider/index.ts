import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

export type DateProviderType = {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
};

export class DayjsDateProvider implements DateProviderType {
  dateNow() {
    return dayjs().toDate();
  }

  convertToUTC(date: Date) {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date) {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }
}
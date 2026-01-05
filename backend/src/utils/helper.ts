import { startOfMonth, addMonths, addDays, addWeeks, addYears } from 'date-fns';
import { RecurringIntervalEnum } from '../models/transaction.model';

export function calculateNextReportDate(lastSentDate?: Date): Date {
    const now = new Date();
    const lastSent = lastSentDate || now;

    const nextDate = startOfMonth(addMonths(lastSent, 1));
    nextDate.setHours(0, 0, 0, 0);

    console.log(nextDate, "nextDate");
    return nextDate;
}

export function calculateNextOccurrence(date: Date, recurringInterval: keyof typeof RecurringIntervalEnum) {
    const baseDate = new Date(date);
    baseDate.setHours(0, 0, 0, 0);

    switch (recurringInterval) {
        case "DAILY":
            return addDays(baseDate, 1);
        case "MONTHLY":
            return addMonths(baseDate, 1);
        case "WEEKLY":
            return addWeeks(baseDate, 1);
        case "YEARLY":
            return addYears(baseDate, 1);
        default:
            return baseDate;
    }
}
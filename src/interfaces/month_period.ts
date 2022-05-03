export interface IMonthPeriod {
  paymentDate?: Date;
  toBePayed?: number;
  paid?: number;
  graceDate?: Date;
  isCompleted?: boolean;
}

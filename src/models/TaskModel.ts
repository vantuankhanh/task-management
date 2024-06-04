export interface ITaskModel {
  id?: string;
  employeeEmail?: string;
  employeeId: string;
  content: string;
  dateStart: string;
  dateEnd: string;
  status: number;
  lastUpdatedBy: string;
}

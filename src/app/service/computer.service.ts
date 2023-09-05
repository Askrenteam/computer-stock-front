import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Computer} from "../model/computer";
import {map, Observable} from "rxjs";
import {ComputerCreateDto} from "./computer-create.dto";
import {SpendingReportDto} from "./spending-report.dto";
import {ConsumptionReport} from "../model/consumption-report";
import {SpendingReport} from "../model/spending-report";
import {ConsumptionReportDto} from "./consumption-report.dto";

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private readonly SERVER_URL = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>(`${this.SERVER_URL}/computers`)
  }

  //TODO: this should maybe convert HTTP errors to custom ones instead of letting the user deal with HTTP
  createComputer(computerCreateDto: ComputerCreateDto): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${this.SERVER_URL}/computers`, computerCreateDto, {observe: 'response'})
  }

  getSpendingReport(): Observable<SpendingReport[]> {
    return this.http.get<SpendingReportDto[]>(`${this.SERVER_URL}/reports/monthly-spendings`).pipe(
      map(reports =>
        reports.map(report => ({
          ...report,
          startDate: new Date(report.startDate)
        })))
    )
  }

  getConsumptionReport(): Observable<ConsumptionReport[]> {
    return this.http.get<ConsumptionReportDto[]>(`${this.SERVER_URL}/reports/monthly-consumption`).pipe(
      map(reports =>
        reports.map(report => ({
          ...report,
          startDate: new Date(report.startDate)
        })))
    )
  }
}

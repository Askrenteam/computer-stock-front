import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Computer} from "../model/computer";
import {Observable} from "rxjs";
import {ComputerCreateDto} from "./computer-create.dto";

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private readonly SERVER_URL = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>(`${this.SERVER_URL}/computers`)
  }

  //TODO: this should maybe convert HTTP errors to custom ones instead of letting the user deal with HTTP
  createComputer(computerCreateDto: ComputerCreateDto): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${this.SERVER_URL}/computers`, computerCreateDto,{observe: 'response'})
  }
}

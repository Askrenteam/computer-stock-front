import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Computer} from "../model/computer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  constructor(private http: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>('http://localhost:8080/computers')
  }
}

import { Component } from '@angular/core';
import {ComputerService} from "./service/computer.service";
import {Computer} from "./model/computer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'computer-stock';
  computers: Computer[] = [];

  constructor(computerService: ComputerService) {
    computerService.getComputers().subscribe(response => this.computers = response)
  }
}

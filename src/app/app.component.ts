import {Component} from '@angular/core';
import {ComputerService} from "./service/computer.service";
import {Computer} from "./model/computer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConsumptionReport} from "./model/consumption-report";
import {SpendingReport} from "./model/spending-report";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  computers: Computer[] = [];

  monthlySpendings: SpendingReport[] = [];

  monthlyConsumption: ConsumptionReport[] = [];

  computerForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    purchaseDate: new FormControl<Date|null>(null, Validators.required),
    purchasePrice: new FormControl<number|null>(null, [Validators.required, Validators.pattern(/^\d+(.\d+)?$/)]),
    yearlyConsumption: new FormControl<number|null>(null, [Validators.required, Validators.pattern(/^\d+$/)])
  })

  constructor(private computerService: ComputerService) {
    this.loadComputerList()
    this.loadSpendingReport()
    this.loadConsumptionReport()
  }

  loadComputerList() {
    //TODO: there should be a loading displayed while loading data
    this.computerService.getComputers().subscribe(response => this.computers = response)
  }

  loadSpendingReport() {
    //TODO: there should be a loading displayed while loading data
    this.computerService.getSpendingReport().subscribe(response => this.monthlySpendings = this.padSpendingData(response))
  }

  private padSpendingData(monthlySpendings: SpendingReport[]): SpendingReport[] {
    return [...Array(12).keys()].reverse()
      .map(n => this.getDateMonthsFromNow(n))
      .map(date => {
        let spending = monthlySpendings.find(report =>
        report.startDate.getFullYear() === date.getFullYear()
        && report.startDate.getMonth() === date.getMonth())
        if (!!spending) {
          return spending as SpendingReport
        } else {
          return {
            startDate: date,
            spendings: 0
          }
        }
      })
  }

  private getDateMonthsFromNow(n: number): Date {
    let today = new Date()
    let date = new Date(today.getFullYear(), today.getMonth(), 1)
    date.setMonth(date.getMonth() - n - 1)
    return date
  }

  loadConsumptionReport() {
    //TODO: there should be a loading displayed while loading data
    this.computerService.getConsumptionReport().subscribe(response => this.monthlyConsumption = response)
  }

  createComputer() {
    if(this.computerForm.valid) {
      this.computerService.createComputer({
        name: this.computerForm.controls.name.value as string,
        purchaseDate: this.computerForm.controls.purchaseDate.value as Date,
        purchasePrice: this.computerForm.controls.purchasePrice.value as number,
        yearlyKWhConsumption: this.computerForm.controls.yearlyConsumption.value as number,
      }).subscribe(response => {
        if(response.status === 201) {
          this.loadComputerList()
          this.loadSpendingReport()
          this.loadConsumptionReport()
        } else {
          //TODO: actually display errors for the user
          console.error("Error creating computer", response)
        }
      })
    }
  }
}

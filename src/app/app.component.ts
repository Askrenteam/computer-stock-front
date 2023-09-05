import { Component } from '@angular/core';
import {ComputerService} from "./service/computer.service";
import {Computer} from "./model/computer";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  computers: Computer[] = [];
  computerForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    purchaseDate: new FormControl<Date|null>(null, Validators.required),
    purchasePrice: new FormControl<number|null>(null, [Validators.required, Validators.pattern(/^\d+(.\d+)?$/)]),
    yearlyConsumption: new FormControl<number|null>(null, [Validators.required, Validators.pattern(/^\d+$/)])
  })

  constructor(private computerService: ComputerService) {
    this.loadComputerList()
  }

  loadComputerList() {
    this.computerService.getComputers().subscribe(response => this.computers = response)
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
        } else {
          //TODO: actually display errors for the user
          console.error("Error creating computer", response)
        }
      })
    }
  }
}

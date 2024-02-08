import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {

  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = [];

  //life cycle hook, gets initialized when the component is loaded
  ngOnInit(): void {
  
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
   
  }

  addAppointment() {
    
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {

      let newAppointment: Appointment = {

        id: Math.random(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };

      this.appointments.push(newAppointment);

      this.newAppointmentTitle = '', 
      this.newAppointmentDate = new Date();

      //store in the local storage of the browser (5mb of storage)
      localStorage.setItem("appointments",JSON.stringify(this.appointments))

    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem("appointments",JSON.stringify(this.appointments))
  }
}

import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {id: 1, nombre: 'John', apellido: 'Doe', email: 'johndoe@johndoe.es', createdAt: '16-12-2019'},
    {id: 2, nombre: 'Mary', apellido: 'Doe', email: 'mary@johndoe.es', createdAt: '16-12-2019'},
    {id: 3, nombre: 'Edward', apellido: 'Doe', email: 'edward@johndoe.es', createdAt: '16-12-2019'},
    {id: 4, nombre: 'George', apellido: 'Doe', email: 'george@johndoe.es', createdAt: '16-12-2019'},
    {id: 5, nombre: 'Alex', apellido: 'Doe', email: 'alex@johndoe.es', createdAt: '16-12-2019'}/*,
    {id: 6, nombre: 'Mad', apellido: 'Doe', email: 'mad@johndoe.es', createdAt: '16-12-2019'},
    {id: 7, nombre: 'Matt', apellido: 'Doe', email: 'matt@johndoe.es', createdAt: '16-12-2019'},
    {id: 8, nombre: 'Tristana', apellido: 'Doe', email: 'trist@johndoe.es', createdAt: '16-12-2019'},
    {id: 9, nombre: 'Harry', apellido: 'Doe', email: 'harr@johndoe.es', createdAt: '16-12-2019'},
    {id: 10, nombre: 'William', apellido: 'Doe', email: 'wil@johndoe.es', createdAt: '16-12-2019'}*/
  ];

  constructor() { }

  ngOnInit() {
  }

}

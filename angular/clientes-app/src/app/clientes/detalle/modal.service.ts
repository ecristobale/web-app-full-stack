import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal = false;

  constructor() { }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}

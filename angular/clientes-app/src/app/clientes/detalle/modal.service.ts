import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal = false;
  private _notifyUpload = new EventEmitter<any>();

  constructor() { }

  get notifyUpload(): EventEmitter<any> {
    return this._notifyUpload;
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}

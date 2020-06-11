import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string) {
    this.toastr.success(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
         <span data-notify="message">${message}</span>`,
      "",
      {
        timeOut: 10000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-bottom-right"
      }
    );
  }

  showInfo(message: string) {
    this.toastr.info(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
         <span data-notify="message">${message}</span>`,
      "",
      {
        timeOut: 10000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: "toast-bottom-right"
      }
    );
  }

  showWarning(message: string) {
    this.toastr.warning(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
         <span data-notify="message">${message}</span>`,
      "",
      {
        timeOut: 10000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: "toast-bottom-right"
      }
    );
  }

  showError(message: string) {
    this.toastr.error(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
         <span data-notify="message">${message}</span>`,
      "",
      {
        timeOut: 10000,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-bottom-right"
      }
    );
  }
}

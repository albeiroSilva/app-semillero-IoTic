import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHelper } from 'src/_helpers/auth.helper';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  /**
   * Opciones disponibles para el usuario.
   */
  public OPTIONS = {
    EVENTS: 0,
    COURSES: 1,
    NEWS: 2,
    MSG: 3,
    RESOURCES: 4,
    CATEGORIES: 5,
    PENDING : 6,
    REQUESTED: 7,
    IN_PROGRESS: 8,
    FINISHED: 9,
    MEMBERS: 10
  };

  /**
   * Opción elegida por el usuario.
   */
  public selectedOption;

  constructor(private router: Router) {  }

  ngOnInit() {
   /**  if (!AuthHelper.getLoggedUser() || !AuthHelper.getLoggedUser().admin) {
      this.router.navigateByUrl("");
    }
    */
    let url = this.router.url;
    switch(url) {
      case '/admin/events':
        this.selectedOption = this.OPTIONS.EVENTS;
        break;
      case '/admin/courses':
        this.selectedOption = this.OPTIONS.COURSES;
        break;
      case '/admin/messages':
        this.selectedOption = this.OPTIONS.MSG;
        break;
      case '/admin/resources':
        this.selectedOption = this.OPTIONS.RESOURCES;
        break;
      case '/admin/categories':
        this.selectedOption = this.OPTIONS.CATEGORIES;
        break;
      case '/admin/news':
         this.selectedOption = this.OPTIONS.NEWS;
        break;
      case '/admin/members/pending':
        this.selectedOption = this.OPTIONS.PENDING;
        break;
      case '/admin/news':
          this.selectedOption = this.OPTIONS.NEWS;
        break;
      case '/admin/loans/requested':
         this.selectedOption = this.OPTIONS.REQUESTED;
        break;
      case '/admin/loans/in_progress':
          this.selectedOption = this.OPTIONS.IN_PROGRESS;
       break;
      case '/admin/loans/finished':
          this.selectedOption = this.OPTIONS.FINISHED;
        break;
      case '/admin/members':
          this.selectedOption = this.OPTIONS.MEMBERS;
       break;
    }
  }
}

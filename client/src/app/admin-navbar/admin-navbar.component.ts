import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/_services/auth.service';
import { faSignOutAlt, faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  /**
   * Icono de Volver a la App
   */
  public faArrowLeft = faArrowLeft;
  
  /**
   * Icono de Cerrar Sesión
   */
  public faSignOutAlt = faSignOutAlt;

  /**
   * Icono de Menú Hamburguesa
   */
  public faBars = faBars;

  /**
   * Controla el menú hamburguesa
   */
  public isCollapsed: boolean;

  constructor(private router: Router, private authService: AuthService) { 
    this.isCollapsed = true;
  }

  ngOnInit() { }

  public eventsOnClick(): void {
    this.router.navigateByUrl("admin/events");
  }

  public coursesOnClick(): void {
    this.router.navigateByUrl("admin/courses");
  }
  public newsOnClick(): void {
    this.router.navigateByUrl("admin/news");
  }

  public messagesOnClick(): void {
    this.router.navigateByUrl("admin/messages");
  }

  public resourcesOnClick() {
    this.router.navigateByUrl("admin/resources");
  }

  public categoriesOnClick() {
    this.router.navigateByUrl("admin/categories");
  }

  public membersOnClick() {
    this.router.navigateByUrl("admin/members");
  }

  public membersPendingOnClick() {
    this.router.navigateByUrl("admin/members/pending");
  }

  public logoutOnClick(): void {
    this.authService.logout();
    this.router.navigateByUrl("home");
  }

  public backOnClick(): void {
    this.router.navigateByUrl("home");
  }

  public loans_requestedOnClick(): void {
    this.router.navigateByUrl("admin/loans/requested");
  }

  public loans_in_progressOnClick(): void {
    this.router.navigateByUrl("admin/loans/in_progress");
  }

  public loans_finishedOnClick(): void {
    this.router.navigateByUrl("admin/loans/finished");
  }

}

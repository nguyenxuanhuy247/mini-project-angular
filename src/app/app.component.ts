import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { AuthService } from './services/auth.service';

@Component({
  standalone: true,
  imports: [RouterModule, VtsButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogIn();
  }
}

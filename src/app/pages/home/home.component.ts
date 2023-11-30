import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from 'src/app/shared/main-layout/main-layout.component';

@Component({
  standalone: true,
  imports: [RouterModule, MainLayoutComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful',
  imports: [],
  templateUrl: './successful.component.html',
  styleUrl: './successful.component.css'
})
export class SuccessfulComponent {
  constructor(private router: Router) {}
  showSuccessMessage: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.router.navigate(['/']);
    }, 2000);
  }
}

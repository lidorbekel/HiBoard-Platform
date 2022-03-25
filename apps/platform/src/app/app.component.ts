import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'hbd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private auth: AngularFireAuth) {
  }

  ngOnInit(): void {
  }
}

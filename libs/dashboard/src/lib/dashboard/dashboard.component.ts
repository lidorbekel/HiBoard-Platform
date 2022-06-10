import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RouterRepository} from "@ngneat/elf-ng-router-store";
import {MatDialog} from "@angular/material/dialog";
import {WelcomeDialogComponent} from "@hiboard/dashboard/welcome-dialog/welcome-dialog.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'hbd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(
    private routerRepository: RouterRepository,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    const state =
      this.routerRepository.getNavigationExtras();

    const isJoinCompleted = !!state?.joinCompleted;

    if (isJoinCompleted) {
      this.dialog.open(WelcomeDialogComponent).afterClosed().pipe(untilDestroyed(this));
    }
  }

}

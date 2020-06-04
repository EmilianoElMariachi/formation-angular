import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatistiqueComponent } from 'app/shared/components/statistique/statistique.component';
import { HoverBorderDirective } from 'app/shared/directives/hover-border.directive';
import { AppreciationToColorPipe } from 'app/shared/pipes/appreciation-to-color.pipe';
import { StatTemplatedrivenFormComponent } from 'app/shared/components/stat-templatedriven-form/new-stat-templatedriven-form/stat-templatedriven-form.component';
import { StatReactiveFormComponent } from '../../shared/components/stat-reactive-form/stat-reactive-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    StatistiqueComponent,
    HoverBorderDirective,
    AppreciationToColorPipe,
    StatTemplatedrivenFormComponent,
    StatReactiveFormComponent
  ]
})

export class AdminLayoutModule {}

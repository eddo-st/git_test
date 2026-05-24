import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { addIcons } from 'ionicons';
import { carOutline, constructOutline, alarmOutline } from 'ionicons/icons';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})

export class ExploreContainerComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

  constructor() {
    addIcons({ carOutline, constructOutline, alarmOutline });
  }
}

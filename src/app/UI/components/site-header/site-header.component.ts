import { Component, OnInit } from '@angular/core';
import { MatColor } from '../../services/utilities.service';
import { IconButton } from '../icon/icon.component';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styles: [
  ]
})
export class SiteHeaderComponent implements OnInit {
  // Should all be passed in. @Input()
  routes = [
    "activities",
    "inventory",
    "accounting",
    "customers",
    // "my-account"
  ];

  button_list:IconButton[] = [
    new IconButton("activities")
      .setIconName("activity")
      .setButtonColor(MatColor.light)
      .setIconColor(MatColor.warn),

    new IconButton("inventory")
      .setIconName("box")
      .setButtonColor(MatColor.light)
      .setIconColor(MatColor.primary),

    new IconButton("accounting")
      .setIconName("dollar-sign")
      .setButtonColor(MatColor.light)
      .setIconColor(MatColor.accent),

    new IconButton("customers")
      .setIconName("briefcase")
      .setButtonColor(MatColor.light)
      .setIconColor(MatColor.primary),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

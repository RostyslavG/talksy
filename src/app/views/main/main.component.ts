import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',

})
export class MainComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private viewportScroller: ViewportScroller
    ) {}

    ngOnInit(): void {
        this.route.fragment.subscribe(fragment => {
            console.log('Fragment:', fragment);
            if (fragment) {
                setTimeout(() => {
                    this.viewportScroller.scrollToAnchor(fragment);
                }, 100);
            }
        });
    }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-menu-list',
  templateUrl: './manage-menu-list.component.html',
  styleUrls: ['./manage-menu-list.component.less']
})
export class ManageMenuListComponent implements OnInit {

  menuList = [
    {
      icon: 'dashboard',
      name: '仪表盘',
      url: 'dashboard',
    },
    {
      icon: 'book',
      name: '文  章',
    },
    {
      icon: 'photo_album',
      name: '相  册',
    },
    {
      icon: 'attach_file',
      name: '文  件',
      url: 'files'
    },
    {
      icon: 'account_box',
      name: '我  的',
    },

  ];

  activeIndex = 0;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onMenuSelect(index: number) {
    this.activeIndex = index;
    const item = this.menuList[index];
    if (item.url) {
      this.router.navigate([`/manage/${item.url}`]);
    }

  }

}

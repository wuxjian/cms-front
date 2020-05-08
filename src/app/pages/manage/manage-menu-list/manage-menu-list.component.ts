import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';

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
      path: ''
    },
    {
      icon: 'book',
      name: '文  章',
      path: ''
    },
    {
      icon: 'photo_album',
      name: '相  册',
      path: ''
    },
    {
      icon: 'attach_file',
      name: '文  件',
      path: '/manage/file'
    },
    {
      icon: 'account_box',
      name: '我  的',
      path: ''
    },

  ];

  activeIndex = 0;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onMenuSelect(index: number) {
    this.activeIndex = index;
    const menu = this.menuList[this.activeIndex];
    if (menu.path) {
      this.router.navigate([menu.path]);
    }
  }

}

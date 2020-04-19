import {Component, OnInit} from '@angular/core';

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
      icon: 'account_box',
      name: '我  的',
    },

  ];

  activeIndex = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  onMenuSelect(index: number) {
    this.activeIndex = index;
  }

}

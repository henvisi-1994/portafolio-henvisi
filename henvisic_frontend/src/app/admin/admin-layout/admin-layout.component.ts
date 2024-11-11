import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlatTreeControl } from '@angular/cdk/tree';

interface MenuNode {
  name: string;
  link: string;
  children?: MenuNode[];
}

interface FlatMenuNode {
  name: string;
  level: number;
  expandable: boolean;
  link?: string;
}
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatTreeModule,MatIconModule,MatButtonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['/assets/admin/css/style.css', './admin-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})


export class AdminLayoutComponent implements OnInit {



  private transformer = (node: MenuNode, level: number): FlatMenuNode => ({
    name: node.name,
    level,
    expandable: !!node.children && node.children.length > 0,
    link: node.link
  });

  treeControl = new FlatTreeControl<FlatMenuNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // Datos de ejemplo, puedes reemplazarlos con tus datos
  TREE_DATA: MenuNode[] = [
    {
      name: 'Portafolios',
      link: '',
      children: [
        { name: 'Categoria', link: 'category' },
        { name: 'Portafolio', link: 'portfolio' },
      ],
    },
  ];
  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.TREE_DATA;
  }
  hasChild = (_: number, node: FlatMenuNode) => node.expandable;

}

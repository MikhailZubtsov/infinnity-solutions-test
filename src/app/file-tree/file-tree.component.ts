import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITreeNode } from '../components/tree/tree-node/tree-node.model';
import { FILE_NODES, FILE_NODES_PROVIDER } from './file-tree.providers';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  providers: [FILE_NODES_PROVIDER]
})
export class FileTreeComponent implements OnInit {
  selectedNode: ITreeNode | null = null;
  constructor(@Inject(FILE_NODES) readonly nodes$: Observable<any>) { }

  ngOnInit(): void {
  }

  onSelectNode(node: ITreeNode): void {
    this.selectedNode = node;
  }

}

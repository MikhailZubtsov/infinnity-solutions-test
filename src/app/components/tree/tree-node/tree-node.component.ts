import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITreeNode } from './tree-node.model';

@Component({
  selector: 'tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent {
  @Input() nodes: ITreeNode[] = [];
  @Output() nodeSelect = new EventEmitter<ITreeNode>();

  expand(item: ITreeNode) {
    if (item.expanded) {
      item.expanded = !item.expanded;
    } else {
      if (item.nodes) {
        if (item.nodes.length > 0) {
          item.expanded = true;
        } else {
          item.expanded = false;
        }
      }
    }
  }

  onNodeSelect(item: ITreeNode) {
    this.expand(item);
    this.nodeSelect.emit(item);
  }

  onChildNodeSelect(item: ITreeNode) {
    this.nodeSelect.emit(item)
  }
}

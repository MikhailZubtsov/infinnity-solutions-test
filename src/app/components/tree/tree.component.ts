import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ITreeNode } from './tree-node/tree-node.model';
import { TreeService } from './tree.service';


@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnDestroy {
  private _nodes: ITreeNode[] = [];
  @Input() set nodes(value: ITreeNode[]) {
    if (value) {
      if (this.isSupportRoute && !this.treeService.canLoadTree(value, this.baseUrl)){
          this.canShow = false;
          this.incorrectPath.emit();
      }
      else {
        this.treeService.prepareData(value);
        this._nodes = value;
        this.filtredNodes = value; 
      }
    }
  };
  get nodes(): ITreeNode[] {
    return this._nodes;
  }
  @Input() baseUrl: string | null = null;
  @Input() searchable: boolean = true;
  @Input() supportsRoute: boolean = false;
  @Output() incorrectPath = new EventEmitter();
  @Output() selectNode = new EventEmitter<ITreeNode>();
  filtredNodes: ITreeNode[] = [];
  selectedNode: ITreeNode | null = null;
  searchValue: string = "";
  search$: Subject<string> = new Subject<string>();
  destroy$ = new Subject();
  canShow: boolean = true; 
  get isSupportRoute(): boolean {
    return this.supportsRoute && this.baseUrl != null;
  }

  constructor(private treeService: TreeService) { 
    this.search$.pipe(
      debounceTime(1000),
      takeUntil(this.destroy$)).subscribe(value => {
      this.filtredNodes = this.treeService.searchNodesByName(this.nodes, value);
      console.log(this.filtredNodes)
    })
    this.treeService.selectNode.pipe(takeUntil(this.destroy$)).subscribe((node) => {
      this.selectedNode = node;
      this.selectNode.emit(node);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSelectNode(node: ITreeNode) {
    this.selectedNode = node;
    if (this.isSupportRoute) {
      this.treeService.changePath(node.url, this.baseUrl || "");
    }
    this.selectNode.emit(node);
  }

  search(value: string) {
    this.search$.next(value);
  }
}

export interface ITreeNode {
  name: string;
  nodes: ITreeNode[];
  expanded: boolean;
  url: string;
}

export class TreeNode implements ITreeNode {
    name: string;
    nodes: ITreeNode[];
    expanded: boolean;
    url: string;

    constructor() {
        this.name = "";
        this.nodes = [];
        this.expanded = false;
        this.url = "";
    }
}
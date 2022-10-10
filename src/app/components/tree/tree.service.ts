import { Injectable } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { ITreeNode } from './tree-node/tree-node.model';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TreeService {
  callCounter: number = 0;
  maxCalls: number = 0;
  selectNode: Subject<ITreeNode> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  loadTree(nodes: ITreeNode[], segments: string[]): boolean {

    return nodes.some(node => {
        if(!segments.length) {
            return true;
        }
        if(node.name === segments[0]) {
            const nodes = node.nodes || [];
            if (segments.length === 1) {
              this.selectNode.next(node);
              node.expanded = !!nodes.length;
              return true
            } 
            if(!nodes.length && segments.length) {
                return false;
            }
            const newSegments = segments.slice(1);
            if(this.loadTree(nodes, newSegments)) {
              node.expanded = true;
              return true;
            }

            return false;
        }

        return false;
    })
  }

  canLoadTree(nodes: ITreeNode[], baseUrl: string | null) {
    const segments = this.parseUrlToSegments(this.router.url, baseUrl) || [];
    return this.loadTree(nodes, segments);
  }

  searchNodesByName(nodes: ITreeNode[], searchValue: string) {
    const searchableNodes = JSON.parse(JSON.stringify(nodes));

    return searchableNodes.filter((node: ITreeNode) => {
      node.nodes = this.searchNodesByName(node.nodes || [], searchValue)
      if (node.nodes.length || (node.name && node.name.includes(searchValue))) {
        return true;
      }

      return false;
    });
  }

  changePath(url: string, baseUrl: string) {
    this.location.go(baseUrl + url);
  } 

  prepareData(nodes: ITreeNode[]): void {
    this.composeNodesUrl(nodes);
  }

  private composeNodesUrl(nodes: ITreeNode[], url: string = "") {
    nodes.forEach(node => {
      node.url = url + '/' + node.name;
      this.composeNodesUrl(node.nodes || [], node.url)
    })
  }

  private parseUrlToSegments(url: string, baseUrl: string | null) {
    let pureUrl = url;
    if (baseUrl) {
      pureUrl = url.replace(baseUrl, '')
    }

    return pureUrl.split('/').filter(element => element);
  }
}
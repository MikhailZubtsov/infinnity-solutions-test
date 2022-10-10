import { InjectionToken, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { FileTreeService } from "./file-tree.service";

export const FILE_NODES = new InjectionToken<Observable<any>>("");
 
export const FILE_NODES_PROVIDER: Provider[] = [
    {
        provide: FILE_NODES,
        deps: [FileTreeService],
        useFactory: fileNodesFactory,
    },
];
 
 export function fileNodesFactory(
    fileTreeService: FileTreeService,
 ): Observable<any> {
    return fileTreeService.getFileTree();
 }
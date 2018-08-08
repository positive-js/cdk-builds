import { Observable } from 'rxjs';
import { DataSource } from './data-source';
/** DataSource wrapper for a native array. */
export declare class ArrayDataSource<T> extends DataSource<T> {
    private _data;
    constructor(_data: T[] | Observable<T[]>);
    connect(): Observable<T[]>;
    disconnect(): void;
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import config from '../config/config';
 
@Injectable()
export abstract class HttpService {
    protected apiUrl: string;
    protected headers: HttpHeaders;

    constructor(protected http: HttpClient) {
        this.apiUrl = config.apiUrl;
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
    }
}
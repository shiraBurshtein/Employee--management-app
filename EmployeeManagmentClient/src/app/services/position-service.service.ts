import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }
  public getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>('https://localhost:7055/api/Positions')
  } 
}

import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }

  addNote(formData:object):Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'addNote',formData)
  }


  getUserNotes(formData:object):Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'getUserNotes',formData)
  }


  updateNote(formData:object):Observable<any> {
    return this._HttpClient.put(environment.baseUrl + 'updateNote',formData)
  }


  deleteNote(formData:object):Observable<any> {
    const model = {
      body:formData
    }
    return this._HttpClient.delete(environment.baseUrl + 'deleteNote',model)
  }
}

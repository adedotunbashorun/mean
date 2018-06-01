import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  register(body: any) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/register', body , {
      observe: 'body',
      headers : headers
    });
  }

  login(body: any) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/login', body , {
      observe: 'body',
      withCredentials: true,
      headers : headers
    });
  }

  activate(body: any) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/activate/' + body , {
      observe: 'body',
      headers : headers
    });
  }

  getUser() {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8000/api/user', {
      observe: 'body',
      withCredentials: true,
      headers : headers
    });
  }

  DownloadFile(file: String) {
    const body = {filename: file};
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/download', body, {
      responseType: 'blob',
      headers : headers
    });
  }

  getUploadedFile() {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8000/api/uploaded', {
      observe: 'body',
      withCredentials: true,
      headers : headers
    });
  }

  Logout() {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8000/api/logout', {
      observe: 'body',
      withCredentials: true,
      headers : headers
    });
  }

  // addUser(newUser)
  // {
  //   let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
  //   return this.http.post('http://localhost:8000/api/users', newUser , {headers : headers})
  //     .map(res => res.json());
  // }

  // getUser(id) {
  //   return this.http.get('http://localhost:8000/api/users/' + id)
  //     .map(res => res.json());
  // }

  // deleteUser(id)
  // {
  //   return this.http.delete('http://localhost:8000/api/users' + id)
  //     .map(res => res.json());
  // }

}

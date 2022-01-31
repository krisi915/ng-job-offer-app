import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  hasUser$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login$(data: Login): Observable<User | null> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map((response: User[]) => {
        const user = response.find(
          (u) => u.username === data.username && u.password === data.password
        );

        if (!user) {
          return null;
        }
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.setHasUser(false);
  }

  hasPermissions(role: string): boolean {
    const loggedUser = this.getLoggedUserFromLocalStorage();

    return loggedUser.role === role;
  }

  setLoggedUserInLocalStorage(user: User): void {
    localStorage.setItem('loggedUser', JSON.stringify(user));

    this.setHasUser(true);
  }

  getLoggedUserFromLocalStorage(): User {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') as string);

    if (loggedUser) {
      this.setHasUser(true);
    }

    return loggedUser;
  }

  getHasUser$(): Observable<boolean> {
    return this.hasUser$.asObservable();
  }

  setHasUser(value: boolean): void {
    this.hasUser$.next(value);
  }
}

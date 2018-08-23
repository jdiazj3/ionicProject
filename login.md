### interface
```typescript
interface AuthResponse {
  status: string,
  success: string,
  token: string
};

interface JWTResponse {
  status: string,
  success: string,
  user: any
};

```
## atributos 
```typescript 
  tokenKey: string = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;
```

```typescript 
 checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
    .subscribe(res => {
      console.log("JWT Token Valid: ", res);
      this.sendUsername(res.user.username);
    },
    err => {
      console.log("JWT Token invalid: ", err);
      this.destroyUserCredentials();
    })
  }
 private loadUserCredentials() {
    let credentials = JSON.parse(localStorage.getItem('TOKEN') || '{}');
    /* this.storage.get(environment.TOKEN_KEY).then(credentials => {
      
    }); */
    if (credentials) {
      if (credentials.usuario != undefined) {
        this.isAuthenticated = true;
        //this.useCredentials(credentials);
        this.login(credentials).subscribe(
          data => {
          }, errMess => {
          }
        );
      }
    } else
      console.log('Revisar!! no guarda usuario')
  }
  private storeUserCredentials(credentials) {
    localStorage.setItem('TOKEN', JSON.stringify(credentials));
    this.useCredentials(credentials);
  }
  private useCredentials(credentials) {
    this.isAuthenticated = true;
    this.usuario = credentials.usuario;
  }
  private destroyUserCredentials() {
    this.usuario = '';
    this.isAuthenticated = false;
    this.authToken = undefined;
    localStorage.removeItem('TOKEN');
  }
  logout() {
      
    this.destroyUserCredentials();
    this.events.publish('user:logOut', { userType: 'noUser' });
  }

IsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  //aun no se guarda el username.
  getUsername() {
    return this.usuario;
  };
  logOutFunction() {
    this.events.publish('user:logOut', { userType: 'noUser' });
  };


```
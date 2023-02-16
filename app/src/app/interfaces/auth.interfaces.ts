export interface Credentials {
  username: string;
  password: string;
}

export interface Auth {
  accessToken: string;
  me: Me;
}

export interface Me {
  id: number;
  username: string;
  password: string;
  roles: string[];
  scopes: string[];
}

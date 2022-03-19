export namespace Auth {
  export interface Credentials {
    username: string;
    password: string;
  }
  export interface Response {
    username: string;
    token: string;
  }

  export namespace Login {
    export interface Body extends Credentials {}
  }
}

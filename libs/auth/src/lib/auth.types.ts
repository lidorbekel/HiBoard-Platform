export namespace Auth {
  export interface Credentials {
    username: string;
    password: string;
  }

  export namespace Login {
    export interface Body extends Credentials {}
  }
}

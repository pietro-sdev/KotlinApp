export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ForgotRequest {
  email: string;
}

export interface ResetRequest {
  password: string;
  password_confirmation: string;
  token?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  accept_terms: boolean;
  plate?: string;
}

export interface RegisterResponse {
  token: string;
  plate: string;
}

export interface CustomerLoginRequest {
  email: string;
  document: string;
}

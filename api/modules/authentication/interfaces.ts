export interface SignInRequest {
    email: string
    password: string
}

export interface SignInResponse {
    two_factor: string
}

export interface SignInError {
    message: string
    errors: Record<string, string[]>
}

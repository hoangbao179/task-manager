export interface ITokenPayload {
    userId: string;
    email: string;
    iat?: number;
    exp?: number; 
}

export type ITokenMainInfo = Pick<ITokenPayload, 'userId' | 'email'>;
  
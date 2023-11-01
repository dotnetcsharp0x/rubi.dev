export interface JwtPayload2 {
    Name?: string;
    GroupSid?: string;
    Role?: string[] | string;
    aud?: number;
    exp?: number;
    iss?: number;
    nbf?: string;
  }
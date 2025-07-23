import { decodeToken } from '@/services/keycloakAuth';

export function getUserInfoFromToken(token: string): { email: string; name: string } | null {
  const decoded: any = decodeToken(token);
  
  if (decoded && decoded.email && decoded.name) {

    console.log('decoded', decoded);
    
    return {
      email: decoded.email,
      name: decoded.name,
    };
  }
  return null;
} 
import Cookies from 'js-cookie';

export function setAuthToken(data: {
  accessToken: string;
  refreshToken: string;
  acExpiresIn: number;
  rfExpiresIn: number;
}) {
  if (typeof window === 'undefined' || !data) return;

  if (data.accessToken) {
    Cookies.set('accessToken', data.accessToken, {
      expires: new Date(Date.now() + data.acExpiresIn * 1000),
      sameSite: 'none',
      secure: true,
    });
  }
  if (data.refreshToken) {
    Cookies.set('refreshToken', data.refreshToken, {
      expires: new Date(Date.now() + data.rfExpiresIn * 1000),
      sameSite: 'none',
      secure: true,
    });
  }
  Cookies.set('acExpiresIn', String(data.acExpiresIn), {
    expires: new Date(Date.now() + data.acExpiresIn * 1000),
    sameSite: 'none',
    secure: true,
  });
  Cookies.set('rfExpiresIn', String(data.rfExpiresIn), {
    expires: new Date(Date.now() + data.rfExpiresIn * 1000),
    sameSite: 'none',
    secure: true,
  });
} 
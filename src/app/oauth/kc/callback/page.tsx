'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuthAsync, getAuthGroupsAsync } from '@/services/keycloakAuth';
import { setAuthToken } from '@/lib/authCookies';
import { getUserInfoFromToken } from '@/lib/authUser';
import { useUser } from '@/context/UserContext';
import { decodeToken } from '@/lib/utils';

export default function KcCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      router.push('/');
      return;
    }

    async function handleAuth() {
      try {
        const response = await getAuthAsync(code as string);
        if (response && response.access_token) {
          const decoded = decodeToken(response.access_token);
          setAuthToken({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            acExpiresIn: response.expires_in,
            rfExpiresIn: response.refresh_expires_in,
          });
          const user = getUserInfoFromToken(response.access_token);
          if (user) setUser(user);
          // TODO: setUserInfo({ email: decoded.email, name: decoded.name })
          // TODO: setAuthToken({ ... })

          // Get user groups/roles
          const groupRes = await getAuthGroupsAsync(response.access_token)
          console.log('groupRes', groupRes,decoded);
          
          if (groupRes.status === 200) {
            if (!groupRes.data.groups) {
              router.push('/403');
            } else if (groupRes.data.is_role_admin) {
              // TODO: setIsSuperAdmin(true)
              router.push('/');
            }
          } else {
            router.push(`/${groupRes.status}`);
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('error:', e);
        router.push('/');
      }
    }

    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="blank-page" data-testid="kc-callback-blank-page" id="kc-callback-blank-page">
      <div
        className="container"
        data-testid="kc-callback-loading-container"
        id="kc-callback-loading-container"
      >
        Loading...
      </div>
    </div>
  );
}

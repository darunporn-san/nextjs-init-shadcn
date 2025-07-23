import axios from 'axios';
import qs from 'qs';

export async function getAuthAsync(authorizeCode: string) {
  const payload = {
    client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
    grant_type: 'authorization_code',
    code: authorizeCode,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}oauth/kc/callback`,
    // client_secret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET, // Uncomment if needed
  };
  const formData = qs.stringify(payload);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVICE_SHOP_IN_SHOP}api/v1/authorizations/oauth/token`,
      formData,
      config
    );
    if (response.status === 200) {
      return response.data;
    } else {
      // eslint-disable-next-line no-console
      console.log('response', response);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getAuthAsync error', error);
  }
  return null;
}



export async function getAuthGroupsAsync(accessToken: string) {
  const url = `${process.env.NEXT_PUBLIC_SERVICE_SHOP_IN_SHOP}api/v1/authorizations`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return {
      status: response.status,
      data,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getAuthGroupsAsync error', error);
    return {
      status: 500,
      data: null,
    };
  }
}

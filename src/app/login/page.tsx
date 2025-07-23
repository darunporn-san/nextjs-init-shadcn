'use client';

import React from 'react';
import { genImgSrcSetDirectus, SrcSetOption, genImageDirectus } from '@/lib/utils';
import { useTranslation } from 'next-i18next';

// Keycloak and CDN config from environment variables
const keyCloakConfig = {
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
  grantType: 'authorization_code',
  redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}oauth/kc/callback`,
};

const logoShopCDN = `${process.env.NEXT_PUBLIC_CDN_URL}assets/6e35f5cc-2b55-43b9-8480-4635bb4937f1`;
const sideShopCDN = `${process.env.NEXT_PUBLIC_CDN_URL}assets/be5bda59-69dc-4025-9202-946ce46ae661`;

function LoginHeader() {
  return (
    <header className="w-full py-4 bg-white shadow">
      <div className="nav-blank flex items-center px-4">
        <div className="logo flex items-center">
          {/* <Link href="/login" className="cursor-pointer">
            <img
              src="/assets/images/logo_ofm_admin.png"
              alt="OFM Admin Logo"
              style={{ height: 40 }}
            />
          </Link> */}
          <span className="ml-4">
            <img
              src={logoShopCDN}
              style={{ height: 32, width: 99 }}
              srcSet={genImgSrcSetDirectus(logoShopCDN, [{ w: 99, h: 32, q: 90, ws: '99w' }])}
              sizes="(max-width: 1280px) 99px"
              alt="logo"
            />
          </span>
        </div>
        <div className="lang ml-auto flex items-center cursor-pointer">
          {/* Language switcher can be added here */}
        </div>
      </div>
    </header>
  );
}

function LoginFooter() {
  const { t } = useTranslation();

  return (
    <footer className="main-footer bg-white relative bottom-0 w-full">
      <div className="link-footer flex flex-row flex-wrap justify-center items-center bg-[#0073b9] h-20">
        <a
          href="https://www.ofm.co.th/activity/officemate-marketplace"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[13px]"
        >
          {t('footer.sellWithUs')}
        </a>
        <a
          href="https://www.ofm.co.th/activity/ofm-mall"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[13px]"
        >
          {t('footer.ofmMall')}
        </a>
        <a
          href="https://www.ofm.co.th/activity/returns-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[13px]"
        >
          {t('footer.qAnda')}
        </a>
        <a
          href="https://www.ofm.co.th/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[13px]"
        >
          {t('footer.enterToOfm')}
        </a>
        <a
          href="https://www.facebook.com/officemate.co.th"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[13px]"
        >
          {t('footer.facebook')}
        </a>
      </div>
      <style jsx>{`
        .link-footer a:after {
          content: '|';
          margin: 0 16px;
        }
        .link-footer a:last-child:after {
          content: none;
        }
      `}</style>
    </footer>
  );
}

export default function LoginPage() {
  const handleKeyCloakSigninClick = () => {
    const scopes = 'openid';
    const redirect_url = encodeURIComponent(keyCloakConfig.redirect_url);
    const oauthlocation = `${process.env.NEXT_PUBLIC_BASE_URL_KEYCLOAK}?response_type=code&client_id=${keyCloakConfig.clientId}&redirect_uri=${redirect_url}&scopes=${scopes}`;
    window.location.href = oauthlocation;
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-blue-50"
      data-testid="login-page-root"
      id="login-page-root"
    >
      <LoginHeader />
      <main className="flex flex-1 items-center justify-center">
        <div className="container-fluid text-center w-full flex flex-col md:flex-row items-center justify-center">
          <div className="col hidden md:block mr-8">
            <img
              src={sideShopCDN}
              srcSet={genImgSrcSetDirectus(sideShopCDN, [
                { w: 220, h: 190, q: 90, ws: '220w' },
                { w: 410, h: 353, q: 90, ws: '410w' },
                { w: 430, h: 371, q: 90, ws: '410w' },
                { w: 500, h: 431, q: 90, ws: '500w' },
              ])}
              sizes="(max-width: 768px) 220px, (max-width: 1024px) 410px, (max-width: 1280px) 430px, 500px"
              alt="cover image"
              className="mx-auto"
            />
          </div>
          <div className="col flex justify-center">
            <div className="card bg-white rounded shadow-md" style={{ width: 360 }}>
              <div className="card-body p-8">
                <div className="my-3 flex flex-col items-center">
                  <img
                    src={logoShopCDN}
                    style={{ width: 170 }}
                    srcSet={genImgSrcSetDirectus(logoShopCDN, [
                      { w: 170, h: 138, q: 90, ws: '170w' },
                    ])}
                    sizes="(max-width: 1280px) 170px"
                    alt="logo"
                    data-testid="login-logo"
                    id="login-logo"
                  />
                </div>
                <button
                  className="btn btn-primary w-full mt-2 py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
                  onClick={handleKeyCloakSigninClick}
                  data-testid="login-btn"
                  id="login-btn"
                >
                  เริ่มต้นการใช้งาน
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LoginFooter />
    </div>
  );
}

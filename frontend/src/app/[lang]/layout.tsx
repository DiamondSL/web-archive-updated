'use client'
import * as React from 'react';
import type { Metadata } from "next";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";
import '@fontsource-variable/archivo'
import '@fontsource-variable/open-sans'

import { i18n } from "../../../i18n-config";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {darkTheme} from "@/app/theme/theme";
import createEmotionCache from "@/app/theme/createEmotionCache";
import {CacheProvider} from "@emotion/react";
import {ReactNode} from "react";

const FALLBACK_SEO = {
  title: "Documented",
  description: "Ukrainian resource about fact-checking",
}

const clientSideEmotionCache = createEmotionCache();



async function getGlobal(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
  };

  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal();

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children?: ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal();
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;
  
  const { navbar } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  return (
      <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme={true} />
    <html lang={params.lang}>
      <body>
        <Navbar
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />
        <main id={'#root'}>
          {children}
        </main>
      </body>
    </html>
      </ThemeProvider>
      </CacheProvider>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

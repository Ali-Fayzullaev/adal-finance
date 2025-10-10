// app/[locale]/layout.tsx
import type { Metadata } from "next";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import Providers from "./components/Providers";
import { locales, type Locale } from "@/i18n";
import Script from "next/script";
import PixelsTracker from "./components/PixelsTracker";
import { Suspense } from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({
  children,
  params: { locale }, // ← деструктурируем здесь
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  setRequestLocale(locale); // ← СНАЧАЛА фиксируем локаль
  const messages = await getMessages(); // ← потом читаем сообщения

  return (
    <Providers locale={locale} messages={messages}>
      {/* Yandex.Metrika - ИСПРАВЛЕНО */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) { return; }
          }
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],
          k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
        
        ym(104202860, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: "dataLayer"
        });
        
        // Expose для использования в компонентах
        window.yaMetrikaReady = true;
        `}
      </Script>
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/104202860"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>

      {/* Meta Pixel - ИСПРАВЛЕНО */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){
          if(f.fbq)return;
          n=f.fbq=function(){
            n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
          };
          if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
          t=b.createElement(e);t.async=!0;
          t.src=v;
          s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)
        }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', '1711051356964284');
        fbq('track', 'PageView');
        
        // Expose для использования в компонентах
        window.fbPixelReady = true;
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1711051356964284&ev=PageView&noscript=1"
        />
      </noscript>

      {/* TikTok Pixel - ИСПРАВЛЕНО */}
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`!function (w,d,t) {
          w.TiktokAnalyticsObject=t;
          var ttq=w[t]=w[t]||[];
          ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
          ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
          for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
          ttq.instance=function(t){
            for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)
              ttq.setAndDefer(e,ttq.methods[n]);
            return e
          };
          ttq.load=function(e,n){
            var r="https://analytics.tiktok.com/i18n/pixel/events.js";
            ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
            var o=document.createElement("script");
            o.type="text/javascript",o.async=!0,o.src=r+"?sdkid="+e+"&lib="+t;
            var a=document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(o,a)
          };
          ttq.load('D2IMEIJC77U67ECJDA2G');
          ttq.page();
          
          // Expose для использования в компонентах
          window.ttqReady = true;
        }(window, document, 'ttq');`}
      </Script>
       <Suspense fallback={null}>
        <PixelsTracker />
       </Suspense>
      {children}
    </Providers>
  );
}

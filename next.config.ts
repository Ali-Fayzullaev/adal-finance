// next.config.ts
import type { NextConfig } from "next";
import nextIntl from "next-intl/plugin";

// ✅ указываем именно request-конфиг
const withNextIntl = nextIntl("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
};

export default withNextIntl(nextConfig);

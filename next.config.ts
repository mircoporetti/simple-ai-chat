import type {NextConfig} from "next";

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    env: {
        apiBaseUrl: "http://localhost:8080",
    }
};

export default withNextIntl(nextConfig);

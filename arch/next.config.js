module.exports = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
        isrMemoryCacheSize: 0, // Отключение внутреннего кэша ISR
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

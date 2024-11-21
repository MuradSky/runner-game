module.exports = {
    reactStrictMode: false,
    swcMinify: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

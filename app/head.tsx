// app/head.js
export default function Head() {
    return (
        <>
            <title>Start</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Start" />
            <link
                rel="preload"
                href="/public/font/5by7-Bold.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                href="/public/font/5by7.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                href="/public/font/PT_Root_UI_Bold.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                href="/public/font/PT_Root_UI_Medium.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
        </>
    );
}

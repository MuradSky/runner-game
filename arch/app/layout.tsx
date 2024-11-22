import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import '@/styles/root.scss';

const Header = dynamic(() => import('features/header'), {
    ssr: false,
});

export const metadata: Metadata = {
    title: 'Цифровой инхаус подрядчик для корпораций',
    description: 'Разрабатываем цифровые решения. Увеличиваем их показатели при помощи геймификации',
    appleWebApp: {
        capable: true,
        title: 'Utopia',
    },
    icons: {
        icon: [
            { rel: 'icon', type: 'image/png', url: '/favicon/favicon-96x96.png', sizes: '96x96', },
            { rel: 'icon', type: 'image/svg+xm', url: '/favicon/favicon.svg' },
            { rel: 'shortcut icon', url: '/favicon/favicon.ico' },
            { rel: 'apple-touch-icon', url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
        ],
    },
};

export const revalidate = 0;

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="ru">
            <head>
                <link rel="preload" href="/font/5by7-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/font/5by7.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/font/PT_Root_UI_Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/font/PT_Root_UI_Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            </head>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}

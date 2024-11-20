import { ReactNode } from 'react';
import type { Metadata } from 'next';
import '@/styles/root.scss';
import Header from 'features/header';

export const metadata: Metadata = {
    title: 'Цифровой инхаус подрядчик для корпорация',
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
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}

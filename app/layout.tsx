import { ReactNode } from 'react';
import type { Metadata } from 'next';
import '@/styles/root.scss';
import Header from 'features/header';

export const metadata: Metadata = {
    title: 'Start',
    description: 'Start',
};

export const revalidate = 5;

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

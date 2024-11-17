import { ReactNode } from 'react';
import '@/styles/root.scss';
import Header from 'features/header';

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

import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Shoto!',
    description: 'Make long URLs into custom short URLs',
};

export default function RootLayout({
    children,
    shotos,
}: {
    children: React.ReactNode;
    parallel: React.ReactNode;
    shotos: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <main className="h-full w-full px-6 md:px-32">
                        {children}
                        {shotos}
                    </main>
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}

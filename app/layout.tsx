import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './premium.css';
const sans = localFont({ src: [{ path: '../public/fonts/font-0.ttf', weight: '400' }, { path: '../public/fonts/font-1.ttf', weight: '500' }, { path: '../public/fonts/font-2.ttf', weight: '600' }, { path: '../public/fonts/font-3.ttf', weight: '700' }], variable: '--font-sans', display: 'swap' });
const mono = localFont({ src: '../public/fonts/font-4.ttf', variable: '--font-mono', display: 'swap' });
export const metadata: Metadata = { title: 'SkanCyber — Réseaux, sites web & logiciels sur mesure.', description: 'SkanCyber accompagne votre entreprise : réseaux et Wi-Fi professionnels, sites web, e-commerce, logiciels métier, ERP, CRM et back-offices sur mesure.', icons: { icon: '/favicon.svg' } };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="fr" data-scroll-behavior="smooth" className={`${sans.variable} ${mono.variable}`}><body>{children}</body></html> }

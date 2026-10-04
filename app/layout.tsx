import type { Metadata } from 'next';
import './group.css';
export const metadata: Metadata = { title: 'SkanCyber — Un groupe. Le réseau, la sécurité et vos logiciels.', description: 'SkanCyber réunit le réseau, la cybersécurité et les logiciels métier : SkanFact, SkanEcom et SkanRestau. Découvrez le groupe et ses solutions.', icons: { icon: '/favicon.svg' } };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="fr" data-scroll-behavior="smooth"><body>{children}</body></html> }

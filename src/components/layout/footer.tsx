import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-black to-black text-white overflow-hidden">
      {/* Gradient overlay decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo e Sobre */}
          <div className="space-y-4">
            <Image
              src="/Imagens/logo_Prancheta-w.png"
              alt="Redime Logo"
              width={150}
              height={60}
              className="h-auto w-auto brightness-0 invert"
            />
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">MISSÃO REDIME CHAPECÓ</h3>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                AMOR • VERDADE • MESA & DISCIPULADO
              </p>
              </div>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-primary/30 pb-2">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about/new-here"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Sou Novo Aqui
                </Link>
              </li>
              <li>
                <Link
                  href="/live"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Transmissão Ao Vivo
                </Link>
              </li>
              <li>
                <Link
                  href="/messages"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Mensagens
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link
                  href="/get-involved/membership"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Torne-se Membro
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Doar
                </Link>
              </li>
            </ul>
          </div>

          {/* Ministérios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-primary/30 pb-2">Ministérios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/ministries/children"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Crianças
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries/youth"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Jovens
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries/young-adults"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Jovens Adultos
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries/women"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Mulheres
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries/music"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Música
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries/missions"
                  className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Missões
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-primary/30 pb-2">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Chapecó - SC
                  <br />
                  Santa Catarina, Brasil
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+5511999999999"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contato@redime.com"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  contato@redime.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator com gradiente */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {currentYear} Missão Redime Chapecó. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function NavBar() {
    const router = useRouter();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Work', href: '#career' },
        { name: 'Projects', href: '#projects' },
    ];

    return (
        <>
            <nav className="navbar-unified">
                <div className="container nav-content">
                    <Link href="/">
                        <a className="logo">
                            Jon<span className="logo-accent">Solomon</span>
                        </a>
                    </Link>

                    <div className="nav-items-wrapper">
                        <ul className="nav-links">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}>
                                        <a className={clsx('nav-link-tight', router.pathname === link.href && 'active', 'highlight-hover')}>
                                            {link.name}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="socials">
                            <a href="https://github.com/jonnysh" target="_blank" className="social-icon" title="GitHub">GH</a>
                            <a href="https://linkedin.com/in/Jonsol" target="_blank" className="social-icon" title="LinkedIn">LI</a>
                        </div>
                    </div>
                </div>
            </nav>

            <style jsx>{`
        .navbar-unified {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--nav-height);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 9999;
          border-bottom: 1px solid rgba(0,0,0,0.03);
          display: flex;
          align-items: center;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 21px;
          letter-spacing: -0.03em;
          color: #000;
        }
        
        .logo-accent {
          color: var(--text-secondary);
        }

        .nav-items-wrapper {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-links {
          display: flex;
          gap: 28px;
        }
        
        .nav-link-tight {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: var(--text-secondary);
          position: relative;
          cursor: pointer;
        }
        
        .nav-link-tight:hover, .active {
          color: #000;
        }

        .socials {
          display: flex;
          gap: 12px;
          padding-left: 24px;
          border-left: 1px solid #f0f0f0;
        }
        
        .social-icon {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 11px;
          background: #f5f5f5;
          padding: 6px 8px;
          border-radius: 6px;
          color: #555;
          transition: all 0.2s;
        }
        
        .social-icon:hover {
          background: #000;
          color: #fff;
          transform: translateY(-1px);
        }
        
        @media (max-width: 650px) {
          .nav-links { display: none; } /* Mobile sidebar todo */
        }
      `}</style>
        </>
    );
}

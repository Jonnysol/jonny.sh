import HeadComponent from "../components/head";
import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar';
import { motion } from 'framer-motion';

const PhotoBelt = dynamic(() => import("../components/PhotoBelt"), {
    ssr: false,
    loading: () => <div style={{ height: 150 }}></div>
});

const career = [
    {
        company: "Apple",
        role: "Vision Hardware Lab Engineer",
        period: "2024 - Present",
        desc: "Designing holistic test infrastructure for Apple Vision Pro. Sole DRI for labs in Cupertino & Boulder. Building robotic fixtures for system-level validation.",
        logo: "/assets/img/icons/apple.png"
    },
    {
        company: "ContextVision",
        role: "Founder & Builder",
        period: "2024 - Present",
        desc: "Building next-generation context awareness tools.",
        logo: "/assets/img/icons/playroom.png"
    },
    {
        company: "Verizon",
        role: "IT Field Technician",
        period: "2018 - 2023",
        desc: "Implemented IoT systems across DC. Integrated computer vision for defect detection (98% rate).",
        logo: "/assets/img/icons/verizon.png"
    }
];

const projects = [
    {
        title: "JailTime.io",
        role: "Creator",
        icon: "/assets/img/icons/codecaptcha.png",
        link: "https://www.codecaptcha.io",
        desc: "Secure MCP authentication system.",
        tag: "Security"
    },
    {
        title: "IoT-Zero",
        role: "Open Source",
        icon: "/assets/img/icons/zero.png",
        link: "https://github.com/jonnysh/iot-zero/",
        desc: "Lightweight IoT framework for embedded systems.",
        tag: "Framework"
    },
    {
        title: "SmartSensor",
        role: "Creator",
        icon: "/assets/img/icons/screenshothero.png",
        link: "/projects/screenshothero/",
        desc: "IoT aggregation platform.",
        tag: "IoT"
    },
    {
        title: "DCESK8",
        role: "Co-founder",
        icon: "/assets/img/icons/dcesk8.png",
        link: "https://dcesk8.com",
        desc: "E-mobility advocacy & tools.",
        tag: "Community"
    },
    {
        title: "RecordScreen.io",
        role: "Creator",
        icon: "/assets/img/icons/recordscreen.png",
        link: "https://recordscreen.io/",
        desc: "Browser-based screen recorder.",
        tag: "Web Tool"
    },
    {
        title: "Coco Music",
        role: "App Dev",
        icon: "/assets/img/icons/coco.png",
        link: "https://apps.apple.com/us/app/coco-music/id1401506547/",
        desc: "Streamlined music client.",
        tag: "Mobile"
    }
];

export default function Home() {
    return (
        <div className="main-wrapper">
            <HeadComponent title="Jonathan Solomon - Engineer & Maker" />
            <NavBar />

            <main>
                {/* --- HERO: TIGHT & CENTERED --- */}
                <section className="hero-section container">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="center-content"
                    >
                        <div className="hero-avatar-wrapper">
                            <img src="/photo.jpg" alt="Jonathan" className="profile-img" />
                            <div className="availability-badge">
                                <span className="dot"></span> Available
                            </div>
                        </div>

                        <h1 className="hero-title">
                            Hi, I&apos;m <span className="highlight-hover">Jonathan</span>.
                        </h1>

                        <p className="hero-bio">
                            Engineer & Digital Alchemist.<br />
                            Building hardware at <span className="bold">Apple</span> and software at <span className="bold">ContextVision</span>.
                        </p>

                        <div className="hero-cta">
                            <a href="#projects" className="btn-primary">View Work</a>
                            <a href="https://github.com/jonnysh" className="btn-text">GitHub ↗</a>
                        </div>
                    </motion.div>
                </section>

                {/* --- PHOTO BELT (Dynamic/Artistic) --- */}
                <div className="belt-wrapper-artistic">
                    <PhotoBelt />
                    {/* Tape accents to satisfy "Artistic Character" */}
                    <div className="tape-accent tape-left"></div>
                    <div className="tape-accent tape-right"></div>
                </div>

                {/* --- CAREER STORY --- */}
                <section id="career" className="section container">
                    <div className="section-label">Experience</div>
                    <div className="career-list">
                        {career.map((job, i) => (
                            <motion.div
                                key={i}
                                className="career-item"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="career-logo">
                                    <img src={job.logo} alt={job.company} />
                                </div>
                                <div className="career-details">
                                    <div className="career-header">
                                        <h3 className="career-role">{job.role}</h3>
                                        <span className="career-period">{job.period}</span>
                                    </div>
                                    <div className="career-company">{job.company}</div>
                                    <p className="career-desc">{job.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- PROJECTS GRID --- */}
                <section id="projects" className="section container">
                    <div className="section-label">Selected Works</div>
                    <div className="project-grid">
                        {projects.map((p, i) => (
                            <motion.a
                                href={p.link}
                                target="_blank"
                                key={i}
                                className="card-editorial"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <div className="card-content">
                                    <div className="card-top">
                                        <img src={p.icon} alt={p.title} className="p-icon" />
                                        <span className="sticker-badge">{p.tag}</span>
                                    </div>
                                    <h3 className="p-title">{p.title}</h3>
                                    <p className="p-desc">{p.desc}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>

            </main>

            <footer className="footer container">
                <p>© {new Date().getFullYear()} Jonathan Solomon.</p>
            </footer>

            <style jsx>{`
        .main-wrapper {
          padding-top: 80px;
        }

        /* HERO */
        .hero-section {
          text-align: center;
          padding: 60px 20px 50px;
          display: flex;
          justify-content: center;
        }
        
        .center-content {
          max-width: 600px;
        }

        .hero-avatar-wrapper {
          position: relative;
          width: 88px;
          height: 88px;
          margin: 0 auto 24px;
        }

        .profile-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #000;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
        }

        .availability-badge {
          position: absolute;
          bottom: -8px;
          right: -15px;
          background: #fff;
          border: 1px solid #eee;
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .dot {
          width: 6px;
          height: 6px;
          background: var(--color-acid);
          border-radius: 50%;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .hero-bio {
          font-size: 19px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 32px;
        }
        
        .bold { font-weight: 600; color: #000; }
        
        .hero-cta {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }
        
        .btn-primary {
          background: #000;
          color: #fff;
          padding: 10px 24px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          transition: transform 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          background: var(--color-electric);
        }
        
        .btn-text {
          font-size: 14px;
          font-weight: 500;
          text-decoration: underline;
        }

        /* ARTISTIC BELT */
        .belt-wrapper-artistic {
          position: relative;
          margin: 50px 0;
          transform: rotate(-1.5deg) scale(1.02);
          background: var(--bg-paper);
          border-top: 2px solid #000;
          border-bottom: 2px solid #000;
          padding: 12px 0;
          z-index: 5;
        }
        
        .tape-accent {
          position: absolute;
          width: 80px;
          height: 20px;
          background: rgba(255, 255, 0, 0.3); /* Highlighter yellow tape */
          z-index: 10;
        }
        .tape-left { top: -10px; left: 10%; transform: rotate(5deg); }
        .tape-right { bottom: -10px; right: 10%; transform: rotate(-3deg); }

        /* SECTIONS */
        .section {
          padding: 70px 20px;
          max-width: 840px;
        }
        
        .section-label {
          font-family: 'Space Grotesk';
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #888;
          text-align: center;
          margin-bottom: 40px;
          position: relative;
        }
        .section-label::after {
          content: "";
          display: block;
          width: 1px;
          height: 20px;
          background: #eee;
          margin: 10px auto 0;
        }

        /* CAREER */
        .career-list { display: flex; flex-direction: column; gap: 48px; }
        .career-item { display: flex; gap: 24px; }
        
        .career-logo {
          flex-shrink: 0;
        }
        .career-logo img {
          width: 52px;
          height: 52px;
          border-radius: 10px;
          border: 1px solid #f0f0f0;
        }
        
        .career-details { flex: 1; }
        
        .career-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }
        
        .career-role { font-size: 18px; font-weight: 600; }
        .career-period { font-size: 13px; color: #999; font-family: 'Space Grotesk'; }
        .career-company { font-size: 14px; font-weight: 500; margin-bottom: 10px; color: #444; }
        .career-desc { font-size: 15px; color: var(--text-secondary); line-height: 1.6; }

        /* PROJECTS */
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        
        .p-icon { width: 44px; height: 44px; border-radius: 8px; border: 1px solid #f0f0f0; }
        .card-top { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .p-title { font-size: 17px; margin-bottom: 8px; }
        .p-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.5; }

        .footer {
          padding: 80px 0;
          text-align: center;
          font-size: 12px;
          color: #ccc;
          border-top: 1px solid #f9f9f9;
        }

        @media (max-width: 600px) {
           .career-item { flex-direction: column; text-align: center; align-items: center; }
           .career-header { flex-direction: column; gap: 4px; }
           .hero-title { font-size: 36px; }
        }
      `}</style>
        </div>
    )
}

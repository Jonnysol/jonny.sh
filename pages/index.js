import HeadComponent from "../components/head";
import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar';
import ArtisticBackground from '../components/ArtisticBackground';
import { motion } from 'framer-motion';

const PhotoBelt = dynamic(() => import("../components/PhotoBelt"), {
    ssr: false,
    loading: () => <div style={{ height: 150 }}></div>
});

// SVG DOODLES (Sketchbook Accents)
const ScribbleUnderline = () => (
    <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="scribble">
        <path d="M2.5 17.5C50 2.5 150 2.5 197.5 17.5" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

const Tape = ({ rotate = 0, top, left, right, bottom }) => (
    <div
        className="tape-strip"
        style={{ transform: `rotate(${rotate}deg)`, top, left, right, bottom }}
    />
);

/* --- DATA: HIGH FIDELITY COPY --- */
const career = [
    {
        company: "Apple",
        role: "Vision Hardware Engineer",
        period: "2024 - Present",
        desc: [
            "Designing holistic test infrastructure for Apple Vision Pro.",
            "Sole DRI for automation labs in Cupertino & Boulder."
        ],
        logo: "/assets/img/icons/apple.png"
    },
    {
        company: "ContextVision",
        role: "Founder & Builder",
        period: "2024 - Present",
        desc: [
            "Building next-generation context awareness engines.",
            "Shipped MVP used by 500+ alpha testers."
        ],
        logo: "/assets/img/icons/playroom.png"
    },
    {
        company: "Verizon",
        role: "IT Field Technician",
        period: "2018 - 2023",
        desc: [
            "Implemented IoT systems across DC utilizing computer vision.",
            "Achieved 98% defect detection rate via custom pipelines."
        ],
        logo: "/assets/img/icons/verizon.png"
    }
];

const projects = [
    {
        title: "JailTime.io",
        role: "Creator",
        icon: "/assets/img/icons/codecaptcha.png",
        link: "https://www.codecaptcha.io",
        desc: "Secure MCP authentication system with 99.9% uptime.",
        tag: "Security"
    },
    {
        title: "IoT-Zero",
        role: "Open Source",
        icon: "/assets/img/icons/zero.png",
        link: "https://github.com/jonnysh/iot-zero/",
        desc: "Lightweight IoT framework for rapid prototyping.",
        tag: "Framework"
    },
    {
        title: "SmartSensor",
        role: "Creator",
        icon: "/assets/img/icons/screenshothero.png",
        link: "/projects/screenshothero/",
        desc: "IoT aggregation platform handling 1M+ events.",
        tag: "IoT"
    },
    {
        title: "DCESK8",
        role: "Co-founder",
        icon: "/assets/img/icons/dcesk8.png",
        link: "https://dcesk8.com",
        desc: "Largest E-mobility community in DC.",
        tag: "Community"
    },
    {
        title: "RecordScreen",
        role: "Creator",
        icon: "/assets/img/icons/recordscreen.png",
        link: "https://recordscreen.io/",
        desc: "Browser-based screen recorder with no install.",
        tag: "Tool"
    },
    {
        title: "Coco Music",
        role: "App Dev",
        icon: "/assets/img/icons/coco.png",
        link: "https://apps.apple.com/us/app/coco-music/id1401506547/",
        desc: "Streamlined music client for iOS.",
        tag: "Mobile"
    }
];

export default function Home() {
    return (
        <div className="main-wrapper">
            <HeadComponent title="Jonathan Solomon - Engineer & Maker" />
            <ArtisticBackground />
            <NavBar />

            <main>
                {/* --- HERO --- */}
                <section className="hero-section container">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="center-content"
                    >
                        <div className="hero-avatar-wrapper">
                            <img src="/photo.jpg" alt="Jonathan" className="profile-img" />
                            <Tape rotate={-15} top="-10px" left="-10px" />
                            <div className="availability-badge">
                                <span className="dot"></span> Available
                            </div>
                        </div>

                        <h1 className="hero-title">
                            Hi, I&apos;m <span className="highlight-mark">Jonathan</span>.
                            <div className="scribble-wrapper"><ScribbleUnderline /></div>
                        </h1>

                        <p className="hero-bio">
                            Engineer & Digital Alchemist.<br />
                            Hardware at <span className="bold">Apple</span>. Software at <span className="bold">ContextVision</span>.
                        </p>

                        <div className="hero-cta">
                            <a href="#projects" className="btn-primary">View Work</a>
                            <a href="https://github.com/jonnysh" className="btn-text">GitHub ↗</a>
                        </div>
                    </motion.div>
                </section>

                {/* --- ARTISTIC BELT (Tilted) --- */}
                <div className="belt-wrapper-artistic">
                    <PhotoBelt />
                    <Tape rotate={5} top="-15px" right="10%" />
                    <Tape rotate={-3} bottom="-15px" left="15%" />
                </div>

                {/* --- EXPERIENCE (Refactored: Smart Badges) --- */}
                <section id="career" className="section container">
                    <div className="section-header-flex">
                        <div className="section-label">Trajectory</div>
                        {/* LOTTIE_PLACEHOLDER: insert subtle animated tech icon */}
                        <div style={{ width: 24, height: 24, background: '#eee', borderRadius: 4, display: 'grid', placeItems: 'center' }} title="Lottie Placeholder">
                            <span style={{ fontSize: 10 }}>⚡️</span>
                        </div>
                    </div>

                    <div className="smart-badge-grid">
                        {career.map((job, i) => (
                            <motion.div
                                key={i}
                                className="smart-badge"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                            >
                                <div className="corner-tape"></div>
                                <div className="sb-header">
                                    <img src={job.logo} alt={job.company} className="sb-logo" />
                                    <div className="sb-meta">
                                        <div className="sb-role">{job.role}</div>
                                        <div className="sb-company">{job.company}</div>
                                    </div>
                                </div>
                                <div className="sb-content">
                                    <ul>
                                        {job.desc.map((line, idx) => (
                                            <li key={idx}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- PROJECTS --- */}
                <section id="projects" className="section container">
                    <div className="section-label">Selected Works</div>
                    <div className="smart-badge-grid">
                        {projects.map((p, i) => (
                            <motion.a
                                href={p.link}
                                target="_blank"
                                key={i}
                                className="card-editorial"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
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

                {/* --- BIO / VIBE MICRO-SECTION --- */}
                <section className="section container" style={{ textAlign: 'center', opacity: 0.7 }}>
                    <p style={{ fontFamily: 'Space Grotesk', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
                        I build systems that reduce hours to minutes. From large-scale robotics orchestration to EDM-inspired creative tools, I blend engineering precision with rave energy.
                    </p>
                </section>

            </main>

            <footer className="footer container">
                <p>© {new Date().getFullYear()} Jonathan Solomon.</p>
            </footer>

            <style jsx>{`
        .main-wrapper {
          padding-top: 80px;
          position: relative;
        }

        .hero-section {
          text-align: center;
          padding: 60px 20px 50px;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        
        .center-content { max-width: 600px; position: relative; }

        .hero-avatar-wrapper {
          position: relative;
          width: 90px;
          height: 90px;
          margin: 0 auto 24px;
        }

        .profile-img {
          width: 100%; height: 100%;
          border-radius: 50%;
          border: 2px solid #000;
        }

        .availability-badge {
          position: absolute; bottom: -8px; right: -15px;
          background: #fff; border: 1px solid #000;
          padding: 3px 8px; border-radius: 20px;
          font-size: 10px; font-weight: 700;
          display: flex; align-items: center; gap: 4px;
          box-shadow: 2px 2px 0 #000;
        }
        
        .dot { width: 6px; height: 6px; background: #ccff00; border-radius: 50%; border: 1px solid #000; }

        .hero-title {
          font-size: 48px; font-weight: 700;
          margin-bottom: 24px; line-height: 1.1;
          position: relative; display: inline-block;
        }
        
        .scribble-wrapper {
          position: absolute;
          bottom: -15px; left: 50%; transform: translateX(-50%);
          width: 150px; z-index: -1;
        }

        .hero-bio {
          font-size: 18px; color: var(--text-secondary);
          line-height: 1.5; margin-bottom: 32px;
        }
        
        .bold { font-weight: 600; color: #000; background: rgba(204,255,0,0.2); padding: 0 4px; border-radius: 2px; }
        
        .hero-cta { display: flex; justify-content: center; align-items: center; gap: 20px; }
        
        .btn-primary {
          background: #000; color: #fff;
          padding: 10px 24px; border-radius: 30px;
          font-weight: 600; font-size: 14px;
          border: 2px solid #000;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background: #ccff00; color: #000;
          box-shadow: 4px 4px 0 #000;
          transform: translate(-2px, -2px);
          color: #000;
        }
        
        .btn-text { font-size: 14px; font-weight: 500; text-decoration: underline; }

        /* BELT */
        .belt-wrapper-artistic {
          position: relative; margin: 60px 0;
          transform: rotate(-1.5deg) scale(1.02);
          background: var(--bg-paper);
          border-top: 2px solid #000; border-bottom: 2px solid #000;
          padding: 12px 0; z-index: 5;
        }
        
        .tape-strip {
          position: absolute; width: 60px; height: 25px;
          background: rgba(255, 230, 0, 0.4);
          border-left: 1px dashed rgba(0,0,0,0.2);
          border-right: 1px dashed rgba(0,0,0,0.2);
          z-index: 20;
          box-shadow: 1px 1px 2px rgba(0,0,0,0.1);
          pointer-events: none;
        }

        .section { padding: 80px 20px; max-width: 840px; position: relative; z-index: 2; }
        .section-header-flex { display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 40px; }
        
        .section-label {
          font-family: 'Space Grotesk'; font-size: 11px;
          text-transform: uppercase; letter-spacing: 0.15em;
          color: #888; text-align: center;
        }

        .project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
        .p-icon { width: 44px; height: 44px; border-radius: 8px; border: 1px solid #eee; }
        .card-top { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .p-title { font-size: 17px; margin-bottom: 8px; font-weight: 600; }
        .p-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.5; }

        .footer { padding: 80px 0; text-align: center; font-size: 12px; color: #ccc; border-top: 1px solid #f9f9f9; }

        @media (max-width: 600px) {
           .hero-title { font-size: 38px; }
        }
      `}</style>
        </div>
    )
}

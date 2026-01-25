import HeadComponent from "../components/head";
import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar';
import ArtisticBackground from '../components/ArtisticBackground';
import { motion } from 'framer-motion';

const PhotoBelt = dynamic(() => import("../components/PhotoBelt"), {
  ssr: false,
  loading: () => <div style={{ height: 150 }}></div>
});

// SVG DOODLES
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

const career = [
  {
    company: "Apple",
    role: "Vision Hardware Lab Engineer",
    period: "2024 - Present",
    desc: "Designing holistic test infrastructure for Apple Vision Pro. Sole DRI for labs in Cupertino & Boulder.",
    logo: "/assets/img/icons/apple.png"
  },
  {
    company: "ContextVision",
    role: "Founder & Builder",
    period: "2024 - Present",
    desc: "Building next-generation context awareness.",
    logo: "/assets/img/icons/playroom.png"
  },
  {
    company: "Verizon",
    role: "IT Field Technician",
    period: "2018 - 2023",
    desc: "Implemented IoT systems across DC. Integrated computer vision (98% defect detection).",
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
    desc: "Lightweight IoT framework.",
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
    desc: "E-mobility advocacy.",
    tag: "Community"
  },
  {
    title: "RecordScreen",
    role: "Creator",
    icon: "/assets/img/icons/recordscreen.png",
    link: "https://recordscreen.io/",
    desc: "Browser-based screen recorder.",
    tag: "Tool"
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
              Hi, I&apos;m <span className="highlight-hover">Jonathan</span>.
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

        {/* --- ARTISTIC BELT --- */}
        <div className="belt-wrapper-artistic">
          <PhotoBelt />
          <Tape rotate={5} top="-15px" right="10%" />
          <Tape rotate={-3} bottom="-15px" left="15%" />
        </div>

        {/* --- EXPERINCE (Refactored: Compact Timeline) --- */}
        <section id="career" className="section container">
          <div className="section-label">Trajectory</div>
          <div className="timeline-container">
            <div className="timeline-line"></div>
            {career.map((job, i) => (
              <motion.div
                key={i}
                className="timeline-row"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="t-logo">
                  <img src={job.logo} alt={job.company} />
                </div>
                <div className="t-content">
                  <div className="t-header">
                    <h3 className="t-role">{job.role} <span className="at">@</span> <span className="t-comp">{job.company}</span></h3>
                    <span className="t-period">{job.period}</span>
                  </div>
                  <p className="t-desc">{job.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- PROJECTS --- */}
        <section id="projects" className="section container">
          <div className="section-label">Selected Works</div>
          <div className="project-grid">
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
        }

        .section { padding: 80px 20px; max-width: 840px; position: relative; z-index: 2; }
        .section-label {
          font-family: 'Space Grotesk'; font-size: 11px;
          text-transform: uppercase; letter-spacing: 0.15em;
          color: #888; text-align: center; margin-bottom: 50px;
          position: relative;
        }
        .section-label::after {
          content: ""; display: block; width: 2px; height: 20px;
          background: #ddd; margin: 15px auto 0;
        }

        /* --- TIMELINE COMPACT STYLE --- */
        .timeline-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-left: 20px;
        }
        /* The Wire Line */
        .timeline-line {
          position: absolute;
          left: 39px; /* center of logo (40px) roughly */
          top: 20px;
          bottom: 20px;
          width: 2px;
          background: #e0e0e0;
          z-index: 0;
        }

        .timeline-row {
          display: flex;
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .t-logo img {
          width: 40px; height: 40px;
          border-radius: 8px;
          border: 1px solid #000;
          background: #fff;
          z-index: 2;
          position: relative;
        }

        .t-content {
          flex: 1;
          padding-top: 2px; /* align with logo top */
        }

        .t-header {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 4px;
        }

        .t-role {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
        }

        .at { color: #aaa; font-weight: 400; }
        .t-comp { font-weight: 600; color: var(--text-primary); border-bottom: 2px solid var(--color-acid); }

        .t-period {
          font-size: 12px;
          font-family: 'Space Grotesk';
          color: #888;
          margin-left: auto; /* Push to right */
        }

        .t-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.4;
          max-width: 600px;
        }

        .project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
        .p-icon { width: 44px; height: 44px; border-radius: 8px; border: 1px solid #eee; }
        .card-top { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .p-title { font-size: 17px; margin-bottom: 8px; font-weight: 600; }
        .p-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.5; }

        .footer { padding: 80px 0; text-align: center; font-size: 12px; color: #ccc; border-top: 1px solid #f9f9f9; }

        @media (max-width: 600px) {
           .hero-title { font-size: 38px; }
           .t-header { flex-direction: column; gap: 2px; }
           .t-period { margin-left: 0; }
           .timeline-line { left: 19px; } /* Adjust for smaller padding if needed */
           .timeline-container { padding-left: 0; }
        }
      `}</style>
    </div>
  )
}

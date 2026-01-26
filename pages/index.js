import HeadComponent from "../components/head";
import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar';
import ArtisticBackground from '../components/ArtisticBackground';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Use the new TWISTED belt
const PhotoBeltTwist = dynamic(() => import("../components/PhotoBeltTwist"), {
    ssr: false,
    loading: () => <div style={{ height: 400 }}></div>
});

// --- SURPRISE DATA (The "Full Book Load") ---
const career = [
    {
        company: "Apple",
        role: "Vision Hardware Engineer",
        period: "2024 - Present",
        desc: [
            "Sole DRI for Vision Pro automation labs (Cupertino/Boulder).",
            "Designed robotic fixtures for high-precision validation.",
            "Led HW/SW integration for special projects (Bash, C++, Python).",
            "Drove stability testing at scale (flicker detection, signal integrity).",
        ],
        stack: ["Python", "Robotics", "CV", "Hardware"],
        logo: "/assets/img/icons/apple.png",
        showcase: "/assets/img/apple_showcase.jpg",
        color: "#fafafa"
    },
    {
        company: "ContextVision",
        role: "Founder & Hacker",
        period: "2024 - Present",
        desc: [
            "Shipped context-aware AI engine to 500+ users.",
            "LLM orchestration on the edge.",
            "Vibe: 'Her' meets 'Jarvis'."
        ],
        stack: ["Typescript", "LLMs", "Swift", "Next.js"],
        logo: "/assets/img/icons/playroom.png",
        showcase: "/assets/img/belt/photos2.jpeg",
        color: "#fff0f5"
    },
    {
        company: "DCESK8",
        role: "Community Lead",
        period: "2017 - 2023",
        desc: [
            "We build electric Mobility devices and charge maps",
            "Organized 3000+ members in DC with classes and events.",
            "Advocating for PEV safety & rights."
        ],
        stack: ["Community", "Events", "PEV"],
        logo: "/assets/img/icons/dcesk8.png",
        showcase: "/assets/img/belt/IMG_2180.jpg",
        color: "#e6f0ff"
    },
    {
        company: "Verizon",
        role: "Field Tech Lead",
        period: "2018 - 2023",
        desc: [
            "Deployed IoT computer vision (98% defect detection).",
            "Automated testing via Python/LabVIEW (-40% manual time).",
            "Designed test environments improving reliability by 30%.",
            "Calibrated precision equipment (±0.1% accuracy)."
        ],
        stack: ["IoT", "Networking", "Field Ops"],
        logo: "/assets/img/icons/verizon.png",
        showcase: "/assets/img/belt/photos3.jpeg",
        color: "#fff"
    },
    {
        company: "Universal Mind",
        role: "Software Engineer Intern",
        period: "2017",
        desc: [
            "Assisted in development of mobile applications.",
            "Collaborated with senior engineers on client projects.",
            "Gained experience in agile development workflows."
        ],
        stack: ["Mobile", "Agile", "Development"],
        logo: "/assets/img/icons/universal_mind.png",
        showcase: "/assets/img/belt/photos4.jpeg",
        color: "#f0ffe6"
    }
];

// PHOTO-FIRST PROJECTS (Polaroid Style)
const projects = [
    {
        title: "Time Capsule TV",
        role: "Retro TV",
        icon: "/assets/img/image.png",
        link: "https://tv.jonny.sh",
        desc: "Bring back the golden age of television.",
        tag: "App",
        rotate: 1.5,
        sticker: "TRY ME ↙"
    },
    {
        title: "Washington DC Electric Skateboarding",
        role: "Community",
        icon: "/assets/img/dcesk8_logo.png",
        link: "https://dcesk8.com",
        desc: "We ride electric skateboards fast.",
        tag: "Vibe",
        rotate: -1
    },
    {
        title: "StreamGrid",
        role: "Video Tool",
        icon: "/assets/img/Streamgrid.png",
        link: "https://jonnysol.github.io/StreamGrid/",
        desc: "Monitor multiple streams in a single grid.",
        tag: "Web",
        rotate: -2
    },
    {
        title: "JailTime.io",
        role: "Security Tool",
        icon: "/assets/img/icons/codecaptcha.png",
        link: "https://www.codecaptcha.io",
        desc: "MCP Auth system that actually works.",
        tag: "Security",
        rotate: -2
    },
    {
        title: "IoT-Zero",
        role: "Framework",
        icon: "/assets/img/icons/zero.png",
        link: "https://github.com/jonnysh/iot-zero/",
        desc: "Rapid prototyping for lazy engineers.",
        tag: "Open Source",
        rotate: 1.5
    },
    {
        title: "SmartSensor",
        role: "Hardware",
        icon: "/assets/img/icons/screenshothero.png",
        link: "/projects/screenshothero/",
        desc: "1M+ event aggregation. It's watching you.",
        tag: "IoT",
        rotate: 3
    }
];

// --- COMPONENTS ---

const Marquee = () => (
    <div className="marquee-container">
        <div className="walker-wrapper">
            <img src="/assets/img/walkman.gif" alt="walking" className="walker" />
        </div>
        <div className="marquee-content">
            <span>ROBOTICS • AUTOMATION • ANSIBLE • KUBERNETES • BASH • HARDWARE • SCALING • PYTHON • COMPUTER VISION • SLAM • ROS • </span>
            <span>ROBOTICS • AUTOMATION • ANSIBLE • KUBERNETES • BASH • HARDWARE • SCALING • PYTHON • COMPUTER VISION • SLAM • ROS • </span>
        </div>
        <style jsx>{`
      .marquee-container {
        background: #000; color: var(--color-acid);
        padding: 12px 0; overflow: visible; white-space: nowrap;
        transform: rotate(-2deg) scale(1.05);
        border-top: 2px solid var(--color-acid);
        border-bottom: 2px solid var(--color-acid);
        margin: 40px 0;
        position: relative; z-index: 5;
      }
      .marquee-content {
        display: inline-block;
        animation: scroll 20s linear infinite;
        font-family: 'Space Grotesk'; font-weight: 700; font-size: 24px;
        overflow: hidden; /* Keep content clipped if needed, but container is visible for walker */
      }
      .walker-wrapper {
        position: absolute;
        top: -65px; /* Walking on top */
        left: 0;
        width: 100%;
        height: 60px;
        pointer-events: none;
      }
      .walker {
        height: 60px;
        position: absolute;
        bottom: 0;
        animation: walk-cycle 50s linear infinite;
      }
      @keyframes walk-cycle {
        0% { left: -150px; transform: scaleX(1); }
        40% { left: 105%; transform: scaleX(1); }   /* Walk to right (20s) */
        40.001% { transform: scaleX(-1); }          /* Flip immediately */
        46% { left: 105%; transform: scaleX(-1); }  /* Wait (3s) */
        86% { left: -150px; transform: scaleX(-1); }/* Walk back (20s) */
        86.001% { transform: scaleX(1); }           /* Reset flip */
        100% { left: -150px; transform: scaleX(1); }/* Wait remaining time */
      }
      @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    `}</style>
    </div>
);

const FolderTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="folder-tabs-container">
            {/* TABS HEADER */}
            <div className="folder-tabs-header">
                {career.map((job, i) => (
                    <div
                        key={i}
                        className={`folder-tab ${activeTab === i ? 'active' : ''}`}
                        onClick={() => setActiveTab(i)}
                    >
                        {job.company.replace('*', '')}
                    </div>
                ))}
            </div>

            {/* FOLDER CONTENT */}
            <div className="folder-content" style={{ backgroundColor: career[activeTab].color }}>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20, rotate: -1 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="folder-inner"
                >
                    <div className="fi-layout" style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {/* LEFT: CONTENT */}
                        <div className="fi-content" style={{ flex: '1', minWidth: '300px' }}>
                            <div className="fi-header">
                                <img
                                    src={jobToImg(career[activeTab])}
                                    alt="logo"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        objectFit: 'contain',
                                        background: '#fff',
                                        padding: '6px',
                                        border: '2px solid #000',
                                        borderRadius: '8px',
                                        boxShadow: '4px 4px 0 rgba(0,0,0,1)'
                                    }}
                                />
                                <div>
                                    <h3 className="fi-role marker-text">{career[activeTab].role}</h3>
                                    <div className="fi-company">{career[activeTab].company} <span className="fi-period">{career[activeTab].period}</span></div>
                                </div>
                            </div>

                            <div className="fi-stack">
                                {career[activeTab].stack?.map((tech, i) => (
                                    <span key={i} className="tech-sticker">{tech}</span>
                                ))}
                            </div>

                            <ul className="fi-list">
                                {career[activeTab].desc.map((d, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        {d}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* RIGHT: SHOWCASE IMAGE */}
                        {career[activeTab].showcase && (
                            <div className="fi-showcase" style={{ flex: '0 0 320px' }}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        width: '100%',
                                        height: '240px',
                                        background: '#000',
                                        border: '2px solid #000',
                                        boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
                                        position: 'relative',
                                        transform: 'rotate(3deg)'
                                    }}
                                >
                                    <img
                                        src={career[activeTab].showcase}
                                        alt="Showcase"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {/* Tape on Corners */}
                                    <div className="tape" style={{ top: -12, left: -25, transform: "rotate(-35deg)" }}></div>
                                    <div className="tape" style={{ top: -12, right: -25, transform: "rotate(35deg)" }}></div>
                                    <div className="tape" style={{ bottom: -12, left: -25, transform: "rotate(35deg)" }}></div>
                                    <div className="tape" style={{ bottom: -12, right: -25, transform: "rotate(-35deg)" }}></div>
                                </motion.div>
                            </div>
                        )}
                    </div>


                </motion.div>
                <div className="tape corner-tr"></div>
                <div className="tape corner-tl"></div>
            </div>
        </div>
    );
};

const tools = [
    { name: "VS Code", type: "Soft", icon: "💻" },
    { name: "Soldering", type: "Hard", icon: "🔥" },
    { name: "Figma", type: "Design", icon: "🎨" },
    { name: "Oscilloscope", type: "Hard", icon: "📈" },
    { name: "Next.js", type: "Web", icon: "▲" },
    { name: "Coffee", type: "Fuel", icon: "☕️" },
];

const Workbench = () => (
    <div className="workbench-clipboard paper-card" style={{ transform: 'rotate(-2deg)' }}>
        <div className="clip-metal"></div>
        <h3 className="wb-title handwritten">MY WORKBENCH</h3>
        <div className="wb-grid">
            {tools.map((tool, i) => (
                <div key={i} className="wb-item">
                    <div className="wb-check">[x]</div>
                    <div className="wb-name">{tool.icon} {tool.name}</div>
                </div>
            ))}
        </div>
        <div className="scribble-note">
            &quot;Always be shipping.&quot;
        </div>
        <div className="tape corner-tl"></div>
    </div>
)

// Helper to handle missing internal images
const jobToImg = (job) => {
    if (job.logo.startsWith('http')) return job.logo;
    return job.logo || "/assets/img/icons/apple.png";
};

export async function getStaticProps() {
    const fs = require('fs');
    const path = require('path');

    const beltDir = path.join(process.cwd(), 'public/assets/img/belt');
    let beltImages = [];

    try {
        const filenames = fs.readdirSync(beltDir);
        beltImages = filenames.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        }).map(file => `/assets/img/belt/${file}`);
    } catch (e) {
        console.error("Error reading belt directory:", e);
    }

    return {
        props: {
            beltImages
        }
    };
}

export default function Home({ beltImages = [] }) {
    return (
        <div className="main-wrapper">
            <HeadComponent title="Jonathan Solomon - FULL STACK CHAOS" />
            <ArtisticBackground />
            <NavBar />

            <main>
                {/* --- HERO: ID CARD STYLE --- */}
                <section className="hero-section container">
                    <motion.div
                        className="badge-paper-card"
                        initial={{ rotate: -5, y: -100 }}
                        animate={{ rotate: -2, y: 0 }}
                        transition={{ type: "spring", damping: 12 }}
                    >
                        <div className="tape top-center"></div>
                        <div className="id-photo">
                            <img src="/photo.jpg" alt="Me" />
                        </div>
                        <div className="id-info">
                            <h1>JONATHAN SOLOMON</h1>
                            <div className="id-role">
                                <span className="mark-yellow">ENGINEER</span> & <span className="mark-blue">MAKER</span>
                            </div>
                            <div className="id-barcode"> ||| || ||| | |||| ||| </div>
                        </div>

                        <div className="scribble-doodle">
                            <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'absolute', bottom: 10, right: 10, transform: 'rotate(-10deg)' }}>
                                <path d="M10,10 Q50,90 90,10" fill="none" stroke="red" strokeWidth="3" />
                                <path d="M10,30 Q50,110 90,30" fill="none" stroke="blue" strokeWidth="3" opacity="0.5" />
                            </svg>
                        </div>
                    </motion.div>

                    <div className="hero-text-side">
                        <h2 className="scribble-text" style={{ fontSize: 24, marginBottom: 20 }}>&quot;I build robots & apps.&quot;</h2>
                        <p style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2 }}>
                            Hardware at <span style={{ color: '#666' }}>Apple</span>. <br />
                            Everything else at <span className="marker-text">Night</span>.
                        </p>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', alignItems: 'center' }}>
                            <a href="https://linkedin.com/in/Jonsol" target="_blank" style={{ color: '#000' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" style={{ color: '#000' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            </a>
                            <a href="https://github.com/jonnysh" target="_blank" style={{ color: '#000' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" style={{ color: '#000' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <a href="mailto:jon@jonny.sh" className="scribble-text" style={{ fontSize: '16px', color: '#555', textDecoration: 'none' }}>email me</a>
                        </div>
                    </div>
                </section>

                {/* --- INTERSECTING PHOTO BELTS (The "Twist") --- */}
                <PhotoBeltTwist images={beltImages} />

                {/* --- MARQUEE --- */}
                <Marquee />

                {/* --- FOLDER TABS: EXPERIENCE --- */}
                <section id="career" className="section container">
                    <h2 className="section-title"><span className="highlight-mark">SELECT FILES</span></h2>
                    <p className="handwritten" style={{ marginTop: -5, marginLeft: 10, fontSize: 14, color: '#888', transform: 'rotate(-2deg)' }}>career outlook</p>
                    <FolderTabs />
                </section>

                {/* --- WORKBENCH & STICKERS (New Section) --- */}
                <section className="section container split-section">
                    <div className="workbench-wrapper">
                        <Workbench />
                    </div>

                    <div className="sticker-wall">
                        <div className="sticker" style={{ transform: 'rotate(-5deg)', background: '#ffcc00' }}>
                            BUILDER
                        </div>
                        <div className="sticker" style={{ transform: 'rotate(5deg)', background: '#00ccff', top: 40, left: 100 }}>
                            RAVER
                        </div>
                        <div className="sticker circular" style={{ transform: 'rotate(15deg)', background: '#ff0099', top: 100, left: 20 }}>
                            SHIPPING
                        </div>
                        <div className="torn-paper">
                            <p className="handwritten" style={{ fontSize: 14, margin: 0 }}>
                                let me tell you about it!
                                <br />
                                --{'>'} Substack
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- PROJECTS: POLAROID GRID (Photo First) --- */}
                <section id="projects" className="section container" style={{ marginTop: 80 }}>
                    <h2 className="section-title" style={{ textAlign: 'right' }}>
                        <span className="marker-text" style={{ transform: 'rotate(2deg)' }}>THE LAB</span>
                    </h2>

                    <div className="project-grid">
                        {projects.map((p, i) => (
                            <motion.a
                                href={p.link}
                                key={i}
                                className="project-polaroid"
                                style={{ '--rotate': `${p.rotate}deg` }}
                                whileHover={{ scale: 1.1, zIndex: 100, rotate: 0 }}
                                viewport={{ once: true }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="browser-frame">
                                    <div className="browser-dots"><span></span><span></span><span></span></div>
                                    <img src={p.icon} alt={p.title} className="p-icon-framed" onError={(e) => e.target.style.display = 'none'} />
                                </div>

                                <div className="polaroid-caption">{p.title}</div>
                                <div className="polaroid-doodads">{p.tag} • {p.role}</div>
                                <div className="tape top-center" style={{ opacity: 0.5 }}></div>
                                {p.sticker && (
                                    <div style={{
                                        position: 'absolute',
                                        top: -15,
                                        right: -15,
                                        background: '#ff0099',
                                        color: '#fff',
                                        padding: '4px 8px',
                                        transform: 'rotate(15deg)',
                                        border: '2px solid #000',
                                        zIndex: 20,
                                        boxShadow: '3px 3px 0 #000',
                                        fontFamily: 'Permanent Marker',
                                        fontSize: '12px'
                                    }}>
                                        {p.sticker}
                                    </div>
                                )}
                            </motion.a>
                        ))}
                    </div>
                </section>

                {/* --- NEWSLETTER RIP --- */}
                <section className="section container" style={{ marginBottom: 100 }}>
                    <a href="https://jonnysowl.substack.com/" target="_blank" className="newsletter-rip wiggle-hover">
                        <div className="rip-edge"></div>
                        <h3>READ MY MIND -{'>'}</h3>
                        <p>Engineering musings & late night thoughts.</p>
                        <div className="tape corner-tl"></div>
                    </a>
                </section>

            </main>

            <footer className="footer">
                <div className="scribble-text">Designed in Chaos. Built with joy.</div>
                <p>© {new Date().getFullYear()} Jonny.sh</p>
            </footer>

            {/* FLOATING ACTION BUTTON */}
            <a href="/resume.pdf" className="fab-resume">
                grab_my_resume.pdf
            </a>

            <style jsx>{`
        .main-wrapper { padding-top: 100px; padding-bottom: 100px; }
        
        .hero-section {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 60px;
            min-height: 60vh;
        }
        
        
        /* REVERTED ID BADGE (Original Size) */
        /* Replaced by .badge-paper-card in globals.css */
        
        .id-photo { width: 100%; border: 2px solid #000; display: block; }
        .id-photo img { width: 100%; height: auto; display: block; transition: filter 0.2s; } 
        
        .id-info h1 { 
            font-size: 24px; 
            font-weight: 800;
            line-height: 1; 
            border-bottom: 2px solid #000; 
            padding-bottom: 10px; 
            margin-bottom: 10px; 
            text-transform: uppercase;
        }
        .id-role { font-family: 'Space Grotesk'; font-weight: 700; font-size: 18px; }
        .id-barcode { font-family: 'Libre Barcode 39', cursive; font-size: 30px; letter-spacing: -2px; margin-top: auto; opacity: 0.5; }
        
        .scribble-doodle svg { width: 100px; height: 100px; }

        .hero-text-side { max-width: 400px; }
        .hero-text-side p { font-size: 24px; line-height: 1.4; }
        
        .section-title { font-size: 48px; margin-bottom: 40px; }
        
        /* EXP */
        .fi-header { display: flex; gap: 20px; align-items: center; margin-bottom: 20px; }
        
        /* STRICT LOGO CONSTRAINT */
        .constrained-logo { 
            width: 40px !important; 
            height: 40px !important; 
            min-width: 40px !important; 
            max-width: 40px !important;
            object-fit: contain; 
            background: #fff; 
            padding: 6px; 
            border: 2px solid #000; 
            border-radius: 6px; 
            box-shadow: 2px 2px 0 rgba(0,0,0,1); 
        }
        .fi-role { font-size: 32px; margin: 0; line-height: 1; }
        .fi-company { font-size: 20px; font-weight: 600; }
        .fi-list { list-style: none; padding: 0; font-size: 18px; line-height: 1.6; }
        .fi-list li::before { content: "-> "; font-weight: 700; color: var(--color-hot); }
        
        .fi-stack { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .tech-sticker { 
            background: #000; color: #fff; padding: 4px 8px; 
            font-family: 'Space Grotesk'; font-size: 12px; font-weight: 700;
            transform: rotate(-2deg);
        }
        .tech-sticker:nth-child(even) { transform: rotate(2deg); background: var(--color-electric); }

        /* WORKBENCH & STICKERS */
        .split-section { display: flex; gap: 60px; flex-wrap: wrap; justify-content: center; margin-top: 100px; }
        
        .workbench-clipboard {
            width: 300px;
            background: #fdf5e6; /* Manila folder color */
            border: 2px solid #5d4037;
            padding: 40px 20px 20px;
            position: relative;
            box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
        }
        .clip-metal {
            position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
            width: 120px; height: 30px; background: #silver;
            border-radius: 4px; border: 2px solid #555;
            background: linear-gradient(to bottom, #ddd, #999);
        }
        .wb-title { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #5d4037; padding-bottom: 10px; }
        .wb-grid { display: flex; flex-direction: column; gap: 10px; }
        .wb-item { display: flex; align-items: center; gap: 10px; font-family: 'Courier New', monospace; font-size: 16px; font-weight: 700; }
        .wb-check { color: green; }
        
        .sticker-wall {
            width: 300px; height: 300px;
            position: relative;
            border: 2px dashed #ccc;
            background: rgba(0,0,0,0.02);
            /* Corkboard / Wall texture? */
        }
        .sticker {
            position: absolute; padding: 10px 20px;
            font-weight: 900; font-family: 'Inter'; border: 2px solid #fff;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
            font-size: 18px;
            cursor: pointer; transition: transform 0.2s;
        }
        .sticker:hover { transform: scale(1.1) !important; z-index: 10; }
        
        .sticker.circular { border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-size: 12px; text-align: center; }
        
        .torn-paper {
            position: absolute; bottom: 20px; right: 20px;
            background: #fff; transform: rotate(-10deg);
            padding: 10px; box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            border-top: 2px dashed #ccc;
        }

        /* PROJECTS */
        .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); /* Smaller Cards */
            gap: 60px; /* Bigger gaps for messiness */
            padding: 40px;
        }
        
        /* BROWSER FRAME */
        .browser-frame {
            border: 2px solid #000;
            border-radius: 6px;
            overflow: hidden;
            background: #fff;
            margin-bottom: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .browser-dots {
            background: #eee; border-bottom: 2px solid #000;
            padding: 6px 8px; display: flex; gap: 6px;
        }
        .browser-dots span { width: 10px; height: 10px; border-radius: 50%; border: 1px solid #000; background: #fff; }
        .browser-dots span:nth-child(1) { background: #ff5f56; }
        .browser-dots span:nth-child(2) { background: #ffbd2e; }
        .browser-dots span:nth-child(3) { background: #27c93f; }
        
        .p-icon-framed { width: 100%; height: auto; display: block; transition: filter 0.2s; } /* No Grayscale */
        .project-polaroid:hover .p-icon-framed { }
        
        /* NEWSLETTER */
        .newsletter-rip {
            display: block; max-width: 500px; margin: 0 auto;
            background: #fff; color: #000;
            padding: 30px; border: 2px solid #000;
            position: relative; text-align: center;
            transform: rotate(1deg); transition: transform 0.2s;
        }
        .newsletter-rip:hover { transform: rotate(0deg) scale(1.02); box-shadow: 5px 5px 0 #ccff00; }
        .newsletter-rip h3 { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
        .rip-edge {
            position: absolute; top: -10px; left: 0; width: 100%; height: 30px;
            background-image: linear-gradient(45deg, transparent 50%, #fff 50%), linear-gradient(-45deg, transparent 50%, #fff 50%);
            background-size: 20px 20px;
            transform: rotate(180deg);
        }
        
        @media (max-width: 800px) {
            .hero-section { flex-direction: column; text-align: center; }
            .hero-text-side { order: -1; }
            .split-section { flex-direction: column; align-items: center; }
        }
       `}</style>
        </div>
    )
}

import { motion } from 'framer-motion';

const ArtisticBackground = () => {
    return (
        <div className="artistic-layer">
            {/* --- HANGING WIRE (Top Right) --- */}
            <svg
                className="wire-hanging"
                viewBox="0 0 200 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M100,-20 C100,100 50,150 80,300 C90,350 40,380 60,420"
                    stroke="rgba(0,0,0,0.8)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* Plug/End */}
                <motion.rect
                    x="50" y="410" width="20" height="30"
                    fill="#000"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                />
            </svg>

            {/* --- FLOOR WIRE (Bottom Left) --- */}
            <svg
                className="wire-floor"
                viewBox="0 0 500 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    d="M-50,150 C50,150 100,50 250,100 C400,150 450,50 550,100"
                    stroke="#ccff00"
                    strokeWidth="3"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "linear" }}
                />
            </svg>

            {/* --- FAINT BACKGROUND SCRIBBLE --- */}
            <svg
                className="bg-scribble"
                viewBox="0 0 1000 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100,100 Q400,50 300,300 T500,500 T800,200"
                    stroke="rgba(0,0,0,0.03)"
                    strokeWidth="50"
                    strokeLinecap="round"
                />
            </svg>

            <style jsx>{`
        .artistic-layer {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0; /* Behind content but in front of bg texture */
          overflow: hidden;
        }

        .wire-hanging {
          position: absolute;
          top: 0;
          right: 5%;
          width: 100px;
          height: 40vh;
          filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.2));
        }

        .wire-floor {
          position: absolute;
          bottom: 50px;
          left: -50px;
          width: 40vw;
          height: 200px;
          opacity: 0.6;
        }

        .bg-scribble {
          position: absolute;
          top: 20%;
          left: 10%;
          width: 80%;
          height: 80%;
        }

        @media (max-width: 768px) {
          .wire-hanging { right: -20px; width: 60px; }
          .wire-floor { width: 80vw; }
        }
      `}</style>
        </div>
    );
};

export default ArtisticBackground;

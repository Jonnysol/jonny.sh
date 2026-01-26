import React from 'react';
import HangingWire from './HangingWire';
import { motion } from 'framer-motion';

const ArtisticBackground = () => {
    return (
        <div className="artistic-layer">
            {/* --- HANGING WIRE (Top Right) --- */}
            {/* Replaced hardcoded SVG with the new dynamic component */}
            <HangingWire />

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

        /* Hanging Wire is now positioned inside its own component, 
           but we ensure the container respects layout if needed */

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
          .wire-floor { width: 80vw; }
        }
      `}</style>
        </div>
    );
};

export default ArtisticBackground;

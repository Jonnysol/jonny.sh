import { motion } from "framer-motion";

export default function HangingWire() {
    // Large Lightning Bolt Variant
    const lightningVariant = {
        hidden: { opacity: 0, pathLength: 0, scale: 0 },
        visible: (i) => ({
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.5, 1], // Much bigger sparks
            pathLength: [0, 1, 1],
            rotate: (Math.random() - 0.5) * 180, // Random rotation
            x: (Math.random() - 0.5) * 60,
            y: (Math.random() - 0.5) * 60,
            transition: {
                duration: 0.2 + Math.random() * 0.2, // Fast Zap
                repeat: Infinity,
                repeatDelay: Math.random() * 0.8,
                ease: "linear",
                delay: 2.5 + i * 0.3,
            },
        }),
    };

    return (
        <div
            className="hanging-wire-container"
            style={{
                position: 'absolute',
                top: 0,
                right: '10%',
                width: 200,
                height: 600, // Taller to accommodate bounce
                overflow: 'visible',
                zIndex: 5,
                pointerEvents: 'none'
            }}
        >
            <svg
                className="wire-hanging"
                viewBox="0 0 200 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
            >
                <motion.g
                    style={{ originX: "100px", originY: "0px" }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [3, -3, 3] }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2, // Wait for drop
                    }}
                >
                    {/* 2. EXPOSED WIRES (Moved Behind) */}
                    <motion.g
                        initial={{ opacity: 0, y: -400 }} // Follows the bundle roughly
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                            mass: 1,
                            delay: 0.5
                        }}
                    >
                        <path d="M94,450 C94,465 90,475 88,490" stroke="#ff2a2a" strokeWidth="3" fill="none" />
                        <path d="M100,450 C100,470 100,480 100,500" stroke="#2aff2a" strokeWidth="3" fill="none" />
                        <path d="M106,450 C106,465 110,475 112,490" stroke="#ffcc00" strokeWidth="3" fill="none" />
                    </motion.g>

                    {/* 1. MAIN BLUE CABLE (Bent to Straight Fall) */}
                    <motion.path
                        // Initial State: Bunched up U-shape near top
                        initial={{
                            d: "M100,0 C50,150 150,150 100,0"
                        }}
                        // Target State: Long hanging wire
                        animate={{
                            d: "M100,0 C100,200 110,300 100,450"
                        }}
                        stroke="#2b6eff"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                        transition={{
                            type: "spring",
                            stiffness: 400, // Very stiff = fast snap
                            damping: 15,    // Some oscillation at the end
                            mass: 1,        // Lighter feel for speed
                            delay: 0.5      // Wait a beat, then SNAP
                        }}
                    />

                    {/* 3. BIG LIGHTNING BOLTS (approx y=500) */}
                    <g transform="translate(100, 500)">
                        {[0, 1, 2].map((i) => (
                            <motion.path
                                key={i}
                                d="M0,0 L-10,20 L5,20 L-5,40 L15,25 L0,25 L10,5" // Jagged Bolt Shape
                                stroke="#ffff00"
                                fill="#fff"
                                strokeWidth="2"
                                custom={i}
                                variants={lightningVariant}
                                initial="hidden"
                                animate="visible"
                            />
                        ))}
                    </g>
                </motion.g>
            </svg>
        </div>
    );
}

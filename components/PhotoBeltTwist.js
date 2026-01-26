import React from 'react';
import styles from './PhotoBelt.module.css';

const MarqueeStrip = () => (
    <div className={styles.marqueeStrip}>
        <span>ROBOTICS • AUTOMATION • TYPESCRIPT • RUST • NEXT.JS • HARDWARE • SCALING • </span>
        <span>ROBOTICS • AUTOMATION • TYPESCRIPT • RUST • NEXT.JS • HARDWARE • SCALING • </span>
    </div>
);

const PhotoBeltTwist = ({ images = [] }) => {
    // If no images, provide default or empty to prevent crash
    const safeImages = images.length > 0 ? images : [];

    // Split images into two rows for the twist effect
    const midPoint = Math.ceil(safeImages.length / 2);
    const row1 = safeImages.slice(0, midPoint);
    const row2 = safeImages.slice(midPoint);

    // Duplicate logic for infinite scroll illusion (concat)
    const track1 = [...row1, ...row1, ...row1]; // 3x for safety
    const track2 = [...row2, ...row2, ...row2];

    return (
        <div className={styles.twistWrapper}>
            {/* Belt 1: Top Layer (Acid Green) */}
            <div className={`${styles.belt} ${styles.beltOne}`}>
                <div className={styles.track}>
                    {track1.map((src, i) => (
                        <div className={styles.card} key={`r1-${i}`}>
                            <img src={src} alt="Project" onError={(e) => e.target.style.background = '#ccc'} />
                        </div>
                    ))}
                </div>
            </div>

            {/* MID LAYER: The Marquee (Sandwiched) */}
            <div className={styles.marqueeLayer}>
                <MarqueeStrip />
            </div>

            {/* Belt 2: Bottom Layer (Steeper, Black) */}
            <div className={`${styles.belt} ${styles.beltTwo}`}>
                <div className={styles.trackReverse}>
                    {track2.map((src, i) => (
                        <div className={`${styles.card} ${styles.cardAlt}`} key={`r2-${i}`}>
                            <img src={src} alt="Project" onError={(e) => e.target.style.background = '#333'} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Shadow Overlay for Depth */}
            <div className={styles.shadowOverlay}></div>
        </div>
    );
};

export default PhotoBeltTwist;

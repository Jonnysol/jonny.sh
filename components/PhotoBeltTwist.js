import React from 'react';
import styles from './PhotoBelt.module.css';

const MarqueeStrip = () => (
    <div className={styles.marqueeStrip}>
        <span>ROBOTICS • AUTOMATION • ANSIBLE • KUBERNETES • BASH • HARDWARE • SCALING • PYTHON • COMPUTER VISION • SLAM • ROS • </span>
        <span>ROBOTICS • AUTOMATION • ANSIBLE • KUBERNETES • BASH • HARDWARE • SCALING • PYTHON • COMPUTER VISION • SLAM • ROS • </span>
    </div>
);

const PhotoBeltTwist = ({ images = [] }) => {
    // Shuffle images to randomize placement
    const shuffledImages = React.useMemo(() => {
        const arr = [...images];
        // Fisher-Yates shuffle
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }, [images]);

    // If no images, provide default or empty to prevent crash
    const safeImages = shuffledImages.length > 0 ? shuffledImages : [];

    // Both rows get ALL images, but Row 2 is reversed (starts from end)
    const row1 = safeImages;
    const row2 = [...safeImages].reverse();

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

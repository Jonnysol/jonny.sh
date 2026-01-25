import React from 'react';
import styles from './PhotoBelt.module.css';

const imagesRow1 = [
    '/assets/img/belt/photos1.jpeg',
    '/assets/img/belt/photos2.jpeg',
    '/assets/img/belt/photos3.jpeg',
    '/assets/img/belt/photos4.jpeg',
    '/assets/img/photo1.jpg',
    '/assets/img/photo2.jpg',
];

const imagesRow2 = [
    '/assets/img/belt/photos5.jpeg',
    '/assets/img/belt/photos6.jpeg',
    '/assets/img/belt/photos7.jpeg',
    '/assets/img/belt/photos8.jpeg',
    '/assets/img/photo3.jpg',
    '/assets/img/photo4.jpg',
];

const MarqueeStrip = () => (
    <div className={styles.marqueeStrip}>
        <span>ROBOTICS • AUTOMATION • TYPESCRIPT • RUST • NEXT.JS • HARDWARE • ROLLER COASTER • </span>
        <span>ROBOTICS • AUTOMATION • TYPESCRIPT • RUST • NEXT.JS • HARDWARE • ROLLER COASTER • </span>
    </div>
);

const PhotoBeltTwist = () => {
    return (
        <div className={styles.twistWrapper}>
            {/* Belt 1: Top Layer (Acid Green) */}
            <div className={`${styles.belt} ${styles.beltOne}`}>
                <div className={styles.track}>
                    {imagesRow1.concat(imagesRow1).map((src, i) => (
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
                    {imagesRow2.concat(imagesRow2).map((src, i) => (
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

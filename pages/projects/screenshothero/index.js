import Head from 'next/head';
import NavBar from '../../../components/NavBar';

export default function ScreenshotHero() {
    return (
        <div className="main-wrapper">
            <Head>
                <title>Screenshot Hero</title>
                <meta name="description" content="Screenshot Hero scans through your screenshots (and other saved photos) and makes them instantly searchable by text in them." />
            </Head>

            <NavBar />

            <main className="container" style={{ padding: "100px 30px" }}>
                <img src="/assets/projects/screenshothero/icon.png" width="100" style={{ borderRadius: "20px", marginBottom: "30px", border: "2px solid #000" }} />

                <h1>Screenshot Hero</h1>
                <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "800px" }}>
                    Screenshot Hero scans through your screenshots (and other saved photos) and makes them instantly searchable by text in them.
                </p>

                <div style={{ margin: "40px 0" }}>
                    <video style={{ maxHeight: "500px", border: "2px solid #000", maxWidth: "100%", boxShadow: "6px 6px 0px #000" }} controls autoPlay loop muted>
                        <source src="/assets/projects/screenshothero/preview.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <h3>Highlights</h3>
                <ul className="project-list">
                    <li>Images are all processed <strong>on-device</strong> and nothing is sent to any server.</li>
                    <li>Tested to work with <strong>thousands of images</strong>.</li>
                    <li>Best and most <strong>performant OCR technology</strong>.</li>
                </ul>

                <a href="https://apps.apple.com/us/app/screenshot-hero/id1493170794?ls=1" target="_blank" rel="noopener noreferrer">
                    <img style={{ margin: "20px 0" }} width="150" src="/assets/projects/screenshothero/badge.png" alt="Download on App Store" />
                </a>

                <hr style={{ margin: "40px 0", border: "1px solid #ccc" }} />

                <h2>Technical Details</h2>

                <p>I wanted to build a simple utility app that would run OCR through my photos (all 5000+ of them) and make them searchable. I had following constraints for it:</p>

                <ul className="project-list">
                    <li>It has to be <strong>fast</strong>. The UI needs to be fluid even for thousands of images.</li>
                    <li>All processing should happen <strong>on-device</strong>, should not be uploading photos to a cloud service.</li>
                    <li>I need to <strong>make it quick</strong> (I only had a week allocated for this project).</li>
                </ul>

                <p>I am primarily a web developer and am not a skilled mobile developer. So I attempted this project with three different frameworks and here are my notes:</p>

                <h3>SwiftUI</h3>
                <p>SwiftUI is appealing as it&apos;s a React-like framework. I wanted to learn SwiftUI but I struggled with the documentation and even writing a simple grid of photos was challenging. The community is tiny so there aren&apos;t that many samples online either. I really wanted to use this but it was taking a bit too much of my time. Sadly, I had to ditch SwiftUI.</p>

                <h3>Expo.io</h3>
                <p>Expo is a React Native framework which bypasses the whole Android SDK + XCode step of making the app. It&apos;s very easy to get started and the dev experience is great. Having written a React Native app before, I really wanted this to work. The only problem occured when I wanted to write the OCR part: <code>expo eject</code> workflow is kinda broken. In my case, the <code>CameraRoll</code> API broke due to some unlinked native module when I tried to run it via XCode after ejecting the app. I spent a few hours fixing the native modules but that didn&apos;t work.</p>

                <p>Without ejecting, I could have gone with <a href="https://github.com/naptha/tesseract.js#tesseractjs">Tesseract.js</a> but it&apos;s not fast enough to process thousands of images quickly.</p>

                <p>There also isn&apos;t a way to do background processing with Expo. I feel expo is great for simple CRUD apps for now and will fail you if your app needs a custom functionality.</p>

                <h3>React Native</h3>

                <p>In the end, I had to fallback to what I already knew. I copied views which I had created earlier for expo.io into a new ReactNative project. I then created a custom Swift native module which had all my business logic:</p>
                <ul className="project-list">
                    <li>Methods to fetch all photos and process newer ones.</li>
                    <li>Queue to process only N photos concurrently.</li>
                    <li>Storage Model, went with <a href="https://github.com/Tencent/MMKV">MKKV</a> as it was quick to set up.</li>
                    <li>OCR, used Apple&apos;s <a href="https://developer.apple.com/documentation/vision">Vision API</a> which is surprisingly accurate and fastest on-device.</li>
                    <li>Set up <a href="https://developer.apple.com/documentation/backgroundtasks">BackgroundTasks</a> to schedule photo processing for later, when the app is sent to background mid-processing (remember we may have 10,000+ photos in our queue, each photo takes ~1s to process).</li>
                </ul>

                <h2>Conclusion</h2>

                <p>I learned that React Native is fast enough if used only for views (and maybe lightweight logic) only. I used <code>FlatList</code> for the grid photo view (with some optimizations to lazy load photos) and it is very smooth even for thousands of photos. Real-time searching/filtering is also really smooth. React Native also has great community support.</p>

                <p>This means writing more backend code per platform, which sucks but is straight-forward. It&apos;s still better than writing front-end for each platform and dealing with all the quirks of each of them.</p>

                <p>Try Screenshot Hero <a href="https://apps.apple.com/us/app/screenshot-hero/id1493170794?ls=1">here</a>.</p>
            </main>

            <style jsx>{`
        .main-wrapper {
          padding-top: var(--nav-height);
        }
        h1 { font-size: 48px; margin-bottom: 20px; }
        h2 { margin-top: 40px; margin-bottom: 20px; font-size: 32px; }
        h3 { margin-top: 30px; margin-bottom: 15px; font-size: 24px; }
        p { margin-bottom: 20px; line-height: 1.6; color: var(--text-secondary); }
        .project-list { list-style: square; padding-left: 20px; margin-bottom: 20px; }
        .project-list li { margin-bottom: 10px; line-height: 1.5; }
        a { color: var(--color-electric); text-decoration: underline; }
      `}</style>
        </div>
    );
}

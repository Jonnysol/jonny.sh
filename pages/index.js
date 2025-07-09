import HeadComponent from "../components/head"; // Renamed to avoid conflict
import dynamic from 'next/dynamic';

// Dynamically import PhotoBelt with SSR turned off
const PhotoBelt = dynamic(() => import("../components/PhotoBelt"), {
  ssr: false,
  // loading: () => <p>Loading photo belt...</p> // Optional loading state
});


export default function Home() {
  return (
    <>
    <HeadComponent 
      title="Home"
    />

    <div className="page-content-section">
      <div className="profile-picture">
        <img src="/photo.jpg" alt="Jonathan Solomon" className="circle-image" loading="eager" />
      </div>
      <h1>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Hi, I'm Jonathan! 
      </h1>
      <h2>I build infrastructure and IoT</h2>
      <h3 style={{ marginTop: "0.5rem" }}>You may know me from:</h3>
      <ul id="homepage-projects">
        <li>Infrastructure Engineer at <a href="https://apple.com/" target="_blank" className="project-link"><img src="/assets/img/icons/apple.png" />Apple Vision Products Group</a>.
          <br />Building ground-up infrastructure for high-throughput hardware test labs with 150+ robotic fixtures for Apple Vision Pro.
        </li>
        <li>Founder of <a href="https://dcesk8.com" target="_blank" className="project-link"><img src="/assets/img/icons/dcesk8.png" />DC Electric Skateboarding</a>.
          <br />Built community platform from 0 to 3,200+ members in Washington DC area.
          <br />Developed charge map API and event management systems.
        </li>
        <li>IT Field Technician at <a href="https://www.verizon.com" target="_blank" className="project-link"><img src="/assets/img/icons/verizon.png" />Verizon</a> (HelloTech).
          <br />Specialized in IoT sensor configuration and smart home network design.
        </li>
        <li>SkillsUSA <a href="#" className="project-link">National Gold Medalist 2023</a> - IoT Smart Home Networks.
          <br />Recognized by U.S. Senator Mark Warner for technical excellence.
        </li>
      </ul>
    </div>
    <PhotoBelt />
    <div className="page-content-section">
      <ul id="homepage-projects"> 
        <li>Creator of
          <ul>
            <li><a href="https://github.com/Jonnysol/Amharic-AI-Voice-Chatbot" target="_blank" className="project-link"><img src="/assets/img/icons/codecaptcha.png" />Amharic AI Voice Chatbot</a> – First-ever Amharic AI conversational multimodal bot for transcription and conversation.</li>
            <li><a href="https://github.com/Jonnysol/DCchargeMap" target="_blank" className="project-link"><img src="/assets/img/icons/screenshothero.png" />DC Charge Map</a> – Real-time charge station locator for DC electric skateboard community using Google Maps API.</li>
            <li><a href="https://github.com/Jonnysol/DCESK8" target="_blank" className="project-link"><img src="/assets/img/icons/zero.png" />DCESK8 Platform</a> – Community management system with member API, event logistics, and ride tracking using AWS IoT Core.</li>
            <li><a href="#" className="project-link"><img src="/assets/img/icons/coco.png" />AR Dynamic Projection Mapping</a> – Research project investigating ArUco marker tracking, structured light calibration, and real-time object tracking with Coral Edge TPU.</li>
            <li><a href="#" className="project-link"><img src="/assets/img/icons/doublerecorder.png" />Electric Drivetrain Research</a> – C++ and JEF-based software for optimizing electric motor and battery performance in EVs (2019-2022).</li>
            <li><a href="#" className="project-link"><img src="/assets/img/icons/allmydesktops.png" />Ukraine Logistics Software</a> – UNICEF volunteer project using C# to optimize donation delivery and integrate humanitarian aid data sources.</li>
            <li><a href="https://github.com/Jonnysol/fast-image-generator" target="_blank" className="project-link"><img src="/assets/img/icons/urduscript.png" />Fast Image Generator</a> – High-performance image generation tool optimized for speed and efficiency.</li>
            <li><a href="https://github.com/Jonnysol/faux-ai-joke-generator" target="_blank" className="project-link"><img src="/assets/img/icons/recordscreen.png" />Faux AI Joke Generator</a> – AI-powered humor generation system with natural language processing.</li>
            <li><a className="project-link" href="/projects">See all projects</a></li>
          </ul>
        </li>
      </ul>
    </div>
    </>
  )
}

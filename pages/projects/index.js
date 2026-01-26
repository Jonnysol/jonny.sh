import Head from "../../components/head";
import Link from 'next/link'

export const config = {
  unstable_runtimeJS: false
};

export default function Projects() {
  return (
    <>
      <Head 
        title="Home"
      />
      <ul className="projectlist">
        <li>
          <h4><Link href="https://github.com/Jonnysol/DCESK8">DC Electric Skateboarding Platform</Link> [<Link href="https://dcesk8.com">Website</Link>]</h4>
          <p>Founded and built a community platform that grew from 0 to 3,200+ active members in the Washington DC area. Developed member API using ngrok, integrated AWS EC2 and IoT Core for ride tracking, and created event management systems. Organized weekly events and educational sessions on BLDC motors and battery technology.</p>
        </li>
        <li>
          <h4><Link href="https://github.com/Jonnysol/DCchargeMap">DC Charge Map</Link></h4>
          <p>Real-time charge station locator for the DC electric skateboard community. Built using Google Maps API and Open Charge Map integration with JavaScript. Provides accurate, up-to-date charging location data for members across the DC metropolitan area.</p>
        </li>
        <li>
          <h4><Link href="https://github.com/Jonnysol/Amharic-AI-Voice-Chatbot">Amharic AI Voice Chatbot</Link></h4>
          <p>The first-ever Amharic AI conversational multimodal bot designed to transcribe and facilitate conversations in Amharic. Leverages advanced natural language processing and voice recognition technologies to bridge language barriers.</p>
        </li>
        <li>
          <h4>AR Dynamic Projection Mapping Device</h4>
          <p>Research project investigating ArUco marker tracking, structured light calibration, and stereo calibration for real-time object tracking. Applied AI/ML computer vision concepts using Coral Edge TPU for high-FPS image processing, depth estimation, and perspective transformation. Implemented 2D projection mapping with LLMs for interactive AR classrooms.</p>
        </li>
        <li>
          <h4>Electric Drivetrain Battery Research</h4>
          <p>Conducted comprehensive research on electric motors and batteries for electric vehicles (2019-2022). Developed optimization software using C++ and JEF to enhance performance characteristics of electric drivetrains, focusing on efficiency and power management systems.</p>
        </li>
        <li>
          <h4>Ukraine Donation Logistics Software</h4>
          <p>UNICEF volunteer project developing logistics software using C# to optimize donation delivery and integrate multiple data sources for humanitarian aid efforts in Ukraine. Created scalable platform to streamline aid distribution and ensure resources reach those in need efficiently.</p>
        </li>
        <li>
          <h4><Link href="https://github.com/Jonnysol/fast-image-generator">Fast Image Generator</Link></h4>
          <p>High-performance image generation tool optimized for speed and efficiency. Built to handle large-scale image processing tasks with minimal latency and maximum throughput.</p>
        </li>
        <li>
          <h4><Link href="https://github.com/Jonnysol/faux-ai-joke-generator">Faux AI Joke Generator</Link></h4>
          <p>AI-powered humor generation system utilizing natural language processing to create contextually relevant jokes. Demonstrates machine learning applications in creative content generation.</p>
        </li>
        <li>
          <h4><Link href="https://github.com/Jonnysol/ADHD-AHK-Dynamic-Hotkeys-for-Dummies">ADHD AutoHotkey Dynamic Hotkeys</Link></h4>
          <p>AutoHotkey library for creating GUI scripts with user-configurable, persistent settings. Designed to improve productivity and accessibility for users with ADHD through customizable automation tools.</p>
        </li>
        <li>
          <h4><Link href="https://github.com/Jonnysol/adhd-assistant">ADHD Assistant</Link></h4>
          <p>A comprehensive vision for an ADHD assistant application that includes a chat bot and task management features. Designed to help users with ADHD manage their daily tasks and improve focus through intelligent assistance.</p>
        </li>
        <li>
          <h4><Link href="https://github.com/Jonnysol/ai-voice-assistant-with-microsoft-azure-openai">AI Voice Assistant with Microsoft Azure OpenAI</Link></h4>
          <p>Voice-activated AI assistant built using Microsoft Azure OpenAI services. Integrates speech recognition, natural language processing, and text-to-speech capabilities for seamless voice interactions.</p>
        </li>
        <li>
          <h4>Apple Vision Pro Test Infrastructure</h4>
          <p>As Infrastructure Engineer at Apple Vision Products Group, spearheaded ground-up build-out of high-throughput hardware test labs with 150+ robotic fixtures. Engineered Python-based automation pipelines using asynchronous SSH and internal APIs, developed fleet management tools, and implemented automated recovery systems for device testing.</p>
        </li>
      </ul>


    </>
  )
}

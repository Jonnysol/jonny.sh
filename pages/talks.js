import Head from "../components/head";
import Link from 'next/link'

export const config = {
  unstable_runtimeJS: false
};

export default function Talks() {
  return (
    <>
      <Head
        title="Talks"
      />
      <ul className="projectlist">
        <li>
          <h4>SkillsUSA National Gold Medalist - IoT Smart Home Networks (2023)</h4>
          <p>Achieved national gold medal recognition in IoT and Edge Computing, demonstrating expertise in smart home network design, sensor integration, and edge computing solutions. Recognized by U.S. Senator Mark Warner (D-VA) for technical excellence.</p>
        </li>
        <li>
          <h4>Physics Congress - Electric Mobility Research Exhibition (2022)</h4>
          <p>Presented research on electric mobility solutions and sustainable transportation technology. Received honorable mention for technical research exhibition focusing on electric drivetrain optimization and battery management systems.</p>
        </li>
        <li>
          <h4>NVCC Campus Events - STEM Campaign Leadership</h4>
          <p>As Campus Events coordinator, created captivating engineering and STEM campaigns that successfully promoted campus-wide events and initiatives. Led technology implementation including Student CRMs, Event AV systems, and automated marketing solutions.</p>
        </li>
        <li>
          <h4>Society of Physics Students - Presidential Leadership (2021-2023)</h4>
          <p>As President of SPS/NOVASytemic, motivated 1000+ students to innovate, create, and lead. Organized the largest college-wide hackathon and led intercollegiate teams to win gold at national championships. Focused on inspiring students to see the joy in engineering and creating solutions for people.</p>
        </li>
        <li>
          <h4>White House Young Leaders Summit</h4>
          <p>Honored to participate in the Presidential Young Leaders Summit at The White House, representing excellence in STEM education and community leadership.</p>
        </li>
        <li>
          <h4>American Institute of Physics - Physcon Award</h4>
          <p>Received recognition from the American Institute of Physics for contributions to electric mobility research and sustainable transportation solutions.</p>
        </li>
      </ul>
    </>
  )
}

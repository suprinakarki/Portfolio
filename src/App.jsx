import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import { About, Skills, Projects, Education } from './sections/Content';
import Contact from './sections/Contact';
export default function App() { return <MotionConfig reducedMotion="user"><a href="#main" className="skip-link">Skip to content</a><Navbar/><main id="main" tabIndex={-1}><Hero/><About/><Skills/><Projects/><Education/><Contact/></main></MotionConfig>; }

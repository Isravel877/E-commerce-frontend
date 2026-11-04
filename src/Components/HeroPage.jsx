import './HeroPage.css'
import HeroBg from '../assets/HeroPage.jpg'



export function Hero() {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
    <div>

        <button className='btn'>Explore Now →</button>
      </div>
    </section>
  );
}
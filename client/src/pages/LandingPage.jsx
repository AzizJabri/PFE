
import '../App.css';
import Nav from '@/components/Nav';
import Hero from '@/components/hero';
import Statics from '@/components/statics';
import Category from '@/components/Category';
import Footer from '@/components/Footer';
import LandingNav from '@/components/LandingNav';
function LandingPage() {
  return (
  <>
 <LandingNav/>
 <br></br>
 <br></br>
 <br></br>
<Hero/>
<br></br>
 <br></br>
<Statics/>
<Category/>

<Footer/>
</>
  );
}

export default LandingPage;
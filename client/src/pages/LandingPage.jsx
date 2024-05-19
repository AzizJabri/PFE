
import '../App.css';
import Nav from '@/components/Nav';
import Hero from '@/components/hero';
import Statics from '@/components/statics';
import Category from '@/components/Category';
import Footer from '@/components/Footer';
import LandingNav from '@/components/LandingNav';
import { Link } from 'react-router-dom';
function LandingPage() {
  return (
  <>
 <LandingNav/>
 <div className="drawer">
    <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      <br></br>
      <br></br>
      <br></br>
      <Hero/>
      <br></br>
      <br></br>
      <Statics/>
      <Category/>
      <Footer/>
    </div>
    <div className="drawer-side">
      <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <Link to={"/"} className="btn btn-ghost text-xl my-6">E-Commerce</Link>
        <li>
          <Link to={"/products"} className="btn btn-ghost w-full text-left bg-base-100">Products</Link>
        </li>
      </ul>
      
    </div>
</div>

          
</>
  );
}

export default LandingPage;
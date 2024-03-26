import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom'; // Import Link
import HomeAdmin from './HomeForAdmin';

function MainAdmin() {
  return (
    <>
      <Nav />
      <HomeAdmin />
      <Footer />
    </>
   
  );
}

export default MainAdmin;

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}

export default Layout;
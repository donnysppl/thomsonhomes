import Header from './component/Header';
import Footer from './component/Footer';
import Errorgif from './assets/img/error.gif'
import { Link } from 'react-router-dom';

export default function Error() {

  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="error-parent-div text-center">
                <img src={Errorgif} alt="error" className='img-fluid' />
                <h2>The page you were looking for doesn't exist.</h2>
                <button className='frontweb-button' >
                  <Link className='text-white' to={'/'}>Home</Link>
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

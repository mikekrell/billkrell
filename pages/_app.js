import Link from 'next/link'
import Head from 'next/head'
import '../public/globals.css'
import "toastify-js/src/toastify.css"
import 'bulma'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
import useWindowSize from '../hooks/use-window-size';

import {useState} from 'react'


function MyApp({ Component, pageProps }) {
  const size = useWindowSize();
  const [menu, setMenu] = useState(false)
  const setHamburgerMenu = () => {
    setMenu(!menu)
  }

  return (
    <>
    <Head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    </Head>

      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img alt="nav-logo" src="Feenaughty_360x.webp" className="image is-16x9" ></img>
          </a>
          <a role="button" onClick={setHamburgerMenu} className={menu ? "navbar-burger burger is-active" : "navbar-burger burger" } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span ></span>
            <span ></span>
            <span ></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={menu ? "navbar-menu is-active" : "navbar-menu"} >
          <div className="navbar-start">

            <Link href="/used" as="/used">
              <a className="navbar-item">Used Inventory</a>
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <h2 className="subtitle"><strong className="has-text-success">Bill Krell:</strong> (503)956-3956</h2>
            </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
      <div className="container is-full">
        <div className="column is-centered">
          <a href="tel:+15039563956">
          <button className={size.width > 374 ? "button fab fab-is-desktop fab-shadow is-rounded is-success" : "button fab fab-shadow is-rounded is-success"}>
            <span>
              <figure className="image is-48x48 noheight">
                <img className="is-rounded" src="https://media-exp1.licdn.com/dms/image/C5603AQH_6_OPXQjhfQ/profile-displayphoto-shrink_400_400/0?e=1605744000&v=beta&t=_tgK9cTp2iI2pwszZ16GTluy0PbktUrhNAj9MTGF7s4"/>
              </figure>
              </span>
            {/* <span class="icon">
              <FontAwesomeIcon className="icon is-small" icon={faPhone}></FontAwesomeIcon>
            </span> */}
              <span className="subtitle has-text-white has-text-weight-bold" style={{ "marginLeft": "10px", "marginRight": "10px" }}>(503)956-3956</span>
          </button>
          </a>
        </div>
      </div>

    </>
  )
}

export default MyApp

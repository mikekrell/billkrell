import Link from 'next/link'
import Head from 'next/head'
import '../public/globals.css'
import "toastify-js/src/toastify.css"
import 'bulma'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
import {useState} from 'react'


function MyApp({ Component, pageProps }) {
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
      {/* <Subscribe></Subscribe> */}
      <footer class="footer is-fullwidth has-background-black" style={{"position": "fixed"}}>
        <div class="content has-text-centered">
          <p>
            <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
        </div>
      </footer>
    </>
  )
}

export default MyApp

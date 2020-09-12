import Link from 'next/link'
import Head from 'next/head'
import '../public/globals.css'
import "toastify-js/src/toastify.css"
import 'bulma'
import {useState} from 'react'
import Subscribe from "../components/Subscribe"

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
              <h2 className="subtitle"><strong className="has-text-success">Bill Krell:</strong> (503)849-8414</h2>
            </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
      {/* <Subscribe></Subscribe> */}

    </>
  )
}

export default MyApp

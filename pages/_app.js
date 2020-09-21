import Link from 'next/link'
import Head from 'next/head'
import '../public/globals.css'
import "toastify-js/src/toastify.css"
import 'bulma'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
import useWindowSize from '../hooks/use-window-size';
import { Animated } from "react-animated-css";
import {useState, useEffect} from 'react'


function MyApp({ Component, pageProps }) {
  const size = useWindowSize();
  const [menu, setMenu] = useState(false)
  const [int, setInt] = useState(false)
  const setHamburgerMenu = () => {
    setMenu(!menu)
  }


  useEffect(()=>{
    setInterval(()=>{
      setInt(true)
      setTimeout(()=>{
        setInt(false)
      },1000)
    }, 8000)
  }, [])

  return (
    <>
    <Head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
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
            <button className={int ? "button fab fab-active fab-shadow is-rounded has-background-success-dark" : "button fab fab-shadow is-rounded has-background-success-dark"}>
            <span>
              <figure className="image is-48x48 noheight">
                <img className="is-rounded" src="https://media-exp1.licdn.com/dms/image/C5603AQH_6_OPXQjhfQ/profile-displayphoto-shrink_400_400/0?e=1605744000&v=beta&t=_tgK9cTp2iI2pwszZ16GTluy0PbktUrhNAj9MTGF7s4"/>
              </figure>
              </span>

              <span className="subtitle has-text-white has-text-weight-bold" style={{ "marginLeft": "10px", "marginRight": "10px" }}>(503)956-3956</span>
          </button>
          </a>
        </div>
      </div>

    </>
  )
}

export default MyApp

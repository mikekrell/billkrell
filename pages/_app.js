import Link from 'next/link'
import Head from 'next/head'
import '../public/globals.css'
import "toastify-js/src/toastify.css"
import 'bulma'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
import useWindowSize from '../hooks/use-window-size';
import {useScroll} from '../hooks/useScroll'
import {useState, useEffect} from 'react'
import Subscribe from '../components/Subscribe'


function MyApp({ Component, pageProps }) {
  const size = useWindowSize();
  let scroll = null;
  if (typeof window !== 'undefined') {
    scroll = useScroll();
  }
  const [menu, setMenu] = useState(false)
  const [int, setInt] = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(()=>{
    setInterval(()=>{
      setInt(true)
      setTimeout(()=>{
        setInt(false)
      },1000)
    }, 8000)
  }, [])

  useEffect(()=>{
    if (typeof window !== 'undefined') {
      if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
        setAtBottom(true)
      } else {
        setAtBottom(false)
      }
    }
  }, [scroll?.scrollY])

  return (
    <>
    <Head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
    </Head>

      <nav className="navbar is-fixed-top has-background-light"  role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu" >
          <div className="navbar-brand">
            <a className="navbar-item ml-5">
              <img alt="nav-logo" src="/billkrell_logo.png" className="image"></img>
            </a>
          </div>
          <div className="navbar-start">

          </div>
          <div className="navbar-end">
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
      <div className="container is-full">
        <div className="column is-centered">
          {atBottom ? null : 
          <a href="tel:+15039563956">
            <button className={int ? "button fab fab-active fab-shadow is-rounded has-background-success-dark" : "button fab fab-shadow is-rounded has-background-success-dark"}>
              <span>
                <figure className="image is-48x48 noheight">
                  <img className="is-rounded" src="https://media-exp1.licdn.com/dms/image/C5603AQH_6_OPXQjhfQ/profile-displayphoto-shrink_400_400/0?e=1605744000&v=beta&t=_tgK9cTp2iI2pwszZ16GTluy0PbktUrhNAj9MTGF7s4" />
                </figure>
              </span>

              <span className="subtitle has-text-white has-text-weight-bold" style={{ "marginLeft": "10px", "marginRight": "10px" }}>(503)956-3956</span>
            </button>
          </a>}
        </div>
      </div>

      <Subscribe></Subscribe>
    </>
  )
}

export default MyApp

import Head from 'next/head'
import Link from 'next/link'
import '../public/globals.css'
import "toastify-js/src/toastify.css"
import 'bulma'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
import useWindowSize from '../hooks/use-window-size';
import {useScroll} from '../hooks/useScroll'
import {useState, useEffect, useRef} from 'react'
import Subscribe from '../components/Subscribe'
import Router from 'next/router'
import Modal from 'react-modal';
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const emailInput = useRef(null)
  const size = useWindowSize();
  let scroll = null;
  if (typeof window !== 'undefined') {
    scroll = useScroll();
  }
  const [menu, setMenu] = useState(false)
  const [int, setInt] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const [loading, setLoading] = useState(false);
  const [payWall, setPayWall] = useState(false);

  // useEffect(() => {
  //   const start = () => {
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     setLoading(false);
  //   };
  //     Router.events.on("routeChangeStart", start);
  //     Router.events.on("routeChangeComplete", end);
  //     Router.events.on("routeChangeError", end);
  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   }

  // })

  useEffect(()=>{

    document.addEventListener('keydown', (e)=>{
      console.log(e.key)
    })
    //start for animation paywall
    if (!!router.query.rel) {
      setTimeout(() => {
        setPayWall(true)
      }, 3500)
    }

    //set pulse of button (setInterval keeps pulse, setTimeout sets delay)
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

  const subscriptionEvent = async () => {
    fetch('/api/subscribe', { method: "PUT", body: JSON.stringify({ email: emailInput.current.value }) }).then(data => {
      setPayWall(false)
    })
  }

  
  return (
    <>
    <Head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PJSCN7S')
                `,
          }}
        />
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJSCN7S" height="0" width="0" style="display:none;visibility:hidden;"></iframe>` }} />
    </Head>
      {payWall ? 
      <div className="newsetter-signup">
          <div className="card">
            <div className="card-content">
              <section className="section has-background-dark">
                <div className="columns">
                  <div className="column">
                    <div className="title has-text-centered ">
                      <h2 className="has-text-white">Subscribe to the Newsletter!</h2>
                      <p className="subtitle has-text-white pt-1">Stay up to date with all our inventory as we receive it.</p>
                    </div>

                      <div className="field is-grouped">
                        <p className="control is-expanded">
                        <input ref={emailInput} className="input" type="email" placeholder="Enter your email" />
                        </p>
                      </div>

                  </div>
                </div>
              </section>
            </div>
            <footer className="card-footer">
              <p onClick={() => setPayWall(false)}className="card-footer-item footer-button">
                <span>
                  Not right now
                </span>
              </p>
              <p onClick={subscriptionEvent} className="card-footer-item has-background-success-dark has-text-white footer-button">
                <span>
                  Subscribe
                </span>
              </p>
            </footer>
          </div>
      </div> : null }
      <nav className="navbar is-fixed-top has-background-light container is-flex iis-align-items-center is-justify-content-space-between"  role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item">
              <Link href="/">
              <a>
                <img alt="nav-logo" src="/billkrell_logo.png" height="50px" className="image"></img>
              </a>
              </Link>
            </a>
          </div>
          <div className="is-flex">
            <div className="navbar-start is-flex ml-5" style={{ alignItems: 'center', justifyContent: 'center' }}>
              <div className="ml-6 is-size-5 is-bold is-uppercase"><Link href="/"><a className="has-text-success">Used Inventory</a></Link></div>
              <div className="ml-4 mr-2">|</div>
              <div className="ml-3 is-size-5 is-bold is-uppercase "><Link href="/blog"><a className="has-text-success">Blog</a></Link></div>
            </div>
            <div className="navbar-end">
            </div>
          </div>
      </nav>
      <Component loading={loading} {...pageProps} />
      <div className="container is-full">
        <div className="column is-centered">
          {atBottom ? null : 
          <a href="tel:+15039563956">
            <button className={int ? "button fab fab-active fab-shadow is-rounded has-background-success-dark" : "button fab fab-shadow is-rounded has-background-success-dark"}>
              <span>
                <figure className="image is-48x48 noheight">
                    <img className="is-rounded" src="/billkrell_headshot.jpeg" />
                </figure>
              </span>
              <span className="subtitle has-text-white has-text-weight-bold" style={{ "marginLeft": "10px", "marginRight": "10px" }}>(503)956-3956</span>
            </button>
          </a>}
        </div>
      </div>
    </>
  )
}

export default MyApp

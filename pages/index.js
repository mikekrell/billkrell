import Head from 'next/head'
import Link from 'next/link'
import useRouter from 'next/router'
import useSwr from 'swr'
import Modal from '../components/Modal'
import React, { useState } from 'react';

// Home.getInitialProps = ctx => {
//   // We check for ctx.res to make sure we're on the server.
//   if (ctx.res) {
//     ctx.res.writeHead(302, { Location: '/used' });
//     ctx.res.end();
//   }
//   return {};
// }

export default function Home() {

  const [ modal, setOpenModal ] = useState(false);
  const openModal = () => setOpenModal(true)
  const closeModal = () => setOpenModal(false)

  return (
    <>
    <script src="https://kit.fontawesome.com/4fedb228b0.js" crossOrigin="anonymous"></script>
      <Head>
        <title>Bill Krell - Feenaughty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal isOpen={modal} closeModal={closeModal}></Modal>
      <section className="hero mt-2 has-background-light">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column pl-2">
                <img src="pngkit_machinery-png_3405560.png"></img>
              </div>
              <div className="column pr-4">
                <h1 className="title mt-6">
                  Let me help find what you are looking for!
                </h1>
                <h2 className="subtitle mt-2">
                  All you need to do is let me know.
                </h2>
                <p>
                  You can view our used inventory, or contact me directy to talk about getting you into a NEW machine. Its easier than you might think, lots of ways to help. Clicking "Contact Me" will call my phone directy, available whenever you need me.
                </p>
                <p className="buttons mt-6 is-pulled-right mr-5">
                  <Link as="/used" href="/used">
                    <button className="button is-md">
                      View Used Inventory</button>
                  </Link>
                  <button className="button is-md has-background-warning" onClick={openModal}>
                    Contact Me
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

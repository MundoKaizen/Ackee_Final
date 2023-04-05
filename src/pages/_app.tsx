import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import React from "react";
import Home from 'pages';


require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    maxWidth: "75%",
    maxHeight: "75%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
  }
};


const App: FC<AppProps> = ({ Component, pageProps }) => {

  const [showModal, toggleModal] = React.useState(false);


    return (
        <>
          <Head>
            <title>Micro Solana</title>
          </Head>

          <ContextProvider>
            <Modal
              isOpen={showModal}
              onRequestClose={() => toggleModal(false)}
              style={customStyles}
              contentLabel="How it works"
              
            >
              <div className="text-white border-white border rounded bg-[#1e0b3a] p-4 overflow-auto">
                <div className="mb-4">
                  <h2 className="font-semibold text-lg">What it is: </h2>
                  <p>This is a conceptual art project. It wont take down the banks, it wont revolutionize NFTs - its just art.</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold text-lg">What was the motivation: </h2>
                  <p>I thought about what makes blockchain technology different from web2 and a couple characteristics came to mind: </p>
                  <ul className="list-disc">
                    <li className="list-disc ml-6">Every transaction is accessible to view by everyone</li>
                    <li className="list-disc ml-6">Its immutable (with some exceptions on Solana. Mutable data has been excluded from an influence in the display)</li>
                    <li className="list-disc ml-6">There is a clear distinction of the sequential passage of time</li>
                    <li className="list-disc ml-6">It cannot stop growing and increasing in complexity</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold text-lg">How to use it: </h2>
                  <p>Press the -Create life- button to initialize an organism (a PDA)</p>
                  <p>This will utilize a hashing function to decide where it will be born on the map</p>
                  <p>Next, press -Evolve-. This will gather the data of all the transactions that occured in the most previous block</p>
                  <p>The type of transactions in that block will dictate the type, and magnitude, of organisms behaviours</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold text-lg">Next steps: </h2>
                  <p>If I were to continue with this project, I would take steps to increase randomness</p>
                  <p>Instead of pressing -Create life- to manually create an organism, all programs created on the chain would direclty translate into the creation of a new organism</p>
                  <p>Instead of pressing -Evolve- to manually select a block to read from, every single block would automatically be read, and the display would update accordingly</p>
                  <p>Essentially, all user input would be removed, and the art you see on the screen would become an untouched (yet constantly evolving) represenation of all the txs ever made on chain</p>
                </div>
              </div>
            </Modal>

            <div className="flex flex-col h-screen">
              <Notifications />
              <AppBar toggleModal={toggleModal}/>
              <Component {...pageProps} />
            </div>
          </ContextProvider>
        </>
    );
};

export default App;

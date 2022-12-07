import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const Backend = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Backend Development',
    paragraph: ''
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" id="backend"/>
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item" style={{width: "20%"}}>
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div> */}
                <h3 className="mt-0 mb-12">
                    Flow Chart
                  </h3>
                <p className="m-0" >
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/flowChart.png')}
                  alt="Features split 01"
                  style={{"width": "100%"}}
                  />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item" style={{width:"100%"}}>

                <h3 className="mt-0 mb-12">
                  Tools
                  </h3>
                <h4 className="mt-0 mb-12 text-color-primary" style={{marginTop: "2em"}}>
                    Nodejs
                </h4>
                <p className="m-0">
                We use Node.js as our backend server. Node.js is an open-source server environment. Node.js is compatible with multiple operating systems and may be run on macOS, Linux, and Unix. Node.js is a back-end JavaScript runtime environment. It is a platform that executes JavaScript code outside of a web browser and powered by the V8 JavaScript Engine.

                  </p>
              </div>
              
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item" style={{width:"100%"}}>


                <h4 className="mt-0 mb-12 text-color-primary">
                Web3
                </h4>
                <p className="m-0">
                We use Web3 as the library that helps connect the smart contract and Node.js. Web3 is an idea for a new iteration of the World Wide Web which incorporates concepts such as decentralization, blockchain technologies, and token-based economics.

                  </p>
              </div>
              
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item" >


                <h4 className="mt-0 mb-12 text-color-primary">
                Truffle
                </h4>
                <p className="m-0">
                We use Truffle as the contract development. Truffle migrations enable us to “push” the smart contracts to blockchain and to set up necessary steps for linking contracts with other contracts as well as populate contracts with initial data. What we accomplished here is assigning the build folder where the smart contract is converted to JSON files and specify the network for Truffle use for migration. The figure on the left is the result after compiling and migrating our sample smart contract, Truffle deploys the contract to a new address that has empty storage slots. The transaction hash after the smart contract is created is circled in red.


                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                {/* <Image
                  src={require('./../../assets/images/truffle.png')}
                  alt="Features split 01"

                  style={{"width": "100%" , "height":"100%"}}
                  /> */}
                  <Image
                  src={require('./../../assets/images/truffle_1.png')}
                  alt="Features split 01"
                  width={528}
                  height={396}
                  
                  />
                  <Image
                  src={require('./../../assets/images/truffle_2.png')}
                  alt="Features split 01"
                  width={528}
                  height={396}
                  style={{"margin-top":"0.2em"}}
                  />
              </div>
              
            </div>
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item" >


                <h4 className="mt-0 mb-12 text-color-primary">
                Ganache-CLI
                </h4>
                <p className="m-0">
                We use Ganache-CLI as our blockchain emulator. Ganache CLI is part of the Truffle suite of Ethereum development tools. We use it as a local client for this project. ganache-cli is written in JavaScript and distributed as a Node.js package via npm. The CLI will display the addresses, private keys, mnemonic, gas price, and gas limit. The default setting is 10 accounts with starting balances of 100 Ether, as shown in the left figure. After we send a transaction via the deployed smart contract, as depicted in the right figure, the transaction hash, gas usage, block number, and contract address (if the transaction created a contract) are displayed. The transaction of creating the smart contract, which is identical to the figure on the right, is circled in yellow. This represents that the transaction hash is recorded on our local blockchain.

                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
               <Image
                  src={require('./../../assets/images/ganache_1.png')}
                  alt="Features split 01"

                  style={{"margin":"0", "width":"100%"}}
                  />
                  
                  <Image
                  src={require('./../../assets/images/ganache_2.png')}
                  alt="Features split 01"
                  style={{"margin-top":"0.25em", "width":"100%"}}
                
                  />
              </div>
              
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item" >


                <h4 className="mt-0 mb-12 text-color-primary">
                MongoDB
                </h4>
                <p className="m-0">
                MongoDB is a database program that operates as a document-oriented database that is compatible with multiple platforms. MongoDB, which is a NoSQL database application, stores data in documents that are similar to JSON and can have optional schemas. We use MongoDB to keep the history of all of the transactions as well as the current status of each one, and we update it as it receives new information.
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
               <Image
                  src={require('./../../assets/images/mongodb.png')}
                  alt="Features split 01"
                  />

              </div>
              
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
Backend.propTypes = propTypes;
Backend.defaultProps = defaultProps;

export default Backend;
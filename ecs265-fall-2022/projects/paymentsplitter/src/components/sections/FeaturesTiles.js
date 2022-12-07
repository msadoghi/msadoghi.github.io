import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Introduction',
    paragraph: 'Due to the widespread use of cryptocurrencies, many people are building NFTs or DeFi projects together, and they will need a safe and reliable way to split the crypto profits. Hence, for this project, we aim to develop a crypto asset splitter application for users to keep track of their shared crypto transactions. We are using Swift for our frontend, Node.js for our backend, and Solidity for smart contracts, along with other tools such as Truffle, Ganache-CLI, MongoDB.'
  };

  const solutionHeader = {
    title: 'Solution',
    paragraph: `We surveyed and collected experience from people who use Splitwise in their daily life to analyze the functions of what people will need when splitting expenses. Splitwise is a free tool for people to track bills and other shared expenses, so that everyone eventually gets paid back.

    With nearly 2 million apps and collecting hundreds of billions of downloads in the App Store, the market for iOS applications has seen nothing but a constant uptrend. Therefore, in our project, we have decided to develop an iOS application. We use Swift to create the frontend and get the APIs from Node.js in the application.
    
    We create a splitting iOS application for users to split money and record the transaction with blockchain. This is a full stack application built using Swift in the frontend along with Node.js in the backend.
    `
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container" id="#intro">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" id="intro"/>
          <SectionHeader data={solutionHeader} className="center-content" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/createParticipants.png')}
                      alt="Features tile icon 01"
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Create Participants
                    </h4>
                  <p className="m-0 text-sm">
                    User create participants who are going to join the payment splitting group.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/createExpense.png')}
                      alt="Features tile icon 02"
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Create Expense
                    </h4>
                  <p className="m-0 text-sm">
                    Create an expense to split with participants.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/setAgreements.png')}
                      alt="Features tile icon 03"
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Set Agreement
                    </h4>
                  <p className="m-0 text-sm">
                    Participants who are going to split an expense will receive a message that asks them if they agree.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/createPayment.png')}
                      alt="Features tile icon 04"
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Create Payment
                    </h4>
                  <p className="m-0 text-sm">
                    Make a payment from one account to another account.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/checkBalance.png')}
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Check Balance
                    </h4>
                  <p className="m-0 text-sm">
                    Check the balance to see how much money is there in the account.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;
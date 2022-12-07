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

const Frontend = ({
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
    title: 'Frontend Development',
    paragraph: ''
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" id="frontend"/>
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item" style={{width: "100%"}}>
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div> */}
                <h3 className="mt-0 mb-12">
                    Home Page / Transaction History
                  </h3>
                <p className="m-0" >
                On the home page, the total balance of your own cryptocurrency account is displayed, so users can easily check their account status as soon as they log in to this application. At the bottom of the page, all of the transactions between the user and the group can be seen.
                  </p>
              </div>
              {/* <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/features-split-image-01.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} />
              </div> */}
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item" style={{width: "100%"}}>
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div> */}
                <h3 className="mt-0 mb-12">
                    Payment Creation
                  </h3>
                <p className="m-0">
                Since creating payment is the main feature of our application, we put this designated button in the center of the bottom navigation bar. To create a new payment, the user can choose one of the group members, choose the cryptocurrency to use in the transaction, and enter the amount.
                  </p>
              </div>
              {/* <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/features-split-image-02.png')}
                  alt="Features split 02"
                  width={528}
                  height={396} />
              </div> */}
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div> */}
                <h3 className="mt-0 mb-12">
                  Tools
                  </h3>
                <h4 className="mt-0 mb-12 text-color-primary">
                    Figma
                </h4>
                <p className="m-0">
                Figma is an online tool for collaborative interface design that also has offline functionality made possible by desktop programs for Windows and macOS. With a number of vector graphics editors and prototyping tools, Figma's feature set focuses on user interface and user experience design with a strong emphasis on real-time collaboration.

                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/figma.png')}
                  alt="Features split 03"
                  width={528}
                  height={396} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item" style={{width:"100%"}}>
                {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div> */}

                <h4 className="mt-0 mb-12 text-color-primary">
                Swift UI
                </h4>
                <p className="m-0">
                SwiftUI is a user interface toolkit that enables declarative app creation. In other words, we tell SwiftUI how we want our user interface to look and function, and it works out how to implement that when the user interacts with it.

SwiftUI is a user interface toolkit that enables declarative app creation. In other words, we tell SwiftUI how we want our user interface to look and function, and it works out how to implement that when the user interacts with it.

                  </p>
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

Frontend.propTypes = propTypes;
Frontend.defaultProps = defaultProps;

export default Frontend;
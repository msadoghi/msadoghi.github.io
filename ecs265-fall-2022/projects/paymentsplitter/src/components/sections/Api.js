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

const Api = ({
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
    title: 'API Design',
    paragraph: ''
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" id="api"/>
          <div className={splitClasses} style={{"width":"80%","margin":"auto", "display":"block"}}>

            <div className="split-item" >

              <div className={
                
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/api_1.png')}
                  alt="Features split 01"
                  style={{"width": "100%", "margin-left":"1em", "margin-right":"1em"}}
                  />
                <Image
                src={require('./../../assets/images/api_2.png')}
                alt="Features split 01"
                style={{"width": "100%", "margin-left":"1em", "margin-right":"1em"}}
                />
                <Image
                  src={require('./../../assets/images/api_3.png')}
                  alt="Features split 01"
                  style={{"width": "100%", "margin-left":"1em", "margin-right":"1em"}}
                />
                <Image
                  src={require('./../../assets/images/api_4.png')}
                  alt="Features split 01"
                  style={{"width": "100%", "margin-left":"1em", "margin-right":"1em"}}
                />
                <Image
                src={require('./../../assets/images/api_5.png')}
                alt="Features split 01"
                style={{"width": "100%", "margin-left":"1em", "margin-right":"1em"}}
              />

              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
Api.propTypes = propTypes;
Api.defaultProps = defaultProps;

export default Api;
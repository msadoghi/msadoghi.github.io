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
const Team = ({
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
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Team Members',
    paragraph: ''
  };


  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" id="team"/>
          <Image
                  src={require('./../../assets/images/timeTable.png')}
                  alt="Features split 01"
                  style={{"width": "100%", "margin-left":"1em", "margin-right":"1em"}}
            />
          <div className={tilesClasses} style={{marginTop:"2em"}}>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/Alan.png')}
                      alt="Features tile icon 01"
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Ling-Yuan Chen
                    </h4>
                  <p className="m-0 text-sm">
                    <ul>
                        <li>Front back end integration</li>
                        <li>Smart contract design</li>
                    </ul>

                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/Byron.png')}
                      alt="Features tile icon 02"
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Che-Yu Chang
                    </h4>
                  <p className="m-0 text-sm">
                    <ul>
                        <li>Front back end integration</li>
                        <li>Node.js API design</li>
                    </ul>
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/Amy.png')}
                      alt="Features tile icon 03"
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Wei-Ting Ho
                    </h4>
                  <p className="m-0 text-sm">
                    <ul>
                        <li>Smart contract test</li>
                        <li>Node.js API design</li>
                    </ul>
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/Ginny.png')}
                      alt="Features tile icon 04"
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Yan-Yu Huang
                    </h4>
                  <p className="m-0 text-sm">
                    <ul>
                        <li>User interface design</li>
                        <li>Front end development</li>
                    </ul>
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/Lance.png')}
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Yan-Da Chen
                    </h4>
                  <p className="m-0 text-sm">
                     <ul>
                        <li>Smart contract test</li>
                        <li>Node.js API test</li>
                    </ul>
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/Sherry.png')}
                      width={96}
                      height={96} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Po-Hsuan Chen
                    </h4>
                  <p className="m-0 text-sm">
                    <ul>
                        <li>Smart contract design</li>
                        <li>Node.js API test</li>
                    </ul>
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

Team.propTypes = propTypes;
Team.defaultProps = defaultProps;

export default Team;
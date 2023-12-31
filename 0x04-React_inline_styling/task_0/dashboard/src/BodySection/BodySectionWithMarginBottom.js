import React, {Component} from "react";
import PropTypes from 'prop-types';
import './BodySectionWithMarginBottom.css';
import BodySection from './BodySection';


class BodySectionWithMarginBottom extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return(
      <div className="bodySectionWithMargin">
        <BodySection {...this.props}/>;
      </div>
    );
  }
}


BodySectionWithMarginBottom.defaultProps = {
  title: '',
};

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string,
};

export default BodySectionWithMarginBottom;
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Heading from '../Heading';
import VerticalSpacing from '../VerticalSpacing';

// duplicates Heading "main"
const Content = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -1.8px;

  ${props => props.theme.query.md} {
    font-size: 3.125rem;
  }

  ${props => props.theme.query.lg} {
    font-size: 4.375rem;
  }
`;

const ProjectInfo = styled(props => (
  <div className={props.className}>
    <Heading
      headingLevel={2}
      type="caption"
    >{props.caption}</Heading>

    <VerticalSpacing size={3} />

    <Content>
      {props.children}
    </Content>
  </div>
))`
  margin: 70px 0;
`;

ProjectInfo.propTypes = {
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default ProjectInfo;
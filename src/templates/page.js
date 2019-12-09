import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import IndexPage from '../pages/index';

import { Row, Col } from '../components/Grid';

import Spacer from '../components/layout/Spacer';
import Intro from '../components/layout/Intro';
import FullImg from '../components/layout/FullImg';
import MidImageLeft from '../components/layout/MidImageLeft';
import MidImageRight from '../components/layout/MidImageRight';
import SmallImg from '../components/layout/SmallImg';
import ProjectInfo from '../components/layout/ProjectInfo';
import Thumbnail from '../components/layout/Thumbnail';
import Title from '../components/layout/Title';
import SubTitle from '../components/layout/SubTitle';
import MultiColumnText from '../components/layout/MultiColumnText';

const LAYOUT_FULL_WIDTH = 'WordPressAcf_full_width';
const LAYOUT_MULTI_COLUMN_TEXT = 'WordPressAcf_multi_column_text';
const LAYOUT_THUMBNAILS = 'WordPressAcf_thumbnails';

const COMPONENT_SPACER = 'spacer';
const COMPONENT_INTRO = 'intro';
const COMPONENT_FULL_IMG = 'full_img';
const COMPONENT_MID_IMAGE_LEFT = 'mid_image_left';
const COMPONENT_MID_IMAGE_RIGHT = 'mid_image_right';
const COMPONENT_PROJECT_INFO = 'project_info';
const COMPONENT_SMALL_IMG = 'small_img';
const COMPONENT_THUMBNAIL = 'thumbnail';
const COMPONENT_TITLE = 'title';
const COMPONENT_SUB_TITLE = 'sub_title';

const MODE_DARK = 'Dark';

// "Ignore" hack added as a workaround to https://github.com/gatsbyjs/gatsby/issues/15707
export const query = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      acf {
        page_type
        text
        title
        image {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        image_list {
          images {
            localFile {
              childImageSharp {
                fluid(maxWidth: 135) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        layout_page {
          ... on WordPressAcf_full_width {
            internal {
              type
            }
            components {
              acf_fc_layout
              caption
              title
              text
              mode
              image {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              left_image {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              right_image {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          ... on WordPressAcf_thumbnails {
            internal {
              type
            }
            left_image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            right_image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            left_title
            right_title
          }
          ... on WordPressAcf_multi_column_text {
            internal {
              type
            }
            column_1_block
            column_1_text
            column_2_block
            column_2_text
            column_3_block
            column_3_text
            column_4_block
            column_4_text
          }
        }
      }
    }
  }
`;

const Page = props => {
  const page = props.data.wordpressPage;
  const layouts = page.acf.layout_page || [];

  const heroImage = get(page, 'acf.image.localFile.childImageSharp.fluid');
  // const heroVideo = page.acf.video && {
  //   mp4: get(page, 'acf.video.mp4_video.localFile.publicURL'),
  //   webm: get(page, 'acf.video.webm_video.localFile.publicURL'),
  // };

  const renderComponents = components => {
    return components.map((component, index) => {
      switch (component.acf_fc_layout) {
        case COMPONENT_SPACER:
          return (
            <Spacer key={index} />
          );

        case COMPONENT_INTRO:
          return (
            <Intro
              key={index}
              caption={component.caption}
              title={component.title}
            >
              <div dangerouslySetInnerHTML={{
                __html: component.text
              }} />
            </Intro>
          );

        case COMPONENT_FULL_IMG:
          return (
            <FullImg
              key={index}
              image={component.image.localFile.childImageSharp.fluid}
            />
          );

        case COMPONENT_MID_IMAGE_LEFT:
          return (
            <MidImageLeft
              key={index}
              caption={component.caption}
              image={component.image.localFile.childImageSharp.fluid}
            >
              <div dangerouslySetInnerHTML={{
                __html: component.text
              }} />
            </MidImageLeft>
          );

        case COMPONENT_MID_IMAGE_RIGHT:
          return (
            <MidImageRight
              key={index}
              caption={component.caption}
              image={component.image.localFile.childImageSharp.fluid}
            >
              <div dangerouslySetInnerHTML={{
                __html: component.text
              }} />
            </MidImageRight>
          );

        case COMPONENT_PROJECT_INFO:
          return (
            <ProjectInfo
              key={index}
              caption={component.caption}
            >
              <div dangerouslySetInnerHTML={{
                __html: component.text
              }} />
            </ProjectInfo>
          );

        case COMPONENT_SMALL_IMG:
          return (
            <SmallImg
              key={index}
              imageLeft={component.left_image.localFile.childImageSharp.fluid}
              imageRight={component.right_image.localFile.childImageSharp.fluid}
              dark={component.mode === MODE_DARK}
            />
          );

        case COMPONENT_THUMBNAIL:
          return (
            <Thumbnail
              key={index}
              image={component.image.localFile.childImageSharp.fluid}
            >
              {component.title}
            </Thumbnail>
          );

        case COMPONENT_TITLE:
          return (
            <Title key={index}>
              <span dangerouslySetInnerHTML={{
                __html: component.text
              }} />
            </Title>
          );

        case COMPONENT_SUB_TITLE:
          return (
            <SubTitle
              key={index}
              children={component.text}
            />
          );

        default:
          return null;
      }
    });
  };

  const renderLayout = (type, data, key) => {
    switch (type) {
      case LAYOUT_FULL_WIDTH:
        return renderComponents(data.components || []);

      case LAYOUT_MULTI_COLUMN_TEXT:
        return (
          <MultiColumnText
            key={key}
            columns={[
              {
                // hasBlock: data.column_1_block,
                text: data.column_1_text,
              },
              {
                // hasBlock: data.column_2_block,
                text: data.column_2_text,
              },
              {
                // hasBlock: data.column_3_block,
                text: data.column_3_text,
              },
              {
                // hasBlock: data.column_4_block,
                text: data.column_4_text,
              },
            ]}
          />
        );

      case LAYOUT_THUMBNAILS:
        return (
          <Row
            key={key}
            gutter={20}
          >
            <Col xs={24} md={12}>
              <Thumbnail image={data.left_image.localFile.childImageSharp.fluid}>
                {data.left_title}
              </Thumbnail>
            </Col>
            <Col xs={24} md={12}>
              <Thumbnail image={data.right_image.localFile.childImageSharp.fluid}>
                {data.right_title}
              </Thumbnail>
            </Col>
          </Row>
        );

      default:
        return null;
    }
  };

  const imageList =
    page.acf.image_list &&
    page.acf.image_list.map(item => item.images.localFile.childImageSharp.fluid);

  return (
    <IndexPage
      pageType={page.acf.page_type}
      hero={{
        image: heroImage,
        // video: heroVideo,
        text: page.acf.text,
      }}
      // About page props
      imageList={imageList}
      title={page.acf.title}
    >
      {layouts.map((layout, index) => {
        const type = layout.internal && layout.internal.type;

        if (!type) {
          return null;
        }

        return renderLayout(type, layout, index);
      })}
    </IndexPage>
  );
};

export default Page;
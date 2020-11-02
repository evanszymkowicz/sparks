import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/SEO"
import {
  Container,
  ContentContainer,
  Resources,
  deviceMax,
  SeeMore
} from "../components/Primitives"
import meta from "../../content/data/meta.json"
import styled from "styled-components"
import NewsLetter from "../components/Newsletter/newsletter"
import ResourceCard from "../components/Resources/resourceCard"
import GitHub from "../../static/Icons/GitHub"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const IndexPage = ({ data }: any) => (
  <Layout>
    <SEO pathName={meta.index.path} title={meta.index.title} />
    <HeroWrap>
      <Overlay>
        <HeroContainer>
          <HeroText>
            <h1>Serving companies and the employees of the Washington, D.C. area.</h1>
            {/* <h3>
              Learn about the services available to you as a job seeker,
              employee or independent professional.
            </h3> */}
          </HeroText>
        </HeroContainer>
      </Overlay>
    </HeroWrap>
    <Container>
      <H1_Attn>Stay informed with Sparks</H1_Attn>
      <P>
        Learn about services avalible to you.
      </P>

      <Resources>
        {data.allMarkdownRemark.edges.map((post: any) => (
          <ResourceCard
            key={post.node.id}
            title={post.node.frontmatter.title}
            content={post.node.internal.content}
            tags={post.node.frontmatter.tags}
            html={post.node.excerpt}
            source={post.node.frontmatter.source}
            slug={post.node.frontmatter.slug}
            type={post.node.frontmatter.resourceType}
          />
        ))}
      </Resources>
      <SeeMore to="/job-seekers">See All Information</SeeMore>

      <H1>For the people, by the people</H1>
      <ContentContainer style={{ margin: "0px auto 50px auto" }}>
        <P>
          Sparks was created by people who have struggled with the job market
          and lack of knowledge regarding resources available to them. At
          Sparks, we connect elite talent with the best opporotunities.
        </P>
        <P>
          We believe in community. <b> Sparks is open-source for this reason.</b>
          Connect with the author and creator of this site for more information.
        </P>
        <GitHubLink href="https://github.com/evanszymkowicz" target="_new">
          <GitHub />
        </GitHubLink>
      </ContentContainer>
    </Container>
  </Layout>
)

export default IndexPage

export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/resources/job-seekers/" } }
      limit: 3
    ) {
      edges {
        node {
          id
          timeToRead
          html
          excerpt(pruneLength: 400)
          frontmatter {
            author
            slug
            title
            tags
            date
            source
            resourceType
          }
          internal {
            content
          }
        }
      }
    }
    newsImage: file(relativePath: { eq: "newsletter.png" }) {
      childImageSharp {
        fluid(quality: 100) {
          srcSetWebp
        }
      }
    }
  }
`

const HeroWrap = styled.div`
  background-image: url("images/office-phone.png");
  padding: 0;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: unset;
  min-height: 768px;
`
const Overlay = styled.div`
  height: 100%;
  width: 100%;
  min-height: 768px;
  background-color: rgba(2, 38, 64, 0.4);
`
const HeroContainer = styled(Container)`
  padding: 200px 20px;
  color: white;
`
const H1_Attn = styled.h1`
  text-align: center;
  color: var(--softRed);
  margin: 50px 0;
`
const H1 = styled.h1`
  text-align: center;
  margin: 50px 0;
`
const P = styled.p`
  text-align: center;
`
const HeroText = styled.div`
  width: 50%;
  @media ${deviceMax.mobileL} {
    width: 100%;
    text-align: center;
  }
`

const GitHubLink = styled(OutboundLink)`
  margin: auto;
  display: block;
  text-align: center;
  width: max-content;
`

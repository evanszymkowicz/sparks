import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "styled-components"
import * as _ from "lodash"
import { DarkButton } from "../Primitives"

const BlogHeroImage = () => {
  const data = useStaticQuery(graphql`
    query BlogHeroImgQuery {
      allMarkdownRemark(
        # sort in descending order
        limit: 1
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      ) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              slug
              title
              author
              date(formatString: "MMMM DD, YYYY")
              thumbnailBlog {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            excerpt
            timeToRead
          }
        }
      }
    }
  `)

  return (
    <HeroWrap>
      <GreyBackground>
        {data.allMarkdownRemark?.edges.map((post: any) => (
          <SubWrap key={post.node.id}>
            <Image>
              <img
                src={
                  post.node.frontmatter.thumbnailBlog.childImageSharp.fluid.src
                }
                alt=""
              />
            </Image>
            <BlogDetails>
              <ContentWrap>
                <Date>{post.node.frontmatter.date}</Date>
                <h1>{post.node.frontmatter.title}</h1>
                <br />
                <br />
                <DarkButton to={`/${post.node.frontmatter.slug}`}>
                  Read
                </DarkButton>
              </ContentWrap>
            </BlogDetails>
          </SubWrap>
        ))}
      </GreyBackground>
    </HeroWrap>
  )
}

export default BlogHeroImage

const HeroWrap = styled.div`
  width: 100%;
`

const SubWrap = styled.div`
  width: 75%;
  height: 450px;
  margin: auto;
  display: grid;

  grid-template-columns: 1fr 1fr;
  box-shadow: 0px 5px 15px rgba(2, 38, 64, 0.25);

  @media only screen and (max-width: 770px) {
    display: block;
    width: 95%;
  }
`

const GreyBackground = styled.div`
  background-color: var(--greenOverlay);
  padding: 100px 0px;

  @media only screen and (max-width: 770px) {
    background-color: transparent;
  }
`
const Image = styled.div`
  img {
    height: 100%;
    max-height: 450px;
    object-fit: cover;
    display: block;
    margin-bottom: 0px;
  }

  @media only screen and (max-width: 770px) {
    img {
      display: none;
    }
  }
`
const BlogDetails = styled.div`
  padding: 30px;
  background-color: #fff;
  text-align: center;
  vertical-align: middle;
  padding-top: 75px;
  display: table;
  height: 100%;

  @media only screen and (max-width: 770px) {
    margin-top: -60px;
    padding: 25px;
    background-color: var(--greenOverlay);
    color: #fff;
    height: 100%;
  }
`

const Date = styled.p`
  margin-bottom: 15px;

  @media only screen and (max-width: 770px) {
    color: #fff;
  }
`
const ContentWrap = styled.div`
  text-align: center;
  display: table-cell;
  vertical-align: middle;
`

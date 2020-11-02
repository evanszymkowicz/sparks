const allMarkdownBlog = `
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        limit: 2000
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `

export default allMarkdownBlog

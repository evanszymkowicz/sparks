import { includes, orderBy } from "lodash"

export class RelatedContentFactory {
  articles: any[]
  currentArticleSlug: string
  maxArticles: number
  category: null | string
  tags?: string[] | null[]
  constructor(articles: any[], currentArticleSlug: string) {
    // exclude the current article from the list
    this.articles = articles.filter(
      aArticle => aArticle.frontmatter.slug !== currentArticleSlug
    )

    this.currentArticleSlug = currentArticleSlug
    this.maxArticles = 3
    this.category = null
    this.tags = []
  }

  setMaxArticles(maxArticles: number) {
    this.maxArticles = maxArticles
    return this
  }

  setCategory(category: string) {
    this.category = category
    return this
  }

  setTags(tagsArray?: string[] | null[]) {
    this.tags = tagsArray
    return this
  }

  getArticles() {
    const { category, tags, articles, maxArticles } = this
    // use an identity to keep track
    interface Identity {
      [index: string]: {
        article: any
        points: number
      }
    }
    const identityMap: Identity = {}

    if (!!tags && tags.length === 0) {
      console.error("SimilarArticlesFactory: Tags not provided, use setTags().")
      return []
    }

    function getSlug(article: any) {
      return article.frontmatter.slug as string
    }

    function addToMap(article: any) {
      const slug = getSlug(article)
      const exists = Object.prototype.hasOwnProperty.call(identityMap, slug)
      if (!exists) {
        identityMap[slug] = {
          article: article,
          points: 0
        }
      }
    }
    // for category matched add 2 points
    function addCategoryPoints(article: any, category: string) {
    
    }

    // for tags matched add 1 point
    function addTagsPoints(article: any, tags?: string[] | null[]) {
      const tagPoint = 1
      const slug = getSlug(article)

      article?.frontmatter?.tags?.forEach(aTag => {
        if (includes(tags, aTag)) {
          identityMap[slug].points += tagPoint
        }
      })
    }

    function getIdentityMapAsArray() {
      return Object.keys(identityMap).map(slug => identityMap[slug])
    }

    // map over all articles, add to map and add points
    articles.forEach(article => {
      addToMap(article)
      // addCategoryPoints(article, category) // We don't (yet) have categories
      addTagsPoints(article, tags)
    })
    // convert the identity map to an array
    const arrayIdentityMap = getIdentityMapAsArray()
    // use a lodash utility function to sort them
    // by points from greatest to least
    const similarArticles = orderBy(arrayIdentityMap, ["points"], ["desc"])
    // (take the max number articles requested
    return similarArticles.splice(0, maxArticles)
  }
}

import React from 'react'
import Post from './Post'
import About from './About'
import PopularPosts from './PopularPosts'
import Category from './Category'
import Footer from './Footer'
import * as api from '../API/ServerAPI'

class App extends React.Component {
  state = { posts: [], categories: [] }

  getAllPosts = () => {
    api.getAllPosts().then(posts => this.setState({ posts }))
  }

  getAllCategories = () => {
    api.getAllCategories().then(data => this.setState({ categories : data.categories }))
  }

  componentDidMount() {
    this.getAllCategories()
    this.getAllPosts()
  }

  render() {
    const { posts, categories } = this.state
    return (
      <div>
        <div className="light-grey">
          <div className="content" style={{ maxWidth: 1400 }}>
            <header className="container center padding-32">
              <h1>
                <b>Nossas Rotas Blog</b>
              </h1>
              <p>
                Welcome to the blog of <span className="tag">Ivo & Mari</span>
              </p>
            </header>

            <div className="row">
              <div className="col l8 s12">
                {this.state.posts.map(post => (
                  <div key={post.id} className="card-4 margin white">
                    <Post key={post.id} post={post} />
                  </div>
                ))}
              </div>

              <div className="col l4">
                <div className="card margin margin-top">
                  <About />
                </div>

                <div className="card margin">
                  <div className="container padding">
                    <h4>Popular Posts</h4>
                  </div>
                  <PopularPosts posts={posts} />
                </div>

                <div className="card margin">
                  <div className="container padding">
                    <h4>Category</h4>
                  </div>
                    <Category categories={categories} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App

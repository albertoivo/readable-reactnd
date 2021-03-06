const clone = require('clone')

let db = {}

const mussumIpsum = `Mussum Ipsum, cacilds vidis litro abertis. Quem manda na minha terra sou euzis! Não sou faixa preta cumpadi, sou preto inteiris, inteiris. In elementis mé pra quem é amistosis quis leo. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.
Pra lá, depois divoltis porris, paradis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Sapien in monti palavris qui num significa nadis i pareci latim. Mé faiz elementum girarzis, nisi eros vermeio.
Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Diuretics paradis num copo é motivis de denguis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.
Detraxit consequat et quo num tendi nada. Si num tem leite então bota uma pinga aí cumpadi! Aenean aliquam molestie leo, vitae iaculis nisl. Per aumento de cachacis, eu reclamis. `

const defaultData = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'How to use GitHub',
    body: mussumIpsum,
    excerpt: mussumIpsum.substr(0, 100) + '...',
    author: 'Chun Li',
    category: 'github',
    voteScore: 3,
    deleted: false,
    commentCount: 2
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'What is markdown?',
    body: mussumIpsum,
    excerpt: mussumIpsum.substr(0, 100) + '...',
    author: 'Thanos',
    category: 'dev',
    voteScore: 2,
    deleted: false,
    commentCount: 0
  },
  '7fr4ok5ym8mk1p45lbah': {
    id: '7fr4ok5ym8mk1p45lbah',
    timestamp: 1478571769199,
    title: 'How to publish an app on firebase',
    body: mussumIpsum,
    excerpt: mussumIpsum.substr(0, 100) + '...',
    author: 'Black Panther',
    category: 'dev',
    voteScore: 5,
    deleted: false,
    commentCount: 0
  },
  '9zfdt3zeyjabvozdd0o9it': {
    id: '9zfdt3zeyjabvozdd0o9it',
    timestamp: 1329720961579,
    title: 'What is branch?',
    body: mussumIpsum,
    excerpt: mussumIpsum.substr(0, 100) + '...',
    author: 'Capitan American',
    category: 'github',
    voteScore: 4,
    deleted: false,
    commentCount: 0
  },
  '7d4j0nzqm7mf8nb64zsh': {
    id: '7d4j0nzqm7mf8nb64zsh',
    timestamp: 1377388678201,
    title: 'How to write a blog with markdown',
    body: mussumIpsum,
    excerpt: mussumIpsum.substr(0, 100) + '...',
    author: 'IronMan',
    category: 'dev',
    voteScore: 1,
    deleted: false,
    commentCount: 0
  },
  '6bdji8tm8mkvfr453dx': {
    id: '6bdji8tm8mkvfr453dx',
    timestamp: 1367400125142,
    title: 'Why we have to commit and to push?',
    body: mussumIpsum,
    excerpt: mussumIpsum.substr(0, 100) + '...',
    author: 'Wolverine',
    category: 'github',
    voteScore: 6,
    deleted: false,
    commentCount: 0
  },
  '6agU81kU8mkG6q5sU5B': {
    id: '6agU81kU8mkG6q5sU5B',
    timestamp: 1256209413953,
    title: 'Lets play Marvel vs Capcon',
    body: 'small body for test',
    excerpt: mussumIpsum.substr(0, 100) + '...',
    author: 'Ken',
    category: 'hobby',
    voteScore: -3,
    deleted: false,
    commentCount: 0
  }
}

function getData(token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory(token, category) {
  return new Promise(res => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(
      key => posts[key].category === category && !posts[key].deleted
    )
    res(filtered_keys.map(key => posts[key]))
  })
}

function get(token, id) {
  return new Promise(res => {
    const posts = getData(token)
    res(posts[id].deleted ? {} : posts[id])
  })
}

function getAll(token) {
  return new Promise(res => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add(token, post) {
  return new Promise(res => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      excerpt: post.body.length > 100 ? post.body.substr(0, 100).trim() + '...' : post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote(token, id, option) {
  return new Promise(res => {
    let posts = getData(token)
    let post = posts[id]
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1
        break
      case 'downVote':
        post.voteScore = post.voteScore - 1
        break
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable(token, id) {
  return new Promise(res => {
    let posts = getData(token)
    posts[id].deleted = true
    res(posts[id])
  })
}

function edit(token, id, post) {
  return new Promise(res => {
    let posts = getData(token)
    for (prop in post) {
      posts[id][prop] = post[prop]
    }
    res(posts[id])
  })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  incrementCommentCounter
}

import nunjucks from 'nunjucks'
import fs from 'fs'

nunjucks.configure('views', { autoescape: true })

const folders = [
  [...new Array(10).keys()].map(i => `A${i + 1}`),
  [...new Array(15).keys()].map(i => `B${i + 1}`),
  [...new Array(20).keys()].map(i => `C${i + 1}`)
]

fs.writeFileSync('index.html', nunjucks.render('index.html', { folders }))

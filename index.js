import nunjucks from 'nunjucks'
import fs from 'fs'

nunjucks.configure('views', { autoescape: true })

const folders = [
  [...new Array(10).keys()].map(i => `A${i + 1}`),
  [...new Array(15).keys()].map(i => `B${i + 1}`),
  [...new Array(20).keys()].map(i => `C${i + 1}`)
]

fs.writeFileSync('index.html', nunjucks.render('index.html', { folders }))

const letters = ['A', 'B', 'C']
const length = { A: 10, B: 15, C: 20 }

for (const letter of letters) {
  for (let i = 0; i < length[letter]; i++) {
    const folder = `${letter}/${letter}${i + 1}`
    fs.writeFileSync(`${folder}.html`, nunjucks.render('letter.html', { folder }))
  }
}

import nunjucks from 'nunjucks'
import fs from 'fs'
import path from 'path'

nunjucks.configure('views', { autoescape: true })

const getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())

fs.writeFileSync('index.html', nunjucks.render('index.html', { root: '.' }))

for (const letter of ['A', 'B', 'C']) {
  const dirs = getDirs(`materials/${letter}`)
  for (const dir of dirs) {
    fs.writeFileSync(`${letter}/${dir}.html`, nunjucks.render('letter.html', {
      letter,
      dir,
      root: '../..',
      length: dirs.length
    }))
  }
}

import nunjucks from 'nunjucks'
import fs from 'fs'
import path from 'path'

nunjucks.configure('views', { autoescape: true })

const getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
const getFiles = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isFile())

const letters = ['A', 'B', 'C']
const dirss = letters.map(l => getDirs(`materials/${l}`))
const filesss = dirss.map(dirs => {
  return dirs.map(dir => {
    return getFiles(`materials/${dir[0]}/${dir}`).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.bmp') || f.toLowerCase().endsWith('.png'))
  })
})
const audiosss = dirss.map(dirs => {
  return dirs.map(dir => {
    return getFiles(`materials/${dir[0]}/${dir}/audio`).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.bmp') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.wav'))
  })
})

fs.writeFileSync('index.html', nunjucks.render('index.html', { root: '.', letters, dirss }))

for (let i = 0; i < letters.length; i++) {
  const letter = letters[i]
  const dirs = dirss[i]
  const filess = filesss[i]
  const audioss = audiosss[i]
  for (let j = 0; j < dirs.length; j++) {
    const dir = dirs[j]
    const files = filess[j]
    const audios = audioss[j]
    fs.writeFileSync(`${letter}/${dir}.html`, nunjucks.render('letter.html', {
      letter,
      dirs,
      dir,
      words: files.slice(0, files.length - 1),
      sentence: files[files.length - 1],
      audio: audios[audios.length - 1],
      choices: audios.slice(0, audios.length - 1),
      root: '..'
    }))
  }
}

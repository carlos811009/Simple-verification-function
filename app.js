const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000
const cookieParser = require('cookie-parser')

const users = [
  {
    id: '001',
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    id: '002',
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    id: '003',
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    id: '004',
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    id: '005',
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  },
  {
    id: '006',
    firstName: 'test',
    email: '123@123',
    password: '123'
  }
]

const error_message = 'Username 或 Password 錯誤'

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.render('login')
})

app.post('/user/login', (req, res) => {
  // const cookieId = req.cookies('usercookie')
  const userCookie = req.cookies.usercookie
  const { email, password } = req.body
  let i = 0
  users.forEach(user => {
    const authentication = user.email === email && user.password === password
    if (user.id === userCookie) {
      i++
      console.log('login with cookie')
      res.render('index', { user })
      return
    }
    if (authentication) {
      i++
      console.log('login with email')
      res.cookie('usercookie', user.id)
      res.render('index', { user })
      return
    }
  })
  if (i === 0) {
    res.render('login', { error_message })
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('usercookie')
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
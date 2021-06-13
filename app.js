const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  },
  {
    firstName: 'test',
    email: '123@123',
    password: '123'
  }
]

const error_message = 'Username 或 Password 錯誤'

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.render('login')
})

app.post('/user/login', (req, res) => {
  const { email, password } = req.body
  let i = 0
  users.forEach(user => {
    const authentication = user.email === email && user.password === password
    if (authentication) {
      i++
      return res.send(`${user.firstName} 歡迎回來`)
    }
  })
  if (i === 0) {
    res.render('login', { error_message })
  }
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
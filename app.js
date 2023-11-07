const express = require('express')
const port = 8080
const app = express()



app.get('/', (req, res) => {
  res.send('hey daisy')
})



app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`)
})



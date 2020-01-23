const express = require('express')
const fs = require('fs');

// Create a new express application
const app = express()
const port = 3000

// Stacking the `.get()` function is a feature of ExpressJS and not a general feature of JavaScript.
// `.get()` registeres an event handler which triggers when:
//   - a GET request is sent
//   - the link matches the first parameter
app
  .get('/', (req, res) => {
    // Read from a file example into a string.
    // Without the second parameter, the file is read as a binary blob.
    const contents = fs.readFileSync('./file.html', { encoding: 'UTF8' })

    // Set the HTTP header to let the browser know it's a HTML document
    res.setHeader('Content-type','text/html')
    res.send(contents)
  })
  .get('/page2', (req, res) => {
    // Redirect the browser with a 302 HTTP request
    res.redirect('https://en.wikipedia.org/wiki/Page_Two_(EP)')
  })
  .get('/query', (req, res) => {
    // A function which runs both res.setHeader to JSON and res.send
    // The dictionary "req.query" is the list of all query parameters
    res.json(req.query)
  })
  .get('/loop', (req, res) => {
    // You are NOT allowed to run `res.send()` multiple times
    // res.send() is short for both res.write() and res.end()
    // We can use res.write() to send data multiple times, and manually end.

    for (let i = 0; i < 5; i++) {
      res.write(i + '\n')
    }

    res.end()
  })

// Let the webserver listen to the port
app.listen(port)

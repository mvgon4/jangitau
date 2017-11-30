import {readFile} from 'fs'

export function requestHandler (request, response) {
  readFile('dist/index.html', (err, data) => {
    if (err) console.error(err)

    response.end(data)
  })
}

export default requestHandler

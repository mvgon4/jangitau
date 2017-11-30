import {createServer} from 'http'
import {requestHandler} from './modules/request-handler/request-handler'

const server = createServer(requestHandler)
server.listen(5051)
console.log('listening on 5051')

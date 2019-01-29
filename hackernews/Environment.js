const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')

const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/cjr0dk7cpj79o0111kibtvpge', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(responce => {
    return responce.json()
  })
})

const environment = new Environment({
  network,
  store,
})

export default environment

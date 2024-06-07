import Typesense from 'typesense'

const client = new Typesense.Client({
  'nodes': [{
    'host': process.env.NEXT_PUBLIC_typesensedomain, // where xxx is the ClusterID of your Typesense Cloud cluster
    'port': '443',
    'protocol': 'https'
  }],
  'apiKey': process.env.NEXT_PUBLIC_typesenseapikey,
  'connectionTimeoutSeconds': 2
})

const blogCollection = {
  'name': 'blogs',
  'fields': [
    {'name': 'id', 'type': 'string'},
    {'name': 'title', 'type': 'string' },
    {'name': 'date', 'type': 'string' },
    {'name': 'author', 'type': 'string' },
    {'name': 'keywords', 'type': 'string[]' },
    {'name': 'content', 'type': 'string' },
    {'name': 'description', 'type': 'string' },
  ]
}
//client.collections().create(blogCollection)

export const searchEngine = client
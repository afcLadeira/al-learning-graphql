const {ApolloServer} = require("apollo-server")


const {typeDefs} = require('./server/schema/typeDefs')
const {resolvers} = require('./server/schema/resolvers')

const server = new ApolloServer({typeDefs , resolvers})

server.listen().then(({url}) => {
    console.log("Apollo server is running:" + url)
})
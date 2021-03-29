import React from 'react';

import { ApolloClient, InMemoryCache, useQuery, gql} from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
      reconnect: true,
    },
});

export const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/', //connect to server
  cache: new InMemoryCache()
});


const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
      user
    }
  }
`;

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({user}) =>{
    const {data} = useQuery(GET_MESSAGES)
    if(!data){
        return null;
    }
    return JSON.stringify(data);
}

export const Chat = () =>{
    return(
        <div>Welcome to DevThoughts!
            <Messages/>
        </div>
    )
}

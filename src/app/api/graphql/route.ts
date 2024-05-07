import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { nanoid } from "nanoid";

type Todo = {
  id: string;
  name: string;
  checked?: boolean;
};

const todoList: Todo[] = [
  {
    id: "3_5PQdRC__bO8P_ycKiuK",
    name: "Wake up",
    checked: false,
  },
  {
    id: "ENkjOLIFncgtOOF-xhyyP",
    name: "Check mails",
    checked: false,
  },
];

// Create ajiluulah
// Update todo
// delete todo

// frontend deer @apollo/client

const resolvers = {
  Query: {
    getTodoList: () => todoList,
    getTodoById: (_: unknown, params: { id: string }) => {
      const { id } = params;
      const todo = todoList.find((el) => el.id === id);
      return todo;
    },
  },
  Mutation: {
    createTodo: (_: unknown, params: unknown) => {
      console.log(params);
      return todoList[0];
    },
  },
};

const typeDefs = gql`
  type Todo {
    id: ID!
    name: String!
    checked: Boolean
  }

  input TodoCreateInput {
    name: String!
    checked: Boolean
  }

  type Query {
    getTodoList: [Todo!]!
    getTodoById(id: ID!): Todo
  }

  type Mutation {
    createTodo(input: TodoCreateInput!): Todo
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };

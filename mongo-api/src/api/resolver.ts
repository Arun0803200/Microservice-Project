import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { currency } from './Models/CurrencyModel';
const CurrencyType = new GraphQLObjectType({
  name: 'Currency',
  fields: () => ({
    _id: {type: GraphQLString},
    currencyName: { type: GraphQLString },
    currencyCode: { type: GraphQLString },
    symbol: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    Currency: {
      type: CurrencyType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return currency.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCurrency: {
      type: CurrencyType,
      args: {
        currencyName: { type: GraphQLString },
        currencyCode: { type: GraphQLString },
        symbol: { type: GraphQLString }
      },
      resolve(parent, args) {
        const Currency = new currency(args);
        return Currency.save();
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

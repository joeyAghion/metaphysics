import {
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLInputObjectType,
} from "graphql"
import { mutationWithClientMutationId } from "graphql-relay"

import { UserType } from "../user"
import { ResolverContext } from "types/graphql"

export const EditableLocationFields = new GraphQLInputObjectType({
  name: "EditableLocation",
  fields: {
    address: {
      description: "First line of an address",
      type: GraphQLString,
    },
    address2: {
      description: "Second line of an address",
      type: GraphQLString,
    },
    city: {
      description: "The city the location is based in",
      type: GraphQLString,
    },
    country: {
      description: "The county the location is based in",
      type: GraphQLString,
    },
    summary: {
      description: "An optional display string for the location",
      type: GraphQLString,
    },
    postalCode: {
      description: "Postal code for a string",
      type: GraphQLString,
    },
    state: {
      description: "The (optional) name of the state for location",
      type: GraphQLString,
    },
    stateCode: {
      description: "The (optional) state code of the state for location",
      type: GraphQLString,
    },
  } /*
  FIXME: Generated by the snake_case to camelCase codemod.
         Either use this to fix inputs and/or remove this comment.
  {
    const {
      address2,
      postalCode,
      stateCode,
      ..._newFields
    } = newFields;
    const oldFields = {
      address2: address_2,
      postalCode: postal_code,
      stateCode: state_code,
      ..._newFields
    };
  }
  */,
})

export default mutationWithClientMutationId<any, any, ResolverContext>({
  name: "UpdateMyProfile",
  description: "Update the current logged in user.",
  inputFields: {
    name: {
      description: "The given name of the user.",
      type: GraphQLString,
    },
    email: {
      description: "The given email of the user.",
      type: GraphQLString,
    },
    phone: {
      description: "The given phone number of the user.",
      type: GraphQLString,
    },
    location: {
      description: "The given location of the user as structured data",
      type: EditableLocationFields,
    },
    collectorLevel: {
      description: "The collector level for the user",
      type: GraphQLInt,
    },
    priceRangeMin: {
      description: "The minimum price collector has selected",
      type: GraphQLInt,
    },
    priceRangeMax: {
      description: "The maximum price collector has selected",
      type: GraphQLFloat,
    },
  } /*
  FIXME: Generated by the snake_case to camelCase codemod.
         Either use this to fix inputs and/or remove this comment.
  {
    const {
      collectorLevel,
      priceRangeMin,
      priceRangeMax,
      ..._newFields
    } = newFields;
    const oldFields = {
      collectorLevel: collector_level,
      priceRangeMin: price_range_min,
      priceRangeMax: price_range_max,
      ..._newFields
    };
  }
  */,
  outputFields: {
    user: {
      type: UserType,
      resolve: (user) => user,
    },
  },
  mutateAndGetPayload: (
    { collectorLevel, priceRangeMin, priceRangeMax, ..._user },
    { updateMeLoader }
  ) => {
    const user: any = {
      collector_level: collectorLevel,
      price_range_min: priceRangeMin,
      price_range_max: priceRangeMax,
      ..._user,
    }
    if (!updateMeLoader) {
      throw new Error("No updateMeLoader loader found in root values")
    }
    return updateMeLoader(user)
  },
})

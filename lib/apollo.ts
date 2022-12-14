import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

type SchemaContext =
  | SchemaLink.ResolverContext
  | SchemaLink.ResolverContextFunction;

function createIsomorphicLink(ctx?: SchemaContext) {
  if (typeof window === 'undefined') {
    const { schema } = require('../src/graphql/schema');
    return new SchemaLink({
      schema,
      context: ctx,
    });
  }
  const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  });
  return from([httpLink]);
}

function createApolloClient(ctx?: SchemaContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(ctx || undefined),
    cache: new InMemoryCache(),
  });
}

interface InitApollo {
  initialState?: any;
  ctx?: SchemaContext;
}

export function initializeApollo({ ctx, initialState }: InitApollo) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx || undefined);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(existingCache, initialState, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    _apolloClient.cache.restore(data);
  }
  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: any; redirect?: any }
) => {
  pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  );
  return store;
};

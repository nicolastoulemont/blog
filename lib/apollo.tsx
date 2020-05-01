import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

let globalApolloClient: any = null
const isServer = typeof window === 'undefined'

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: any, { ssr = true } = {}) {
	const WithApollo = ({
		apolloClient,
		apolloState,
		...pageProps
	}: {
		apolloClient: any
		apolloState: any
	}) => {
		const client = apolloClient || initApolloClient(apolloState)
		return (
			<ApolloProvider client={client}>
				<PageComponent {...pageProps} />
			</ApolloProvider>
		)
	}

	// Set the correct displayName in development
	if (process.env.NODE_ENV !== 'production') {
		const displayName = PageComponent.displayName || PageComponent.name || 'Component'

		if (displayName === 'App') {
			console.warn('This withApollo HOC only works with PageComponents.')
		}

		WithApollo.displayName = `withApollo(${displayName})`
	}

	if (ssr || PageComponent.getInitialProps) {
		WithApollo.getInitialProps = async (ctx: any) => {
			const { AppTree } = ctx

			// Initialize ApolloClient, add it to the ctx object so
			// we can use it in `PageComponent.getInitialProp`.
			const apolloClient = (ctx.apolloClient = initApolloClient({}, ctx.req?.headers?.cookie))

			// Run wrapped getInitialProps methods
			let pageProps = {}
			if (PageComponent.getInitialProps) {
				pageProps = await PageComponent.getInitialProps(ctx)
			}

			// Only on the server:
			if (isServer) {
				// When redirecting, the response is finished.
				// No point in continuing to render
				if (ctx.res && ctx.res.finished) {
					return pageProps
				}

				// Only if ssr is enabled
				if (ssr) {
					try {
						// Run all GraphQL queries
						const { getDataFromTree } = await import('@apollo/react-ssr')
						await getDataFromTree(
							<AppTree
								pageProps={{
									...pageProps,
									apolloClient
								}}
							/>
						)
					} catch (error) {
						// Prevent Apollo Client GraphQL errors from crashing SSR.
						// Handle them in components via the data.error prop:
						// https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
						console.error('Error while running `getDataFromTree`', error)
					}

					// getDataFromTree does not call componentWillUnmount
					// head side effect therefore need to be cleared manually
					Head.rewind()
				}
			}

			// Extract query data from the Apollo store
			const apolloState = apolloClient.cache.extract()

			return {
				...pageProps,
				apolloState
			}
		}
	}

	return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState = {}, cookie = '') {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (isServer) {
		return createApolloClient(initialState, cookie)
	}

	// Reuse client on the client-side
	if (!globalApolloClient) {
		globalApolloClient = createApolloClient(initialState)
	}

	return globalApolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}, cookie?: any) {
	// ADD COOKIE TO REQUEST
	const enchancedFetch = (url: string, init: any) => {
		return fetch(url, {
			...init,
			headers: {
				...init.headers,
				Cookie: cookie || ''
			}
		}).then((response) => response)
	}

	const URL = process.env.API_URL || 'http://localhost:1337'
	const httpLink = new HttpLink({
		uri: URL + '/graphql',
		fetch: enchancedFetch
	})

	return new ApolloClient({
		ssrMode: isServer, // Disables forceFetch on the server (so queries are only run once)
		link: httpLink,
		cache: new InMemoryCache().restore(initialState)
	})
}
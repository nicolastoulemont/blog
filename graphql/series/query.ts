import gql from 'graphql-tag'

export const SERIES = gql`
	query Series {
		series(sort: "published_at:DESC", where: { show: true }) {
			id
			name
			slug
			image {
				url
				alternativeText
			}
			categories {
				name
				link
			}
			posts {
				title
				slug
			}
		}
	}
`

export const SERIE = gql`
	query Serie($id: ID!) {
		serie(id: $id) {
			id
			name
			description
			slug
			published_at
			image {
				url
				alternativeText
			}
			categories {
				name
				link
			}
			posts {
				id
				title
				slug
				image {
					url
					alternativeText
				}
			}
			repositories {
				id
				name
				description
				repository_url
				published_at
				image {
					url
					alternativeText
				}
			}
		}
	}
`

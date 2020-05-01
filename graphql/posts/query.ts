import gql from 'graphql-tag'

export const POSTS = gql`
	query Posts {
		posts(sort: "published_at:DESC") {
			id
			title
			slug
			image {
				url
				alternativeText
			}
			categories {
				name
			}
		}
	}
`

export const POST = gql`
	query Post($id: ID!) {
		post(id: $id) {
			id
			title
			slug
			published_at
			description
			content
			image {
				url
			}
			categories {
				name
			}
		}
	}
`

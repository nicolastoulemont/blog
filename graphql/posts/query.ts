import gql from 'graphql-tag'

export const POSTS = gql`
	query Posts {
		posts(sort: "published_at:DESC", where: { show: true }) {
			id
			title
			slug
			image {
				url
				alternativeText
			}
			categories {
				name
				link
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
				alternativeText
			}
			categories {
				name
				link
			}
			repositories {
				id
				name
				description
				repository_url
				image {
					url
					alternativeText
				}
			}
			series {
				id
				slug
				name
				description
				image {
					url
					alternativeText
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
			}
		}
	}
`

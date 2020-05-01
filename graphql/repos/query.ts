import gql from 'graphql-tag'

export const REPOSITORIES = gql`
	query Repositories {
		repositories(sort: "published_at:DESC") {
			id
			name
			description
			repository_url
			published_at
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

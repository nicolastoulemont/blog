import { Layout } from '@components/Layout'
import { withApollo } from 'lib/apollo'
import { Intro } from 'layouts/root/Intro'
import { Articles } from 'layouts/root/Articles'
import { Series } from 'layouts/root/Series'
import { Repositories } from 'layouts/root/Repositories'

export default withApollo(function IndexPage() {
	return (
		<Layout>
			<Intro />
			<Articles />
			<Series />
			<Repositories />
		</Layout>
	)
})

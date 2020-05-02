import Layout from '@components/Layout'
import { withApollo } from 'lib/apollo'
import { Intro } from 'layouts/root/Intro'
import { Articles } from 'layouts/root/Articles'
import { Repositories } from 'layouts/root/Repositories'

export default withApollo(function IndexPage() {
	return (
		<Layout>
			<Intro />
			<Articles />
			<Repositories />
		</Layout>
	)
})

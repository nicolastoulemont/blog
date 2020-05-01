import Layout from '@components/Layout'
import { withApollo } from 'lib/apollo'
import { Intro } from 'layouts/root/Intro'
import { Articles } from 'layouts/root/Articles'
import { Repositories } from 'layouts/root/Repositories'

export default withApollo(function IndexPage() {
	return (
		<Layout title='Home | Next.js + TypeScript Example'>
			<Intro />
			<Articles />
			<Repositories />
		</Layout>
	)
})

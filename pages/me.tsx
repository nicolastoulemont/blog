import Layout from '@components/Layout'
import { withApollo } from 'lib/apollo'

export default withApollo(function AboutMePage() {
	return <Layout title='About me - Nicolas Toulemont'>About me</Layout>
})

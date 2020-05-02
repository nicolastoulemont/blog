import Layout from '@components/Layout'
import { Bio } from 'layouts/me/Bio'
import { Tools } from 'layouts/me/Tools'
import { Me } from 'layouts/me/Me'

export default function AboutMePage() {
	return (
		<Layout title='About me - Nicolas Toulemont'>
			<Bio />
			<Me />
			<Tools />
		</Layout>
	)
}

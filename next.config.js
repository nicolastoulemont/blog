const path = require('path')
const withPWA = require('next-pwa')

const settings = {
	webpack(config, options) {
		;(config.resolve.alias['@components'] = path.join(__dirname, 'components')),
			(config.resolve.alias['@theme'] = path.join(__dirname, 'theme'))

		return config
	},
	env: {
		API_URL: 'https://nt-blog-cms.herokuapp.com'
	},
	pwa: {
		dest: 'public'
	}
}

module.exports = process.env.NODE_ENV !== 'production' ? settings : withPWA(settings)

const path = require('path')

module.exports = {
	webpack(config, options) {
		;(config.resolve.alias['@components'] = path.join(__dirname, 'components')),
			(config.resolve.alias['@theme'] = path.join(__dirname, 'theme'))

		return config
	},
	env: {
		API_URL: 'https://nt-blog-cms.herokuapp.com'
	}
}

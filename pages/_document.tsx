import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head />
				<body>
					<ColorModeScript initialColorMode='light' />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument

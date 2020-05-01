import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en' style={{ width: '100%', height: '100%' }}>
				<Head>
					<meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
					<meta
						name='viewport'
						content='initial-scale=1.0, width=device-width'
						key='viewport'
					/>
				</Head>
				<body style={{ width: '100%', height: '100%' }}>
					<style jsx global>
						{`
							#__next {
								height: 100%;
								width: 100%;
							}

							main {
								height: 100%;
								width: 100%;
								overflow: auto;
							}

							nav {
								height: 60px;
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						`}
					</style>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument

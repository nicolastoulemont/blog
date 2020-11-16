import React from 'react'

export default function GlobalStyles() {
	return (
		<style jsx global>
			{`
				* {
					box-sizing: border-box;
				}

				html,
				body,
				#__next {
					min-height: 100vh;
					height: auto;
					width: 100%;
				}

				main {
					height: 100%;
					width: 100%;
					overflow-y: auto;
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
	)
}

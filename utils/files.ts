import fs from 'fs'
import path from 'path'

export function getFilesPath(dir) {
	let files = fs.readdirSync(dir)
	// @ts-ignore
	files = files.map((file) => {
		const filePath = path.join(dir, file)
		const stats = fs.statSync(filePath)
		if (stats.isDirectory()) return getFilesPath(filePath)
		else if (stats.isFile()) return filePath
	})

	return files.reduce((all, folderContents) => all.concat(folderContents), []) as Array<string>
}

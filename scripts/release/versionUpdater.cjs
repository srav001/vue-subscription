const fs = require('fs');
const path = require('path');
const allowedTypes = ['1', '2', '3'];

/**
 * It takes the version number from the package.json file, increments it by one, and then updates the
 * package.json file with the new version number
 * @returns The version number is being returned.
 */
async function updateVersion() {
	try {
		const releaseFile = path.resolve('scripts/release/releaseData.json');
		const releaseData = JSON.parse(fs.readFileSync(releaseFile, { encoding: 'utf8' }));
		releaseData.onGoing = true;
		fs.writeFileSync(releaseFile, JSON.stringify(releaseData, null, 2));

		const fileToEdit = path.resolve('package.json');
		const editData = JSON.parse(fs.readFileSync(fileToEdit, { encoding: 'utf8' }));

		const type = process.argv[2].split('=')[1]; // type entered
		let { version } = editData;
		const versionData = version.split('.');

		if (!allowedTypes.includes(type)) console.error('Invalid Type!');
		else {
			const versionToUpdate = parseInt(versionData[type - 1]);
			const newVersion = versionToUpdate + 1;
			versionData[type - 1] = newVersion;
			version = versionData.join('.');
			editData.version = version;
			releaseData.version = version;
			fs.writeFileSync(releaseFile, JSON.stringify(releaseData, null, 2));

			return fs.writeFileSync(fileToEdit, JSON.stringify(editData, null, 2));
		}
	} catch (e) {
		console.error(e);
	}
}

updateVersion();

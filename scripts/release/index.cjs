const { execWithSync } = require('../utils.cjs');

async function gitUpdate() {
	try {
		const releaseFile = path.resolve('scripts/release/releaseData.json');
		const releaseData = JSON.parse(fs.readFileSync(releaseFile, { encoding: 'utf8' }));
		const version = releaseData.version;

		execWithSync(`git add .`);
		execWithSync(`git commit -m "chore: releasing version ${version}"`);
		execWithSync(`git tag ${version}`);
		// execWithSync(`git push origin ${version}`);

		return true;
	} catch (e) {
		console.error(e);
	}
}

async function npmRelease() {
	try {
		const releaseFile = path.resolve('scripts/release/releaseData.json');
		const releaseData = JSON.parse(fs.readFileSync(releaseFile, { encoding: 'utf8' }));

		execWithSync(`npm version`);
		execWithSync(`npm publish`);

		releaseData.onGoing = false;
		return fs.writeFileSync(releaseFile, JSON.stringify(releaseData, null, 2));
	} catch (e) {
		console.error(e);
	}
}

module.exports = {
	gitUpdate,
	npmRelease,
	release: () => {
		execWithSync('ls', { stdio: 'inherit' });
		console.log(true);
		return execWithSync('sh ./scripts/release/release.sh');
	}
};

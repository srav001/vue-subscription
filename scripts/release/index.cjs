const { execWithSync } = require('../utils.cjs');

async function gitUpdate() {
	try {
		const releaseFile = path.resolve('scripts/release/releaseData.json');
		const releaseData = JSON.parse(fs.readFileSync(releaseFile, { encoding: 'utf8' }));
		const version = releaseData.version;

		releaseData.onGoing = false;
		fs.writeFileSync(releaseFile, JSON.stringify(releaseData, null, 2));

		execWithSync(`git add .`);
		execWithSync(`git commit --allow-empty -m "chore: releasing version ${version}"`);
		execWithSync(`git tag ${version}`);
		execWithSync(`ggpush`);

		return true;
	} catch (e) {
		console.error(e);
	}
}

async function npmRelease() {
	try {
		execWithSync(`npm version`);
		execWithSync(`npm publish`);

		return true;
	} catch (e) {
		console.error(e);
	}
}

module.exports = {
	gitUpdate,
	npmRelease,
	release: () => execWithSync('sh ./scripts/release/release.sh')
};

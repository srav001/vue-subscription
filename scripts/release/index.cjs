const { execWithSync } = require('../utils.cjs');

async function gitUpdate() {
	try {
		const releaseFile = path.resolve('scripts/release/releaseData.json');
		const releaseData = JSON.parse(fs.readFileSync(releaseFile, { encoding: 'utf8' }));
		const version = releaseData.version;

		console.log(version);
		execWithSync(`git add .`);
		execWithSync(`git commit -m "feat: release scripts because I'm bored"`);
		// execWithSync(`git tag ${version}`);
		// execWithSync(`git push origin ${version}`);

		releaseData.onGoing = false;
		return fs.writeFileSync(releaseFile, JSON.stringify(releaseData, null, 2));
	} catch (e) {
		console.error(e);
	}
}

module.exports = {
	gitUpdate,
	release: () => {
		execWithSync('ls', { stdio: 'inherit' });
		console.log(true);
		return execWithSync('sh ./scripts/release/release.sh');
	}
};

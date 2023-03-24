const { execSync } = require('child_process');

/**
 * It installs the project dependencies, removes the husky config incase already installed, re-installs husky, and adds a
 * commit-msg hook that runs commitlint
 */
function projectSetup() {
	return execSync(
		`pnpm install && rm -rf .husky && npx husky install && npx husky add .husky/commit-msg 'npx --no -- commitlint --verbose --edit $1'`
	);
}

// House keeping
/**
 * It runs the prettier command on the src and scripts folders, and overwrites the files with the
 * formatted version
 */
function format() {
	return execSync('npx prettier ./src ./scripts -w');
}
/**
 * `lint` runs `eslint` on all `.js`, `.ts`, and `.vue` files in the `src` and `scripts` directories,
 * ignoring files in the `.gitignore` file, and fixes any errors it finds
 */
function lint() {
	return execSync('npx eslint ./src ./scripts --ext .vue,.js,.cjs,.ts --fix --ignore-path .gitignore');
}

module.exports = {
	projectSetup,
	format,
	lint
};

const { execSync } = require('child_process');

module.exports = {
	/**
	 * It executes a command with sync and prints the output to the console
	 */
	execWithSync: command => execSync(command, { stdio: 'inherit' })
};

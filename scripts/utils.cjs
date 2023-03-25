const { execSync } = require('child_process');

/**
 * It executes a command with sync and prints the output to the console
 */
const execWithSync = command => execSync(command, { stdio: 'inherit' });

module.exports = {
  execWithSync,
}
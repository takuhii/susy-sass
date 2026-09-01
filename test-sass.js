#!/usr/bin/env node

const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

console.log('Running Susy-sass tests...');

// Resolve the local `sass` binary from the sass devDependency.
function resolveSassBin() {
  const binName = process.platform === 'win32' ? 'sass.cmd' : 'sass';
  const localBin = path.join(__dirname, 'node_modules', '.bin', binName);
  if (fs.existsSync(localBin)) {
    return localBin;
  }
  throw new Error(
    'Could not find the `sass` binary. Run `npm install` to install devDependencies.'
  );
}

const sassBin = resolveSassBin();

function compile(entry, extraArgs = []) {
  // Compile to stdout; throws (non-zero exit) on Sass errors or @error.
  return execFileSync(
    sassBin,
    [entry, '--no-source-map', '--style=expanded', ...extraArgs],
    { encoding: 'utf8' }
  );
}

try {
  // 1. Assertion suite (sass-true) — verifies grid math and function output.
  // Runs the value-assertion subset (test-values.scss). The CSS
  // output-comparison tests are quarantined in test.scss pending a port to
  // sass-true 5.x's assert()/output()/expect() API.
  console.log('\n1. Running sass-true assertion suite (value assertions):');
  const suiteEntry = path.join(__dirname, 'test', 'scss', 'test-values.scss');
  const suiteOutput = compile(suiteEntry, [
    `--load-path=${path.join(__dirname, 'node_modules')}`,
  ]);

  // sass-true emits `@error` (non-zero exit) on a failing assertion. As an
  // extra guard, parse the summary and fail if any assertion did not pass.
  const failMatch = suiteOutput.match(/-\s*(\d+)\s+Failed/i);
  if (failMatch && Number(failMatch[1]) > 0) {
    process.stdout.write(suiteOutput);
    throw new Error(`sass-true reported ${failMatch[1]} failing assertion(s).`);
  }
  const passMatch = suiteOutput.match(/-\s*(\d+)\s+Passed/i);
  console.log(
    `✅ Assertion suite passed${passMatch ? ` (${passMatch[1]} tests)` : ''}!`
  );

  // 2. Legacy @import entry point compiles.
  console.log('\n2. Testing legacy @import syntax:');
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'susy-test-'));
  const legacyEntry = path.join(tmpDir, 'legacy.scss');
  fs.writeFileSync(
    legacyEntry,
    `@import "${path.join(__dirname, 'sass', 'susy')}";\n` +
      `.test-container { @include container(); }\n` +
      `.test-span { @include span(3 of 12); }\n`
  );
  compile(legacyEntry, ['--quiet']);
  console.log('✅ Legacy syntax test passed!');

  // 3. Modern @use entry point compiles.
  console.log('\n3. Testing modern @use syntax:');
  const modernEntry = path.join(tmpDir, 'modern.scss');
  fs.writeFileSync(
    modernEntry,
    `@use "${path.join(__dirname, 'sass', 'susy-modern')}" as susy;\n` +
      `.test-container { @include susy.container(); }\n` +
      `.test-span { @include susy.span(3 of 12); }\n`
  );
  compile(modernEntry, ['--quiet']);
  console.log('✅ Modern syntax test passed!');

  fs.rmSync(tmpDir, { recursive: true, force: true });

  console.log('\n✅ All tests passed!');
  console.log('Note: Deprecation warnings are expected with the legacy @import syntax.');
} catch (error) {
  console.error('\n❌ Test failed:');
  if (error.stdout) process.stdout.write(error.stdout);
  if (error.stderr) process.stderr.write(error.stderr);
  console.error(error.message);
  process.exit(1);
}

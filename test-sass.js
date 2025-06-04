#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Running Susy-sass tests...');

// Ensure the test/css directory exists
if (!fs.existsSync(path.join(__dirname, 'test', 'css'))) {
  fs.mkdirSync(path.join(__dirname, 'test', 'css'), { recursive: true });
}

try {
  // Install sass if not already installed
  console.log('Checking for sass installation...');
  try {
    execSync('which sass', { stdio: 'ignore' });
    console.log('sass is already installed.');
  } catch (error) {
    console.log('Installing sass...');
    execSync('npm install -g sass', { stdio: 'inherit' });
  }

  // Test the legacy @import syntax
  console.log('\n1. Testing legacy @import syntax:');
  const simplifiedTestPath = path.join(__dirname, 'test', 'scss', 'simple-test.scss');
  fs.writeFileSync(simplifiedTestPath, `
@import "../../sass/susy";

.test-container {
  @include container();
}

.test-span {
  @include span(3 of 12);
}
  `);

  execSync(`sass ${simplifiedTestPath} test/css/simple-test.css --style=expanded --quiet`, { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  console.log('✅ Legacy syntax test passed!');
  
  // Test the modern @use syntax
  console.log('\n2. Testing modern @use syntax:');
  const modernTestPath = path.join(__dirname, 'test', 'scss', 'modern-test.scss');
  fs.writeFileSync(modernTestPath, `
@use "../../sass/susy-modern" as susy;

.test-container {
  @include susy.container();
}

.test-span {
  @include susy.span(3 of 12);
}
  `);

  execSync(`sass ${modernTestPath} test/css/modern-test.css --style=expanded --quiet`, { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  console.log('✅ Modern syntax test passed!');
  
  console.log('\n✅ All tests passed! The library works with both @import and @use syntax.');
  console.log('Note: Deprecation warnings are expected with the legacy syntax but the code still works.');
  
} catch (error) {
  console.error('Test failed:', error.message);
  process.exit(1);
}

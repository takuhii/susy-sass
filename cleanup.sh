#!/bin/bash

# Remove Ruby-related files
echo "Removing Ruby-related files..."
rm -f Rakefile Gemfile Gemfile.lock susy.gemspec VERSION

# Remove Ruby lib files
echo "Removing Ruby lib files..."
rm -rf lib

# Remove old test configuration
echo "Removing old test configuration..."
rm -f test/config.rb test/Gemfile

# Clean up generated test files
echo "Cleaning up generated test files..."
rm -f test/scss/simple-test.scss test/scss/modern-test.scss
rm -f test/css/simple-test.css test/css/simple-test.css.map
rm -f test/css/modern-test.css test/css/modern-test.css.map

echo "Cleanup complete!"

#!/bin/bash

# Simple script to set up the basic folder structure and files for the portfolio website.

echo "Creating project structure..."

# Create directories
mkdir -p css js images data

echo "Created directories: css, js, images, data"

# Create basic HTML files
touch index.html about.html projects.html services.html speaking.html

# Add basic content placeholder to HTML files
echo "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Home</title><link rel=\"stylesheet\" href=\"css/style.css\"></head><body><h1>Home Page</h1><script src=\"js/main.js\"></script></body></html>" > index.html
echo "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>About</title><link rel=\"stylesheet\" href=\"css/style.css\"></head><body><h1>About Me</h1><a href=\"index.html\">Home</a></body></html>" > about.html
echo "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Projects</title><link rel=\"stylesheet\" href=\"css/style.css\"></head><body><h1>Projects</h1><div id=\"projects-list\"></div><a href=\"index.html\">Home</a><script src=\"js/main.js\"></script></body></html>" > projects.html
echo "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Services</title><link rel=\"stylesheet\" href=\"css/style.css\"></head><body><h1>Services</h1><a href=\"index.html\">Home</a></body></html>" > services.html
echo "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Speaking</title><link rel=\"stylesheet\" href=\"css/style.css\"></head><body><h1>Speaking Engagements</h1><div id=\"speaking-list\"></div><a href=\"index.html\">Home</a><script src=\"js/main.js\"></script></body></html>" > speaking.html

echo "Created HTML files: index.html, about.html, projects.html, services.html, speaking.html"

# Create CSS file
touch css/style.css
echo "/* Basic Styles */ body { font-family: sans-serif; }" > css/style.css
echo "Created CSS file: css/style.css"

# Create JS file
touch js/main.js
echo "// Main JavaScript file" > js/main.js
echo "Created JS file: js/main.js"

# Create JSON data files
touch data/projects.json
touch data/speaking.json
echo "[]" > data/projects.json # Start with an empty JSON array
echo "[]" > data/speaking.json # Start with an empty JSON array
echo "Created JSON files: data/projects.json, data/speaking.json"

# Create .gitignore file
touch .gitignore
echo "# OS generated files" > .gitignore
echo ".DS_Store" >> .gitignore
echo ".DS_Store?" >> .gitignore
echo "._*" >> .gitignore
echo ".Spotlight-V100" >> .gitignore
echo ".Trashes" >> .gitignore
echo "ehthumbs.db" >> .gitignore
echo "Thumbs.db" >> .gitignore
echo "" >> .gitignore
echo "# IDE files" >> .gitignore
echo ".idea/" >> .gitignore
echo "*.iml" >> .gitignore
echo ".vscode/" >> .gitignore
echo "" >> .gitignore
echo "# Node modules" >> .gitignore
echo "node_modules/" >> .gitignore
echo "" >> .gitignore
echo "# Optional build artifacts (if any)" >> .gitignore
# echo "dist/" >> .gitignore
# echo "build/" >> .gitignore

echo "Created .gitignore file"

echo "Project setup complete!"

# You can optionally copy the index.html content generated previously into the created index.html file.
# echo "NOTE: You might want to replace the placeholder index.html with the detailed one generated earlier."


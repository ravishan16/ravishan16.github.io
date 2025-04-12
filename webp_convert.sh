#!/bin/bash

# Define target directories
dirs=("images" "blog/images")

for dir in "${dirs[@]}"; do
  # Convert PNG/JPG images to WebP and compress to 80% JPG
  for img in "$dir"/*.{png,jpg,jpeg,PNG,JPG,JPEG}; do
    if [ -f "$img" ]; then
      name=$(basename "$img")
      name="${name%.*}"

      # Convert to WebP
      cwebp -q 80 "$img" -o "$dir/${name}.webp"

      # Compress to 80% JPG
      convert "$img" -quality 80 "$dir/${name}-compressed.jpg"
    fi
  done
done
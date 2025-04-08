#!/bin/bash

# Convert PNG/JPG images to WebP
for img in images/*.{png,jpg,jpeg,PNG,JPG,JPEG}; do
  if [ -f "$img" ]; then
    name=$(basename "$img")
    name="${name%.*}"
    cwebp -q 80 "$img" -o "images/${name}.webp"
  fi
done
import os
from PIL import Image

filename = 'logo-transparent-hq.png'
out_filename = 'logo-optimized.webp'

try:
    img = Image.open(filename)
    orig_size = os.path.getsize(filename)
    orig_w, orig_h = img.size
    
    # Target height for 2x retina display (max rendered height is 180px)
    target_h = 360
    
    if orig_h > target_h:
        # Calculate new width to maintain aspect ratio
        ratio = target_h / orig_h
        target_w = int(orig_w * ratio)
        
        # Resize
        resized_img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Save as WebP
        resized_img.save(out_filename, 'WEBP', quality=85, method=6)
        
        new_size = os.path.getsize(out_filename)
        new_w, new_h = resized_img.size
        
        print(f"ORIGINAL: {orig_w}x{orig_h}, {orig_size/1024:.2f} KB")
        print(f"NEW: {new_w}x{new_h}, {new_size/1024:.2f} KB")
        print(f"REDUCTION: {((orig_size - new_size)/orig_size)*100:.2f}%")
        print(f"WIDTH: {new_w}")
        print(f"HEIGHT: {new_h}")
    else:
        print("Image already smaller than target. Saving as WebP without resize.")
        img.save(out_filename, 'WEBP', quality=85, method=6)
        new_size = os.path.getsize(out_filename)
        print(f"ORIGINAL: {orig_w}x{orig_h}, {orig_size/1024:.2f} KB")
        print(f"NEW: {orig_w}x{orig_h}, {new_size/1024:.2f} KB")
        print(f"REDUCTION: {((orig_size - new_size)/orig_size)*100:.2f}%")
        print(f"WIDTH: {orig_w}")
        print(f"HEIGHT: {orig_h}")
except Exception as e:
    print("ERROR:", e)

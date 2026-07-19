from PIL import Image, ImageChops
import os

def trim(im):
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

paths = [
    "/home/sachin/.gemini/antigravity/brain/22fda459-1838-4c20-a4b6-55ee8d6e4dd5/road_anomaly_tile_v3_1778434067950.png",
    "/home/sachin/.gemini/antigravity/brain/22fda459-1838-4c20-a4b6-55ee8d6e4dd5/embedded_libs_tile_v3_1778434081831.png",
    "/home/sachin/.gemini/antigravity/brain/22fda459-1838-4c20-a4b6-55ee8d6e4dd5/gpu_clustering_minimalist_1778413945615.png",
    "/home/sachin/.gemini/antigravity/brain/22fda459-1838-4c20-a4b6-55ee8d6e4dd5/chaos_theory_simd_minimalist_1778414278715.png"
]

out_dir = "/home/sachin/Sachin_wrk/project_portfolio/src/assets/pics/"
out_names = [
    "road_anomaly_tile.png",
    "embedded_libs_tile.png",
    "gpu_clustering_tile.png",
    "chaos_theory_tile.png"
]

for p, out_name in zip(paths, out_names):
    if os.path.exists(p):
        im = Image.open(p)
        im = trim(im)
        # Add a small padding back for aesthetics
        width, height = im.size
        new_im = Image.new(im.mode, (width + 20, height + 20), im.getpixel((0,0)))
        new_im.paste(im, (10, 10))
        new_im.save(os.path.join(out_dir, out_name))
        print(f"Trimmed and saved {out_name}")

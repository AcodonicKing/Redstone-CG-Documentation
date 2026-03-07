from PIL import Image
import numpy as np

colors = [
    16777215, 16738335, 16711935, 10141901, 16776960,
    12582656, 16738740, 8421504, 13882323, 65535,
    10494192, 255, 9127187, 65280, 16711680
]

for i, color_int in enumerate(colors):
    filename = f"ui{i}.png"

    # Convert integer color to RGB (0-1)
    r = ((color_int >> 16) & 255) / 255.0
    g = ((color_int >> 8) & 255) / 255.0
    b = (color_int & 255) / 255.0
    color = np.array([r, g, b])

    # Print hex color
    print(f"{color_int} -> #{color_int:06X}")

    # Load image
    img = Image.open(filename).convert("RGBA")
    arr = np.array(img).astype(np.float32) / 255.0

    # Multiply RGB channels
    arr[..., :3] *= color

    # Convert back to image
    arr = np.clip(arr * 255, 0, 255).astype(np.uint8)
    result = Image.fromarray(arr, "RGBA")

    # Save (overwrite or change name if desired)
    result.save(filename)
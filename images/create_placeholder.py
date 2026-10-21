from PIL import Image, ImageDraw, ImageFont
import os

width = 800
height = 1200
img = Image.new('RGB', (width, height), color='#0f4c75')
draw = ImageDraw.Draw(img)

for y in range(height):
    r = int(15 + (50 - 15) * y / height)
    g = int(76 + (130 - 76) * y / height)
    b = int(117 + (184 - 117) * y / height)
    draw.line([(0, y), (width, y)], fill=(r, g, b))

try:
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 60)
    font_small = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 40)
except:
    font = ImageFont.load_default()
    font_small = font

draw.text((width//2, height//2 - 100), 'FOTO PROFIL', fill='white', font=font, anchor='mm')
draw.text((width//2, height//2), 'Almas Husni Adibah', fill='#e8a838', font=font_small, anchor='mm')
draw.text((width//2, height//2 + 80), '800x1200px', fill='white', font=font_small, anchor='mm')
draw.rectangle([(20, 20), (width-20, height-20)], outline='#e8a838', width=5)

img.save('profile.jpg', 'JPEG', quality=95)
print('Placeholder created!')
print('Size:', os.path.getsize('profile.jpg'), 'bytes')

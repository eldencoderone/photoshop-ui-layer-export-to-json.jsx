# Photoshop UI Layer Export to JSON

Export visible Photoshop layers (including nested groups) as structured JSON for UI design.  
Ideal for apps, games, frontend development, and UI/UX pipelines.

---

## 🧰 Step-by-Step Usage

### 🖥 Requirements

- Adobe Photoshop CC (tested on 2025)
- Basic layer naming (e.g. `btn_play`, `txt_title`, `icon_pdf`)

---

### 🚀 How to use

1. **Download the script**  
   Save `photoshop-ui-layer-export-to-json.jsx`

2. **Install it**  
   Copy the file to:  
   `C:\Program Files\Adobe\Adobe Photoshop 2025\Presets\Scripts\`

3. **Restart Photoshop**

4. **Open your PSD**  
   Make sure layers are visible and named properly

5. **Run the script**  
   Go to `File > Scripts > photoshop-ui-layer-export-to-json`

6. **Choose where to save** the `.json` file

---

### 📦 What it exports

Each visible layer (including inside groups):

```json
{
  "id": "btn_play",
  "type": "shape",
  "group": "UI_Main",
  "position": { "x": 300, "y": 500 },
  "size": { "width": 250, "height": 60 },
  "opacity": 100,
  "interactive": true,
  "action": "",
  "text": "",
  "font": ""
}
```

---

## ✅ Features

- ✅ Recursively reads layers inside groups
- ✅ Exports layer type, position, size, text, font and opacity
- ✅ Supports `text`, `image`, `shape`, and `other` types
- ✅ Outputs clean, structured and valid JSON

---

MIT License © 2025 eldencoder | [github.com/yourname](https://github.com/eldencoderon)

#!/usr/bin/env python3
"""Export the public portfolio routes as a standalone GitHub Pages snapshot."""

from __future__ import annotations

import os
import re
import shutil
import urllib.request
from pathlib import Path

PORT = os.environ.get("PORT", "3000")
ORIGIN = f"http://127.0.0.1:{PORT}"
BASE_PATH = "/yoojin-portfolio"
OUTPUT = Path("docs")
ROUTES = [
    ("", ""),
    ("projects/photowidget-save-conversion", "projects/photowidget-save-conversion"),
    ("projects/photowidget-widget-editor-v2", "projects/photowidget-widget-editor-v2"),
    ("projects/moneo-mobile-banking", "projects/moneo-mobile-banking"),
    ("projects/careflow-clinic-dashboard", "projects/careflow-clinic-dashboard"),
    ("projects/wayfinder-travel-web-service", "projects/wayfinder-travel-web-service"),
]


def fetch(path: str) -> bytes:
    with urllib.request.urlopen(f"{ORIGIN}/{path}", timeout=30) as response:
        return response.read()


def clean_html(html: str) -> str:
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.DOTALL | re.IGNORECASE)
    html = re.sub(r'<link\b[^>]+(?:as="script"|rel="preload"[^>]+as="script")[^>]*/?>', "", html, flags=re.IGNORECASE)

    media_names = set(re.findall(r"/api/media/file/([^?\"'\s]+)", html))
    assets_dir = OUTPUT / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    for name in media_names:
        target = assets_dir / name
        if not target.exists():
            target.write_bytes(fetch(f"api/media/file/{name}"))
        html = re.sub(
            rf"/api/media/file/{re.escape(name)}(?:\?[^\"'\s,]+)?",
            f"{BASE_PATH}/assets/{name}",
            html,
        )

    stylesheet_paths = set(re.findall(r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"', html))
    for stylesheet in stylesheet_paths:
        target = OUTPUT / stylesheet.lstrip("/")
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(fetch(stylesheet.lstrip("/")))
        html = html.replace(stylesheet, f"{BASE_PATH}{stylesheet}")

    html = re.sub(r'href="/projects/([^"#?]+)"', rf'href="{BASE_PATH}/projects/\1/"', html)
    html = html.replace('href="/#', f'href="{BASE_PATH}/#')
    html = html.replace('href="/"', f'href="{BASE_PATH}/"')
    if Path("public/favicon.png").exists():
        html = html.replace('href="/favicon.svg"', f'href="{BASE_PATH}/favicon.png"')
    else:
        html = re.sub(r'<link[^>]+rel="icon"[^>]*/?>', "", html)
    return html


def main() -> None:
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    (OUTPUT / ".nojekyll").write_text("")

    favicon = Path("public/favicon.png")
    if favicon.exists():
        shutil.copy2(favicon, OUTPUT / "favicon.png")

    home_html = ""
    for source, destination in ROUTES:
        html = clean_html(fetch(source).decode("utf-8"))
        target_dir = OUTPUT / destination
        target_dir.mkdir(parents=True, exist_ok=True)
        (target_dir / "index.html").write_text(html, encoding="utf-8")
        if not source:
            home_html = html

    (OUTPUT / "404.html").write_text(home_html, encoding="utf-8")
    print(f"Exported {len(ROUTES)} routes to {OUTPUT}/")


if __name__ == "__main__":
    main()

"""Gera o QR code do endereço final do site em PNG (alta resolução, para impressão).

Uso:
    pip install "qrcode[pil]"
    python ferramentas/gerar_qrcode.py https://SEU-USUARIO.github.io/conselho-tutelar-bh/

Saída: assets/qrcode.png (usado pelo cartaz.html)
"""
import sys
import json
from urllib.parse import urlsplit
from pathlib import Path

import qrcode

if len(sys.argv) != 2 or not sys.argv[1].startswith(("https://", "http://")):
    sys.exit("Informe o endereço completo do site. Ex.: python ferramentas/gerar_qrcode.py https://seu-usuario.github.io/conselho-tutelar-bh/")

url = sys.argv[1]
parsed = urlsplit(url)
if not parsed.hostname or parsed.username or parsed.password:
    sys.exit("Informe um endereço HTTP(S) válido, sem credenciais.")
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=20, border=4)
qr.add_data(url)
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")

destino = Path(__file__).resolve().parent.parent / "assets" / "qrcode.png"
destino.parent.mkdir(parents=True, exist_ok=True)
img.save(destino)
(destino.parent / "qrcode-config.js").write_text("window.QRCODE_URL = " + json.dumps(url, ensure_ascii=False) + ";\n", encoding="utf-8")
print(f"QR code salvo em {destino} apontando para {url}")

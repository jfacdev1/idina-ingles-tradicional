from flask import Flask, request, send_file
from gtts import gTTS
import os
import tempfile

app = Flask(__name__)

@app.route('/api/tts', methods=['POST'])
def text_to_speech():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        # Crear un archivo temporal para el audio
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as fp:
            # Generar el audio con gTTS
            tts = gTTS(text=text, lang='en')
            tts.save(fp.name)
            
            # Enviar el archivo de audio
            return send_file(
                fp.name,
                mimetype='audio/mpeg',
                as_attachment=True,
                download_name='speech.mp3'
            )
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(port=5000)

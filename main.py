from flask import Flask, render_template
from flask_socketio import SocketIO, emit

from dotenv import load_dotenv
import os
from pathlib import Path

# Initialization
PROJECT_DIR = Path(__file__).resolve().parent

if not os.path.exists(PROJECT_DIR / ".env"):
    from secrets import token_hex

    with open(PROJECT_DIR / ".env", "w") as f:
        f.write(f"SECRET_KEY={token_hex(64)}")

load_dotenv(PROJECT_DIR)

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
socketio = SocketIO(app)

# Routing
@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("message")
def on_message(data):
    print("Here:", data)
    emit("message", data, broadcast=True)


if __name__ == "__main__":
    app.run(debug=True, port=80)

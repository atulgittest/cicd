from flask import render_template, Flask, send_from_directory
from flask_cors import CORS


app = Flask(__name__)

app.config['SECRET_KEY'] = 'dZwwMGShspJPSCjuwty4nbGOQPlzhXcA#^b03h&y%S|2>vGyVr=e*@Z_b1<{'

CORS(app)



@app.route('/uploads/<path:filename>')
def download_file(filename):
    print("-called----------")
    return send_from_directory('./uploads/', filename)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == '__main__':
    # '0.0.0.0' = 127.0.0.1 i.e. localhost
    # port = 5000 : we can modify it for localhost
    app.run(host='0.0.0.0', port=5000, debug=True)  # local webserver : app.run()

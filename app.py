from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_geek():
    return '<h1>Hello from Flask & Docker This is my first Attemp now this port is running under 5000 port</h2>'


if __name__ == "__main__":
    app.run(debug=True)


from contextlib import redirect_stdout
# from crypt import methods
import json
import os
from flask import Flask, send_from_directory, jsonify

app = Flask(__name__, static_url_path='', static_folder='ui/build/')

@app.route('/', methods=['GET', 'POST'])
def index():
    return send_from_directory('ui/build/', 'index.html')

# @app.route('/projects')
# def index():
#     return send_from_directory('ui/build/', 'index.html')

@app.route('/projects/checkIn/<projectID>/<qty>', methods=["GET", "POST"])
def checkIn_hardware(projectID, qty):
    return jsonify(qty)

@app.route('/projects/checkOut/<projectID>/<qty>', methods=["GET", "POST"])
def checkOut_hardware(projectID, qty):
    # print(qty)
    # return 'Checked out'
    return jsonify(qty)

@app.route('/projects/join/<projectID>', methods=['GET', 'POST'])
def joinProject(projectID):
    return jsonify(projectID)

@app.route('/projects/leave/<projectID>', methods=['GET', 'POST'])
def leaveProject(projectID):
    return jsonify(projectID)
    
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
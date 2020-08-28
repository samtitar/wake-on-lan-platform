from flask import Flask, render_template, redirect, session, jsonify, request
from wakeonlan import send_magic_packet
import json, subprocess

systems, systems_info = {}, []
app_config = {}

with open('config.json') as file:
    app_config = json.load(file)

systems = app_config['systems']

app = Flask(__name__)
app.config['SECRET_KEY'] = app_config['secret']

# App routings
@app.route('/')
def index_page():
    return render_template('index.html')
    
@app.route('/systems')
def systems_page():
    if 'AUTH' in session and session['AUTH']:
        return render_template('systems.html')
    else:
        return redirect('/')

# App endpoints
@app.route('/login', methods=['POST'])
def login():
    password = request.form['password']
    if password == app_config['password']:
        session['AUTH'] = True
        return jsonify(success=True)
    return jsonify(success=False)

@app.route('/get_systems', methods=['GET'])
def get_systems():
    result = []
    for system in systems:
        status = subprocess.call(['ping', '-c', '1', systems[system]['host']]) == 0
        status_str = 'active' if status else 'inactive'
        result.append({ 'name': systems[system]['name'], 'status': status_str })
    return jsonify(result)

@app.route('/boot_system', methods=['GET'])
def boot_system():
    system_id = request.args['system_id']
    system_mac = systems[system_id]['MAC']
    send_magic_packet(system_mac)
    return jsonify(success=True)

# @app.route('/shut_system', methods=['GET'])
# def shut_system():
#     system_id = request.args['system_id']
#     return jsonify(success=True)

if __name__ == "__main__":
    app.run('0.0.0.0', debug=True)
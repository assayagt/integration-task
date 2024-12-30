from flask import Flask, request
from jira import JIRA

app = Flask(__name__)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    try:
        jira = JIRA(server="https://tassayag.atlassian.net", basic_auth=(data['email'], data['api_token']))
        return {"status": "success"}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 400
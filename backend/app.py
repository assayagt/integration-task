from flask import Flask, request, jsonify
from jira import JIRA
from flask_cors import CORS
from requests import HTTPError

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    try:
        server = data.get('server')
        if not server:
            return {"status": "error", "message": "Server domain is required"}, 400
        
        jira = JIRA(options={'server': server},
                    basic_auth=(data['email'], data['api_token']))
        
        user = jira.myself()
        
        return {"status": "success", "message": f"Logged in as {user['displayName']}"}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 400

@app.route('/api/create', methods=['POST'])
def create_ticket():
    data = request.json
    try:
        server = data.get('server')
        if not server:
            return {"status": "error", "message": "Server domain is required"}, 400

        jira = JIRA(options={'server': server},
                    basic_auth=(data['email'], data['api_token']))
        
        issue_dict = {
            'project': {'id': data['project_id']},
            'summary': data['title'],
            'description': data['description'],
            'issuetype': {'name': 'Task'},
            'customfield_10037': int(data['occurrences']),
        }

        new_issue = jira.create_issue(fields=issue_dict)

        ticket_url = f'{server}/browse/{new_issue.key}'
        return {"status": "success", "ticketUrl": ticket_url}, 200

    except HTTPError as e:
        return {"status": "error", "message": str(e)}, 400

if __name__ == '__main__':
    app.run(debug=True)

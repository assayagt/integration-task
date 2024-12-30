from flask import Flask, request, session
from jira import JIRA
from flask_cors import CORS
from requests import HTTPError

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    try:
        
        # Initialize the JIRA object
        jira = JIRA(options={'server': 'https://tassayag.atlassian.net'},
                    basic_auth=(data['email'], data['api_token']))
        
        # Test the connection
        user = jira.myself()
        
        return {"status": "success", "message": f"Logged in as {user['displayName']}"}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 400


@app.route('/api/create', methods=['POST'])
def create_ticket():
    data = request.json

    print(data)
    try:
        jira = JIRA(options={'server': 'https://tassayag.atlassian.net'},
                    basic_auth=(data['email'], data['api_token']))
        

        issue_dict = {
            'project': {'id': data['project_id']},
            'summary': data['title'],
            'description': data['description'],
            'issuetype': {'name': 'Task'},
            'customfield_10037': int(data['occurrences']),
        }

        new_issue = jira.create_issue(fields=issue_dict)

        ticket_url = f'https://tassayag.atlassian.net/browse/{new_issue.key}'
        return {"status": "success", "ticketUrl": ticket_url}, 200

    except HTTPError as e:
        print(e.response.text)


if __name__ == '__main__':
    app.run(debug=True)
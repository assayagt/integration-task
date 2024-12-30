from flask import Flask, request
from jira import JIRA
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    try:
        jira = JIRA(options={'server': 'https://tassayag.atlassian.net'}, basic_auth=(data['email'], data['api_token']))
        user = jira.myself()
        return {"status": "success"}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 400


@app.route('/api/create', methods=['POST'])
def create_ticket():
    print("hellssso")
    data = request.json
    try:
        jira = JIRA(options={'server': 'https://tassayag.atlassian.net'},
                    basic_auth=(data['email'], data['api_token']))
        
        new_issue = jira.create_issue(
            project=data['project_id'],
            summary=data['title'],
            description=data['description'],
            issuetype={'name': 'Task'},  # You can change the issue type to "Bug", "Story", etc.
        )

        # You can return the URL of the created ticket
        ticket_url = f'https://tassayag.atlassian.net/browse/{new_issue.key}'

        return {"status": "success", "ticketUrl": ticket_url}, 200

    except Exception as e:
        return {"status": "error", "message": str(e)}, 400


if __name__ == '__main__':
    app.run(debug=True)

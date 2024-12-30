from flask import Flask, request
from jira import JIRA
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    try:
        jira = JIRA(options={'server': 'https://tassayag.atlassian.net'},basic_auth=(data['email'], data['api_token']))
        return {"status": "success"}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 400
    
if __name__ == '__main__':
    app.run(debug=True)
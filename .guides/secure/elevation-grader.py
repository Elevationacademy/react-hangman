import os
import random
import requests
import json
import datetime

# import grade submit function
import sys
sys.path.append('/usr/share/codio/assessments')
from lib.grade import send_grade

####################
# Helper functions #
####################


# Get the url to send the results to
CODIO_AUTOGRADE_URL = os.environ["CODIO_AUTOGRADE_URL"]
CODIO_UNIT_DATA = os.environ["CODIO_AUTOGRADE_ENV"]

# Mock Data
# CODIO_UNIT_DATA = {
#   "assessments": {
#     "stats": {
#       "total": 2,
#       "answered": 2,
#       "correct": 2,
#       "totalPoints": 12,
#       "points": 8
#     },
#     "info": [{
#       "name": "Test 1",
#       "points": 5,
#       "answer": {
#         "correct": True,
#         "points": 5
#       }
#     }, {
#       "name": "Test 2",
#       "points": 7,
#       "answer": {
#         "correct": True,
#         "points": 3
#       }
#     }]
#   },
#   "completedDate": "2017-02-07T09:47:54.471Z"
# }

def main():
  # Execute the test on the student's code
  grade = validate_code()
  # Send the grade back to Codio with the penatly factor applied
  res = send_grade(int(round(grade)))
  exit( 0 if res else 1)

# ELEVATION ACADEMY GRADER IMPLEMENTATION *
# If the assessment has a points value of 999 it will be skipped when assessing
# this is done to allow pass/fail values for the lesson only based on the practical exercises
def validate_code():
  grade = 100;
  assignments = json.loads(CODIO_UNIT_DATA)['assessments']['info']
  for assignment in assignments:
      if assignment['points'] != 999:
        if assignment['answer']['correct'] == False:
          grade = 0;
  return grade;      

main()
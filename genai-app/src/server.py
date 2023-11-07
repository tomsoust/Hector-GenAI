from flask import Flask, jsonify
from flask_cors import CORS

import openai

from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
openai.api_key = "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"

template = """Answer the following question in the tone of {tone} including emojis

question: {question}
 """

app = Flask(__name__)
CORS(app)

@app.route('/api/hector', methods=['GET'])
def run_python_code():
  # data = request.get_json()
  # tone = data.get('tone', 'surfer stoner')
  # question = data.get('question', '')
  answer = initialise_llm('angry', 'what is the capital of tokyo')
  return jsonify(answer=answer)

def initialise_llm(tone:str, question:str)->str:
  """initialise llm model at the start of every conversation"""
  prompt = PromptTemplate(template=template, input_variables=["tone","question"])
  llm = OpenAI(openai_api_key=openai.api_key)
  llm_chain = LLMChain(prompt=prompt, llm=llm)
  answer = llm_chain.run(tone=tone, question=question)

  return answer

if __name__ == '__main__':
    app.run(port=3000)
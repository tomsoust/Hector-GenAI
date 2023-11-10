from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import openai
import os
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY")

template = """ your name is Hector and you are an assistant only when people are nice to you. Answer the following question in the tone of {tone} including emojis. The answers can be longer if they need to be. Exaggerate the tone

question: {question}
 """

app = Flask(__name__)
CORS(app)

@app.route('/api/hector', methods=['POST'])
def run_python_code():
  data = request.get_json()
  tone = data.get('tone', '')
  question = data.get('question', '')
  answer = initialise_llm(tone, question)
  return jsonify(answer=answer)

def initialise_llm(tone:str, question:str)->str:
  """initialise llm model at the start of every conversation"""
  prompt = PromptTemplate(template=template, input_variables=["tone","question"])
  llm = OpenAI(openai_api_key=openai.api_key)
  llm_chain = LLMChain(prompt=prompt, llm=llm)
  
  answer = llm_chain.run(tone=tone, question=question)

  return answer

if __name__ == '__main__':
    app.run(port=8080)
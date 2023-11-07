from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai

from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Set the OpenAI API key
load_dotenv()
openai.api_key = "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"

template = """Answer the following question in the tone of {tone} including emojis

question: {question}
 """

app = Flask(__name__)
CORS(app)

@app.route('/run_python_code', methods=['POST'])
def run_python_code():
    data = request.get_json()
    tone = data.get('tone', 'surfer stoner')
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

# Initialize an empty conversation
conversation_history = ""

while True:
    # Get user input
    user_input = input("You: ")

    # Break the loop if the user wants to end the conversation
    if user_input.lower() == "exit":
        break

    # Update the conversation history with the user input
    conversation_history = f"You: {user_input}\n"

    # Call the OpenAI API and generate a response
    response = initialise_llm(tone="surfer stoner", question=conversation_history)


    # Print the AI's response
    print(f"Bot: {response}\n")


if __name__ == '__main__':
    app.run(port=3000)
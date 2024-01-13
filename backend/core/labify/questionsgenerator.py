from openai import OpenAI
import os
from PyPDF2 import PdfReader
import json

# Replace with your OpenAI API key and organization
API_KEY = "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"
ORGANIZATION = "org-enNCXYBRCkvfwgxpHaLPI8cW"

client = OpenAI(api_key=API_KEY, organization=ORGANIZATION)

def generate_questions_from_pdf(pdf_path, question_count=5, difficulty='medium', char_limit=80):
    """
    Generate multiple-choice questions from a PDF file.

    Parameters:
    - pdf_path (str): Path to the PDF file.
    - question_count (int): Number of questions to generate.
    - difficulty (str): Difficulty level ('easy', 'medium', 'hard').
    - char_limit (int): Character limit for the report topic.

    Returns:
    - json_data (str): JSON-formatted string containing generated questions and answers.
    """
    with open(pdf_path, 'rb') as file:
        pdf_reader = PdfReader(file)
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            text += pdf_reader.pages[page_num].extract_text()

    # Extract a short topic from the PDF content
    report_topic = text[:char_limit]

    # Generate questions using OpenAI GPT-3 API
    prompt = f"""Give me {question_count} multiple choice questions about {report_topic}. The questions should be at a {difficulty} level. Return your answer entirely in the form of a JSON object. The JSON object should have a key named "questions" which is an array of the questions. Each quiz question should include the choices, the answer, and a brief explanation of why the answer is correct. Don't include anything other than the JSON. The JSON properties of each question should be "query" (which is the question), "choices", "answer", and "explanation". The choices shouldn't have any ordinal value like A, B, C, D or a number like 1, 2, 3, 4. The answer should be the 0-indexed number of the correct choice."""
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt},
        ]
    )
    json_data = completion.choices[0].message.content

    return json_data


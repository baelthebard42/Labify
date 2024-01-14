from openai import OpenAI
import os
from PyPDF2 import PdfReader
import json
client = OpenAI(api_key="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", organization="org-enNCXYBRCkvfwgxpHaLPI8cW")

## Constants
REPORT_TOPIC = "Transducer"
achieved_marks = ''
folder_path = "Reports" 
pdf_list = ["078bct001", "078bct002", "078bct003", "078bct004"]

def grade_pdf(prompt):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt},
        ]
    )
    json_data = completion.choices[0].message.content
    return json_data





def read_pdf(file_path):
    with open(file_path, 'rb') as file:
        pdf_reader = PdfReader(file)
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            text += pdf_reader.pages[page_num].extract_text()
        return text

def read_selected_pdfs(folder_path, pdf_list):
    list_of_marks = []
    for pdf_filename in pdf_list:
        pdf_path = os.path.join(folder_path, pdf_filename + ".pdf")
        
        if os.path.exists(pdf_path):
            pdf_text = read_pdf(pdf_path)
            
          
            prompt = f"""Grade the {pdf_text} strictly on the basis of relevance 
            with the topic  name {REPORT_TOPIC} out of 5. Return your answer entirely as a well-formated
            JSON object. Assign a score of 0 if the content is out of the topic,
                even if it is grammatically correct. The JSON object should have a key named {pdf_filename} and achieved
              marks as the value. Give 4 or higher only if it is exactly relevent to topic"""
            achieved_marks = grade_pdf(prompt=prompt)
            achieved_marks = json.loads(achieved_marks)
            print(achieved_marks)
             
            
            list_of_marks.append(achieved_marks)

            
    
            
            
        else:
            achieved_marks = {pdf_filename: 0}
            list_of_marks.append(achieved_marks)
        output_file_path = "marks.json"
        with open(output_file_path, "w") as output_file:
            json.dump(list_of_marks, output_file)


            
        



read_selected_pdfs(folder_path, pdf_list)

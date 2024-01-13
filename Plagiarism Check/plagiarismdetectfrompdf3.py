from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.probability import FreqDist
import math
import PyPDF2
def preprocess_text(text):
    words= word_tokenize(text.lower())
    stop_words = set (stopwords.words('english'))
    words= [word for word in words 
             if word.isalnum() and 
             word not in stop_words]
    stemmer= PorterStemmer()
    words= [stemmer.stem(word) for word in words]
    return words

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        pdf_reader= PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            text= text+pdf_reader.pages[page_num].extract_text()
    return text

def cosine_similarity (text1, text2):
    words1 = preprocess_text(text1)
    words2 = preprocess_text(text2)
    freq_dist1= FreqDist(words1)
    freq_dist2= FreqDist(words2)
    dot_product=sum(freq_dist1[key] * freq_dist2[key] 
                    for key in set(freq_dist1) and
                    set(freq_dist2))
    magnitude1 = math.sqrt (sum(freq_dist1[key] **2 for key in freq_dist1))
    magnitude2= math.sqrt(sum (freq_dist2[key]**2 for key in freq_dist2))
    similarity = dot_product /(magnitude1*magnitude2) if magnitude1*magnitude2 != 0 else 0
    return similarity

def compare_with_past_reports (submitted_report, past_reports, threshold=0.8):
    highest_similarity = 0.0
    for id, past_report in enumerate(past_reports, start=1):
        similarity =cosine_similarity (submitted_report,past_report)
        if similarity> threshold and similarity> highest_similarity:
            highest_similarity= similarity
    if highest_similarity> 0:
        return highest_similarity*100
    else:
        return False

submitted_report_pdf = "E:\\Pdfs for Plagiarism\\NLP submitted 1.pdf"
past_reports_pdf= ["E:\\Pdfs for Plagiarism\\NLP past 1.pdf","E:\\Pdfs for Plagiarism\\NLP past 2.pdf"]

submitted_report_text= extract_text_from_pdf(submitted_report_pdf)
past_reports_text= [extract_text_from_pdf(pdf_path) for pdf_path in past_reports_pdf]

similarity_score= compare_with_past_reports(submitted_report_text, past_reports_text)
# if isinstance(similarity_score, float):
#     print(f"{similarity_score:.2f}%")
# elif isinstance(similarity_score, bool):
#     print(similarity_score)

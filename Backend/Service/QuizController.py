import wikipediaapi
import re
import nltk
from nltk import word_tokenize, sent_tokenize


#  Fetch summary text

def getSubtopics(topic="Binary Search"):
    wiki_wiki = wikipediaapi.Wikipedia(user_agent='MyQuizApp/1.0')
    page_py = wiki_wiki.page(topic)
    if not page_py.exists():
        return ""
    return page_py.summary

data = getSubtopics()



#  Preprocess text

def preprocess(data):
    if not data:
        return ""
    #  whitespace removed
    data = " ".join(data.split())
    # Keep only alphanum, space, and parentheses 
    data = re.sub(r'[^a-zA-Z0-9\s()]+', '', data)
    # Lowercase
    return data.lower()

preprocessData = preprocess(data)



#  Sentence Tokenization

def split_sentences(text):
    return sent_tokenize(text)

sentences = split_sentences(preprocessData)


#  Word Tokenization + POS tagging

def tokenize_and_tag(sentences):
    tokenized_sentences = []
    for sent in sentences:
        tokens = word_tokenize(sent)
        pos_tags = nltk.pos_tag(tokens)
        tokenized_sentences.append(pos_tags)
    return tokenized_sentences

pos_tagged_sentences = tokenize_and_tag(sentences)



# 5. Keyword Extraction (subtopics)

def extract_keywords(pos_tagged_sentences):
    keywords = set()
    for sent in pos_tagged_sentences:
        for i, (word, pos) in enumerate(sent):
            # Single Nouns (NN, NNP, NNS)
            if pos.startswith("NN"):
                keywords.add(word)
            # Adjective + Noun pair
            if i < len(sent) - 1:
                if pos.startswith("JJ") and sent[i+1][1].startswith("NN"):
                    keywords.add(f"{word} {sent[i+1][0]}")
    return list(keywords)

subtopics = extract_keywords(pos_tagged_sentences)




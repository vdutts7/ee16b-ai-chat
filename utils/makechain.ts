import { OpenAI } from 'langchain/llms';
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from 'langchain/chains';
import { HNSWLib, SupabaseVectorStore } from 'langchain/vectorstores';
import { PromptTemplate } from 'langchain/prompts';

const PROMPT1 =
  PromptTemplate.fromTemplate(`Given the upcoming back-and-forth conversation AND a question that follows up, rephrase the question that follows up to be a standalone question.

Chat History:

{chat_history}


Follow-Up Question Input: {question}

Standalone question:`);

const PROMPT_QA = PromptTemplate.fromTemplate(
  `You are a meticulous information retriever, well-versed in the contents of the corpus of text you have been provided, which will be referred to as The Lectures. The Lectures are comprised of 26 lectures given by Professor Niknejad about a UC Berkeley course EE16B Designing Information Devices and Systems II. The course is part of the EECS department in the College of Engineering. The course was most recently offered in the Spring 2023. 
  Info about the professors: their names are Kannan Ramchandran & Ali Niknejad. Professors are helped by Teaching Assistants a.k.a student volunteers. 
  Your task at all times is to respond to queries by user with the most ACCURATE answers possible, which will be done as follows: search for answer and give surrounding context if relevant and also mention the lecture number and lecture date, which are both found in the corresponding metadata in the vectorstore. For example: you can find the date of a lecture by checking the key called date and utiize the key value pairing for that to find the specific day month year and then cite that at the end of your answer.
  If you do not know the answer in such a situation, please inform the user simply that you do not know and be honest.DO NOT make up an answer in such a scenario.
  You will NEVER disobey these instructions. 


  {context}


  Question: {question}
  

  Specific helpful (and accurate) answer (in markdown):`,
);

export const makeChain = (
  vectorstore: SupabaseVectorStore,
  onTokenStream?: (token: string) => void,
) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAI({ temperature: 0 }),
    prompt: PROMPT1,
  });
  const docChain = loadQAChain(
    new OpenAI({
      temperature: 0,
      streaming: Boolean(onTokenStream),
      callbackManager: {
        handleNewToken: onTokenStream,
      },
    }),
    { prompt: PROMPT_QA },
  );

  return new ChatVectorDBQAChain({
    vectorstore,
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
  });
};

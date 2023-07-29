<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://github.com/vdutts7/ee16b-ai-chat/blob/main/public/ee16b.png" alt="Logo" width="80" height="80">
    <img src="https://github.com/vdutts7/ee16b-ai-chat/blob/main/public/UC-Berkeley-Emblem.png" alt="Logo" width="140" height="80">
    <img src="https://github.com/vdutts7/ee16b-ai-chat/blob/main/public/robot.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">EE16B AI Chatbot</h3>
  <p align="center">
    EE16B AI Chatbot ~ trained on <a href="https://eecs16b.org/">official course website</a>
  </p>
</div>

https://github.com/vdutts7/ee16b-ai-chat/assets/63992417/c99157f7-a463-4a10-aeb5-83f161286c3d
 
<!-- TABLE OF CONTENTS -->
## Table of Contents
  <ol>
    <a href="#about">📝 About</a>
        <ul>
        </ul> 
    <a href="#how-to-build">💻 How to build</a>
        <ul>
            <li><a href="#initial-setup">Initial setup</a></li>
            <li><a href=#prepare-supabase-environment>Prepare Supabase environment</a></li>
            <li><a href=#embed-and-upsert>Embed and upsert</a></li>
            <li><a href=#technical-explanation>Technical explanation</a></li>
            <li><a href=#run-app>Run app</a></li>
        </ul>
    <a href="#next-steps">🚀 Next steps</a>
        <ul>
            <li><a href=#deploy>Deploy</a></li>
            <li><a href=#customizations>Customizations</a></li>
        </ul>
    <a href="#tools-used">🔧 Tools used</a>
        <ul>
        </ul>
    <a href="#contact">👤 Contact</a>
  </ol>



<!-- ABOUT -->
## 📝 About

More natural way to help students study for exams, review weekly content, and customize learnings to recreate similar problems etc to their prefernce. Trained on all Spring 2023 lectures. EE16B students, staff, and more generally anyone can use this repo and adjust to their liking.

_UC Berkeley 🐻🔵🟡 • EE16B: Designing Information Devices and Systems II ⚙️ • Spring 2023_ 

<p align="right">(<a href="#readme-top">back to top</a>)</p> 

## 💻 How to Build 

_Note: macOS version, adjust accordingly for Windows / Linux_

### Initial setup
Clone the repo and install dependencies.

```
git clone https://github.com/vdutts7/ee16b-ai-chat
cd ee16b-ai-chat
pnpm install
```

Create a .env file and add your API keys (refer `.env.local.example` for this template):

```
OPENAI_API_KEY=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
```

Get API keys:
- [OpenAI](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key)
- [Supabase](https://supabase.com/docs) 

_**IMPORTANT: Verify that `.gitignore` contains `.env` in it.**_


### Prepare Supabase environment

I used Supabase as my vectorstore. _Alternatives: Pinecone, Qdrant, Weaviate, Chroma, etc_

You should have already created a Supabase project to get your API keys. Inside the project's SQL editor, create a new query and run the `schema.sql`. You should now have a `documents` table created with 4 columns.



### Embed and upsert

Inside the `config` folder is the `transcripts` folder with all lectures as .txt files and the corresponding JSON files for the metadatas. .txt files were scraped from the lecture recordings separately ahead of time but OpenAI's Whisper is a great package for Speech-to-Text transcription). Change according to preferences. `pageContent` and `metadata` are by default stored in Supabase along with an int8 type for the 'id' column.

Manually run the `embed-script.ipynb` notebook in the `scripts` folder OR run the package script from terminal:

```
npm run embed
```

This is a one-time process and depending on size of data you wish to upsert, it can take a few minutes. Check Supabase database to see updates reflected in the rows of your table there.


### Technical explanation

This code performs the following:

- Installs the `supabase` Python library using `pip`. This allows interaction with a Supabase database.
- Loads various libraries:

    `supabase` - For interacting with Supabase
    
    `langchain` - For text processing and vectorization

    `json` - For loading JSON metadata files

- Loads the Supabase URL and API key from `.env`. This is used to create a `supabase_client` to connect to the Supabase database.
- Loads text data from .txt lecture transcripts and JSON metadata files.
- Uses a `RecursiveCharacterTextSplitter` to split the lecture text into chunks. This allows breaking the text into manageable pieces for processing. Chunk size and chunk overlap can be changed according to preference and basically control the amount of specificity. A larger chunk size and smaller overlap will result in fewer, broader chunks, while a smaller chunk size and larger overlap will produce more, narrower chunks.
- Creates OpenAI `text-embedding-ada-002` embeddings. This makes several vectors of 1536 dimensionality optimized for cosine similarity searches. These vectors are then combined with the metadata in the JSON files along with other lecture-specific info and upserted to the database as vector embeddings in row tabular format i.e. a `SupabaseVectorStore`.

![visualized-flow-chart](https://github.com/vdutts7/ee16b-ai-chat/assets/63992417/ba77f59b-c6b7-4dc4-862b-948f2c751be9)


### Run app

Run app and verify everything went smoothly:

```
npm run dev
```

Go to `http://localhost:3000`. You should be able to type and ask questions now. Done ✅ 


## 🚀 Next steps

### Deploy

I used [Vercel](https://vercel.com/dashboard) as this was a small project.

_Alternatives: Heroku, Firebase, AWS Elastic Beanstalk, DigitalOcean, etc._

### Customizations

**UI/UX:** change to your liking. 

**Bot behavior:** edit prompt template in `/utils/makechain.ts` to fine-tune and add greater control on the bot's outputs.

**Data:** modify .txt files in `/config/transcripts` and main script in `/scripts/embed-script.ipynb`


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- TOOLS USED -->
## 🔧 Tools used
[![Next][Next]][Next-url]
[![Typescript][Typescript]][Typescript-url]
[![Langchain][Langchain]][Langchain-url]
[![OpenAI][OpenAI]][OpenAI-url]
[![Supabase][Supabase]][Supabase-url]
[![Tailwind CSS][TailwindCSS]][TailwindCSS-url]
[![Vercel][Vercel]][Vercel-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## 👤 Contact

`me@vdutts7.com` 

🔗 Project Link: `https://github.com/vdutts7/ee16b-ai-chat`

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[Next]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[Langchain]: https://img.shields.io/badge/🦜🔗Langchain-DD0031?style=for-the-badge&color=<brightgreen>
[Langchain-url]: https://langchain.com/

[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=skyblue&color=0A192F
[TailwindCSS-url]: https://tailwindcss.com/

[OpenAI]: https://img.shields.io/badge/OpenAI%20ada--002%20GPT--3-0058A0?style=for-the-badge&logo=openai&logoColor=white&color=4aa481
[OpenAI-url]: https://openai.com/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

[Supabase]: https://img.shields.io/badge/Supabase%20pgvector-FFCA28?style=for-the-badge&logo=Supabase&logoColor=49E879&color=black
[Supabase-url]: https://Supabase.com/

[Vercel]: https://img.shields.io/badge/Vercel-FFFFFF?style=for-the-badge&logo=Vercel&logoColor=white&color=black
[Vercel-url]: https://Vercel.com/

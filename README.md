<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://github.com/vdutts7/ee16b-ai-chat/blob/main/public/ee16b.png" alt="Logo" width="80" height="80">
    <img src="https://github.com/vdutts7/ee16b-ai-chat/blob/main/public/UC-Berkeley-Emblem.png" alt="Logo" width="140" height="80">
  </a>
  <h3 align="center">EE16B AI Chat</h3>
  <p align="center">
    EE16B AI Chatbot ~ trained on the official course website
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About</a>
      <ul>
        <li><a href="#built-with">Built With/a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT -->
## About

Trained on [main course website](https://eecs16b.org/) • UC Berkeley • EE16B: Designing Information Devices and Systems II • Spring 2023 

<p align="right">(<a href="#readme-top">back to top</a>)</p> 

### How to Build (macOS, adjust accordingly for Windows / Linux)

Clone this repo & install packages using pnpm

```
git clone [https://github.com/vdutts7/ee16b-ai-chat]
cd ee16b-ai-chat
pnpm install
```

### Setup `.env` file

Copy `.env.local.example` into `.env` which should look like this (order doesn't matter):

```
OPENAI_API_KEY=""

NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""

```

Check out [OpenAI](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) on how to get an API key

Check out [Supabase](https://supabase.com/) on how to create a new project, database, and get keys from settings all found in [docs instructions](https://supabase.com/docs)

**IMPORTANT: Verify that `.gitignore` contains `.env` in it.**


### Prepare Supabase environment

I used Supabase as my vectorstore. Alternatives include: FAISS, Chroma, Nuclei, Pinecone, Milvus, and many more you can research about. Most are free or open-source. 

Copy paste contents of `schema.sql` in SQL editor of Supabase. Ensure the `documents` table in Supabase's database that is created matches and corresponds with local file's `match_documents` function.


### Embedding & upserting data into Supabase vectorstore

Inside the `config` folder is the `transcripts` folder with all lectures as .txt files and the corresponding JSON files for the metadatas. .txt files were scraped from the lecture recordings separately ahead of time but OpenAI's Whisper is a great package for Speech-to-Text transcription). Change according to preferences. `pageContent` and `metadata` are by default stored in Supabase along with an int8 type for the 'id' column.

Manually run the `embed-scripts.ipynb` notebook in the `scripts` folder OR run the package script from terminal:

```
`npm run embed`
```

This is a one-time process and depending on size of data you wish to upsert, it can take a few minutes. Check Supabase database to see updates reflected in the rows of your table there.


### Behind-the-scenes: script explained

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


### Run the app

Run app and verify everything went smoothly:

```
`npm run dev'
```

Should be able to type and ask questions now as you will any other chatbot.


### Customizations

Change UI to your liking. 
Edit prompt template in `utils/makechain.ts` to fine-tune and add greater control on bot's outputs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- BUILT WITH -->
## Built With
* [![Next][Next]][Next-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Langchain][Langchain]][Langchain-url]
* [![OpenAI][OpenAI]][OpenAI-url]
* [![Supabase][Supabase]][Supabase-url]
* [![Tailwind CSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

<u>me @ vdutts7.com</u>

Project Link: [https://github.com/vdutts7/ee16b-ai-chat](https://github.com/vdutts7/ee16b-ai-chat)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[Next]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Langchain]: https://img.shields.io/badge/🦜🔗Langchain-DD0031?style=for-the-badge&color=<brightgreen>
[Langchain-url]: https://langchain.com/

[Svelte]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/

[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=skyblue&color=0A192F
[TailwindCSS-url]: https://tailwindcss.com/

[OpenAI]: https://img.shields.io/badge/OpenAI%20ada--002%20GPT--3-0058A0?style=for-the-badge&logo=openai&logoColor=white&color=black
[OpenAI-url]: https://openai.com/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

[Supabase]: https://img.shields.io/badge/Supabase%20pgvector-FFCA28?style=for-the-badge&logo=Supabase&logoColor=49E879&color=black
[Supabase-url]: https://Supabase.com/

[Weights and Biases]: https://img.shields.io/badge/Weights%20%26%20Biases-FFBE00?style=for-the-badge&logo=weightsandbiases&logoColor=black
[wandb-url]: https://wandb.ai/site

[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/

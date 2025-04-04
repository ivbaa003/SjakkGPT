# SjakkGPT
SjakkGPT/ChessGPT is a website to play chess against ChatGPT through the OpenAI API. In order to use it, you need an **OpenAI API key** from OpenAI. You also need NodeJS installed on your computer.

To use it, create a file named "api_key.env" in the **Backend** folder. In this file, write `OPENAI_API_KEY=`, followed by your API key.
Example if your API key was literally "apikey":

```
OPENAI_API_KEY=apikey
```

After that's done, you can start the node server called "server.js". Just go into the "backend" directory in your terminal, and type `node server.js`. After that, go into the "frontend" folder and run the .html file. The website should open and it should be obvious how you use it.

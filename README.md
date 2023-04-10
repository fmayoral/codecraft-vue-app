# Text-based Website Generator

This project generates a simple website based on a text description using Vue.js and OpenAI's GPT-3.

## Prerequisites
- [git](https://git-scm.com/download/)
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (usually bundled with Node.js)
- An OpenAI API key (You can get one by signing up at [OpenAI](https://beta.openai.com/signup/))

## Setup

1. Clone this repository to your local machine:

```bash
git clone https://github.com/fmayoral/codecraft-vue-app.git
cd codecraft-vue-app
```

2. Install the required dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the project root folder and add your OpenAI API key:

```ini
VUE_APP_OPENAI_API_KEY=your_openai_api_key_here
```

Make sure to replace `your_openai_api_key_here` with your actual OpenAI API key.
> :warning: **do NOT deploy this app publicly**: this is a basic first iteration and it runs only in the frontend, meaning the key you put in here will be visible to users.

## Running the Project

1. Start the development server:

```bash
npm run serve
```

2. Open your web browser and navigate to http://localhost:8080/. You should now see the Text-based Website Generator interface.

Enter a natural language description of the website you'd like to create, and click the "Generate Website" button. 
The generated website will be displayed in an iframe on the right side of the screen.
> :warning: This process can take several minutes depending on how complex the requested website is, this app handles token limits, 
> i.e. if the website is too long, it will continue prompting OpenAi to continue generating code until is done, or reaches a max of 10 requests.
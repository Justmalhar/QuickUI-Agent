# Quick UI
Quick UI is a superfast web application UI generator that uses LLMs to quickly generate your UI ideas into polished, ready-to-deploy single-page applications. Utilizing HTML, Tailwind CSS, Bootstrap, Font Awesome, and Google Fonts, the Quick UI Generator streamlines the design process, making it faster to test your idea. Designed for both novices and seasoned developers, this tool simplifies the UI generation process with an intuitive interface and real-time preview capabilities.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Justmalhar/quick-ui&env=GROQ_API_KEY)

###  Features:

- Idea to UI: Simply input your concept, and let the generator do the rest, crafting a responsive and aesthetically pleasing UI.
- Live Preview: Instantly see your generated UI in a dedicated preview pane.
- Code View and Copy: Easily access and copy the generated HTML code with syntax highlighting for further customization.

Whether you're looking to quickly prototype a concept or need a starting point for a more complex design, Quick UI Generator is your go-to tool for rapid, hassle-free UI creation.

### How to Use
1. Enter your UI idea in the provided text area.
2. Click "Generate UI" to process your input.
3. View the generated UI in the preview pane on the right.
4. Access and copy the HTML code with the "View Code" button.

### Technologies Used
- Next.js
- Tailwind CSS
- Font Awesome
- Google Fonts
- Prism

### Run Locally

First, run the development server:

```bash
git clone https://github.com/Justmalhar/quick-ui.git
cd quick-ui
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. 

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/generateHtml](http://localhost:3000/api/generateHtml). This endpoint can be edited in `pages/api/generateHTML.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.



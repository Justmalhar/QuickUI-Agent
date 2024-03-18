// pages/api/generateHtml.js
export default async function handler(req, res) {

    let system_prompt = `
        You are senior front end developer with 10 years of experience and have perfect vision and pay great attention to detail which makes you an expert at building single page apps using HTML and Tailwind CSS and Inline CSS.
        You take ideas of web page from the user, and then build single page apps using Tailwind, HTML and JS.
        You might also be given a screenshot (The second image) of a web page that you have already built, and asked to
        update it to look more like the reference image(The first image).

        - Make sure the app looks exactly like the screenshot.
        - Do not leave out smaller UI elements. Make sure to include every single thing in the screenshot.
        - Pay close attention to background color, text color, font size, font family,
        padding, margin, border, etc. Match the colors and sizes exactly.
        - In particular, pay attention to background color and overall color scheme.
        - Use the exact text from the screenshot.
        - Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
        - Make sure to always get the layout right (if things are arranged in a row in the screenshot, they should be in a row in the app as well)
        - Repeat elements as needed to match the screenshot. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
        - Make it Mobile Responsive
        - Font Family: <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
        - IMPORTANT FOR ALL <img> or img src use: [https://placehold.co](https://placehold.co/) with dimensions and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.


        In terms of libraries,

        - Use this script to include Tailwind: <script src="https://cdn.tailwindcss.com"></script>
        - You can use Google Fonts
        - Must use Font Awesome for icons for improving UI: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
       Return only the full code in <html></html> tags.
        Do not include markdown "\`" or "\`html" at the start or end.
        `;


    if (req.method === 'POST') {
      const { idea } = req.body;
      try {
        const variants = [1]; // Example for generating 3 variants
  
        const fetchPromises = variants.map((variant, index) =>
          fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              messages: [{ "role": "system", "content": system_prompt }, { "role": "user", "content": `Responsive HTML/Tailwind Website Idea: ${idea}. Output Code in HTML Block:` }],
              model: "mixtral-8x7b-32768",
              max_tokens: 4000,
              temperature: 0.7,
            })
          }).then(response => response.json())
        );
  
        const results = await Promise.all(fetchPromises);
        return res.status(200).json(results);
      } catch (error) {
        console.error('Error fetching data from external API', error);
        return res.status(500).json({ message: 'Failed to fetch data from external API' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';


export default function Home() {
  const [idea, setIdea] = useState('');
  const [variant, setVariant] = useState(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to show toast and auto-hide after some time
  const showToast = () => {
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000); // hide toast after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    setVariant(null); // Clear the previous variant
    const res = await fetch('/api/generateHtml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log({ data });
      setVariant(data);
      setIsLoading(false); // Start loading

    } else {
      console.error('Failed to generate');
    }
  };

  const copyToClipboard = (code) => {
    if (navigator.clipboard) { // Modern async clipboard API
      navigator.clipboard.writeText(code).then(() => {
        showToast();
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    } else { // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
  };

  return (
    <div>
    <Head>
      <title>Quick UI Generator</title>
      {/* Add any additional head elements here */}
    </Head>
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto text-center">
        <a href="/" className="text-white text-lg  font-bold">Quick UI with Groq</a>
      </div>
    </nav>

    {/* Jumbotron */}
    <div className="bg-blue-600 text-white text-center py-10">
      <div className="md:w-2/3 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Ideas Into Real, Polished UIs</h2>
        <p className="text-xl mb-6">
          Build UIs fast with HTML, Tailwind CSS, Font Awesome, and Google Fonts using superfast Groq.
        </p>
        <button
          onClick={() => document.getElementById('ideaInput').focus()} // Focus on the idea input field when the button is clicked
          className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white"
        >
          Start Designing
        </button>
      </div>
    </div>

    {/* Two-panel dashboard layout */}
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3 p-4">
          <h1 className="text-xl font-bold my-5">Enter Your Web App UI Idea</h1>
          <form onSubmit={handleSubmit} className="mb-8">
            <textarea
              id="ideaInput" // Added an id to focus on this element when the button is clicked
              className="w-full p-4 border rounded focus:outline-none focus:shadow-outline"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows="6"
              placeholder="Describe the UI you want to generate..."
            />
            <div className="text-center">
              <button type="submit" className="mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 ease-in-out hover:bg-gray-700 hover:text-white">
                Generate UI
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-2/3 p-4">
          
          {isLoading ? (
            <div className="loader w-[50px]"></div> // Spinner
          ) :
          variant ? (
            <>
              <div className="text-center mb-4">
                <button
                  onClick={() => setIsCodeModalOpen(true)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  View Code
                </button>
              
              </div>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Display the HTML content in an iframe */}
                <iframe srcDoc={variant[0].choices[0].message.content} frameBorder="0" className="w-full" style={{ minHeight: '500px' }} title="UI Preview"></iframe>
              </div>
            </>
          ): (
            <p className='text-center p-20'>Please submit an idea to generate the UI.</p>
          )}
        </div>
      </div>
      {isCodeModalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
    <div className="relative top-20 mx-auto p-5 border w-3/4 md:w-1/2 shadow-lg rounded-md bg-white">
      <div className="text-center">
        <div className="mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Generated Code</h3>
        </div>
        <SyntaxHighlighter language="html" style={materialLight}>
          {variant[0].choices[0].message.content}
        </SyntaxHighlighter>
        <div className="mt-4">
        {isToastVisible && (
          <div className="mx-auto bg-green-500 text-white py-2 px-4 rounded-xl transition duration-300 ease-in-out z-20">
            Code copied to clipboard!
          </div>
        )}
          <button
            onClick={() => copyToClipboard(variant[0].choices[0].message.content)}
            className="mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={() => setIsCodeModalOpen(false)}
            className="mt-6 ml-4 bg-gray-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </main>
   
    </div>
  );
}
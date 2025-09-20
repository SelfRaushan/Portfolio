import React, { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

// --- Helper Components (Now Theme-Aware) ---

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative my-4" role="alert">
    <strong className="font-bold">Oops! </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

const BlogIdeaCard = ({ title, description }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-slate-200 dark:border-slate-700">
    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

// --- Main BlogIdeaGenerator Component ---

const BlogIdeaGenerator = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateIdeas = useCallback(async () => {
    if (!topic.trim()) {
      setError("Please enter a topic to generate ideas.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIdeas([]);

    // --- Enhanced API Fetch with Exponential Backoff ---
    const fetchWithBackoff = async (url, options, retries = 5, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (response.ok) {
                    return response.json();
                }
                // Don't retry on client errors like 403 Forbidden, as it's a permission issue.
                if (response.status >= 400 && response.status < 500) {
                     throw new Error(`API error: ${response.status} ${response.statusText}. This is often a permission issue.`);
                }
                // For server errors or rate limiting, wait and retry.
                 console.log(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
            } catch (err) {
                // If it's the last retry, throw the error.
                if (i === retries - 1) throw err;
            }
            await new Promise(res => setTimeout(res, delay));
            delay *= 2; // Double the delay for the next retry.
        }
        throw new Error("API request failed after multiple retries.");
    };


    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const systemPrompt = `You are an expert blog idea generator. For any given topic, you must generate a list of 5 creative, engaging, and SEO-friendly blog post ideas. Each idea must have a catchy title and a brief, compelling one-sentence description. Structure your response as a JSON array of objects, where each object has a "title" and a "description" key.`;

    const payload = {
      contents: [{ parts: [{ text: `Generate blog ideas for the topic: "${topic}"` }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: { title: { type: "STRING" }, description: { type: "STRING" } },
            required: ["title", "description"]
          }
        }
      }
    };
    
    const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    try {
      const result = await fetchWithBackoff(apiUrl, fetchOptions);

      if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
        const generatedText = result.candidates[0].content.parts[0].text;
        const parsedIdeas = JSON.parse(generatedText);
        setIdeas(parsedIdeas);
      } else {
        throw new Error("Could not parse valid ideas from the API response.");
      }
    } catch (err) {
      console.error("Error generating ideas:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateIdeas();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a topic (e.g., 'React Hooks')"
            className="flex-grow w-full px-4 py-3 text-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
            disabled={isLoading}
          />
          <button
            onClick={generateIdeas}
            disabled={isLoading}
            className="w-full sm:w-auto bg-sky-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            {isLoading ? 'Generating...' : 'Generate Ideas'}
          </button>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="mt-8">
        {isLoading && <LoadingSpinner />}
        {ideas.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Generated Ideas:</h2>
            {ideas.map((idea, index) => (
              <BlogIdeaCard key={index} title={idea.title} description={idea.description} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Correctly export the component for use in other parts of your app
export default BlogIdeaGenerator;

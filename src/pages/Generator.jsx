import React, { useState } from 'react';

const Generator = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedImages, setGeneratedImages] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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', // Replace with your API key
                },
                body: JSON.stringify({
                    prompt: prompt,
                    n: 5, 
                    size: "1024x1024"
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            const imageUrls = responseData.data.map(item => item.url);
            setGeneratedImages(imageUrls);
            setError(null); 
        } catch (error) {
            console.error('Error generating images:', error);
            setError('Error generating images. Please try again.'); 
        }
    };
    

    return (
        <div>
            <h1>Prompt-based Image Generator</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt..."
                />
                <button type="submit">Generate Images</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} 
            <div>
                {generatedImages.map((imageUrl, index) => (
                    <img style={{width:"100%"}} key={index} src={imageUrl} alt={`Generated ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default Generator;

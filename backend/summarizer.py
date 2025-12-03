import os
from openai import AzureOpenAI

async def summarize_text(text: str) -> str:
    """Summarize text using Azure OpenAI"""
    try:
        client = AzureOpenAI(
            api_key=os.getenv("AZURE_OPENAI_KEY"),
            api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview"),
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
        )
        
        prompt = f"""Analyze the following text and provide:

1. A brief summary (2-3 sentences)
2. Key bullet points (3-5 main points)
3. Key insights or takeaways

Text to analyze:
{text}

Format your response clearly with sections."""

        response = client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes documents clearly and concisely."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        return response.choices[0].message.content
    
    except Exception as e:
        raise Exception(f"Error summarizing text: {str(e)}")

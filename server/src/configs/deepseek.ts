import { marked } from "marked";

const API_KEY = process.env.DEEPSEEK_FREE_API;

async function main(prompt: string) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-0528:free",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ]
      })
    });


    const data: any = await response.json();
    const blogContent = data.choices?.[0]?.message?.content || "";
    return marked.parse(blogContent);
  } catch (error: any) {
    return `Lỗi trên DeepSeek: ${error.message}`;
  }
}

export default main;

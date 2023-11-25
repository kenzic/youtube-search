import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";

const client = new ChromaClient();

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY,
});

export async function GET(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");

  const collection = await client.getOrCreateCollection({
    name: "youTubeVideos",
    embeddingFunction: embedder,
  });

  const data = await collection.query({
    nResults: 5,
    queryTexts: query,
  });

  return Response.json({ data });
}

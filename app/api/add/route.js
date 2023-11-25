import {
  extractVideoID,
  getYouTubeOEmbed,
  getYoutubeTranscript,
} from "@/lib/client/youtube";
import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";

const client = new ChromaClient();

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { url } = await req.json();
  const videoId = extractVideoID(url);

  if (videoId === null) {
    return Response.json({ error: "Invalid YouTube Url" }, { status: 400 });
  }

  // add code here:

  try {
    const [oEmbedData, transcript] = await Promise.all([
      getYouTubeOEmbed(videoId),
      getYoutubeTranscript(videoId),
    ]);

    const data = {
      title: oEmbedData.title,
      thumbnailUrl: oEmbedData.thumbnail_url,
      transcript,
      videoId,
    };

    const collection = await client.getOrCreateCollection({
      name: "youTubeVideos",
      embeddingFunction: embedder,
    });

    const result = await collection.add({
      ids: [videoId],
      documents: [transcript],
      metadatas: [
        {
          title: oEmbedData.title,
          thumbnailUrl: oEmbedData.thumbnail_url,
          videoId,
        },
      ],
    });

    if (!result) {
      throw new Error("Failed to add video");
    }

    return Response.json({ data });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

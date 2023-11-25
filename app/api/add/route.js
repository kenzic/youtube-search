import {
  extractVideoID,
  getYouTubeOEmbed,
  getYoutubeTranscript,
} from "@/lib/client/youtube";

export async function POST(req) {
  const { url } = await req.json();
  const videoId = extractVideoID(url);

  if (videoId === null) {
    return Response.json({ error: "Invalid YouTube Url" }, { status: 400 });
  }

  // add code here:
}

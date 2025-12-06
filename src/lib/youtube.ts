const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/search';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
}

export async function fetchYouTubeVideos(limit = 6): Promise<YouTubeVideo[]> {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  const channelId = import.meta.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return [];
  }

  const params = new URLSearchParams({
    key: apiKey,
    channelId,
    part: 'snippet',
    order: 'date',
    maxResults: String(limit),
    type: 'video',
  });

  try {
    const response = await fetch(`${YOUTUBE_API}?${params.toString()}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('YouTube API request failed', response.status, await response.text());
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data.items)) {
      return [];
    }

    return data.items
      .filter((item: any) => item?.id?.videoId)
      .map((item: any) => {
        const videoId = item.id.videoId;
        const snippet = item.snippet ?? {};
        return {
          id: videoId,
          title: snippet.title ?? 'Untitled Performance',
          description: snippet.description ?? '',
          publishedAt: snippet.publishedAt ?? '',
          thumbnailUrl:
            snippet.thumbnails?.high?.url ??
            snippet.thumbnails?.medium?.url ??
            snippet.thumbnails?.default?.url ??
            '',
        };
      });
  } catch (error) {
    console.warn('Failed to fetch YouTube videos', error);
    return [];
  }
}


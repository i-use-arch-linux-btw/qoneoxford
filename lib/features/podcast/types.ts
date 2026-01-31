export type PodcastEpisode = {
  title: string;
  description: string;
  descriptionHtml: string;
  link: string;
  audioUrl: string;
  date: string;
  duration: string;
  episodeNumber?: number;
  slug: string;
  buzzsproutId: string;
};

export type PodcastFeed = {
  title: string;
  description: string;
  image: string;
  episodes: PodcastEpisode[];
};

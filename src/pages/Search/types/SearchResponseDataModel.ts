export default interface SearchResponseDataModel {
  _type: string;
  currentOffset: number;
  id: string;
  isFamilyFriendly: boolean;
  nextOffset: number;
  pivotSuggestions: Pivot;
  queryExpansions: Query;
  queryContext: QueryContext;
  readLink: string;
  relatedSearches: Query[];
  similarTerms: Query;
  totalEstimatedMatches: number;
  value: Image[];
  webSearchUrl: string;
}

type Pivot = {
  pivot: string;
  suggestions: Query;
};

type Query = {
  displayText: String;
  searchLink: string;
  text: string;
  thumbnail: Thumbnail;
  webSearchUrl: string;
};

type Thumbnail = {
  url: string;
};

type QueryContext = {
  adultIntent: boolean;
  alterationOverrideQuery: string;
  alteredQuery: string;
  askUserForLocation: boolean;
  originalQuery: string;
};

type Image = {
  accentColor: string;
  contentSize: string;
  contentUrl: string;
  creativeCommons: string;
  datePublished: string;
  encodingFormat: string;
  height: number;
  hostPageDisplayUrl: string;
  hostPageDomainFriendlyName: string;
  hostPageUrl: string;
  id: string;
  imageId: string;
  imageInsightsToken: string;
  insightsMetadata: InsightsMetadata;
  name: string;
  thumbnail: MediaSize;
  thumbnailUrl: string;
  webSearchUrl: string;
  width: number;
};

type InsightsMetadata = {
  aggregateOffer: Offer;
  availableSizesCount: number;
  pagesIncludingCount: number;
  recipeSourcesCount: number;
  shoppingSourcesCount: number;
};

type Offer = {
  aggregateRating: AggregateRating;
  availability: string;
  description: string;
  lastUpdated: string;
  lowPrice: number;
  name: string;
  offerCount: number;
  price: number;
  priceCurrency: string;
  seller: Organization;
  url: string;
};

type AggregateRating = {
  bestRating: number;
  ratingValue: number;
  reviewCount: number;
  text: string;
};

type Organization = {
  image: Image;
  name: string;
};

type MediaSize = {
  height: number;
  width: number;
};

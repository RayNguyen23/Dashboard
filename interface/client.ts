export interface Client {
  id: string;
  Name: string;
  Categories: string | null;
  TimeZone: string;
  Phones: string | null;
  AverageRating: string;
  GoogleMapsURL: string;
  Website: string;
  FullAddress: string;
  FeaturedImage: string;
}

export interface Review {
  id: string;
  name: string;
  email: string;
  imgurl: string;
  review: string;
  stars: number;
  timestamp?: any; // Firebase timestamp
}

export interface ReviewsData {
  reviews: Review[];
}

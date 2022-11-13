export enum AppRoutes {
  Main = '/',
  PageNotFount = '/*',
}

export enum APIRoutes {
  Points = '/points',
  Destinations = '/destinations',
  Offers = '/offers',
}

export enum PointType {
  Taxi = 'taxi',
  Bus = 'bus',
  Train = 'train',
  Ship = 'ship',
  Drive = 'drive',
  Flight = 'flight',
  CheckIn = 'check-in',
  Sightseeing = 'sightseeing',
  Restaurant = 'restaurant',
}

export enum NameSpace {
  Application = 'APPLICATION',
  Offers = 'OFFERS',
  Points = 'POINTS',
  Destinations = 'DESTINATIONS',
}

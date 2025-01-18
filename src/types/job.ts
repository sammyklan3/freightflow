export interface Location {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Requirements {
    vehicleType: string;
    insurance: boolean;
    trackingSystem: boolean;
    temperatureControlled: boolean;
    experienceYears: number;
    specialLicenses: string[];
    additionalRequirements: string;
}

export interface JobPost {
  description: string;
  title: string;
  category: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  salary: number;
  departureDate: string;
  expectedDeliveryDate: string;
  dimensions: Dimensions;
  weight: number;
  requirements: Requirements;
}

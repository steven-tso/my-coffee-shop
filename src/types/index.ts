export type RoastLevel = '極淺焙' | '淺焙' | '淺中焙' | '中焙' | '中深焙' | '深焙';

export type ProcessMethod = '水洗 Washed' | '日曬 Natural' | '蜜處理 Honey' | '厭氧發酵 Anaerobic' | '蘭姆酒桶發酵 Rum Barrel' | '蜜處理 Honey & 水洗 Washed';

export interface CoffeeBean {
  id: string;
  name: string;
  nameEn: string;
  country: string;
  region: string;
  estate: string;
  altitude: string;
  variety: string;
  process: ProcessMethod;
  roastLevel: RoastLevel;
  flavorNotes: string[];
  description: string;
  scores: {
    acidity: number; // 1 - 5
    body: number;    // 1 - 5
    sweetness: number; // 1 - 5
    aroma: number;   // 1 - 5
    bitterness: number; // 1 - 5
  };
  recommendedBrew: string;
  beanPrice: number; // 200g
  cupPrice: number;  // In-store pour-over cup
  accentColor: string;
  foodPairing: string;
}

export interface BrewingMethod {
  id: string;
  name: string;
  nameEn: string;
  tagline: string;
  ratio: string; // e.g., "1:15"
  grindSize: string;
  temperature: string;
  time: string;
  flavorProfile: string;
  steps: string[];
  iconType: 'v60' | 'espresso' | 'aeropress' | 'syphon' | 'coldbrew';
}

export type FoodCategory = 'all' | 'pastry' | 'brunch' | 'espresso_drinks';

export interface FoodItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'pastry' | 'brunch' | 'espresso_drinks';
  price: number;
  description: string;
  ingredients: string;
  dietary?: string; // e.g. 蛋奶素, 經典烘焙
  pairingSuggestion: string;
  tags: string[];
  isSignature?: boolean;
}

export interface UserOrder {
  id: string;
  date: string;
  type: 'dine_in' | 'takeaway';
  tableNumber?: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    customization?: string;
  }[];
  total: number;
  status: '已接單' | '製作中' | '已完成';
  pickupCode: string;
}

export interface TastingNote {
  id: string;
  coffeeId: string;
  coffeeName: string;
  date: string;
  rating: number; // 1-5
  notes: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  memberNumber: string;
  tier: '琥珀雅緻會員' | '金萱首席會員';
  joinDate: string;
  points: number;
  stamps: number; // 0-10
  preferredRoast: RoastLevel;
  birthMonth: string;
  favorites: string[]; // bean or food IDs
  orders: UserOrder[];
  tastingNotes: TastingNote[];
}

export interface CartItem {
  id: string;
  itemType: 'coffee_cup' | 'coffee_beans' | 'food';
  name: string;
  nameEn: string;
  price: number;
  quantity: number;
  details?: string;
}

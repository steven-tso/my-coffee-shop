import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, CartItem, UserOrder, TastingNote, RoastLevel } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  register: (name: string, email: string, preferredRoast: RoastLevel, birthMonth: string) => void;
  login: (email: string) => boolean;
  logout: () => void;
  quickDemoLogin: () => void;
  toggleFavorite: (id: string) => void;
  addTastingNote: (coffeeId: string, coffeeName: string, rating: number, notes: string) => void;
  addStamp: () => void;
  redeemStamps: () => boolean;
  // Cart state
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  checkoutOrder: (type: 'dine_in' | 'takeaway', tableOrNote?: string) => UserOrder;
  // UI modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isMemberDrawerOpen: boolean;
  setIsMemberDrawerOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const STORAGE_KEY_USER = 'lujing_coffee_user';
const STORAGE_KEY_CART = 'lujing_coffee_cart';

const INITIAL_DEMO_USER: UserProfile = {
  id: 'usr_demo_882',
  name: '林書宇 Shu-Yu Lin',
  email: 'coffee.lover@lujing.tw',
  memberNumber: 'LJ-2026-8821',
  tier: '琥珀雅緻會員',
  joinDate: '2026/02/18',
  points: 320,
  stamps: 7, // 7 out of 10 stamps
  preferredRoast: '淺焙',
  birthMonth: '10月',
  favorites: ['ethiopia-yirgacheffe', 'canele-bordeaux', 'flat-white'],
  orders: [
    {
      id: 'ORD-8819',
      date: '2026/03/12 14:35',
      type: 'dine_in',
      tableNumber: '慢吧 03 號位',
      items: [
        { id: 'ethiopia-yirgacheffe', name: '衣索比亞 耶加雪菲 手沖', quantity: 1, price: 190 },
        { id: 'canele-bordeaux', name: '波爾多蜂蠟焦糖可麗露', quantity: 2, price: 95 },
      ],
      total: 380,
      status: '已完成',
      pickupCode: 'T-03',
    },
  ],
  tastingNotes: [
    {
      id: 'tn-1',
      coffeeId: 'ethiopia-yirgacheffe',
      coffeeName: '衣索比亞 耶加雪菲 歌迪貝 G1',
      date: '2026/03/12',
      rating: 5,
      notes: '極具穿透力的茉莉花香與白桃多汁感，放涼後果酸更加圓潤甜蜜，令人驚豔！',
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMemberDrawerOpen, setIsMemberDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Cart sync failed', e);
    }
  }, [cart]);

  const register = (
    name: string,
    email: string,
    preferredRoast: RoastLevel,
    birthMonth: string
  ) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      memberNumber: `LJ-2026-${randomSuffix}`,
      tier: '琥珀雅緻會員',
      joinDate: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      points: 100, // Welcome bonus points
      stamps: 1,  // Welcome first stamp!
      preferredRoast,
      birthMonth: birthMonth || '10月',
      favorites: ['ethiopia-yirgacheffe'],
      orders: [],
      tastingNotes: [],
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const login = (email: string) => {
    if (user && user.email.toLowerCase() === email.trim().toLowerCase()) {
      setIsAuthModalOpen(false);
      return true;
    }
    // If not matching saved, set default profile for demo login convenience
    const demo: UserProfile = {
      ...INITIAL_DEMO_USER,
      email: email.trim(),
    };
    setUser(demo);
    setIsAuthModalOpen(false);
    return true;
  };

  const quickDemoLogin = () => {
    setUser(INITIAL_DEMO_USER);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsMemberDrawerOpen(false);
  };

  const toggleFavorite = (id: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setUser((prev) => {
      if (!prev) return null;
      const exists = prev.favorites.includes(id);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter((favId) => favId !== id)
          : [...prev.favorites, id],
      };
    });
  };

  const addTastingNote = (
    coffeeId: string,
    coffeeName: string,
    rating: number,
    notes: string
  ) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const newNote: TastingNote = {
      id: `tn_${Date.now()}`,
      coffeeId,
      coffeeName,
      date: new Date().toLocaleDateString('zh-TW'),
      rating,
      notes,
    };
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        tastingNotes: [newNote, ...prev.tastingNotes],
        points: prev.points + 20, // +20 points bonus for cupping review!
      };
    });
  };

  const addStamp = () => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return null;
      const newStamps = (prev.stamps + 1) % 11;
      return {
        ...prev,
        stamps: newStamps,
        points: prev.points + 10,
      };
    });
  };

  const redeemStamps = (): boolean => {
    if (!user || user.stamps < 10) return false;
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        stamps: prev.stamps - 10,
        points: prev.points + 50,
      };
    });
    return true;
  };

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id && i.details === item.details);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutOrder = (type: 'dine_in' | 'takeaway', tableOrNote?: string): UserOrder => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const pickupNumber = Math.floor(10 + Math.random() * 89);
    const pickupCode = type === 'dine_in' ? (tableOrNote || '慢吧桌次') : `PICK-${pickupNumber}`;

    const newOrder: UserOrder = {
      id: `ORD-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleString('zh-TW', { hour12: false, dateStyle: 'short', timeStyle: 'short' }),
      type,
      tableNumber: type === 'dine_in' ? tableOrNote : undefined,
      items: cart.map((c) => ({
        id: c.id,
        name: c.name,
        quantity: c.quantity,
        price: c.price,
        customization: c.details,
      })),
      total,
      status: '製作中',
      pickupCode,
    };

    if (user) {
      const earnedPoints = Math.floor(total * 0.1);
      const earnedStamps = Math.min(10, user.stamps + (cart.some((c) => c.itemType === 'coffee_cup') ? 1 : 0));
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          points: prev.points + earnedPoints,
          stamps: earnedStamps,
          orders: [newOrder, ...prev.orders],
        };
      });
    }

    clearCart();
    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        quickDemoLogin,
        toggleFavorite,
        addTastingNote,
        addStamp,
        redeemStamps,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkoutOrder,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isMemberDrawerOpen,
        setIsMemberDrawerOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

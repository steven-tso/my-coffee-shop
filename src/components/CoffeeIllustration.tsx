import React from 'react';

interface IllustrationProps {
  type: string;
  className?: string;
}

export const CoffeeIllustration: React.FC<IllustrationProps> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'v60':
    case 'ethiopia-yirgacheffe':
    case 'panama-geisha':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="v60Grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="100%" stopColor="#1C1917" />
            </linearGradient>
            <linearGradient id="coffeeDrip" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            <radialGradient id="steamGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#v60Grad)" />
          {/* Ambient Warm Glow */}
          <circle cx="200" cy="140" r="110" fill="url(#steamGlow)" />
          
          {/* Steam curves */}
          <path d="M190 70 Q195 50 190 35 Q185 20 192 10" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <path d="M210 75 Q205 55 210 40 Q215 25 208 15" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          
          {/* Ceramic Dripper (V60 Conical with ribs) */}
          <path d="M140 85 L260 85 L215 165 L185 165 Z" fill="#FDFBF7" stroke="#E7E5E4" strokeWidth="2" />
          {/* Conical ribs */}
          <path d="M150 90 L195 160" stroke="#E7E5E4" strokeWidth="1.5" />
          <path d="M170 88 L198 162" stroke="#E7E5E4" strokeWidth="1.5" />
          <path d="M230 88 L202 162" stroke="#E7E5E4" strokeWidth="1.5" />
          <path d="M250 90 L205 160" stroke="#E7E5E4" strokeWidth="1.5" />
          {/* Coffee Grounds Bloom */}
          <ellipse cx="200" cy="98" rx="42" ry="14" fill="#5A3A1A" />
          <ellipse cx="200" cy="96" rx="30" ry="9" fill="#78350F" />
          <circle cx="200" cy="96" r="6" fill="#B45309" opacity="0.7" />

          {/* Dripper Base ring */}
          <path d="M170 165 L230 165 C235 168 235 174 230 176 L170 176 C165 174 165 168 170 165 Z" fill="#E7E5E4" />

          {/* Coffee Drip Drops */}
          <path d="M200 176 L200 195" stroke="url(#coffeeDrip)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="200" cy="205" r="3.5" fill="#D97706" />

          {/* Glass Server / Carafe */}
          <path d="M182 205 L218 205 L245 260 C245 268 238 272 225 272 L175 272 C162 272 155 268 155 260 Z" fill="#FAF7F2" fillOpacity="0.12" stroke="#FAF7F2" strokeWidth="2" strokeOpacity="0.4" />
          {/* Coffee Liquid in Carafe */}
          <path d="M165 240 Q200 242 235 240 L242 262 C242 266 236 270 225 270 L175 270 C164 270 158 266 158 262 Z" fill="url(#coffeeDrip)" opacity="0.9" />
          {/* Carafe handle */}
          <path d="M228 215 C250 215 258 240 240 252" stroke="#FAF7F2" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />

          {/* Floating Flavor botanical notes badge */}
          <g transform="translate(40, 230)">
            <rect width="105" height="32" rx="6" fill="#1C1917" fillOpacity="0.85" stroke="#44403C" strokeWidth="1" />
            <text x="12" y="20" fill="#FDE68A" fontSize="12" fontFamily="serif" fontWeight="600">Jasmine & Peach</text>
          </g>
        </svg>
      );

    case 'espresso':
    case 'lujing-amber-blend':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="espBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1B18" />
              <stop offset="100%" stopColor="#12100E" />
            </linearGradient>
            <linearGradient id="cremaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#espBg)" />
          {/* Brass machine group head */}
          <path d="M150 40 L250 40 L245 75 L155 75 Z" fill="#78716C" stroke="#A8A29E" strokeWidth="1.5" />
          <rect x="170" y="75" width="60" height="15" fill="#44403C" />
          
          {/* Portafilter Handle */}
          <path d="M230 82 L340 70 L345 92 L230 90 Z" fill="#292524" stroke="#57534E" strokeWidth="1" rx="4" />
          <circle cx="340" cy="81" r="7" fill="#78350F" />

          {/* Double Spout */}
          <path d="M190 90 L185 110 L195 110 Z" fill="#A8A29E" />
          <path d="M210 90 L205 110 L215 110 Z" fill="#A8A29E" />

          {/* Dual Stream Extraction */}
          <path d="M190 110 L190 185" stroke="url(#cremaGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M210 110 L210 185" stroke="url(#cremaGrad)" strokeWidth="3" strokeLinecap="round" />

          {/* Ceramic Espresso Cup */}
          <path d="M165 185 L235 185 L228 238 C228 245 220 250 200 250 C180 250 172 245 172 238 Z" fill="#FAF7F2" stroke="#E7E5E4" strokeWidth="2" />
          <ellipse cx="200" cy="186" rx="35" ry="9" fill="url(#cremaGrad)" />
          {/* Tiger Stripe Crema swirl */}
          <path d="M185 186 Q200 183 215 187" stroke="#78350F" strokeWidth="1.5" opacity="0.8" />
          <path d="M178 187 Q195 189 210 185" stroke="#FDE68A" strokeWidth="1.2" opacity="0.9" />

          {/* Cup Saucer */}
          <ellipse cx="200" cy="250" rx="60" ry="9" fill="#E7E5E4" stroke="#D6D3D1" strokeWidth="1.5" />

          <g transform="translate(260, 220)">
            <rect width="110" height="32" rx="6" fill="#1C1917" fillOpacity="0.85" stroke="#44403C" strokeWidth="1" />
            <text x="14" y="20" fill="#F59E0B" fontSize="12" fontFamily="serif" fontWeight="600">9-Bar Crema</text>
          </g>
        </svg>
      );

    case 'pastry_canele':
    case 'canele-bordeaux':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="caneleBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E241D" />
              <stop offset="100%" stopColor="#1A1410" />
            </linearGradient>
            <linearGradient id="crustGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B2314" />
              <stop offset="35%" stopColor="#78350F" />
              <stop offset="70%" stopColor="#451A03" />
              <stop offset="100%" stopColor="#29180E" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#caneleBg)" />
          
          {/* Artisan Ceramic Plate */}
          <ellipse cx="200" cy="230" rx="140" ry="32" fill="#E7E5E4" stroke="#D6D3D1" strokeWidth="2" />
          <ellipse cx="200" cy="228" rx="115" ry="24" fill="#F5F2EB" />

          {/* Canelé Shadow */}
          <ellipse cx="200" cy="224" rx="48" ry="12" fill="#29180E" opacity="0.6" />

          {/* Fluted Canelé Body */}
          <path d="M165 140 C162 170 160 200 162 220 C175 225 225 225 238 220 C240 200 238 170 235 140 Z" fill="url(#crustGrad)" stroke="#1C1917" strokeWidth="2" />
          
          {/* Flutes / Ridges */}
          <path d="M172 142 L172 222" stroke="#23130A" strokeWidth="3" />
          <path d="M185 144 L185 224" stroke="#B45309" strokeWidth="2" opacity="0.6" />
          <path d="M198 145 L198 225" stroke="#23130A" strokeWidth="3" />
          <path d="M212 144 L212 224" stroke="#92400E" strokeWidth="2" opacity="0.7" />
          <path d="M226 142 L226 222" stroke="#23130A" strokeWidth="3" />

          {/* Canelé Crown (concave top) */}
          <ellipse cx="200" cy="140" rx="36" ry="12" fill="#3B2314" stroke="#1C1917" strokeWidth="2" />
          <circle cx="200" cy="140" r="10" fill="#23130A" />

          {/* Vanilla bean specks & gold leaf flake */}
          <circle cx="200" cy="138" r="2.5" fill="#FDE68A" />

          <g transform="translate(35, 230)">
            <rect width="115" height="32" rx="6" fill="#1C1917" fillOpacity="0.85" stroke="#44403C" strokeWidth="1" />
            <text x="12" y="20" fill="#FDE68A" fontSize="12" fontFamily="serif" fontWeight="600">Beeswax Crust</text>
          </g>
        </svg>
      );

    case 'pastry_cheesecake':
    case 'basque-matcha':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="matchaBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C241B" />
              <stop offset="100%" stopColor="#111611" />
            </linearGradient>
            <linearGradient id="matchaCheese" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#65A30D" />
              <stop offset="60%" stopColor="#4D7C0F" />
              <stop offset="100%" stopColor="#365314" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#matchaBg)" />
          
          {/* Ceramic Dish */}
          <ellipse cx="200" cy="235" rx="145" ry="32" fill="#F5F2EB" stroke="#D6D3D1" strokeWidth="2" />

          {/* Basque Wedge Perspective */}
          {/* Slice side facing right */}
          <path d="M200 130 L270 200 L210 225 L150 170 Z" fill="url(#matchaCheese)" stroke="#3F6212" strokeWidth="1" />
          {/* Slice side facing left */}
          <path d="M200 130 L150 170 L140 215 L210 225 Z" fill="#3F6212" />

          {/* Gooey molten center drip */}
          <path d="M190 185 Q200 210 195 224" stroke="#84CC16" strokeWidth="6" strokeLinecap="round" />

          {/* Burnt Caramel Top Crust */}
          <path d="M200 130 L270 200 C250 195 210 175 150 170 Z" fill="#2E1B0E" stroke="#1C1917" strokeWidth="2" />
          
          {/* Matcha dusting */}
          <circle cx="180" cy="160" r="1.5" fill="#BEF264" />
          <circle cx="220" cy="180" r="2" fill="#BEF264" />
          <circle cx="240" cy="190" r="1.5" fill="#BEF264" />

          <g transform="translate(35, 230)">
            <rect width="125" height="32" rx="6" fill="#1C1917" fillOpacity="0.85" stroke="#44403C" strokeWidth="1" />
            <text x="10" y="20" fill="#A3E635" fontSize="12" fontFamily="serif" fontWeight="600">Molten Matcha</text>
          </g>
        </svg>
      );

    case 'brunch':
    case 'smoked-salmon-sourdough':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brunchBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#24211D" />
              <stop offset="100%" stopColor="#151412" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#brunchBg)" />
          {/* Black Slate Board */}
          <ellipse cx="200" cy="225" rx="150" ry="35" fill="#292524" stroke="#44403C" strokeWidth="2" />

          {/* Sourdough Bread base */}
          <path d="M130 180 C130 160 270 160 270 180 C270 205 130 205 130 180 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" />
          <path d="M140 176 C145 165 255 165 260 176 C255 195 145 195 140 176 Z" fill="#FDE68A" />

          {/* Sliced Avocado fan */}
          <path d="M150 170 Q165 150 175 168 Q185 150 195 168" stroke="#4D7C0F" strokeWidth="8" strokeLinecap="round" />
          <path d="M155 170 Q170 152 180 168 Q190 152 200 168" stroke="#84CC16" strokeWidth="5" strokeLinecap="round" />

          {/* Smoked Salmon Rosette ribbons */}
          <path d="M190 165 C195 145 225 145 230 165 C235 150 250 155 245 170 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="1.5" />
          <path d="M205 160 C210 150 220 152 222 165" stroke="#FFE4E6" strokeWidth="2" />

          {/* Poached Egg with golden yolk break */}
          <ellipse cx="175" cy="165" rx="22" ry="14" fill="#FFFFFF" />
          <circle cx="178" cy="163" r="8" fill="#F59E0B" />
          <circle cx="180" cy="162" r="3" fill="#FDE68A" />

          {/* Microgreens and dill */}
          <circle cx="210" cy="155" r="3" fill="#15803D" />
          <circle cx="160" cy="165" r="2.5" fill="#15803D" />

          <g transform="translate(35, 230)">
            <rect width="130" height="32" rx="6" fill="#1C1917" fillOpacity="0.85" stroke="#44403C" strokeWidth="1" />
            <text x="12" y="20" fill="#FCA5A5" fontSize="12" fontFamily="serif" fontWeight="600">Avocado & Salmon</text>
          </g>
        </svg>
      );

    case 'flat-white':
    case 'drinks':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cupBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#221F1C" />
              <stop offset="100%" stopColor="#141311" />
            </linearGradient>
            <linearGradient id="coffeeRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#cupBg)" />
          {/* Ceramic Saucer */}
          <ellipse cx="200" cy="235" rx="130" ry="28" fill="#E7E5E4" stroke="#D6D3D1" strokeWidth="2" />

          {/* Ceramic Cup (Top-down 3D perspective) */}
          <ellipse cx="200" cy="180" rx="90" ry="55" fill="#FAF7F2" stroke="#E7E5E4" strokeWidth="4" />
          {/* Coffee surface */}
          <ellipse cx="200" cy="180" rx="80" ry="46" fill="url(#coffeeRim)" />

          {/* Latte Art: Delicate Rosetta */}
          {/* Stem */}
          <path d="M200 215 L200 150" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round" />
          {/* Leaf pairs */}
          <path d="M190 200 Q200 190 210 200" stroke="#FAF7F2" strokeWidth="3" strokeLinecap="round" />
          <path d="M185 188 Q200 178 215 188" stroke="#FAF7F2" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M180 176 Q200 165 220 176" stroke="#FAF7F2" strokeWidth="4" strokeLinecap="round" />
          <path d="M176 164 Q200 152 224 164" stroke="#FAF7F2" strokeWidth="4" strokeLinecap="round" />
          {/* Top Heart */}
          <path d="M194 150 C194 145 200 144 200 148 C200 144 206 145 206 150 C206 155 200 159 200 159 C200 159 194 155 194 150 Z" fill="#FAF7F2" />

          <g transform="translate(35, 230)">
            <rect width="125" height="32" rx="6" fill="#1C1917" fillOpacity="0.85" stroke="#44403C" strokeWidth="1" />
            <text x="12" y="20" fill="#FED7AA" fontSize="12" fontFamily="serif" fontWeight="600">Velvet Microfoam</text>
          </g>
        </svg>
      );

    case 'sicilian-espresso-sparkling':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sicilianBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E232A" />
              <stop offset="100%" stopColor="#11151A" />
            </linearGradient>
            <linearGradient id="sparklingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#451A03" />
              <stop offset="45%" stopColor="#B45309" />
              <stop offset="65%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#sicilianBg)" />

          {/* Tall Glass Tumbler */}
          <path d="M160 80 L240 80 L230 250 C230 256 222 260 200 260 C178 260 170 256 170 250 Z" fill="#FAF7F2" fillOpacity="0.1" stroke="#FAF7F2" strokeWidth="2" strokeOpacity="0.5" />
          
          {/* Layered Liquid */}
          <path d="M164 100 L236 100 L228 248 C228 252 220 255 200 255 C180 255 172 252 172 248 Z" fill="url(#sparklingGrad)" opacity="0.85" />

          {/* Bubbles rising */}
          <circle cx="190" cy="160" r="3" fill="#FFFFFF" opacity="0.7" />
          <circle cx="210" cy="180" r="2.5" fill="#FFFFFF" opacity="0.7" />
          <circle cx="185" cy="210" r="3.5" fill="#FFFFFF" opacity="0.6" />
          <circle cx="205" cy="225" r="2" fill="#FFFFFF" opacity="0.8" />

          {/* Lemon wheel wedge on rim */}
          <circle cx="160" cy="80" r="22" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
          <circle cx="160" cy="80" r="16" fill="#FEF08A" />
          <path d="M160 64 L160 96 M144 80 L176 80 M149 69 L171 91 M171 69 L149 91" stroke="#FACC15" strokeWidth="1.5" />

          <g transform="translate(35, 230)">
            <rect width="130" height="32" rx="6" fill="#1C1917" fillOpacity="0.85" stroke="#44403C" strokeWidth="1" />
            <text x="12" y="20" fill="#FEF08A" fontSize="12" fontFamily="serif" fontWeight="600">Fresh Lemon Fizz</text>
          </g>
        </svg>
      );

    default:
      // Generic Crafted Coffee bean artwork
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="defBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#24201D" />
              <stop offset="100%" stopColor="#141210" />
            </linearGradient>
            <linearGradient id="beanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#defBg)" />
          {/* Botanical Coffee Branch with Leaves & Cherries */}
          <path d="M70 210 Q200 130 330 90" stroke="#78716C" strokeWidth="2.5" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M130 170 C120 140 150 130 170 145 C180 165 150 180 130 170 Z" fill="#22543D" stroke="#2F855A" strokeWidth="1.5" />
          <path d="M220 130 C225 100 255 100 265 120 C270 140 240 150 220 130 Z" fill="#22543D" stroke="#2F855A" strokeWidth="1.5" />

          {/* Ripe Red Cherries */}
          <circle cx="180" cy="155" r="10" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
          <circle cx="195" cy="150" r="9" fill="#B91C1C" />
          
          {/* Center Roasted Bean */}
          <g transform="translate(165, 90) rotate(25)">
            <ellipse cx="35" cy="22" rx="32" ry="20" fill="url(#beanGrad)" stroke="#29180E" strokeWidth="2" />
            {/* Center S-curve cleft */}
            <path d="M10 22 Q35 15 60 22" stroke="#29180E" strokeWidth="3" strokeLinecap="round" />
            <path d="M15 22 Q35 16 55 22" stroke="#FDE68A" strokeWidth="1" opacity="0.6" />
          </g>

          <g transform="translate(35, 230)">
            <rect width="125" height="32" rx="6" fill="#1C1917" fillOpacity="0.85" stroke="#44403C" strokeWidth="1" />
            <text x="12" y="20" fill="#FDE68A" fontSize="12" fontFamily="serif" fontWeight="600">Specialty Estate</text>
          </g>
        </svg>
      );
  }
};

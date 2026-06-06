import { MenuItem, ReviewItem, GalleryItem } from './types';

// Let's import or reference our generated premium image assets
export const IMAGE_HERO_PIZZA = "/src/assets/images/hero_pizza_1780327174323.png";
export const IMAGE_PASTA_RECOMMENDED = "/src/assets/images/pasta_bolognese_1780327192080.png";
export const IMAGE_RESTAURANT_AMBIENT = "/src/assets/images/interior_garden_1780327211034.png";

export const MENU_ITEMS: MenuItem[] = [
  // --- PIZZAS ---
  {
    id: 'p1',
    name: 'Margherita',
    description: 'Rajčatová omáčka a sýr',
    price: 190,
    category: 'pizza',
    isVegetarian: true,
    popularityBadge: '#2 nejoblíbenější'
  },
  {
    id: 'p2',
    name: 'Salame',
    description: 'Rajčatová omáčka, sýr a salám',
    price: 200,
    category: 'pizza',
    popularityBadge: '#3 nejoblíbenější'
  },
  {
    id: 'p3',
    name: 'Prosciutto',
    description: 'Rajčatová omáčka, sýr a šunka',
    price: 210,
    category: 'pizza',
    popularityBadge: '#1 nejoblíbenější'
  },
  {
    id: 'p4',
    name: 'Regina',
    description: 'Rajčatová omáčka, sýr, šunka a žampiony',
    price: 240,
    category: 'pizza'
  },
  {
    id: 'p5',
    name: 'Funghi',
    description: 'Rajčatová omáčka, sýr a žampiony',
    price: 230,
    category: 'pizza',
    isVegetarian: true
  },
  {
    id: 'p6',
    name: 'Hawaii',
    description: 'Rajčatová omáčka, sýr, šunka a ananas',
    price: 240,
    category: 'pizza'
  },
  {
    id: 'p7',
    name: 'Sole',
    description: 'Rajčatová omáčka, sýr, šunka, vejce a kukuřice',
    price: 240,
    category: 'pizza',
    popularityBadge: '#4 nejoblíbenější'
  },
  {
    id: 'p8',
    name: 'Rustica',
    description: 'Rajčatová omáčka, sýr, šunka, salám, paprika a žampiony',
    price: 250,
    category: 'pizza',
    popularityBadge: '#5 nejoblíbenější'
  },
  {
    id: 'p9',
    name: 'Diavola',
    description: 'Rajčatová omáčka, sýr, salám, cibule, česnek a feferonky',
    price: 250,
    category: 'pizza'
  },
  {
    id: 'p10',
    name: 'Calzone',
    description: 'Rajčatová omáčka, sýr, šunka a žampiony',
    price: 250,
    category: 'pizza'
  },
  {
    id: 'p11',
    name: 'Caprese',
    description: 'Rajčatová omáčka, sýr, rajčata, mozzarella a bazalka',
    price: 260,
    category: 'pizza',
    isVegetarian: true
  },
  {
    id: 'p12',
    name: 'Tonno',
    description: 'Rajčatová omáčka, sýr, tuňák a cibule',
    price: 260,
    category: 'pizza'
  },
  {
    id: 'p13',
    name: 'Quattro Formaggi',
    description: 'Rajčatová omáčka a čtyři druhy sýra',
    price: 260,
    category: 'pizza',
    isVegetarian: true
  },
  {
    id: 'p14',
    name: 'Vegetariana',
    description: 'Rajčatová omáčka, sýr, žampiony, paprika, cibule, artyčoky a olivy',
    price: 260,
    category: 'pizza',
    isVegetarian: true
  },
  {
    id: 'p15',
    name: 'Vieste',
    description: 'Rajčatová omáčka, sýr, Italský salám, česnek a feferonky',
    price: 250,
    category: 'pizza'
  },
  {
    id: 'p16',
    name: 'Quattro Stagioni',
    description: 'Rajčatová omáčka, sýr, salám, feferonky, artyčoky a olivy',
    price: 260,
    category: 'pizza'
  },
  {
    id: 'p17',
    name: 'Parma',
    description: 'Rajčatová omáčka, sýr, parmská šunka, cherry rajčata, rukola a parmezán',
    price: 280,
    category: 'pizza'
  },
  {
    id: 'p18',
    name: 'Mare',
    description: 'Rajčatová omáčka, sýr, česnek a mořské plody',
    price: 290,
    category: 'pizza'
  },
  {
    id: 'p19',
    name: 'Gianni',
    description: 'Rajčatová omáčka, sýr, šunka, artyčoky, žampiony a cibule',
    price: 260,
    category: 'pizza'
  },
  {
    id: 'p20',
    name: 'Napoli',
    description: 'Rajčatová omáčka, sýr, sardinky, kapary, artyčoky, olivy, česnek a feferonky',
    price: 270,
    category: 'pizza'
  },
  {
    id: 'p21',
    name: 'Franco',
    description: 'Rajčatová omáčka, sýr, šunka, salám, paprika, žampiony a artyčoky',
    price: 260,
    category: 'pizza'
  },

  // --- PASTAS ---
  {
    id: 'pa1',
    name: 'Pasta Napoli',
    description: 'Rajčatová omáčka, česnek a bazalka',
    price: 230,
    category: 'pasta',
    isVegetarian: true
  },
  {
    id: 'pa2',
    name: 'Pasta Aglio e Olio',
    description: 'Česnek, feferonky, olivový olej a petržel',
    price: 210,
    category: 'pasta',
    isVegetarian: true
  },
  {
    id: 'pa3',
    name: 'Pasta Bolognese',
    description: 'Hovězí mleté maso, rajčata, mrkev a celer',
    price: 230,
    category: 'pasta'
  },
  {
    id: 'pa4',
    name: 'Pasta Quattro Formaggi',
    description: 'Smetana, gorgonzola, mozzarella a parmezán',
    price: 250,
    category: 'pasta',
    isVegetarian: true
  },
  {
    id: 'pa5',
    name: 'Pasta Mare',
    description: 'Mořské plody a česnek rajčata',
    price: 290,
    category: 'pasta'
  },

  // --- SALADS ---
  {
    id: 's1',
    name: 'Caprese (Salát)',
    description: 'Čerstvá rajčata, krémová mozzarella, čerstvá bazalka, olivový olej',
    price: 170,
    category: 'salad',
    isVegetarian: true
  },
  {
    id: 's2',
    name: 'Pomodoro (Salát)',
    description: 'Rajčata, cibule, bazalka, extra panenský olivový olej',
    price: 160,
    category: 'salad',
    isVegetarian: true
  },
  {
    id: 's3',
    name: 'Di Tonno',
    description: 'Míchaný salát s jemným tuňákem, vejcem, cibulí a naším domácím dresinkem',
    price: 180,
    category: 'salad'
  },
  {
    id: 's4',
    name: 'Tacchino',
    description: 'Míchaný salát s grilovanými krůtími kousky, zeleninou a lehkým dresinkem',
    price: 200,
    category: 'salad'
  },

  // --- DRINKS ---
  {
    id: 'd1',
    name: 'Pilsner Urquell (1,5 l)',
    description: 'Legendární plzeňský ležák s výraznější chmelovou hořkostí a plnou chutí. Zlatá klasika, která nikdy nezklame. PET láhev 1,5 l',
    price: 180,
    category: 'drink'
  },
  {
    id: 'd2',
    name: 'Kozel 11° (1,5 l)',
    description: 'Světlý ležák s jemnou hořkostí a plnou sladovou chutí. Skvěle osvěží a perfektně doplní pizzu i těstoviny. Čepovaný, správně vychlazený. PET láhev 1,5 l',
    price: 150,
    category: 'drink'
  },
  {
    id: 'd3',
    name: 'Kozel Černý (1,5 l)',
    description: 'Tmavé výčepní pivo s plnou chutí a jemnou karamelovou sladkostí. Vyznačuje se praženými tóny, lehkou hořkostí a příjemně hladkým zakončením. Skvěle osvěží.',
    price: 160,
    category: 'drink'
  },
  {
    id: 'd4',
    name: 'Coca-Cola 330 ml',
    description: 'Osvěžující Coca-Cola s klasickou chutí a bublinkami. Ideální nápoj na každou příležitost.',
    price: 50,
    category: 'drink'
  },
  {
    id: 'd5',
    name: 'Coca-Cola Zero 330 ml',
    description: 'Osvěžující nápoj Coca-Cola Zero bez cukru a kalorií s autentickou chutí Coca-Coly Ideální volba pro ty kteří si chtějí užít oblíbenou chuť bez kompromisů',
    price: 50,
    category: 'drink'
  },
  {
    id: 'd6',
    name: 'Fanta 330 ml',
    description: 'Osvěžující nealkoholický nápoj Fanta s intenzivní chutí a bublinkama. Ideální pro všechny příležitosti.',
    price: 50,
    category: 'drink'
  },
  {
    id: 'd7',
    name: 'Sprite 330 ml',
    description: 'Osvěžující limonáda s citronovo-limetkovou příchutí Sprite je ideální volbou pro všechny příležitosti Čistá a křišťálově čirá s příjemnou bublinou',
    price: 50,
    category: 'drink'
  },
  {
    id: 'd8',
    name: 'Birell Pomelo & Grep 0,5 l',
    description: 'Osvěžující nealkoholický nápoj Birell s příchutí pomela a grepu. Ideální volba pro ty, kteří hledají chutný a lehký nápoj bez alkoholu. Obsah 0,5 l.',
    price: 50,
    category: 'drink'
  },
  {
    id: 'd9',
    name: 'Birell 0,5 l',
    description: 'Osvěžující nealkoholické pivo Birell v praktickém balení 0,5 litru. Plné chuti a vůně tradičního piva bez alkoholu. Ideální volba pro každou příležitost.',
    price: 50,
    category: 'drink'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Markéta B.',
    rating: 5,
    text: 'Absolutně skvělá pizza, jedna z nejlepších v okolí. Těsto je dokonalé, nadýchané okraje jako v Neapoli — není divu, když majitel a hlavní kuchař pochází přímo z Neapole! Doporučuji pizzu Diavola s pálivými jalapeños, které si sami pěstují na zahrádce.',
    date: 'před 2 dny'
  },
  {
    id: 'r2',
    author: 'Jan Novák',
    rating: 5,
    text: 'Autentická neapolská chuť a velmi příjemná rodinná obsluha. Pasta Bolognese chutnala famózně. Určitě brzy přijdeme znovu na jejich útulnou letní zahrádku.',
    date: 'před týdnem'
  },
  {
    id: 'r3',
    author: 'Lucie S.',
    rating: 5,
    text: 'Perfektní těstoviny a útulná atmosféra. Oceňuji možnost bezlepkové alternativy a rychlost rozvozu. Jídlo dorazilo horké a skvěle zabalené.',
    date: 'před 2 týdny'
  },
  {
    id: 'r4',
    author: 'Petr Rychlý',
    rating: 5,
    text: 'Skvělá pizza, přátelský personál a výborná atmosféra. Pizza Rustica se salsicciou mě absolutně dostala. Bezkonkurenční restaurace v Mělníku.',
    date: 'před měsícem'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    category: 'pizza',
    title: 'Autentická Pizza Margherita z pece',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g2',
    category: 'pasta',
    title: 'Domácí Tagliatelle s poctivým hovězím ragů',
    url: IMAGE_PASTA_RECOMMENDED
  },
  {
    id: 'g3',
    category: 'restaurant',
    title: 'Stylový interiér naší rodinné restaurace',
    url: IMAGE_RESTAURANT_AMBIENT
  },
  {
    id: 'g4',
    category: 'garden',
    title: 'Klidné večerní posezení na naší letní zahrádce',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g5',
    category: 'drink',
    title: 'Čepovaný Pilsner Urquell pro dokonalé osvěžení',
    url: 'https://images.unsplash.com/photo-1538251393887-1b11783efc3b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g6',
    category: 'pizza',
    title: 'Pikantní Pizza Diavola s Ventricina salámem',
    url: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g7',
    category: 'pasta',
    title: 'Špagety Aglio e Olio se sýrem Grana Padano',
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g8',
    category: 'restaurant',
    title: 'Srdce kuchyně - naše kamenná pec',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
  }
];

-- Bold Design — Seed Data (from Notion)
-- Run after 001_initial.sql

-- ─────────────────────────────────────────────
-- Products (from Notion: Bold Design Products + materials list)
-- ─────────────────────────────────────────────
insert into products (name_fr, name_en, status, category, notion_id, reference_url) values
  ('Ramasse-monnaie inox rectangulaire avec clip', 'Rectangular stainless steel change tray with clip', 'research', 'Accessoires table',
   '7ac5621a-454f-4d7c-93ad-196670658a11',
   'https://materiel.hellopro.fr/coupelle-ramasse-monnaie-inox-rectangulaire-avec-clip-2059988-3001541-produit.html'),
  ('Porte-addition design', 'Design bill presenter', 'research', 'Accessoires table',
   '230ee9bd-abba-4748-901d-71834e024a11', null),
  ('Cendrier design', 'Design ashtray', 'concept', 'Accessoires table', null, null),
  ('Bol olives / cacahouètes 60mm avec sous-tasse', 'Olive / nut bowl 60mm with saucer', 'concept', 'Vaisselle', null, null),
  ('Verre à bougie avec réceptoire de cire intérieur', 'Candle glass with interior wax tray', 'concept', 'Décoration table', null, null),
  ('Verre à sucre — Coupé 50/25/25', 'Sugar glass — cut 50/25/25', 'concept', 'Vaisselle', null, null),
  ('Tasse thé et café en verre', 'Glass tea and coffee cups', 'concept', 'Vaisselle', null, null),
  ('Verre bière 25cl', 'Beer glass 25cl', 'concept', 'Vaisselle', null, null),
  ('Verre bière 50cl', 'Beer glass 50cl', 'concept', 'Vaisselle', null, null),
  ('Système réceptoire sous bouche bière à pression', 'Tap beer drip tray system', 'concept', 'Bar', null, null),
  ('Meuble accueil design', 'Design welcome desk', 'concept', 'Mobilier', null, null),
  ('Meuble sur roulettes 446×1232mm', 'Rolling furniture unit 446×1232mm', 'concept', 'Mobilier', null, null),
  ('Meuble sur roulettes 504×1562mm', 'Rolling furniture unit 504×1562mm', 'concept', 'Mobilier', null, null)
on conflict (notion_id) do nothing;

-- ─────────────────────────────────────────────
-- Research Items (from Notion: Bold Design Research)
-- ─────────────────────────────────────────────
insert into research_items (title, description, source, source_url, category, notion_id) values
  ('Wood Geek Store',
   'Recherche sur les accessoires de table en bois haut de gamme pour la restauration.',
   'Wood Geek Store', null, 'Bois & matériaux',
   '8bb9f7f7-8ebe-4c07-adab-96943e5ce41e'),
  ('Walmart Round Hard Wood',
   'Analyse de références bois rondes pour la restauration professionnelle.',
   'Walmart', null, 'Bois & matériaux',
   '42dff31e-8175-4ee3-bd71-cac101aa685a'),
  ('Ramasse-monnaie inox rectangulaire',
   'Coupelle ramasse-monnaie inox rectangulaire avec clip — référence hellopro.fr.',
   'HelloPro',
   'https://materiel.hellopro.fr/coupelle-ramasse-monnaie-inox-rectangulaire-avec-clip-2059988-3001541-produit.html',
   'Accessoires table',
   '7ac5621a-454f-4d7c-93ad-196670658a11'),
  ('Porte Addition',
   'Design et fonctionnalité du porte-addition professionnel de restauration.',
   'Référence pro', null, 'Accessoires table',
   '230ee9bd-abba-4748-901d-71834e024a11')
on conflict (notion_id) do nothing;

-- ─────────────────────────────────────────────
-- Concepts (Bold Design culinary concepts)
-- ─────────────────────────────────────────────
insert into concepts (slug, name_fr, name_en, name_mn, description_fr, description_en, description_mn, type, stage, is_featured) values
  ('street-food',
   'Street Food Mongol-Parisien',
   'Mongolian-Parisian Street Food',
   'Монгол-Парисын Гудамжны Хоол',
   'Des recettes de rue mongoles revisitées avec les techniques parisiennes. Fast, savoureux, authentique.',
   'Mongolian street recipes revisited with Parisian techniques. Fast, flavourful, authentic.',
   'Парисын аргаар шинэчлэгдсэн Монголын гудамжны хоол.',
   'street', 'concept', false),
  ('bistrot-moderne',
   'Bistrot Moderne',
   'Modern Bistro',
   'Орчин үеийн Бистро',
   'Le bistrot parisien réinventé. Carte courte, produits locaux, atmosphère chaleureuse.',
   'The Parisian bistro reinvented. Short menu, local produce, warm atmosphere.',
   'Парисын бистрог шинэчилсэн. Богино цэс, орон нутгийн бүтээгдэхүүн.',
   'bistro', 'concept', false),
  ('food-truck',
   'Food Truck Haut de Gamme',
   'Premium Food Truck',
   'Хоолны Трак',
   'La restauration mobile haut de gamme. Design, menu, expérience — tout pensé pour le mouvement.',
   'Premium mobile dining. Design, menu, experience — built for movement.',
   'Чанартай хөдөлгөөнт хоол. Дизайн, цэс, туршлага.',
   'foodtruck', 'concept', false),
  ('fine-dining',
   'Fine Dining — Steppe & Paris',
   'Fine Dining — Steppe & Paris',
   'Нарийн Хоол — Тал нутаг & Парис',
   'Fine dining avec une âme. Les saveurs de la steppe rencontrent la rigueur française.',
   'Fine dining with a soul. Steppe flavours meet French rigour.',
   'Сэтгэлтэй нарийн хоол. Тал нутгийн амт Францын нарийн чанарттай нийлнэ.',
   'gastro', 'concept', false),
  ('projet-mongolie',
   'Projet Mongolie',
   'Mongolia Project',
   'Монголын Төсөл',
   'Importer les standards parisiens à Oulan-Bator. Restaurants, formations, concepts clé-en-main.',
   'Importing Parisian standards to Ulaanbaatar. Restaurants, training, turnkey concepts.',
   'Парисын стандартыг Улаанбаатарт авчрах. Ресторан, сургалт, бэлэн концепц.',
   'mongolia', 'development', true)
on conflict (slug) do nothing;

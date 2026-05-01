-- UAE Freezone Pricing
INSERT INTO pricing (destination, package_name, description, base_price, currency, included_services, processing_days) VALUES
('UAE_FREEZONE', 'Starter Package', 'Perfect for freelancers and small businesses', 5500, 'AED',
 '["Trade License", "1 Visa Quota", "Office Address", "Bank Account Assistance"]', 14),
('UAE_FREEZONE', 'Business Package', 'Ideal for growing businesses', 12000, 'AED',
 '["Trade License", "3 Visa Quotas", "Flexi-Desk Office", "Bank Account Assistance", "Accounting Setup"]', 14),
('UAE_FREEZONE', 'Enterprise Package', 'For established companies', 25000, 'AED',
 '["Trade License", "6 Visa Quotas", "Dedicated Office", "Bank Account", "PRO Services", "Accounting"]', 21);

-- UAE Mainland Pricing
INSERT INTO pricing (destination, package_name, description, base_price, currency, included_services, processing_days) VALUES
('UAE_MAINLAND', 'Mainland Basic', 'Access to local UAE market', 15000, 'AED',
 '["Trade License", "Local Sponsor Arrangement", "2 Visa Quotas", "Office Assistance"]', 21),
('UAE_MAINLAND', 'Mainland Premium', 'Full mainland business setup', 28000, 'AED',
 '["Trade License", "Local Sponsor", "5 Visa Quotas", "Office Setup", "Bank Assistance", "PRO Services"]', 30);

-- USA LLC Pricing
INSERT INTO pricing (destination, package_name, description, base_price, currency, included_services, processing_days) VALUES
('USA_LLC', 'Delaware LLC Basic', 'Most popular US business structure', 1200, 'USD',
 '["LLC Formation", "Registered Agent 1yr", "EIN Number", "Operating Agreement"]', 7),
('USA_LLC', 'Wyoming LLC Package', 'Best privacy laws in US', 950, 'USD',
 '["LLC Formation", "Registered Agent 1yr", "EIN Number", "Annual Report Filing"]', 5),
('USA_LLC', 'Premium US Setup', 'Complete business in America', 3500, 'USD',
 '["LLC Formation", "EIN", "Business Bank Account", "Virtual Office", "US Phone Number", "Bookkeeping Setup"]', 14);

-- Saudi Arabia Pricing
INSERT INTO pricing (destination, package_name, description, base_price, currency, included_services, processing_days) VALUES
('KSA', 'KSA Business Setup', 'Company formation in Saudi Arabia', 35000, 'SAR',
 '["Commercial Registration", "MISA License", "Chamber of Commerce", "Bank Account Assistance"]', 45),
('KSA', 'KSA Premium Package', 'Full Saudi market entry', 65000, 'SAR',
 '["Commercial Registration", "MISA License", "3 Work Visas", "Office Setup", "PRO Services", "Bank Account"]', 60);

-- Europe Pricing
INSERT INTO pricing (destination, package_name, description, base_price, currency, included_services, processing_days) VALUES
('EUROPE_UK', 'UK Ltd Company', 'British limited company', 800, 'GBP',
 '["Company Registration", "Registered Address 1yr", "Bank Account Intro", "VAT Registration"]', 3),
('EUROPE_ESTONIA', 'Estonia e-Residency Company', 'Digital EU company', 2500, 'EUR',
 '["e-Residency Application", "OU Company Formation", "Business Bank Account", "Accounting Setup"]', 30),
('EUROPE_PORTUGAL', 'Portugal NHR Setup', 'Tax-efficient EU residency', 8500, 'EUR',
 '["Company Formation", "NHR Tax Status", "Residency Application", "Bank Account", "Tax Planning"]', 90);

-- Knowledge Base Entries
INSERT INTO knowledge_base (category, subcategory, title, content) VALUES
('jurisdiction', 'UAE', 'UAE Freezone vs Mainland Comparison',
'UAE Freezones offer 100% foreign ownership, full profit repatriation, 0% corporate tax, and no customs duties within the freezone. However, freezone companies CANNOT directly trade within the UAE local market. They can sell to UAE clients through a local distributor or service agent. Popular freezones include: DIFC (finance), ADGM (finance), DMCC (commodities/trading), Dubai Media City (media), Dubai Internet City (tech), JAFZA (manufacturing/trading), RAK ICC (offshore/holding).

UAE Mainland companies require 51% local UAE sponsor (for most activities) OR can be 100% foreign owned in specific sectors since 2021 reforms. Mainland allows direct access to UAE market and government contracts. Mainland is preferred for retail, construction, healthcare, and government-facing businesses.

Recommendation: Choose Freezone if you are primarily doing international business. Choose Mainland if you need to sell directly to UAE consumers or government.'),

('citizenship', 'UAE', 'UAE Golden Visa Program',
'The UAE Golden Visa offers long-term residency (5 or 10 years, renewable) for:
1. Investors: Minimum AED 2 million investment in property, OR AED 2 million in a business/investment fund
2. Entrepreneurs: Must have an existing project with minimum capital of AED 500,000, or approval from business incubator
3. Specialized Talents: Doctors, scientists, engineers, artists, athletes with proven achievements
4. Executives: Senior managers with minimum salary of AED 30,000/month
5. Outstanding Students: With GPA above 3.75 from UAE or top world universities

Benefits: 100% business ownership in UAE, sponsor family members, no minimum stay requirement, multiple entry visa.

Cost: AED 2,800 to AED 5,000 government fees + our service fees starting from AED 8,000.'),

('citizenship', 'USA', 'USA EB-5 Investor Visa',
'The EB-5 Immigrant Investor Program grants US Green Card through investment:
- Standard: USD 1,050,000 investment creating 10 full-time jobs
- Targeted Employment Area (TEA): USD 800,000 investment in rural/high-unemployment area
- Regional Center: Investment through USCIS-approved regional centers (passive investment)

Processing time: 2-4 years for Green Card
Advantage: Full US permanent residency, path to citizenship after 5 years
Alternative: E-2 Treaty Investor Visa (non-immigrant, requires lower investment, renewable)

Our EB-5 service fee: USD 15,000 to USD 25,000 (legal fees separate)'),

('citizenship', 'Europe', 'European Golden Visa Programs',
'Top European Residency by Investment Programs:

1. PORTUGAL Golden Visa (most popular):
- Investment options: EUR 500,000 in investment funds, EUR 250,000 in cultural areas
- Get EU residency, visa-free Schengen travel, path to citizenship in 5 years
- Only need to stay 7 days/year in Portugal

2. SPAIN Golden Visa:
- Real estate investment: EUR 500,000
- Full family residency, path to citizenship in 10 years

3. GREECE Golden Visa:
- Real estate: EUR 250,000 (lowest in EU)
- Residency without living requirement, Schengen access

4. MALTA Permanent Residence Programme:
- Government contribution + property/rental + bonds
- Direct permanent residency, path to citizenship

Our recommendation: Portugal for best citizenship pathway, Greece for lowest cost.'),

('faq', 'general', 'Which country is best for my business?',
'The best country depends on your specific situation:

1. If you want TAX BENEFITS + LIFESTYLE: UAE is ideal. 0% personal income tax, 9% corporate tax (with exemptions), world-class lifestyle, strategic location between East and West.

2. If you want ACCESS TO US MARKET: USA LLC (especially Delaware or Wyoming) gives you credibility, access to US payment processors like Stripe, US banking, and the worlds largest market.

3. If you want EU MARKET ACCESS + FUTURE CITIZENSHIP: Portugal or Estonia in Europe. Estonia e-Residency is cheapest, Portugal gives fastest path to EU passport.

4. If your business is in SAUDI MARKET: You must set up in Saudi Arabia. The Saudi Vision 2030 is creating massive opportunities, especially in tourism, entertainment, tech, and construction.

5. If you want ASSET PROTECTION + PRIVACY: Wyoming LLC (USA) or RAK ICC (UAE offshore) offer strong privacy.

Client profile factors we consider: Nationality, current tax residency, type of business, target customers, travel patterns, family situation, budget.'),

('faq', 'UAE', 'How long does UAE company setup take?',
'UAE Company Formation Timeline:
- Freezone company: 7-14 working days (all documents ready)
- Mainland company: 2-4 weeks
- Offshore company (RAK ICC/JAFZA): 3-5 working days

Required documents: Passport copy, passport photo, business plan (for some freezones), proof of address (utility bill or bank statement).

Our process: Day 1 consultation -> Day 2 document collection -> Day 3-5 submission -> Day 7-14 license issued -> Bank account opening (2-4 weeks after license)

We handle everything. You do NOT need to visit UAE for freezone setup. For mainland, one visit may be required for Emirates ID.'),

('pricing', 'general', 'What is included in our service fees',
'Our company formation fees are ALL-INCLUSIVE and cover:
1. Government application fees (paid directly to authorities)
2. Our professional service fee (document preparation, follow-up, coordination)
3. Trade license / registration certificate
4. Company stamp / seal
5. Memorandum of Association / Operating Agreement
6. Registered office address (first year)
7. Bank account introduction letter
8. Post-setup guidance and support

NOT included (charged separately):
- Residence visa fees (separate government fee)
- Medical fitness test for visa
- Emirates ID fee
- Physical office rent (if required)
- Annual renewal fees (quoted separately)

Payment: 50% advance, 50% upon license delivery. We accept bank transfer, credit card, and crypto.');

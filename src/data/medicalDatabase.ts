import { DiseaseInfo, Doctor, HospitalClinic, ModelValidationMetric } from '../types';

export const MEDICAL_DISEASES: DiseaseInfo[] = [
  {
    id: 'melanoma_suspicious_lesion',
    name: 'Suspicious Pigmented Lesion / Atypical Nevus',
    category: 'Dermatology',
    overview: 'A pigmented cutaneous lesion displaying architectural disorder, asymmetry, irregular borders, or variegated color pigmentation that warrants in-person dermatoscopic evaluation and possible histopathological biopsy.',
    common_causes: [
      'Cumulative solar ultraviolet (UV) radiation exposure',
      'Episodes of severe sunburns, particularly during childhood/adolescence',
      'Genetic mutations in CDKN2A or BRAF pathways'
    ],
    risk_factors: [
      'High total nevus count (>50 moles) or presence of dysplastic nevi',
      'Fitzpatrick Skin Phototypes I and II (fair skin, red/blond hair, propensity to burn)',
      'Personal or first-degree family history of cutaneous melanoma',
      'Immunosuppression'
    ],
    common_symptoms: [
      'Often asymptomatic initially',
      'Pruritus (itching), focal tenderness, or mild bleeding upon minor trauma',
      'Notable changes in size, shape, surface contour, or pigmentation over weeks/months'
    ],
    typical_visual_audio_signs: [
      'Asymmetry across geometric axes',
      'Scalloped, notched, or poorly demarcated borders',
      'Variegated pigmentation (mixture of dark brown, black, tan, blue, or pink/depigmented zones)',
      'Diameter greater than 6 mm (though early lesions can be smaller)',
      'Visual evolution from baseline photography'
    ],
    clinical_diagnostic_tests: [
      'Polarized and non-polarized handheld dermatoscopy',
      'Full-body digital dermoscopy and sequential mole mapping',
      'Full-thickness excisional biopsy with 1–2 mm margins for histological micro-staging (Breslow thickness)'
    ],
    general_treatments: [
      'Surgical wide local excision with standard clinical margins according to Breslow depth',
      'Sentinel lymph node biopsy if clinically indicated by tumor depth',
      'Targeted immunotherapy or BRAF/MEK inhibitors for advanced or metastatic disease as guided by oncology',
      'Routine structured dermatological surveillance'
    ],
    prevention: [
      'Strict broad-spectrum UV protection (SPF 30–50+, water-resistant)',
      'Protective clothing, wide-brimmed hats, and UV-blocking sunglasses',
      'Avoidance of peak solar radiation hours (10 AM to 4 PM) and total avoidance of indoor tanning beds',
      'Monthly self-skin examinations using the ABCDE method'
    ],
    warning_signs: [
      'Rapid enlargement or vertical elevation of a pigmented spot',
      'Ulceration, oozing, spontaneous crusting, or satellite pigmented nodules nearby',
      'The "Ugly Duckling" sign: a lesion that visibly differs in morphology from the patient’s other moles'
    ],
    appropriate_specialist: 'Dermatologist or Mohs Micrographic / Surgical Dermatologist',
    references: [
      {
        title: 'Guidelines of Care for the Management of Primary Cutaneous Melanoma',
        organization: 'American Academy of Dermatology (AAD)',
        year: 2024,
        url: 'https://www.aad.org'
      },
      {
        title: 'Global Cancer Statistics & Skin Neoplasm Surveillance',
        organization: 'World Health Organization (WHO) / IARC',
        year: 2023,
        url: 'https://www.who.int'
      }
    ],
    last_reviewed_date: '2025-11-15'
  },
  {
    id: 'acne_vulgaris',
    name: 'Acne Vulgaris',
    category: 'Dermatology',
    overview: 'A common multifactorial inflammatory skin disorder involving the pilosebaceous units, characterized by comedones, inflammatory papules, pustules, and sometimes cysts or nodules.',
    common_causes: [
      'Cutibacterium acnes (C. acnes) proliferation within follicles',
      'Excess sebum production stimulated by androgens',
      'Follicular hyperkeratinization leading to microcomedone formation',
      'Innate and adaptive cutaneous inflammatory cascades'
    ],
    risk_factors: [
      'Pubertal and adolescent hormonal surges, as well as adult hormonal fluctuations (PCOS, menstrual cycles)',
      'Genetic predisposition with family history of severe nodulocystic acne',
      'Occlusive cosmetics, mechanical friction, and high-glycemic dietary patterns'
    ],
    common_symptoms: [
      'Visible whiteheads (closed comedones) and blackheads (open comedones)',
      'Erythematous, tender papules and pustules',
      'Post-inflammatory hyperpigmentation or erythema following lesion resolution',
      'Potential dermal scarring (ice pick, boxcar, or rolling scars)'
    ],
    typical_visual_audio_signs: [
      'Clustered comedones and inflammatory papules over the forehead, cheeks, jawline, back, or chest',
      'Seborrheic skin surface sheen',
      'Variable erythema surrounding individual follicles'
    ],
    clinical_diagnostic_tests: [
      'Comprehensive clinical cutaneous examination and lesion counting',
      'Assessment of scarring risk and secondary hyperpigmentation',
      'Endocrine laboratory workup (free testosterone, DHEA-S) if virilization or PCOS is suspected'
    ],
    general_treatments: [
      'Topical retinoids (adapalene, tretinoin) to normalize keratinocyte desquamation',
      'Topical antimicrobials and benzoyl peroxide to decrease bacterial load and prevent resistance',
      'Oral antibiotics, antiandrogens (spironolactone, oral contraceptives), or oral isotretinoin under physician supervision for moderate-to-severe refractory disease',
      'Gentle, non-comedogenic foaming cleanser and oil-free daily moisturizer'
    ],
    prevention: [
      'Use strictly non-comedogenic and fragrance-free skincare products',
      'Avoid aggressive scrubbing or mechanical popping/picking which induces scarring',
      'Wash face gently twice daily and immediately following strenuous exercise'
    ],
    warning_signs: [
      'Deep, painful, fluctuant cysts or sinus tracts',
      'Rapid development of keloidal or deep atrophic pitted scars',
      'Systemic signs (fever, arthralgia) in rare fulminant presentations'
    ],
    appropriate_specialist: 'Board-Certified Dermatologist',
    references: [
      {
        title: 'Evidence-based Guidelines for the Management of Acne Vulgaris',
        organization: 'American Academy of Dermatology (AAD)',
        year: 2024,
        url: 'https://www.jaad.org'
      },
      {
        title: 'Topical and Systemic Approaches in Inflammatory Acne: Systematic Review',
        organization: 'Cochrane Database of Systematic Reviews',
        year: 2023
      }
    ],
    last_reviewed_date: '2025-10-20'
  },
  {
    id: 'atopic_dermatitis_eczema',
    name: 'Atopic Dermatitis (Eczema)',
    category: 'Dermatology',
    overview: 'A chronic, pruritic, relapsing inflammatory cutaneous condition characterized by epidermal barrier dysfunction, immune dysregulation, and intense pruritus.',
    common_causes: [
      'Mutations in the filaggrin (FLG) gene causing stratum corneum barrier deficiency',
      'Type 2 immune pathway overactivation (IL-4, IL-13 cytokines)',
      'Environmental allergen and microbial sensitization'
    ],
    risk_factors: [
      'Personal or parental history of atopic triad (asthma, allergic rhinitis, atopic dermatitis)',
      'Dry climates and cold winter weather',
      'Frequent water exposure and harsh detergents'
    ],
    common_symptoms: [
      'Intense, sleep-disturbing pruritus (itching)',
      'Dry, xerotic, sensitive skin',
      'Erythematous, scaly patches, excoriations, and lichenification from chronic rubbing'
    ],
    typical_visual_audio_signs: [
      'Flexural involvement (antecubital and popliteal fossae, neck, wrists) in older children/adults',
      'Facial and extensor surface eczema in infants',
      'Accentuated skin markings (lichenification) and fine fissuring'
    ],
    clinical_diagnostic_tests: [
      'Hanifin and Rajka diagnostic criteria or UK Working Party diagnostic criteria',
      'Bacterial and viral swabs if secondary impetiginization or eczema herpeticum is suspected',
      'Patch testing in refractory atypical cases to rule out allergic contact dermatitis'
    ],
    general_treatments: [
      'Frequent, liberal application of high-lipid bland emollients and barrier repair ointments',
      'Short courses of topical corticosteroids or topical calcineurin inhibitors (tacrolimus, pimecrolimus) for active flares',
      'Topical PDE4 inhibitors (crisaborole) or JAK inhibitors',
      'Targeted biologic therapies (dupilumab, tralokinumab) for moderate-to-severe disease managed by a specialist'
    ],
    prevention: [
      'Daily 5-to-10 minute lukewarm baths followed within 3 minutes by emollient application ("soak and seal")',
      'Avoid wool and coarse synthetic clothing; choose soft cotton garments',
      'Maintain home humidity above 40% and avoid fragranced soaps'
    ],
    warning_signs: [
      'Punched-out, painful vesicles or umbilicated erosions with high fever (Eczema Herpeticum - medical emergency)',
      'Honey-colored crusting indicating secondary Staphylococcus aureus infection',
      'Erythroderma covering >90% body surface area'
    ],
    appropriate_specialist: 'Dermatologist or Clinical Allergist/Immunologist',
    references: [
      {
        title: 'Guidelines of Care for the Management of Atopic Dermatitis in Adults',
        organization: 'American Academy of Dermatology (AAD)',
        year: 2024
      }
    ],
    last_reviewed_date: '2025-08-12'
  },
  {
    id: 'infective_conjunctivitis',
    name: 'Acute Conjunctivitis ("Pink Eye")',
    category: 'Ophthalmology',
    overview: 'Inflammation of the thin, transparent mucous membrane (conjunctiva) lining the inner surface of the eyelids and covering the sclera, commonly caused by viral, bacterial, or allergic triggers.',
    common_causes: [
      'Viral infections (Adenovirus is most common, often associated with upper respiratory symptoms)',
      'Bacterial infections (Streptococcus pneumoniae, Haemophilus influenzae, Staphylococcus aureus)',
      'Allergic response (airborne pollen, pet dander, dust mites)'
    ],
    risk_factors: [
      'Direct contact with infected ocular secretions or contaminated fomites/towels',
      'Extended wear of contact lenses or poor contact lens hygiene',
      'Seasonal environmental allergy exposure'
    ],
    common_symptoms: [
      'Pink or prominent red injection of the bulbar and palpebral conjunctiva',
      'Foreign body sensation, burning, grittiness, or mild photophobia',
      'Ocular discharge (watery in viral/allergic; purulent or mucopurulent in bacterial)',
      'Eyelids matted shut upon waking in the morning'
    ],
    typical_visual_audio_signs: [
      'Diffuse hyperaemia of the conjunctival vessels',
      'Watery or yellowish-green discharge accumulating at the inner canthus',
      'Normal pupil size and brisk light reactivity (distinguishing from uveitis/glaucoma)',
      'Clear cornea without localized white infiltrates or clouding'
    ],
    clinical_diagnostic_tests: [
      'Slit-lamp biomicroscopy examining conjunctival follicles, papillae, and membrane formation',
      'Fluorescein staining with cobalt blue light to exclude corneal epithelial abrasions or dendritic ulcers',
      'Bacterial conjunctival culture in hyperacute purulent cases'
    ],
    general_treatments: [
      'Cool compresses and preservative-free artificial tears for symptomatic viral or allergic conjunctivitis',
      'Topical ophthalmic antibiotic drops/ointments if bacterial etiology is confirmed by a clinician',
      'Topical ophthalmic antihistamines or mast-cell stabilizers for allergic cases',
      'Strict cessation of contact lens wear until full clinical resolution'
    ],
    prevention: [
      'Frequent, thorough hand washing with soap and water',
      'Do not share towels, pillows, eye drops, or ocular makeup',
      'Disinfect contact lens cases regularly and discard expired lenses'
    ],
    warning_signs: [
      'Moderate-to-severe deep ocular pain or intense photophobia',
      'Reduced visual acuity or blurred vision not clearing with blinking',
      'Fixed, mid-dilated pupil or ciliary flush (circumcorneal injection indicating uveitis or acute angle closure)',
      'Copious rapid re-accumulating purulent discharge (hyperacute conjunctivitis)'
    ],
    appropriate_specialist: 'Ophthalmologist or Optometrist',
    references: [
      {
        title: 'Preferred Practice Pattern: Conjunctivitis',
        organization: 'American Academy of Ophthalmology (AAO)',
        year: 2024,
        url: 'https://www.aao.org'
      }
    ],
    last_reviewed_date: '2025-09-05'
  },
  {
    id: 'blepharitis_stye',
    name: 'Blepharitis & Hordeolum (Stye)',
    category: 'Ophthalmology',
    overview: 'Common inflammatory conditions of the eyelid margins; blepharitis involves chronic inflammation of the meibomian glands or lash follicles, while an acute hordeolum is an acute focal infectious nodule.',
    common_causes: [
      'Meibomian gland dysfunction (MGD) with altered tear lipid composition',
      'Overcolonization with normal skin flora (Staphylococcus epidermidis, S. aureus) or Demodex mites',
      'Acute localized focal staphylococcal infection of a Zeiss/Moll gland (external) or meibomian gland (internal hordeolum)'
    ],
    risk_factors: [
      'Ocular rosacea, seborrheic dermatitis, and history of dry eye disease',
      'Poor eyelid hygiene, incomplete eye makeup removal',
      'Prolonged screen usage causing reduced blink rate'
    ],
    common_symptoms: [
      'Gritty, dry, burning sensation along the eyelid rim',
      'Crusty debris, collarettes, or scurf at the base of the eyelashes upon awakening',
      'Tender, erythematous, focal swelling along the eyelid margin'
    ],
    typical_visual_audio_signs: [
      'Telangiectatic, thickened eyelid margins with clogged meibomian orifices',
      'Flakes or cylindrical dandruff around eyelash bases',
      'Discrete, erythematous, localized tender lump pointing toward skin or conjunctival surface'
    ],
    clinical_diagnostic_tests: [
      'Slit-lamp examination of eyelid margins, tear break-up time (TBUT), and meibography',
      'Fluorescein tear film evaluation',
      'Microscopic lash epilation exam for Demodex folliculorum if indicated'
    ],
    general_treatments: [
      'Daily warm compresses (10 minutes with clean washcloth or thermal eye mask) followed by gentle lid massage',
      'Eyelid margin cleansing with dedicated hypochlorous acid spray or gentle lid scrubs',
      'Preservative-free lipid-based artificial tears',
      'Short-term topical or oral antibiotics (doxycycline) prescribed by an eye specialist for refractory cases'
    ],
    prevention: [
      'Consistent daily eyelid hygiene routine',
      'Regular replacement of eye makeup every 3–6 months',
      'Screen ergonomics: adopt the 20-20-20 rule to maintain blink reflex'
    ],
    warning_signs: [
      'Spreading erythema and warmth extending across the entire eyelid, orbit, or cheek (Preseptal or Orbital Cellulitis)',
      'Proptosis (eyeball protruding forward), restricted or painful extraocular eye movements, or double vision',
      'Loss of eyelashes (madarosis) or recurrent chronic nodule at same site (requires biopsy to rule out sebaceous gland carcinoma)'
    ],
    appropriate_specialist: 'Ophthalmologist or Optometrist',
    references: [
      {
        title: 'Blepharitis Preferred Practice Pattern',
        organization: 'American Academy of Ophthalmology (AAO)',
        year: 2023
      }
    ],
    last_reviewed_date: '2025-07-18'
  },
  {
    id: 'dental_caries_plaque',
    name: 'Dental Plaque, Calculus & Enamel Demineralization',
    category: 'Oral & Dental',
    overview: 'Biofilm-mediated dynamic process where acid produced by cariogenic bacteria metabolizing fermentable dietary carbohydrates leads to localized mineral loss of tooth hard tissues.',
    common_causes: [
      'Cariogenic bacterial biofilm (Streptococcus mutans, Lactobacillus species)',
      'Frequent exposure to dietary fermentable sugars and acidic beverages',
      'Salivary hypofunction (xerostomia) resulting in diminished buffering capacity'
    ],
    risk_factors: [
      'Irregular tooth brushing and lack of interdental flossing',
      'High-sugar or high-fructose dietary habits with frequent snacking',
      'Medications causing dry mouth (antihistamines, antidepressants, antihypertensives)',
      'Deep occlusal pits and fissures or orthodontic appliances'
    ],
    common_symptoms: [
      'Early stages are completely asymptomatic',
      'Transient tooth sensitivity to cold liquids, hot foods, or concentrated sweets',
      'Persistent halitosis (bad breath) or visible yellow/brown mineralized deposits',
      'Rough sensation along the gumline with the tongue'
    ],
    typical_visual_audio_signs: [
      'Chalky, matte white spots along cervical margins (incipient reversible demineralization)',
      'Yellowish-white soft plaque biofilm or hard, calcified supra-gingival calculus deposits',
      'Dark brown or black cavitated defects on occlusal fissures or smooth surfaces'
    ],
    clinical_diagnostic_tests: [
      'Tactile clinical examination with dental explorer and visual drying inspection',
      'Intraoral bitewing and periapical radiographs to diagnose hidden interproximal and recurrent decay',
      'Laser fluorescence (DIAGNOdent) or fiber-optic transillumination (FOTI)'
    ],
    general_treatments: [
      'Professional mechanical plaque and calculus removal (ultrasonic scaling and polishing)',
      'Topical high-fluoride varnishes and remineralizing agents (casein phosphopeptide-amorphous calcium phosphate)',
      'Direct composite resin or ceramic restorations (fillings) for cavitated lesions',
      'Pit and fissure sealants on vulnerable molar occlusal surfaces'
    ],
    prevention: [
      'Brush teeth twice daily for two full minutes with fluoridated toothpaste (1000–1450 ppm F)',
      'Daily interdental cleaning with dental floss or interdental brushes',
      'Limit frequent snacking on fermentable carbohydrates and rinse with water after meals',
      'Biannual dental checkups and professional cleanings'
    ],
    warning_signs: [
      'Spontaneous, throbbing tooth pain that disrupts sleep',
      'Prolonged sensitivity to thermal stimuli persisting long after stimulus removal (irreversible pulpitis)',
      'Facial swelling, gum boil (fistula), or purulent drainage indicating a periapical abscess'
    ],
    appropriate_specialist: 'General Dentist or Pediatric Dentist',
    references: [
      {
        title: 'Evidence-based Clinical Practice Guideline on Nonrestorative Treatments for Carious Lesions',
        organization: 'American Dental Association (ADA)',
        year: 2024,
        url: 'https://www.ada.org'
      }
    ],
    last_reviewed_date: '2025-10-01'
  },
  {
    id: 'gingivitis_periodontal',
    name: 'Marginal Gingivitis & Periodontal Warning Patterns',
    category: 'Oral & Dental',
    overview: 'Reversible plaque-induced inflammation of the gingival soft tissues without loss of periodontal attachment, which if neglected can progress to chronic irreversible periodontitis with alveolar bone loss.',
    common_causes: [
      'Microbial biofilm accumulation along and beneath the gingival margin',
      'Inadequate mechanical plaque disruption',
      'Host hyper-inflammatory response to periopathogenic anaerobes (Porphyromonas gingivalis, Tannerella forsythia)'
    ],
    risk_factors: [
      'Tobacco smoking and vaping',
      'Poorly controlled diabetes mellitus',
      'Hormonal alterations during pregnancy or puberty',
      'Systemic immune compromise or systemic inflammatory disorders'
    ],
    common_symptoms: [
      'Gingival bleeding provoked by brushing, flossing, or eating firm foods',
      'Erythematous, edematous, puffy, or tender gum margins',
      'Persistent bad breath or bad metallic taste in the mouth'
    ],
    typical_visual_audio_signs: [
      'Loss of normal gingival stippling with rolled, bulbous interdental papillae',
      'Deep crimson or magenta marginal gingival color change',
      'Presence of heavy calculus deposits at the cervical enamel junction'
    ],
    clinical_diagnostic_tests: [
      'Full-mouth periodontal probing depth charting (measuring pocket depths at 6 sites per tooth)',
      'Assessment of Bleeding on Probing (BOP) index and clinical attachment loss (CAL)',
      'Full-mouth intraoral radiographic series to evaluate alveolar bone crest levels'
    ],
    general_treatments: [
      'Professional supragingival and subgingival scaling and root planing (deep cleaning)',
      'Chlorhexidine or essential oil antimicrobial rinses as short-term adjuncts',
      'Individualized oral hygiene instruction focusing on modified Bass brushing technique',
      'Ongoing supportive periodontal therapy (cleanings every 3–4 months for periodontitis patients)'
    ],
    prevention: [
      'Brush meticulously twice daily angling toothbrush bristles 45 degrees toward the gumline',
      'Daily interdental cleaning using floss or water flosser',
      'Smoking cessation',
      'Regular comprehensive periodontal examinations'
    ],
    warning_signs: [
      'Teeth becoming noticeably loose, shifting positions, or developing new gaps',
      'Gums visibly receding, exposing sensitive tooth root surfaces',
      'Spontaneous bleeding from gums or visible pus oozing between teeth and gums'
    ],
    appropriate_specialist: 'Periodontist or General Dentist',
    references: [
      {
        title: 'Global Guidelines on the Staging and Grading of Periodontitis',
        organization: 'American Academy of Periodontology (AAP) / EFP',
        year: 2024
      }
    ],
    last_reviewed_date: '2025-06-30'
  },
  {
    id: 'vocal_dysphonia_acoustic',
    name: 'Vocal Fold Dysphonia & Acoustic Perturbation Patterns',
    category: 'Voice & Laryngeal',
    overview: 'A clinical symptom complex manifested by abnormal voice quality, pitch, loudness, or vocal effort, frequently associated with benign vocal fold lesions (nodules, polyps), chronic laryngitis, or functional muscle tension.',
    common_causes: [
      'Phonotrauma (excessive shouting, vocal strain, excessive throat clearing)',
      'Gastroesophageal or laryngopharyngeal reflux (LPR) causing acid/pepsin irritation',
      'Benign vocal fold pathology (vocal nodules, polyps, cysts)',
      'Upper respiratory viral infections resulting in acute laryngitis'
    ],
    risk_factors: [
      'Professional voice users (teachers, singers, call center operators, public speakers)',
      'Cigarette smoking and exposure to secondary airborne irritants',
      'Chronic dehydration and frequent alcohol consumption',
      'Uncontrolled allergic rhinitis with chronic post-nasal drip'
    ],
    common_symptoms: [
      'Raspy, hoarse, breathy, strained, or rough vocal quality',
      'Vocal fatigue or loss of pitch range (especially upper singing registers)',
      'Feeling of a lump in the throat (globus sensation) or need to continually clear throat',
      'Increased physical effort required to phonate'
    ],
    typical_visual_audio_signs: [
      'Elevated acoustic jitter (frequency perturbation >1.04%)',
      'Elevated acoustic shimmer (amplitude perturbation >3.8%)',
      'Decreased Harmonics-to-Noise Ratio (HNR <20 dB)',
      'Reduced maximum phonation time on sustained vowels (<15 seconds in adults)'
    ],
    clinical_diagnostic_tests: [
      'Flexible or rigid transnasal/transoral videostroboscopy to assess vocal fold vibration and mucosal wave symmetry',
      'Acoustic voice analysis using standardized passages (CAPE-V or GRBAS perceptual scale)',
      'Laryngeal electromyography (LEMG) if neuromuscular impairment is suspected'
    ],
    general_treatments: [
      'Vocal hygiene modifications: generous systemic hydration, steam inhalation, avoidance of whispering or shouting',
      'Voice therapy led by a specialized Speech-Language Pathologist (resonant voice therapy, vocal function exercises)',
      'Management of underlying gastroesophageal reflux and environmental allergies',
      'Microlaryngeal phonomicrosurgery for discrete polyps or cysts unresponsive to therapy'
    ],
    prevention: [
      'Drink 2–3 liters of water daily to maintain thin vocal fold mucus',
      'Use voice amplification systems when speaking to large groups',
      'Incorporate brief vocal rest periods throughout demanding work days',
      'Avoid smoking, vaping, and mentholated lozenges which can dry mucosal linings'
    ],
    warning_signs: [
      'Persistent hoarseness lasting more than 2–3 weeks without obvious viral cause (requires direct laryngoscopy to rule out laryngeal neoplasm)',
      'Difficulty swallowing (dysphagia), pain radiating to the ear (otalgia), or coughing up blood (hemoptysis)',
      'Shortness of breath or audible inspiratory stridor'
    ],
    appropriate_specialist: 'Otolaryngologist (ENT / Laryngologist) & Speech-Language Pathologist',
    references: [
      {
        title: 'Clinical Practice Guideline: Hoarseness (Dysphonia)',
        organization: 'American Academy of Otolaryngology - Head and Neck Surgery (AAO-HNS)',
        year: 2024,
        url: 'https://www.entnet.org'
      }
    ],
    last_reviewed_date: '2025-11-01'
  }
];

export const VERIFIED_DOCTORS: Doctor[] = [
  {
    id: 'doc_1',
    name: 'Dr. Evelyn Vance',
    title: 'MD, FAAD',
    specialty: 'Dermatologist',
    subspecialty: 'Cutaneous Oncology & Mohs Surgery',
    degrees: ['Harvard Medical School (MD)', 'Stanford Dermatology Residency'],
    hospital_clinic: 'Metropolitan Dermatology & Cutaneous Care Center',
    city: 'San Francisco',
    state: 'CA',
    address: '450 Sutter St, Suite 1400',
    phone: '(415) 555-0142',
    accepting_patients: true,
    telehealth_available: true,
    verified_credentials: true,
    languages: ['English', 'Spanish'],
    experience_years: 16
  },
  {
    id: 'doc_2',
    name: 'Dr. Marcus Sterling',
    title: 'MD, FACS',
    specialty: 'Ophthalmologist',
    subspecialty: 'Cornea, External Diseases & Anterior Segment',
    degrees: ['Johns Hopkins School of Medicine (MD)', 'Wilmer Eye Institute Residency'],
    hospital_clinic: 'Bay Area Eye & Ophthalmic Surgery Institute',
    city: 'Oakland',
    state: 'CA',
    address: '3300 Webster St, Suite 500',
    phone: '(510) 555-0198',
    accepting_patients: true,
    telehealth_available: true,
    verified_credentials: true,
    languages: ['English'],
    experience_years: 19
  },
  {
    id: 'doc_3',
    name: 'Dr. Soraya Kazemi',
    title: 'DDS, MS',
    specialty: 'Periodontist',
    subspecialty: 'Gingival Regeneration & Oral Medicine',
    degrees: ['UCSF School of Dentistry (DDS)', 'Columbia University Periodontics (MS)'],
    hospital_clinic: 'Kazemi Periodontal & Dental Implant Specialty',
    city: 'San Jose',
    state: 'CA',
    address: '2505 Samaritan Dr, Suite 302',
    phone: '(408) 555-0231',
    accepting_patients: true,
    telehealth_available: false,
    verified_credentials: true,
    languages: ['English', 'Persian'],
    experience_years: 14
  },
  {
    id: 'doc_4',
    name: 'Dr. Julian Thorne',
    title: 'MD, FACS',
    specialty: 'Otolaryngologist',
    subspecialty: 'Laryngology, Voice Disorders & Swallowing',
    degrees: ['Columbia University VP&S (MD)', 'Massachusetts Eye and Ear Fellowship'],
    hospital_clinic: 'Center for Voice & Laryngeal Health',
    city: 'San Francisco',
    state: 'CA',
    address: '1 Daniel Burnham Ct, Suite 210',
    phone: '(415) 555-0374',
    accepting_patients: true,
    telehealth_available: true,
    verified_credentials: true,
    languages: ['English', 'French'],
    experience_years: 18
  },
  {
    id: 'doc_5',
    name: 'Dr. Anita Desai',
    title: 'MD, FACP',
    specialty: 'General Physician',
    subspecialty: 'Internal Medicine & Preventative Care',
    degrees: ['UCLA David Geffen School of Medicine (MD)', 'UCSF Internal Medicine'],
    hospital_clinic: 'Comprehensive Primary & Preventative Health',
    city: 'Berkeley',
    state: 'CA',
    address: '2999 Regent St, Suite 400',
    phone: '(510) 555-0455',
    accepting_patients: true,
    telehealth_available: true,
    verified_credentials: true,
    languages: ['English', 'Hindi'],
    experience_years: 12
  },
  {
    id: 'doc_6',
    name: 'Dr. Liam Montgomery',
    title: 'DDS',
    specialty: 'General Dentist',
    subspecialty: 'Restorative & Preventative Dentistry',
    degrees: ['University of Washington School of Dentistry (DDS)'],
    hospital_clinic: 'Apex Dental Care & Prevention Clinic',
    city: 'San Francisco',
    state: 'CA',
    address: '500 Parnassus Ave, Suite 120',
    phone: '(415) 555-0688',
    accepting_patients: true,
    telehealth_available: false,
    verified_credentials: true,
    languages: ['English'],
    experience_years: 11
  }
];

export const VERIFIED_HOSPITALS: HospitalClinic[] = [
  {
    id: 'hosp_1',
    name: 'University Academic Medical Center',
    type: 'Hospital',
    address: '505 Parnassus Avenue',
    city: 'San Francisco',
    state: 'CA',
    postal_code: '94143',
    phone: '(415) 476-1000',
    emergency_services: true,
    diagnostic_imaging: ['MRI', 'CT', 'Digital Dermoscopy', 'Ocular OCT', 'Biopsy Histology Lab'],
    specialties: ['Emergency Medicine', 'Cutaneous Oncology', 'Ophthalmology', 'Otolaryngology', 'Maxillofacial Surgery'],
    directions_note: 'Main entrance located on Parnassus Ave. Emergency department ramp accessible 24/7 on Hillway Ave.',
    hours: '24 Hours Emergency / Outpatient Clinics: Mon-Fri 8am-5pm'
  },
  {
    id: 'hosp_2',
    name: 'Northern California Institute of Ophthalmology',
    type: 'Eye Center',
    address: '1855 Folsom Street, 4th Floor',
    city: 'San Francisco',
    state: 'CA',
    postal_code: '94103',
    phone: '(415) 555-0112',
    emergency_services: false,
    diagnostic_imaging: ['Spectral-Domain OCT', 'Digital Fundus Camera', 'Corneal Topography', 'Slit-Lamp Digital Videography'],
    specialties: ['Corneal Disease', 'Glaucoma Diagnostics', 'Retinal Imaging', 'Oculoplastics'],
    directions_note: 'Located between 14th and 15th Street. Dedicated patient parking structure in rear.',
    hours: 'Mon-Fri 7:30am - 5:30pm, Sat 9:00am - 1:00pm'
  },
  {
    id: 'hosp_3',
    name: 'Advanced Cutaneous Dermatology & Phototherapy Center',
    type: 'Dermatology Center',
    address: '2200 Webster Street, Suite 305',
    city: 'San Francisco',
    state: 'CA',
    postal_code: '94115',
    phone: '(415) 555-0245',
    emergency_services: false,
    diagnostic_imaging: ['High-Resolution Digital Epiluminescence Dermoscopy', 'Total Body Mole Mapping', 'Reflectance Confocal Microscopy'],
    specialties: ['Atypical Lesion Triage', 'Inflammatory Dermatoses', 'Mohs Micrographic Surgery', 'Patch Testing'],
    directions_note: 'Adjacent to Pacific Heights Health Campus. Valet parking at front portico.',
    hours: 'Mon-Thu 8:00am - 6:00pm, Fri 8:00am - 4:00pm'
  },
  {
    id: 'hosp_4',
    name: 'Apex Comprehensive Dental & Periodontal Care',
    type: 'Dental Clinic',
    address: '350 Townsend Street, Suite 210',
    city: 'San Francisco',
    state: 'CA',
    postal_code: '94107',
    phone: '(415) 555-0389',
    emergency_services: false,
    diagnostic_imaging: ['Digital Cone Beam CT (CBCT)', 'Intraoral Digital Radiography', 'Laser Caries Fluorescence (DIAGNOdent)'],
    specialties: ['Periodontal Therapeutics', 'Restorative Dentistry', 'Oral Pathology Triage', 'Preventative Hygiene'],
    directions_note: 'Two blocks from Caltrain terminal. Street parking and garage available.',
    hours: 'Mon-Fri 8:00am - 5:00pm'
  },
  {
    id: 'hosp_5',
    name: 'Bay Medical Urgent Care & Diagnostic Facility',
    type: 'Diagnostic Center',
    address: '1900 Columbus Avenue',
    city: 'San Francisco',
    state: 'CA',
    postal_code: '94133',
    phone: '(415) 555-0499',
    emergency_services: false,
    diagnostic_imaging: ['Digital X-Ray', 'Ultrasound', 'Rapid Clinical Laboratory (CLIA-Certified)'],
    specialties: ['Acute Illness Triage', 'Minor Trauma Care', 'Wound Management', 'Diagnostic Lab'],
    directions_note: 'Walk-ins welcome with online check-in. Validated parking lot adjacent to building.',
    hours: 'Daily 8:00am - 8:00pm'
  }
];

export const MODEL_VALIDATION_METRICS: ModelValidationMetric[] = [
  {
    model_name: 'SkinNet-Derm-v2.4',
    specialty: 'Dermatological Lesions & Dermatoses',
    target_conditions: ['Melanocytic Nevi', 'Basal Cell Carcinoma', 'Melanoma Patterns', 'Acne Vulgaris', 'Atopic Dermatitis', 'Plaque Psoriasis'],
    training_dataset_size: '142,850 dermoscopic & clinical images',
    validation_dataset_size: '28,500 images',
    independent_test_dataset: 'ISIC-2024 Multi-Center Benchmark & Fitzpatrick17k External Cohort',
    sensitivity: 0.942,
    specificity: 0.918,
    precision: 0.894,
    recall: 0.942,
    f1_score: 0.917,
    roc_auc: 0.968,
    fitzpatrick_skin_bias_audited: true,
    age_demographic_balanced: true,
    published_peer_review: 'Lancet Digital Health (Pre-print evaluation protocol ref: CS-2025-081)',
    last_validated: '2025-10-14'
  },
  {
    model_name: 'OculoScan-v1.8',
    specialty: 'Anterior Segment & Ocular Adnexa',
    target_conditions: ['Conjunctivitis', 'Blepharitis', 'Hordeolum / Chalazion', 'Ptosis Margin Measurement', 'Visible Scleral Icterus'],
    training_dataset_size: '64,200 external ophthalmic photos',
    validation_dataset_size: '12,800 photos',
    independent_test_dataset: 'Multi-institutional Ocular Surface Evaluation Test Set',
    sensitivity: 0.915,
    specificity: 0.932,
    precision: 0.887,
    recall: 0.915,
    f1_score: 0.901,
    roc_auc: 0.952,
    fitzpatrick_skin_bias_audited: true,
    age_demographic_balanced: true,
    published_peer_review: 'Ophthalmology Science Technical Assessment (2025)',
    last_validated: '2025-11-02'
  },
  {
    model_name: 'DentaVision-v2.1',
    specialty: 'Intraoral Visible Hard & Soft Tissue',
    target_conditions: ['Plaque Accumulation', 'Visible Calculus', 'Marginal Gingivitis Patterns', 'Enamel Staining', 'Cervical Demineralization'],
    training_dataset_size: '51,400 photographic intraoral images',
    validation_dataset_size: '9,800 images',
    independent_test_dataset: 'Dental Academic Consortium Blinded Evaluation Set',
    sensitivity: 0.884,
    specificity: 0.926,
    precision: 0.869,
    recall: 0.884,
    f1_score: 0.876,
    roc_auc: 0.941,
    fitzpatrick_skin_bias_audited: true,
    age_demographic_balanced: true,
    published_peer_review: 'Journal of Dental Research Clinical AI Assessment (2025)',
    last_validated: '2025-09-20'
  },
  {
    model_name: 'Vocalis-Acoustic-v1.6',
    specialty: 'Acoustic Voice & Speech Feature Extraction',
    target_conditions: ['Acoustic Dysphonia Indices', 'Harmonic Perturbation', 'Speech Tempo Perturbations'],
    training_dataset_size: '18,600 standardized speech recordings (vowel & passage)',
    validation_dataset_size: '3,400 recordings',
    independent_test_dataset: 'Multilingual Acoustic Voice Benchmark & Parkinson’s Acoustic Cohort',
    sensitivity: 0.892,
    specificity: 0.905,
    precision: 0.871,
    recall: 0.892,
    f1_score: 0.881,
    roc_auc: 0.938,
    fitzpatrick_skin_bias_audited: false, // Audio model; accent/language audited
    age_demographic_balanced: true,
    published_peer_review: 'Journal of Speech, Language, and Hearing Research (2025)',
    last_validated: '2025-10-30'
  }
];

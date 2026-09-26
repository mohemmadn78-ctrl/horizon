export type ScreeningType = 'skin' | 'eye' | 'dental' | 'voice' | 'symptoms';

export type ScreeningOutcome = 'possible_finding' | 'uncertain' | 'poor_input';

export interface QualityMetric {
  name: string;
  passed: boolean;
  score: number; // 0 to 100
  threshold: number;
  message: string;
}

export interface InputQualityReport {
  overall_passed: boolean;
  status: 'passed' | 'marginal' | 'failed';
  summary: string;
  metrics: QualityMetric[];
  recommendations: string[];
}

export interface AbcdeAnalysis {
  asymmetry: { score: number; label: string; details: string };
  border: { score: number; label: string; details: string };
  color: { score: number; label: string; details: string };
  diameter: { score: number; label: string; details: string };
  evolution: { score: number; label: string; details: string };
}

export interface AcousticAnalysis {
  fundamental_frequency_hz: number; // F0
  f0_reference_range: string;
  jitter_percent: number; // Pitch perturbation
  shimmer_percent: number; // Amplitude perturbation
  harmonics_to_noise_ratio_db: number; // HNR
  speech_rate_syllables_per_sec: number;
  pause_ratio_percent: number;
  observations: string[];
}

export interface ModelMetadata {
  model_name: string;
  model_version: string;
  dataset_version: string;
  calibration_version: string;
  inference_timestamp: string;
  hardware_target?: string;
}

export interface DifferentialDiagnosis {
  condition: string;
  probability: 'high' | 'moderate' | 'low';
  rationale: string;
  key_features?: string[];
}

export interface AnatomicalFeatureObservation {
  anatomical_area: string;
  observation: string;
  clinical_significance: string;
}

export interface ScreeningResult {
  id: string;
  timestamp: string;
  screening_type: ScreeningType;
  screening_status: ScreeningOutcome;
  finding: string;
  condition_id?: string;
  confidence: number; // 0.00 to 1.00
  input_quality_summary: string;
  input_quality_details?: InputQualityReport;
  evidence: string[];
  limitations: string[];
  recommended_next_step: string;
  specialist: string;
  urgency_level: 'routine' | 'prompt_evaluation' | 'urgent_consult' | 'emergency';
  clinical_reasoning?: string;
  differential_diagnoses?: DifferentialDiagnosis[];
  doctor_discussion_questions?: string[];
  red_flags_warning?: string[];
  supportive_care_tips?: string[];
  anatomical_breakdown?: AnatomicalFeatureObservation[];
  user_reported_concerns?: string;
  user_reported_context?: {
    duration?: string;
    pain_level?: string;
    progression?: string;
    prior_episodes?: boolean;
  };
  image_preview?: string;
  audio_preview_name?: string;
  abcde?: AbcdeAnalysis;
  acoustic_metrics?: AcousticAnalysis;
  heatmap_mask?: string;
  model_info: ModelMetadata;
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface DiseaseInfo {
  id: string;
  name: string;
  category: 'Dermatology' | 'Ophthalmology' | 'Oral & Dental' | 'Voice & Laryngeal' | 'Systemic & Other';
  overview: string;
  common_causes: string[];
  risk_factors: string[];
  common_symptoms: string[];
  typical_visual_audio_signs: string[];
  clinical_diagnostic_tests: string[];
  general_treatments: string[];
  prevention: string[];
  warning_signs: string[];
  appropriate_specialist: string;
  references: {
    title: string;
    organization: string;
    year: number;
    url?: string;
  }[];
  last_reviewed_date: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  subspecialty?: string;
  degrees: string[];
  hospital_clinic: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  accepting_patients: boolean;
  telehealth_available: boolean;
  verified_credentials: boolean;
  languages: string[];
  experience_years: number;
}

export interface HospitalClinic {
  id: string;
  name: string;
  type: 'Hospital' | 'Eye Center' | 'Dental Clinic' | 'Dermatology Center' | 'Diagnostic Center';
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
  emergency_services: boolean;
  diagnostic_imaging: string[];
  specialties: string[];
  directions_note: string;
  hours: string;
}

export interface ModelValidationMetric {
  model_name: string;
  specialty: string;
  target_conditions: string[];
  training_dataset_size: string;
  validation_dataset_size: string;
  independent_test_dataset: string;
  sensitivity: number;
  specificity: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  fitzpatrick_skin_bias_audited: boolean;
  age_demographic_balanced: boolean;
  published_peer_review?: string;
  last_validated: string;
}

export interface UserConsentState {
  data_collection_agreed: boolean;
  model_improvement_opt_in: boolean;
  local_storage_agreed: boolean;
  agreed_timestamp?: string;
}

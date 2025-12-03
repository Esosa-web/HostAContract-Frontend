// src/types/index.ts

// --- Aggregation Types ---
export interface AggregationBucket {
    key: string | number | null;
    doc_count: number;
}

// Add this new interface
export interface AwardCriterion {
    name: string;
    weight: number | null;
}

export interface AggregationResults {
    stages?: AggregationBucket[];
    regions?: AggregationBucket[];
    main_procurement_categories?: AggregationBucket[];
    source_systems?: AggregationBucket[];
    // Add other aggregation results here if needed
}

// --- Search Result Type (from Elasticsearch) ---
export interface OpportunityResult {
    id?: number;
    opportunity_id: number; // Internal DB ID from ES _id
    title: string | null;
    description?: string | null; // Optional snippet from ES
    source_system: string | null;
    ocid?: string | null;
    stage?: string | null;
    notice_url?: string | null;
    release_date?: string | null; // Dates as ISO strings from ES
    tender_deadline_date?: string | null;
    // Maybe add more summary fields if needed for result cards
    buyer_name?: string | null;
    supplier_name?: string | null;
    award_value_amount?: number | null;
    tender_value_amount?: number | null;
    value_currency?: string | null; // Combined currency from SerializerMethodField
    score?: number | null; // ES relevance score
    is_favourited: boolean; // <<< --- ADD THIS LINE
    // Note: CPV/Address details usually not needed for search result cards
}

// --- Search API Response Type ---
export interface ApiResponse {
    total: number;
    page: number;
    size: number;
    results: OpportunityResult[];
    aggregations?: AggregationResults | null;
}

// --- Active Filter Types ---
export interface ActiveFilter {
    key: FilterKey | 'cpvCodes' | 'includeSubCpvSetting'; // Allow 'cpvCodes' as a key
    label: string;
    value: string | number; // Value used for filtering
    displayValue?: string; // Optional different value for display in badge
}

export type FilterKey =
    | 'stage' 
    | 'category' 
    | 'region' 
    // <<< --- CHANGE: Add the missing date keys --- >>>
    | 'release_date_from' 
    | 'release_date_to' 
    | 'deadlineFrom' 
    | 'deadlineTo'
    | 'valueFrom' 
    | 'valueTo' 
    | 'buyerName' 
    | 'sourceSystem'
    | 'includeSubCpvFalse';
      


// ==========================================================================
// START OF CHANGES FOR OPPORTUNITY DETAIL TYPES
// ==========================================================================

// --- NEW: Supplier Type (matches SupplierSerializer) ---
export interface Supplier {
    id: number; // Primary key of the Supplier record in your DB
    name: string;
    ocds_scheme: string | null;
    ocds_identifier: string | null;
  }

  
// --- NEW: Award Type (matches AwardSerializer, includes nested Suppliers) ---
export interface Award {
    id: number; // Primary key of the Award record in your DB
    ocds_award_id: string; // The ID from the OCDS data
    title: string | null;
    description: string | null;
    status: string | null;
    award_decision_date: string | null; // ISO date string
    value_amount: number | null;
    value_currency: string | null;
    contract_start_date: string | null; // ISO date string (actual start date of awarded contract)
    contract_end_date: string | null;   // ISO date string (actual end date of awarded contract)
    notice_published_date: string | null; // ISO date string (date the award *notice* was published)
    suppliers: Supplier[]; // Array of suppliers for this award
  }

// --- Opportunity Detail Type (from Detail API / Database) ---
// Matches the fields defined in the OpportunityDetailSerializer
export interface OpportunityDetail {
    id: number; // Internal WinaContract ID (primary key)
    source_system: string | null;
    source_release_id: string | null; // Keep if available, though your serializer doesn't explicitly list it
    ocid: string | null;
    title: string | null;
    description: string | null;
    language: string | null;
    stage: string | null;
    notice_url: string | null;
    release_date: string | null; // Keep as ISO string from API
    tender_deadline_date: string | null; // This is the overall submission/engagement deadline

    // --- FIELDS ADDED TO MATCH SERIALIZER & PARSER ---
    estimated_tender_publication_date: string | null; // For PINs
    tender_estimated_start_date: string | null;     // Estimated contract start (pre-award)
    tender_estimated_end_date: string | null;       // Estimated contract end (pre-award)
    // --- END ADDED FIELDS ---

    award_date_published: string | null; // Date an *award notice* was published

    tender_status: string | null;
    procurement_method: string | null;
    procurement_method_details: string | null;
    main_procurement_category: string | null;
    tender_value_amount: number | null;
    tender_value_currency: string | null;
    tender_minvalue_amount: number | null;
    tender_maxvalue_amount: number | null;
    cpv_codes: string | null; // Comma-separated string from DB model
    
    buyer_name: string | null;
    buyer_id: string | null;
    buyer_address_street: string | null;
    buyer_address_locality: string | null;
    buyer_address_region: string | null;
    buyer_address_postalcode: string | null;
    buyer_address_country: string | null;
    
    sme_suitable: boolean | null;
    vcse_suitable: boolean | null;

     // --- ADD THIS BLOCK ---
    enquiry_deadline_date?: string | null;
    estimated_award_date?: string | null;
    submission_instructions?: string | null;
    is_electronic_submission_allowed?: boolean | null;
    submission_languages?: string | null;
    award_criteria_details?: string | AwardCriterion[] | null; // Can be a string or an array of objects
    // --- END OF BLOCK ---
    
    last_fetched_at: string | null; // ISO string from API
    created_at: string | null;     // ISO string from API
    updated_at: string | null;     // ISO string from API
    raw_release_json?: any;
    
    // --- NESTED AWARD INFORMATION FROM SERIALIZER ---
    opportunity_awards: Award[]; // Array of awards
    is_favourited: boolean; // <<< --- ADD THIS LINE
    additional_documents: AdditionalDocument[] | null;

    // --- FIELDS REMOVED (now inside opportunity_awards) ---
    // contract_start_date: string | null; // MOVED to Award.contract_start_date
    // contract_end_date: string | null;   // MOVED to Award.contract_end_date
    // award_date: string | null;          // MOVED to Award.award_decision_date
    // award_id: string | null;            // MOVED to Award.ocds_award_id
    // award_status: string | null;        // MOVED to Award.status
    // award_value_amount: number | null;  // MOVED to Award.value_amount
    // award_value_currency: string | null;// MOVED to Award.value_currency
    // supplier_name: string | null;       // MOVED to Award.suppliers[0].name (example)
    // supplier_id: string | null;         // MOVED to Award.suppliers[0].ocds_identifier (example)
}

// ==========================================================================
// END OF CHANGES FOR OPPORTUNITY DETAIL TYPES
// ==========================================================================

// ==========================================================================
// START OF LEADERBOARD TYPES
// ==========================================================================

export interface LeaderboardBuyerEntry {
    rank: number;
    buyer_name: string;
    buyer_id_from_source: string; // Matches the `source` in serializer
    total_awarded_value: string; // DecimalField serializes as string
    award_count: number;
  }
  
  export interface LeaderboardSupplierEntry {
    rank: number;
    supplier_name: string; // Matches the `source` in serializer
    supplier_ocds_scheme: string | null;
    supplier_ocds_identifier: string | null;
    total_awarded_value: string; // DecimalField serializes as string
    award_count: number;
  }
  
  // The API will return an array of these entries
//   export type BuyerLeaderboardResponse = LeaderboardBuyerEntry[];
//   export type SupplierLeaderboardResponse = LeaderboardSupplierEntry[];
  
  // ==========================================================================
  // END OF LEADERBOARD TYPES
  // ==========================================================================

  // --- NEW/UPDATED API Response Structure Types ---
export interface BuyerLeaderboardApiResponse {
    year: number;
    month: number | null; // Assuming month can be null from backend if "All Months" was requested and backend reflects this
    leaderboard: LeaderboardBuyerEntry[];
  }
  
  export interface SupplierLeaderboardApiResponse {
    year: number;
    month: number | null;
    leaderboard: LeaderboardSupplierEntry[];
  }

  // ==========================================================================
// START OF AUTHENTICATION TYPES (FRONTEND STATE)
// ==========================================================================

export interface AuthenticatedUser { // User data to store in frontend auth state
    id: number;
    email: string; // Assuming email is used as username and is the primary identifier shown
    username: string; // Typically same as email in your setup
    first_name: string | null;
    last_name: string | null;
    tier: 'free' | 'premium' | 'professional';
    date_joined: string; // Django sends this as an ISO date string
    subscription_status: string | null; // Can be null if not a subscriber
    // Add any other user fields you want readily available in the frontend state
    is_staff: boolean; // <-- ADD THIS LINE
    councilId?: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: AuthenticatedUser | null;
    token: string | null;
    isLoading: boolean; // For async auth operations like login, register, fetching user
    error: string | null;  // For auth-related errors
  }
  
  export interface AuthContextType extends AuthState {
    login: (email_: string, password_: string, councilId?: string) => Promise<void>;
    register: (userData: any) => Promise<void>; // Define userData more specifically later
    logout: () => void;
    setApiError: (message: string | null) => void;
    refreshUserStatus: () => Promise<void>; // <<< --- ADD THIS LINE --- >>>
    // checkAuthStatus: () => Promise<void>; // To check token on app load
  }
  
  // ==========================================================================
  // END OF AUTHENTICATION TYPES
  // ==========================================================================

  // ==========================================================================
// START OF ALERT PROFILE TYPES (USER-SPECIFIC MANAGEMENT)
// ==========================================================================

export interface ApiAlertProfile { // Data structure for an Alert Profile from the API
  id: number;
  // user field might not be needed if endpoint is already user-specific, 
  // but if serializer includes it:
  // user: number; // or a nested User object if your serializer does that
  profile_name: string;
  keywords: string | null;
  cpv_codes: string | null;
  include_sub_cpv: boolean;
  location_keywords: string | null;
  min_value: string | null; // From DecimalField
  max_value: string | null; // From DecimalField
  is_active: boolean;
  last_alert_sent_at: string | null; // ISO date string
  created_at: string;                // ISO date string
  updated_at: string;                // ISO date string
  deadline_filter: string
}

export interface NewAlertProfileData { // For the creation form
  profile_name: string;
  keywords?: string; // Optional fields marked with ?
  cpv_codes?: string;
  include_sub_cpv: boolean; // Default to true on frontend form
  location_keywords?: string;
  min_value?: string;       // Will be converted to number or sent as string
  max_value?: string;       // Will be converted to number or sent as string
  is_active: boolean;      // Default to true on frontend form
  deadline_filter?: string;
}

// ==========================================================================
// END OF ALERT PROFILE TYPES
// ==========================================================================

export interface AdditionalDocument {
  url: string;
  documentType: 'applyOnline' | 'attachment';
  description: string | null;
  true_filename?: string;
}
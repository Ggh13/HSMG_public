export interface AnthFilter {
    start_date: string;
    end_date: string
}

export interface Anthropometry {
    id: number;
    user_id: number;
    height: number;
    weight: number;
    neck_girth: number;
    shoulder_girth: number;
    chest_girth: number;
    waist_girth: number;
    biceps_girth: number;
    forearms_girth: number;
    hip_girth: number;
    quadriceps_girth: number;
    calf_girth: number;
    wrist_girth: number;
    ankle_girth: number;
    date: string;
}

export type BodyMeasurementType =
    | 'height'
    | 'weight'
    | 'neck_girth'
    | 'shoulder_girth'
    | 'chest_girth'
    | 'waist_girth'
    | 'biceps_girth'
    | 'forearms_girth'
    | 'hip_girth'
    | 'quadriceps_girth'
    | 'calf_girth'
    | 'wrist_girth'
    | 'ankle_girth';
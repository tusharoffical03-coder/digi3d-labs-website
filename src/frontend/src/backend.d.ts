import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    service: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface Review {
    name: string;
    role: string;
    reviewText: string;
    company: string;
    timestamp: bigint;
    rating: bigint;
}
export interface backendInterface {
    getReviews(): Promise<Array<Review>>;
    getSubmissions(): Promise<Array<ContactSubmission>>;
    submitContact(name: string, email: string, phone: string, service: string, message: string): Promise<boolean>;
    submitReview(name: string, company: string, role: string, rating: bigint, reviewText: string): Promise<boolean>;
}

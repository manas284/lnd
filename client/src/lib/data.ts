// This file contains utility functions for fetching data from the API
import { Product, Category, Testimonial } from "@shared/schema";

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const url = categorySlug 
    ? `/api/products?category=${categorySlug}` 
    : "/api/products";
    
  return fetch(url).then(res => {
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  });
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return fetch("/api/products/featured").then(res => {
    if (!res.ok) throw new Error("Failed to fetch featured products");
    return res.json();
  });
}

export async function getProductBySlug(slug: string): Promise<Product> {
  return fetch(`/api/products/${slug}`).then(res => {
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  });
}

export async function getCategories(): Promise<Category[]> {
  return fetch("/api/categories").then(res => {
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetch("/api/testimonials").then(res => {
    if (!res.ok) throw new Error("Failed to fetch testimonials");
    return res.json();
  });
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ message: string; id: number }> {
  return fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then(res => {
    if (!res.ok) throw new Error("Failed to submit contact form");
    return res.json();
  });
}

// Helper function to get related products (excluding current product)
export async function getRelatedProducts(currentProductSlug: string, limit: number = 4): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter(product => product.slug !== currentProductSlug)
    .slice(0, limit);
}

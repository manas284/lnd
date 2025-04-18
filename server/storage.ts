import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  testimonials, type Testimonial, type InsertTestimonial,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods (keeping original methods)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentTestimonialId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentTestimonialId = 1;
    this.currentContactMessageId = 1;
    
    // Initialize with some seed data
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoryData: InsertCategory[] = [
      { name: "Nuts", slug: "nuts" },
      { name: "Seeds", slug: "seeds" },
      { name: "Dried Fruits", slug: "dried-fruits" },
      { name: "Gift Boxes", slug: "gift-boxes" }
    ];
    
    categoryData.forEach(category => this.createCategory(category));
    
    // Seed products
    const productData: InsertProduct[] = [
      {
        name: "Plain Cashews",
        slug: "plain-cashews",
        description: "Handpicked, premium-quality cashews with a natural creamy taste.",
        price: "599",
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoryId: 1,
        isFeatured: true
      },
      {
        name: "Salted Cashews",
        slug: "salted-cashews",
        description: "Deliciously roasted cashews with a light touch of salt for the perfect snack.",
        price: "649",
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1590080874088-eec64895b423?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoryId: 1,
        isFeatured: true
      },
      {
        name: "Premium Almonds",
        slug: "premium-almonds",
        description: "Crunchy and nutritious almonds, perfect for snacking.",
        price: "699",
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1574570095218-a2dd84a616dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoryId: 1,
        isFeatured: true
      },
      {
        name: "Organic Dates",
        slug: "organic-dates",
        description: "A rich source of fiber and essential nutrients for healthy snacking.",
        price: "399",
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1611071749773-a6e143fdcd3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoryId: 3,
        isFeatured: true
      },
      {
        name: "Golden Raisins",
        slug: "golden-raisins",
        description: "Naturally sweet and a great energy booster.",
        price: "349",
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1596591868231-05e908752cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoryId: 3,
        isFeatured: false
      },
      {
        name: "Mix Seeds",
        slug: "mix-seeds",
        description: "A healthy blend of flax, pumpkin, and sunflower seeds.",
        price: "499",
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1594149452519-43ed28458789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoryId: 2,
        isFeatured: false
      },
      {
        name: "Festive Gift Box",
        slug: "festive-gift-box",
        description: "Assorted premium dry fruits in an elegant gift box.",
        price: "1499",
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoryId: 4,
        isFeatured: false
      },
      {
        name: "Premium Walnuts",
        slug: "premium-walnuts",
        description: "Fresh, crunchy walnuts rich in omega-3 fatty acids.",
        price: "799",
        discountPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1514995669114-6081e934b693?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoryId: 1,
        isFeatured: false
      }
    ];
    
    productData.forEach(product => this.createProduct(product));
    
    // Seed testimonials
    const testimonialData: InsertTestimonial[] = [
      {
        name: "Priya S.",
        content: "Absolutely love the freshness of Farmley's almonds. Highly recommend!",
        rating: 5
      },
      {
        name: "Rahul K.",
        content: "The best dry fruits I've ever had. Great taste and quality!",
        rating: 5
      },
      {
        name: "Ananya M.",
        content: "Perfect for gifting! The packaging was elegant and premium.",
        rating: 5
      }
    ];
    
    testimonialData.forEach(testimonial => this.createTestimonial(testimonial));
  }

  // User methods implementations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods implementations
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods implementations
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  // Testimonial methods implementations
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Contact message methods implementations
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const contactMessage: ContactMessage = { ...insertContactMessage, id };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product || undefined;
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.categoryId, categoryId));
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.isFeatured, true));
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }
  
  // Contact message methods
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db.insert(contactMessages).values(insertContactMessage).returning();
    return contactMessage;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  // Seed data method to populate database with initial data
  async seedDatabase() {
    // Check if categories already exist
    const existingCategories = await this.getAllCategories();
    if (existingCategories.length === 0) {
      // Seed categories
      const categoryData: InsertCategory[] = [
        { name: "Nuts", slug: "nuts" },
        { name: "Seeds", slug: "seeds" },
        { name: "Dried Fruits", slug: "dried-fruits" },
        { name: "Gift Boxes", slug: "gift-boxes" }
      ];
      
      for (const category of categoryData) {
        await this.createCategory(category);
      }
      
      // Seed products
      const productData: InsertProduct[] = [
        {
          name: "Plain Cashews",
          slug: "plain-cashews",
          description: "Handpicked, premium-quality cashews with a natural creamy taste.",
          price: "599",
          discountPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          categoryId: 1,
          isFeatured: true
        },
        {
          name: "Salted Cashews",
          slug: "salted-cashews",
          description: "Deliciously roasted cashews with a light touch of salt for the perfect snack.",
          price: "649",
          discountPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1590080874088-eec64895b423?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          categoryId: 1,
          isFeatured: true
        },
        {
          name: "Premium Almonds",
          slug: "premium-almonds",
          description: "Crunchy and nutritious almonds, perfect for snacking.",
          price: "699",
          discountPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1574570095218-a2dd84a616dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          categoryId: 1,
          isFeatured: true
        },
        {
          name: "Organic Dates",
          slug: "organic-dates",
          description: "A rich source of fiber and essential nutrients for healthy snacking.",
          price: "399",
          discountPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1611071749773-a6e143fdcd3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          categoryId: 3,
          isFeatured: true
        },
        {
          name: "Golden Raisins",
          slug: "golden-raisins",
          description: "Naturally sweet and a great energy booster.",
          price: "349",
          discountPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1596591868231-05e908752cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          categoryId: 3,
          isFeatured: false
        },
        {
          name: "Mix Seeds",
          slug: "mix-seeds",
          description: "A healthy blend of flax, pumpkin, and sunflower seeds.",
          price: "499",
          discountPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1594149452519-43ed28458789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          categoryId: 2,
          isFeatured: false
        },
        {
          name: "Festive Gift Box",
          slug: "festive-gift-box",
          description: "Assorted premium dry fruits in an elegant gift box.",
          price: "1499",
          discountPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          categoryId: 4,
          isFeatured: false
        },
        {
          name: "Premium Walnuts",
          slug: "premium-walnuts",
          description: "Fresh, crunchy walnuts rich in omega-3 fatty acids.",
          price: "799",
          discountPrice: null,
          imageUrl: "https://images.unsplash.com/photo-1514995669114-6081e934b693?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          categoryId: 1,
          isFeatured: false
        }
      ];
      
      for (const product of productData) {
        await this.createProduct(product);
      }
      
      // Seed testimonials
      const testimonialData: InsertTestimonial[] = [
        {
          name: "Priya S.",
          content: "Absolutely love the freshness of Farmley's almonds. Highly recommend!",
          rating: 5
        },
        {
          name: "Rahul K.",
          content: "The best dry fruits I've ever had. Great taste and quality!",
          rating: 5
        },
        {
          name: "Ananya M.",
          content: "Perfect for gifting! The packaging was elegant and premium.",
          rating: 5
        }
      ];
      
      for (const testimonial of testimonialData) {
        await this.createTestimonial(testimonial);
      }
    }
  }
}

// Initialize the storage with database implementation
export const storage = new DatabaseStorage();

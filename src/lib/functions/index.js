import { ConnectDB } from "../db/ConnectDB";
import mongoose from "mongoose";
import AboutUsModel from "../models/AboutUsModel";
import AmcsLogoModel from "../models/AmcsLogos";
import ArnModel from "../models/ArnModel";
import BlogsModel from "../models/BlogModel";
import MissionVisionModel from "../models/MissionVissionModel";
import ServicesModel from "../models/ServicesModel";
import SiteSettingsModel from "../models/SiteSetting";
import SocialMediaModel from "../models/SocialMedia";
import TeamModel from "../models/TeamModel";
import TestimonialModel from "../models/TestimonialModel";
import VideoModel from "../models/VideoModel";
import fs from "fs";
import path from "path";
import { DEFAULT_SERVICES, DEFAULT_SITE_SETTINGS } from "../site-defaults";

export async function getSiteData() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return DEFAULT_SITE_SETTINGS;
    const data = await SiteSettingsModel?.findOne({}).select("-_id");
    const site = data ? data.toObject() : {};
    return { ...DEFAULT_SITE_SETTINGS, ...site };
  } catch (error) {
    console.error("Error fetching site data:", error);
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function getMissionVission() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return {};
    const data = await MissionVisionModel?.findOne({}).select("-_id");
    return data ? data.toObject() : {};
  } catch (error) {
    console.error("Error fetching mission vision:", error);
    return {};
  }
}

export async function getSocialMedia() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return [];
    const data = await SocialMediaModel?.find({}).select("-_id");
    return data ? data.map((service) => service.toObject()) : [];
  } catch (error) {
    console.error("Error fetching social media:", error);
    return [];
  }
}

export async function getArn() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return [];
    const data = await ArnModel?.find({}).select("-_id");
    return data ? data.map((service) => service.toObject()) : [];
  } catch (error) {
    console.error("Error fetching ARN:", error);
    return [];
  }
}

export async function getServiceData() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return DEFAULT_SERVICES;
    const data = await ServicesModel?.find({}).select("-_id"); // Use find() instead of findOne()
    const services = data ? data.map((service) => service.toObject()) : [];
    if (services.length === 0) return DEFAULT_SERVICES;

    const allowed = new Set(DEFAULT_SERVICES.map((s) => s.link));
    const fromDbByLink = new Map(
      services.filter((s) => allowed.has(s?.link)).map((s) => [s.link, s])
    );

    return DEFAULT_SERVICES.map((fallback) => {
      const fromDb = fromDbByLink.get(fallback.link);
      return fromDb ? { ...fallback, ...fromDb } : fallback;
    });
  } catch (error) {
    console.error("Error fetching service data:", error);
    return DEFAULT_SERVICES;
  }
}

export async function getTestimonials() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return [];
    const data = await TestimonialModel?.find({}).select("-_id"); // Use find() instead of findOne()
    return data ? data.map((service) => service.toObject()) : [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function getTeams() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return [];
    const data = await TeamModel?.find({}).select("-_id"); // Use find() instead of findOne()
    return data ? data.map((service) => service.toObject()) : [];
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

export async function getAboutus() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return [];
    const data = await AboutUsModel?.find({}).select("-_id"); // Use find() instead of findOne()
    return data ? data.map((service) => service.toObject()) : [];
  } catch (error) {
    console.error("Error fetching about us:", error);
    return [];
  }
}
export async function getLatestBlogs() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return [];

    const blogs = await BlogsModel.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(3) // Get only the latest 3
      .select("-_id"); // Exclude the MongoDB _id if not needed

    return blogs ? blogs.map((blog) => blog.toObject()) : [];
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    return [];
  }
}

export async function getAddisLogos() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return [];
    const logos = await AmcsLogoModel.find({ addisstatus: true });
    return logos.map((logo) => logo.toObject());
  } catch (error) {
    console.error("Error fetching addis logos:", error);
    return [];
  }
}

export async function getBlogs() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return [];
    const data = await BlogsModel?.find({}).select("-_id"); // Use find() instead of findOne()
    return data ? data.map((service) => service.toObject()) : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getVidios() {
  try {
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return [];
    const data = await VideoModel?.find({}).select("-_id"); // Use find() instead of findOne()
    return data ? data.map((service) => service.toObject()) : [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export async function getBlogBySlug(slug) {
  try {
    // console.log(slug,"dnajkdnhasjlkdnaslk")
    await ConnectDB();
    if (mongoose.connection.readyState !== 1) return null;
    const blog = await BlogsModel.findOne({ slug });
    // console.log(blog,"ndjadn")
    return blog ? blog.toObject() : null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}

export async function saveImageToLocal(section, file) {
  try {
    const uploadDir = path.join(process.cwd(), process.env.UPLOAD_URL, section);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    return {
      filename,
      url: `/api/uploads?section=${section}&filename=${filename}`,
    };
  } catch (error) {
    console.error("saveImageToLocal error:", error.message);
    return null;
  }
}

export function deleteFileIfExists(section, filename) {
  const filePath = path.join(
    process.cwd(),
    process.env.UPLOAD_URL,
    section,
    filename
  );
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

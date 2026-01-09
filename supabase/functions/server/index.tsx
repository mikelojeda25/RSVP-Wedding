import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Health check endpoint
app.get("/make-server-d3f23999/health", (c) => {
  return c.json({ status: "ok" });
});

// RSVP submission endpoint
app.post("/make-server-d3f23999/rsvp", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, guests, attending, dietary, message } = body;

    // Validate required fields
    if (!name || !email || !attending) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Create a unique key for this RSVP using timestamp and email
    const timestamp = new Date().toISOString();
    const key = `rsvp:${email}:${Date.now()}`;

    // Store the RSVP data
    const rsvpData = {
      name,
      email,
      guests,
      attending,
      dietary: dietary || "",
      message: message || "",
      submittedAt: timestamp,
    };

    await kv.set(key, rsvpData);

    console.log(`RSVP submitted successfully for ${email}`);
    return c.json({ success: true, message: "RSVP submitted successfully" });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return c.json({ error: "Failed to save RSVP" }, 500);
  }
});

// Get all RSVPs (for viewing responses)
app.get("/make-server-d3f23999/rsvps", async (c) => {
  try {
    const rsvps = await kv.getByPrefix("rsvp:");
    return c.json({ rsvps });
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return c.json({ error: "Failed to fetch RSVPs" }, 500);
  }
});

Deno.serve(app.fetch);

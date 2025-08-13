function createNavButton(cloneFromId, newId, label, iconUrl, contentId) {
  const existing = document.querySelector(cloneFromId);
  if (!existing) throw new Error(`Template button not found: ${cloneFromId}`);

  const btn = existing.cloneNode(true);
  btn.id = newId;
  btn.querySelector(".nav-text").innerHTML = label;
  btn.classList.remove("nav-link-current");
  document.querySelector("#nav-buttons").appendChild(btn);
  btn
    .querySelector(".nav-bg-image")
    .setAttribute(
      "style",
      `background-position: 50%;background-repeat:no-repeat; background-size: 70%; background-image: url('${iconUrl}');`,
    );

  btn.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();

    const existingContent = document.getElementById(contentId);
    if (
      existingContent &&
      window.getComputedStyle(existingContent).display !== "none"
    ) {
      return false;
    }

    document.querySelectorAll("#nav-buttons li").forEach((li) => {
      li.classList.remove("nav-link-current");
    });

    btn.querySelector(".nav-text").style.color = "#404040";

    document.querySelector(".navigation-title").textContent = label;
    document.querySelector(
      "#content",
    ).innerHTML = `<div id="${contentId}"></div>`;

    return false;
  });

  return btn;
}

// API endpoint for checking permissions
// Try proxy first, fallback to direct URL if needed
const isDev = typeof __IS_DEV__ !== "undefined" ? __IS_DEV__ : false;
const PERMISSIONS_API_ENDPOINT = isDev
  ? "/api/auth"
  : "http://localhost:8085/auth";

// Function to get authentication token based on environment
function getAuthToken() {
  console.log("Getting Auth Token");
  // Use Vite-injected development flag
  const isDevelopment = typeof __IS_DEV__ !== "undefined" ? __IS_DEV__ : false;
  console.log("Is Development:", isDevelopment);

  if (isDevelopment) {
    // Development: get token from environment variable (injected by Vite)
    return typeof __VITE_NS_TOKEN__ !== "undefined" ? __VITE_NS_TOKEN__ : null;
  } else {
    // Production: get token from localStorage
    return localStorage.getItem("ns_t");
  }
}

// Cache key for localStorage
const USER_DATA_CACHE_KEY = "billing_user_auth";
const CACHE_EXPIRY_KEY = "billing_user_auth_expiry";
const CACHE_DURATION = 30 * 60 * 1000;

function getCachedUserData() {
  try {
    const cachedData = localStorage.getItem(USER_DATA_CACHE_KEY);
    const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

    if (cachedData && cacheExpiry) {
      const now = Date.now();
      const expiryTime = parseInt(cacheExpiry, 10);

      if (now < expiryTime) {
        console.log("Using cached user data");
        return JSON.parse(cachedData);
      } else {
        console.log("Cache expired, will fetch fresh data");
        // Clear expired cache
        localStorage.removeItem(USER_DATA_CACHE_KEY);
        localStorage.removeItem(CACHE_EXPIRY_KEY);
      }
    }

    return null;
  } catch (error) {
    console.error("Error reading cached data:", error);
    // Clear corrupted cache
    localStorage.removeItem(USER_DATA_CACHE_KEY);
    localStorage.removeItem(CACHE_EXPIRY_KEY);
    return null;
  }
}

// Function to cache user data in localStorage
function setCachedUserData(data) {
  try {
    const expiryTime = Date.now() + CACHE_DURATION;
    localStorage.setItem(USER_DATA_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_EXPIRY_KEY, expiryTime.toString());
    console.log("User data cached for 30 minutes");
  } catch (error) {
    console.error("Error caching user data:", error);
  }
}

function determinePermissions(data) {
  const isOfficeManager = data.userScope.includes("Office Manager");
  const permissions = {
    billingCenter: isOfficeManager,
    serviceDesk: true, // Always allow service desk
  };

  console.log("Determined permissions:", permissions);
  return permissions;
}

// Function to check user permissions
async function checkUserPermissions() {
  try {
    const token = getAuthToken();
    console.log("Auth Token:", token);

    if (!token) {
      console.warn("No authentication token found");
      return { billingCenter: false, serviceDesk: true };
    }

    // Check cache first
    const cachedData = getCachedUserData();
    if (cachedData) {
      console.log("Using cached API response:", cachedData);
      return determinePermissions(cachedData);
    }

    // If no cache, make API request
    console.log("Making API request to:", PERMISSIONS_API_ENDPOINT);
    const response = await fetch(PERMISSIONS_API_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fresh API Response:", data);

    // Cache the response
    setCachedUserData(data);

    return determinePermissions(data);
  } catch (error) {
    console.error("Error checking user permissions:", error);

    // Try to use cached data even if expired, as fallback
    const cachedData = localStorage.getItem(USER_DATA_CACHE_KEY);
    if (cachedData) {
      try {
        console.log("Using expired cached data as fallback");
        const data = JSON.parse(cachedData);
        return determinePermissions(data);
      } catch (parseError) {
        console.error("Error parsing cached data:", parseError);
      }
    }

    // Return default permissions if all else fails
    return { billingCenter: false, serviceDesk: true };
  }
}

// Function to initialize navigation based on permissions
async function initializeNavigation() {
  try {
    const permissions = await checkUserPermissions();

    // Create Billing Center button first (if user has permission)
    if (permissions.billingCenter === true) {
      createNavButton(
        "#nav-callhistory",
        "nav-billing",
        "Billing Center",
        "https://raw.githubusercontent.com/VoiceLogix/billing-portal/refs/heads/main/public/asset/billing-center.svg",
        "billing-center-content",
      );
    }

    // Then create Service Desk button
    createNavButton(
      "#nav-callhistory",
      "nav-service-desk",
      "Service Desk",
      "https://raw.githubusercontent.com/VoiceLogix/billing-portal/refs/heads/main/public/asset/service-desk.svg",
      "service-desk-content",
    );
  } catch (error) {
    console.error("Error initializing navigation:", error);
    // Fallback: only show Service Desk if there's an error
    createNavButton(
      "#nav-callhistory",
      "nav-service-desk",
      "Service Desk",
      "https://raw.githubusercontent.com/VoiceLogix/billing-portal/refs/heads/main/public/asset/service-desk.svg",
      "service-desk-content",
    );
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeNavigation);
} else {
  initializeNavigation();
}

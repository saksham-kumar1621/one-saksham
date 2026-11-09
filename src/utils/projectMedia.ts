import type { ProjectItem } from "../data/portfolioData";

/**
 * Verified direct raw GitHub logo & asset URLs for One Saksham's repositories.
 */
export const KNOWN_REPO_LOGOS: Record<string, string> = {
  modvault:
    "https://raw.githubusercontent.com/saksham-kumar1621/modvault/main/public/logo.png",
  "universal-git-pusher":
    "https://raw.githubusercontent.com/saksham-kumar1621/universal-git-pusher/main/public/assets/logo.png",
  "minecraft-port-forwarder":
    "https://raw.githubusercontent.com/saksham-kumar1621/minecraft-port-forwarder/main/assets/icon.png",
  storagerelief:
    "https://raw.githubusercontent.com/saksham-kumar1621/storagerelief-github/main/src-tauri/icons/icon.png",
  "storagerelief-github":
    "https://raw.githubusercontent.com/saksham-kumar1621/storagerelief-github/main/src-tauri/icons/icon.png",
};

/**
 * Extracts the repository owner and name from a GitHub URL
 */
export const parseGithubRepo = (
  githubUrl?: string
): { owner: string; repo: string } | null => {
  if (!githubUrl) return null;
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/i);
  if (!match) return null;
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/i, ""),
  };
};

/**
 * Generates candidate raw GitHub asset URLs for any repository
 */
export const getCandidateRepoLogos = (githubUrl?: string): string[] => {
  const parsed = parseGithubRepo(githubUrl);
  if (!parsed) return [];
  const { owner, repo } = parsed;

  return [
    `https://raw.githubusercontent.com/${owner}/${repo}/main/public/logo.png`,
    `https://raw.githubusercontent.com/${owner}/${repo}/main/public/assets/logo.png`,
    `https://raw.githubusercontent.com/${owner}/${repo}/main/assets/icon.png`,
    `https://raw.githubusercontent.com/${owner}/${repo}/main/logo.png`,
    `https://raw.githubusercontent.com/${owner}/${repo}/main/icon.png`,
    `https://raw.githubusercontent.com/${owner}/${repo}/main/src-tauri/icons/icon.png`,
  ];
};

/**
 * Generates an ultra-clean, branded SVG Identity Card if no image or logo exists.
 * Zero network dependencies, instant 0ms load.
 */
export const generateProjectEmblemSVG = (
  title = "Project",
  category = "Development",
  language = "Code",
  themeColor = "#4E85BF"
): string => {
  const words = title.trim().split(/\s+/);
  const initials =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : title.slice(0, 2).toUpperCase() || "OS";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0c0e14"/>
        <stop offset="50%" stop-color="#08090d"/>
        <stop offset="100%" stop-color="#050608"/>
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${themeColor}"/>
        <stop offset="100%" stop-color="#89AACC"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="38%" r="45%">
        <stop offset="0%" stop-color="${themeColor}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
      </pattern>
    </defs>
    
    <rect width="1200" height="750" fill="url(#bg)"/>
    <rect width="1200" height="750" fill="url(#grid)"/>
    <rect width="1200" height="750" fill="url(#glow)"/>

    <!-- Center Tech Monogram Emblem -->
    <g transform="translate(600, 300)">
      <circle r="96" fill="rgba(255,255,255,0.02)" stroke="url(#accent)" stroke-width="2" stroke-dasharray="6 4"/>
      <circle r="74" fill="#0d1117" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
      <text y="14" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="2">${initials}</text>
    </g>

    <!-- Project Title -->
    <text x="600" y="470" font-family="Georgia, serif" font-style="italic" font-size="44" fill="#f1f5f9" text-anchor="middle" font-weight="500">${title}</text>
    
    <!-- Category & Language Pill -->
    <g transform="translate(600, 535)">
      <rect x="-190" y="-18" width="380" height="36" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <text y="5" font-family="monospace" font-size="13" fill="#38bdf8" text-anchor="middle" font-weight="600" letter-spacing="1.5">${category.toUpperCase()} • ${language}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Intelligent Project Photo Resolution Pipeline:
 * 1. Custom Uploaded Image: If user uploaded a photo (base64 or custom URL), use it.
 * 2. Repository Logo: If no custom photo, automatically use the project's real logo from GitHub.
 * 3. Emblem Fallback: If repo has no logo, use the dark minimalist Project SVG Card.
 */
export const getProjectDisplayImage = (
  project: Partial<ProjectItem>
): string => {
  // 1. If user uploaded a custom image (Base64 data or non-stock URL), use it immediately
  const rawImage = project.image?.trim();
  if (rawImage && rawImage.length > 0) {
    // If it's a data URL, relative bundled asset, or blob, use it immediately
    if (
      rawImage.startsWith("data:image/") ||
      rawImage.startsWith("blob:") ||
      rawImage.startsWith("/") ||
      rawImage.startsWith("./")
    ) {
      return rawImage;
    }
    // If it's not a generic unsplash placeholder, return it
    if (!rawImage.includes("images.unsplash.com")) {
      return rawImage;
    }
  }

  // 2. Check known verified repository logos
  const idKey = (project.id || "").toLowerCase();
  const nameKey = (project.name || "").toLowerCase();
  if (KNOWN_REPO_LOGOS[idKey]) return KNOWN_REPO_LOGOS[idKey];
  if (KNOWN_REPO_LOGOS[nameKey]) return KNOWN_REPO_LOGOS[nameKey];

  // 3. Auto-detect from GitHub repo URL
  const candidates = getCandidateRepoLogos(project.githubUrl);
  if (candidates.length > 0) {
    return candidates[0];
  }

  // 4. Return existing image if present, or generate SVG emblem
  if (rawImage && rawImage.length > 0) {
    return rawImage;
  }

  return generateProjectEmblemSVG(
    project.title || project.name || "Project",
    project.category || "Tools",
    project.language || "TypeScript"
  );
};

/**
 * Graceful Image Fallback for <img onError={...} />
 * If an image fails to load, gracefully step down to the project's repository logo,
 * and if that fails, render the SVG emblem card.
 */
export const handleProjectImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  project: Partial<ProjectItem>
) => {
  const target = e.target as HTMLImageElement;

  // Prevent infinite error loop
  target.onerror = null;

  const idKey = (project.id || "").toLowerCase();
  const nameKey = (project.name || "").toLowerCase();
  const knownLogo = KNOWN_REPO_LOGOS[idKey] || KNOWN_REPO_LOGOS[nameKey];

  if (knownLogo && target.src !== knownLogo) {
    target.src = knownLogo;
    return;
  }

  const candidates = getCandidateRepoLogos(project.githubUrl);
  if (candidates.length > 0 && target.src !== candidates[0]) {
    target.src = candidates[0];
    return;
  }

  target.src = generateProjectEmblemSVG(
    project.title || project.name || "Project",
    project.category || "Tools",
    project.language || "TypeScript"
  );
};


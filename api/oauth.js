import crypto from "crypto";

const ALLOWED_ORIGINS = [
  "https://www.houseofgiriraj.com",
  "https://houseofgiriraj.com",
  "https://houseofgiriraj.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

function isValidOrigin(origin) {
  if (!origin) return false;
  try {
    const u = new URL(origin);
    return ALLOWED_ORIGINS.includes(u.origin) || u.hostname === "localhost";
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  const { code, provider, state } = req.query;

  if (provider !== "github") {
    return res.status(400).json({ error: "Unsupported provider" });
  }

  const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.houseofgiriraj.com";

  if (!code) {
    const redirectUri = `${siteUrl}/api/oauth?provider=github`;
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: "OAuth client not configured" });
    }
    const csrfState = crypto.randomUUID();
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${csrfState}&scope=repo,user&response_type=code`
    );
  }

  // Validate CSRF state parameter
  if (!state || state.length < 10) {
    return res.status(400).json({ error: "Invalid state parameter" });
  }

  try {
    const tokenResp = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await tokenResp.json();

    if (data.error) {
      return res.status(400).json({ error: data.error_description || data.error });
    }

    res.setHeader("Content-Type", "text/html");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    res.end(`
      <html>
      <body>
        <script>
          (function() {
            var siteOrigin = "${siteUrl}";
            function receiveMessage(message) {
              if (message.origin !== siteOrigin) return;
              window.opener.postMessage(
                'authorization:github:${data.access_token}:${data.scope || ""}',
                siteOrigin
              );
              window.close();
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", siteOrigin);
          })();
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).json({ error: "Authorization failed" });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    // Basic validation
    if (
      !name ||
      !email ||
      typeof name !== "string" ||
      typeof email !== "string"
    ) {
      return Response.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const webhook = process.env.WEBHOOK_URL;

    if (webhook && !webhook.includes("YOUR_DEPLOYMENT_ID")) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

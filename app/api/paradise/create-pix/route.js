import { NextResponse } from "next/server";

const PARADISE_TRANSACTION_URL = "https://multi.paradisepags.com/api/v1/transaction.php";

const PRODUCTS = {
  "bonus-22500": {
    amount: 5990,
    description: "45.000 Robux - Vault Blox",
  },
  "bonus-10000": {
    amount: 3990,
    description: "20.000 Robux - Vault Blox",
  },
  "bonus-4500": {
    amount: 2790,
    description: "9.000 Robux - Vault Blox",
  },
  "bonus-3150": {
    amount: 1990,
    description: "6.300 Robux - Vault Blox",
  },
  "bonus-1700": {
    amount: 1490,
    description: "3.400 Robux - Vault Blox",
  },
};

const FIRST_NAMES = ["Ana", "Bruno", "Carla", "Daniel", "Marina", "Rafael", "Juliana", "Lucas"];
const LAST_NAMES = ["Silva", "Souza", "Costa", "Oliveira", "Santos", "Pereira", "Lima", "Moura"];

function jsonError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function getGatewayConfig() {
  const useGeneratedCustomer = process.env.PARADISE_USE_GENERATED_CUSTOMER === "true";
  const customerDocument = cleanDigits(process.env.PARADISE_CUSTOMER_DOCUMENT);
  const customerPhone = cleanDigits(process.env.PARADISE_CUSTOMER_PHONE);
  const config = {
    apiKey: process.env.PARADISE_API_KEY,
    useGeneratedCustomer,
    customerName: process.env.PARADISE_CUSTOMER_NAME,
    customerEmail: process.env.PARADISE_CUSTOMER_EMAIL,
    customerDocument,
    customerPhone,
  };

  const missing = Object.entries({
    PARADISE_API_KEY: config.apiKey,
    PARADISE_CUSTOMER_DOCUMENT: config.customerDocument,
    ...(useGeneratedCustomer
      ? {}
      : {
          PARADISE_CUSTOMER_NAME: config.customerName,
          PARADISE_CUSTOMER_EMAIL: config.customerEmail,
          PARADISE_CUSTOMER_PHONE: config.customerPhone,
        }),
  })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  return { config, missing };
}

function cleanDigits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function safeSlug(value) {
  return String(value ?? "player")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 24);
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function generateCustomerData(config, username) {
  if (!config.useGeneratedCustomer) {
    return {
      name: config.customerName,
      email: config.customerEmail,
      document: config.customerDocument,
      phone: config.customerPhone,
    };
  }

  const seed = `${Date.now()}${Math.floor(Math.random() * 100000)}`;
  const firstName = pickRandom(FIRST_NAMES);
  const lastName = pickRandom(LAST_NAMES);

  return {
    name: `${firstName} ${lastName}`,
    email: `cliente_${username}_${seed}@example.com`,
    document: config.customerDocument,
    phone: `119${String(Math.floor(Math.random() * 100000000)).padStart(8, "0")}`,
  };
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return jsonError("JSON inválido.", 400);
  }

  const product = PRODUCTS[body.productId];
  if (!product) {
    return jsonError("Pacote inválido.", 400);
  }

  const username = safeSlug(body.username);
  if (!username) {
    return jsonError("Informe o username no Roblox.", 400);
  }

  const { config, missing } = getGatewayConfig();
  if (missing.length > 0) {
    return jsonError(`Gateway não configurado: ${missing.join(", ")}.`, 500);
  }

  const reference = `VB-${Date.now()}-${username}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

  const payload = {
    amount: product.amount,
    description: `${product.description} (${username})`,
    reference,
    source: "api_externa",
    customer: generateCustomerData(config, username),
  };

  try {
    const response = await fetch(PARADISE_TRANSACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": config.apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const raw = await response.text();
    const data = raw ? JSON.parse(raw) : {};

    if (!response.ok || data.status === "error") {
      return jsonError(data.message ?? "Erro ao gerar Pix na Paradise.", response.status || 502);
    }

    return NextResponse.json({
      status: data.status ?? "success",
      transaction_id: data.transaction_id,
      id: data.id ?? reference,
      qr_code: data.qr_code,
      qr_code_base64: data.qr_code_base64,
      amount: data.amount ?? product.amount,
      expires_at: data.expires_at,
    });
  } catch (error) {
    return jsonError(error.message ?? "Falha ao conectar com a Paradise.", 502);
  }
}

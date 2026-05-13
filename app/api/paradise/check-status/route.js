import { NextResponse } from "next/server";

const PARADISE_QUERY_URL = "https://multi.paradisepags.com/api/v1/query.php";

function jsonError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function normalizeStatus(status) {
  if (status === "approved" || status === "paid") {
    return "paid";
  }

  if (
    status === "failed" ||
    status === "refunded" ||
    status === "chargeback" ||
    status === "expired"
  ) {
    return "failed";
  }

  return "pending";
}

export async function GET(request) {
  const apiKey = process.env.PARADISE_API_KEY;
  const upsellUrl = process.env.PARADISE_UPSELL_URL;
  const transactionId = new URL(request.url).searchParams.get("transaction_id");

  if (!apiKey) {
    return jsonError("Gateway não configurado: PARADISE_API_KEY.", 500);
  }

  if (!transactionId) {
    return jsonError("transaction_id é obrigatório.", 400);
  }

  try {
    const url = new URL(PARADISE_QUERY_URL);
    url.searchParams.set("action", "get_transaction");
    url.searchParams.set("id", transactionId);

    const response = await fetch(url, {
      headers: {
        "X-API-Key": apiKey,
      },
      cache: "no-store",
    });
    const raw = await response.text();
    const data = raw ? JSON.parse(raw) : {};

    if (!response.ok) {
      return jsonError(data.message ?? "Erro ao consultar pagamento.", response.status || 502);
    }

    const status = normalizeStatus(data.status);

    return NextResponse.json({
      status,
      redirect_url: status === "paid" && upsellUrl ? upsellUrl : undefined,
      raw_status: data.status,
      transaction_id: data.id ?? transactionId,
    });
  } catch (error) {
    return jsonError(error.message ?? "Falha ao consultar pagamento.", 502);
  }
}

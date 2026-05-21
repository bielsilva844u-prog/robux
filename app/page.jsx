"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Check, Copy, HelpCircle, X } from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

const SUPPORT_URL = "https://discord.gg/pK3CHQdafr";

const bonusProducts = [
  {
    id: "bonus-22500",
    amount: "45.000",
    baseAmount: "22.500",
    bonus: "22.500 a mais",
    originalPrice: "R$ 1.179,90",
    salePrice: "R$ 59,90",
    featured: true,
  },
  {
    id: "bonus-10000",
    amount: "20.000",
    baseAmount: "10.000",
    bonus: "10.000 a mais",
    originalPrice: "R$ 589,90",
    salePrice: "R$ 39,90",
  },
  {
    id: "bonus-4500",
    amount: "9.000",
    baseAmount: "4.500",
    bonus: "4.500 a mais",
    originalPrice: "R$ 294,90",
    salePrice: "R$ 27,90",
  },
  {
    id: "bonus-3150",
    amount: "6.300",
    baseAmount: "3.150",
    bonus: "3.150 a mais",
    originalPrice: "R$ 199,90",
    salePrice: "R$ 19,90",
  },
  {
    id: "bonus-1700",
    amount: "3.400",
    baseAmount: "1.700",
    bonus: "1.700 a mais",
    originalPrice: "R$ 117,90",
    salePrice: "R$ 14,90",
  },
];

const faqs = [
  {
    question: "Como a entrega funciona?",
    answer:
      "Este layout está pronto para conectar ao seu checkout. A tela pede apenas o usuário público e deve ser ligada a um fluxo autorizado antes de publicar.",
  },
  {
    question: "Precisa informar senha?",
    answer:
      "Não. A página foi desenhada para nunca solicitar senha, código de segurança ou dados privados da conta.",
  },
  {
    question: "Os preços já têm desconto?",
    answer:
      "Sim. Os botões exibem o preço final com 70% de desconto e os pacotes mostram 100% a mais de Robux.",
  },
];

function RobuxIcon({ size = "large", className = "" }) {
  return (
    <svg
      className={`robux-svg robux-svg-${size} ${className}`}
      viewBox="0 0 32 32"
      role="presentation"
      aria-hidden="true"
    >
      <path d="M15.0762 7.29574C15.6479 6.96571 16.3521 6.96571 16.9238 7.29574L23.0762 10.8479C23.6479 11.1779 24 11.7878 24 12.4479V19.5521C24 20.2122 23.6479 20.8221 23.0762 21.1521L16.9238 24.7043C16.3521 25.0343 15.6479 25.0343 15.0762 24.7043L8.92376 21.1521C8.35214 20.8221 8 20.2122 8 19.5521V12.4479C8 11.7878 8.35214 11.1779 8.92376 10.8479L15.0762 7.29574ZM11.9998 13V19C11.9998 19.5523 12.4475 20 12.9998 20H18.9998C19.5521 20 19.9998 19.5523 19.9998 19V13C19.9998 12.4477 19.5521 12 18.9998 12H12.9998C12.4475 12 11.9998 12.4477 11.9998 13Z" />
      <path d="M13.8556 2.56068C15.1825 1.81311 16.8175 1.81311 18.1444 2.56068L26.8556 7.46819C28.1825 8.21577 29 9.59734 29 11.0925V20.9075C29 22.4027 28.1825 23.7842 26.8556 24.5318L18.1444 29.4393C16.8175 30.1869 15.1825 30.1869 13.8556 29.4393L5.14444 24.5318C3.81746 23.7842 3 22.4027 3 20.9075V11.0925C3 9.59734 3.81746 8.21577 5.14444 7.46819L13.8556 2.56068ZM17.1628 4.30319C16.4452 3.89894 15.5548 3.89894 14.8372 4.30319L6.12611 9.2107C5.41362 9.61209 5 10.336 5 11.0925V20.9075C5 21.664 5.41362 22.3879 6.12611 22.7893L14.8372 27.6968C15.5548 28.1011 16.4452 28.1011 17.1628 27.6968L25.8739 22.7893C26.5864 22.3879 27 21.664 27 20.9075V11.0925C27 10.336 26.5864 9.61209 25.8739 9.2107L17.1628 4.30319Z" />
    </svg>
  );
}

function DiscordIcon({ className = "" }) {
  return (
    <svg
      className={`discord-svg ${className}`}
      viewBox="0 0 24 24"
      role="presentation"
      aria-hidden="true"
    >
      <path d="M19.54 5.24A18.44 18.44 0 0 0 15.08 3.9a.07.07 0 0 0-.08.04c-.19.33-.41.76-.56 1.1a17.18 17.18 0 0 0-4.88 0c-.15-.36-.38-.77-.57-1.1a.08.08 0 0 0-.08-.04 18.34 18.34 0 0 0-4.45 1.34.06.06 0 0 0-.03.03C1.62 9.35.85 13.32 1.23 17.24a.08.08 0 0 0 .03.05 18.67 18.67 0 0 0 5.46 2.7.08.08 0 0 0 .09-.03c.42-.56.8-1.15 1.12-1.77a.08.08 0 0 0-.04-.11 12.19 12.19 0 0 1-1.7-.79.08.08 0 0 1-.01-.13l.34-.25a.08.08 0 0 1 .08-.01c3.56 1.59 7.41 1.59 10.93 0a.08.08 0 0 1 .08.01l.34.25a.08.08 0 0 1-.01.13c-.54.31-1.1.58-1.7.79a.08.08 0 0 0-.04.11c.33.62.7 1.21 1.12 1.77a.08.08 0 0 0 .09.03 18.6 18.6 0 0 0 5.47-2.7.08.08 0 0 0 .03-.05c.46-4.54-.77-8.47-3.34-11.97a.06.06 0 0 0-.03-.03ZM8.45 14.85c-1.07 0-1.95-.96-1.95-2.13 0-1.18.86-2.14 1.95-2.14 1.1 0 1.97.97 1.95 2.14 0 1.17-.86 2.13-1.95 2.13Zm7.1 0c-1.07 0-1.95-.96-1.95-2.13 0-1.18.86-2.14 1.95-2.14 1.1 0 1.97.97 1.95 2.14 0 1.17-.86 2.13-1.95 2.13Z" />
    </svg>
  );
}

function MeshBackground() {
  const horizontal = Array.from({ length: 15 }, (_, index) => 34 + index * 20);
  const vertical = Array.from({ length: 28 }, (_, index) => -80 + index * 42);

  return (
    <div className="buy-robux-background" aria-hidden="true">
      <svg viewBox="0 0 1200 260" preserveAspectRatio="none">
        <g className="mesh-lines">
          {horizontal.map((y, index) => (
            <path
              key={`h-${y}`}
              d={`M -80 ${y} C 180 ${y - 32 + index * 1.5} 330 ${y + 18} 520 ${
                y - 8
              } C 740 ${y - 40} 880 ${y + 42} 1290 ${y - 6}`}
            />
          ))}
          {vertical.map((x, index) => (
            <path
              key={`v-${x}`}
              d={`M ${x} -60 C ${x + 28} 32 ${x - 42} 116 ${x + 12} 184 C ${
                x + 38
              } 222 ${x - 18} 246 ${x + index * 0.5} 318`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

function ProductRow({ product, onSelect }) {
  return (
    <div className={`product-row ${product.featured ? "is-featured" : ""}`}>
      <div className="product-main">
        <div className="amount-group">
          <div className="amount-current">
            <RobuxIcon />
            <span>{product.amount}</span>
          </div>
          <div className="amount-base">
            <span className="strike-line" />
            <RobuxIcon size="small" />
            <span>{product.baseAmount}</span>
          </div>
        </div>
        <div className="pill-row">
          <span className="bonus-pill">{product.bonus}</span>
          {product.recommended ? <span className="bonus-pill accent">Para você</span> : null}
        </div>
      </div>

      <div className="price-actions">
        <span className="old-price">{product.originalPrice}</span>
        <button className="price-button" type="button" onClick={() => onSelect(product)}>
          {product.salePrice}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(bonusProducts[0]);
  const [open, setOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const [username, setUsername] = useState("");
  const [copied, setCopied] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [qrImageSrc, setQrImageSrc] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  useEffect(() => {
    if (!paymentStep || !transactionId) {
      return undefined;
    }

    const intervalId = window.setInterval(async () => {
      try {
        const response = await fetch(
          `/api/paradise/check-status?transaction_id=${encodeURIComponent(transactionId)}`,
          { cache: "no-store" },
        );
        const data = await response.json();

        if (!response.ok) {
          return;
        }

        setPaymentStatus(data.status ?? "pending");

        if (data.status === "paid" && data.redirect_url) {
          const redirectUrl = new URL(data.redirect_url);
          const currentParams = new URLSearchParams(window.location.search);
          currentParams.forEach((value, key) => {
            redirectUrl.searchParams.set(key, value);
          });
          window.location.href = redirectUrl.toString();
        }
      } catch {
        // Mantem o modal aberto enquanto aguardamos a proxima tentativa.
      }
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [paymentStep, transactionId]);

  useEffect(() => {
    let cancelled = false;

    async function buildQrImage() {
      setQrImageSrc("");

      if (!pixData) {
        return;
      }

      if (pixData.qr_code_base64) {
        const imageSrc = pixData.qr_code_base64.startsWith("data:")
          ? pixData.qr_code_base64
          : `data:image/png;base64,${pixData.qr_code_base64}`;
        setQrImageSrc(imageSrc);
        return;
      }

      if (!pixData.qr_code) {
        return;
      }

      try {
        const imageSrc = await QRCode.toDataURL(pixData.qr_code, {
          errorCorrectionLevel: "M",
          margin: 2,
          scale: 8,
          color: {
            dark: "#111216",
            light: "#ffffff",
          },
        });

        if (!cancelled) {
          setQrImageSrc(imageSrc);
        }
      } catch {
        if (!cancelled) {
          setQrImageSrc("");
        }
      }
    }

    buildQrImage();

    return () => {
      cancelled = true;
    };
  }, [pixData]);

  function selectProduct(product) {
    setSelectedProduct(product);
    setPaymentStep(false);
    setCopied(false);
    setPixData(null);
    setQrImageSrc("");
    setTransactionId(null);
    setCheckoutError("");
    setPaymentStatus("pending");
    setOpen(true);
  }

  function updateOpen(nextOpen) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setPaymentStep(false);
      setCopied(false);
      setPixData(null);
      setQrImageSrc("");
      setTransactionId(null);
      setCheckoutError("");
      setPaymentStatus("pending");
    }
  }

  async function createPix() {
    setCheckoutLoading(true);
    setCheckoutError("");
    setCopied(false);

    try {
      const tracking = Object.fromEntries(new URLSearchParams(window.location.search).entries());
      const response = await fetch("/api/paradise/create-pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          username,
          tracking,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível gerar o Pix.");
      }

      setPixData(data);
      setTransactionId(String(data.transaction_id ?? data.id ?? ""));
      setPaymentStep(true);
      setPaymentStatus("pending");
    } catch (error) {
      setCheckoutError(error.message);
    } finally {
      setCheckoutLoading(false);
    }
  }

  async function copyPix() {
    const pixCode = pixData?.qr_code ?? "";

    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
    } catch {
      setCopied(true);
    }
  }

  return (
    <main className="page">
      <MeshBackground />

      <header className="topbar">
        <a className="brand" href="#" aria-label="Vault Blox">
          <span>VAULT BL</span>
          <RobuxIcon size="brand" />
          <span>X</span>
        </a>
      </header>

      <section className="hero-section" aria-labelledby="title">
        <div className="hero-copy">
          <h1 id="title">
            <span>Receba 100% a mais de</span>
            <span>Robux</span>
          </h1>
          <p>
            <span>Pague pelo pacote base e receba o dobro de Robux,</span>
            <span>com 70% de desconto aplicado no valor final.</span>
          </p>
        </div>
      </section>

      <section className="content-shell" id="pacotes">
        <div className="section-title-row">
          <h2>Pacotes com dobro de Robux</h2>
          <span className="discount-badge">100% A MAIS</span>
        </div>

        <div className="bonus-card">
          <div className="product-list">
            {bonusProducts.map((product) => (
              <ProductRow key={product.id} product={product} onSelect={selectProduct} />
            ))}
          </div>
        </div>

        <section className="faq-section" id="faq">
          <div className="section-title-row secondary">
            <h2>Perguntas frequentes</h2>
            <HelpCircle size={20} />
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="legal-note">
          Vault Blox é uma página demonstrativa independente. Roblox, Robux e marcas relacionadas
          pertencem aos seus respectivos titulares. Não solicite senha, cookies, códigos de dois
          fatores ou qualquer dado privado.
        </p>
      </section>

      <a className="discord-float" href={SUPPORT_URL} aria-label="Abrir suporte no Discord">
        <DiscordIcon />
      </a>

      <Dialog.Root open={open} onOpenChange={updateOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Close className="dialog-close" aria-label="Fechar">
              <X size={18} />
            </Dialog.Close>
            <Dialog.Title>{paymentStep ? "Pagamento via Pix" : "Confirmar pacote"}</Dialog.Title>
            <Dialog.Description>
              {paymentStep
                ? "Escaneie o QR Code ou copie o código Pix abaixo."
                : "Confira o pacote selecionado antes de enviar para o checkout."}
            </Dialog.Description>

            <div className="checkout-summary">
              <div>
                <span>Pacote</span>
                <strong>{selectedProduct?.amount} Robux</strong>
              </div>
              <div>
                <span>Preço final</span>
                <strong>{selectedProduct?.salePrice}</strong>
              </div>
            </div>

            {paymentStep ? (
              <div className="pix-panel">
                <div className="pix-instructions">
                  <strong>Depois de pagar</strong>
                  <ol>
                    <li>Realize o pagamento usando o Pix abaixo.</li>
                    <li>Tire um print do comprovante.</li>
                    <li>Abra um ticket no Discord e envie o comprovante.</li>
                  </ol>
                </div>
                {qrImageSrc ? (
                  <img className="qr-image" src={qrImageSrc} alt="QR Code Pix" />
                ) : (
                  <div className="qr-loading" aria-label="QR Code Pix">
                    Gerando QR Code...
                  </div>
                )}
                <div className="pix-code">{pixData?.qr_code ?? "Pix indisponível."}</div>
                <p className="payment-status">
                  {paymentStatus === "paid" ? "Pagamento aprovado." : "Aguardando pagamento..."}
                </p>
                <button className="checkout-button" type="button" onClick={copyPix}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Pix copiado" : "Pix copia e cola"}
                </button>
                <a className="support-button" href={SUPPORT_URL}>
                  <DiscordIcon />
                  <span>Support/Ajuda</span>
                </a>
              </div>
            ) : (
              <>
                <label className="checkout-label" htmlFor="public-user">
                  Username no Roblox
                </label>
                <input
                  id="public-user"
                  placeholder="Ex.: Player123"
                  autoComplete="off"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                {checkoutError ? <p className="checkout-error">{checkoutError}</p> : null}
                <button
                  className="checkout-button"
                  type="button"
                  disabled={checkoutLoading}
                  onClick={createPix}
                >
                  {checkoutLoading ? "Gerando Pix..." : "Continuar para pagamento"}
                </button>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}

const SUPPORT_URL = "https://discord.gg/pK3CHQdafr";

export const metadata = {
  title: "Vault Blox | Brazil Only",
  description: "Support notice for visitors outside Brazil.",
};

function RobuxIcon({ size = "brand" }) {
  return (
    <svg
      className={`robux-svg robux-svg-${size}`}
      viewBox="0 0 32 32"
      role="presentation"
      aria-hidden="true"
    >
      <path d="M15.0762 7.29574C15.6479 6.96571 16.3521 6.96571 16.9238 7.29574L23.0762 10.8479C23.6479 11.1779 24 11.7878 24 12.4479V19.5521C24 20.2122 23.6479 20.8221 23.0762 21.1521L16.9238 24.7043C16.3521 25.0343 15.6479 25.0343 15.0762 24.7043L8.92376 21.1521C8.35214 20.8221 8 20.2122 8 19.5521V12.4479C8 11.7878 8.35214 11.1779 8.92376 10.8479L15.0762 7.29574ZM11.9998 13V19C11.9998 19.5523 12.4475 20 12.9998 20H18.9998C19.5521 20 19.9998 19.5523 19.9998 19V13C19.9998 12.4477 19.5521 12 18.9998 12H12.9998C12.4475 12 11.9998 12.4477 11.9998 13Z" />
      <path d="M13.8556 2.56068C15.1825 1.81311 16.8175 1.81311 18.1444 2.56068L26.8556 7.46819C28.1825 8.21577 29 9.59734 29 11.0925V20.9075C29 22.4027 28.1825 23.7842 26.8556 24.5318L18.1444 29.4393C16.8175 30.1869 15.1825 30.1869 13.8556 29.4393L5.14444 24.5318C3.81746 23.7842 3 22.4027 3 20.9075V11.0925C3 9.59734 3.81746 8.21577 5.14444 7.46819L13.8556 2.56068ZM17.1628 4.30319C16.4452 3.89894 15.5548 3.89894 14.8372 4.30319L6.12611 9.2107C5.41362 9.61209 5 10.336 5 11.0925V20.9075C5 21.664 5.41362 22.3879 6.12611 22.7893L14.8372 27.6968C15.5548 28.1011 16.4452 28.1011 17.1628 27.6968L25.8739 22.7893C26.5864 22.3879 27 21.664 27 20.9075V11.0925C27 10.336 26.5864 9.61209 25.8739 9.2107L17.1628 4.30319Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg className="discord-svg" viewBox="0 0 24 24" role="presentation" aria-hidden="true">
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

export default function EnglishNoticePage() {
  return (
    <main className="page locale-page">
      <MeshBackground />

      <section className="locale-shell" aria-labelledby="region-notice-title">
        <a className="brand locale-brand" href="/" aria-label="Vault Blox">
          <span>VAULT BL</span>
          <RobuxIcon />
          <span>X</span>
        </a>

        <div className="locale-card">
          <span className="locale-badge">Brazil only</span>
          <h1 id="region-notice-title">This website is only supported for users in Brazil.</h1>
          <p>
            If you need help or believe this message is incorrect, open a ticket on our Discord
            support server.
          </p>
          <a className="locale-button" href={SUPPORT_URL}>
            <DiscordIcon />
            <span>Open Discord support</span>
          </a>
        </div>
      </section>
    </main>
  );
}

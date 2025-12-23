import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';

type Mode = 'success' | 'error';

type Toast = {
  type: 'success' | 'error';
  message: string;
};

// const WAIT_MS = 15000;
const WAIT_MS = 5000;
const REDIRECT_DELAY_MS = 1200;
const AGENT_PROFILE = {
  name: 'Alicja Nowak',
  agentId: 'AG-2049',
  email: 'alicja.nowak@agency.example',
  team: 'Field Operations'
};

const MODE_STORAGE_KEY = 'qr-demo-mode';

const QrCode = ({ value }: { value: string }) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    QRCode.toDataURL(value, {
      width: 220,
      margin: 0,
      color: {
        dark: '#191E33',
        light: '#ffffff'
      }
    })
      .then((url) => {
        if (isActive) {
          setDataUrl(url);
        }
      })
      .catch(() => {
        if (isActive) {
          setDataUrl(null);
        }
      });

    return () => {
      isActive = false;
    };
  }, [value]);

  return (
    <div className="relative flex h-48 w-48 items-center justify-center rounded-2xl border border-main-1100 bg-main-600 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
      {dataUrl ? (
        <img src={dataUrl} alt="QR code" className="h-[160px] w-[160px]" />
      ) : (
        <div className="h-[160px] w-[160px] animate-pulse rounded-xl bg-main-800/30" />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-main-100/40" />
    </div>
  );
};

const ToastMessage = ({ toast }: { toast: Toast }) => {
  const styles =
    toast.type === 'success'
      ? 'bg-status-active/90 text-main-500'
      : 'bg-status-failed/90 text-main-600';

  return (
    <div className={`fixed left-1/2 top-6 z-50 flex min-w-[280px] -translate-x-1/2 items-center gap-3 rounded-xl px-5 py-4 shadow-xl backdrop-blur ${styles}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.18em]">
        {toast.type === 'success' ? 'Success' : 'Error'}
      </span>
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState<Mode>('success');
  const [toast, setToast] = useState<Toast | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY);
    if (storedMode === 'success' || storedMode === 'error') {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    setToast(null);
    setRedirecting(false);
    setIsRedirected(false);

    const timeouts: number[] = [];

    const mainTimer = window.setTimeout(() => {
      if (mode === 'success') {
        setToast({
          type: 'success',
          message: 'Zalogowano uzytkownika. Przekierowuje do panelu.'
        });
        setRedirecting(true);

        const redirectTimer = window.setTimeout(() => {
          setIsRedirected(true);
          setRedirecting(false);
        }, REDIRECT_DELAY_MS);
        timeouts.push(redirectTimer);
      } else {
        setToast({
          type: 'error',
          message: 'Credential juz wygasl. Sprobuj ponownie.'
        });
      }
    }, WAIT_MS);

    timeouts.push(mainTimer);

    return () => {
      timeouts.forEach((timer) => window.clearTimeout(timer));
    };
  }, [mode]);

  const qrValue = useMemo(() => {
    return `agent-login://session/${Math.random().toString(36).slice(2, 10)}`;
  }, [mode]);

  const subtitle = useMemo(() => {
    if (mode === 'success') {
      return 'Zeskanuj kod QR w aplikacji, aby kontynuowac logowanie.';
    }
    return 'Sesja jest w trybie testu bledu. Nie generujemy kodu QR.';
  }, [mode]);

  return (
    <div className="min-h-screen bg-main-1000 px-6 py-10 text-main-600">
      <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-main-300/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-main-100/20 blur-[140px]" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-main-800">QR Login</p>
              <h1 className="text-3xl font-semibold text-main-600 sm:text-4xl">Agent access portal</h1>
            </div>
          </div>
          <p className="max-w-2xl text-base text-main-800">{subtitle}</p>
          <p className="text-xs text-main-800">
            Zmien tryb przez localStorage: <span className="font-semibold">qr-demo-mode</span> = success | error.
          </p>
        </header>

        <main className="grid gap-8 lg:grid-cols-1">
          <section className="flex flex-col justify-between gap-8 rounded-3xl border border-main-1100/70 bg-main-1200/80 p-box-100 shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-status-init" />
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-main-800">Session</span>
              </div>
              <h2 className="text-2xl font-semibold">Login with agent</h2>
              <p className="text-sm text-main-800">
                Poloz telefon nad kodem i zatwierdz tozsamosc. W trybie success nastapi przekierowanie po 15 sekundach.
              </p>
            </div>

            {mode === 'success' ? (
              <div className="flex flex-col items-start gap-6">
                {isRedirected ? (
                  <div className="grid w-full gap-4 rounded-2xl border border-main-1100/60 bg-main-900/70 p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-main-800">
                        Agent profile
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-main-600">{AGENT_PROFILE.name}</h3>
                    </div>
                    <div className="grid gap-3 text-sm text-main-800">
                      <div className="flex items-center justify-between border-b border-main-1100/50 pb-2">
                        <span>Agent ID</span>
                        <span className="font-semibold text-main-600">{AGENT_PROFILE.agentId}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-main-1100/50 pb-2">
                        <span>Email</span>
                        <span className="font-semibold text-main-600">{AGENT_PROFILE.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Team</span>
                        <span className="font-semibold text-main-600">{AGENT_PROFILE.team}</span>
                      </div>
                    </div>
                    <p className="text-xs text-main-800">
                      Przekierowanie zakonczone. Panel agenta jest gotowy do pracy.
                    </p>
                  </div>
                ) : (
                  <>
                    <QrCode value={qrValue} />
                    <div className="flex items-center gap-3 text-sm text-main-800">
                      <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-status-active" />
                      {redirecting ? 'Przekierowuje do panelu...' : 'Czekamy na potwierdzenie skanu.'}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-main-1100/60 bg-main-900/70 p-6">
                <p className="text-sm font-semibold text-main-800">Tryb error aktywny</p>
                <p className="mt-2 text-sm text-main-800">
                  Po 15 sekundach wyswietlimy komunikat o wygasnieciu credentialu.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>

      {toast ? <ToastMessage toast={toast} /> : null}
    </div>
  );
}

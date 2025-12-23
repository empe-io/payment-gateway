import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as QRCode from 'qrcode';

type Mode = 'success' | 'error';

type Toast = {
  type: 'success' | 'error';
  message: string;
};

const WAIT_MS = 15000;
// const WAIT_MS = 2000;
const REDIRECT_DELAY_MS = 1200;
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
      .then((url:any) => {
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

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('success');
  const [toast, setToast] = useState<Toast | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [errorExpired, setErrorExpired] = useState(false);

  useEffect(() => {
    const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY);
    if (storedMode === 'success' || storedMode === 'error') {
      setMode(storedMode);
    } else {
      window.localStorage.setItem(MODE_STORAGE_KEY, 'success');
      setMode('success');
    }
  }, []);

  useEffect(() => {
    setToast(null);
    setRedirecting(false);
    setErrorExpired(false);

    const timeouts: number[] = [];

    const mainTimer = window.setTimeout(() => {
      if (mode === 'success') {
        setToast({
          type: 'success',
          message: 'Agent successfully authenticated. Redirecting to the dashboard.'
        });
        setRedirecting(true);

        const redirectTimer = window.setTimeout(() => {
          navigate('/dashboard');
        }, REDIRECT_DELAY_MS);
        timeouts.push(redirectTimer);
      } else {
        setErrorExpired(true);
        setToast({
          type: 'error',
          message: 'Credential has been revoked. You cannot login with this credential anymore.'
        });
      }
    }, WAIT_MS);

    timeouts.push(mainTimer);

    return () => {
      timeouts.forEach((timer) => window.clearTimeout(timer));
    };
  }, [mode, navigate]);

  const qrValue = useMemo(() => {
    return `agent-login://session/${Math.random().toString(36).slice(2, 10)}`;
  }, [mode]);

  const subtitle = useMemo(() => {
    return 'Have the agent scan the QR code in the app to continue the login.'
  }, [mode]);

  return (
    <>
      <header className="flex flex-col gap-4 animate-fade-up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-main-800">QR Login</p>
              <h1 className="text-3xl font-semibold text-main-600 sm:text-4xl">Agent access portal</h1>
            </div>
          </div>
          <p className="max-w-2xl text-base text-main-800">{subtitle}</p>
        </header>

      <main className="grid gap-8 lg:grid-cols-1 animate-fade-up-delay">
        <section className="mx-auto flex w-full max-w-md flex-col justify-between gap-8 rounded-3xl border border-main-1100/70 bg-main-1200/80 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-status-init" />
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-main-800">Session</span>
              </div>
              <h2 className="text-2xl font-semibold">Login with agent</h2>
            <p className="text-sm text-main-800">
              Agent authorization, scan the QR code in the secure app to approve access and continue to the dashboard.
            </p>
            </div>

          <div className="flex flex-col items-center gap-6">
              <QrCode value={qrValue} />
            <div className="flex items-center gap-3 text-sm text-main-800">
              <div
                className={`h-2.5 w-2.5 animate-pulse rounded-full ${
                  mode === 'error' && errorExpired ? 'bg-status-failed' : 'bg-status-active'
                }`}
              />
              {mode === 'success'
                ? redirecting
                  ? 'Redirecting to the dashboard...'
                  : 'Waiting for scan confirmation.'
                : errorExpired
                  ? 'Credential has been revoked.'
                  : 'Waiting for scan confirmation.'}
            </div>
          </div>
        </section>
      </main>

      {toast ? <ToastMessage toast={toast} /> : null}
    </>
  );
}

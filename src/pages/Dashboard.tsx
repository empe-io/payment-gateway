const CREDENTIAL_MODEL = {
    id:"did:empe:testnet:7d40297b87b317c93f4e4e17c9c5d998042ff16d",
  agentName: 'Payment agent',
  amountLimit: '1500 $',
  ownerName: 'Empeiria',
  paymentMethods: ['PayPal']
};

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-main-800">Dashboard</p>
        <h1 className="text-3xl font-semibold text-main-600 sm:text-4xl">Credential dashboard</h1>
        <p className="max-w-2xl text-base text-main-800">
          Login completed successfully. Below is the credential model for this agent.
        </p>
      </header>

      <section className="grid gap-6 rounded-3xl border border-main-1100/70 bg-main-1200/80 p-box-100 shadow-[0_32px_80px_rgba(0,0,0,0.35)] animate-fade-up-delay">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-main-800">Credential</p>
          <h2 className="mt-2 text-2xl font-semibold text-main-600">Agent credential model</h2>
        </div>
        <div className="grid gap-3 text-sm text-main-800">
            <div className="flex items-center justify-between border-b border-main-1100/50 pb-2">
                <span>Agent did</span>
                <span className="font-semibold text-main-600">{CREDENTIAL_MODEL.id}</span>
            </div>
          <div className="flex items-center justify-between border-b border-main-1100/50 pb-2">
            <span>Agent Name</span>
            <span className="font-semibold text-main-600">{CREDENTIAL_MODEL.agentName}</span>
          </div>
          <div className="flex items-center justify-between border-b border-main-1100/50 pb-2">
            <span>Amount Limit</span>
            <span className="font-semibold text-main-600">{CREDENTIAL_MODEL.amountLimit}</span>
          </div>
          <div className="flex items-center justify-between border-b border-main-1100/50 pb-2">
            <span>Owner Name</span>
            <span className="font-semibold text-main-600">{CREDENTIAL_MODEL.ownerName}</span>
          </div>
          <div className="flex items-start justify-between">
            <span>Payment Method</span>
            <div className="flex flex-wrap justify-end gap-2">
              {CREDENTIAL_MODEL.paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-main-1100/60 bg-main-900/70 px-3 py-1 text-xs font-semibold text-main-600"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

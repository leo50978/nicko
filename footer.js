export default class FooterComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);

    if (!this.root) {
      console.error(`Footer root introuvable: ${rootId}`);
      return;
    }

    this.render();
  }

  render() {
    const groups = [
      {
        title: "Product",
        links: ["Accounts", "Cards", "Savings", "International transfers"],
      },
      {
        title: "Experience",
        links: ["Security", "App features", "Pricing", "Rewards"],
      },
      {
        title: "Support",
        links: ["Help centre", "Contact", "Community", "Status"],
      },
    ];

    const groupsHtml = groups
      .map(
        (group) => `
          <div>
            <p class="ui-eyebrow font-semibold text-white/45">${group.title}</p>
            <div class="mt-5 space-y-3">
              ${group.links
                .map(
                  (link) => `
                    <a href="#" class="ui-meta block font-medium text-white/82 transition hover:text-white">
                      ${link}
                    </a>
                  `
                )
                .join("")}
            </div>
          </div>
        `
      )
      .join("");

    this.root.innerHTML = `
      <footer class="relative overflow-hidden border-t border-white/10 bg-[#050506] text-white">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-8%] top-[-12%] h-[260px] w-[260px] rounded-full bg-[#2a8cff]/18 blur-[90px]"></div>
          <div class="absolute right-[-5%] top-[10%] h-[220px] w-[220px] rounded-full bg-[#b8ff00]/12 blur-[80px]"></div>
          <div class="absolute bottom-[-12%] left-1/2 h-[260px] w-[320px] -translate-x-1/2 rounded-full bg-white/6 blur-[100px]"></div>
        </div>

        <div class="relative mx-auto w-full max-w-[1120px] px-4 pb-10 pt-14 md:px-8 md:pb-12 md:pt-20">
          <section class="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,#1d3159,transparent_38%),linear-gradient(135deg,#121722,#090b10_58%,#101725)] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.42)] md:px-10 md:py-10">
            <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div class="max-w-[640px]">
                <p class="ui-eyebrow font-semibold text-white/55">Ready when you are</p>
                <h2 class="ui-section-title mt-4 font-semibold">
                  Banking built to move with you
                </h2>
                <p class="ui-body mt-5 max-w-[560px] font-medium text-white/78">
                  Save faster, spend smarter, and keep every account in reach with one sharp, flexible experience.
                </p>
              </div>

              <div class="flex flex-wrap gap-3">
                <button
                  type="button"
                  class="ui-pill-button bg-white font-semibold text-[#11141b] transition hover:bg-white/90"
                >
                  Get the app
                </button>
                <button
                  type="button"
                  class="ui-pill-button border border-white/20 bg-white/5 font-semibold text-white transition hover:bg-white/10"
                >
                  Compare plans
                </button>
              </div>
            </div>
          </section>

          <section class="mt-12 grid gap-12 border-b border-white/10 pb-10 md:mt-14 md:grid-cols-[1.15fr_1.85fr] md:pb-12">
            <div class="max-w-[320px]">
              <div class="text-[32px] font-semibold leading-none tracking-[-0.03em] md:text-[40px]">Revolut</div>
              <p class="ui-body mt-5 font-medium text-white/68">
                A modern money experience designed for movement, clarity, and control across every day and every border.
              </p>

              <div class="mt-6 flex flex-wrap gap-3 text-[13px] font-semibold text-white/78">
                <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">4.8 App Store</span>
                <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">24/7 support</span>
                <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">UK & EU licensed</span>
              </div>
            </div>

            <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              ${groupsHtml}
            </div>
          </section>

          <div class="ui-card-submeta flex flex-col gap-4 pt-6 font-medium text-white/45 md:flex-row md:items-center md:justify-between md:pt-7">
            <p>© 2026 Revolut clone concept. Built for a clean product showcase.</p>
            <div class="flex flex-wrap gap-5">
              <a href="#" class="transition hover:text-white/75">Privacy</a>
              <a href="#" class="transition hover:text-white/75">Terms</a>
              <a href="#" class="transition hover:text-white/75">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

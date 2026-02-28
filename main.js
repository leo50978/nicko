export default class MainComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);

    if (!this.root) {
      console.error(`Main root introuvable: ${rootId}`);
      return;
    }

    this.render();
  }

  render() {
    this.root.innerHTML = `
      <section class="relative pb-10 md:pb-16">
        <div class="mx-auto grid w-full max-w-[1120px] gap-10 px-4 pt-2 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div class="max-w-[560px]">
            <h1 class="ui-display font-semibold text-white">
              Change the way you money
            </h1>
            <p class="ui-section-lead mt-6 max-w-[540px] font-semibold text-white/95">
              Home or away, local or global - move freely between countries and currencies. Sign up for free, in a tap.
            </p>
            <button
              type="button"
              class="ui-pill-button mt-8 bg-[#141414] font-semibold text-white transition hover:bg-black"
            >
              Download the app
            </button>
          </div>

          <div class="relative mx-auto w-full max-w-[540px] lg:ml-auto">
            <img
              src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=1200&q=80"
              alt="Woman portrait"
              class="h-[700px] w-full rounded-[20px] object-cover object-center shadow-[0_22px_70px_rgba(0,0,0,0.25)] md:h-[760px]"
            />

            <div class="pointer-events-none absolute inset-x-[12%] top-[8%] bottom-[8%] rounded-[30px] border-[4px] border-white/60"></div>
            <div class="pointer-events-none absolute right-[12%] top-[8%] h-[28px] w-[28px] border-r-[4px] border-t-[4px] border-white/70"></div>

            <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-white">
              <span class="ui-meta font-medium text-white/85">Personal</span>
              <strong class="ui-card-amount mt-1 font-semibold">£6,012</strong>
              <span class="ui-chip mt-3 bg-white font-semibold text-[#2f2f2f]">Accounts</span>
            </div>

            <div class="absolute inset-x-[12%] bottom-[4%] flex items-center justify-between rounded-[24px] bg-white px-4 py-3 shadow-xl md:px-5 md:py-4">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#5762f4] text-white">
                  <i class="fa-solid fa-coins text-lg"></i>
                </div>
                <div>
                  <p class="ui-body font-semibold leading-none text-[#1f1f1f]">Salary</p>
                  <p class="ui-meta mt-1 font-medium text-[#6f7783]">Today, 11:28</p>
                </div>
              </div>
              <span class="text-[clamp(1.125rem,3vw,2rem)] font-semibold text-[#333]">+£2,550</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

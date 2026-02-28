export default class SavingsHeroComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);

    if (!this.root) {
      console.error(`Savings root introuvable: ${rootId}`);
      return;
    }

    this.render();
  }

  render() {
    this.root.innerHTML = `
      <section class="relative overflow-hidden bg-[#0c0c0c]">
        <div class="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=2200&q=80"
            alt="Couple exchanging rings"
            class="h-full w-full object-cover object-center"
          />
          <div class="absolute inset-0 bg-black/45"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.22),transparent_58%)]"></div>
        </div>

        <div class="relative z-10">
          <div class="mx-auto flex min-h-[760px] w-full max-w-[1220px] flex-col items-center px-4 pb-14 pt-20 text-center text-white md:min-h-[860px] md:px-8 md:pt-24">
            <h2 class="ui-section-title max-w-[760px] font-semibold">
              Life, meet savings
            </h2>

            <p class="ui-section-lead mt-5 max-w-[900px] font-semibold text-white/95">
              Grow your money with up to 4% AER (variable) interest rate on Savings, paid every day.
            </p>

            <p class="ui-body mt-4 max-w-[780px] font-medium text-white/82">
              AER stands for Annual Equivalent Rate and illustrates what the interest rate would be if interest was paid and compounded once each year. The interest rate is variable and subject to your selected plan. T&Cs apply.
            </p>

            <button
              type="button"
              class="ui-pill-button mt-8 bg-white font-semibold text-[#151515] transition hover:bg-white/90"
            >
              Explore Savings
            </button>

            <article class="mt-11 h-[196px] w-[116px] rounded-[14px] border border-white/35 bg-black/20 p-[6px] shadow-[0_16px_30px_rgba(0,0,0,0.35)] backdrop-blur-[2px] md:h-[236px] md:w-[138px] md:rounded-[16px]">
              <div class="relative h-full overflow-hidden rounded-[12px] border border-white/30 bg-gradient-to-b from-black/10 to-black/60 px-2 pb-2 pt-3 text-white md:rounded-[14px] md:px-[10px] md:pb-[10px] md:pt-[14px]">
                <div class="mx-auto grid h-7 w-7 place-items-center rounded-full bg-white/20 text-[11px] md:h-8 md:w-8 md:text-[12px]">
                  <i class="fa-solid fa-gem"></i>
                </div>
                <p class="ui-card-overline mt-4 font-medium text-white/75">Wedding</p>
                <p class="mt-1 text-[clamp(1.25rem,2vw,1.625rem)] font-semibold leading-none">€5,400</p>
                <span class="ui-badge mt-2 inline-flex rounded-full bg-white px-2 py-1 font-semibold text-[#1f1f1f]">
                  AER 4%
                </span>

                <div class="absolute inset-x-2 bottom-2 flex items-center justify-between text-[10px] md:inset-x-[10px] md:bottom-[10px] md:text-[11px]">
                  <span class="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#151515]">
                    <i class="fa-solid fa-plus"></i>
                  </span>
                  <span class="flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-white">
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                  <span class="flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-white">
                    <i class="fa-solid fa-house"></i>
                  </span>
                  <span class="flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-white">
                    <i class="fa-solid fa-truck-fast"></i>
                  </span>
                </div>
              </div>
            </article>

            <div class="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-14 md:gap-4">
              <button
                type="button"
                class="ui-chip border-2 border-white bg-white/10 font-semibold text-white transition hover:bg-white/20"
              >
                Adventure
              </button>
              <button
                type="button"
                class="ui-chip bg-white font-semibold text-[#101214] transition hover:bg-white/90"
              >
                Wedding
              </button>
              <button
                type="button"
                class="ui-chip border-2 border-white bg-white/10 font-semibold text-white transition hover:bg-white/20"
              >
                Moving
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

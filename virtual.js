export default class VirtualCardsComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);

    if (!this.root) {
      console.error(`Virtual root introuvable: ${rootId}`);
      return;
    }

    this.render();
  }

  render() {
    this.root.innerHTML = `
      <section class="relative overflow-hidden bg-[#050506] pt-16 md:pt-20">
        <div class="mx-auto w-full max-w-[1120px] px-4 text-center md:px-8">
          <h2 class="ui-section-title font-semibold text-white">
            Go virtual
          </h2>
          <p class="ui-section-lead mx-auto mt-5 max-w-[760px] font-medium text-white/90">
            Create and add virtual cards to your Apple Wallet or Google Wallet to start paying right away.
          </p>
          <button
            type="button"
            class="ui-pill-button mt-8 bg-white font-semibold text-[#16181f] transition hover:bg-white/90"
          >
            Create a card
          </button>
        </div>

        <div class="relative mx-auto mt-10 h-[420px] w-full max-w-[1380px] md:mt-14 md:h-[560px]">
          <div class="absolute -left-[26%] top-[62%] z-10 h-[170px] w-[330px] -rotate-[16deg] rounded-[18px] border border-white/15 bg-gradient-to-br from-[#2d323b] via-[#15191f] to-[#0c0f12] shadow-[0_20px_50px_rgba(0,0,0,0.55)] md:-left-[9%] md:top-[54%] md:h-[240px] md:w-[470px]">
            <span class="absolute left-8 top-8 text-[26px] font-semibold tracking-[-0.02em] text-white/70 md:text-[48px]">Revolut</span>
            <span class="absolute right-7 top-6 text-[12px] font-semibold tracking-[0.2em] text-white/60 md:text-[14px]">VIRTUAL</span>
          </div>

          <div class="absolute left-1/2 top-[20%] z-20 h-[170px] w-[320px] -translate-x-1/2 -rotate-[16deg] rounded-[22px] border border-fuchsia-300/50 bg-gradient-to-br from-[#bb46ff] via-[#7f00ff] to-[#3b11d2] shadow-[0_24px_70px_rgba(96,0,255,0.55)] md:top-[18%] md:h-[260px] md:w-[500px]">
            <span class="absolute left-8 top-8 text-[24px] font-semibold tracking-[-0.02em] text-white/90 md:text-[48px]">Revolut</span>
            <span class="absolute right-8 top-6 text-[12px] font-semibold tracking-[0.2em] text-white/75 md:text-[14px]">VIRTUAL</span>
          </div>

          <div class="absolute right-[-28%] top-[10%] z-30 h-[180px] w-[360px] -rotate-[16deg] rounded-[20px] border border-lime-300/40 bg-[#b8ff00] shadow-[0_16px_55px_rgba(148,255,0,0.45)] md:-right-[11%] md:top-[4%] md:h-[280px] md:w-[560px]">
            <span class="absolute left-10 top-10 text-[30px] font-semibold tracking-[-0.03em] text-[#11220a] md:text-[56px]">Revolut</span>
            <span class="absolute right-8 top-7 text-[12px] font-semibold tracking-[0.2em] text-[#203410]/80 md:text-[14px]">VIRTUAL</span>
          </div>

          <div class="absolute left-1/2 top-[38%] z-0 h-[220px] w-[700px] -translate-x-1/2 -rotate-[18deg] rounded-[48px] border border-white/40 bg-gradient-to-br from-[#5e6678] via-[#2a2f3c] to-[#0a0d14] p-[10px] shadow-[0_40px_90px_rgba(0,0,0,0.8)] md:top-[30%] md:h-[360px] md:w-[1060px] md:p-[14px]">
            <div class="relative h-full w-full overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_18%_15%,#2f3752,#121522_55%,#090b10)]">
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a0d15] via-transparent to-white/5"></div>
              <div class="absolute left-[12%] top-[65%] h-[20px] w-[36%] rounded-full bg-[#181e31]/70 blur-md md:h-[40px]"></div>
              <div class="absolute right-[8%] top-[58%] h-[28px] w-[34%] rounded-full bg-[#1a2744]/65 blur-md md:h-[48px]"></div>
            </div>
          </div>

          <div class="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 md:bottom-10 md:gap-4">
            <button
              type="button"
              class="ui-chip border border-white/50 bg-gradient-to-r from-[#2f2b56] to-[#1a1a30] font-semibold text-white"
            >
              Physical cards
            </button>
            <button
              type="button"
              class="ui-chip bg-white font-semibold text-[#101218]"
            >
              Virtual cards
            </button>
          </div>
        </div>
      </section>
    `;
  }
}

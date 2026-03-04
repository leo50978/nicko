export default class ProofSectionComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);

    if (!this.root) {
      console.error(`Proof root introuvable: ${rootId}`);
      return;
    }

    this.render();
  }

  render() {
    this.root.innerHTML = `
      <section class="border-t border-[#dde2e8] bg-[#f1f3f5] py-14 md:py-20">
        <div class="mx-auto w-full max-w-[1120px] px-4 md:px-8">
          <h2 class="mx-auto max-w-[980px] text-center text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#42596f]">
            Join 70+ million customers worldwide and 12 million in the UK
          </h2>

          <div class="mt-14 grid grid-cols-1 gap-y-12 text-center sm:grid-cols-2 xl:grid-cols-4">
            <article class="px-2">
              <div class="mx-auto flex h-[84px] items-center justify-center gap-7 text-[#121721]">
                <i class="fa-brands fa-apple text-[44px]"></i>
                <i class="fa-brands fa-google-play text-[36px]"></i>
              </div>
              <p class="ui-meta mx-auto max-w-[250px] font-semibold text-[#526070]">
                #3 most downloaded finance app
              </p>
            </article>

            <article class="px-2">
              <div class="mx-auto flex h-[84px] items-center justify-center gap-3 text-[#121721]">
                <i class="fa-solid fa-star text-[40px] text-[#00b67a]"></i>
                <span class="text-[34px] font-semibold tracking-[-0.02em] md:text-[48px]">Trustpilot</span>
              </div>
              <p class="ui-meta mx-auto max-w-[250px] font-semibold text-[#526070]">
                4.7 out of 5 on Trustpilot
              </p>
            </article>

            <article class="px-2">
              <div class="mx-auto flex h-[84px] items-center justify-center gap-3">
                <div class="grid h-[60px] w-[60px] place-items-center rounded-full bg-[#7bcf53] text-[12px] font-semibold text-[#204b3e] md:h-[72px] md:w-[72px] md:text-[12px]">
                  British
                  <br />
                  awards
                </div>
                <div class="text-left text-[#3f5a69]">
                  <p class="max-w-[152px] text-[12px] font-semibold leading-tight md:text-[13px]">
                    Best international payments provider 2025
                  </p>
                </div>
              </div>
              <p class="ui-meta mx-auto max-w-[300px] font-semibold text-[#526070]">
                Best International Payments Provider 2025
              </p>
            </article>

            <article class="px-2">
              <div class="mx-auto flex h-[84px] items-center justify-center">
                <div class="grid h-[76px] w-[76px] place-items-center bg-[#aeb4bb] [clip-path:polygon(25%_6%,75%_6%,94%_50%,75%_94%,25%_94%,6%_50%)]">
                  <span class="text-center text-[12px] font-bold leading-tight text-[#2f3438] md:text-[12px]">
                    FINTECH
                    <br />
                    AWARDS
                  </span>
                </div>
              </div>
              <p class="ui-meta mx-auto max-w-[300px] font-semibold text-[#526070]">
                Best Consumer Banking Mobile App 2025
              </p>
            </article>
          </div>

          <div class="mt-16 grid grid-cols-1 gap-14 text-center md:grid-cols-2 md:px-24">
            <article>
              <div class="mx-auto grid h-[106px] w-[106px] rounded-xl bg-[radial-gradient(circle_at_18%_18%,#1f6f76,#0f3f49)] p-3 shadow-lg">
                <span class="text-left text-[14px] font-semibold leading-tight text-white">
                  Customer Satisfaction
                  <span class="text-[#f3cc58]">Gold</span>
                </span>
                <span class="text-left text-[12px] font-semibold text-[#93f17e]">2025</span>
              </div>
              <p class="ui-meta mt-5 font-semibold text-[#526070]">Customer Satisfaction - Gold</p>
            </article>

            <article>
              <div class="mx-auto grid h-[106px] w-[106px] rounded-xl bg-[radial-gradient(circle_at_18%_18%,#1f6f76,#0f3f49)] p-3 shadow-lg">
                <span class="text-left text-[14px] font-semibold leading-tight text-white">
                  Consumer
                  <br />
                  Guardian
                </span>
                <span class="text-left text-[12px] font-semibold text-[#93f17e]">2025</span>
              </div>
              <p class="ui-meta mt-5 font-semibold text-[#526070]">Consumer Guardian Badge 2025</p>
            </article>
          </div>
        </div>
      </section>
    `;
  }
}
